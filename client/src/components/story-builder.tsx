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
    <div 
      id="story-frame"
      className="w-full h-full overflow-hidden flex flex-col"
      style={{ 
        minWidth: '100%', 
        maxWidth: '100%', 
        minHeight: '100%', 
        maxHeight: '100%' 
      }}
    >
      {/* Story Overview Section - Fixed height, never expandable */}
      {(projectName || genre || subGenre || theme || subTheme || centralConflict) && (
        <div 
          className="flex-shrink-0 p-3 border-b border-gray-200 overflow-hidden"
          style={{ 
            maxHeight: '25%', 
            minHeight: 'auto'
          }}
        >
          <div className="space-y-1 text-xs">
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
                {genreDef && <div className="ml-3 text-xs text-slate-600 truncate">{genreDef}</div>}
              </div>
            )}
            
            {subGenre && (
              <div>
                <span className="font-semibold">Sub Genre</span> — {subGenre}
                {subGenreDef && <div className="ml-3 text-xs text-slate-600 truncate">{subGenreDef}</div>}
              </div>
            )}
            
            {theme && (
              <div>
                <span className="font-semibold">Theme</span> — {theme}
                {themeDef && <div className="ml-3 text-xs text-slate-600 truncate">{themeDef}</div>}
              </div>
            )}
            
            {subTheme && (
              <div>
                <span className="font-semibold">Sub Theme</span> — {subTheme}
                {subThemeDef && <div className="ml-3 text-xs text-slate-600 truncate">{subThemeDef}</div>}
              </div>
            )}
            
            {centralConflict && (
              <div>
                <span className="font-semibold">Central Conflict</span> — {centralConflict}
                {centralConflictDef && <div className="ml-3 text-xs text-slate-600 truncate">{centralConflictDef}</div>}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Story Beats Section - Fixed height with scrolling only */}
      <div 
        className="flex-1 flex flex-col min-h-0 p-3 overflow-hidden"
        style={{ 
          minHeight: 0,
          maxHeight: 'calc(100% - 25%)' 
        }}
      >
        <h3 className="text-lg font-semibold text-slate-800 mb-3 flex-shrink-0">Story Beats</h3>
        
        <div 
          className="flex-1 min-h-0 overflow-auto"
          style={{ 
            minHeight: 0,
            maxHeight: '100%'
          }}
        >
          <RichEditor
            value={storyHtml}
            onChange={setStoryHtml}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}