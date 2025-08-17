import { useMemo, useEffect, useRef } from "react";
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

  // Quill binding
  storyHtml: string;
  setStoryHtml: (html: string) => void;
}

// Choose a fixed height for the "overview" bar so ALL 7 lines are visible.
// Increased to 200px for better visibility and scrolling comfort.
const OVERVIEW_BAR_HEIGHT = 200;

// Helper: build beats HTML
function buildBeatsHTML(conflict: string) {
  // Customize per-conflict. Example for various conflicts:
  const lines = [
    `<h3><strong>Story Beats</strong></h3>`,
    `<p><strong>Plot A —</strong> Systems pressure force adaptation or extinction.</p>`,
    `<p>• A breaking point demands radical action despite consequences.</p>`,
    `<p>• The environment's "rules" shift mid‑story, invalidating old strategies.</p>`,
    `<p><strong>Sub Plot B —</strong> Relationships strain under environmental stress.</p>`,
    `<p>• Old loyalties conflict with survival needs.</p>`,
    `<p><strong>Sub Plot C —</strong> Infrastructure failures cascade into larger crises.</p>`,
    `<p>• Resource scarcity creates new hierarchies of power.</p>`,
    `<p><strong>Plot Twists —</strong> The environment was shaped by past human choices.</p>`,
    `<p>• Adaptation changes the protagonist in unexpected ways.</p>`,
    `<p><strong>Emotional Hook —</strong> What you built to protect you becomes your prison.</p>`,
    `<p>• Adaptation costs identity.</p>`
  ];
  return lines.join("");
}

export default function StoryBuilder(props: StoryBuilderProps) {
  const {
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
  } = props;

  // Keep a ref to avoid duplicate writes
  const wroteForConflict = useRef<string | null>(null);

  const projectTypeDisplay = useMemo(() => {
    if (!projectType) return "Screenplay / 90 pages / 90 mins";
    const parts: string[] = [projectType];
    if (typeof lengthPages === "number") parts.push(`${lengthPages} pages`);
    if (typeof lengthMinutes === "number") parts.push(`${lengthMinutes} mins`);
    return parts.join(" / ");
  }, [projectType, lengthPages, lengthMinutes]);

  // Auto-fill story beats when Central Conflict changes
  useEffect(() => {
    if (!centralConflict || wroteForConflict.current === centralConflict) return;

    const start = "<!-- STORYXCEL_BEATS_START -->";
    const end = "<!-- STORYXCEL_BEATS_END -->";
    const beats = buildBeatsHTML(centralConflict);
    const block = `${start}${beats}${end}`;

    // Replace existing beats block, or append it once
    let newHtml = storyHtml;
    if (newHtml.includes(start)) {
      const re = new RegExp(`${start}[\\s\\S]*?${end}`, "m");
      newHtml = newHtml.replace(re, block);
    } else {
      newHtml = newHtml + block;
    }
    
    setStoryHtml(newHtml);
    wroteForConflict.current = centralConflict;
  }, [centralConflict, storyHtml, setStoryHtml]);

  return (
    <div
      id="story-frame"
      // Full height of the page area; two rows:
      // [Overview fixed] [Editor takes remaining space]
      className="h-full w-full"
      style={{
        display: "grid",
        gridTemplateRows: `${OVERVIEW_BAR_HEIGHT}px 1fr`,
        gridTemplateColumns: "1fr",
      }}
    >
      {/* Overview (fixed height, scrollable if content overflows) */}
      <div 
        className="border-b border-slate-200 px-4 py-3 overflow-y-auto"
        style={{
          backgroundColor: '#f8f9fa', // Light background to distinguish the section
          maxHeight: '200px'          // Ensure it doesn't exceed the grid row height
        }}
      >
        <div 
          className="text-xs leading-relaxed space-y-2" 
          style={{ 
            lineHeight: '1.3',
            fontSize: '11px'  // Slightly smaller font for better fit
          }}
        >
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
                <div className="ml-3 text-[10px] text-slate-600 leading-tight mt-1">{genreDef}</div>
              )}
            </div>
          )}

          {subGenre && (
            <div>
              <span className="font-semibold">Sub Genre</span> — {subGenre}
              {subGenreDef && (
                <div className="ml-3 text-[10px] text-slate-600 leading-tight mt-1">{subGenreDef}</div>
              )}
            </div>
          )}

          {theme && (
            <div>
              <span className="font-semibold">Theme</span> — {theme}
              {themeDef && (
                <div className="ml-3 text-[10px] text-slate-600 leading-tight mt-1">{themeDef}</div>
              )}
            </div>
          )}

          {subTheme && (
            <div>
              <span className="font-semibold">Sub Theme</span> — {subTheme}
              {subThemeDef && (
                <div className="ml-3 text-[10px] text-slate-600 leading-tight mt-1">{subThemeDef}</div>
              )}
            </div>
          )}

          {centralConflict && (
            <div>
              <span className="font-semibold">Central Conflict</span> — {centralConflict}
              {centralConflictDef && (
                <div className="ml-3 text-[10px] text-slate-600 leading-tight mt-1">{centralConflictDef}</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Editor viewport (fills remaining space exactly; Quill gets 100% height) */}
      <div className="min-h-0 h-full overflow-hidden px-4 pb-3">
        <div className="h-full w-full">
          <RichEditor value={storyHtml} onChange={setStoryHtml} className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}