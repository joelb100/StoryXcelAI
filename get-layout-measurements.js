// ============================================================
// StoryXcel Layout Measurement Script
// Run this in your browser console to get the exact measurements
// ============================================================

console.log('=== StoryXcel Layout Measurements ===');

// 1. FRAME_TOP — distance from top of viewport to the top edge of the red frame
try {
  const frameTop = Math.round(document.querySelector('#story-frame').getBoundingClientRect().top);
  console.log('FRAME_TOP (pixels from viewport top to story frame top):', frameTop);
} catch (e) {
  console.error('Error getting FRAME_TOP:', e.message);
  console.log('Story frame element with id="story-frame" not found');
}

// 2. AI_HEIGHT — the green panel's full rendered height (including padding and border)
try {
  const aiHeight = Math.round(document.querySelector('#ai-panel').getBoundingClientRect().height);
  console.log('AI_HEIGHT (full height of AI panel):', aiHeight);
} catch (e) {
  console.error('Error getting AI_HEIGHT:', e.message);
  console.log('AI panel element with id="ai-panel" not found');
}

// 3. GAP_BELOW — the exact visual gap between the red frame bottom and the green panel top
try {
  const f = document.querySelector('#story-frame').getBoundingClientRect();
  const a = document.querySelector('#ai-panel').getBoundingClientRect();
  const gapBelow = Math.round(a.top - f.bottom);
  console.log('GAP_BELOW (gap between story frame bottom and AI panel top):', gapBelow);
} catch (e) {
  console.error('Error getting GAP_BELOW:', e.message);
  console.log('Could not calculate gap - check that both #story-frame and #ai-panel exist');
}

// 4. TOOLBAR_HEIGHT — the editor toolbar's computed height
try {
  const toolbar = document.querySelector('.ql-toolbar');
  if (toolbar) {
    const toolbarHeight = getComputedStyle(toolbar).height;
    console.log('TOOLBAR_HEIGHT (Quill toolbar height):', toolbarHeight);
  } else {
    console.log('TOOLBAR_HEIGHT: Quill toolbar (.ql-toolbar) not found');
    // Check for alternate toolbar classes
    const altToolbar = document.querySelector('.tiptap-toolbar');
    if (altToolbar) {
      const altHeight = getComputedStyle(altToolbar).height;
      console.log('TOOLBAR_HEIGHT (TipTap toolbar height):', altHeight);
    } else {
      console.log('No editor toolbar found (.ql-toolbar or .tiptap-toolbar)');
    }
  }
} catch (e) {
  console.error('Error getting TOOLBAR_HEIGHT:', e.message);
}

// Additional debugging info
console.log('\n=== Debugging Info ===');
console.log('Available elements:');
console.log('- #story-frame exists:', !!document.querySelector('#story-frame'));
console.log('- #ai-panel exists:', !!document.querySelector('#ai-panel'));
console.log('- .ql-toolbar exists:', !!document.querySelector('.ql-toolbar'));
console.log('- .tiptap-toolbar exists:', !!document.querySelector('.tiptap-toolbar'));

// Show current viewport height for reference
console.log('- Current viewport height (100dvh):', window.innerHeight + 'px');

console.log('\n=== Copy these values for the developer ===');
console.log('Run the individual commands for precise values:');
console.log('Math.round(document.querySelector("#story-frame").getBoundingClientRect().top)');
console.log('Math.round(document.querySelector("#ai-panel").getBoundingClientRect().height)');
console.log('const f = document.querySelector("#story-frame").getBoundingClientRect(); const a = document.querySelector("#ai-panel").getBoundingClientRect(); Math.round(a.top - f.bottom)');
console.log('getComputedStyle(document.querySelector(".ql-toolbar")).height');