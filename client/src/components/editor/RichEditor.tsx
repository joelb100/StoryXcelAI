import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export const OVERVIEW_START = '<!-- STORYXCEL_OVERVIEW_START -->';
export const OVERVIEW_END = '<!-- STORYXCEL_OVERVIEW_END -->';
export const BEATS_START = '<!-- STORYXCEL_BEATS_START -->';
export const BEATS_END = '<!-- STORYXCEL_BEATS_END -->';

type Props = {
  onReady?: (q: Quill) => void;
  className?: string;
};

const RichEditor: React.FC<Props> = ({ onReady, className }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (quillRef.current) return; // ✅ don't double‑init

    const q = new Quill(containerRef.current, {
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
    });

    quillRef.current = q;
    onReady?.(q);

    return () => {
      // ✅ cleanly dispose to avoid half‑alive instances
      try { q.off?.("text-change"); } catch {}
      // @ts-ignore
      if (q?.root) q.root.innerHTML = "";
      // There is no official destroy(), but removing the node + dropping refs avoids HMR ghosts
      quillRef.current = null;
    };
  }, [onReady]);

  return (
    <div className={className}>
      <div ref={containerRef} className="rounded-md border border-slate-200" style={{ minHeight: '200px' }} />
    </div>
  );
};

// ---- Helper you call elsewhere (ALWAYS guard the ref) ----
export function setHtml(q: Quill | null, html: string) {
  if (!q) return; // ✅ guard
  // safer than touching innerHTML during updates:
  const delta = q.clipboard.convert(html);
  q.setContents(delta, "silent");
  q.setSelection(q.getLength(), 0, "silent");
}

export default RichEditor;