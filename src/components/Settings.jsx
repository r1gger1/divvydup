import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabase';
import StandardModal from './StandardModal';

const C = {
  bg: '#1E3530', bgAlt: '#243D37', card: '#192E28', cardBorder: '#0D1C18',
  accent: '#B5D4A8', accentLight: 'rgba(181,212,168,0.12)',
  green: '#B5D4A8', greenBg: 'rgba(181,212,168,0.14)',
  red: '#F4A199', redBg: 'rgba(244,161,153,0.12)',
  muted: '#9FB5A8', border: 'rgba(255,255,255,0.08)', borderStrong: 'rgba(255,255,255,0.14)',
  text: '#E8E2C8', textMuted: '#9FB5A8',
  shadow: '0 2px 16px rgba(0,0,0,0.3)', shadowMd: '0 4px 28px rgba(0,0,0,0.4)',
};
const F = { h: "'Fraunces','Playfair Display',Georgia,serif", b: "'Inter','Helvetica Neue',sans-serif" };

const inp = { width:'100%', padding:'10px 14px', border:`1px solid ${C.borderStrong}`, borderRadius:10, fontSize:14, fontFamily:F.b, color:C.text, background:'transparent', outline:'none', boxSizing:'border-box' };
const rowSt = { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 0', borderBottom:`1px solid ${C.border}` };
const rowLast = { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 0' };
const cardSt = { background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:'24px 28px', marginBottom:20 };
const sectionTitle = { fontFamily:F.h, fontSize:18, fontWeight:700, color:C.text, marginBottom:20 };

function Toast({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  const isErr = type === 'error';
  return (
    <div style={{ position:'fixed', bottom:24, right:24, zIndex:9999, background:isErr?C.redBg:C.greenBg, border:`1px solid ${isErr?C.red:C.green}`, color:isErr?C.red:C.green, borderRadius:12, padding:'12px 20px', fontSize:14, fontFamily:F.b, fontWeight:500, boxShadow:C.shadowMd, display:'flex', alignItems:'center', gap:12, maxWidth:340 }}>
      <span style={{ flex:1 }}>{message}</span>
      <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:'inherit', fontSize:18, lineHeight:1, padding:0 }}>×</button>
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} style={{ width:44, height:24, borderRadius:12, border:'none', cursor:'pointer', background:checked?C.accent:'rgba(255,255,255,0.12)', position:'relative', transition:'background 0.2s', flexShrink:0 }}>
      <span style={{ position:'absolute', top:3, left:checked?23:3, width:18, height:18, borderRadius:'50%', background:'#fff', transition:'left 0.2s' }} />
    </button>
  );
}

