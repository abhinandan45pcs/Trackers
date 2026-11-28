
/* ============================================================
   NOTIFICATION CENTER — collects alerts from To Do, PNP, Prelims Revision and Mains Revision
   ============================================================ */
const NotifCenter = (function () {
  const $ = id => document.getElementById(id);
  const LSR = 'upscNotifRead', LSD = 'upscNotifDismissed', LSP = 'upscNotifPushed', LSO = 'upscNotifOS';
  const load = k => { try { return JSON.parse(localStorage.getItem(k) || '[]'); } catch (e) { return []; } };
  const store = (k, set) => { try { localStorage.setItem(k, JSON.stringify(Array.from(set).slice(-600))); } catch (e) {} };
  const read = new Set(load(LSR)), dismissed = new Set(load(LSD)), pushed = new Set(load(LSP));
  const SRC = {
    todo:  { l: 'To Do',        ic: '✅', tab: 'todo' },
    pnp:   { l: 'PNP',          ic: '📚', tab: 'pnp' },
    rev:   { l: 'Prelims Rev.', ic: '📖', tab: 'revision' },
    mains: { l: 'Mains Rev.',   ic: '✍️', tab: 'mains' }
  };
  const LV = { bad: 0, warn: 1, info: 2 };
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const p2 = n => String(n).padStart(2, '0');
  const isoOf = d => d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate());
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const fmtD = iso => { const a = String(iso).split('-'); return a.length === 3 ? (+a[2]) + ' ' + MON[+a[1] - 1] : iso; };
  const fmtT = t => { const a = String(t).split(':'); let h = +a[0], m = a[1] || '00'; const ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return h + ':' + m + ' ' + ap; };
  const safe = (f, d) => { try { return f(); } catch (e) { return d; } };
  const plural = (n, w) => n + ' ' + w + (n === 1 ? '' : 's');

  let items = [], filter = 'all', lastUnread = -1, lastSig = '';

  /* ---------- gather ---------- */
  function fromTodo(out) {
    const st = safe(() => TodoTool.state(), null);
    if (!st || !Array.isArray(st.tasks)) return;
    const now = new Date(), T = isoOf(now), hhmm = p2(now.getHours()) + ':' + p2(now.getMinutes());
    const proj = id => id === 'inbox' ? 'Inbox' : ((st.projects || []).find(p => p.id === id) || {}).name || 'Inbox';
    const over = [];
    st.tasks.forEach(t => {
      if (t.done || !t.due) return;
      if (t.due < T) over.push(t);
      else if (t.due === T) {
        if (t.time && t.time <= hhmm) out.push({ id: 'todo:' + t.id + ':' + T + ':' + t.time + ':now', src: 'todo', lv: 'bad', title: t.title, sub: 'Due now · ' + fmtT(t.time) + ' · ' + proj(t.project), ord: 0 });
        else if (t.time) out.push({ id: 'todo:' + t.id + ':' + T + ':' + t.time, src: 'todo', lv: 'info', title: t.title, sub: 'Today at ' + fmtT(t.time) + ' · ' + proj(t.project), ord: 1 });
        else out.push({ id: 'todo:' + t.id + ':' + T, src: 'todo', lv: 'info', title: t.title, sub: 'Due today · ' + proj(t.project), ord: 2 });
      }
    });
    over.sort((a, b) => (a.due + (a.time || '')) < (b.due + (b.time || '')) ? -1 : 1);
    over.slice(0, 10).forEach(t => out.push({ id: 'todo:' + t.id + ':' + t.due + ':o', src: 'todo', lv: 'bad', title: t.title, sub: 'Overdue since ' + fmtD(t.due) + (t.time ? ' ' + fmtT(t.time) : '') + ' · ' + proj(t.project), ord: -1 }));
    if (over.length > 10) out.push({ id: 'todo:moreover:' + over.length, src: 'todo', lv: 'bad', title: '+' + (over.length - 10) + ' more overdue tasks', sub: 'Open To Do to review them', ord: 3 });
  }
  function fromPnp(out) {
    const d = safe(() => PnpTool.items(), null);
    if (!d || d.notStarted) return;
    const T = isoOf(new Date());
    if (d.today) out.push({ id: 'pnp:today:' + d.today.n + ':' + T, src: 'pnp', lv: 'info', title: 'Test ' + d.today.n + ' is scheduled today', sub: d.today.subj, ord: 0 });
    d.behind.slice(0, 8).forEach(b => {
      const days = Math.max(1, Math.round((new Date(T) - new Date(b.date)) / 864e5));
      out.push({ id: 'pnp:b:' + b.n, src: 'pnp', lv: days >= 3 ? 'bad' : 'warn', title: 'Test ' + b.n + ' not done · ' + b.subj, sub: 'Was due ' + fmtD(b.date) + ' · ' + plural(days, 'day') + ' behind', ord: 1 });
    });
    if (d.behind.length > 8) out.push({ id: 'pnp:more:' + d.behind.length, src: 'pnp', lv: 'bad', title: '+' + (d.behind.length - 8) + ' more tests behind schedule', sub: d.behind.length + ' tests behind in total', ord: 2 });
  }
  function fromRevision(src, list, out) {
    if (!list || !list.length) return;
    const od = list.filter(x => x.days >= 15).sort((a, b) => b.days - a.days), soon = list.filter(x => x.days < 15);
    od.slice(0, 8).forEach(x => out.push({ id: src + ':' + x.id + ':o', src, lv: 'bad', title: x.name, sub: (x.paper ? x.paper + ' · ' : '') + x.subject + ' · ' + x.days + ' days since last revision', ord: 0 }));
    if (od.length > 8) out.push({ id: src + ':moreo:' + od.length, src, lv: 'bad', title: '+' + (od.length - 8) + ' more overdue topics', sub: od.length + ' topics overdue in total', ord: 1 });
    if (soon.length) {
      const names = soon.slice(0, 3).map(x => x.name).join(', ') + (soon.length > 3 ? '…' : '');
      out.push({ id: src + ':soon:' + soon.length, src, lv: 'warn', title: plural(soon.length, 'topic') + ' due for revision soon', sub: names, ord: 2 });
    }
  }
  function compute() {
    const out = [];
    safe(() => fromTodo(out));
    safe(() => fromPnp(out));
    safe(() => fromRevision('rev', RevisionTool.items(), out));
    safe(() => fromRevision('mains', MainsTool.items(), out));
    const order = Object.keys(SRC);
    out.sort((a, b) => order.indexOf(a.src) - order.indexOf(b.src) || LV[a.lv] - LV[b.lv] || a.ord - b.ord);
    return out.filter(i => !dismissed.has(i.id));
  }

  /* ---------- render ---------- */
  function render() {
    const unread = items.filter(i => !read.has(i.id)).length, b = $('notif-badge');
    if (b) { b.hidden = unread === 0; b.textContent = unread > 99 ? '99+' : unread; }
    const btn = $('notif-btn');
    if (btn && unread > lastUnread && lastUnread >= 0) { btn.classList.remove('ring'); void btn.offsetWidth; btn.classList.add('ring'); }
    lastUnread = unread;
    const panel = $('notif-panel');
    if (!panel || panel.hidden) return;
    const cnt = k => items.filter(i => k === 'all' || i.src === k).length;
    $('np-filters').innerHTML = ['all'].concat(Object.keys(SRC)).map(k =>
      '<button type="button" class="np-f' + (filter === k ? ' on' : '') + '" data-f="' + k + '">' + (k === 'all' ? 'All' : SRC[k].l) + '<i>' + cnt(k) + '</i></button>').join('');
    const shown = items.filter(i => filter === 'all' || i.src === filter);
    if (!shown.length) { $('np-list').innerHTML = '<div class="np-empty">🎉 You\'re all caught up.<br>No pending alerts' + (filter === 'all' ? '' : ' here') + '.</div>'; return; }
    let h = '', cur = '';
    shown.forEach(i => {
      if (i.src !== cur) { cur = i.src; h += '<div class="np-sec">' + SRC[cur].l + '</div>'; }
      h += '<div class="np-it ' + i.lv + (read.has(i.id) ? '' : ' unread') + '" data-id="' + esc(i.id) + '" data-src="' + i.src + '"><span class="np-ic">' + SRC[i.src].ic + '</span><div class="np-bd"><div class="np-t">' + esc(i.title) + '</div><div class="np-s">' + esc(i.sub) + '</div></div><button type="button" class="np-x" data-x="' + esc(i.id) + '" title="Dismiss" aria-label="Dismiss">✕</button></div>';
    });
    $('np-list').innerHTML = h;
  }

  /* ---------- browser (OS) alerts ---------- */
  const osOn = () => { try { return localStorage.getItem(LSO) === '1' && 'Notification' in window && Notification.permission === 'granted'; } catch (e) { return false; } };
  function osLabel() {
    const b = $('np-os'); if (!b) return;
    b.textContent = '🔔 Browser alerts: ' + (osOn() ? 'on' : 'off');
  }
  function osPush() {
    if (!osOn()) return;
    const fresh = items.filter(i => i.lv !== 'info' && !pushed.has(i.id));
    if (!fresh.length) return;
    fresh.forEach(i => pushed.add(i.id)); store(LSP, pushed);
    const show = (title, body, tag, src) => {
      try {
        const n = new Notification(title, { body, tag });
        n.onclick = () => { window.focus(); goTab(SRC[src].tab); n.close(); };
      } catch (e) {}
    };
    fresh.slice(0, 3).forEach(i => show(SRC[i.src].l + ' · ' + i.title, i.sub, i.id, i.src));
    if (fresh.length > 3) show('UPSC Prep Hub', '+' + (fresh.length - 3) + ' more alerts waiting', 'more', fresh[3].src);
  }
  function toggleOS() {
    if (!('Notification' in window)) { alert('This browser does not support notifications.'); return; }
    if (osOn()) { try { localStorage.setItem(LSO, '0'); } catch (e) {} osLabel(); return; }
    const enable = () => {
      try { localStorage.setItem(LSO, '1'); } catch (e) {}
      items.forEach(i => pushed.add(i.id)); store(LSP, pushed);   /* only alert for NEW items from now on */
      osLabel();
    };
    if (Notification.permission === 'granted') enable();
    else if (Notification.permission === 'denied') alert('Notifications are blocked for this site. Allow them in your browser\'s site settings, then try again.');
    else Notification.requestPermission().then(p => { if (p === 'granted') enable(); osLabel(); });
  }

  /* ---------- actions ---------- */
  function goTab(tab) { const t = document.querySelector('.main-tab[data-tool="' + tab + '"]'); if (t) t.click(); }
  function markSeen() { items.forEach(i => read.add(i.id)); store(LSR, read); }
  function openPanel() {
    const p = $('notif-panel'); if (!p) return;
    refresh(true); p.hidden = false; $('notif-btn').setAttribute('aria-expanded', 'true'); render();
  }
  function closePanel() {
    const p = $('notif-panel'); if (!p || p.hidden) return;
    p.hidden = true; $('notif-btn').setAttribute('aria-expanded', 'false'); markSeen(); render();
  }
  function refresh(force) {
    items = compute();
    const sig = items.map(i => i.id + (read.has(i.id) ? '1' : '0')).join('|');
    if (force || sig !== lastSig) { lastSig = sig; render(); }
    osPush();
  }

  function init() {
    const btn = $('notif-btn'), panel = $('notif-panel'); if (!btn || !panel) return;
    btn.addEventListener('click', e => { e.stopPropagation(); panel.hidden ? openPanel() : closePanel(); });
    /* clicks inside the panel (filters, dismiss, etc.) re-render its content, so never let them reach the outside-click closer */
    panel.addEventListener('click', e => e.stopPropagation());
    document.addEventListener('click', e => { if (!panel.hidden && !panel.contains(e.target) && !btn.contains(e.target)) closePanel(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });
    /* clicking inside the embedded To Do page moves focus to its iframe, which never reaches this document's click handler */
    window.addEventListener('blur', () => setTimeout(() => { const ae = document.activeElement; if (ae && ae.tagName === 'IFRAME') closePanel(); }, 0));
    $('np-readall').addEventListener('click', () => { markSeen(); render(); });
    $('np-os').addEventListener('click', toggleOS);
    $('np-filters').addEventListener('click', e => { const f = e.target.closest('[data-f]'); if (f) { filter = f.dataset.f; render(); } });
    $('np-list').addEventListener('click', e => {
      const x = e.target.closest('[data-x]');
      if (x) { e.stopPropagation(); dismissed.add(x.dataset.x); store(LSD, dismissed); refresh(true); return; }
      const it = e.target.closest('.np-it'); if (!it) return;
      read.add(it.dataset.id); store(LSR, read); closePanel(); goTab(SRC[it.dataset.src].tab);
    });
    osLabel();
    document.querySelectorAll('.main-tab').forEach(b => b.addEventListener('click', () => setTimeout(refresh, 400)));
    document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
    setTimeout(refresh, 2000); setTimeout(refresh, 6000); setInterval(refresh, 15000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  return { refresh, open: openPanel, close: closePanel };
})();

/* ============================================================
   MOBILE TAB SLIDER + MAINS CHAPTER NAME MARQUEE
   ============================================================ */
(function () {
  const tabs = document.getElementById('main-tabs');
  if (tabs) {
    const upd = () => {
      tabs.classList.toggle('sl', tabs.scrollLeft > 4);
      tabs.classList.toggle('sr', tabs.scrollLeft + tabs.clientWidth < tabs.scrollWidth - 4);
    };
    const reveal = () => {
      if (!window.matchMedia('(max-width:760px)').matches) return;
      const a = tabs.querySelector('.main-tab.active');
      if (a) { try { a.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' }); } catch (e) {} }
    };
    tabs.addEventListener('scroll', upd, { passive: true });
    window.addEventListener('resize', () => { upd(); reveal(); });
    new MutationObserver(recs => { if (!recs.some(r => r.target !== tabs)) return; reveal(); setTimeout(upd, 350); }).observe(tabs, { attributes: true, subtree: true, attributeFilter: ['class'] });
    setTimeout(upd, 300); setTimeout(upd, 1500);
    /* let a mouse user drag the strip too */
    let down = false, sx = 0, sl = 0, moved = false;
    tabs.addEventListener('mousedown', e => { if (!window.matchMedia('(max-width:760px)').matches) return; down = true; moved = false; sx = e.clientX; sl = tabs.scrollLeft; });
    window.addEventListener('mousemove', e => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 4) moved = true; tabs.scrollLeft = sl - dx; });
    window.addEventListener('mouseup', () => { down = false; });
    tabs.addEventListener('click', e => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
  }

  /* Mains Revision: chapter names that don't fit slide sideways while hovered (or touched) */
  let raf = 0, cur = null, timer = 0;
  function stop() {
    cancelAnimationFrame(raf); clearTimeout(timer); raf = 0;
    if (cur) { cur.scrollLeft = 0; cur.style.textOverflow = ''; cur = null; }
  }
  function start(el, limit) {
    if (cur === el) return;
    stop();
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 2) return;
    cur = el; el.style.textOverflow = 'clip';
    const speed = 45;                      /* px per second */
    let dir = 1, pos = 0, last = 0, wait = 450;
    const step = ts => {
      if (cur !== el) return;
      if (!last) last = ts;
      const dt = ts - last; last = ts;
      if (wait > 0) wait -= dt;
      else {
        pos += dir * speed * dt / 1000;
        if (pos >= max) { pos = max; dir = -1; wait = 700; }
        else if (pos <= 0) { pos = 0; dir = 1; wait = 700; }
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    if (limit) timer = setTimeout(stop, limit);
  }
  const nameOf = t => t.closest && t.closest('#tool-mains .ch-name');
  document.addEventListener('mouseover', e => { const n = nameOf(e.target); if (n) start(n); });
  document.addEventListener('mouseout', e => { const n = nameOf(e.target); if (n && n === cur && !(e.relatedTarget && n.contains(e.relatedTarget))) stop(); });
  document.addEventListener('touchstart', e => { const n = nameOf(e.target); if (n) start(n, 6000); else stop(); }, { passive: true });
})();

