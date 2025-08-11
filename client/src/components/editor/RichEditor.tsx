import React, { useMemo } from 'react';
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

  return (
    <div className={className}>
      <ReactQuill
        theme="snow"
        modules={modules}
        value={value}
        onChange={onChange}
        className="rounded-md border border-slate-200"
      />
    </div>
  );
};

export default RichEditor;