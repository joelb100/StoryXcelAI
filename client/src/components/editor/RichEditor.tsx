import { useEffect, useRef } from "react";
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

export default function RichEditor({ onReady, className }: Props) {
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
      formats: ["bold", "italic", "underline", "strike", "list", "align", "header"],
    });

    qRef.current = q;
    (window as any).__quill = q;
    (window as any).__quillReady = true;
    onReady?.(q);

    return () => {
      // Clean disposal
      if (qRef.current) {
        try {
          if (qRef.current.off) {
            qRef.current.off("text-change");
            qRef.current.off("selection-change");
          }
        } catch {}
        qRef.current = null;
      }
      (window as any).__quill = null;
      (window as any).__quillReady = false;
    };
  }, []);

  return (
    <div className={className}>
      <div ref={hostRef} className="rounded-md border border-slate-200" style={{ minHeight: '200px' }} />
    </div>
  );
}