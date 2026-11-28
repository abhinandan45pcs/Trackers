
// ======================================================
// TOOL 3: DAILY STUDY LOG
// ======================================================
const DailyTool = (function () {
  const sessions = [1,2,3,4,5,6];

  function todayStr() {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
  }

  function blankRow() {
    const r = { date: todayStr(), wake: '' };
    sessions.forEach(s => { r[`s${s}_from`]=''; r[`s${s}_to`]=''; r[`s${s}_subject`]=''; r[`s${s}_relaxing`]=''; });
    return r;
  }
  function defaultRows() {
    const out = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const row = blankRow();
      row.date = `${d.getFullYear()}-${mm}-${dd}`;
      out.push(row);
    }
    return out;
  }

  let rows = [];
  let viewMode = false;

  function formatDateLabel(iso) {
    if (!iso) return '—';
    const d = new Date(iso + 'T00:00:00');
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString(undefined, { weekday: 'short', day: '2-digit', month: 'short' });
  }

  function relaxLabel(val) {
    const v = parseInt(val, 10) || 0;
    if (v === 0) return '—';
    return v % 60 === 0 ? `${v / 60}h` : `${v}m`;
  }

  function timeToMinutes(t) {
    if (!t) return null;
    const parts = t.split(':');
    if (parts.length !== 2) return null;
    const h = parseInt(parts[0], 10), m = parseInt(parts[1], 10);
    if (isNaN(h) || isNaN(m)) return null;
    return h * 60 + m;
  }
  function formatHours(totalMinutes) {
    if (totalMinutes <= 0) return '—';
    const h = Math.floor(totalMinutes / 60), m = totalMinutes % 60;
    if (h === 0) return `${m}m`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
  }
  function parseRelaxingMinutes(val) {
    if (!val) return 0;
    const match = String(val).match(/\d+(\.\d+)?/);
    if (!match) return 0;
    return parseFloat(match[0]) || 0;
  }
  function computeTotalMinutes(row) {
    let total = 0;
    sessions.forEach(s => {
      const from = timeToMinutes(row[`s${s}_from`]), to = timeToMinutes(row[`s${s}_to`]);
      if (from !== null && to !== null && to > from) {
        const studyMinutes = to - from;
        const relaxingMinutes = parseRelaxingMinutes(row[`s${s}_relaxing`]);
        total += Math.max(studyMinutes - relaxingMinutes, 0);
      }
    });
    return total;
  }
  function relaxOptions(selected) {
    const values = [0,5,10,15,20,25,30,40,45,50,60,75,90,105,120];
    const cur = parseInt(selected, 10) || 0;
    if (!values.includes(cur)) values.push(cur);
    values.sort((a,b) => a - b);
    return values.map(v => {
      const label = v === 0 ? '—' : (v % 60 === 0 ? `${v/60}h` : `${v}m`);
      return `<option value="${v}"${v === cur ? ' selected' : ''}>${label}</option>`;
    }).join('');
  }

  function init(saved) {
    rows = (saved && Array.isArray(saved.rows)) ? saved.rows : defaultRows();
    render();
  }
  function save() { appState.daily = { rows }; scheduleSave(); }

  function render() {
    const body = document.getElementById('day-body');
    body.innerHTML = '';
    rows.forEach((row, i) => {
      const tr = document.createElement('tr');
      let html;
      if (viewMode) {
        html = `<td class="datecell"><div class="viewtext">${formatDateLabel(row.date)}</div></td>`;
        html += `<td><div class="viewtext">${row.wake || '—'}</div></td>`;
        sessions.forEach(s => {
          html += `<td><div class="viewtext">${row['s'+s+'_from'] || '—'}</div></td>`;
          html += `<td><div class="viewtext">${row['s'+s+'_to'] || '—'}</div></td>`;
          html += `<td><div class="viewtext">${row['s'+s+'_subject'] || '—'}</div></td>`;
          html += `<td><div class="viewtext">${relaxLabel(row['s'+s+'_relaxing'])}</div></td>`;
        });
        html += `<td class="hourscell" id="day-hours-${i}">${formatHours(computeTotalMinutes(row))}</td>`;
        html += `<td></td>`;
      } else {
        html = `<td class="datecell"><input type="date" data-i="${i}" data-f="date" value="${row.date || ''}" class="narrow datecellinput"/></td>`;
        html += `<td><input type="time" data-i="${i}" data-f="wake" value="${row.wake || ''}" class="narrow"/></td>`;
        sessions.forEach(s => {
          html += `<td><input type="time" data-i="${i}" data-f="s${s}_from" value="${row['s'+s+'_from'] || ''}" class="narrow"/></td>`;
          html += `<td><input type="time" data-i="${i}" data-f="s${s}_to" value="${row['s'+s+'_to'] || ''}" class="narrow"/></td>`;
          html += `<td><div class="edittext" contenteditable="true" data-i="${i}" data-f="s${s}_subject" data-placeholder="Subject">${row['s'+s+'_subject'] || ''}</div></td>`;
          html += `<td><select class="relaxsel" data-i="${i}" data-f="s${s}_relaxing">${relaxOptions(row['s'+s+'_relaxing'])}</select></td>`;
        });
        html += `<td class="hourscell" id="day-hours-${i}">${formatHours(computeTotalMinutes(row))}</td>`;
        html += `<td><button class="delbtn" data-del="${i}" title="Delete row">✕</button></td>`;
      }
      tr.innerHTML = html;
      body.appendChild(tr);
    });

    if (viewMode) return;

    body.querySelectorAll('input[type="time"], input[type="date"]').forEach(inp => {
      inp.addEventListener('input', e => {
        const i = parseInt(e.target.dataset.i), f = e.target.dataset.f;
        rows[i][f] = e.target.value;
        document.getElementById('day-hours-' + i).textContent = formatHours(computeTotalMinutes(rows[i]));
        save();
      });
    });
    body.querySelectorAll('.edittext').forEach(div => {
      div.addEventListener('input', e => {
        const i = parseInt(e.target.dataset.i), f = e.target.dataset.f;
        rows[i][f] = e.target.textContent;
        save();
      });
    });
    body.querySelectorAll('select.relaxsel').forEach(sel => {
      sel.addEventListener('change', e => {
        const i = parseInt(e.target.dataset.i), f = e.target.dataset.f;
        rows[i][f] = e.target.value;
        document.getElementById('day-hours-' + i).textContent = formatHours(computeTotalMinutes(rows[i]));
        save();
      });
    });
    body.querySelectorAll('button[data-del]').forEach(btn => {
      btn.addEventListener('click', e => { rows.splice(parseInt(e.currentTarget.dataset.del), 1); render(); save(); });
    });
  }

  document.getElementById('day-toggle').addEventListener('click', (e) => {
    viewMode = !viewMode;
    document.getElementById('tool-daily').classList.toggle('viewmode', viewMode);
    e.currentTarget.classList.toggle('on', viewMode);
    e.currentTarget.textContent = viewMode
      ? '✏️ Switch to Edit Mode'
      : '🔒 Switch to View Mode (for printing)';
    render();
  });
  document.getElementById('day-add').addEventListener('click', () => { rows.push(blankRow()); render(); save(); });
  document.getElementById('day-reset').addEventListener('click', () => {
    if (confirm('Reset all data? This cannot be undone.')) { rows = defaultRows(); render(); save(); }
  });
  document.getElementById('day-export').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(rows, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `daily_accountability_backup_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });
  document.getElementById('day-import-btn').addEventListener('click', () => document.getElementById('day-import').click());
  document.getElementById('day-import').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target.result);
        if (!Array.isArray(parsed)) throw new Error('Invalid file format');
        rows = parsed; save(); render();
        alert('Backup restored successfully.');
      } catch (err) { alert('Could not read this file. Make sure it is a valid backup exported from this tool.'); }
      e.target.value = '';
    };
    reader.readAsText(file);
  });
  document.getElementById('day-pdf').addEventListener('click', () => window.print());

  return { init };
})();
