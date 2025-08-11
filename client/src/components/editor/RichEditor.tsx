import React, { useMemo, useRef, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type RichEditorProps = {
  value: string;
  onChange: (html: string) => void;
  className?: string;
};

// Keep our markers invisible but present for updates
export const OVERVIEW_START = '<span data-sx-marker="overview-start" style="display:none"></span>';
export const OVERVIEW_END   = '<span data-sx-marker="overview-end" style="display:none"></span>';

const RichEditor: React.FC<RichEditorProps> = ({ value, onChange, className }) => {
  const quillRef = useRef<ReactQuill | null>(null);

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ font: [] }],
        ['bold', 'italic', 'underline'],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['clean'],
      ],
      clipboard: { matchVisual: true },
    }),
    []
  );

  // Ensure initial content loads once
  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    // Only set if editor empty to avoid stomping user text when navigating
    if (quill.getLength() <= 1 && value) {
      quill.clipboard.dangerouslyPasteHTML(0, value);
    }
  }, [value]);

  return (
    <div className={className}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        modules={modules}
        defaultValue={value}
        onChange={onChange}
        className="rounded-md border border-slate-200"
      />
    </div>
  );
};

export default RichEditor;