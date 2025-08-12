import React, { useMemo, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const OVERVIEW_START =
  '<span class="sx-hidden" data-sx-marker="overview-start"></span>';
export const OVERVIEW_END =
  '<span class="sx-hidden" data-sx-marker="overview-end"></span>';

type Props = {
  value: string;
  onChange: (html: string) => void;
  className?: string;
};

const RichEditor: React.FC<Props> = ({ value, onChange, className }) => {
  const quillRef = useRef<ReactQuill>(null);

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
      clipboard: { 
        matchVisual: false,
      },
    }),
    []
  );

  const formats = [
    'size', 'font', 'bold', 'italic', 'underline', 
    'align', 'list', 'bullet'
  ];

  return (
    <div className={`${className} overflow-visible rich-editor-container`}>
      {/* CONTROLLED: use value, not defaultValue */}
      <ReactQuill
        ref={quillRef}
        theme="snow"
        modules={modules}
        formats={formats}
        value={value}
        onChange={onChange}
        className="rounded-md border border-slate-200 rich-editor-quill"
        preserveWhitespace={true}
      />
    </div>
  );
};

export default RichEditor;