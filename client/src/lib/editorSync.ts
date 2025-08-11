import Quill from "quill";

export function debounce<T extends (...a: any[]) => void>(fn: T, ms = 250) {
  let t: any;
  return (...args: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

export function writeHtml(q: Quill, html: string) {
  if (!q || !q.clipboard) return;
  
  try {
    // Convert HTML to Delta (works across Quill versions)
    const delta = q.clipboard.convert({ html });
    q.setContents(delta, "silent");

    // preserve caret if the user is typing
    if (q.hasFocus?.()) {
      q.setSelection(q.getLength(), 0, "silent");
    }

    (window as any).__lastOverviewHTML = html;
    console.log('✓ writeHtml: Updated editor with HTML length:', html.length);
  } catch (error) {
    console.warn('writeHtml error:', error);
    // Fallback to direct HTML if convert fails
    try {
      if (q.root) {
        q.root.innerHTML = html;
        (window as any).__lastOverviewHTML = html;
      }
    } catch (fallbackError) {
      console.warn('Fallback HTML assignment failed:', fallbackError);
    }
  }
}