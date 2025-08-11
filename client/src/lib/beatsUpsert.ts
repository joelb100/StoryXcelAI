// beatsUpsert.ts
import { CONFLICT_BEATS } from "./conflictBeats";
import { buildBeatsHTML, BEATS_START, BEATS_END } from "./beatsRender";
import { createHash } from "./hash";

export async function upsertBeatsAfterOverview(
  html: string, 
  conflictLabel: string, 
  confirmReplace: () => Promise<boolean>
): Promise<string> {
  if (!conflictLabel) return html; // leave existing, per product rules

  const beats = CONFLICT_BEATS[conflictLabel];
  if (!beats) {
    console.warn('No beats found for conflict:', conflictLabel);
    console.log('Available keys:', Object.keys(CONFLICT_BEATS));
    return html;
  }

  const container = document.createElement("div");
  container.innerHTML = html || "";

  const start = container.querySelector('span[data-sx-marker="beats-start"]');
  const end   = container.querySelector('span[data-sx-marker="beats-end"]');

  const newHTML = buildBeatsHTML(conflictLabel, beats);

  if (start && end) {
    // Detect edits: compare stored fp vs current inner text
    const meta = container.querySelector('span[data-sx-beats-meta]');
    let edited = false;

    try {
      const stored = meta?.getAttribute("data-sx-beats-meta");
      const parsed = stored ? JSON.parse(stored) : null;
      
      if (parsed && parsed.conflictLabel === conflictLabel) {
        // Extract visible text between markers for comparison
        const range = document.createRange();
        range.setStartAfter(start);
        range.setEndBefore(end);
        
        // Create temp container to get text content
        const tempDiv = document.createElement('div');
        tempDiv.appendChild(range.cloneContents());
        
        // Remove hidden elements for text comparison
        const hiddenElements = tempDiv.querySelectorAll('.sx-hidden');
        hiddenElements.forEach(el => el.remove());
        
        const currentText = tempDiv.textContent || "";
        const expectedText = [
          "Story Beats",
          "Plot A", "The high level description of the story's key sequential events of the main story",
          ...beats.plotA,
          "Sub Plot B", "The storyline's Secondary sequential story points that focus on relationships", 
          ...beats.subPlotB,
          "Sub Plot C", "The storyline's Tertiary sequential story points that focus on background elements",
          ...beats.subPlotC,
          "Plot Twists",
          ...beats.twists,
          "Emotional Hook", "A powerful narrative element designed to evoke strong feelings",
          ...beats.hooks
        ].join("");
        
        // Compare fingerprints
        const currentFp = createHash(currentText);
        const expectedFp = createHash(expectedText);
        
        edited = currentFp !== expectedFp;
      } else {
        // Different conflict or no valid meta = treat as edited
        edited = true;
      }
    } catch { 
      edited = true; 
    }

    if (edited) {
      // Ask user
      const shouldReplace = await confirmReplace();
      if (!shouldReplace) return html; // abort
    }

    // Replace range
    replaceRange(start, end, newHTML);
    return container.innerHTML;
  }

  // No existing block: insert after overview-end
  const overviewEnd = container.querySelector('span[data-sx-marker="overview-end"]');
  if (!overviewEnd) {
    // Fallback: append
    container.insertAdjacentHTML("beforeend", newHTML);
    return container.innerHTML;
  }

  // Create wrapper div and insert after overview-end marker
  const wrapper = document.createElement('div');
  wrapper.innerHTML = newHTML;
  
  // Insert all the content from wrapper after the overview-end marker
  const fragment = document.createDocumentFragment();
  while (wrapper.firstChild) {
    fragment.appendChild(wrapper.firstChild);
  }
  
  overviewEnd.parentNode?.insertBefore(fragment, overviewEnd.nextSibling);
  return container.innerHTML;
}

function replaceRange(start: Element, end: Element, htmlFragment: string) {
  const range = document.createRange();
  range.setStartBefore(start);
  range.setEndAfter(end);
  range.deleteContents();

  const holder = document.createElement("div");
  holder.innerHTML = htmlFragment;
  const frag = document.createDocumentFragment();
  while (holder.firstChild) frag.appendChild(holder.firstChild);
  range.insertNode(frag);
}