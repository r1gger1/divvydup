const FH = "'Fraunces','Playfair Display',Georgia,serif";
const FB = "'Inter','Helvetica Neue',sans-serif";

export default function PaidWelcomeSplash({ userName, onContinue }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9000,
      background: 'linear-gradient(135deg, #1E3530 0%, #0D1C18 50%, #1E3530 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
    }}>
      <style>{`
        @keyframes drawLine {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.04); }
          100% { transform: scale(1); }
        }
      `}</style>

      {/* Starting line draw */}
      <div style={{
        position: 'absolute', top: '0', left: '0',
        height: '2px', background: '#86efac',
        width: 0,
        animation: 'drawLine 600ms ease-out forwards',
      }} />

      <div style={{ maxWidth: '560px', width: '100%', textAlign: 'center' }}>

        {/* Logo + Brand */}
        <div style={{
          opacity: 0,
          animation: 'fadeUp 480ms ease-out 150ms both',
        }}>
          <div style={{ marginBottom: '12px' }}>
            <img src="/slhq-logo.png" alt="StartingLine HQ" style={{ height: '60px', display: 'inline-block' }} />
          </div>
          <div style={{
            fontFamily: FB, fontSize: '13px', fontWeight: 600,
            color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em',
            textTransform: 'uppercase', marginBottom: '12px',
          }}>
            DivvyDup
          </div>
        </div>

        {/* Headline */}
        <div style={{
          fontFamily: FH, fontSize: '34px', fontWeight: 700,
          color: '#fff', lineHeight: 1.2, marginBottom: '20px',
          opacity: 0,
          animation: 'fadeUp 480ms ease-out 300ms both',
        }}>
          {userName ? `${userName}, you just made it fair.` : 'You just made it fair.'}
        </div>

        {/* Body paragraph 1 */}
        <div style={{
          fontSize: '16px', color: 'rgba(255,255,255,0.78)',
          lineHeight: 1.7, marginBottom: '16px',
          maxWidth: '440px', margin: '0 auto 16px',
          opacity: 0,
          animation: 'fadeUp 480ms ease-out 450ms both',
        }}>
          Most shared expenses turn into awkward conversations. You just fixed that.
        </div>

        {/* Body paragraph 2 */}
        <div style={{
          fontSize: '15px', color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.7, marginBottom: '40px',
          maxWidth: '420px', margin: '0 auto 40px',
          opacity: 0,
          animation: 'fadeUp 480ms ease-out 550ms both',
        }}>
          DivvyDup tracks every shared expense and keeps everyone on the same page — no spreadsheets, no drama.
        </div>

        {/* CTA */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center',
          opacity: 0,
          animation: 'fadeUp 480ms ease-out 700ms both',
        }}>
          <button
            onClick={onContinue}
            style={{
              width: '100%', maxWidth: '340px',
              padding: '16px 24px', borderRadius: '14px',
              background: '#B5D4A8', color: '#0D1C18',
              fontFamily: FB, fontSize: '15px', fontWeight: 700,
              border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
              transition: 'all 0.18s',
              animation: 'fadeUp 480ms ease-out 700ms both, pulse 500ms ease-in-out 900ms 1',
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Let's go →
          </button>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '36px', fontSize: '12px',
          color: 'rgba(255,255,255,0.35)', lineHeight: 1.6,
          opacity: 0,
          animation: 'fadeUp 480ms ease-out 850ms both',
        }}>
          Your data is private. Cancel anytime from Settings.
        </div>

      </div>
    </div>
  );
}
