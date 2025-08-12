import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface StoryBuilderProps {}

export default function StoryBuilder({}: StoryBuilderProps) {
  const [storyData, setStoryData] = useState({
    projectName: "",
    genre: "",
    subGenre: "",
    theme: "",
    subTheme: "",
    centralConflict: "",
    plotA: "",
    subplotB: "",
    subplotC: "",
    plotTwists: "",
    emotionalHook: "",
    storyContent: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setStoryData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="flex-1 flex justify-center overflow-hidden">
      <div className="w-full max-w-[15.25in] p-4 flex flex-col h-full">
        {/* Main Story Builder Section - 60% like Dashboard main section */}
        <div className="flex justify-center items-center" style={{ height: '60%' }}>
          <div className="w-full max-w-[14.5in] h-full flex gap-4">
            {/* Left Side - Story Input Fields (Green box reference) */}
            <div className="w-1/2 flex flex-col">
              <Card className="flex-1 p-4 overflow-y-auto" style={{ backgroundColor: '#758595' }}>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Story Elements</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="projectName" className="text-sm font-medium text-white">Project Name</Label>
                      <Input
                        id="projectName"
                        value={storyData.projectName}
                        onChange={(e) => handleInputChange('projectName', e.target.value)}
                        className="mt-1 bg-white"
                        placeholder="Enter your project name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="genre" className="text-sm font-medium text-white">Genre</Label>
                      <Input
                        id="genre"
                        value={storyData.genre}
                        onChange={(e) => handleInputChange('genre', e.target.value)}
                        className="mt-1 bg-white"
                        placeholder="e.g., Western, Sci-Fi, Romance"
                      />
                    </div>

                    <div>
                      <Label htmlFor="subGenre" className="text-sm font-medium text-white">Sub-Genre</Label>
                      <Input
                        id="subGenre"
                        value={storyData.subGenre}
                        onChange={(e) => handleInputChange('subGenre', e.target.value)}
                        className="mt-1 bg-white"
                        placeholder="e.g., Revenge Western, Space Opera"
                      />
                    </div>

                    <div>
                      <Label htmlFor="theme" className="text-sm font-medium text-white">Theme</Label>
                      <Input
                        id="theme"
                        value={storyData.theme}
                        onChange={(e) => handleInputChange('theme', e.target.value)}
                        className="mt-1 bg-white"
                        placeholder="Main theme of your story"
                      />
                    </div>

                    <div>
                      <Label htmlFor="subTheme" className="text-sm font-medium text-white">Sub Theme</Label>
                      <Input
                        id="subTheme"
                        value={storyData.subTheme}
                        onChange={(e) => handleInputChange('subTheme', e.target.value)}
                        className="mt-1 bg-white"
                        placeholder="Secondary theme"
                      />
                    </div>

                    <div>
                      <Label htmlFor="centralConflict" className="text-sm font-medium text-white">Central Conflict</Label>
                      <Textarea
                        id="centralConflict"
                        value={storyData.centralConflict}
                        onChange={(e) => handleInputChange('centralConflict', e.target.value)}
                        className="mt-1 bg-white"
                        placeholder="Describe the main conflict driving your story"
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label htmlFor="plotA" className="text-sm font-medium text-white">Plot A</Label>
                      <Textarea
                        id="plotA"
                        value={storyData.plotA}
                        onChange={(e) => handleInputChange('plotA', e.target.value)}
                        className="mt-1 bg-white"
                        placeholder="Main plot line"
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label htmlFor="subplotB" className="text-sm font-medium text-white">Subplot B</Label>
                      <Textarea
                        id="subplotB"
                        value={storyData.subplotB}
                        onChange={(e) => handleInputChange('subplotB', e.target.value)}
                        className="mt-1 bg-white"
                        placeholder="First subplot"
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label htmlFor="subplotC" className="text-sm font-medium text-white">Subplot C</Label>
                      <Textarea
                        id="subplotC"
                        value={storyData.subplotC}
                        onChange={(e) => handleInputChange('subplotC', e.target.value)}
                        className="mt-1 bg-white"
                        placeholder="Second subplot"
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label htmlFor="plotTwists" className="text-sm font-medium text-white">Plot Twists</Label>
                      <Textarea
                        id="plotTwists"
                        value={storyData.plotTwists}
                        onChange={(e) => handleInputChange('plotTwists', e.target.value)}
                        className="mt-1 bg-white"
                        placeholder="Key plot twists and revelations"
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label htmlFor="emotionalHook" className="text-sm font-medium text-white">Emotional Hook</Label>
                      <Textarea
                        id="emotionalHook"
                        value={storyData.emotionalHook}
                        onChange={(e) => handleInputChange('emotionalHook', e.target.value)}
                        className="mt-1 bg-white"
                        placeholder="What emotional connection draws readers in?"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Side - Story Content Editor (Red box reference) */}
            <div className="w-1/2 flex flex-col">
              <Card className="flex-1 p-4 flex flex-col" style={{ backgroundColor: '#3f4c5f' }}>
                <h3 className="text-lg font-semibold text-white mb-4">Story Content</h3>
                <Textarea
                  value={storyData.storyContent}
                  onChange={(e) => handleInputChange('storyContent', e.target.value)}
                  className="flex-1 bg-white resize-none"
                  placeholder="Write your story here... Use this space to develop your narrative, scenes, dialogue, and character development."
                />
              </Card>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}