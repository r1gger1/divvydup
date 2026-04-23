import { useState, useEffect, useRef, useCallback } from 'react';
import { Chart, registerables } from 'chart.js';
import { supabase } from './supabase';
Chart.register(...registerables);

// ─── LANDING PAGE ───────────────────────────────────────────
function LandingPage({onGetStarted,onSignIn}){
  const C = { bg:'#1E3530', bgAlt:'#243D37', black:'#0D1C18', sage:'#B5D4A8', sageHover:'#A2C295', cream:'#E8E2C8', white:'#FFFFFF', muted:'#9FB5A8', border:'rgba(255,255,255,0.08)', borderStrong:'rgba(255,255,255,0.14)' };
  const fh = "'Fraunces','Playfair Display',Georgia,serif";
  const fb = "'Inter','Helvetica Neue',sans-serif";
  return(
    <div style={{fontFamily:fb,background:C.bg,color:C.white,minHeight:'100vh',WebkitFontSmoothing:'antialiased'}}>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700;9..144,800&family=Inter:wght@400;500;600;700&display=swap');`}</style>

      {/* NAV */}
      <nav style={{background:C.black,position:'sticky',top:0,zIndex:100,borderBottom:`1px solid ${C.border}`}}>
        <div style={{maxWidth:'1200px',margin:'0 auto',padding:'0 40px',height:'64px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <span style={{fontFamily:fh,fontSize:'22px',fontWeight:700,color:C.cream,letterSpacing:'-0.01em'}}>DivvyDup</span>
          <div style={{display:'flex',alignItems:'center',gap:'28px'}}>
            <a href="#features" style={{color:C.cream,fontSize:'14px',textDecoration:'none'}}>Features</a>
            <a href="#pricing" style={{color:C.cream,fontSize:'14px',textDecoration:'none'}}>Pricing</a>
            <button onClick={onSignIn} style={{background:'transparent',border:`1.5px solid ${C.cream}`,color:C.cream,borderRadius:'999px',padding:'9px 20px',fontFamily:fb,fontSize:'14px',fontWeight:500,cursor:'pointer',marginRight:'8px'}}>Sign In</button>
            <button onClick={onGetStarted} style={{background:C.sage,color:C.bg,border:'none',borderRadius:'999px',padding:'10px 22px',fontFamily:fb,fontSize:'14px',fontWeight:600,cursor:'pointer'}}>Start Free Trial</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{background:C.bg,padding:'100px 32px 80px',textAlign:'center'}}>
        <h1 style={{fontFamily:fh,fontSize:'clamp(56px,9vw,104px)',fontWeight:800,color:C.cream,lineHeight:1,marginBottom:'24px',letterSpacing:'-0.015em'}}>Your money,<br/>finally organized.</h1>
        <p style={{fontFamily:fh,fontWeight:500,fontSize:'22px',color:C.sage,marginBottom:'28px'}}>The Book, reimagined.</p>
        <p style={{fontSize:'17px',color:C.white,maxWidth:'600px',margin:'0 auto 44px',lineHeight:1.7,fontWeight:400}}>DivvyDup brings the quiet discipline of a paper ledger into the digital age — envelope budgeting, paycheck distribution, and a no-nonsense advisor named Floyd. No spreadsheets. No guesswork.</p>
        <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
          <button onClick={onGetStarted} style={{background:C.sage,color:C.bg,border:'none',borderRadius:'999px',padding:'14px 36px',fontFamily:fb,fontSize:'15px',fontWeight:600,cursor:'pointer'}}>Start free trial</button>
          <a href="#features" style={{background:'transparent',border:`1.5px solid ${C.cream}`,color:C.cream,borderRadius:'999px',padding:'13px 34px',fontSize:'15px',textDecoration:'none',display:'inline-block'}}>See how it works</a>
        </div>
        <p style={{marginTop:'20px',fontSize:'13px',color:C.muted}}>No credit card required · 4 pages · 2 entries each · 3 days free</p>
      </section>

      {/* ORIGIN */}
      <section style={{background:C.bgAlt,padding:'60px 32px',borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`}}>
        <div style={{maxWidth:'900px',margin:'0 auto',display:'grid',gridTemplateColumns:'auto 1fr',gap:'56px',alignItems:'center'}}>
          <div style={{width:'120px',height:'150px',background:C.black,borderRadius:'4px 16px 16px 4px',borderLeft:`8px solid ${C.sage}`,display:'flex',flexDirection:'column',justifyContent:'flex-end',padding:'14px 14px 16px'}}>
            {[1,2,3,4,5].map(i=><div key={i} style={{height:'2px',background:'rgba(255,255,255,0.12)',marginBottom:'8px',borderRadius:'1px',width:i%2===0?'55%':'100%'}}></div>)}
          </div>
          <div>
            <h2 style={{fontFamily:fh,fontSize:'clamp(32px,4vw,42px)',fontWeight:700,color:C.cream,marginBottom:'18px',lineHeight:1.15,letterSpacing:'-0.01em'}}>Born from a ledger kept for sixty years.</h2>
            <p style={{fontSize:'15.5px',color:C.white,lineHeight:1.8,fontWeight:400}}>Tony's father tracked every dollar in a paper columnar ledger — methodical, honest, and unfailing. That book was the family's financial backbone for six decades. DivvyDup is its digital heir: the same discipline, without the pencil.</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{background:C.bg,padding:'66px 32px'}}>
        <p style={{textAlign:'center',fontSize:'12px',fontWeight:600,letterSpacing:'0.14em',textTransform:'uppercase',color:C.muted,marginBottom:'16px'}}>What's inside</p>
        <h2 style={{fontFamily:fh,fontSize:'clamp(42px,5.5vw,68px)',fontWeight:700,textAlign:'center',marginBottom:'64px',color:C.cream,lineHeight:1.05,letterSpacing:'-0.015em'}}>Everything the ledger had. Then some.</h2>
        <div style={{maxWidth:'1200px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:'24px'}}>
          {[
            {title:"Envelope budgeting",desc:"Assign every dollar a job. Budget pages work like real envelopes - money goes in, gets spent down, and you always know exactly what's left."},
            {title:"Paycheck distribution",desc:"Drop in a paycheck and DivvyDup splits it across your pages automatically, weighted by your monthly targets. One step, done."},
            {title:"Auto-Balance",desc:"Flush overages out of donor pages and into the ones that need it - with a full preview before anything moves. No surprises."},
            {title:"Savings targets",desc:"Set a goal. Watch the progress bar fill. Temporary pages close automatically when they hit their target - vacation, car repair, anything."},
            {title:"Floyd, your advisor",desc:"Dry, direct, and old-school. Floyd speaks up when something's worth saying - and stays quiet when it's not. Not Clippy. Never Clippy."},
            {title:"Dashboard view",desc:"Customizable summary cards show the numbers that matter - balances, totals, progress - at a glance. Your ledger, at 30,000 feet."},
          ].map(f=>(
            <div key={f.title} style={{background:C.bgAlt,border:`1px solid ${C.border}`,borderRadius:'20px',padding:'32px 28px'}}>
              <div style={{width:'44px',height:'44px',borderRadius:'12px',background:'rgba(181,212,168,0.18)',marginBottom:'20px'}}></div>
              <h3 style={{fontFamily:fh,fontSize:'22px',fontWeight:700,marginBottom:'12px',color:C.cream,letterSpacing:'-0.01em'}}>{f.title}</h3>
              <p style={{fontSize:'14.5px',color:C.white,lineHeight:1.65,fontWeight:400}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{background:C.bgAlt,padding:'66px 32px',textAlign:'center',borderTop:`1px solid ${C.border}`}}>
        <p style={{fontSize:'12px',fontWeight:600,letterSpacing:'0.14em',textTransform:'uppercase',color:C.muted,marginBottom:'16px'}}>Pricing</p>
        <h2 style={{fontFamily:fh,fontSize:'clamp(42px,5.5vw,68px)',fontWeight:700,color:C.cream,marginBottom:'14px',letterSpacing:'-0.015em'}}>Simple. No tricks.</h2>
        <p style={{fontSize:'16px',color:C.white,marginBottom:'56px',fontWeight:400}}>Pick a plan after your trial. Cancel anytime.</p>
        <div style={{maxWidth:'720px',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px',textAlign:'left'}}>
          <div style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:'20px',padding:'36px 30px'}}>
            <p style={{fontSize:'12px',fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Monthly</p>
            <p style={{fontFamily:fh,fontSize:'48px',fontWeight:700,color:C.cream,lineHeight:1,marginBottom:'4px',letterSpacing:'-0.02em'}}><sup style={{fontSize:'24px',fontWeight:500,verticalAlign:'super'}}>$</sup>5<sub style={{fontSize:'16px',fontWeight:400,verticalAlign:'baseline',color:C.muted}}>/mo</sub></p>
            <p style={{fontSize:'13px',color:C.muted,marginBottom:'28px'}}>Billed monthly</p>
            <ul style={{listStyle:'none',marginBottom:'28px',padding:0}}>
              {['Full ledger access','Cloud sync across devices','Floyd advisor','Unlimited pages & entries'].map(item=>(
                <li key={item} style={{fontSize:'14px',color:C.white,padding:'8px 0',borderBottom:`1px solid ${C.border}`,display:'flex',alignItems:'center',gap:'10px',fontWeight:400}}>
                  <span style={{width:'6px',height:'6px',background:C.sage,borderRadius:'50%',flexShrink:0,display:'inline-block'}}></span>{item}
                </li>
              ))}
            </ul>
            <button onClick={onGetStarted} style={{width:'100%',background:'transparent',border:`1.5px solid ${C.cream}`,color:C.cream,borderRadius:'999px',padding:'13px',fontFamily:fb,fontSize:'14px',fontWeight:500,cursor:'pointer'}}>Get started</button>
          </div>
          <div style={{background:C.bg,border:`2px solid ${C.sage}`,borderRadius:'20px',padding:'36px 30px',position:'relative'}}>
            <div style={{position:'absolute',top:'-14px',left:'50%',transform:'translateX(-50%)',background:C.sage,color:C.bg,fontSize:'11px',fontWeight:700,padding:'5px 18px',borderRadius:'999px',letterSpacing:'0.07em',whiteSpace:'nowrap',textTransform:'uppercase'}}>Best value</div>
            <p style={{fontSize:'12px',fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Annual</p>
            <p style={{fontFamily:fh,fontSize:'48px',fontWeight:700,color:C.cream,lineHeight:1,marginBottom:'4px',letterSpacing:'-0.02em'}}><sup style={{fontSize:'24px',fontWeight:500,verticalAlign:'super'}}>$</sup>50<sub style={{fontSize:'16px',fontWeight:400,verticalAlign:'baseline',color:C.muted}}>/yr</sub></p>
            <p style={{fontSize:'13px',color:C.muted,marginBottom:'28px'}}>Save $10 vs monthly</p>
            <ul style={{listStyle:'none',marginBottom:'28px',padding:0}}>
              {['Everything in Monthly','Priority support','Early access to new features','Data export'].map(item=>(
                <li key={item} style={{fontSize:'14px',color:C.white,padding:'8px 0',borderBottom:`1px solid ${C.border}`,display:'flex',alignItems:'center',gap:'10px',fontWeight:400}}>
                  <span style={{width:'6px',height:'6px',background:C.sage,borderRadius:'50%',flexShrink:0,display:'inline-block'}}></span>{item}
                </li>
              ))}
            </ul>
            <button onClick={onGetStarted} style={{width:'100%',background:C.sage,color:C.bg,border:'none',borderRadius:'999px',padding:'13px',fontFamily:fb,fontSize:'14px',fontWeight:600,cursor:'pointer'}}>Get started</button>
          </div>
        </div>
        <div style={{maxWidth:'720px',margin:'36px auto 0',background:'rgba(181,212,168,0.08)',border:`1px solid ${C.border}`,borderRadius:'14px',padding:'22px 28px',display:'flex',alignItems:'center',gap:'16px',textAlign:'left'}}>
          <div style={{width:'42px',height:'42px',borderRadius:'10px',background:'rgba(181,212,168,0.2)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:'18px'}}>⏱</div>
          <div>
            <h4 style={{fontFamily:fh,fontSize:'16px',fontWeight:700,color:C.cream,marginBottom:'4px'}}>Free trial — no card required</h4>
            <p style={{fontSize:'13px',color:C.white,fontWeight:400,lineHeight:1.55}}>Try DivvyDup for 3 days with 4 pages and 2 entries each. Enough to feel it. Then decide.</p>
          </div>
        </div>
      </section>

      {/* FLOYD */}
      <section style={{background:C.sage,padding:'66px 32px'}}>
        <div style={{maxWidth:'720px',margin:'0 auto',textAlign:'center'}}>
          <p style={{fontSize:'12px',fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:C.bg,marginBottom:'16px'}}>Meet Floyd</p>
          <h2 style={{fontFamily:fh,fontSize:'clamp(42px,5.5vw,68px)',fontWeight:700,color:C.bg,marginBottom:'44px',lineHeight:1.05,letterSpacing:'-0.015em'}}>The advisor who won't let you off easy.</h2>
          <div style={{background:C.bg,borderRadius:'20px 20px 20px 4px',padding:'28px 32px',marginBottom:'14px',textAlign:'left'}}>
            <p style={{fontFamily:fh,fontSize:'17px',lineHeight:1.65,color:C.cream,fontWeight:500}}>"You've overspent Dining Out three months running. That's not bad luck — that's a budget that needs adjusting. Want to fix it, or are we going to have this conversation again next month?"</p>
          </div>
          <p style={{fontSize:'12px',fontWeight:600,letterSpacing:'0.07em',textTransform:'uppercase',color:C.bg,textAlign:'left',paddingLeft:'4px'}}>Floyd — your DivvyDup advisor</p>
          <p style={{marginTop:'40px',fontSize:'15px',color:C.bg,fontWeight:400,lineHeight:1.7}}>Floyd is built into every account. His name is yours to change. His opinion is not.</p>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section style={{background:C.bg,padding:'66px 32px',textAlign:'center'}}>
        <h2 style={{fontFamily:fh,fontSize:'clamp(52px,7vw,92px)',fontWeight:700,color:C.cream,marginBottom:'32px',letterSpacing:'-0.015em'}}>Ready to open The Book?</h2>
        <button onClick={onGetStarted} style={{background:C.sage,color:C.bg,border:'none',borderRadius:'999px',padding:'16px 44px',fontFamily:fb,fontSize:'16px',fontWeight:600,cursor:'pointer'}}>Start free trial</button>
        <p style={{marginTop:'16px',fontSize:'14px',color:C.muted}}>No card, no commitment.</p>
      </section>

      {/* FOOTER */}
      <footer style={{background:C.black,padding:'48px 32px 32px',textAlign:'center',borderTop:`1px solid ${C.border}`}}>
        <p style={{fontFamily:fh,fontSize:'20px',fontWeight:700,color:C.cream,marginBottom:'6px',letterSpacing:'-0.01em'}}>DivvyDup</p>
        <p style={{fontFamily:fh,fontSize:'13px',color:C.sage,marginBottom:'20px',fontWeight:500}}>The Book, reimagined.</p>
        <p style={{fontSize:'13px',color:C.muted}}><a href="https://startinglinehq.com" style={{color:C.muted,textDecoration:'none'}}>StartinglineHQ</a>{' · '}<a href="/privacy" style={{color:C.muted,textDecoration:'none'}}>Privacy</a>{' · '}<a href="/terms" style={{color:C.muted,textDecoration:'none'}}>Terms</a></p>
        <p style={{fontSize:'12px',color:C.muted,marginTop:'10px',opacity:0.7}}>{'©'} 2026 StartinglineHQ. All rights reserved.</p>
      </footer>

    </div>
  );
}



// ─── AUTH SCREEN ───────────────────────────────────────────
function AuthScreen({onAuth,onBack,initialError,initialMode}){
  const [mode,setMode]=useState(initialMode==='signin'?'signin':'signup'); // 'signup'|'signin'
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [confirm,setConfirm]=useState('');
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);
  const [done,setDone]=useState(false);

  async function handleSignUp(){
    if(!email.trim()||!password)return setError('Email and password are required.');
    if(password.length<6)return setError('Password must be at least 6 characters.');
    if(password!==confirm)return setError('Passwords do not match.');
    setError('');setLoading(true);
    const{error:err}=await supabase.auth.signUp({email:email.trim(),password});
    setLoading(false);
    if(err)return setError(err.message);
    setDone(true);
  }

  async function handleSignIn(){
    if(!email.trim()||!password)return setError('Email and password are required.');
    setError('');setLoading(true);
    const{data,error:err}=await supabase.auth.signInWithPassword({email:email.trim(),password});
    setLoading(false);
    if(err)return setError(err.message);
    if(data?.session)onAuth(data.session);
  }

  const inp={background:'#fff',border:'1.5px solid #D9C9B0',borderRadius:'10px',padding:'11px 14px',fontFamily:"'Instrument Sans',sans-serif",fontSize:'15px',color:'#1C1208',width:'100%',boxSizing:'border-box',outline:'none'};
  const btn={background:'#C4820F',color:'#fff',border:'none',borderRadius:'999px',padding:'13px',fontFamily:"'Instrument Sans',sans-serif",fontSize:'15px',fontWeight:600,cursor:'pointer',width:'100%',boxShadow:'0 3px 14px rgba(180,110,10,0.42)'};
  const ghost={background:'transparent',border:'1.5px solid #D9C9B0',borderRadius:'999px',padding:'11px',fontFamily:"'Instrument Sans',sans-serif",fontSize:'14px',color:'#5C4428',cursor:'pointer',width:'100%'};

  return(
    <div style={{fontFamily:"'Instrument Sans','Helvetica Neue',sans-serif",background:'#F2E8D9',minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'32px 20px'}}>
      <div style={{maxWidth:'420px',width:'100%'}}>

        {/* Back */}
        <button onClick={onBack} style={{background:'none',border:'none',color:'#A08060',fontSize:'14px',cursor:'pointer',padding:'0 0 24px',display:'flex',alignItems:'center',gap:'6px'}}>← Back</button>

        {/* Brand */}
        <div style={{textAlign:'center',marginBottom:'36px'}}>
          <p style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'28px',fontWeight:600,color:'#1C1208',marginBottom:'4px'}}>DivvyDup</p>
          <p style={{fontFamily:"'Playfair Display',Georgia,serif",fontStyle:'italic',fontSize:'14px',color:'#A08060'}}>The Book, reimagined.</p>
        </div>

        {initialError&&(
          <div style={{background:'#FFF8E6',border:'1.5px solid #C4820F',borderRadius:'12px',padding:'16px 20px',marginBottom:'20px',textAlign:'center'}}>
            <p style={{fontSize:'15px',fontWeight:600,color:'#7A3E14',marginBottom:'6px'}}>That confirmation link has expired.</p>
            <p style={{fontSize:'13px',color:'#5C4428',lineHeight:1.6,fontWeight:300}}>Sign in below and we'll send you a fresh one — or create a new account if you haven't confirmed yet.</p>
          </div>
        )}

        {done?(
          <div style={{background:'#fff',border:'1px solid #E4D7C4',borderRadius:'18px',padding:'36px 32px',textAlign:'center'}}>
            <div style={{fontSize:'32px',marginBottom:'16px'}}>📬</div>
            <h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'22px',fontWeight:600,color:'#1C1208',marginBottom:'12px'}}>Check your email</h2>
            <p style={{fontSize:'15px',color:'#5C4428',lineHeight:1.7,fontWeight:300}}>We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account, then come back here to sign in.</p>
            <button style={{...ghost,marginTop:'24px'}} onClick={()=>{setMode('signin');setDone(false);setPassword('');setConfirm('');}}>Go to Sign In</button>
          </div>
        ):(
          <div style={{background:'#fff',border:'1px solid #E4D7C4',borderRadius:'18px',padding:'36px 32px'}}>

            {/* Tabs */}
            <div style={{display:'flex',background:'#F2E8D9',borderRadius:'999px',padding:'4px',marginBottom:'28px'}}>
              {['signup','signin'].map(m=>(
                <button key={m} onClick={()=>{setMode(m);setError('');}} style={{flex:1,background:mode===m?'#fff':'transparent',border:'none',borderRadius:'999px',padding:'9px',fontFamily:"'Instrument Sans',sans-serif",fontSize:'14px',fontWeight:mode===m?600:400,color:mode===m?'#1C1208':'#A08060',cursor:'pointer',transition:'all .15s',boxShadow:mode===m?'0 1px 4px rgba(0,0,0,.1)':'none'}}>
                  {m==='signup'?'Create Account':'Sign In'}
                </button>
              ))}
            </div>

            {/* Fields */}
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <div>
                <label style={{display:'block',fontSize:'12px',fontWeight:600,color:'#5C4428',marginBottom:'6px',letterSpacing:'0.05em'}}>Email</label>
                <input style={inp} type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email"/>
              </div>
              <div>
                <label style={{display:'block',fontSize:'12px',fontWeight:600,color:'#5C4428',marginBottom:'6px',letterSpacing:'0.05em'}}>Password</label>
                <input style={inp} type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder={mode==='signup'?'At least 6 characters':'Your password'} autoComplete={mode==='signup'?'new-password':'current-password'}/>
              </div>
              {mode==='signup'&&(
                <div>
                  <label style={{display:'block',fontSize:'12px',fontWeight:600,color:'#5C4428',marginBottom:'6px',letterSpacing:'0.05em'}}>Confirm Password</label>
                  <input style={inp} type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Repeat password" autoComplete="new-password"/>
                </div>
              )}
            </div>

            {error&&<div style={{marginTop:'14px',background:'#FFE5E8',border:'1px solid #9B2335',borderRadius:'10px',padding:'10px 14px',fontSize:'13px',color:'#9B2335'}}>{error}</div>}

            <button style={{...btn,marginTop:'22px',opacity:loading?.6:1}} onClick={mode==='signup'?handleSignUp:handleSignIn} disabled={loading}>
              {loading?'Please wait…':mode==='signup'?'Create My Account':'Sign In to My Ledger'}
            </button>

            <p style={{textAlign:'center',marginTop:'16px',fontSize:'13px',color:'#A08060',fontWeight:300}}>
              {mode==='signup'?'Already have an account? ':'New here? '}
              <button onClick={()=>{setMode(mode==='signup'?'signin':'signup');setError('');}} style={{background:'none',border:'none',color:'#7A3E14',fontSize:'13px',fontWeight:600,cursor:'pointer',textDecoration:'underline',padding:0}}>
                {mode==='signup'?'Sign in':'Create one'}
              </button>
            </p>
          </div>
        )}

        <p style={{textAlign:'center',marginTop:'20px',fontSize:'12px',color:'#A08060',fontWeight:300}}>No credit card required · 3-day free trial</p>
      </div>
    </div>
  );
}

// ─── CATALOG ───────────────────────────────────────────────
const CATALOG = [
  {id:'rent',icon:'🏠',name:'Rent / Mortgage',cat:'Housing'},
  {id:'hoa',icon:'🏘',name:'HOA Dues',cat:'Housing'},
  {id:'renters_ins',icon:'🛡',name:"Renter's Insurance",cat:'Housing'},
  {id:'home_repair',icon:'🔧',name:'Home Repairs',cat:'Housing'},
  {id:'electric',icon:'⚡',name:'Electric',cat:'Utilities'},
  {id:'gas_util',icon:'🔥',name:'Gas / Heat',cat:'Utilities'},
  {id:'water',icon:'💧',name:'Water & Sewer',cat:'Utilities'},
  {id:'internet',icon:'📡',name:'Internet',cat:'Utilities'},
  {id:'phone',icon:'📱',name:'Cell Phone',cat:'Utilities'},
  {id:'cable',icon:'📺',name:'Cable / Streaming',cat:'Utilities'},
  {id:'groceries',icon:'🛒',name:'Groceries',cat:'Food'},
  {id:'dining',icon:'🍽',name:'Dining Out',cat:'Food'},
  {id:'car_pmt',icon:'🚗',name:'Car Payment',cat:'Transportation'},
  {id:'car_ins',icon:'🚙',name:'Car Insurance',cat:'Transportation'},
  {id:'gas_fuel',icon:'⛽',name:'Gas / Fuel',cat:'Transportation'},
  {id:'car_maint',icon:'🔩',name:'Car Maintenance',cat:'Transportation'},
  {id:'parking',icon:'🅿',name:'Parking / Tolls',cat:'Transportation'},
  {id:'health_ins',icon:'❤',name:'Health Insurance',cat:'Health'},
  {id:'doctor',icon:'🏥',name:'Doctor / Copays',cat:'Health'},
  {id:'dental',icon:'🦷',name:'Dental',cat:'Health'},
  {id:'prescripts',icon:'💊',name:'Prescriptions',cat:'Health'},
  {id:'gym',icon:'💪',name:'Gym / Fitness',cat:'Health'},
  {id:'childcare',icon:'👶',name:'Childcare / Daycare',cat:'Kids'},
  {id:'school',icon:'🎒',name:'School / Tuition',cat:'Kids'},
  {id:'kids_act',icon:'⚽',name:'Kids Activities',cat:'Kids'},
  {id:'clothing',icon:'👕',name:'Clothing',cat:'Kids'},
  {id:'pet',icon:'🐾',name:'Pet Care',cat:'Kids'},
  {id:'savings',icon:'🏦',name:'Savings',cat:'Savings'},
  {id:'emergency',icon:'🚨',name:'Emergency Fund',cat:'Savings'},
  {id:'retirement',icon:'🌅',name:'Retirement',cat:'Savings'},
  {id:'credit_card',icon:'💳',name:'Credit Card',cat:'Savings'},
  {id:'student_loan',icon:'🎓',name:'Student Loans',cat:'Savings'},
  {id:'entertainment',icon:'🎬',name:'Entertainment',cat:'Lifestyle'},
  {id:'subscriptions',icon:'📦',name:'Subscriptions',cat:'Lifestyle'},
  {id:'haircare',icon:'✂',name:'Personal Care',cat:'Lifestyle'},
  {id:'gifts',icon:'🎁',name:'Gifts & Holidays',cat:'Lifestyle'},
  {id:'vacation',icon:'✈',name:'Vacation / Travel',cat:'Lifestyle'},
  {id:'donations',icon:'🤝',name:'Donations',cat:'Lifestyle'},
  {id:'misc',icon:'📂',name:'Miscellaneous',cat:'Other'},
];

const ICON_SET = ['🏠','🏘','🛡','🔧','⚡','🔥','💧','📡','📱','📺','🛒','🍽','🚗','🚙','⛽','🔩','🅿','❤','🏥','🦷','💊','💪','👶','🎒','⚽','👕','🐾','🏦','🚨','🌅','💳','🎓','🎬','📦','✂','🎁','✈','🤝','📂','🏡','💡','📰','🎵','☕','🍕','🛁','🪴','🐕','🐈','🌿','📅','🗒','💼','🏋','🎯','🧾'];

const SUBITEMS_PAGES = ['cable','subscriptions','phone','health_ins','car_ins','renters_ins','internet','electric','gas_util','water','groceries','childcare','school','kids_act','pet','gym','dining','entertainment','credit_card'];
const SUBITEMS_HINTS = {
  cable:"List each streaming or TV service individually — you might be surprised how many there are!",
  subscriptions:"Add every subscription: apps, boxes, memberships, software.",
  phone:"Add each phone line on your plan.",
  health_ins:"Break out medical, dental, vision separately if on separate plans.",
  car_ins:"Add each vehicle on the policy.",
  internet:"List your provider and any equipment rental fees.",
  entertainment:"Movies, concerts, events — itemize recurring ones.",
  gym:"Add each gym or fitness membership separately.",
  dining:"Track recurring lunch spots or meal delivery services.",
  pet:"Food, vet plan, grooming — list each.",
  groceries:"Track different stores or meal-kit services.",
  kids_act:"List each sport, class, or club.",
  credit_card:"List each card and its minimum or planned payment.",
};

// ─── UTILS ─────────────────────────────────────────────────
function fmt(n){if(n===undefined||n===null)return'—';return(n<0?'-$':'$')+Math.abs(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,',');}
function fmtD(d){if(!d)return'';const p=d.split('-');return`${p[1]}/${p[2]}/${p[0].slice(2)}`;}
function today(){return new Date().toISOString().split('T')[0];}
function supportsSubitems(id){return SUBITEMS_PAGES.some(s=>id.includes(s)||id===s);}

// ─── STORAGE ───────────────────────────────────────────────
const STORAGE_KEY = 'famLedger';
const LEGACY_KEYS = [STORAGE_KEY,'famLedger_v5','famLedger_v4','famLedger_v3','famLedger_v2','famLedger_v1','divvydup_ledger_v5'];
const SUPABASE_KEY_PREFIX = 'sb-bvuzrhmqcrepsevkdutt-';
function saveState(s){try{const d={...s,_version:5};localStorage.setItem(STORAGE_KEY,JSON.stringify(d));}catch(e){}}
function clearSupabaseAuth(){
  try{
    const toRemove=[];
    for(let i=0;i<localStorage.length;i++){
      const k=localStorage.key(i);
      if(k && k.startsWith(SUPABASE_KEY_PREFIX)) toRemove.push(k);
    }
    for(const k of toRemove){try{localStorage.removeItem(k);}catch(e){}}
  }catch(e){}
}
function clearStoredState(){
  for(const k of LEGACY_KEYS){try{localStorage.removeItem(k);}catch(e){}}
  clearSupabaseAuth();
}
function loadState(){
  try{
    const keys=[STORAGE_KEY,'famLedger_v5','famLedger_v4','famLedger_v3','famLedger_v2','famLedger_v1'];
    let raw=null;
    for(const k of keys){raw=localStorage.getItem(k);if(raw)break;}
    if(!raw)return null;
    const s=JSON.parse(raw);
    if(!s.lastBalanced)s.lastBalanced=null;
    if(!s.overflowRules)s.overflowRules=[];
    if(!s.donorPages)s.donorPages=[];
    if(!s.dashCards||!s.dashCards.length)s.dashCards=s.pages.map(p=>p.id);
    if(!s.advisorName)s.advisorName='Floyd';
    return s;
  }catch(e){}
  return null;
}

const DEFAULT_STATE = {
  name:'DivvyDup',freq:26,paycheck:0,overflow:'savings',
  pages:[],activePage:null,ready:false,
  lastBalanced:null,overflowRules:[],donorPages:[],dashCards:[],advisorName:'Floyd'
};
const DEFAULT_SELECTED = ['rent','electric','groceries','gas_fuel']; // capped at TRIAL_MAX_PAGES (4)

// ─── TIPS ──────────────────────────────────────────────────
function getTips(advisorName,ledgerName){
  const n=advisorName||'Floyd';
  const u=ledgerName?ledgerName.charAt(0).toUpperCase()+ledgerName.slice(1):'';
  return [
    `${n} here. A small cushion today prevents a big scramble tomorrow. Trust me on that one.`,
    `${u?u+', this':'This'} ledger works the same way the old paper ones did — one honest entry at a time. Don't overthink it.`,
    `If a page hits zero before the next paycheck, that's the ledger telling you something. Listen to it.`,
    `${n}'s rule: build each page up to two months of bills. Do that and you'll sleep better.`,
    `When something unexpected comes up, move money between pages before you touch savings. That's what the pages are for.`,
    `${n} says: review your amounts once a month. Bills change. Your ledger should too.`,
    `Paying yourself first — into Savings — is the oldest trick in the book. Literally.`,
    `If a page keeps running low, that's not bad luck. That's the ledger telling you the number needs adjusting.`,
    `${u?u+', the':'The'} best budget is one you actually use. You're here. That already puts you ahead.`,
    `${n} has seen a lot of ledgers. The ones that work are the ones that get opened regularly.`,
  ];
}

// ═══════════════════════════════════════════════════════════
// TRIAL HELPERS
// ═══════════════════════════════════════════════════════════
const TRIAL_DAYS = 3;
const TRIAL_MAX_PAGES = 4;
const TRIAL_MAX_ENTRIES = 2;

function getTrialInfo(session){
  // No session = localStorage-only user, no trial enforcement
  if(!session) return {active:false,expired:false,daysLeft:null};
  const created = new Date(session.user.created_at);
  const now = new Date();
  const diffMs = now - created;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  const daysLeft = Math.max(0, Math.ceil(TRIAL_DAYS - diffDays));
  const expired = diffDays >= TRIAL_DAYS;
  return {active:true, expired, daysLeft};
}

// ─── TRIAL EXPIRED SCREEN ───────────────────────────────────
function TrialExpiredScreen({onSignOut}){
  return(
    <div style={{fontFamily:"'Instrument Sans','Helvetica Neue',sans-serif",background:'#F2E8D9',minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'32px 20px'}}>
      <div style={{maxWidth:'480px',width:'100%',textAlign:'center'}}>

        {/* Brand */}
        <p style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'28px',fontWeight:600,color:'#1C1208',marginBottom:'4px'}}>DivvyDup</p>
        <p style={{fontFamily:"'Playfair Display',Georgia,serif",fontStyle:'italic',fontSize:'14px',color:'#A08060',marginBottom:'48px'}}>The Book, reimagined.</p>

        {/* Card */}
        <div style={{background:'#fff',border:'1px solid #E4D7C4',borderRadius:'20px',padding:'40px 36px'}}>
          <div style={{fontSize:'36px',marginBottom:'20px'}}>📒</div>
          <h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'24px',fontWeight:600,color:'#1C1208',marginBottom:'12px',lineHeight:1.3}}>Your free trial has ended.</h2>
          <p style={{fontSize:'15px',color:'#5C4428',lineHeight:1.75,fontWeight:300,marginBottom:'28px'}}>
            Thanks for giving DivvyDup a look. Paid plans are on their way — and when they arrive, your ledger will be right where you left it.
          </p>

          <div style={{background:'#FDF0DC',border:'1px solid #E4D7C4',borderRadius:'14px',padding:'20px 24px',marginBottom:'28px',textAlign:'left'}}>
            <p style={{fontSize:'13px',fontWeight:600,color:'#7A3E14',marginBottom:'6px',letterSpacing:'0.04em',textTransform:'uppercase'}}>Want early access?</p>
            <p style={{fontSize:'14px',color:'#5C4428',lineHeight:1.65,fontWeight:300,marginBottom:'14px'}}>Drop us a line and we'll let you know the moment plans are available — and make sure your data is waiting for you.</p>
            <a href="mailto:hello@startinglinehq.com?subject=DivvyDup Early Access" style={{display:'inline-block',background:'#C4820F',color:'#fff',borderRadius:'999px',padding:'11px 28px',fontSize:'14px',fontWeight:600,textDecoration:'none',boxShadow:'0 3px 14px rgba(180,110,10,0.42)'}}>
              Email us for early access
            </a>
          </div>

          <button onClick={onSignOut} style={{background:'none',border:'none',color:'#A08060',fontSize:'13px',cursor:'pointer',textDecoration:'underline',fontFamily:"'Instrument Sans',sans-serif"}}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════
export default function App() {
  const [S, setS] = useState(DEFAULT_STATE);
  const [view, setView] = useState('dashboard');
  const [toast, setToast] = useState({msg:'',cls:'',show:false});
  const [advMsg, setAdvMsg] = useState({msg:'',lvl:'normal',show:false,name:''});
  const [modal, setModal] = useState(null); // 'dep'|'xfr'|'edit'|'recon'|'overflow'|'bailout'|'customize'|'reset'
  const [screen, setScreen] = useState('loading'); // 'loading'|'landing'|'auth'|'setup'|'app'
  const [authSession, setAuthSession] = useState(null);
  const [authError, setAuthError] = useState('');
  const [authMode, setAuthMode] = useState('signup');
  const [feedbackModal, setFeedbackModal] = useState(false);
  const toastTimer = useRef(null);
  const advTimer = useRef(null);

  // Load on mount — check Supabase session first, then fall back to localStorage
  useEffect(()=>{
    let subscription;

    const init = async () => {
      // Hub-driven force signout: clear any stale local session before doing ANYTHING else
      const searchParams = new URLSearchParams(window.location.search);
      if(searchParams.get('force_signout') === 'true'){
        await supabase.auth.signOut();
        clearStoredState();
        window.history.replaceState(null,'',window.location.pathname);
        setScreen('landing');
        setS(DEFAULT_STATE);
        return;
      }

      // Check for Supabase error params in URL (e.g. expired confirmation link)
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.replace('#',''));
      const urlError = params.get('error_description') || params.get('error');
      if(urlError){
        setAuthError(urlError.replace(/\+/g,' '));
        setScreen('auth');
        window.history.replaceState(null,'',window.location.pathname);
        return;
      }

      const {data:{session}} = await supabase.auth.getSession();
      if(session){
        setAuthSession(session);
        const saved = loadState();
        if(saved && saved.ready){
          setS(saved);
          setScreen('app');
        } else {
          setScreen('setup');
        }
      } else {
        // No session — always show landing. Never auto-enter the app from stale localStorage.
        setScreen('landing');
      }

      // Listen for auth state changes (e.g. after email confirmation) — only once we've settled
      const sub = supabase.auth.onAuthStateChange((_event,session)=>{
        if(session&&!authSession){
          setAuthSession(session);
          const saved = loadState();
          if(saved && saved.ready){
            setS(saved);
            setScreen('app');
          } else {
            setScreen('setup');
          }
        }
      });
      subscription = sub.data.subscription;
    };

    init();

    return()=>{ if(subscription) subscription.unsubscribe(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  // Save whenever S changes (and is ready)
  useEffect(()=>{
    if(S.ready) saveState(S);
  },[S]);

  // ── Helpers ──
  const pgById = useCallback((id)=> S.pages.find(p=>p.id===id), [S.pages]);

  function showToast(msg,cls=''){
    if(toastTimer.current) clearTimeout(toastTimer.current);
    setToast({msg,cls,show:true});
    toastTimer.current = setTimeout(()=>setToast(t=>({...t,show:false})),3500);
  }

  function advSay(msg,lvl='normal'){
    if(advTimer.current) clearTimeout(advTimer.current);
    setAdvMsg({msg,lvl,show:true,name:S.advisorName||'Floyd'});
    advTimer.current = setTimeout(()=>setAdvMsg(a=>({...a,show:false})),9000);
  }

  function toggleAdvisor(){
    if(advMsg.show){
      setAdvMsg(a=>({...a,show:false}));
    } else {
      const tips = getTips(S.advisorName, S.name);
      advSay(tips[Math.floor(Math.random()*tips.length)],'normal');
    }
  }

  function updateS(fn){
    setS(prev=>{
      const next = fn({...prev, pages:[...prev.pages.map(p=>({...p,tx:[...p.tx]}))]} );
      if(next.ready) saveState(next);
      return next;
    });
  }

  // ── Launch ──
  function launch(newS){
    setS({...newS,ready:true});
    setScreen('app');
    setView('dashboard');
    setTimeout(()=>{
      const n=newS.advisorName||'Floyd';
      const u=newS.name.charAt(0).toUpperCase()+newS.name.slice(1);
      advSay(`${n} here. Your ledger is open and ready, ${u}. Hit "Deposit Paycheck" to get started — I'll make sure every dollar finds its page.`,'normal');
    },400);
  }

  if(screen==='loading') return null;
  if(screen==='landing') return <LandingPage onGetStarted={()=>{setAuthMode('signup');setScreen('auth');}} onSignIn={()=>{setAuthMode('signin');setScreen('auth');}}/>;
  if(screen==='auth') return <AuthScreen onAuth={(session)=>{setAuthSession(session);const saved=loadState();if(saved&&saved.ready){setS(saved);setScreen('app');}else{setScreen('setup');}}} onBack={()=>{setAuthError('');setScreen('landing');}} initialError={authError} initialMode={authMode}/>;
  if(screen==='setup') return <SetupScreen onLaunch={launch} showToast={showToast}/>;

  // Trial enforcement — only for authenticated users (localStorage-only users bypass)
  const trial = getTrialInfo(authSession);
  if(trial.expired) return <TrialExpiredScreen onSignOut={async()=>{await supabase.auth.signOut();setAuthSession(null);setScreen('landing');setS(DEFAULT_STATE);}}/>;

  const displayName = S.name.charAt(0).toUpperCase()+S.name.slice(1);
  const activePage = pgById(S.activePage);

  return (
    <>
      {/* SUITE NAV */}
      <nav id="suite-nav">
        <div className="snav-group">
          <button className="snav-link" onClick={() => setFeedbackModal(true)}>✏️ Beta Feedback</button>
          <button
            className="snav-link"
            onClick={async () => {
              const { data: { session } } = await supabase.auth.getSession();
              if (session) {
                window.location.href = `https://startinglinehq.com?access_token=${session.access_token}&refresh_token=${session.refresh_token}`;
              } else {
                window.location.href = 'https://startinglinehq.com';
              }
            }}
          >
            ← StartingLine HQ Dashboard
          </button>
          <a href="https://www.divvydup.com/settings" className="snav-link">⚙ Settings</a>
        </div>
        <div className="snav-sep"></div>
        <div className="snav-group">
          <button
            className="snav-link snav-link--signout"
            onClick={async () => {
              await supabase.auth.signOut();
              clearStoredState();
              window.location.href = 'https://startinglinehq.com/?signout=true';
            }}
          >
            Sign out
          </button>
        </div>
      </nav>
      
      <div className="main-app">
      {/* TRIAL BANNER */}
      {trial.active&&!trial.expired&&(
        <div style={{background:'#1C1208',borderBottom:'1px solid rgba(196,130,15,0.3)',padding:'8px 24px',display:'flex',alignItems:'center',justifyContent:'center',gap:'12px',fontSize:'13px',color:'#B8A48C',fontFamily:"'Instrument Sans',sans-serif"}}>
          <span style={{color:'#C4820F',fontWeight:600}}>⏱ Free trial</span>
          <span>{trial.daysLeft===1?'1 day left':trial.daysLeft===0?'Last day':`${trial.daysLeft} days left`} · {TRIAL_MAX_PAGES} pages · {TRIAL_MAX_ENTRIES} entries per page</span>
        </div>
      )}
      {/* HEADER */}
      <header className="app-header">
        <div className="hdr-brand">
          <div className="hdr-mark">{displayName.charAt(0)}</div>
          <span className="hdr-product">DivvyDup</span>
          <span className="hdr-divider">·</span>
          <span className="hdr-ledger-name">{displayName}</span>
        </div>
        <div className="hdr-nav">
          {['dashboard','ledger','charts'].map(v=>(
            <button key={v} className={`hdr-tab${view===v?' active':''}`} onClick={()=>setView(v)}>
              {v.charAt(0).toUpperCase()+v.slice(1)}
            </button>
          ))}
        </div>
        <div className="hdr-acts">
          <button className="btn-xfr" style={{fontSize:'.72rem'}} onClick={()=>setModal('edit')}>⚙ Pages</button>
          <button className="btn-xfr" onClick={()=>setModal('recon')}>⚖ Reconcile</button>
          <button className="btn-xfr" onClick={()=>setModal('overflow')}>🌊 Overflow</button>
          <button className="btn-xfr" onClick={()=>setModal('xfr')}>⇄ Move Money</button>
          <button className="btn-xfr" style={{fontSize:'.68rem',color:'var(--red-light)',borderColor:'rgba(200,64,64,.3)'}} onClick={()=>setModal('reset')}>↺ Reset</button>
          {authSession&&<button className="btn-xfr" style={{fontSize:'.68rem',color:'var(--inkl)',borderColor:'rgba(160,128,96,.3)'}} onClick={async()=>{await supabase.auth.signOut();clearStoredState();window.location.href='https://startinglinehq.com/?signout=true';}}>Sign Out</button>}
          <button className="btn-dep" onClick={()=>setModal('dep')}>+ Deposit Paycheck</button>
        </div>
      </header>

      <div className="app-body">
        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="sb-label">Pages</div>
          {S.pages.map(p=>{
            const dot=p.balance<0?'danger':p.temp?'temp':p.balance<p.monthly*.4&&p.monthly>0?'warn':'';
            const tbcls=p.balance<0?'danger':p.balance<p.monthly*.4&&p.monthly>0?'warn':'';
            return(
              <div key={p.id} className={`ptab${S.activePage===p.id?' active':''}`} onClick={()=>{updateS(s=>({...s,activePage:p.id}));setView('ledger');}}>
                <span className={`sdot${dot?' '+dot:''}`}></span>
                <span className="ti">{p.icon}</span>
                <span className="tinfo">
                  <div className="tn">{p.name}</div>
                  <div className={`tb${tbcls?' '+tbcls:''}`}>{fmt(p.balance)}</div>
                </span>
              </div>
            );
          })}
        </div>

        {/* CONTENT */}
        <div className="content">
          {view==='dashboard' && <DashboardView S={S} updateS={updateS} setModal={setModal} onSelectPage={(id)=>{updateS(s=>({...s,activePage:id}));setView('ledger');}} advSay={advSay}/>}
          {view==='ledger' && <LedgerView S={S} updateS={updateS} activePage={activePage} pgById={pgById} showToast={showToast} advSay={advSay} setModal={setModal} trial={trial}/>}
          {view==='charts' && <ChartsView S={S}/>}
        </div>
      </div>

      {/* MODALS */}
      {modal==='dep' && <DepositModal S={S} updateS={updateS} onClose={()=>setModal(null)} showToast={showToast} advSay={advSay}/>}
      {modal==='xfr' && <TransferModal S={S} updateS={updateS} onClose={()=>setModal(null)} showToast={showToast} advSay={advSay}/>}
      {modal==='edit' && <EditModal S={S} updateS={updateS} onClose={()=>setModal(null)} showToast={showToast} advSay={advSay} trial={trial}/>}
      {modal==='recon' && <ReconModal S={S} updateS={updateS} onClose={()=>setModal(null)} showToast={showToast} advSay={advSay}/>}
      {modal==='overflow' && <OverflowModal S={S} updateS={updateS} onClose={()=>setModal(null)} showToast={showToast} advSay={advSay}/>}
      {modal==='bailout' && <BailoutModal S={S} updateS={updateS} onClose={()=>setModal(null)} showToast={showToast} advSay={advSay}/>}
      {modal==='customize' && <CustomizeModal S={S} updateS={updateS} onClose={()=>setModal(null)} showToast={showToast}/>}
      {modal==='reset' && <ResetModal onClose={()=>setModal(null)} onReset={async()=>{await supabase.auth.signOut();window.location.reload();}}/>}
      {feedbackModal && <BetaFeedbackModal onClose={()=>setFeedbackModal(false)}/>}

      {/* ADVISOR */}
      <div id="advisor">
        {advMsg.show && <div style={{fontFamily:'var(--slhq-fh)',fontSize:'.72rem',fontWeight:600,color:'var(--g7)',textAlign:'right',paddingRight:'4px',letterSpacing:'.5px'}}>{advMsg.name}</div>}
        {advMsg.show && <div id="adv-bubble" className={advMsg.lvl==='danger'?'danger':advMsg.lvl==='warn'?'warn':''} style={{display:'block'}}>{advMsg.msg}</div>}
        <div id="adv-face" onClick={toggleAdvisor} title={`Ask ${S.advisorName||'Floyd'}`}>📒</div>
      </div>

      {/* TOAST */}
      <div className={`toast${toast.show?' show':''} ${toast.cls}`}>{toast.msg}</div>
    </div>

    {/* FEEDBACK MODAL */}
    {feedbackModal && (
      <div 
        style={{
          position:'fixed',
          inset:0,
          background:'rgba(14,26,14,.82)',
          zIndex:500,
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          padding:'20px'
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setFeedbackModal(false);
        }}
      >
        <div className="modal-book" style={{maxWidth:'520px'}}>
          <div className="modal-header">
            <h3>✏️ Beta Feedback</h3>
            <p>Help us improve DivvyDup</p>
          </div>
          <div className="modal-body">
            <p style={{fontSize:'.88rem',color:'var(--ink2)',lineHeight:1.65,marginBottom:'16px'}}>
              We'd love to hear your thoughts on DivvyDup. What's working? What could be better? What features would you like to see?
            </p>
            <textarea 
              id="feedback-text"
              className="modal-input"
              placeholder="Share your feedback here..." 
              style={{
                width:'100%',
                minHeight:'140px',
                resize:'vertical',
                fontSize:'.88rem',
                lineHeight:1.6,
                padding:'12px'
              }}
            />
          </div>
          <div className="modal-footer">
            <button className="btn-cancel" onClick={() => setFeedbackModal(false)}>Cancel</button>
            <button 
              className="btn-ok" 
              onClick={() => {
                const feedback = document.getElementById('feedback-text').value.trim();
                if (!feedback) {
                  alert('Please enter your feedback before submitting.');
                  return;
                }
                const subject = encodeURIComponent('DivvyDup Beta Feedback');
                const body = encodeURIComponent(feedback);
                window.location.href = `mailto:hello@startinglinehq.com?subject=${subject}&body=${body}`;
                setFeedbackModal(false);
              }}
            >
              Send Feedback
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// SETUP SCREEN
// ═══════════════════════════════════════════════════════════
function SetupScreen({onLaunch,showToast}){
  const [step,setStep]=useState(1);
  const [name,setName]=useState('');
  const [freq,setFreq]=useState(26);
  const [paycheck,setPaycheck]=useState('');
  const [overflow,setOverflow]=useState('savings');
  const [advisorName,setAdvisorName]=useState('Floyd');
  const [selected,setSelected]=useState(new Set(DEFAULT_SELECTED));
  const [amounts,setAmounts]=useState({});
  const [cushions,setCushions]=useState({});
  const [setupDonors,setSetupDonors]=useState([]);
  const [donorPick,setDonorPick]=useState('');

  const selectedList = CATALOG.filter(p=>selected.has(p.id));

  function togglePage(id){
    setSelected(prev=>{
      const n=new Set(prev);
      if(!n.has(id)&&n.size>=TRIAL_MAX_PAGES){showToast(`Trial limit: ${TRIAL_MAX_PAGES} pages max. You can add more after upgrading.`,"tw");return prev;}
      n.has(id)?n.delete(id):n.add(id);return n;
    });
  }

  function goStep(n){
    if(n===2&&!name.trim())return showToast("Give your ledger a name first.","tw");
    if(n===3&&selected.size===0)return showToast("Select at least one page.","tw");
    if(n===4){
      const pick=selectedList[0];
      if(pick&&!donorPick)setDonorPick(pick.id);
    }
    setStep(n);
  }

  function getPC(id){
    const m=parseFloat(amounts[id])||0;
    const c=parseFloat(cushions[id])||10;
    return (m+c)*12/freq;
  }

  function finishSetup(){
    const n=name.trim()||'DivvyDup';
    const pages=selectedList.map(p=>{
      const m=parseFloat(amounts[p.id])||0;
      const c=parseFloat(cushions[p.id])||10;
      const pc=parseFloat(((m+c)*12/freq).toFixed(2));
      return {id:p.id,icon:p.icon,name:p.name,cat:p.cat,monthly:m,cushion:c,perCheck:pc,balance:0,tx:[],subitems:[],temp:false,noDispatch:false,target:0};
    });
    // Ensure overflow page exists
    if(!pages.find(p=>p.id===overflow)){
      const op=CATALOG.find(x=>x.id===overflow)||CATALOG.find(x=>x.id==='misc');
      pages.push({id:op.id,icon:op.icon,name:op.name,cat:op.cat,monthly:0,cushion:0,perCheck:0,balance:0,tx:[],subitems:[],temp:false,noDispatch:false,target:0});
    }
    const validDonors=setupDonors.filter(id=>pages.find(p=>p.id===id));
    const newS={
      name:n,freq,paycheck:parseFloat(paycheck)||0,overflow,advisorName:advisorName.trim()||'Floyd',
      pages,activePage:pages[0].id,ready:true,
      lastBalanced:null,overflowRules:[],donorPages:validDonors,dashCards:pages.map(p=>p.id),_version:5
    };
    saveState(newS);
    onLaunch(newS);
  }

  return(
    <div className="setup-screen">
      <div className="setup-book">
        <div className="setup-cover">
          <h1>📒 DivvyDup</h1>
          <p>"The Book, reimagined."</p>
        </div>
        <div className="setup-body">
          <div className="step-tabs">
            {[1,2,3,4].map(i=>(
              <div key={i} className={`step-tab${step===i?' active':step>i?' done':''}`}>
                {i===1?'① Your Household':i===2?'② Choose Pages':i===3?'③ Set Amounts':'④ Auto-Balance'}
              </div>
            ))}
          </div>

          {step===1&&(
            <div>
              <label className="fl">What should we call this ledger?</label>
              <input className="setup-input" type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. The Johnson Family Ledger"/>
              <label className="fl">How often do you get paid?</label>
              <select className="setup-select" value={freq} onChange={e=>setFreq(parseInt(e.target.value))}>
                <option value={52}>Weekly — 52 paychecks per year</option>
                <option value={26}>Bi-Weekly — 26 paychecks per year</option>
                <option value={24}>Semi-Monthly — 24 per year</option>
                <option value={12}>Monthly — 12 per year</option>
              </select>
              <label className="fl">Typical take-home paycheck ($)</label>
              <input className="setup-input" type="number" min="0" step="50" value={paycheck} onChange={e=>setPaycheck(e.target.value)} placeholder="e.g. 2400"/>
              <label className="fl">Leftover funds automatically go to…</label>
              <select className="setup-select" value={overflow} onChange={e=>setOverflow(e.target.value)}>
                <option value="savings">Savings Page</option>
                <option value="misc">Miscellaneous Page</option>
                <option value="emergency">Emergency Fund Page</option>
              </select>
              <label className="fl">What would you like to call your advisor?</label>
              <input className="setup-input" type="text" value={advisorName} onChange={e=>setAdvisorName(e.target.value)} placeholder="Floyd"/>
              <div style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'.76rem',color:'var(--ink3)',marginTop:'4px'}}>Your advisor keeps an eye on things and speaks up when it matters. Default is Floyd.</div>
              <div className="setup-footer">
                <span style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'.78rem',color:'var(--ink3)'}}>Step 1 of 4</span>
                <button className="btn-next" onClick={()=>goStep(2)}>Next: Choose Pages →</button>
              </div>
            </div>
          )}

          {step===2&&(
            <div>
              <p style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'.83rem',color:'var(--ink3)',marginBottom:'13px'}}>Each page is a pocket reserved for that purpose. Check the ones that belong in your household's ledger. <strong>Free trial: up to {TRIAL_MAX_PAGES} pages.</strong></p>
              <div className="pages-grid">
                {CATALOG.map(p=>(
                  <label key={p.id} className={`po${selected.has(p.id)?' sel':''}`}>
                    <input type="checkbox" checked={selected.has(p.id)} onChange={()=>togglePage(p.id)}/>
                    <span className="pg-i">{p.icon}</span>
                    <span><div className="pg-n">{p.name}</div><div className="pg-c">{p.cat}</div></span>
                  </label>
                ))}
              </div>
              <div className="setup-footer">
                <button className="btn-back" onClick={()=>goStep(1)}>← Back</button>
                <button className="btn-next" onClick={()=>goStep(3)}>Next: Set Amounts →</button>
              </div>
            </div>
          )}

          {step===3&&(
            <div>
              <p style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'.83rem',color:'var(--ink3)',marginBottom:'11px'}}>Enter the expected monthly cost for each page. I'll calculate exactly how much to set aside each paycheck — plus a cushion so you're never caught short.</p>
              <div className="amt-head">
                <div>Page</div>
                <div style={{textAlign:'right'}}>Monthly ($)</div>
                <div style={{textAlign:'right'}}>Cushion ($)</div>
                <div style={{textAlign:'right'}}>Per Check</div>
              </div>
              <div className="amt-list">
                {selectedList.map(p=>(
                  <div key={p.id} className="amt-row">
                    <div className="amt-rname"><span>{p.icon}</span>{p.name}</div>
                    <input type="number" min="0" step="5" placeholder="0" value={amounts[p.id]||''} onChange={e=>setAmounts(a=>({...a,[p.id]:e.target.value}))}/>
                    <input type="number" min="0" step="5" placeholder="10" value={cushions[p.id]||''} onChange={e=>setCushions(c=>({...c,[p.id]:e.target.value}))}/>
                    <div className="pcd">{(parseFloat(amounts[p.id])||0)>0?fmt(getPC(p.id)):'—'}</div>
                  </div>
                ))}
              </div>
              <div className="setup-footer">
                <button className="btn-back" onClick={()=>goStep(2)}>← Back</button>
                <button className="btn-next" onClick={()=>goStep(4)}>Next: Auto-Balance →</button>
              </div>
            </div>
          )}

          {step===4&&(
            <div>
              <p style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'.83rem',color:'var(--ink3)',marginBottom:'6px'}}>When the <strong>Auto-Balance</strong> button fires, it pulls from these pages in priority order to cover any pages in the red.</p>
              <p style={{fontSize:'.75rem',color:'var(--ink3)',marginBottom:'14px'}}>You can skip this step and configure it later under ⚙ Pages → Donor Pages.</p>
              <div style={{display:'flex',flexDirection:'column',gap:'7px',marginBottom:'10px'}}>
                {setupDonors.length===0&&<div style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'.8rem',color:'var(--ink3)',padding:'6px 0'}}>No donor pages set — add one below, or skip this step.</div>}
                {setupDonors.map((id,i)=>{
                  const p=CATALOG.find(x=>x.id===id);if(!p)return null;
                  return(
                    <div key={id} style={{display:'flex',alignItems:'center',gap:'9px',background:'#fff',border:'1.5px solid var(--paper3)',borderRadius:'2px',padding:'9px 12px'}}>
                      <span style={{fontSize:'.75rem',color:'var(--g5)',fontWeight:700,minWidth:'20px'}}>#{i+1}</span>
                      <span style={{fontSize:'1rem'}}>{p.icon}</span>
                      <span style={{flex:1,fontSize:'.82rem',fontWeight:700,color:'var(--ink2)'}}>{p.name}</span>
                      <div style={{display:'flex',gap:'4px'}}>
                        {i>0&&<button className="pm-btn up" onClick={()=>{const d=[...setupDonors];[d[i],d[i-1]]=[d[i-1],d[i]];setSetupDonors(d);}}>↑</button>}
                        {i<setupDonors.length-1&&<button className="pm-btn dn" onClick={()=>{const d=[...setupDonors];[d[i],d[i+1]]=[d[i+1],d[i]];setSetupDonors(d);}}>↓</button>}
                        <button className="pm-btn del" onClick={()=>setSetupDonors(setupDonors.filter((_,j)=>j!==i))}>✕</button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'6px'}}>
                <select className="setup-select" style={{flex:1}} value={donorPick} onChange={e=>setDonorPick(e.target.value)}>
                  {selectedList.map(p=><option key={p.id} value={p.id}>{p.icon} {p.name}</option>)}
                </select>
                <button className="btn-next" style={{padding:'9px 16px',fontSize:'.78rem'}} onClick={()=>{
                  if(!donorPick)return;
                  if(setupDonors.includes(donorPick))return showToast("Already in the donor list.","tw");
                  setSetupDonors([...setupDonors,donorPick]);
                }}>+ Add</button>
              </div>
              <div className="setup-footer">
                <button className="btn-back" onClick={()=>goStep(3)}>← Back</button>
                <button className="btn-next" onClick={finishSetup}>Open My Ledger ✓</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// DASHBOARD VIEW
// ═══════════════════════════════════════════════════════════
function DashboardView({S,updateS,setModal,onSelectPage,advSay}){
  const total=S.pages.reduce((s,p)=>s+p.balance,0);
  const monthly=S.pages.reduce((s,p)=>s+p.monthly,0);
  const pc=S.pages.reduce((s,p)=>s+p.perCheck,0);
  const sub=total<0?"We're in the red — something needs attention.":total<monthly?"Running lean. Watch those pages carefully.":"Looking good. Keep it up!";
  const visiblePages=S.pages.filter(p=>(S.dashCards||[]).includes(p.id));
  const donors=(S.donorPages||[]).map(id=>S.pages.find(p=>p.id===id)).filter(p=>p&&p.balance>0);
  const negPages=S.pages.filter(p=>p.balance<0&&!(S.donorPages||[]).includes(p.id));
  const totalShortfall=negPages.reduce((s,p)=>s+Math.abs(p.balance),0);
  const totalDonorFunds=donors.reduce((s,p)=>s+p.balance,0);

  return(
    <div className="view-dashboard">
      <div className="dash-hero">
        <div>
          <div className="dh-label">Total Available Balance</div>
          <div className="dh-total">{fmt(total)}</div>
          <div className="dh-sub">{sub}</div>
        </div>
        <div className="dash-stats">
          <div className="dst"><div className="dst-label">Monthly Bills</div><div className="dst-val amber">{fmt(monthly)}</div></div>
          <div className="dst"><div className="dst-label">Per Paycheck</div><div className="dst-val green">{fmt(pc)}</div></div>
          <div className="dst"><div className="dst-label">Active Pages</div><div className="dst-val">{S.pages.length}</div></div>
          <div className="dst"><div className="dst-label">Last Balanced</div><div className="dst-val" style={{fontSize:'.85rem'}}>{S.lastBalanced?fmtD(S.lastBalanced.split('T')[0]):'—'}</div></div>
        </div>
      </div>

      {negPages.length>0&&(donors.length===0||totalDonorFunds>0)&&(
        <div className="bailout-banner">
          <div className="bailout-left">
            <div className="bailout-icon">🚨</div>
            <div className="bailout-text">
              <div className="bailout-title">PAGES IN THE RED</div>
              <div className="bailout-sub">
                {donors.length===0
                  ?`${negPages.length} page${negPages.length>1?'s are':' is'} overdrawn by ${fmt(totalShortfall)}. No donor pages configured.`
                  :totalDonorFunds>=totalShortfall
                    ?`${negPages.length} page${negPages.length>1?'s are':' is'} overdrawn by ${fmt(totalShortfall)}. Donor pages can cover everything.`
                    :`${negPages.length} page${negPages.length>1?'s are':' is'} overdrawn by ${fmt(totalShortfall)}. Only a partial bailout is possible.`
                }
              </div>
            </div>
          </div>
          {donors.length>0&&<button className="btn-bailout" onClick={()=>setModal('bailout')}>⚡ AUTO-BALANCE NOW</button>}
        </div>
      )}

      <div className="dash-cards-header">
        <div style={{display:'flex',alignItems:'center',gap:'16px',flexWrap:'wrap'}}>
          <span className="dash-cards-label">Pages</span>
          <div style={{display:'flex',alignItems:'center',gap:'10px',flexWrap:'wrap'}}>
            <span style={{display:'flex',alignItems:'center',gap:'4px',fontSize:'.62rem',color:'var(--ink3)'}}><span style={{display:'inline-block',width:'10px',height:'10px',borderRadius:'2px',background:'var(--g5)'}}></span>Healthy</span>
            <span style={{display:'flex',alignItems:'center',gap:'4px',fontSize:'.62rem',color:'var(--ink3)'}}><span style={{display:'inline-block',width:'10px',height:'10px',borderRadius:'2px',background:'var(--red-light)'}}></span>Overdrawn</span>
            <span style={{display:'flex',alignItems:'center',gap:'4px',fontSize:'.62rem',color:'var(--ink3)'}}><span style={{display:'inline-block',width:'10px',height:'10px',borderRadius:'2px',background:'var(--slhq-amber)'}}></span>Temporary</span>
          </div>
        </div>
        <button className="btn-customize" onClick={()=>setModal('customize')}>✎ Customize Cards</button>
      </div>

      <div className="dash-cards">
        {visiblePages.length===0
          ?<div style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'.83rem',color:'var(--ink3)',padding:'12px 0'}}>No cards selected — click "Customize Cards" to choose which pages appear here.</div>
          :visiblePages.map(p=>{
            const tgt=(p.monthly+p.cushion)*2/S.freq;
            const pct=tgt>0?Math.min(p.balance/tgt,1):.5;
            const cls=p.balance<0?'xc':p.temp?'tc':'';
            return(
              <div key={p.id} className={`dc ${cls}`} onClick={()=>onSelectPage(p.id)}>
                <div className="dc-ico">{p.icon}</div>
                <div className="dc-nm">{p.name}</div>
                <div className={`dc-bal${p.balance<0?' low':''}`}>{fmt(p.balance)}</div>
                <div className="dc-sub">Monthly: {fmt(p.monthly)}</div>
                {p.temp&&p.target>0?(
                  <>
                    <div className="dc-target">Goal: {fmt(p.target)} · {Math.min(Math.round(p.balance/p.target*100),100)}%</div>
                    <div className="mbar-target"><div className={`mbar-target-f${p.balance>=p.target?' full':''}`} style={{width:`${Math.min(p.balance/p.target*100,100)}%`}}></div></div>
                  </>
                ):(
                  <div className="mbar"><div className={`mbar-f${p.balance>=p.monthly&&p.monthly>0?' full':p.balance<0?' danger':''}`} style={{width:`${Math.max(pct*100,0)}%`}}></div></div>
                )}
              </div>
            );
          })
        }
      </div>

      <div className="dash-charts">
        <div className="cc"><h3>💰 Where Your Money Lives</h3><DashDonut pages={S.pages}/></div>
        <div className="cc"><h3>📊 Balance by Page</h3><DashBar pages={S.pages}/></div>
      </div>
    </div>
  );
}

