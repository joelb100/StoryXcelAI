import { useEffect } from "react";
import RichEditor from "@/components/editor/RichEditor";

interface StoryBuilderProps {
  projectName?: string;
  projectType?: string;
  lengthPages?: number;
  lengthMinutes?: number;
  genre?: string;
  genreDef?: string;
  subGenre?: string;
  subGenreDef?: string;
  theme?: string;
  themeDef?: string;
  subTheme?: string;
  subThemeDef?: string;
  centralConflict?: string;
  centralConflictDef?: string;
  storyHtml: string;
  setStoryHtml: (html: string) => void;
}

export default function StoryBuilder({
  projectName = "",
  projectType = "",
  lengthPages,
  lengthMinutes,
  genre = "",
  genreDef = "",
  subGenre = "",
  subGenreDef = "",
  theme = "",
  themeDef = "",
  subTheme = "",
  subThemeDef = "",
  centralConflict = "",
  centralConflictDef = "",
  storyHtml,
  setStoryHtml,
}: StoryBuilderProps) {
  const projectTypeDisplay = (() => {
    if (!projectType) return "Screenplay / 90 pages / 90 mins";
    const parts = [projectType];
    if (typeof lengthPages === "number") parts.push(`${lengthPages} pages`);
    if (typeof lengthMinutes === "number") parts.push(`${lengthMinutes} mins`);
    return parts.join(" / ");
  })();

  // Ensure the editor never pushes layout: the outer wrapper is a fixed-height grid
  return (
    <div
      id="story-frame"
      className="
        grid grid-rows-[auto_1fr]
        h-[calc(100vh-220px)]    /* fits your top nav + margins; adjust 220 if needed */
        w-full
        overflow-hidden
      "
    >
      {/* Story Overview — auto height; no truncation; full text visible */}
      <div className="px-4 pt-3 pb-2 border-b border-slate-200 overflow-visible">
        <div className="space-y-2 text-[13px] leading-snug text-slate-800">
          {projectName && (
            <div>
              <span className="font-semibold">Story Title</span> — {projectName}
            </div>
          )}

          <div>
            <span className="font-semibold">Project Type</span> — {projectTypeDisplay}
          </div>

          {genre && (
            <div>
              <span className="font-semibold">Genre</span> — {genre}
              {genreDef && (
                <div className="ml-4 text-slate-600 whitespace-normal">
                  {genreDef}
                </div>
              )}
            </div>
          )}

          {subGenre && (
            <div>
              <span className="font-semibold">Sub Genre</span> — {subGenre}
              {subGenreDef && (
                <div className="ml-4 text-slate-600 whitespace-normal">
                  {subGenreDef}
                </div>
              )}
            </div>
          )}

          {theme && (
            <div>
              <span className="font-semibold">Theme</span> — {theme}
              {themeDef && (
                <div className="ml-4 text-slate-600 whitespace-normal">
                  {themeDef}
                </div>
              )}
            </div>
          )}

          {subTheme && (
            <div>
              <span className="font-semibold">Sub Theme</span> — {subTheme}
              {subThemeDef && (
                <div className="ml-4 text-slate-600 whitespace-normal">
                  {subThemeDef}
                </div>
              )}
            </div>
          )}

          {centralConflict && (
            <div>
              <span className="font-semibold">Central Conflict</span> — {centralConflict}
              {centralConflictDef && (
                <div className="ml-4 text-slate-600 whitespace-normal">
                  {centralConflictDef}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Story Beats editor — fixed row that scrolls internally */}
      <div className="min-h-0 overflow-hidden flex flex-col">
        <div className="px-4 py-2 text-lg font-semibold text-slate-800 flex-shrink-0">
          Story Beats
        </div>

        <div className="flex-1 min-h-0 overflow-auto px-4 pb-3">
          <RichEditor value={storyHtml} onChange={setStoryHtml} className="h-full" />
        </div>
      </div>
    </div>
  );
}