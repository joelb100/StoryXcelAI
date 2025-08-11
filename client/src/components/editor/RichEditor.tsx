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

    let q: Quill | null = null;
    
    try {
      q = new Quill(containerRef.current, {
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
      
      // Only call onReady after Quill is fully initialized
      setTimeout(() => {
        if (q && quillRef.current === q) {
          onReady?.(q);
        }
      }, 0);
      
    } catch (error) {
      console.error('Quill initialization error:', error);
      quillRef.current = null;
    }

    return () => {
      // ✅ cleanly dispose to avoid half‑alive instances
      if (q) {
        try { 
          // Remove all listeners
          if (q.off) {
            q.off("text-change");
            q.off("selection-change");
          }
        } catch {}
        
        try {
          // @ts-ignore
          if (q.root) q.root.innerHTML = "";
        } catch {}
      }
      
      // Clear the ref
      quillRef.current = null;
    };
  }, []); // Remove onReady from dependencies to prevent re-initialization

  return (
    <div className={className}>
      <div ref={containerRef} className="rounded-md border border-slate-200" style={{ minHeight: '200px' }} />
    </div>
  );
};

// ---- Helper you call elsewhere (ALWAYS guard the ref) ----
export function setHtml(q: Quill | null, html: string, preserveFocus: boolean = true) {
  if (!q) return; // ✅ guard
  if (!q.clipboard) return; // ✅ additional guard for clipboard
  
  try {
    // safer than touching innerHTML during updates:
    const delta = q.clipboard.convert({ html });
    q.setContents(delta, "silent");
    
    // Only set selection if Quill currently has focus OR preserveFocus is false
    if (!preserveFocus || (q.hasFocus && q.hasFocus())) {
      q.setSelection(q.getLength(), 0, "silent");
    }
  } catch (error) {
    console.warn('Quill setHtml error:', error);
    // Fallback to direct HTML if convert fails
    try {
      if (q.root) {
        q.root.innerHTML = html;
      }
    } catch (fallbackError) {
      console.warn('Fallback HTML assignment failed:', fallbackError);
    }
  }
}

export default RichEditor;