import { useRef, useState } from 'react';
import { UploadCloud } from 'lucide-react';

/**
 * accept: array of MIME types; extensions: array like ['.pdf']
 * Validates type and size, then calls onFiles(validFiles). Problems go to onError(message).
 */
export default function UploadArea({ accept, extensions = [], multiple = false, maxSizeMB = 50, onFiles, onError, title, hint, buttonLabel = 'Browse files', disabled }) {
  const inputRef = useRef(null);
  const [drag, setDrag] = useState(false);

  const handle = (list) => {
    let files = [...list];
    if (!files.length) return;
    if (!multiple) files = files.slice(0, 1);
    const valid = [];
    const errors = [];
    for (const f of files) {
      const typeOk = accept.includes(f.type) || extensions.some((e) => f.name.toLowerCase().endsWith(e));
      if (!typeOk) errors.push(`"${f.name}" is not a supported file type. Use ${extensions.join(', ')}.`);
      else if (f.size > maxSizeMB * 1024 * 1024) errors.push(`"${f.name}" is larger than ${maxSizeMB} MB.`);
      else if (f.size === 0) errors.push(`"${f.name}" is empty.`);
      else valid.push(f);
    }
    if (errors.length) onError?.(errors.join(' '));
    if (valid.length) onFiles(valid);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); if (!disabled) setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); if (!disabled) handle(e.dataTransfer.files); }}
      className={`flex flex-col items-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${drag ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 bg-white'}`}
    >
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-600"><UploadCloud size={28} /></div>
      <p className="text-lg font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{hint}</p>
      <button type="button" className="btn-primary mt-5" disabled={disabled} onClick={() => inputRef.current?.click()}>{buttonLabel}</button>
      <input ref={inputRef} type="file" hidden multiple={multiple} accept={[...accept, ...extensions].join(',')} onChange={(e) => handle(e.target.files)} />
    </div>
  );
}
