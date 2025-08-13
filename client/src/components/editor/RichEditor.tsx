import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export const OVERVIEW_START =
  '<span class="sx-hidden" data-sx-marker="overview-start"></span>';
export const OVERVIEW_END =
  '<span class="sx-hidden" data-sx-marker="overview-end"></span>';

type Props = {
  value: string;
  onChange: (html: string) => void;
  className?: string;
  onReady?: (quill: Quill) => void;
};

const RichEditor: React.FC<Props> = ({ value, onChange, className, onReady }) => {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const qRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!hostRef.current || qRef.current) return;

    const q = new Quill(hostRef.current, {
      theme: "snow",
      readOnly: false,
      placeholder: "Your story begins here...",
      modules: {
        toolbar: [
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ font: [] }],
          ['bold', 'italic', 'underline'],
          [{ align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean'],
        ],
        clipboard: { matchVisual: true },
      },
      formats: ["bold","italic","underline","strike","list","align","header"],
    });

    // Make the Quill containers fill + scroll
    const container = hostRef.current.querySelector(".ql-container") as HTMLElement | null;
    const editor = hostRef.current.querySelector(".ql-editor") as HTMLElement | null;
    if (container) container.style.height = "100%";
    if (editor) {
      editor.style.height = "100%";
      editor.style.overflowY = "auto";
    }

    // Handle content changes
    q.on('text-change', () => {
      onChange(q.root.innerHTML);
    });

    // Set initial value
    if (value) {
      q.root.innerHTML = value;
    }

    qRef.current = q;
    (window as any).__quill = q;
    (window as any).__quillReady = true;
    onReady?.(q);
  }, [onReady]);

  // Update content when value prop changes
  useEffect(() => {
    if (qRef.current && value !== qRef.current.root.innerHTML) {
      qRef.current.root.innerHTML = value;
    }
  }, [value]);

  return (
    <div className={className}>
      {/* Give the host a real height to fill */}
      <div ref={hostRef} className="h-full rounded-md border border-slate-200" />
    </div>
  );
};

export default RichEditor;