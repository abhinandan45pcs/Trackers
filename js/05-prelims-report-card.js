
// ======================================================
// TOOL 2: PRELIMS REPORT CARD
// ======================================================
const PrelimsTool = (function () {
  const fields = ['test','testname','date','total','correct','wrong','silly','awareness','conceptual','revision','factual','guesswork','notes'];
  const MARKS_CORRECT = 2;
  const MARKS_WRONG = -2/3;
  // Permanent subjects (fixed list): the 8 PNP subjects + CSAT, Current Affairs, International Relations (+ PNP full-length tests)
  const DEFAULT_SUBJECTS = ['Polity','Economy','Geography','Sci & Tech','Modern History','Environment','AMAC','Mapping','CSAT','Current Affairs','International Relations','Full Length Tests'];
  function enforcePermanent() {
    // older names -> PNP names (existing tests are moved across, nothing is lost)
    const RENAME = { 'Modern Indian History': 'Modern History', 'Science & Tech': 'Sci & Tech' };
    Object.keys(RENAME).forEach(o => {
      const n = RENAME[o];
      if (subjects.includes(o) || (o in data)) {
        data[n] = [...(data[n] || []), ...(data[o] || [])];
        delete data[o];
        subjects = subjects.filter(x => x !== o);
        if (!subjects.includes(n)) subjects.push(n);
        if (current === o) current = n;
      }
    });
    // keep any older custom subject only if it still holds tests, so no data is lost
    const extras = subjects.filter(s => !DEFAULT_SUBJECTS.includes(s) && (data[s] || []).length);
    subjects = [...DEFAULT_SUBJECTS, ...extras];
    Object.keys(data).forEach(k => { if (!subjects.includes(k)) delete data[k]; });
    initData();
    if (!subjects.includes(current)) current = subjects[0];
  }
  const defaultPolityNames = ['Polity I Prelims Test','Polity II Prelims Test','Polity III Prelims Test','Polity IV Prelims Test','Polity V Prelims Test'];

  function numOr0(v) { const n = parseFloat(v); return isNaN(n) ? 0 : n; }
  function computeUnattempted(row) {
    const u = numOr0(row.total) - numOr0(row.correct) - numOr0(row.wrong);
    return u > 0 ? u : 0;
  }
  // CSAT uses a different marking scheme: +2.5 per correct, -0.83 per wrong, 0 unattempted
  const CSAT_MARKS_CORRECT = 2.5;
  const CSAT_MARKS_WRONG = -0.83;
  function schemeFor(subject) {
    return subject === 'CSAT'
      ? { c: CSAT_MARKS_CORRECT, w: CSAT_MARKS_WRONG }
      : { c: MARKS_CORRECT, w: MARKS_WRONG };
  }
  function computeMarksObtained(row) {
    const sc = schemeFor(current);
    const marks = (numOr0(row.correct) * sc.c) + (numOr0(row.wrong) * sc.w);
    return Math.round(marks * 100) / 100;
  }
  function computeOutOf(row) { return Math.round(numOr0(row.total) * schemeFor(current).c * 100) / 100; }

  function blankRow(name) {
    const r = {};
    fields.forEach(f => r[f] = f === 'test' ? (name || '') : '');
    return r;
  }

  let subjects = [...DEFAULT_SUBJECTS];
  let data = {};
  let current = subjects[0];

  function initData() { subjects.forEach(s => { if (!data[s]) data[s] = []; }); }
  function esc(s) { return (s || '').toString().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  function init(saved) {
    if (saved && saved.subjects) {
      subjects = saved.subjects;
      data = saved.data || {};
      current = saved.current && subjects.includes(saved.current) ? saved.current : subjects[0];
    } else {
      subjects = [...DEFAULT_SUBJECTS];
      data = {};
      data['Polity'] = defaultPolityNames.map(n => blankRow(n));
      current = 'Polity';
    }
    initData();
    enforcePermanent();
    if (!subjects.includes(current)) current = subjects[0] || '';
    render();
  }

  function save() { appState.prelims = { subjects, data, current }; scheduleSave(); }

  function renderTabs() {
    document.getElementById('pr-tabs').innerHTML = subjects.map(s => {
      const count = (data[s] || []).length;
      return `<button class="tab${s === current ? ' active' : ''}" data-tab="${esc(s)}">
        ${esc(s)} <span class="tab-count">${count}</span>
      </button>`;
    }).join('');

    document.querySelectorAll('#pr-tabs .tab').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (e.target.closest('[data-del-subject]')) return;
        current = btn.dataset.tab;
        render();
      });
    });
    document.querySelectorAll('#pr-tabs [data-del-subject]').forEach(el => {
      el.addEventListener('click', (e) => { e.stopPropagation(); deleteSubject(el.dataset.delSubject); });
    });
  }

  function render() {
    renderTabs();
    const body = document.getElementById('pr-body');
    const emptyDiv = document.getElementById('pr-empty');
    const rows = data[current] || [];

    if (!current) { body.innerHTML = ''; emptyDiv.style.display = 'block'; emptyDiv.textContent = 'No subjects yet. Click "+ Subject" to add one.'; return; }
    if (!rows.length) { body.innerHTML = ''; emptyDiv.style.display = 'block'; emptyDiv.textContent = `No tests logged under "${current}" yet. Click "+ Add Test" to start.`; return; }
    emptyDiv.style.display = 'none';

    body.innerHTML = '';
    rows.forEach((row, i) => {
      const tr = document.createElement('tr');
      let html = `<td class="testname"><div class="tcell"><span class="drag-handle" data-drag="${i}" title="Drag up/down to reorder">⋮⋮</span><input type="text" class="testinput" data-i="${i}" data-f="test" value="${esc(row.test)}"/></div></td>`;
      html += `<td class="testcol"><input type="text" class="testinput2" data-i="${i}" data-f="testname" value="${esc(row.testname)}"/></td>`;
      html += `<td><input type="date" class="dateinput" data-i="${i}" data-f="date" value="${esc(row.date)}"/></td>`;
      ['total','correct','wrong'].forEach(f => { html += `<td><textarea class="numinput" data-i="${i}" data-f="${f}" rows="1">${esc(row[f])}</textarea></td>`; });
      html += `<td class="unattended" id="pr-unatt-${i}">${computeUnattempted(row)}</td>`;
      html += `<td class="computed" id="pr-marks-${i}">${computeMarksObtained(row)}</td>`;
      html += `<td class="computed" id="pr-outof-${i}">${computeOutOf(row)}</td>`;
      ['silly','awareness','conceptual','revision','factual','guesswork'].forEach(f => { html += `<td><textarea class="numinput" data-i="${i}" data-f="${f}" rows="1">${esc(row[f])}</textarea></td>`; });
      html += `<td><div class="notestext" contenteditable="true" data-i="${i}" data-f="notes" data-placeholder="Add notes...">${esc(row.notes)}</div></td>`;
      html += `<td><button class="delbtn" data-del="${i}" title="Delete row">✕</button></td>`;
      tr.innerHTML = html;
      body.appendChild(tr);
    });

    function autoResize(el) { el.style.height = 'auto'; el.style.height = el.scrollHeight + 'px'; }

    body.querySelectorAll('textarea.numinput').forEach(autoResize);

    body.querySelectorAll('input[data-f], textarea.numinput').forEach(inp => {
      inp.addEventListener('input', e => {
        const i = parseInt(e.target.dataset.i);
        const f = e.target.dataset.f;
        data[current][i][f] = e.target.value;
        if (e.target.tagName === 'TEXTAREA') autoResize(e.target);
        if (f === 'total' || f === 'correct' || f === 'wrong') {
          const row = data[current][i];
          document.getElementById('pr-unatt-' + i).textContent = computeUnattempted(row);
          document.getElementById('pr-marks-' + i).textContent = computeMarksObtained(row);
          document.getElementById('pr-outof-' + i).textContent = computeOutOf(row);
        }
        save();
      });
    });
    body.querySelectorAll('.notestext').forEach(div => {
      div.addEventListener('input', e => {
        const i = parseInt(e.target.dataset.i);
        data[current][i]['notes'] = e.target.textContent;
        save();
      });
    });

    // ---- drag & drop reorder (mouse + touch) ----
    body.querySelectorAll('.drag-handle').forEach(h => {
      h.addEventListener('pointerdown', e => {
        if (e.button !== undefined && e.button !== 0) return;
        e.preventDefault();
        const from = parseInt(h.dataset.drag);
        const trs = Array.from(body.children);
        const dragTr = trs[from];
        let ins = from;
        dragTr.classList.add('dragging');
        document.body.classList.add('pr-dragging');
        try { h.setPointerCapture(e.pointerId); } catch (_) {}
        function clearMarks() { trs.forEach(t => t.classList.remove('drop-above', 'drop-below')); }
        function onMove(ev) {
          const y = ev.clientY;
          if (y < 60) window.scrollBy(0, -14); else if (y > window.innerHeight - 60) window.scrollBy(0, 14);
          ins = trs.length;
          for (let k = 0; k < trs.length; k++) {
            const r = trs[k].getBoundingClientRect();
            if (y < r.top + r.height / 2) { ins = k; break; }
          }
          clearMarks();
          if (ins < trs.length) trs[ins].classList.add('drop-above'); else trs[trs.length - 1].classList.add('drop-below');
        }
        function finish(commit) {
          h.removeEventListener('pointermove', onMove);
          h.removeEventListener('pointerup', onUp);
          h.removeEventListener('pointercancel', onCancel);
          document.body.classList.remove('pr-dragging');
          clearMarks();
          dragTr.classList.remove('dragging');
          if (commit) {
            const to = ins > from ? ins - 1 : ins;
            if (to !== from) {
              const arr = data[current];
              const [moved] = arr.splice(from, 1);
              arr.splice(to, 0, moved);
              render(); save();
            }
          }
        }
        function onUp() { finish(true); }
        function onCancel() { finish(false); }
        h.addEventListener('pointermove', onMove);
        h.addEventListener('pointerup', onUp);
        h.addEventListener('pointercancel', onCancel);
      });
    });
    body.querySelectorAll('button[data-del]').forEach(btn => {
      btn.addEventListener('click', e => {
        const i = parseInt(e.currentTarget.dataset.del);
        data[current].splice(i, 1);
        render(); save();
      });
    });
  }

  function deleteSubject(s) {
    const count = (data[s] || []).length;
    const msg = count > 0 ? `"${s}" has ${count} logged test(s). Delete this subject and all its data?` : `Delete subject "${s}"?`;
    if (!confirm(msg)) return;
    subjects = subjects.filter(x => x !== s);
    delete data[s];
    if (current === s) current = subjects[0] || '';
    save(); render();
  }

  document.getElementById('pr-add').addEventListener('click', () => {
    if (!current) { alert('Add a subject first.'); return; }
    data[current].push(blankRow('New test'));
    render(); save();
  });

  document.getElementById('pr-reset').addEventListener('click', () => {
    if (!current) return;
    if (confirm(`Reset all tests under "${current}"? This cannot be undone.`)) { data[current] = []; render(); save(); }
  });

  document.getElementById('pr-export').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify({ subjects, data }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prelims_report_card_backup_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById('pr-pdf').addEventListener('click', () => window.print());

  document.getElementById('pr-import-btn').addEventListener('click', () => document.getElementById('pr-import').click());
  document.getElementById('pr-import').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target.result);
        if (!parsed || !parsed.data || !Array.isArray(parsed.subjects)) throw new Error('Invalid file format');
        if (!confirm('Replace current data with this backup? This cannot be undone.')) { e.target.value = ''; return; }
        subjects = parsed.subjects;
        data = {};
        Object.keys(parsed.data).forEach(s => { data[s] = (parsed.data[s] || []).map(r => ({ ...blankRow(''), ...r, total: r.total || '' })); });
        initData();
        enforcePermanent();
        current = subjects[0] || '';
        save(); render();
        alert('Backup restored successfully.');
      } catch (err) { alert('Could not read this file. Make sure it is a valid backup exported from this tool.'); }
      e.target.value = '';
    };
    reader.readAsText(file);
  });

  // ---- hook used by the PNP tab: copy/update a test result as one row (keyed by pnpKey) ----
  function findPNP(key) {
    for (const s of subjects) {
      const i = (data[s] || []).findIndex(r => r && r.pnpKey === key);
      if (i > -1) return { s, i };
    }
    return null;
  }
  function hasPNP(key) { const f = findPNP(key); return f ? f.s : null; }
  function upsertFromPNP(subject, key, vals) {
    if (!subjects.includes(subject)) subjects.push(subject);
    initData();
    const f = findPNP(key);
    if (f && f.s === subject) {
      Object.assign(data[subject][f.i], vals);
    } else {
      if (f) data[f.s].splice(f.i, 1);   // subject changed (e.g. scheme switched) -> move the row
      data[subject].push(Object.assign(blankRow(vals.test), vals, { pnpKey: key }));
    }
    current = subject;
    save(); render();
    return subject;
  }

  return { init, upsertFromPNP, hasPNP };
})();
