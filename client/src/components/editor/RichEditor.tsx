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
  const elRef = useRef<HTMLDivElement | null>(null);
  const qRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!elRef.current || qRef.current) return; // ✅ don't double‑init

    try {
      const q = new Quill(elRef.current, {
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
        formats: ["bold", "italic", "underline", "strike", "list", "align", "header", "size", "font"],
      });

      qRef.current = q;
      
      // Debug helpers
      (window as any).__quill = q;
      (window as any).__quillReady = true;
      
      // Call onReady callback
      onReady?.(q);
      
    } catch (error) {
      console.error('Quill initialization error:', error);
      qRef.current = null;
    }

    return () => {
      // ✅ cleanly dispose to avoid half‑alive instances
      const q = qRef.current;
      if (q) {
        try { 
          // Remove all listeners safely
          if (q.off) {
            q.off("text-change", undefined);
            q.off("selection-change", undefined);
          }
        } catch {}
        
        try {
          // @ts-ignore
          if (q.root) q.root.innerHTML = "";
        } catch {}
      }
      
      // Clear refs and debug helpers
      qRef.current = null;
      (window as any).__quill = null;
      (window as any).__quillReady = false;
    };
  }, []); // No dependencies to prevent re-initialization

  return (
    <div className={className}>
      <div id="story-editor">
        <div ref={elRef} className="rounded-md border border-slate-200" style={{ minHeight: '200px' }} />
      </div>
    </div>
  );
};



export default RichEditor;