function DashDonut({pages}){
  const ref=useRef(null);const chart=useRef(null);
  useEffect(()=>{
    if(chart.current)chart.current.destroy();
    const labels=pages.map(p=>p.name);
    const mons=pages.map(p=>p.monthly);
    const cols=pages.map((_,i)=>`hsl(${108+i*14},38%,${40+(i%5)*7}%)`);
    const f={family:'Courier Prime',size:10};
    chart.current=new Chart(ref.current,{type:'doughnut',data:{labels,datasets:[{data:mons.map(v=>Math.max(v,0)),backgroundColor:cols,borderColor:'#e8f2e0',borderWidth:2}]},options:{responsive:true,plugins:{legend:{position:'right',labels:{font:f,boxWidth:11,padding:9}}}}});
    return()=>{if(chart.current)chart.current.destroy();};
  },[pages]);
  return <canvas ref={ref} style={{maxHeight:'255px'}}/>;
}

function DashBar({pages}){
  const ref=useRef(null);const chart=useRef(null);
  useEffect(()=>{
    if(chart.current)chart.current.destroy();
    const labels=pages.map(p=>p.name);
    const bals=pages.map(p=>p.balance);
    const f={family:'Courier Prime',size:10};
    chart.current=new Chart(ref.current,{type:'bar',data:{labels,datasets:[{label:'Balance',data:bals,backgroundColor:bals.map(v=>v<0?'rgba(122,21,21,.7)':'rgba(42,71,42,.7)'),borderColor:bals.map(v=>v<0?'#7a1515':'#2a472a'),borderWidth:1.5,borderRadius:2}]},options:{responsive:true,plugins:{legend:{display:false}},scales:{x:{ticks:{font:f}},y:{ticks:{font:f,callback:v=>'$'+v.toLocaleString()}}}}});
    return()=>{if(chart.current)chart.current.destroy();};
  },[pages]);
  return <canvas ref={ref} style={{maxHeight:'255px'}}/>;
}

