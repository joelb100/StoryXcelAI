import React, { useMemo, useRef, useCallback, useState, useEffect } from 'react';
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
  const [key, setKey] = useState(0);

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

  // Safe change handler that catches emitter errors
  const handleChange = useCallback((content: string) => {
    try {
      onChange(content);
    } catch (error) {
      console.warn('Quill change handler error:', error);
      // Force remount on error
      setKey(prev => prev + 1);
    }
  }, [onChange]);

  // Error boundary for Quill
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('emitter')) {
        console.warn('Quill emitter error caught, remounting...');
        setKey(prev => prev + 1);
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return (
    <div className={className}>
      {/* CONTROLLED: use value, not defaultValue */}
      <ReactQuill
        key={key}
        ref={quillRef}
        theme="snow"
        modules={modules}
        value={value}
        onChange={handleChange}
        className="rounded-md border border-slate-200"
        preserveWhitespace={true}
      />
    </div>
  );
};

export default RichEditor;