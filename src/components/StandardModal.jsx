import { useEffect } from 'react';
import './StandardModal.css';

const StandardModal = ({ isOpen, onClose, title, subtitle, maxWidth = '480px', children }) => {
  useEffect(() => {
    const handleEscape = (e) => { if (e.key === 'Escape' && isOpen) onClose(); };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="standard-modal-overlay" onClick={onClose}>
      <div className="standard-modal-content" style={{ maxWidth }} onClick={(e) => e.stopPropagation()}>
        <button className="standard-modal-close" onClick={onClose} aria-label="Close modal">✕</button>
        <div className="standard-modal-header">
          <h2 className="standard-modal-title">{title}</h2>
          {subtitle && <p className="standard-modal-subtitle">{subtitle}</p>}
        </div>
        <div className="standard-modal-body">{children}</div>
      </div>
    </div>
  );
};

export default StandardModal;
