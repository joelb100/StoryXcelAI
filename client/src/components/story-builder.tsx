import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import RichEditor from '@/components/editor/RichEditor';

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
  setStoryHtml
}: StoryBuilderProps) {
  const [storyData, setStoryData] = useState({
    plotA: "",
    subplotB: "",
    subplotC: "",
    plotTwists: "",
    emotionalHook: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setStoryData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Build project type display
  const projectTypeDisplay = projectType ? (() => {
    const parts: string[] = [projectType];
    if (typeof lengthPages === 'number') parts.push(`${lengthPages} pages`);
    if (typeof lengthMinutes === 'number') parts.push(`${lengthMinutes} mins`);
    return parts.join(' / ');
  })() : 'Screenplay / 90 pages / 90 mins';

  return (
    <div className="flex-1 flex justify-center overflow-hidden">
      <div className="w-full max-w-[15.25in] p-4 flex flex-col h-full">
        {/* Main Story Builder Section - 60% like Dashboard main section */}
        <div className="flex justify-center items-center" style={{ height: '60%' }}>
          <div className="w-full max-w-[14.5in] mx-auto px-4 flex flex-col gap-6 overflow-visible">
            {/* Story Overview FIRST (correct) - Now displays values like Picture 2 */}
            <Card className="rounded-md border p-4" data-testid="overview-card">
              <div className="space-y-3">
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
                    {genreDef && <div className="ml-4 text-sm text-slate-600">{genreDef}</div>}
                  </div>
                )}
                
                {subGenre && (
                  <div>
                    <span className="font-semibold">Sub Genre</span> — {subGenre}
                    {subGenreDef && <div className="ml-4 text-sm text-slate-600">{subGenreDef}</div>}
                  </div>
                )}
                
                {theme && (
                  <div>
                    <span className="font-semibold">Theme</span> — {theme}
                    {themeDef && <div className="ml-4 text-sm text-slate-600">{themeDef}</div>}
                  </div>
                )}
                
                {subTheme && (
                  <div>
                    <span className="font-semibold">Sub Theme</span> — {subTheme}
                    {subThemeDef && <div className="ml-4 text-sm text-slate-600">{subThemeDef}</div>}
                  </div>
                )}
                
                {centralConflict && (
                  <div>
                    <span className="font-semibold">Central Conflict</span> — {centralConflict}
                    {centralConflictDef && <div className="ml-4 text-sm text-slate-600">{centralConflictDef}</div>}
                  </div>
                )}
              </div>
            </Card>

            {/* Story Beats SECOND (correct) - Rich Text Editor */}
            <Card className="rounded-md border p-4" data-testid="beats-card">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Story Beats</h3>
                
                <div className="h-[400px]">
                  <RichEditor
                    value={storyHtml}
                    onChange={setStoryHtml}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>


      </div>
    </div>
  );
}