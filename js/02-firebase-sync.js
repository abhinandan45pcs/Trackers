
// ======================================================
// PASTE YOUR FIREBASE CONFIG OBJECT BELOW (from Project settings > Your apps)
// ======================================================
const firebaseConfig = {
  apiKey: "AIzaSyBXJ-4DYBM23HAAd4Sw5lO4jTeF6GJOYaU",
  authDomain: "trackers45.firebaseapp.com",
  databaseURL: "https://trackers45-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "trackers45",
  storageBucket: "trackers45.firebasestorage.app",
  messagingSenderId: "144294285789",
  appId: "1:144294285789:web:62cb3da02d59a41bac6634",
  measurementId: "G-KQRRF4JVS1"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let currentUser = null;
let appState = { prelims: null, daily: null };

// ---- To Do cloud sync (stored in users/{uid}.todo) ----
let todoStored = null, todoPending = null, todoTimer = null, todoBusy = false;
function todoQueueSave(payload) {
  if (JSON.stringify(payload).length > 600000) {      // keep well under Firestore's 1 MiB document limit
    TodoTool.status('big'); setSyncStatus('To Do too large to sync'); return;
  }
  todoPending = payload;
  TodoTool.status('wait');
  setSyncStatus('Saving…');
  clearTimeout(todoTimer);
  todoTimer = setTimeout(todoSaveNow, 1000);
}
async function todoSaveNow() {
  clearTimeout(todoTimer);
  if (!currentUser || !todoPending || todoBusy) return;
  const payload = todoPending;
  todoPending = null;
  todoBusy = true;
  try {
    // mergeFields replaces the whole `todo` field, so deleted tasks/projects are really removed
    await db.collection('users').doc(currentUser.uid).set({ todo: payload }, { mergeFields: ['todo'] });
    TodoTool.status('synced');
    setSyncStatus('Saved ✓');
  } catch (e) {
    console.error('To Do save failed', e);
    todoPending = todoPending || payload;
    TodoTool.status('local');
    setSyncStatus('Save failed — check connection');
  }
  todoBusy = false;
  if (todoPending) todoTimer = setTimeout(todoSaveNow, 1500);
}
// pick up changes made on another device (only when nothing local is waiting to be saved)
async function todoPull() {
  if (!currentUser || todoPending || todoBusy) return;
  try {
    const snap = await db.collection('users').doc(currentUser.uid).get();
    const t = snap.exists ? (snap.data() || {}).todo : null;
    if (t && (t.savedAt || 0) > TodoTool.lastKnown() && !todoPending && !todoBusy) TodoTool.replace(t);
  } catch (e) { console.error('To Do refresh failed', e); }
}
document.addEventListener('visibilitychange', () => { if (document.hidden) { if (todoPending) todoSaveNow(); } else todoPull(); });
window.addEventListener('pagehide', () => { if (todoPending) todoSaveNow(); });

// ---- Prelims Revision tracker cloud sync (stored in users/{uid}.revision) ----
let revStored = null, revPending = null, revTimer = null;
function revQueueSave(data) {
  revPending = data;
  setSyncStatus('Saving…');
  clearTimeout(revTimer);
  revTimer = setTimeout(revSaveNow, 1000);
}
async function revSaveNow() {
  clearTimeout(revTimer);
  if (!currentUser || !revPending) return;
  const payload = JSON.parse(JSON.stringify(revPending));
  revPending = null;
  try {
    // mergeFields replaces the whole `revision` field, so deleted subjects/chapters are really removed
    await db.collection('users').doc(currentUser.uid).set({ revision: payload }, { mergeFields: ['revision'] });
    setSyncStatus('Saved ✓');
  } catch (e) {
    console.error('Prelims Revision save failed', e);
    revPending = revPending || payload;
    setSyncStatus('Save failed — check connection');
  }
}
document.addEventListener('visibilitychange', () => { if (document.hidden && revPending) revSaveNow(); });
window.addEventListener('pagehide', () => { if (revPending) revSaveNow(); });

// ---- Mains Revision tracker cloud sync (stored in users/{uid}.mains) ----
let mainsStored = null, mainsPending = null, mainsTimer = null;
function mainsQueueSave(data) {
  mainsPending = data;
  setSyncStatus('Saving…');
  clearTimeout(mainsTimer);
  mainsTimer = setTimeout(mainsSaveNow, 1000);
}
async function mainsSaveNow() {
  clearTimeout(mainsTimer);
  if (!currentUser || !mainsPending) return;
  const payload = JSON.parse(JSON.stringify(mainsPending));
  mainsPending = null;
  try {
    // mergeFields replaces the whole `mains` field, so the old-format data is removed and deleted items stay deleted
    await db.collection('users').doc(currentUser.uid).set({ mains: payload }, { mergeFields: ['mains'] });
    setSyncStatus('Saved ✓');
  } catch (e) {
    console.error('Mains save failed', e);
    mainsPending = mainsPending || payload;
    setSyncStatus('Save failed — check connection');
  }
}
document.addEventListener('visibilitychange', () => { if (document.hidden && mainsPending) mainsSaveNow(); });
window.addEventListener('pagehide', () => { if (mainsPending) mainsSaveNow(); });
let saveTimer = null;

// ---- PNP tracker cloud sync (stored in users/{uid}.pnp) ----
let pnpStored = null, pnpPending = null, pnpTimer = null;
function pnpQueueSave(data) {
  pnpPending = data;
  setSyncStatus('Saving…');
  clearTimeout(pnpTimer);
  pnpTimer = setTimeout(pnpSaveNow, 1000);
}
async function pnpSaveNow() {
  clearTimeout(pnpTimer);
  if (!currentUser || !pnpPending) return;
  const payload = JSON.parse(JSON.stringify(pnpPending));
  pnpPending = null;
  try {
    // mergeFields replaces the whole `pnp` field, so restored/removed entries are really removed
    await db.collection('users').doc(currentUser.uid).set({ pnp: payload }, { mergeFields: ['pnp'] });
    setSyncStatus('Saved ✓');
  } catch (e) {
    console.error('PNP save failed', e);
    pnpPending = pnpPending || payload;
    setSyncStatus('Save failed — check connection');
  }
}
document.addEventListener('visibilitychange', () => { if (document.hidden && pnpPending) pnpSaveNow(); });
window.addEventListener('pagehide', () => { if (pnpPending) pnpSaveNow(); });

// ---- Mains Report Card cloud sync (stored in users/{uid}.mainsReport) ----
let mrcStored = null, mrcPending = null, mrcTimer = null;
function mrcQueueSave(data) { mrcPending = data; setSyncStatus('Saving…'); clearTimeout(mrcTimer); mrcTimer = setTimeout(mrcSaveNow, 1000); }
async function mrcSaveNow() {
  clearTimeout(mrcTimer);
  if (!currentUser || !mrcPending) return;
  const payload = JSON.parse(JSON.stringify(mrcPending));
  mrcPending = null;
  try {
    await db.collection('users').doc(currentUser.uid).set({ mainsReport: payload }, { mergeFields: ['mainsReport'] });
    setSyncStatus('Saved ✓');
  } catch (e) {
    console.error('Mains Report Card save failed', e);
    mrcPending = mrcPending || payload;
    setSyncStatus('Save failed — check connection');
  }
}
document.addEventListener('visibilitychange', () => { if (document.hidden && mrcPending) mrcSaveNow(); });
window.addEventListener('pagehide', () => { if (mrcPending) mrcSaveNow(); });

function setSyncStatus(text) {
  const el = document.getElementById('sync-status');
  if (el) el.textContent = text;
  document.documentElement.dataset.sync = /fail/i.test(text) ? 'error' : /saving|loading/i.test(text) ? 'busy' : 'ok';
}

function scheduleSave() {
  setSyncStatus('Saving…');
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveNow, 1000);
}