// ═══════════════════════════════════════════════════════════
// LEDGER VIEW
// ═══════════════════════════════════════════════════════════
function LedgerView({S,updateS,activePage,pgById,showToast,advSay,setModal,trial}){
  const [txType,setTxType]=useState('deposit');
  const [txDate,setTxDate]=useState(today());
  const [txAmt,setTxAmt]=useState('');
  const [txDesc,setTxDesc]=useState('');
  const [txNote,setTxNote]=useState('');
  const [txTo,setTxTo]=useState('');
  const [psbMon,setPsbMon]=useState('');
  const [psbCu,setPsbCu]=useState('10');
  const [subOpen,setSubOpen]=useState(false);
  const [siName,setSiName]=useState('');
  const [siAmt,setSiAmt]=useState('');
  const [siCycle,setSiCycle]=useState('monthly');
  const [saveFlash,setSaveFlash]=useState(false);

  const p=activePage;

  useEffect(()=>{
    if(p){
      setPsbMon(p.monthly||'');
      setPsbCu(p.cushion!==undefined?p.cushion:'10');
      const otherPages=S.pages.filter(x=>x.id!==p.id);
      if(otherPages.length>0&&!txTo)setTxTo(otherPages[0].id);
      setTxType('deposit');
    }
  },[p?.id]);

  if(!p) return <div style={{padding:'40px',fontFamily:"'Lora',serif",fontStyle:'italic',color:'var(--ink3)'}}>Select a page from the sidebar.</div>;

  const tin=p.tx.filter(t=>t.type!=='withdrawal'&&t.type!=='transfer_out').reduce((s,t)=>s+t.amount,0);
  const tout=p.tx.filter(t=>t.type==='withdrawal'||t.type==='transfer_out').reduce((s,t)=>s+t.amount,0);
  const psbPc=((parseFloat(psbMon)||0)+(parseFloat(psbCu)||0))*12/S.freq;
  const showTransferPicker=txType==='transfer_out'||txType==='transfer_in';
  const otherPages=S.pages.filter(x=>x.id!==p.id);
  const hasSubs=supportsSubitems(p.id)||(p.subitems&&p.subitems.length>0);
  const siTotal=p.subitems?p.subitems.reduce((s,si)=>s+si.monthlyAmt,0):0;

  function recalcPage(mon,cu){
    const m=parseFloat(mon)||0;const c=parseFloat(cu)||0;
    const pc=parseFloat(((m+c)*12/S.freq).toFixed(2));
    updateS(s=>({...s,pages:s.pages.map(pg=>pg.id===p.id?{...pg,monthly:m,cushion:c,perCheck:pc}:pg)}));
  }

  function savePageSettings(){
    recalcPage(psbMon,psbCu);
    setSaveFlash(true);
    setTimeout(()=>setSaveFlash(false),2000);
    showToast(`${p.name} settings saved.`);
  }

  function addTx(){
    if(trial&&trial.active&&p&&p.tx.length>=TRIAL_MAX_ENTRIES)return showToast(`Trial limit: ${TRIAL_MAX_ENTRIES} entries per page. Upgrade to add more.`,"tw");
    if(!txAmt||parseFloat(txAmt)<=0)return showToast("Enter a valid amount.","tw");
    if(!txDesc.trim())return showToast("Please add a description.","tw");
    const amt=parseFloat(txAmt);
    const date=txDate||today();

    if(txType==='transfer_out'){
      const dest=pgById(txTo);
      if(!dest)return showToast("Select a destination page.","tw");
      const newBal=p.balance-amt;
      if(newBal<0){
        advSay(`Hold on — that would put ${p.name} at ${fmt(newBal)}. You'd be overdrawn. Consider transferring funds in first.`,'danger');
        if(!window.confirm(`⚠️ "${p.name}" only has ${fmt(p.balance)}.\nThis would leave it at ${fmt(newBal)}.\nAre you sure?`))return;
      }
      updateS(s=>({...s,pages:s.pages.map(pg=>{
        if(pg.id===p.id)return{...pg,balance:pg.balance-amt,tx:[...pg.tx,{date,type:'transfer_out',amount:amt,desc:`Transfer to ${dest.name}${txDesc?' — '+txDesc:''}`,note:txNote}]};
        if(pg.id===dest.id)return{...pg,balance:pg.balance+amt,tx:[...pg.tx,{date,type:'transfer_in',amount:amt,desc:`Transfer from ${p.name}${txDesc?' — '+txDesc:''}`,note:txNote}]};
        return pg;
      })}));
      setTxAmt('');setTxDesc('');setTxNote('');
      showToast(`${fmt(amt)} moved from ${p.name} to ${dest.name}.`);
      advSay(`${fmt(amt)} transferred from ${p.name} to ${dest.name}. Both pages updated.`,'normal');
      return;
    }

    if(txType==='transfer_in'){
      const src=pgById(txTo);
      if(!src)return showToast("Select a source page.","tw");
      if(src.balance<amt){
        advSay(`${src.name} only has ${fmt(src.balance)}. Moving ${fmt(amt)} will leave it short.`,'danger');
        if(!window.confirm(`${src.name} only has ${fmt(src.balance)}.\nMove ${fmt(amt)} anyway?`))return;
      }
      updateS(s=>({...s,pages:s.pages.map(pg=>{
        if(pg.id===src.id)return{...pg,balance:pg.balance-amt,tx:[...pg.tx,{date,type:'transfer_out',amount:amt,desc:`Transfer to ${p.name}${txDesc?' — '+txDesc:''}`,note:txNote}]};
        if(pg.id===p.id)return{...pg,balance:pg.balance+amt,tx:[...pg.tx,{date,type:'transfer_in',amount:amt,desc:`Transfer from ${src.name}${txDesc?' — '+txDesc:''}`,note:txNote}]};
        return pg;
      })}));
      setTxAmt('');setTxDesc('');setTxNote('');
      showToast(`${fmt(amt)} moved from ${src.name} to ${p.name}.`);
      advSay(`${fmt(amt)} transferred from ${src.name} to ${p.name}. Both pages updated.`,'normal');
      return;
    }

    // Pushback for withdrawals
    if(txType==='withdrawal'){
      const newBal=p.balance-amt;
      if(newBal<0){
        advSay(`Hold on — that would put ${p.name} at ${fmt(newBal)}. You'd be overdrawn. Consider transferring funds in first.`,'danger');
        if(!window.confirm(`⚠️ "${p.name}" only has ${fmt(p.balance)}.\nThis would leave it at ${fmt(newBal)}.\nAre you sure?`))return;
      } else if(p.monthly>0&&newBal<p.monthly*0.3){
        advSay(`${p.name} will only have ${fmt(newBal)} after this — less than 30% of a month's bill. You may want to add more cushion soon.`,'warn');
      }
      if(p.monthly>0&&amt>p.monthly*1.6){
        advSay(`That's ${fmt(amt)} — significantly more than the usual ${fmt(p.monthly)} for ${p.name}. Just double-checking this is intentional!`,'warn');
      }
    }

    updateS(s=>({...s,pages:s.pages.map(pg=>{
      if(pg.id!==p.id)return pg;
      const isOut=txType==='withdrawal';
      return{...pg,balance:pg.balance+(isOut?-amt:amt),tx:[...pg.tx,{date,type:txType,amount:amt,desc:txDesc,note:txNote}]};
    })}));
    setTxAmt('');setTxDesc('');setTxNote('');
    showToast(`Entry added to ${p.name}.`);
  }

  function delTx(idx){
    const t=p.tx[idx];
    if(!window.confirm(`Delete:\n"${t.desc}" — ${fmt(t.amount)}?`))return;
    const isOut=t.type==='withdrawal'||t.type==='transfer_out';
    updateS(s=>({...s,pages:s.pages.map(pg=>{
      if(pg.id!==p.id)return pg;
      const newTx=pg.tx.filter((_,i)=>i!==idx);
      return{...pg,balance:pg.balance-(isOut?-t.amount:t.amount),tx:newTx};
    })}));
    showToast("Entry removed.");
  }

  function addSubitem(){
    if(!siName.trim())return showToast("Enter a service name.","tw");
    if(!siAmt||parseFloat(siAmt)<=0)return showToast("Enter a valid amount.","tw");
    const rawAmt=parseFloat(siAmt);
    const monthlyAmt=siCycle==='annual'?parseFloat((rawAmt/12).toFixed(2)):siCycle==='quarterly'?parseFloat((rawAmt/3).toFixed(2)):rawAmt;
    updateS(s=>({...s,pages:s.pages.map(pg=>{
      if(pg.id!==p.id)return pg;
      const newSubs=[...(pg.subitems||[]),{name:siName,rawAmt,monthlyAmt,cycle:siCycle}];
      const newMonthly=parseFloat(newSubs.reduce((a,si)=>a+si.monthlyAmt,0).toFixed(2));
      const newPC=parseFloat(((newMonthly+pg.cushion)*12/S.freq).toFixed(2));
      return{...pg,subitems:newSubs,monthly:newMonthly,perCheck:newPC};
    })}));
    setSiName('');setSiAmt('');setSubOpen(true);
    showToast(`Added to ${p.name}.`);
  }

  function delSubitem(idx){
    if(!window.confirm(`Remove "${p.subitems[idx].name}"?`))return;
    updateS(s=>({...s,pages:s.pages.map(pg=>{
      if(pg.id!==p.id)return pg;
      const newSubs=pg.subitems.filter((_,i)=>i!==idx);
      const newMonthly=parseFloat(newSubs.reduce((a,si)=>a+si.monthlyAmt,0).toFixed(2));
      const newPC=parseFloat(((newMonthly+pg.cushion)*12/S.freq).toFixed(2));
      return{...pg,subitems:newSubs,monthly:newMonthly,perCheck:newPC};
    })}));
    showToast("Item removed.");
  }

  // Build running balance for table
  let run=0;
  const rows=p.tx.map((t,i)=>{
    const isOut=t.type==='withdrawal'||t.type==='transfer_out';
    run+=isOut?-t.amount:t.amount;
    const rc=isOut?'wr':'dr';
    let pc,pl;
    if(t.type==='deposit'){pc='p-dep';pl='DEP';}
    else if(t.type==='transfer'){pc='p-xfr';pl='XFR';}
    else if(t.type==='transfer_out'){pc='p-xfr-out';pl='OUT▶';}
    else if(t.type==='transfer_in'){pc='p-xfr-in';pl='◀IN';}
    else{pc='p-wdr';pl='WDR';}
    return(
      <tr key={i} className={rc}>
        <td className="td-d">{fmtD(t.date)}</td>
        <td>{t.desc}</td>
        <td><span className={`pill ${pc}`}>{pl}</span></td>
        <td className="td-dep">{!isOut?fmt(t.amount):''}</td>
        <td className="td-wdr">{isOut?fmt(t.amount):''}</td>
        <td className={`td-bal${run<0?' neg':''}`}>{fmt(run)}</td>
        <td className="td-note">{t.note||''}</td>
        <td><button className="btn-del" onClick={()=>delTx(i)}>×</button></td>
      </tr>
    );
  });

  return(
    <div className="view-ledger">
      <div className="lph">
        <div className="lph-left">
          <h2>{p.icon} {p.name} <button className="btn-edit-page" onClick={()=>setModal('edit')}>✎ Edit Page</button></h2>
          <div className="lph-meta">{p.cat} · {p.tx.length} transaction{p.tx.length!==1?'s':''}</div>
        </div>
        <div className="lph-right">
          <div className="bal-label">Balance</div>
          <div className={`bal-num${p.balance<0?' neg':''}`}>{fmt(p.balance)}</div>
        </div>
      </div>

      <div className="lstats">
        <div className="lsc"><div className="lsc-l">Monthly Bill</div><div className="lsc-v gold">{fmt(p.monthly)}</div></div>
        <div className="lsc"><div className="lsc-l">Per Paycheck</div><div className="lsc-v grn">{fmt(p.perCheck)}</div></div>
        <div className="lsc"><div className="lsc-l">Cushion</div><div className="lsc-v">{fmt(p.cushion)}</div></div>
        <div className="lsc"><div className="lsc-l">Total In</div><div className="lsc-v grn">{fmt(tin)}</div></div>
        <div className="lsc"><div className="lsc-l">Total Out</div><div className="lsc-v red">{fmt(tout)}</div></div>
      </div>

      <div className="psbar">
        <div className="psg"><label>Monthly Bill ($)</label><input type="number" min="0" step="10" value={psbMon} onChange={e=>{setPsbMon(e.target.value);recalcPage(e.target.value,psbCu);}}/></div>
        <div className="psg"><label>Cushion Buffer ($)</label><input type="number" min="0" step="5" value={psbCu} onChange={e=>{setPsbCu(e.target.value);recalcPage(psbMon,e.target.value);}}/></div>
        <div className="psb-comp">{parseFloat(psbMon)>0?`Per paycheck: ${fmt(psbPc)}`:'Per paycheck: —'}</div>
        <button className={`btn-psb-save${saveFlash?' saved':''}`} onClick={savePageSettings}>{saveFlash?'✓ Saved':'Save'}</button>
      </div>

      {hasSubs&&(
        <div className="subitems-panel">
          <div className="subitems-header" onClick={()=>setSubOpen(o=>!o)}>
            <span className="si-title">📋 Line Items <span className="si-count">{(p.subitems||[]).length}</span></span>
            <span style={{display:'flex',alignItems:'center',gap:'12px'}}>
              <span className="si-total">{(p.subitems||[]).length>0?`Total: ${fmt(siTotal)}/mo`:''}</span>
              <span className={`si-chevron${subOpen?' open':''}`}>▼</span>
            </span>
          </div>
          {subOpen&&(
            <div className="subitems-body open">
              <div className="si-list">
                {!(p.subitems&&p.subitems.length)
                  ?<div style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'.8rem',color:'var(--ink3)',padding:'6px 0'}}>No items yet — add one below.</div>
                  :p.subitems.map((si,i)=>(
                    <div key={i} className="si-row">
                      <div className="si-row-name">{si.name}</div>
                      <div className="si-row-amt">{fmt(si.monthlyAmt)}/mo</div>
                      <div className="si-row-freq">{si.cycle==='annual'?'(billed annually)':si.cycle==='quarterly'?'(billed quarterly)':''}</div>
                      <div className="si-row-acts"><button className="si-del" onClick={()=>delSubitem(i)}>×</button></div>
                    </div>
                  ))
                }
              </div>
              <div className="si-add-row">
                <div className="sif"><label>Service / Item Name</label><input type="text" value={siName} onChange={e=>setSiName(e.target.value)} placeholder="e.g. Netflix"/></div>
                <div className="sif"><label>Monthly ($)</label><input type="number" min="0" step=".01" value={siAmt} onChange={e=>setSiAmt(e.target.value)} placeholder="0.00"/></div>
                <div className="sif"><label>Billing Cycle</label>
                  <select value={siCycle} onChange={e=>setSiCycle(e.target.value)}>
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual (÷12)</option>
                    <option value="quarterly">Quarterly (÷3)</option>
                  </select>
                </div>
                <button className="btn-si-add" onClick={addSubitem}>+ Add</button>
              </div>
              <div className="si-note">{SUBITEMS_HINTS[p.id]||'Itemize the individual components of this page.'}</div>
            </div>
          )}
        </div>
      )}

      <div className="ebar">
        <div className="eg"><label>Date</label><input type="date" value={txDate} onChange={e=>setTxDate(e.target.value)}/></div>
        <div className="eg"><label>Type</label>
          <select value={txType} onChange={e=>setTxType(e.target.value)}>
            <option value="deposit">+ Deposit</option>
            <option value="withdrawal">− Bill Paid / Withdrawal</option>
            <option value="transfer_out">→ Transfer Out</option>
            <option value="transfer_in">← Transfer In</option>
          </select>
        </div>
        {showTransferPicker&&(
          <div className="eg"><label>{txType==='transfer_out'?'To Page':'From Page'}</label>
            <select value={txTo} onChange={e=>setTxTo(e.target.value)}>
              {otherPages.map(x=><option key={x.id} value={x.id}>{x.icon} {x.name}</option>)}
            </select>
          </div>
        )}
        <div className="eg"><label>Amount ($)</label><input type="number" min=".01" step=".01" value={txAmt} onChange={e=>setTxAmt(e.target.value)} placeholder="0.00"/></div>
        <div className="eg"><label>Description</label><input type="text" value={txDesc} onChange={e=>setTxDesc(e.target.value)} placeholder="e.g. Electric bill paid"/></div>
        <div className="eg"><label>Note</label><input type="text" value={txNote} onChange={e=>setTxNote(e.target.value)} placeholder="optional"/></div>
        <button className="btn-add" onClick={addTx}>Add Entry</button>
      </div>

      <div className="ledger-wrap">
        <table className="lt">
          <thead><tr><th>Date</th><th>Description</th><th>Type</th><th>Deposit (+)</th><th>Withdrawal (−)</th><th>Balance</th><th>Note</th><th></th></tr></thead>
          <tbody>
            {rows.length===0
              ?<tr><td colSpan={8} className="empty-lt">No entries yet — add your first one above.</td></tr>
              :rows
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// CHARTS VIEW
// ═══════════════════════════════════════════════════════════
function ChartsView({S}){
  return(
    <div className="view-charts">
      <div className="charts-grid">
        <div className="cc"><h3>🥧 Budget Allocation</h3><ChartAlloc pages={S.pages}/></div>
        <div className="cc"><h3>📊 Balances vs. Monthly Bills</h3><ChartCompare pages={S.pages}/></div>
        <div className="cc"><h3>📈 Main Page Balance History</h3><ChartHist pages={S.pages}/></div>
        <div className="cc"><h3>💸 Total Spending by Page</h3><ChartSpend pages={S.pages}/></div>
      </div>
    </div>
  );
}

function ChartAlloc({pages}){
  const ref=useRef(null);const chart=useRef(null);
  useEffect(()=>{
    if(chart.current)chart.current.destroy();
    const f={family:'Courier Prime',size:10};
    const cols=pages.map((_,i)=>`hsl(${108+i*14},38%,${40+(i%5)*7}%)`);
    chart.current=new Chart(ref.current,{type:'doughnut',data:{labels:pages.map(p=>p.name),datasets:[{data:pages.map(p=>Math.max(p.monthly,0)),backgroundColor:cols,borderColor:'#e8f2e0',borderWidth:2}]},options:{responsive:true,plugins:{legend:{position:'right',labels:{font:f,boxWidth:11}}}}});
    return()=>{if(chart.current)chart.current.destroy();};
  },[pages]);
  return <canvas ref={ref}/>;
}

function ChartCompare({pages}){
  const ref=useRef(null);const chart=useRef(null);
  useEffect(()=>{
    if(chart.current)chart.current.destroy();
    const f={family:'Courier Prime',size:10};
    chart.current=new Chart(ref.current,{type:'bar',data:{labels:pages.map(p=>p.name),datasets:[{label:'Balance',data:pages.map(p=>p.balance),backgroundColor:'rgba(42,71,42,.7)',borderColor:'#2a472a',borderWidth:1.5,borderRadius:2},{label:'Monthly Bill',data:pages.map(p=>p.monthly),backgroundColor:'rgba(184,146,10,.4)',borderColor:'#b8920a',borderWidth:1.5,borderRadius:2}]},options:{responsive:true,plugins:{legend:{labels:{font:f}}},scales:{x:{ticks:{font:f}},y:{ticks:{font:f,callback:v=>'$'+v.toLocaleString()}}}}});
    return()=>{if(chart.current)chart.current.destroy();};
  },[pages]);
  return <canvas ref={ref}/>;
}

function ChartHist({pages}){
  const ref=useRef(null);const chart=useRef(null);
  useEffect(()=>{
    if(chart.current)chart.current.destroy();
    const mp=pages[0];const f={family:'Courier Prime',size:10};
    let run=0;const hl=[],hd=[];
    if(mp){[...mp.tx].sort((a,b)=>a.date.localeCompare(b.date)).forEach(t=>{run+=t.type!=='withdrawal'&&t.type!=='transfer_out'?t.amount:-t.amount;hl.push(fmtD(t.date));hd.push(run);});}
    if(!hl.length){hl.push('Start');hd.push(0);}
    chart.current=new Chart(ref.current,{type:'line',data:{labels:hl,datasets:[{label:mp?mp.name:'Page',data:hd,borderColor:'#3a5e3a',backgroundColor:'rgba(58,94,58,.12)',fill:true,tension:.3,pointRadius:4,pointBackgroundColor:'#3a5e3a'}]},options:{responsive:true,plugins:{legend:{labels:{font:f}}},scales:{x:{ticks:{font:f}},y:{ticks:{font:f,callback:v=>'$'+v.toLocaleString()}}}}});
    return()=>{if(chart.current)chart.current.destroy();};
  },[pages]);
  return <canvas ref={ref}/>;
}

function ChartSpend({pages}){
  const ref=useRef(null);const chart=useRef(null);
  useEffect(()=>{
    if(chart.current)chart.current.destroy();
    const f={family:'Courier Prime',size:10};
    const spend=pages.map(p=>p.tx.filter(t=>t.type==='withdrawal'||t.type==='transfer_out').reduce((s,t)=>s+t.amount,0));
    chart.current=new Chart(ref.current,{type:'bar',data:{labels:pages.map(p=>p.name),datasets:[{label:'Total Spent',data:spend,backgroundColor:'rgba(122,21,21,.65)',borderColor:'#7a1515',borderWidth:1.5,borderRadius:2}]},options:{responsive:true,indexAxis:'y',plugins:{legend:{display:false}},scales:{x:{ticks:{font:f,callback:v=>'$'+v.toLocaleString()}},y:{ticks:{font:f}}}}});
    return()=>{if(chart.current)chart.current.destroy();};
  },[pages]);
  return <canvas ref={ref}/>;
}

// ═══════════════════════════════════════════════════════════
// DEPOSIT MODAL
// ═══════════════════════════════════════════════════════════
function DepositModal({S,updateS,onClose,showToast,advSay}){
  const [amt,setAmt]=useState(S.paycheck||'');
  const [date,setDate]=useState(today());
  const [note,setNote]=useState('');

  const numAmt=parseFloat(amt)||0;
  const needed=S.pages.reduce((s,p)=>s+p.perCheck,0);
  let rem=numAmt;
  const lines=[];
  S.pages.forEach(p=>{
    if(p.id===S.overflow||p.perCheck<=0||p.noDispatch)return;
    lines.push({icon:p.icon,name:p.name,amt:p.perCheck,temp:p.temp});
    rem-=p.perCheck;
  });
  const op=S.pages.find(p=>p.id===S.overflow)||S.pages[S.pages.length-1];
  const shortfall=rem<0;

  function confirm(){
    if(!numAmt||numAmt<=0)return showToast("Enter a valid amount.","tw");
    const depNote=note.trim()||'Paycheck deposit';
    let r=numAmt;
    updateS(s=>{
      const pages=s.pages.map(p=>({...p,tx:[...p.tx]}));
      pages.forEach(p=>{
        if(p.id===s.overflow||p.perCheck<=0||p.noDispatch)return;
        const alloc=Math.min(p.perCheck,r);
        if(alloc<=0)return;
        p.balance+=alloc;p.tx.push({date,type:'deposit',amount:alloc,desc:depNote,note:'Auto-dispatch'});
        r-=alloc;
      });
      if(r>0){
        const rules=s.overflowRules&&s.overflowRules.length?s.overflowRules:null;
        if(rules){
          const total=rules.reduce((a,x)=>a+x.pct,0);
          rules.forEach(rule=>{
            const pg=pages.find(p=>p.id===rule.pageId);if(!pg)return;
            const share=parseFloat((r*rule.pct/total).toFixed(2));
            if(share<=0)return;
            pg.balance+=share;pg.tx.push({date,type:'deposit',amount:share,desc:depNote,note:`Overflow (${rule.pct}%)`});
          });
        } else {
          const opPg=pages.find(p=>p.id===s.overflow)||pages[pages.length-1];
          opPg.balance+=r;opPg.tx.push({date,type:'deposit',amount:r,desc:depNote,note:'Overflow'});
        }
      }
      return{...s,pages};
    });
    onClose();
    advSay(`${fmt(numAmt)} deposited and spread across ${S.pages.length} pages. Every dollar has a home.`,'normal');
    showToast(`Paycheck of ${fmt(numAmt)} distributed.`);
  }

  return(
    <div className="modal-overlay open" onClick={e=>{if(e.target.className.includes('modal-overlay'))onClose();}}>
      <div className="mbook">
        <div className="mhdr"><h3>💵 Deposit a Paycheck</h3><p>I'll spread it across your pages automatically.</p></div>
        <div className="mbody">
          <label className="mfl">Deposit Amount ($)</label>
          <input className="mi" type="number" min=".01" step=".01" placeholder="e.g. 2400.00" value={amt} onChange={e=>setAmt(e.target.value)}/>
          <label className="mfl">Date</label>
          <input className="mi" type="date" value={date} onChange={e=>setDate(e.target.value)}/>
          <label className="mfl">Note</label>
          <input className="mi" type="text" placeholder="e.g. July 1st paycheck" value={note} onChange={e=>setNote(e.target.value)}/>
          {numAmt>0&&(
            <div className="dispatch-prev">
              <div className="dp-title">How it will be distributed</div>
              {lines.map((l,i)=><div key={i} className="dp-row"><span>{l.icon} {l.name}{l.temp?' ⏳':''}</span><span>+{fmt(l.amt)}</span></div>)}
              {rem>0&&op&&<div className="dp-row lo"><span>{op.icon} {op.name} (overflow)</span><span>+{fmt(rem)}</span></div>}
              <div className="dp-row tot"><span>Total</span><span>{fmt(numAmt)}</span></div>
              {shortfall&&<div className="dp-row ov"><span>⚠ Shortfall</span><span>{fmt(rem)}</span></div>}
            </div>
          )}
          {shortfall&&<div className="dep-warn">This paycheck ({fmt(numAmt)}) is {fmt(Math.abs(rem))} short of what your pages need ({fmt(needed)}). Some pages won't receive their full allocation.</div>}
        </div>
        <div className="mfooter">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-ok" onClick={confirm}>Deposit &amp; Distribute</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TRANSFER MODAL
// ═══════════════════════════════════════════════════════════
function TransferModal({S,updateS,onClose,showToast,advSay}){
  const [from,setFrom]=useState(S.pages[0]?.id||'');
  const [to,setTo]=useState(S.pages[1]?.id||'');
  const [amt,setAmt]=useState('');
  const [note,setNote]=useState('');

  function confirm(){
    if(from===to)return showToast("Pick two different pages.","tw");
    const numAmt=parseFloat(amt);
    if(!numAmt||numAmt<=0)return showToast("Enter a valid amount.","tw");
    const f=S.pages.find(p=>p.id===from);
    const t=S.pages.find(p=>p.id===to);
    if(f.balance<numAmt){
      advSay(`${f.name} only has ${fmt(f.balance)}. Moving ${fmt(numAmt)} will leave it short.`,'danger');
      if(!window.confirm(`${f.name} only has ${fmt(f.balance)}.\nMove ${fmt(numAmt)} anyway?`))return;
    }
    const date=today();const n=note.trim()||'Transfer';
    updateS(s=>({...s,pages:s.pages.map(p=>{
      if(p.id===from)return{...p,balance:p.balance-numAmt,tx:[...p.tx,{date,type:'withdrawal',amount:numAmt,desc:`Transfer to ${t.name}`,note:n}]};
      if(p.id===to)return{...p,balance:p.balance+numAmt,tx:[...p.tx,{date,type:'transfer',amount:numAmt,desc:`Transfer from ${f.name}`,note:n}]};
      return p;
    })}));
    onClose();showToast(`${fmt(numAmt)} moved: ${f.name} → ${t.name}.`);
  }

  const opts=S.pages.map(p=><option key={p.id} value={p.id}>{p.icon} {p.name} ({fmt(p.balance)})</option>);
  return(
    <div className="modal-overlay open" onClick={e=>{if(e.target.className.includes('modal-overlay'))onClose();}}>
      <div className="mbook">
        <div className="mhdr"><h3>⇄ Move Money Between Pages</h3><p>Life happens. Shift funds where you need them most.</p></div>
        <div className="mbody">
          <label className="mfl">From Page</label><select className="ms" value={from} onChange={e=>setFrom(e.target.value)}>{opts}</select>
          <label className="mfl">To Page</label><select className="ms" value={to} onChange={e=>setTo(e.target.value)}>{opts}</select>
          <label className="mfl">Amount ($)</label><input className="mi" type="number" min=".01" step=".01" value={amt} onChange={e=>setAmt(e.target.value)} placeholder="0.00"/>
          <label className="mfl">Reason</label><input className="mi" type="text" value={note} onChange={e=>setNote(e.target.value)} placeholder="e.g. Covering electric spike"/>
        </div>
        <div className="mfooter">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-ok" onClick={confirm}>Move Funds</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// RECONCILE MODAL
// ═══════════════════════════════════════════════════════════
function ReconModal({S,updateS,onClose,showToast,advSay}){
  const [bank,setBank]=useState('');
  const ledger=S.pages.reduce((s,p)=>s+p.balance,0);
  const numBank=parseFloat(bank);
  const diff=isNaN(numBank)?null:numBank-ledger;
  const abs=diff!==null?Math.abs(diff):null;

  function confirm(){
    if(isNaN(numBank)||numBank<0)return showToast("Enter a valid bank balance.","tw");
    updateS(s=>({...s,lastBalanced:new Date().toISOString()}));
    onClose();
    if(abs<0.005){
      advSay(`Reconciled! Your ledger and bank both show ${fmt(ledger)}. Everything lines up perfectly.`,'normal');
      showToast("Ledger reconciled — perfect match! ✓");
    } else {
      advSay(`Reconciled with a difference of ${fmt(abs)}. It's worth investigating — check for any unrecorded transactions.`,'warn');
      showToast(`Reconciled. Difference of ${fmt(abs)} noted.`,'tw');
    }
  }

  return(
    <div className="modal-overlay open" onClick={e=>{if(e.target.className.includes('modal-overlay'))onClose();}}>
      <div className="mbook" style={{maxWidth:'460px'}}>
        <div className="mhdr"><h3>⚖ Reconcile Ledger</h3><p>Compare your ledger total against your actual bank balance.</p></div>
        <div className="mbody">
          <label className="mfl">Your Actual Bank Balance ($)</label>
          <input className="mi" type="number" min="0" step=".01" placeholder="e.g. 4250.00" value={bank} onChange={e=>setBank(e.target.value)}/>
          {diff!==null&&(
            abs<0.005
              ?<div className="recon-box recon-ok">✓ Your ledger matches your bank — {fmt(ledger)}. You're perfectly balanced!</div>
              :<div className="recon-box recon-diff">⚠ Difference of {fmt(abs)} — there is {diff>0?'more in your bank than your ledger shows':'less in your bank than your ledger shows'}.<br/><br/>Ledger total: {fmt(ledger)}<br/>Bank balance: {fmt(numBank)}</div>
          )}
        </div>
        <div className="mfooter">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-ok" onClick={confirm}>Confirm &amp; Stamp Date</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// OVERFLOW MODAL
// ═══════════════════════════════════════════════════════════
function OverflowModal({S,updateS,onClose,showToast,advSay}){
  const initRules=S.overflowRules&&S.overflowRules.length?S.overflowRules:[{pageId:S.overflow||S.pages[S.pages.length-1]?.id,pct:100}];
  const [rules,setRules]=useState(initRules);
  const total=rules.reduce((s,r)=>s+r.pct,0);
  const ok=Math.abs(total-100)<0.5;

  function confirm(){
    if(!rules.length)return showToast("Add at least one page.","tw");
    if(!ok)return showToast("Percentages must add up to 100%.","tw");
    updateS(s=>({...s,overflowRules:rules}));
    onClose();
    advSay(`Overflow rules saved! Any leftover paycheck funds will now be split across ${rules.length} page${rules.length>1?'s':''} automatically.`,'normal');
    showToast("Overflow rules saved.");
  }

  return(
    <div className="modal-overlay open" onClick={e=>{if(e.target.className.includes('modal-overlay'))onClose();}}>
      <div className="mbook" style={{maxWidth:'500px'}}>
        <div className="mhdr"><h3>🌊 Overflow Distribution Rules</h3><p>Automatically split leftover paycheck funds across pages.</p></div>
        <div className="mbody">
          <p style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'.8rem',color:'var(--ink3)',marginBottom:'14px'}}>After all pages receive their per-paycheck allocation, any remainder is split here. Percentages must total 100%.</p>
          {rules.map((r,i)=>(
            <div key={i} className="ovfl-row">
              <select value={r.pageId} onChange={e=>setRules(rules.map((x,j)=>j===i?{...x,pageId:e.target.value}:x))}>
                {S.pages.map(p=><option key={p.id} value={p.id}>{p.icon} {p.name}</option>)}
              </select>
              <input type="number" min="1" max="100" step="1" value={r.pct} onChange={e=>setRules(rules.map((x,j)=>j===i?{...x,pct:parseFloat(e.target.value)||0}:x))}/>
              <span style={{fontSize:'.8rem',color:'var(--ink3)'}}>%</span>
              <button className="ovfl-del" onClick={()=>setRules(rules.filter((_,j)=>j!==i))}>×</button>
            </div>
          ))}
          <button className="btn-xfr" style={{marginTop:'4px',fontSize:'.76rem'}} onClick={()=>setRules([...rules,{pageId:S.pages[0]?.id,pct:0}])}>+ Add Page</button>
          {rules.length>0&&(
            <div className="ovfl-preview" style={{display:'block'}}>
              <div style={{fontSize:'.7rem',color:'var(--ink3)',marginBottom:'6px'}}>Preview per $100 of overflow:</div>
              {rules.map((r,i)=>{
                const p=S.pages.find(x=>x.id===r.pageId);
                const share=r.pct/total*100;
                return <div key={i} className="ovfl-prow"><span>{p?p.icon+' '+p.name:'?'}</span><span>{r.pct}% → {fmt(share)}</span></div>;
              })}
              <div className="ovfl-prow tot" style={{color:ok?'var(--g3)':'var(--red)'}}><span>Total</span><span>{total}%{ok?' ✓':' ⚠ must = 100%'}</span></div>
            </div>
          )}
        </div>
        <div className="mfooter">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-ok" onClick={confirm}>Save Rules</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// BAILOUT MODAL
// ═══════════════════════════════════════════════════════════
function BailoutModal({S,updateS,onClose,showToast,advSay}){
  const donorIds=S.donorPages||[];
  const donors=donorIds.map(id=>S.pages.find(p=>p.id===id)).filter(p=>p&&p.balance>0);
  const negPages=S.pages.filter(p=>p.balance<0&&!donorIds.includes(p.id));
  const totalShortfall=negPages.reduce((s,p)=>s+Math.abs(p.balance),0);
  const totalDonorFunds=donors.reduce((s,p)=>s+p.balance,0);

  function execute(){
    const date=today();
    updateS(s=>{
      const pages=s.pages.map(p=>({...p,tx:[...p.tx]}));
      const negs=pages.filter(p=>p.balance<0&&!donorIds.includes(p.id));
      negs.forEach(p=>{
        let needed=Math.abs(p.balance);
        for(const did of donorIds){
          if(needed<=0)break;
          const donor=pages.find(x=>x.id===did);
          if(!donor||donor.balance<=0)continue;
          const give=parseFloat(Math.min(donor.balance,needed).toFixed(2));
          if(give<=0)continue;
          donor.balance-=give;donor.tx.push({date,type:'transfer_out',amount:give,desc:`Auto-Balance → ${p.name}`,note:'Auto-Balance'});
          p.balance+=give;p.tx.push({date,type:'transfer_in',amount:give,desc:`Auto-Balance ← ${donor.name}`,note:'Auto-Balance'});
          needed-=give;
        }
      });
      return{...s,pages};
    });
    const covered=negPages.filter(p=>{const pg=S.pages.find(x=>x.id===p.id);return pg&&pg.balance>=0;}).length;
    onClose();
    advSay(`Auto-Balance complete! Funds moved across ${negPages.length} page${negPages.length>1?'s':''}. ${negPages.length===covered?'All pages are back in the black.':'Some pages still need attention — donor funds ran short.'}`,negPages.length===covered?'normal':'warn');
    showToast(`Auto-Balance: ${negPages.length} of ${negPages.length} pages processed.`);
  }

  return(
    <div className="modal-overlay open" onClick={e=>{if(e.target.className.includes('modal-overlay'))onClose();}}>
      <div className="mbook" style={{maxWidth:'520px'}}>
        <div className="mhdr" style={{background:'#3a0a0a',borderBottomColor:'#7a1515'}}>
          <h3 style={{color:'#ff9090'}}>⚡ Auto-Balance</h3>
          <p style={{color:'#e8b0b0'}}>Funds will be pulled from donor pages in order until all shortfalls are covered.</p>
        </div>
        <div className="mbody">
          <p style={{fontFamily:"'Lora',serif",fontSize:'.82rem',color:'var(--ink2)',marginBottom:'12px'}}>{negPages.length} page{negPages.length>1?'s are':' is'} overdrawn by a total of {fmt(totalShortfall)}.</p>
          <div style={{fontSize:'.62rem',letterSpacing:'2px',textTransform:'uppercase',color:'var(--g4)',fontWeight:700,marginBottom:'7px'}}>Pages in the Red</div>
          <div style={{marginBottom:'14px',display:'flex',flexDirection:'column',gap:'4px'}}>
            {negPages.map(p=>(
              <div key={p.id} style={{display:'flex',justifyContent:'space-between',padding:'5px 10px',background:'#fff0f0',border:'1px solid var(--red-light)',borderRadius:'2px',fontSize:'.82rem'}}>
                <span>{p.icon} {p.name}</span><span style={{color:'var(--red)',fontWeight:700}}>{fmt(p.balance)}</span>
              </div>
            ))}
          </div>
          <div style={{fontSize:'.62rem',letterSpacing:'2px',textTransform:'uppercase',color:'var(--g4)',fontWeight:700,marginBottom:'7px'}}>Donor Pages (in order)</div>
          <div style={{display:'flex',flexDirection:'column',gap:'4px',marginBottom:'10px'}}>
            {donorIds.map((id,i)=>{const d=S.pages.find(p=>p.id===id);if(!d)return null;return(
              <div key={id} style={{display:'flex',justifyContent:'space-between',padding:'5px 10px',background:d.balance>0?'#f0faf0':'#f8f8f8',border:`1px solid ${d.balance>0?'var(--g6)':'var(--paper3)'}`,borderRadius:'2px',fontSize:'.82rem'}}>
                <span style={{color:'var(--ink3)',fontSize:'.7rem',marginRight:'6px'}}>#{i+1}</span>
                <span style={{flex:1}}>{d.icon} {d.name}</span>
                <span style={{fontWeight:700,color:d.balance>0?'var(--g3)':'var(--ink3)'}}>{fmt(d.balance)}</span>
              </div>
            );})}
          </div>
          {totalDonorFunds<totalShortfall&&<div style={{background:'#fffae6',border:'1.5px solid var(--amber-light)',borderRadius:'2px',padding:'10px 12px',fontFamily:"'Lora',serif",fontSize:'.8rem',color:'var(--amber)',lineHeight:1.5}}>⚠ Donor pages only have {fmt(totalDonorFunds)} available — {fmt(totalShortfall-totalDonorFunds)} short of covering everything.</div>}
        </div>
        <div className="mfooter">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-ok" style={{background:'var(--red-light)',boxShadow:'0 2px 0 #5a1010'}} onClick={execute}>⚡ Execute Auto-Balance</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// CUSTOMIZE MODAL
// ═══════════════════════════════════════════════════════════
function CustomizeModal({S,updateS,onClose,showToast}){
  const [selected,setSelected]=useState(new Set(S.dashCards||S.pages.map(p=>p.id)));

  function toggle(id){setSelected(prev=>{const n=new Set(prev);n.has(id)?n.delete(id):n.add(id);return n;});}

  function save(){
    const cards=S.pages.filter(p=>selected.has(p.id)).map(p=>p.id);
    updateS(s=>({...s,dashCards:cards}));
    onClose();showToast(`Dashboard updated — ${cards.length} card${cards.length!==1?'s':''} showing.`);
  }

  return(
    <div className="modal-overlay open" onClick={e=>{if(e.target.className.includes('modal-overlay'))onClose();}}>
      <div className="mbook" style={{maxWidth:'480px'}}>
        <div className="mhdr"><h3>✎ Customize Dashboard Cards</h3><p>Choose which pages show as cards on your dashboard.</p></div>
        <div className="mbody">
          <p style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'.8rem',color:'var(--ink3)',marginBottom:'13px'}}>All pages remain accessible from the sidebar — this only controls which ones appear as cards up top.</p>
          <div className="customize-grid">
            {S.pages.map(p=>(
              <label key={p.id} className={`cz-row${selected.has(p.id)?' sel':''}`}>
                <input type="checkbox" checked={selected.has(p.id)} onChange={()=>toggle(p.id)}/>
                <span className="cz-ico">{p.icon}</span>
                <span className="cz-name">{p.name}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mfooter">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-ok" onClick={save}>Save</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EDIT PAGE MODAL
// ═══════════════════════════════════════════════════════════
function EditModal({S,updateS,onClose,showToast,advSay,trial}){
  const [tab,setTab]=useState('page');
  const [advisorInput,setAdvisorInput]=useState(S.advisorName||'Floyd');
  const p=S.pages.find(x=>x.id===S.activePage);

  // This Page tab state
  const [epName,setEpName]=useState(p?.name||'');
  const [epIcon,setEpIcon]=useState(p?.icon||'📄');
  const [epCat,setEpCat]=useState(p?.cat||'Other');
  const [epTemp,setEpTemp]=useState(p?.temp||false);
  const [epNoDispatch,setEpNoDispatch]=useState(p?.noDispatch||false);
  const [epTarget,setEpTarget]=useState(p?.target||'');

  // New page tab state
  const [npName,setNpName]=useState('');
  const [npIcon,setNpIcon]=useState('');
  const [npCat,setNpCat]=useState('Other');
  const [npMonthly,setNpMonthly]=useState('');
  const [npCushion,setNpCushion]=useState('');
  const [npTemp,setNpTemp]=useState(false);
  const [npNoDispatch,setNpNoDispatch]=useState(false);
  const [npTarget,setNpTarget]=useState('');

  // Manage tab
  const [pmMode,setPmMode]=useState({});
  const [pmEdits,setPmEdits]=useState({});

  // Donors tab
  const [donorPick,setDonorPick]=useState('');

  function saveAdvisorName(){
    const val=advisorInput.trim()||'Floyd';
    updateS(s=>({...s,advisorName:val}));
    showToast(`Your advisor is now ${val}.`);
    advSay(`${val} here. Name noted. Let's get back to work.`,'normal');
  }

  function savePageEdit(){
    if(!epName.trim())return showToast("Page name can't be empty.","tw");
    updateS(s=>({...s,pages:s.pages.map(pg=>pg.id===S.activePage?{...pg,name:epName,icon:epIcon,cat:epCat,temp:epTemp,noDispatch:epNoDispatch,target:epTemp?(parseFloat(epTarget)||0):0}:pg)}));
    onClose();showToast(`Page updated to "${epName}".`);
  }

  function addNewPage(){
    if(trial&&trial.active&&S.pages.length>=TRIAL_MAX_PAGES)return showToast(`Trial limit: ${TRIAL_MAX_PAGES} pages max. Upgrade to add more.`,"tw");
    if(!npName.trim())return showToast("Enter a page name.","tw");
    const icon=npIcon.trim()||'📄';
    const monthly=parseFloat(npMonthly)||0;
    const cushion=parseFloat(npCushion)||10;
    const pc=parseFloat(((monthly+cushion)*12/S.freq).toFixed(2));
    const id='custom_'+Date.now();
    const target=npTemp?(parseFloat(npTarget)||0):0;
    updateS(s=>({...s,activePage:id,dashCards:[...(s.dashCards||[]),id],pages:[...s.pages,{id,icon,name:npName.trim(),cat:npCat,monthly,cushion,perCheck:pc,balance:0,tx:[],subitems:[],temp:npTemp,noDispatch:npNoDispatch,target}]}));
    onClose();showToast(`"${npName}" added.`);
    advSay(`New page "${npName}" created! Set your monthly amount and cushion in the settings bar.`,'normal');
  }

  function deletePage(pid){
    const pg=S.pages.find(p=>p.id===pid);if(!pg)return;
    if(S.pages.length<=1)return showToast("Can't delete the only page.","tw");
    const msg=pg.balance!==0?`"${pg.name}" has a balance of ${fmt(pg.balance)}.\n\nDeleting it will remove all its transactions.\n\nAre you sure?`:`Delete page "${pg.name}"? This cannot be undone.`;
    if(!window.confirm(msg))return;
    updateS(s=>({...s,
      pages:s.pages.filter(p=>p.id!==pid),
      activePage:s.activePage===pid?s.pages.find(p=>p.id!==pid)?.id:s.activePage,
      donorPages:(s.donorPages||[]).filter(id=>id!==pid),
      dashCards:(s.dashCards||[]).filter(id=>id!==pid),
    }));
    showToast(`"${pg.name}" removed.`);
  }

  function movePage(pid,dir){
    updateS(s=>{
      const idx=s.pages.findIndex(p=>p.id===pid);
      const ni=idx+dir;if(ni<0||ni>=s.pages.length)return s;
      const pages=[...s.pages];[pages[idx],pages[ni]]=[pages[ni],pages[idx]];
      return{...s,pages};
    });
  }

  function savePmEdit(pid){
    const newName=(pmEdits[pid]?.name||'').trim();
    const newIcon=pmEdits[pid]?.icon||S.pages.find(p=>p.id===pid)?.icon;
    if(!newName)return showToast("Name can't be empty.","tw");
    updateS(s=>({...s,pages:s.pages.map(pg=>pg.id===pid?{...pg,name:newName,icon:newIcon||pg.icon}:pg)}));
    setPmMode(m=>({...m,[pid]:'view'}));
    showToast(`"${newName}" updated.`);
  }

  function addDonor(){
    if(!donorPick)return;
    if((S.donorPages||[]).includes(donorPick))return showToast("Already a donor page.","tw");
    updateS(s=>({...s,donorPages:[...(s.donorPages||[]),donorPick]}));
    showToast(`${S.pages.find(p=>p.id===donorPick)?.name} added as donor.`);
  }

  function removeDonor(idx){
    updateS(s=>({...s,donorPages:(s.donorPages||[]).filter((_,i)=>i!==idx)}));
  }

  function moveDonor(idx,dir){
    updateS(s=>{
      const d=[...(s.donorPages||[])];const ni=idx+dir;
      if(ni<0||ni>=d.length)return s;
      [d[idx],d[ni]]=[d[ni],d[idx]];return{...s,donorPages:d};
    });
  }

  const cats=['Housing','Utilities','Food','Transportation','Health','Kids','Savings','Lifestyle','Other'];
  const availableDonors=S.pages.filter(p=>!(S.donorPages||[]).includes(p.id));

  return(
    <div className="modal-overlay open" onClick={e=>{if(e.target.className.includes('modal-overlay'))onClose();}}>
      <div className="mbook" style={{maxWidth:'560px'}}>
        <div className="mhdr"><h3 id="edit-modal-title">✎ Edit Page</h3><p>Rename, reorder, or manage your ledger pages.</p></div>
        <div style={{background:'var(--g1)',padding:'8px 28px',display:'flex',alignItems:'center',gap:'10px',borderBottom:'1px solid var(--g3)'}}>
          <span style={{fontSize:'.65rem',letterSpacing:'1.5px',textTransform:'uppercase',color:'var(--g6)',whiteSpace:'nowrap'}}>Advisor Name</span>
          <input type="text" value={advisorInput} onChange={e=>setAdvisorInput(e.target.value)} placeholder="Floyd" style={{background:'rgba(255,255,255,.08)',border:'1px solid var(--g3)',borderRadius:'2px',padding:'4px 9px',fontFamily:'var(--slhq-fh)',fontSize:'.85rem',color:'var(--paper)',width:'120px'}}/>
          <button onClick={saveAdvisorName} style={{background:'var(--slhq-amber)',color:'#fff',border:'none',padding:'4px 12px',borderRadius:'2px',fontFamily:"'Courier Prime',monospace",fontSize:'.72rem',fontWeight:700,cursor:'pointer'}}>Save</button>
          <span style={{fontSize:'.68rem',color:'var(--g6)',fontFamily:"'Lora',serif",fontStyle:'italic'}}>Currently: {S.advisorName||'Floyd'}</span>
        </div>
        <div className="mbody">
          <div className="edit-tabs">
            {['page','manage','add','donors'].map(t=>(
              <div key={t} className={`etab${tab===t?' active':''}`} onClick={()=>setTab(t)}>
                {t==='page'?'This Page':t==='manage'?'All Pages':t==='add'?'+ New Page':'⚡ Donors'}
              </div>
            ))}
          </div>

          {tab==='page'&&p&&(
            <div>
              <label className="mfl">Page Name</label>
              <input className="mi" type="text" value={epName} onChange={e=>setEpName(e.target.value)}/>
              <label className="mfl">Icon</label>
              <div className="icon-grid">
                {ICON_SET.map(ic=><div key={ic} className={`icon-btn${epIcon===ic?' sel':''}`} onClick={()=>setEpIcon(ic)}>{ic}</div>)}
              </div>
              <label className="mfl">Category</label>
              <select className="ms" value={epCat} onChange={e=>setEpCat(e.target.value)}>
                {cats.map(c=><option key={c}>{c}</option>)}
              </select>
              <div style={{marginTop:'14px',paddingTop:'12px',borderTop:'1px dashed var(--paper3)',display:'flex',flexDirection:'column',gap:'9px'}}>
                <label style={{display:'flex',alignItems:'center',gap:'9px',cursor:'pointer'}}>
                  <input type="checkbox" checked={epTemp} onChange={e=>setEpTemp(e.target.checked)} style={{accentColor:'var(--slhq-amber)',width:'15px',height:'15px'}}/>
                  <span style={{fontSize:'.82rem',fontWeight:700,color:'var(--ink2)'}}>⏳ Temporary page</span>
                </label>
                {epTemp&&<div style={{paddingLeft:'24px'}}>
                  <label style={{display:'block',fontSize:'.62rem',letterSpacing:'1.5px',textTransform:'uppercase',color:'var(--g4)',fontWeight:700,marginBottom:'5px'}}>Savings Target ($)</label>
                  <input type="number" min="0" step="10" value={epTarget} onChange={e=>setEpTarget(e.target.value)} placeholder="e.g. 500.00" style={{background:'#fff',border:'1.5px solid var(--paper3)',borderRadius:'2px',padding:'7px 9px',fontFamily:"'Courier Prime',monospace",fontSize:'.84rem',color:'var(--ink)',width:'160px'}}/>
                </div>}
                <label style={{display:'flex',alignItems:'center',gap:'9px',cursor:'pointer'}}>
                  <input type="checkbox" checked={epNoDispatch} onChange={e=>setEpNoDispatch(e.target.checked)} style={{accentColor:'var(--slhq-amber)',width:'15px',height:'15px'}}/>
                  <span style={{fontSize:'.82rem',fontWeight:700,color:'var(--ink2)'}}>Exclude from paycheck deposits</span>
                </label>
              </div>
            </div>
          )}

          {tab==='manage'&&(
            <div>
              <p style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'.8rem',color:'var(--ink3)',marginBottom:'12px'}}>Reorder pages using the arrows, or edit/delete individual pages.</p>
              <div className="page-manage-list">
                {S.pages.map((pg,i)=>(
                  pmMode[pg.id]==='editing'
                  ?<div key={pg.id} className="pm-row editing">
                    <span className="pm-icon">{pg.icon}</span>
                    <div className="pm-edit-inputs">
                      <input type="text" value={pmEdits[pg.id]?.name??pg.name} onChange={e=>setPmEdits(m=>({...m,[pg.id]:{...m[pg.id],name:e.target.value}}))} style={{flex:1}}/>
                      <input type="text" className="icon-pick" maxLength={4} value={pmEdits[pg.id]?.icon??pg.icon} onChange={e=>setPmEdits(m=>({...m,[pg.id]:{...m[pg.id],icon:e.target.value}}))}/>
                    </div>
                    <div className="pm-acts">
                      <button className="pm-btn" onClick={()=>savePmEdit(pg.id)}>✓ Save</button>
                      <button className="pm-btn del" onClick={()=>setPmMode(m=>({...m,[pg.id]:'view'}))}>✕</button>
                    </div>
                  </div>
                  :<div key={pg.id} className="pm-row">
                    <span className="pm-icon">{pg.icon}</span>
                    <span className="pm-name">{pg.name}</span>
                    <span className="pm-bal">{fmt(pg.balance)}</span>
                    <div className="pm-acts">
                      {i>0&&<button className="pm-btn up" onClick={()=>movePage(pg.id,-1)}>↑</button>}
                      {i<S.pages.length-1&&<button className="pm-btn dn" onClick={()=>movePage(pg.id,1)}>↓</button>}
                      <button className="pm-btn" onClick={()=>{setPmMode(m=>({...m,[pg.id]:'editing'}));setPmEdits(m=>({...m,[pg.id]:{name:pg.name,icon:pg.icon}}));}}>✎</button>
                      <button className="pm-btn del" onClick={()=>deletePage(pg.id)}>✕</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab==='add'&&(
            <div className="new-page-form">
              <label>Page Name</label>
              <input type="text" value={npName} onChange={e=>setNpName(e.target.value)} placeholder="e.g. HOA, Gym, Dog Food"/>
              <label>Icon (paste any emoji)</label>
              <input type="text" value={npIcon} onChange={e=>setNpIcon(e.target.value)} placeholder="e.g. 🐕" maxLength={4} style={{fontSize:'1.3rem',width:'70px'}}/>
              <label>Category</label>
              <select value={npCat} onChange={e=>setNpCat(e.target.value)}>
                {cats.map(c=><option key={c}>{c}</option>)}
              </select>
              <label>Monthly Bill ($)</label>
              <input type="number" min="0" step="5" value={npMonthly} onChange={e=>setNpMonthly(e.target.value)} placeholder="0"/>
              <label>Cushion ($)</label>
              <input type="number" min="0" step="5" value={npCushion} onChange={e=>setNpCushion(e.target.value)} placeholder="10"/>
              {parseFloat(npMonthly)>0&&<div style={{marginTop:'10px',fontSize:'.78rem',color:'var(--g4)',fontWeight:700}}>Per paycheck: {fmt(((parseFloat(npMonthly)||0)+(parseFloat(npCushion)||10))*12/S.freq)}</div>}
              <div style={{marginTop:'14px',paddingTop:'12px',borderTop:'1px dashed var(--paper3)',display:'flex',flexDirection:'column',gap:'9px'}}>
                <label style={{display:'flex',alignItems:'center',gap:'9px',cursor:'pointer',marginTop:0}}>
                  <input type="checkbox" checked={npTemp} onChange={e=>setNpTemp(e.target.checked)} style={{accentColor:'var(--slhq-amber)',width:'15px',height:'15px'}}/>
                  <span style={{fontSize:'.82rem',fontWeight:700,color:'var(--ink2)'}}>⏳ Temporary page</span>
                </label>
                {npTemp&&<div style={{paddingLeft:'24px'}}>
                  <label style={{display:'block',fontSize:'.62rem',letterSpacing:'1.5px',textTransform:'uppercase',color:'var(--g4)',fontWeight:700,marginBottom:'5px'}}>Savings Target ($)</label>
                  <input type="number" min="0" step="10" value={npTarget} onChange={e=>setNpTarget(e.target.value)} placeholder="e.g. 500.00" style={{background:'#fff',border:'1.5px solid var(--paper3)',borderRadius:'2px',padding:'7px 9px',fontFamily:"'Courier Prime',monospace",fontSize:'.84rem',color:'var(--ink)',width:'160px'}}/>
                </div>}
                <label style={{display:'flex',alignItems:'center',gap:'9px',cursor:'pointer'}}>
                  <input type="checkbox" checked={npNoDispatch} onChange={e=>setNpNoDispatch(e.target.checked)} style={{accentColor:'var(--slhq-amber)',width:'15px',height:'15px'}}/>
                  <span style={{fontSize:'.82rem',fontWeight:700,color:'var(--ink2)'}}>Exclude from paycheck deposits</span>
                </label>
              </div>
              <button className="btn-ok" style={{marginTop:'12px',width:'100%'}} onClick={addNewPage}>Add Page to Ledger</button>
            </div>
          )}

          {tab==='donors'&&(
            <div>
              <p style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'.8rem',color:'var(--ink3)',marginBottom:'10px'}}>Auto-Balance pulls from these pages in priority order when covering pages in the red.</p>
              <div style={{display:'flex',flexDirection:'column',gap:'6px',marginBottom:'10px',maxHeight:'220px',overflowY:'auto'}}>
                {!(S.donorPages&&S.donorPages.length)
                  ?<div style={{fontFamily:"'Lora',serif",fontStyle:'italic',fontSize:'.8rem',color:'var(--ink3)',padding:'6px 0'}}>No donor pages set yet. Add pages below.</div>
                  :(S.donorPages).map((id,i)=>{const d=S.pages.find(p=>p.id===id);if(!d)return null;return(
                    <div key={id} className="pm-row">
                      <span style={{fontSize:'.7rem',color:'var(--g5)',fontWeight:700,minWidth:'22px'}}>#{i+1}</span>
                      <span className="pm-icon">{d.icon}</span>
                      <span className="pm-name">{d.name}</span>
                      <span className="pm-bal" style={{color:d.balance>0?'var(--g3)':'var(--red)'}}>{fmt(d.balance)}</span>
                      <div className="pm-acts">
                        {i>0&&<button className="pm-btn up" onClick={()=>moveDonor(i,-1)}>↑</button>}
                        {i<(S.donorPages||[]).length-1&&<button className="pm-btn dn" onClick={()=>moveDonor(i,1)}>↓</button>}
                        <button className="pm-btn del" onClick={()=>removeDonor(i)}>✕</button>
                      </div>
                    </div>
                  );})}
              </div>
              <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
                <select className="ms" style={{flex:1}} value={donorPick} onChange={e=>setDonorPick(e.target.value)}>
                  {availableDonors.length
                    ?availableDonors.map(p=><option key={p.id} value={p.id}>{p.icon} {p.name}</option>)
                    :<option value="">— All pages are already donors —</option>
                  }
                </select>
                <button className="btn-ok" style={{padding:'8px 14px',fontSize:'.78rem'}} onClick={addDonor}>+ Add</button>
              </div>
            </div>
          )}
        </div>

        <div className="mfooter" style={{display:tab==='add'||tab==='donors'?'none':'flex'}}>
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          {tab==='page'&&<button className="btn-ok" onClick={savePageEdit}>Save Changes</button>}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// BETA FEEDBACK MODAL
// ═══════════════════════════════════════════════════════════
function BetaFeedbackModal({onClose}){
  const [feedback,setFeedback]=useState('');
  const [sent,setSent]=useState(false);

  function sendFeedback(){
    if(!feedback.trim())return;
    window.location.href=`mailto:hello@startinglinehq.com?subject=DivvyDup%20Beta%20Feedback&body=${encodeURIComponent(feedback)}`;
    setSent(true);
    setTimeout(()=>{setSent(false);onClose();},500);
  }

  return(
    <div className="modal-overlay open" onClick={e=>{if(e.target.className.includes('modal-overlay'))onClose();}}>
      <div className="mbook" style={{maxWidth:'460px'}}>
        <div className="mhdr">
          <h3>✏️ Send us feedback</h3>
          <p>Your thoughts help us build better tools.</p>
        </div>
        <div className="mbody">
          <textarea value={feedback} onChange={e=>setFeedback(e.target.value)} placeholder="What's working? What's not? Any ideas?" style={{width:'100%',height:'120px',fontFamily:"'Lora',serif",fontSize:'.88rem',color:'var(--ink)',padding:'10px',border:'1px solid var(--border)',borderRadius:'8px',resize:'none'}}/>
        </div>
        <div className="mfooter">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-ok" disabled={!feedback.trim()||sent} onClick={sendFeedback}>{sent?'✓ Sent':'Send Feedback'}</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// RESET MODAL
// ═══════════════════════════════════════════════════════════
function ResetModal({onClose,onReset}){
  const [input,setInput]=useState('');
  const ok=input.trim().toUpperCase()==='RESET';

  function execute(){
    if(!ok)return;
    ['famLedger','famLedger_v5','famLedger_v4','famLedger_v3','famLedger_v2','famLedger_v1'].forEach(k=>{try{localStorage.removeItem(k);}catch(e){}});
    onReset();
  }

  return(
    <div className="modal-overlay open" onClick={e=>{if(e.target.className.includes('modal-overlay'))onClose();}}>
      <div className="mbook" style={{maxWidth:'460px'}}>
        <div className="mhdr" style={{background:'#3a0a0a',borderBottomColor:'#7a1515'}}>
          <h3 style={{color:'#ff9090'}}>↺ Reset &amp; Start Over</h3>
          <p style={{color:'#e8b0b0'}}>This will permanently erase your entire ledger.</p>
        </div>
        <div className="mbody">
          <p style={{fontFamily:"'Lora',serif",fontSize:'.88rem',color:'var(--ink2)',lineHeight:1.65,marginBottom:'14px'}}>All pages, balances, transaction history, and settings will be <strong>permanently deleted</strong>. This cannot be undone.</p>
          <p style={{fontFamily:"'Lora',serif",fontSize:'.84rem',color:'var(--ink3)',marginBottom:'16px'}}>To confirm, type the word <strong>RESET</strong> below:</p>
          <input className="mi" type="text" value={input} onChange={e=>setInput(e.target.value)} placeholder="Type RESET to confirm" style={{letterSpacing:'2px',fontWeight:700}} autoComplete="off"/>
        </div>
        <div className="mfooter">
          <button className="btn-cancel" onClick={onClose}>Cancel — Keep My Data</button>
          <button className="btn-ok" disabled={!ok} onClick={execute} style={{background:'var(--red-light)',boxShadow:'0 2px 0 #5a1010',opacity:ok?1:.5,cursor:ok?'pointer':'not-allowed'}}>↺ Erase Everything</button>
        </div>
      </div>
    </div>
  );
}