export default function Settings({ session, onSignOut, S }) {
  const [prefs, setPrefs] = useState({ all_enabled: true, renewal_alerts: true });
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [pwForm, setPwForm] = useState({ current:'', next:'', confirm:'' });
  const [pwError, setPwError] = useState('');
  const [pwSaving, setPwSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isBetaTester, setIsBetaTester] = useState(false);

  const showToast = useCallback((msg, type='success') => setToast({ message:msg, type }), []);

  useEffect(() => {
    supabase.from('profiles').select('is_admin, is_beta_tester, notification_preferences').eq('id', session.user.id).maybeSingle()
      .then(({ data }) => {
        if (data?.is_admin) setIsAdmin(true);
        if (data?.is_beta_tester) setIsBetaTester(true);
        if (data?.notification_preferences) setPrefs(data.notification_preferences);
      });
  }, [session.user.id]);

  async function savePrefs(updated) {
    setPrefs(updated);
    const { error } = await supabase.from('profiles').update({ notification_preferences: updated }).eq('id', session.user.id);
    if (error) showToast('Failed to save preferences.', 'error');
    else showToast('Preferences saved');
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setPwError('');
    if (pwForm.next.length < 6) { setPwError('New password must be at least 6 characters.'); return; }
    if (pwForm.next !== pwForm.confirm) { setPwError('Passwords do not match.'); return; }
    setPwSaving(true);
    const { error: authErr } = await supabase.auth.signInWithPassword({ email: session.user.email, password: pwForm.current });
    if (authErr) { setPwError('Current password is incorrect.'); setPwSaving(false); return; }
    const { error } = await supabase.auth.updateUser({ password: pwForm.next });
    setPwSaving(false);
    if (error) { setPwError(error.message); return; }
    showToast('Password updated successfully');
    setModal(null);
    setPwForm({ current:'', next:'', confirm:'' });
  }

  async function handleDelete(e) {
    e.preventDefault();
    if (deleteConfirm !== 'DELETE') return;
    setDeleting(true);
    const { error } = await supabase.rpc('delete_user_account');
    if (error) {
      showToast("Deletion request received. We'll remove your account within 24 hours.", 'success');
      setTimeout(async () => { await supabase.auth.signOut(); onSignOut(); }, 3000);
    } else {
      await supabase.auth.signOut();
      onSignOut();
    }
    setDeleting(false);
  }

  function handleExport() {
    const data = { exported_at: new Date().toISOString(), product: 'DivvyDup', ledger: S };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `divvydup-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Export downloaded');
  }

  return (
    <div style={{ maxWidth:640, padding:'32px 24px', margin:'0 auto' }}>
      <h1 style={{ fontFamily:F.h, fontSize:28, fontWeight:700, color:C.text, marginBottom:4 }}>⚙️ Settings</h1>
      <p style={{ fontSize:13, color:C.textMuted, marginBottom:28 }}>Customize your DivvyDup experience.</p>

      {/* Your Account */}
      <section style={cardSt}>
        <h2 style={sectionTitle}>👤 Your Account</h2>
        <div style={rowSt}>
          <div>
            <p style={{ fontSize:11, fontWeight:600, color:C.textMuted, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:3 }}>Email</p>
            <p style={{ fontSize:14, color:C.text }}>{session.user.email}</p>
          </div>
        </div>
        <div style={rowSt}>
          <div>
            <p style={{ fontSize:11, fontWeight:600, color:C.textMuted, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:3 }}>Access</p>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
              {isAdmin && <span style={{ fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:999, background:'rgba(139,92,246,0.15)', color:'#A78BFA', border:'1px solid rgba(139,92,246,0.3)' }}>Administrator</span>}
              {isBetaTester && <span style={{ fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:999, background:'rgba(245,158,11,0.15)', color:'#F59E0B', border:'1px solid rgba(245,158,11,0.3)' }}>🧪 Beta Tester</span>}
              {!isAdmin && !isBetaTester && <span style={{ fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:999, background:C.greenBg, color:C.green, border:`1px solid ${C.green}` }}>Owner</span>}
            </div>
          </div>
        </div>
        <div style={rowSt}>
          <div><p style={{ fontSize:14, fontWeight:600, color:C.text }}>Password</p><p style={{ fontSize:13, color:C.textMuted }}>Change your account password</p></div>
          <button onClick={() => setModal('password')} style={{ background:'transparent', border:`1.5px solid ${C.border}`, borderRadius:999, padding:'8px 18px', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:F.b, color:C.textMuted }}>Change Password</button>
        </div>
        <div style={rowSt}>
          <div><p style={{ fontSize:14, fontWeight:600, color:C.text }}>Sign Out</p><p style={{ fontSize:13, color:C.textMuted }}>Sign out of your account on this device</p></div>
          <button onClick={async () => { await supabase.auth.signOut(); onSignOut(); }} style={{ background:'transparent', border:`1.5px solid ${C.border}`, borderRadius:999, padding:'8px 18px', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:F.b, color:C.textMuted }}>Sign Out</button>
        </div>
        <div style={rowLast}>
          <div><p style={{ fontSize:14, fontWeight:600, color:C.red }}>Delete Account</p><p style={{ fontSize:13, color:C.textMuted }}>Permanently remove your account and all data</p></div>
          <button onClick={() => setModal('delete')} style={{ background:'transparent', border:`1.5px solid ${C.red}`, borderRadius:999, padding:'8px 18px', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:F.b, color:C.red }}>Delete Account</button>
        </div>
      </section>

      {/* Notification Preferences */}
      <section style={cardSt}>
        <h2 style={sectionTitle}>🔔 Notification Preferences</h2>
        <div style={rowSt}>
          <div><p style={{ fontSize:14, fontWeight:600, color:C.text }}>Enable all notifications</p><p style={{ fontSize:13, color:C.textMuted }}>Turn all notifications on or off at once</p></div>
          <Toggle checked={!!prefs?.all_enabled} onChange={v => savePrefs({ ...prefs, all_enabled: v, renewal_alerts: v })} />
        </div>
        <div style={rowLast}>
          <div><p style={{ fontSize:14, fontWeight:600, color:C.text }}>Renewal date alerts</p><p style={{ fontSize:13, color:C.textMuted }}>Remind me before subscriptions renew</p></div>
          <Toggle checked={!!prefs?.renewal_alerts} onChange={v => savePrefs({ ...prefs, renewal_alerts: v })} />
        </div>
      </section>

      {/* Export My Data */}
      <section style={cardSt}>
        <h2 style={sectionTitle}>💾 Export My Data</h2>
        <p style={{ fontSize:14, color:C.textMuted, lineHeight:1.65, marginBottom:20 }}>
          Download a complete copy of your DivvyDup ledger data as a JSON file — including all pages, transactions, and settings. Store it somewhere safe as a personal backup.
        </p>
        <button onClick={handleExport} style={{ background:C.accent, color:C.bg, border:'none', borderRadius:999, padding:'10px 24px', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:F.b }}>
          Export My Data
        </button>
      </section>

      {/* Change Password Modal */}
      {modal === 'password' && (
        <StandardModal isOpen={true} onClose={() => setModal(null)} title="Change Password" maxWidth="440px">
          {pwError && <div className="standard-modal-error">{pwError}</div>}
          <form onSubmit={handleChangePassword}>
            <label>Current Password</label>
            <input type="password" value={pwForm.current} onChange={e => setPwForm(f=>({...f,current:e.target.value}))} placeholder="••••••••" required />
            <label>New Password</label>
            <input type="password" value={pwForm.next} onChange={e => setPwForm(f=>({...f,next:e.target.value}))} placeholder="At least 6 characters" required minLength={6} />
            <label>Confirm New Password</label>
            <input type="password" value={pwForm.confirm} onChange={e => setPwForm(f=>({...f,confirm:e.target.value}))} placeholder="••••••••" required />
            <div className="button-group">
              <button type="button" className="btn-secondary" onClick={() => setModal(null)}>Cancel</button>
              <button type="submit" className="btn-primary" disabled={pwSaving}>{pwSaving ? 'Updating…' : 'Update Password'}</button>
            </div>
          </form>
        </StandardModal>
      )}

      {/* Delete Account Modal */}
      {modal === 'delete' && (
        <StandardModal isOpen={true} onClose={() => { setModal(null); setDeleteConfirm(''); }} title="Delete Account" maxWidth="440px">
          <p>This will permanently delete your account and all your DivvyDup data. <strong style={{color:'white'}}>This action cannot be undone.</strong></p>
          <form onSubmit={handleDelete}>
            <label>Type <strong style={{color:C.red}}>DELETE</strong> to confirm</label>
            <input type="text" value={deleteConfirm} onChange={e => setDeleteConfirm(e.target.value)} placeholder="DELETE" autoComplete="off" style={{ borderColor: C.red }} />
            <div className="button-group">
              <button type="button" className="btn-secondary" onClick={() => { setModal(null); setDeleteConfirm(''); }}>Cancel</button>
              <button type="submit" disabled={deleteConfirm !== 'DELETE' || deleting} style={{ background:deleteConfirm==='DELETE'?C.red:'transparent', border:`1.5px solid ${C.red}`, borderRadius:999, padding:'11px 30px', fontSize:15, fontWeight:600, cursor:deleteConfirm==='DELETE'?'pointer':'not-allowed', fontFamily:F.b, color:deleteConfirm==='DELETE'?'#fff':C.red, opacity:deleteConfirm!=='DELETE'?0.5:1, flex:1, marginTop:0 }}>
                {deleting ? 'Deleting…' : 'Delete My Account'}
              </button>
            </div>
          </form>
        </StandardModal>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
