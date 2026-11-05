import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

const styles = {
  error: ['border-red-200 bg-red-50 text-red-800', AlertCircle],
  success: ['border-green-200 bg-green-50 text-green-800', CheckCircle2],
  info: ['border-blue-200 bg-blue-50 text-blue-800', Info],
};

export default function Notice({ notice, onClose }) {
  if (!notice) return null;
  const [cls, Icon] = styles[notice.type] || styles.info;
  return (
    <div role="alert" className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${cls}`}>
      <Icon size={20} className="mt-0.5 shrink-0" />
      <p className="flex-1">{notice.message}</p>
      <button onClick={onClose} aria-label="Dismiss" className="shrink-0 opacity-70 hover:opacity-100"><X size={18} /></button>
    </div>
  );
}
