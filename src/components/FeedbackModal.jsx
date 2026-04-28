import { useState } from 'react';
import StandardModal from './StandardModal';

export default function FeedbackModal({ isOpen, onClose, productName, onSubmit }) {
  const [context, setContext] = useState('');
  const [issues, setIssues] = useState('');
  const [ideas, setIdeas] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!context.trim() && !issues.trim() && !ideas.trim()) {
      alert('Please share at least one piece of feedback.');
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit({ context: context.trim(), issues: issues.trim(), ideas: ideas.trim(), timestamp: new Date().toISOString(), product: productName });
      setContext(''); setIssues(''); setIdeas('');
      onClose();
      alert('Thanks! Your feedback has been sent to Tony.');
    } catch (err) {
      console.error('Feedback error:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const helperSt = { fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 4, marginBottom: 8 };

  return (
    <StandardModal isOpen={isOpen} onClose={onClose} title="Got a minute?" subtitle={`Help us make ${productName} better. Your feedback goes straight to Tony.`} maxWidth="640px">
      <form onSubmit={handleSubmit}>
        <label>What were you trying to do?</label>
        <p style={helperSt}>Just a little context — helps us understand where you were in the app.</p>
        <textarea value={context} onChange={e => setContext(e.target.value)} placeholder="e.g. I was trying to add an asset and..." rows={3} />

        <label>Anything feel off, confusing, or broken?</label>
        <p style={helperSt}>Don't hold back — this is exactly what we need to know.</p>
        <textarea value={issues} onChange={e => setIssues(e.target.value)} placeholder="e.g. The save button didn't seem to work, or I couldn't figure out how to..." rows={3} />

        <label>Any ideas or wishes?</label>
        <p style={helperSt}>Go wild — nothing too small.</p>
        <textarea value={ideas} onChange={e => setIdeas(e.target.value)} placeholder="e.g. It would be great if I could export to PDF, or what if there was a way to..." rows={3} />

        <p style={{ fontSize: 14, fontStyle: 'italic', color: 'rgba(255,255,255,0.6)', marginTop: 20, textAlign: 'center' }}>
          Your feedback goes straight to Tony. We read every single one.
        </p>

        <div className="button-group">
          <button type="button" className="btn-secondary" onClick={onClose} disabled={submitting}>Maybe later</button>
          <button type="submit" className="btn-primary" disabled={submitting}>{submitting ? 'Sending…' : 'Send feedback →'}</button>
        </div>
      </form>
    </StandardModal>
  );
}
