
// ======================================================
// CLOUD STORAGE METER — shows how much of the 1 MB Firestore document limit
// the signed-in user has used (users/{uid}). Read-only: never writes data.
// Reads the document once when the profile menu is opened (at most every 30 s).
// ======================================================
(function () {
  var LIMIT = 1048576;                       // Firestore: 1 MiB per document
  var LABELS = {
    todo: 'To Do', revision: 'Prelims Revision', mains: 'Mains Revision', pnp: 'PNP',
    mainsReport: 'Mains Report Card', prelims: 'Prelims Report Card', daily: 'Daily Study Log'
  };
  var $ = function (id) { return document.getElementById(id); };
  var lastFetch = 0, lastUid = null, busy = false;

  function bytes(v) {
    try { return new TextEncoder().encode(JSON.stringify(v)).length; } catch (e) { return 0; }
  }
  function fmt(b) { return b < 1024 ? b + ' B' : (b / 1024).toFixed(1) + ' KB'; }

  function render(data) {
    var total = bytes(data), pct = Math.min(100, total / LIMIT * 100);
    var level = pct >= 90 ? 'high' : pct >= 75 ? 'warn' : 'ok';
    $('sm-text').textContent = pct.toFixed(1) + '% used';
    $('sm-detail').textContent = fmt(total) + ' of 1,024 KB';
    $('sm-fill').style.width = Math.max(pct, total ? 1 : 0) + '%';
    $('sm-bar').dataset.level = level;
    $('sm-bar').setAttribute('aria-valuenow', pct.toFixed(1));
    var note = $('sm-note');
    if (level === 'ok') { note.hidden = true; }
    else {
      note.hidden = false; note.dataset.level = level;
      note.textContent = level === 'high'
        ? 'Almost full — new changes may stop saving. Export a backup and clear old entries now.'
        : 'Getting full — consider exporting a backup and clearing old entries soon.';
    }
    var rows = Object.keys(data).map(function (k) { return [LABELS[k] || k, bytes(data[k])]; })
      .filter(function (r) { return r[1] > 4; })
      .sort(function (a, b) { return b[1] - a[1]; });
    var ul = $('sm-list'); ul.textContent = '';
    rows.forEach(function (r) {
      var li = document.createElement('li');
      var n = document.createElement('span'); n.textContent = r[0];
      var s = document.createElement('b'); s.textContent = fmt(r[1]);
      li.appendChild(n); li.appendChild(s); ul.appendChild(li);
    });
  }

  function load(force) {
    if (typeof db === 'undefined' || typeof currentUser === 'undefined' || !currentUser) return;
    if (currentUser.uid !== lastUid) { lastUid = currentUser.uid; lastFetch = 0; }
    if (busy || (!force && Date.now() - lastFetch < 30000)) return;
    busy = true;
    $('sm-text').textContent = 'Checking…';
    db.collection('users').doc(currentUser.uid).get()
      .then(function (snap) { lastFetch = Date.now(); render(snap.exists ? snap.data() : {}); })
      .catch(function () { $('sm-text').textContent = 'Could not check'; $('sm-detail').textContent = ''; })
      .then(function () { busy = false; });
  }

  var pb = $('profile-btn'), pm = $('profile-menu');
  if (!pb || !pm || !$('sm-text')) return;
  pb.addEventListener('click', function () {
    setTimeout(function () { if (!pm.hidden) load(false); }, 0);
  });
  var rb = $('sm-refresh');
  if (rb) rb.addEventListener('click', function (e) { e.stopPropagation(); load(true); });
})();