async function saveNow() {
  if (!currentUser) return;
  try {
    await db.collection('users').doc(currentUser.uid).set(appState, { merge: true });
    setSyncStatus('Saved ✓');
  } catch (e) {
    console.error('Save failed', e);
    setSyncStatus('Save failed — check connection');
  }
}

async function loadState() {
  const ref = db.collection('users').doc(currentUser.uid);
  const snap = await ref.get();
  if (snap.exists) {
    const d = snap.data() || {};
    revStored = d.revision || null;
    mainsStored = d.mains || null;
    mrcStored = d.mainsReport || null;
    todoStored = d.todo || null;
    appState.prelims = d.prelims || null;
    appState.daily = d.daily || null;
    pnpStored = d.pnp || null;
  } else {
    appState = { prelims: null, daily: null };
    revStored = null;
    pnpStored = null;
    mainsStored = null;
    mrcStored = null;
    todoStored = null;
  }
}

// ---- Login form ----
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const btn = document.getElementById('login-btn');
  const errEl = document.getElementById('login-error');
  errEl.textContent = '';
  btn.disabled = true;
  btn.textContent = 'Logging in…';
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    errEl.textContent = 'Login failed — check your email and password.';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Log in';
  }
});

document.getElementById('logout-btn').addEventListener('click', () => auth.signOut());
document.getElementById('print-btn').addEventListener('click', () => window.print());

