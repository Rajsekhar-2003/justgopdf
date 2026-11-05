import { Loader2 } from 'lucide-react';

export default function Loading({ message = 'Working…', progress }) {
  return (
    <div className="flex flex-col items-center gap-3 py-6" role="status" aria-live="polite">
      <Loader2 className="animate-spin text-indigo-600" size={32} />
      <p className="text-sm font-medium text-slate-700">{message}</p>
      {typeof progress === 'number' && (
        <div className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-slate-200">
          <div className="h-full bg-indigo-600 transition-all" style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>
      )}
    </div>
  );
}
