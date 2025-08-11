import type Quill from "quill";

export function debounce<T extends (...args: any) => void>(fn: T, ms = 250) {
  let t: any;
  return (...a: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), ms);
  };
}

export function setHtmlPreserveFocus(q: Quill, html: string) {
  if (!q || !q.clipboard) return;
  
  try {
    const delta = q.clipboard.convert({ html });
    q.setContents(delta, "silent");
    
    // Only set selection if Quill currently has focus
    if (q.hasFocus?.()) {
      q.setSelection(q.getLength(), 0, "silent");
    }
    
    // Debug helper
    (window as any).__lastHTML = html;
  } catch (error) {
    console.warn('setHtmlPreserveFocus error:', error);
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