document.getElementById('forgot-password-link').addEventListener('click', async (e) => {
  e.preventDefault();
  const msgEl = document.getElementById('login-message');
  const email = document.getElementById('login-email').value.trim();
  if (!email) {
    msgEl.style.color = 'var(--red)';
    msgEl.textContent = 'Type your email above first, then click "Forgot password?" again.';
    document.getElementById('login-email').focus();
    return;
  }
  msgEl.style.color = 'var(--muted)';
  msgEl.textContent = 'Sending reset link…';
  try {
    await auth.sendPasswordResetEmail(email);
    msgEl.style.color = 'var(--green)';
    msgEl.textContent = 'Reset link sent! Check ' + email + ' (including spam) for instructions.';
  } catch (err) {
    msgEl.style.color = 'var(--red)';
    if (err.code === 'auth/user-not-found') {
      msgEl.textContent = 'No account found with that email.';
    } else if (err.code === 'auth/invalid-email') {
      msgEl.textContent = 'That email address looks invalid.';
    } else {
      msgEl.textContent = 'Could not send reset link. Please try again.';
    }
  }
});

// ---- Auth state ----
auth.onAuthStateChanged(async (user) => {
  if (user) {
    currentUser = user;
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app-shell').style.display = 'block';
    document.getElementById('user-email').textContent = user.email || '';
    setSyncStatus('Loading…');
    await loadState();
    RevisionTool.init(revStored, revQueueSave);
    MainsTool.init(mainsStored, mainsQueueSave);
    TodoTool.init(todoStored, todoQueueSave);
    PrelimsTool.init(appState.prelims);
    MrcTool.init(mrcStored, mrcQueueSave);
    DailyTool.init(appState.daily);
    PnpTool.init(pnpStored, pnpQueueSave);
    setSyncStatus('Saved ✓');
  } else {
    currentUser = null;
    clearTimeout(revTimer); revPending = null; revStored = null;
    clearTimeout(pnpTimer); pnpPending = null; pnpStored = null;
    clearTimeout(mainsTimer); mainsPending = null; mainsStored = null;
    clearTimeout(mrcTimer); mrcPending = null; mrcStored = null;
    clearTimeout(todoTimer); todoPending = null; todoStored = null; TodoTool.reset();
    document.getElementById('app-shell').style.display = 'none';
    document.getElementById('login-screen').style.display = 'flex';
  }
});

// ---- Main tab switching ----
document.querySelectorAll('.main-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.main-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.tool-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('tool-' + btn.dataset.tool).classList.add('active');
  });
});
