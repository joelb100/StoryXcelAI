import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export const OVERVIEW_START =
  '<span class="sx-hidden" data-sx-marker="overview-start"></span>';
export const OVERVIEW_END =
  '<span class="sx-hidden" data-sx-marker="overview-end"></span>';

type Props = {
  value: string;
  onChange: (html: string) => void;
  className?: string;
};

export default function RichEditor({ value, onChange, className }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const qRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!hostRef.current || qRef.current) return;

    const q = new Quill(hostRef.current, {
      theme: "snow",
      modules: { 
        toolbar: [
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ font: [] }],
          ['bold', 'italic', 'underline'],
          [{ align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean'],
        ], 
        clipboard: { matchVisual: true } 
      },
    });
    qRef.current = q;

    // resize the Quill container to fill the host
    const container = hostRef.current.querySelector(".ql-container") as HTMLElement | null;
    if (container) container.style.height = "calc(100% - 42px)"; // toolbar ≈42px
    const root = hostRef.current.querySelector(".ql-editor") as HTMLElement | null;
    if (root) root.style.minHeight = "auto";

    q.on("text-change", () => onChange(q.root.innerHTML));
  }, [onChange]);

  // keep Quill in sync when value is changed externally
  useEffect(() => {
    const q = qRef.current;
    if (!q) return;
    const current = q.root.innerHTML;
    if (current !== value) {
      const delta = q.clipboard.convert({ html: value || "<p><br/></p>" });
      q.setContents(delta, "silent");
    }
  }, [value]);

  return (
    <div className={["w-full h-full", className].filter(Boolean).join(" ")}>
      <div ref={hostRef} className="w-full h-full" />
    </div>
  );
}