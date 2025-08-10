import { MARK_START, MARK_END } from './overviewTemplate';

// Detect & write to Quill, TipTap, or textarea content
export function upsertOverviewBlock(editorRef: any, htmlOrText: string) {
  // If Quill
  const q = editorRef?.current || editorRef;
  const isQuill = q && (q.getEditor || q.clipboard);
  const isTipTap = editorRef?.commands && editorRef?.getHTML;

  if (isQuill) {
    const editor = q.getEditor?.() ?? q;
    const root = editor.root as HTMLElement;
    const current = root.innerHTML || '';
    const next = upsertString(current, htmlOrText);
    if (next !== current) root.innerHTML = next;
    return;
  }

  if (isTipTap) {
    const current = editorRef.getHTML();
    const next = upsertString(current, htmlOrText);
    if (next !== current) editorRef.commands.setContent(next, false);
    return;
  }

  // Textarea fallback (plain text)
  const el: HTMLTextAreaElement | null =
    editorRef?.current ?? document.querySelector('textarea[data-story-builder]');
  if (el) {
    const current = el.value || '';
    const next = upsertString(current, htmlOrText);
    if (next !== current) el.value = next;
  }
}

function upsertString(current: string, block: string) {
  const has = current.includes(MARK_START) && current.includes(MARK_END);
  if (!has) return block + current;
  const re = new RegExp(`${escapeReg(MARK_START)}[\\s\\S]*?${escapeReg(MARK_END)}`);
  return current.replace(re, block.trim());
}

function escapeReg(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}