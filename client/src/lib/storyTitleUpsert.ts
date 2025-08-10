const TITLE_LABEL = 'Story Title —';

export function upsertStoryTitleInText(current: string, title: string): string {
  const safeCurrent = (current ?? '').replace(/\r\n/g, '\n');
  const lines = safeCurrent.split('\n');
  const firstLine = lines[0] ?? '';

  if (!title?.trim()) {
    // If title is empty, leave the editor content alone
    return safeCurrent;
  }

  if (firstLine.startsWith(TITLE_LABEL)) {
    lines[0] = `${TITLE_LABEL} ${title}`.trimEnd();
  } else {
    lines.unshift(`${TITLE_LABEL} ${title}`);
  }
  return lines.join('\n');
}