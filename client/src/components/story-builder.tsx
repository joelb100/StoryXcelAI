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
// Increased to 320px to ensure all content fits without scrolling.
const OVERVIEW_BAR_HEIGHT = 320;

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
      {/* Story Overview Frame - Plenty of space, readable fonts, all definitions */}
      <div 
        className="border-b-2 border-slate-300 bg-slate-50 px-4 py-4"
        style={{
          height: '320px',
          overflow: 'hidden' // No scrolling needed
        }}
      >
        <div 
          className="h-full"
          style={{ 
            fontSize: '12px',      // Readable font size
            lineHeight: '1.5'      // Comfortable line spacing
          }}
        >
          <div className="space-y-3"> {/* More space between sections */}
            {projectName && (
              <div>
                <div>
                  <span className="font-semibold text-slate-800">Story Title</span>
                  <span className="text-slate-700 ml-2">— {projectName}</span>
                </div>
              </div>
            )}

            <div>
              <div>
                <span className="font-semibold text-slate-800">Project Type</span>
                <span className="text-slate-700 ml-2">— {projectTypeDisplay}</span>
              </div>
            </div>

            {genre && (
              <div>
                <div>
                  <span className="font-semibold text-slate-800">Genre</span>
                  <span className="text-slate-700 ml-2">— {genre}</span>
                </div>
                {genreDef && (
                  <div 
                    className="ml-6 text-slate-600 italic mt-1"
                    style={{ fontSize: '11px', lineHeight: '1.4' }}
                  >
                    {genreDef}
                  </div>
                )}
              </div>
            )}

            {subGenre && (
              <div>
                <div>
                  <span className="font-semibold text-slate-800">Sub Genre</span>
                  <span className="text-slate-700 ml-2">— {subGenre}</span>
                </div>
                {subGenreDef && (
                  <div 
                    className="ml-6 text-slate-600 italic mt-1"
                    style={{ fontSize: '11px', lineHeight: '1.4' }}
                  >
                    {subGenreDef}
                  </div>
                )}
              </div>
            )}

            {theme && (
              <div>
                <div>
                  <span className="font-semibold text-slate-800">Theme</span>
                  <span className="text-slate-700 ml-2">— {theme}</span>
                </div>
                {themeDef && (
                  <div 
                    className="ml-6 text-slate-600 italic mt-1"
                    style={{ fontSize: '11px', lineHeight: '1.4' }}
                  >
                    {themeDef}
                  </div>
                )}
              </div>
            )}

            {subTheme && (
              <div>
                <div>
                  <span className="font-semibold text-slate-800">Sub Theme</span>
                  <span className="text-slate-700 ml-2">— {subTheme}</span>
                </div>
                {subThemeDef && (
                  <div 
                    className="ml-6 text-slate-600 italic mt-1"
                    style={{ fontSize: '11px', lineHeight: '1.4' }}
                  >
                    {subThemeDef}
                  </div>
                )}
              </div>
            )}

            {centralConflict && (
              <div>
                <div>
                  <span className="font-semibold text-slate-800">Central Conflict</span>
                  <span className="text-slate-700 ml-2">— {centralConflict}</span>
                </div>
                {centralConflictDef && (
                  <div 
                    className="ml-6 text-slate-600 italic mt-1"
                    style={{ fontSize: '11px', lineHeight: '1.4' }}
                  >
                    {centralConflictDef}
                  </div>
                )}
              </div>
            )}
          </div>
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