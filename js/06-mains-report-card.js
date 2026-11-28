
// ======================================================
// MAINS REPORT CARD — answer writing practice (users/{uid}.mainsReport)
// ======================================================
const MrcTool = (function () {
  const PAPERS = ['Essay','GS I','GS II','GS III','GS IV','Optional I','Optional II'];
  const LABEL = {'GS IV':'GS IV · Ethics','Optional I':'Philosophy I','Optional II':'Philosophy II'};
  const name = p => LABEL[p] || p;
  const GS_RUB = ['Demand of question & directive','Introduction','Content & factual accuracy','Multi-dimensional analysis','Structure & flow','Examples, data, reports, Articles','Conclusion / way forward','Language & presentation'];
  const RUB = {
    'Essay':['Interpretation of topic','Central thesis','Introduction (hook)','Coherence between paragraphs','Multi-dimensional coverage','Examples & anecdotes','Balance & depth of argument','Conclusion','Language & expression'],
    'GS I':GS_RUB,'GS II':GS_RUB,'GS III':GS_RUB,
    'GS IV':['Demand of question','Ethical concepts & keywords','Stakeholders & ethical dilemmas','Options with merits/demerits','Justified course of action','Thinkers, examples, values','Structure & flow','Language & balance'],
    'Optional I':['Demand of question & directive','Conceptual accuracy','Argument reconstruction','Philosophical terminology','Critical evaluation (objections, replies)','Comparison across thinkers/schools','Structure & flow','Conclusion & own position'],
    'Optional II':['Demand of question & directive','Conceptual accuracy','Thinkers & arguments','Critical evaluation (objections, replies)','Paper I linkage','Contemporary Indian example','Structure & flow','Conclusion & own position']
  };
  const GAPS = ['Awareness gap','Conceptual gap','Revision gap','Factual gap','Misread demand','Weak structure','Few examples','Weak analysis','Word limit','Time pressure','Language'];
  const DIRECTIVES = ['','Discuss','Examine','Critically examine','Analyse','Critically analyse','Evaluate','Critically evaluate','Comment','Explain','Elucidate','Substantiate','Case study','Other'];
  const SOURCES = ['','PYQ','Test series','Daily practice','Current affairs','Self-framed'];
  const STATUS = ['Written','Evaluated','Rewrite due','Rewritten'];
  // marks, suggested words, suggested minutes (3 h / 250 marks ≈ 0.72 min per mark)
  function types(p) {
    if (p === 'Essay') return [['Essay (125)',125,'1000–1200',90]];
    if (p === 'GS IV') return [['10 marks',10,150,7],['Case study (20)',20,250,14]];
    if (p.startsWith('Optional')) return [['10 marks',10,150,7],['15 marks',15,250,11],['20 marks',20,300,14]];
    return [['10 marks',10,150,7],['15 marks',15,250,11]];
  }
  const OWN_THEMES = {
    'Essay':['Philosophical / Abstract','Society & Women','Polity & Governance','Economy & Development','Science & Technology','Environment','Education & Culture','International Relations'],
    'Optional I':['Plato and Aristotle','Rationalism','Empiricism','Kant','Hegel','Moore, Russell, early Wittgenstein','Logical Positivism','Later Wittgenstein','Phenomenology (Husserl)','Existentialism','Quine and Strawson','Cārvāka','Jainism','Schools of Buddhism','Nyāya–Vaiśeṣika','Sāṅkhya','Yoga','Mīmāṃsā','Vedānta','Aurobindo'],
    'Optional II':['Social & Political Ideals','Sovereignty','Individual and State','Forms of Government','Political Ideologies','Humanism, Secularism, Multiculturalism','Crime and Punishment','Development and Social Progress','Gender Discrimination','Caste: Gandhi and Ambedkar','Notions of God','Proofs for the Existence of God','Problem of Evil','Soul: Immortality, Rebirth, Liberation','Reason, Revelation and Faith','Religious Experience','Religion without God','Religion and Morality','Religious Pluralism & Absolute Truth','Religious Language']
  };
  function themes(p) {
    if (OWN_THEMES[p]) return OWN_THEMES[p];
    const key = p === 'GS IV' ? 'GS IV' : p;
    const pre = (typeof MAINS_PRESET !== 'undefined' ? MAINS_PRESET : []).find(x => x.name === key);
    return pre ? pre.subjects.flatMap(s => s.chapters.map(c => s.name + ' › ' + c.name)) : [];
  }
  // full-length paper layout: [question label, max marks]
  function layout(p) {
    const q = (n, m, from) => Array.from({length:n}, (_, i) => ['Q' + (from + i), m]);
    if (p === 'Essay') return [['Section A essay',125],['Section B essay',125]];
    if (p === 'GS IV') return [...['1a','1b','2a','2b','3a','3b','4a','4b','5a','5b','6a','6b','6c'].map(x => ['Q' + x, 10]), ...q(6, 20, 7)];
    if (p.startsWith('Optional')) {
      const out = [];
      for (let n = 1; n <= 8; n++) {
        const parts = (n === 1 || n === 5) ? [['a',10],['b',10],['c',10],['d',10],['e',10]] : [['a',20],['b',15],['c',15]];
        parts.forEach(x => out.push(['Q' + n + x[0], x[1]]));
      }
      return out;
    }
    return [...q(10, 10, 1), ...q(10, 15, 11)];
  }

  let st, paper = 'GS I', mode = 'theme', open = null, onSave = null;
  const shut = new Set();   // collapsed themes (paper|theme)
  const $ = id => document.getElementById(id);
  const num = v => { const n = parseFloat(v); return isFinite(n) ? n : 0; };
  const has = v => v !== '' && v != null && isFinite(parseFloat(v));
  const r1 = n => Math.round(n * 10) / 10;
  const esc = s => String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const today = () => { const d = new Date(); return new Date(d - d.getTimezoneOffset() * 60000).toISOString().slice(0,10); };
  const avg = a => a.length ? a.reduce((x, y) => x + y, 0) / a.length : null;
  const show = (v, suf) => v == null ? '–' : r1(v) + (suf || '');

  const base = () => ({ id:uid(), date:today(), time:'', ratings:{}, gaps:[], strengths:'', feedback:'', action:'', status:'Written', rewrite:'' });
  const newAnswer = () => Object.assign(base(), { theme:'', question:'', type:0, directive:'', source:'', words:'', marks:'' });
  const newTest = () => Object.assign(base(), { name:'', source:'', total:'', q: layout(paper).map(() => ({ m:'', t:'' })) });

  function clean(s) {
    const out = { answers:{}, tests:{} };
    PAPERS.forEach(p => {
      out.answers[p] = ((s && s.answers && s.answers[p]) || []).map(r => Object.assign(newAnswer(), r));
      const order = [...new Set(out.answers[p].map(r => r.theme))];
      out.answers[p].sort((a, b) => order.indexOf(a.theme) - order.indexOf(b.theme));
      out.tests[p] = ((s && s.tests && s.tests[p]) || []).map(r => {
        const t = Object.assign(base(), { name:'', source:'', total:'' }, r);
        t.q = layout(p).map((_, i) => Object.assign({ m:'', t:'' }, (r.q || [])[i]));
        return t;
      });
    });
    return out;
  }
  const save = () => onSave && onSave(st);
  const list = () => st[mode === 'theme' ? 'answers' : 'tests'][paper];

  // ---- calculations ----
  const maxOf = a => (types(paper)[a.type] || types(paper)[0])[1];
  const ansPct = (a, p) => has(a.marks) ? num(a.marks) / (types(p)[a.type] || types(p)[0])[1] * 100 : null;
  const testMarks = t => has(t.total) ? num(t.total) : (t.q.some(x => has(x.m)) ? t.q.reduce((s, x) => s + num(x.m), 0) : null);
  const testPct = t => { const m = testMarks(t); return m == null ? null : m / 250 * 100; };
  const rubPct = r => { const v = RUB[paper].map(k => r.ratings[k]).filter(x => x != null); return v.length ? avg(v) / 5 * 100 : null; };
  const pctOf = r => mode === 'theme' ? ansPct(r, paper) : testPct(r);
  function overWords(a) { const w = (types(paper)[a.type] || types(paper)[0])[2]; if (!has(a.words)) return false; const hi = paper === 'Essay' ? 1200 : w, lo = paper === 'Essay' ? 1000 : w * 0.8; return num(a.words) > hi * 1.1 || num(a.words) < lo; }
  const overTime = a => has(a.time) && num(a.time) > (types(paper)[a.type] || types(paper)[0])[3];
  function testWarnings(t) {
    const w = [];
    if (t.q.some((x, i) => num(x.m) > layout(paper)[i][1])) w.push('A question has more marks than its maximum.');
    if ((testMarks(t) || 0) > 250) w.push('Total is above 250.');
    if (paper.startsWith('Optional')) {
      const done = [...new Set(layout(paper).filter((_, i) => has(t.q[i].m)).map(x => parseInt(x[0].slice(1))))];
      if (done.length > 5) w.push('Marks entered in ' + done.length + ' questions; only 5 are to be attempted.');
      if (done.length === 5 && !(done.includes(1) && done.includes(5))) w.push('Q1 and Q5 are compulsory.');
      if (done.length === 5 && (done.filter(n => n < 5).length < 2 || done.filter(n => n > 4).length < 2)) w.push('Take at least one more question from each section besides Q1 and Q5.');
    }
    return w;
  }

  // ---- dashboard ----
  const hbar = (label, v, txt) => `<div class="hbar"><span>${esc(label)}</span><i><i style="width:${Math.max(0, Math.min(100, v))}%"></i></i><b>${esc(txt)}</b></div>`;
  function trend(vals) {
    if (vals.length < 2) return '<div class="muted">Enter marks for 2 or more to see the trend.</div>';
    const pts = vals.map((v, i) => [30 + i * 260 / (vals.length - 1), 90 - Math.min(v, 100) * 0.8]);
    return `<svg viewBox="0 0 300 100" width="100%" role="img" aria-label="Score trend">${[0,50,100].map(g => `<line x1="30" x2="290" y1="${90 - g * .8}" y2="${90 - g * .8}" stroke="var(--border)"/><text x="2" y="${93 - g * .8}" font-size="8" fill="var(--muted)">${g}%</text>`).join('')}<polyline fill="none" stroke="var(--accent)" stroke-width="2" points="${pts.join(' ')}"/>${pts.map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="3" fill="var(--accent)"><title>${r1(vals[i])}%</title></circle>`).join('')}</svg>`;
  }
  function dashboard() {
    const rows = list(), scored = rows.filter(r => pctOf(r) != null);
    const pcts = scored.map(pctOf), rubs = rows.map(rubPct).filter(x => x != null);
    const params = RUB[paper].map(k => { const v = avg(rows.map(r => r.ratings[k]).filter(x => x != null)); return [k, v]; }).filter(x => x[1] != null).sort((a, b) => a[1] - b[1]);
    const gaps = GAPS.map(g => [g, rows.filter(r => r.gaps.includes(g)).length]).filter(x => x[1]).sort((a, b) => b[1] - a[1]).slice(0, 6);
    const stat = (l, v) => `<div class="card stat"><span>${l}</span><b>${v}</b></div>`;
    const byDate = [...scored].sort((a, b) => String(a.date).localeCompare(String(b.date))).slice(-15).map(pctOf);
    return `<div class="stats">
      ${stat(mode === 'theme' ? 'Answers written' : 'Full tests written', rows.length)}
      ${stat('Average marks', show(avg(pcts), '%'))}
      ${stat('Best score', show(pcts.length ? Math.max(...pcts) : null, '%'))}
      ${stat('Self-assessment index', show(avg(rubs), '%'))}
      ${stat('Rewrites pending', rows.filter(r => r.status === 'Rewrite due').length)}
      ${stat('Weakest parameter', `<span style="font-size:13px;color:var(--text)">${params.length ? esc(params[0][0]) : '–'}</span>`)}
    </div><div class="charts">
      <div class="card"><h3>Score trend (by date)</h3>${trend(byDate)}</div>
      <div class="card"><h3>Parameter strength (out of 5)</h3>${params.map(x => hbar(x[0], x[1] * 20, r1(x[1]))).join('') || '<div class="muted">Open “Evaluate” on a row and rate it.</div>'}</div>
      <div class="card"><h3>Most repeated gaps</h3>${gaps.map(x => hbar(x[0], x[1] / rows.length * 100, x[1] + '×')).join('') || '<div class="muted">No gaps tagged yet.</div>'}</div>
    </div>`;
  }
  function coverage() {
    const rows = st.answers[paper], names = [...new Set(rows.map(r => r.theme.trim()).filter(Boolean))];
    if (!names.length) return '';
    const all = themes(paper), covered = names.filter(n => all.includes(n)).length;
    return `<div class="card" style="margin-top:12px"><h3>Theme-wise report <span class="muted">· ${covered} of ${all.length} listed themes attempted</span></h3><div class="wrap"><table><thead><tr><th>Theme</th><th>Answers</th><th class="g">Average</th><th class="g">Best</th><th>Last practised</th></tr></thead><tbody>${names.map(n => {
      const r = rows.filter(x => x.theme.trim() === n), p = r.map(x => ansPct(x, paper)).filter(x => x != null);
      return `<tr><td style="text-align:left">${esc(n)}</td><td>${r.length}</td><td>${show(avg(p), '%')}</td><td>${show(p.length ? Math.max(...p) : null, '%')}</td><td>${esc(r.map(x => x.date).sort().pop())}</td></tr>`;
    }).join('')}</tbody></table></div></div>`;
  }

  // ---- theme groups ----
  const themeNames = () => [...new Set(st.answers[paper].map(r => r.theme))];
  function groupStats(n) {
    const r = st.answers[paper].filter(x => x.theme === n), p = r.map(x => ansPct(x, paper)).filter(x => x != null);
    return `${r.length} question${r.length === 1 ? '' : 's'} · ${p.length} marked · average ${show(avg(p), '%')} · best ${show(p.length ? Math.max(...p) : null, '%')}`;
  }
  function groupsHTML() {
    return themeNames().map((n, g) => {
      const qs = st.answers[paper].filter(r => r.theme === n), closed = shut.has(paper + '|' + n);
      return `<tr class="grp" data-g="${g}"><td colspan="15"><div class="ghead"><button data-act="fold" aria-expanded="${!closed}" title="Show or hide questions">${closed ? '▸' : '▾'}</button><input data-rename value="${esc(n)}" list="mrc-themes" aria-label="Theme name" placeholder="Name this theme"><span class="muted" data-gstat>${groupStats(n)}</span><button class="primary" data-act="addq">+ Add question</button></div></td></tr>` +
        (closed ? '' : qs.map((r, i) => rowHTML(r, i + 1) + (open === r.id ? panelHTML(r) : '')).join(''));
    }).join('');
  }
  // keep each theme's questions together, in the given theme order
  function regroup(order) { st.answers[paper].sort((a, b) => order.indexOf(a.theme) - order.indexOf(b.theme)); }

  // ---- table ----
  const inp = (f, v, extra) => `<input data-f="${f}" value="${esc(v)}" ${extra || ''}>`;
  const sel = (f, v, opts) => `<select data-f="${f}">${opts.map(o => { const [val, txt] = Array.isArray(o) ? o : [o, o || '—']; return `<option value="${esc(val)}"${String(val) === String(v) ? ' selected' : ''}>${esc(txt)}</option>`; }).join('')}</select>`;
  const td = (l, html, cls) => `<td data-l="${l}" class="${cls || ''}">${html}</td>`;
  const handle = '<span class="handle" title="Drag to reorder">⋮⋮</span>';

  function rowHTML(r, qno) {
    const tail = td('Status', sel('status', r.status, STATUS)) +
      td('Review', `<button data-act="toggle">${open === r.id ? 'Close ▴' : 'Evaluate ▾'}</button>`) +
      td('', '<button class="del" data-act="del" title="Delete">✕</button>');
    const date = td('Date', inp('date', r.date, 'type="date"'));
    if (mode === 'theme') {
      const t = types(paper)[r.type] || types(paper)[0];
      return `<tr class="row" data-id="${r.id}">` +
        td('Question ' + qno, `<div style="display:flex;gap:4px;align-items:center">${handle}<b>Q${qno}</b><textarea data-f="question" rows="2" placeholder="Write the question">${esc(r.question)}</textarea></div>`, 'wide') +
        td('Date · Source', inp('date', r.date, 'type="date"') + sel('source', r.source, SOURCES.map(x => [x, x || 'Source']))) +
        td('Type · Directive', sel('type', r.type, types(paper).map((x, i) => [i, x[0]])) + sel('directive', r.directive, DIRECTIVES.map(x => [x, x || 'Directive']))) +
        td(`Words (≈${t[2]})`, inp('words', r.words, `inputmode="numeric" data-chk="words" class="${overWords(r) ? 'warn' : ''}"`)) +
        td(`Minutes (≈${t[3]})`, inp('time', r.time, `inputmode="decimal" data-chk="time" class="${overTime(r) ? 'warn' : ''}"`)) +
        td('Marks obtained', inp('marks', r.marks, `inputmode="decimal" data-chk="marks" class="${num(r.marks) > t[1] ? 'warn' : ''}"`)) +
        td('Out of', t[1], 'calc') + td('%', `<span data-out="pct">${show(pctOf(r), '%')}</span>`, 'calc') +
        td('Self index', `<span data-out="rub">${show(rubPct(r), '%')}</span>`, 'calc') + tail + '</tr>';
    }
    const done = r.q.filter(x => has(x.m)).length;
    return `<tr class="row" data-id="${r.id}">` +
      td('Test', `<div style="display:flex;gap:4px;align-items:center">${handle}${inp('name', r.name, 'placeholder="Full syllabus test name"')}</div>`, 'wide') +
      td('Institute / source', inp('source', r.source), 'wide') + date +
      td('Minutes (180)', inp('time', r.time, `inputmode="numeric" data-chk="time" class="${num(r.time) > 180 ? 'warn' : ''}"`)) +
      td('Parts marked', `<span data-out="done">${done} / ${r.q.length}</span>`) +
      td('Total only (optional)', inp('total', r.total, 'inputmode="decimal" placeholder="auto"')) +
      td('Marks', `<span data-out="marks">${show(testMarks(r))}</span>`, 'calc') + td('Out of', 250, 'calc') +
      td('%', `<span data-out="pct">${show(pctOf(r), '%')}</span>`, 'calc') +
      td('Self index', `<span data-out="rub">${show(rubPct(r), '%')}</span>`, 'calc') + tail + '</tr>';
  }

  function panelHTML(r) {
    const area = (f, l, ph) => `<label>${l}</label><textarea data-f="${f}" rows="2" placeholder="${ph}">${esc(r[f])}</textarea>`;
    let qwise = '';
    if (mode === 'full') {
      const lay = layout(paper), th = themes(paper), warn = testWarnings(r);
      qwise = `<div class="card" style="margin-bottom:12px"><h3>Question-wise marks and theme</h3><div class="muted" data-out="warn" style="color:var(--red)">${warn.map(esc).join('<br>')}</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:6px">${lay.map((q, i) => `<div style="display:grid;grid-template-columns:66px 62px 1fr;gap:4px;align-items:center"><span>${q[0]} <span class="muted">/${q[1]}</span></span><input data-q="${i}" data-k="m" inputmode="decimal" placeholder="marks" value="${esc(r.q[i].m)}" class="${num(r.q[i].m) > q[1] ? 'warn' : ''}"><input data-q="${i}" data-k="t" list="mrc-themes" placeholder="${th.length ? 'theme' : 'topic'}" value="${esc(r.q[i].t)}"></div>`).join('')}</div></div>`;
    }
    return `<tr class="det" data-id="${r.id}"><td class="panel" colspan="15">${qwise}<div class="pgrid">
      <div class="card"><h3>Self / mentor rubric (0 = missing, 5 = excellent)</h3>${RUB[paper].map((k, ki) => `<div class="rub"><span>${esc(k)}</span><span class="dots">${[0,1,2,3,4,5].map(n => `<button data-act="rate" data-k="${ki}" data-n="${n}" class="${r.ratings[k] === n ? 'on' : ''}">${n}</button>`).join('')}</span></div>`).join('')}</div>
      <div class="card"><h3>Gap diagnosis (tap all that apply)</h3><div class="chips">${GAPS.map((g, i) => `<button data-act="gap" data-k="${i}" class="${r.gaps.includes(g) ? 'on' : ''}">${g}</button>`).join('')}</div>
        ${area('strengths','What worked','Keep doing this')}
        ${area('feedback','Evaluator / mentor feedback','Paste or summarise comments')}</div>
      <div class="card"><h3>Improve and rewrite</h3>${area('action','One action point for next answer','e.g. add one Article and one committee in body')}
        <label>Marks after rewrite</label>${inp('rewrite', r.rewrite, 'inputmode="decimal"')}
        <div class="muted" data-out="gain" style="margin-top:6px">${gain(r)}</div></div>
    </div></td></tr>`;
  }
  function gain(r) {
    const first = mode === 'theme' ? (has(r.marks) ? num(r.marks) : null) : testMarks(r);
    if (first == null || !has(r.rewrite)) return '';
    const d = r1(num(r.rewrite) - first);
    return 'Change after rewrite: ' + (d > 0 ? '+' : '') + d + ' marks';
  }

  function render() {
    const rows = list(), full = mode === 'full';
    const head = full
      ? ['Test','Source','Date','Minutes','Parts marked','Total only','g:Marks','g:Out of','g:%','b:Self index','Status','Review','']
      : ['Question','Date · Source','Type · Directive','Words','Minutes','g:Marks obtained','g:Out of','g:%','b:Self index','Status','Review',''];
    $('mrc-root').innerHTML = `
      <div class="bar"><button data-act="mode" data-v="theme" class="${full ? '' : 'on'}">✍️ Theme-wise answer practice</button><button data-act="mode" data-v="full" class="${full ? 'on' : ''}">📝 Full syllabus tests</button></div>
      <div class="bar tabs">${PAPERS.map(p => `<button data-act="paper" data-v="${p}" class="${p === paper ? 'on' : ''}">${name(p)}<span class="count">${st[full ? 'tests' : 'answers'][p].length}</span></button>`).join('')}</div>
      <div id="mrc-dash">${dashboard()}</div>
      <datalist id="mrc-themes">${themes(paper).map(t => `<option value="${esc(t)}">`).join('')}</datalist>
      ${full ? '' : `<div class="bar"><input id="mrc-newtheme" list="mrc-themes" placeholder="Pick or type a theme" style="max-width:340px"><button class="primary" data-act="addtheme">+ Add Theme</button></div>`}
      ${rows.length ? `<div class="wrap"><table class="resp" style="min-width:min(100%,760px)"><thead><tr>${head.map(h => { const [c, t] = h.includes(':') ? h.split(':') : ['', h]; return `<th class="${c}"${t === 'Question' ? ' style="min-width:280px"' : t === 'Test' ? ' style="min-width:160px"' : ''}>${t}</th>`; }).join('')}</tr></thead><tbody id="mrc-body">${full ? rows.map(r => rowHTML(r) + (open === r.id ? panelHTML(r) : '')).join('') : groupsHTML()}</tbody></table></div>`
        : `<div class="empty">${full ? 'No full syllabus tests logged under ' + name(paper) + ' yet.' : 'No themes under ' + name(paper) + ' yet. Pick a theme above and click “+ Add Theme”.'}</div>`}
      <div class="bar" style="margin-top:14px">${full ? '<button class="primary" data-act="add">+ Add Full Test</button>' : ''}<button data-act="reset">Reset This Paper</button><button data-act="export">⬇ Export Backup (All Papers)</button><button data-act="import">⬆ Import Backup</button><button class="primary" data-act="pdf">⬇ Download PDF</button></div>
      <div id="mrc-cov">${full ? '' : coverage()}</div>
      <div class="legend"><b>Marks</b> are entered by you from your evaluator's copy: Mains is subjective, so nothing is auto-marked. <b>%</b> and totals are calculated.<br>
      <b>Self-assessment index</b> = average of your rubric ratings. It is a practice aid, not a UPSC marking scheme.<br>
      <b>Words and minutes</b> shown are practice guidelines; a red box means outside the guide. <b>Reorder:</b> drag ⋮⋮.</div>`;
  }

  // ---- events (delegated) ----
  const rowOf = el => { const tr = el.closest('tr[data-id]'); return tr && list().find(r => r.id === tr.dataset.id); };
  function refresh(r) {   // update computed cells without losing focus
    const root = $('mrc-root');
    $('mrc-dash').innerHTML = dashboard();
    if (mode === 'theme') $('mrc-cov').innerHTML = coverage();
    if (mode === 'theme') themeNames().forEach((n, g) => { const e = root.querySelector(`tr[data-g="${g}"] [data-gstat]`); if (e) e.textContent = groupStats(n); });
    root.querySelectorAll(`tr[data-id="${r.id}"]`).forEach(tr => {
      const set = (k, v) => { const e = tr.querySelector(`[data-out="${k}"]`); if (e) e.textContent = v; };
      set('pct', show(pctOf(r), '%')); set('rub', show(rubPct(r), '%')); set('gain', gain(r));
      if (mode === 'full') { set('marks', show(testMarks(r))); set('done', r.q.filter(x => has(x.m)).length + ' / ' + r.q.length); set('warn', testWarnings(r).join(' ')); }
      const flag = (k, b) => { const e = tr.querySelector(`[data-chk="${k}"]`); if (e) e.classList.toggle('warn', b); };
      if (mode === 'theme') { flag('words', overWords(r)); flag('time', overTime(r)); flag('marks', num(r.marks) > maxOf(r)); }
      else flag('time', num(r.time) > 180);
    });
  }
  const root = $('mrc-root');
  root.addEventListener('input', e => {
    const el = e.target, r = rowOf(el); if (!r) return;
    if (el.dataset.q != null) { r.q[+el.dataset.q][el.dataset.k] = el.value; if (el.dataset.k === 'm') el.classList.toggle('warn', num(el.value) > layout(paper)[+el.dataset.q][1]); }
    else if (el.dataset.f) r[el.dataset.f] = el.dataset.f === 'type' ? +el.value : el.value;
    else return;
    save();
    if (el.dataset.f === 'type') render(); else refresh(r);
  });
  root.addEventListener('change', e => {   // rename a theme (all its questions move with it)
    const el = e.target; if (!el.hasAttribute('data-rename')) return;
    const order = themeNames(), old = order[+el.closest('tr').dataset.g], nu = el.value.trim();
    if (!nu) { el.value = old; return; }
    st.answers[paper].forEach(r => { if (r.theme === old) r.theme = nu; });
    regroup([...new Set(order.map(n => n === old ? nu : n))]);
    save(); setTimeout(render);
  });
  root.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.id === 'mrc-newtheme') root.querySelector('[data-act=addtheme]').click(); });
  root.addEventListener('click', e => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    const a = b.dataset.act, r = rowOf(b);
    if (a === 'mode') { mode = b.dataset.v; open = null; }
    else if (a === 'paper') { paper = b.dataset.v; open = null; }
    else if (a === 'toggle') open = open === r.id ? null : r.id;
    else if (a === 'add') { const n = newTest(); list().push(n); open = n.id; save(); }
    else if (a === 'addtheme' || a === 'addq') {
      const th = a === 'addq' ? themeNames()[+b.closest('tr').dataset.g] : $('mrc-newtheme').value.trim();
      if (a === 'addtheme' && !th) { $('mrc-newtheme').focus(); return; }
      const order = [...new Set([...themeNames(), th])], n = Object.assign(newAnswer(), { theme: th });
      const prev = st.answers[paper].filter(x => x.theme === th).pop();
      if (prev) n.source = prev.source;
      list().push(n); regroup(order); shut.delete(paper + '|' + th); save(); render();
      const box = root.querySelector(`tr[data-id="${n.id}"] textarea`); if (box) box.focus();
      return;
    }
    else if (a === 'fold') { const k = paper + '|' + themeNames()[+b.closest('tr').dataset.g]; if (!shut.delete(k)) shut.add(k); }
    else if (a === 'del') { if (!confirm('Delete this entry?')) return; list().splice(list().indexOf(r), 1); save(); }
    else if (a === 'reset') { if (!confirm(`Delete all ${mode === 'theme' ? 'answers' : 'full tests'} under ${name(paper)}? This cannot be undone.`)) return; list().length = 0; save(); }
    else if (a === 'rate') { const k = RUB[paper][+b.dataset.k], n = +b.dataset.n; if (r.ratings[k] === n) delete r.ratings[k]; else r.ratings[k] = n; save(); }
    else if (a === 'gap') { const g = GAPS[+b.dataset.k], i = r.gaps.indexOf(g); if (i > -1) r.gaps.splice(i, 1); else r.gaps.push(g); save(); }
    else if (a === 'export') {
      const url = URL.createObjectURL(new Blob([JSON.stringify({ tool:'mains-report-card', answers:st.answers, tests:st.tests }, null, 2)], { type:'application/json' }));
      const l = document.createElement('a'); l.href = url; l.download = `mains_report_card_backup_${today()}.json`; l.click(); URL.revokeObjectURL(url); return;
    }
    else if (a === 'import') return $('mrc-file').click();
    else if (a === 'pdf') return window.print();
    render();
  });
  root.addEventListener('pointerdown', e => {
    const h = e.target.closest('.handle'); if (!h) return;
    e.preventDefault();
    const id = h.closest('tr').dataset.id, trs = [...root.querySelectorAll('#mrc-body tr.row')];
    let to = trs.findIndex(t => t.dataset.id === id);
    const move = ev => {
      if (ev.clientY < 60) window.scrollBy(0, -14); else if (ev.clientY > innerHeight - 60) window.scrollBy(0, 14);
      trs.forEach((t, i) => { const b = t.getBoundingClientRect(); if (ev.clientY >= b.top && ev.clientY <= b.bottom) to = i; });
      trs.forEach((t, i) => t.classList.toggle('drop', i === to));
    };
    const end = ev => {
      removeEventListener('pointermove', move); removeEventListener('pointerup', end); removeEventListener('pointercancel', end);
      const target = trs[to] && trs[to].dataset.id;
      if (ev.type === 'pointerup' && target && target !== id) {
        const a = list(), from = a.findIndex(r => r.id === id), at = a.findIndex(r => r.id === target);
        const order = mode === 'theme' ? themeNames() : null, moved = a[from];
        if (order) moved.theme = a[at].theme;
        a.splice(at, 0, a.splice(from, 1)[0]);
        if (order) regroup(order);
        save();
      }
      render();
    };
    addEventListener('pointermove', move); addEventListener('pointerup', end); addEventListener('pointercancel', end);
  });
  $('mrc-file').addEventListener('change', e => {
    const f = e.target.files[0]; if (!f) return;
    const rd = new FileReader();
    rd.onload = () => {
      try {
        const p = JSON.parse(rd.result);
        if (p.tool !== 'mains-report-card') throw new Error('bad file');
        if (confirm('Replace current Mains Report Card data with this backup?')) { st = clean(p); st = sanitize(st); open = null; save(); render(); }
      } catch (err) { alert('Could not read this file. Use a backup exported from the Mains Report Card.'); }
      e.target.value = '';
    };
    rd.readAsText(f);
  });
  // imported ids and ratings are re-made safe before they reach the page
  function sanitize(s) {
    [s.answers, s.tests].forEach(g => Object.values(g).forEach(a => a.forEach(r => { r.id = uid(); r.gaps = Array.isArray(r.gaps) ? r.gaps : []; r.ratings = r.ratings || {}; })));
    return s;
  }
  function init(saved, saver) { onSave = saver; st = clean(saved); open = null; render(); }
  return { init };
})();
