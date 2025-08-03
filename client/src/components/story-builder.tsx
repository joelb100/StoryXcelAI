import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  List, 
  ListOrdered,
  Link,
  Type,
  ChevronDown,
  Plus,
  Eye,
  Save,
  Download
} from "lucide-react";

interface StoryBuilderProps {
  chatMessages: any[];
  chatMessage: string;
  setChatMessage: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}

export default function StoryBuilder({
  chatMessages,
  chatMessage,
  setChatMessage,
  handleSendMessage,
  handleKeyPress
}: StoryBuilderProps) {
  const [storyData, setStoryData] = useState({
    projectName: "",
    projectType: "",
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
    <div className="flex-1 overflow-hidden bg-gray-100">
      {/* Story Overview Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <h2 className="text-lg font-semibold text-slate-800">Story Overview</h2>
      </div>

      {/* Main Content Layout */}
      <div className="flex h-full">
        {/* Left Panel - Story Elements */}
        <div className="w-80 bg-slate-700 border-r border-slate-600 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <div className="w-6 h-6 bg-blue-500 rounded mr-2 flex items-center justify-center">
                <Type className="w-4 h-4 text-white" />
              </div>
              Story Overview
            </h3>
            
            <div className="space-y-4">
              {/* Project Name */}
              <div>
                <label className="text-sm text-gray-300 block mb-1">Project Name</label>
                <Button variant="ghost" className="w-full justify-start text-left text-gray-300 hover:text-white hover:bg-slate-600 p-2 h-auto">
                  <span className="truncate">{storyData.projectName || "Select Project Type"}</span>
                  <ChevronDown className="w-4 h-4 ml-auto" />
                </Button>
              </div>

              {/* Select Project Type */}
              <div>
                <label className="text-sm text-gray-300 block mb-1">Select Project Type</label>
                <Button variant="ghost" className="w-full justify-start text-left text-gray-300 hover:text-white hover:bg-slate-600 p-2 h-auto">
                  <span className="truncate">{storyData.projectType || "Select Project Type"}</span>
                  <ChevronDown className="w-4 h-4 ml-auto" />
                </Button>
              </div>

              {/* Genre */}
              <div>
                <label className="text-sm text-gray-300 block mb-1">Genre</label>
                <Button variant="ghost" className="w-full justify-start text-left text-gray-300 hover:text-white hover:bg-slate-600 p-2 h-auto">
                  <span className="truncate">{storyData.genre || "Select Genre"}</span>
                  <ChevronDown className="w-4 h-4 ml-auto" />
                </Button>
              </div>

              {/* Sub Genre */}
              <div>
                <label className="text-sm text-gray-300 block mb-1">Sub Genre</label>
                <Button variant="ghost" className="w-full justify-start text-left text-gray-300 hover:text-white hover:bg-slate-600 p-2 h-auto">
                  <span className="truncate">{storyData.subGenre || "Select Sub Genre"}</span>
                  <ChevronDown className="w-4 h-4 ml-auto" />
                </Button>
              </div>

              {/* Theme */}
              <div>
                <label className="text-sm text-gray-300 block mb-1">Theme</label>
                <Button variant="ghost" className="w-full justify-start text-left text-gray-300 hover:text-white hover:bg-slate-600 p-2 h-auto">
                  <span className="truncate">{storyData.theme || "Select Theme"}</span>
                  <ChevronDown className="w-4 h-4 ml-auto" />
                </Button>
              </div>

              {/* Sub Theme */}
              <div>
                <label className="text-sm text-gray-300 block mb-1">Sub Theme</label>
                <Button variant="ghost" className="w-full justify-start text-left text-gray-300 hover:text-white hover:bg-slate-600 p-2 h-auto">
                  <span className="truncate">{storyData.subTheme || "Select Sub Theme"}</span>
                  <ChevronDown className="w-4 h-4 ml-auto" />
                </Button>
              </div>

              {/* Central Conflict */}
              <div>
                <label className="text-sm text-gray-300 block mb-1">Central Conflict</label>
                <Button variant="ghost" className="w-full justify-start text-left text-gray-300 hover:text-white hover:bg-slate-600 p-2 h-auto">
                  <span className="truncate">{storyData.centralConflict || "Select Central Conflict"}</span>
                  <ChevronDown className="w-4 h-4 ml-auto" />
                </Button>
              </div>

              {/* Plot A */}
              <div>
                <label className="text-sm text-gray-300 block mb-1">Plot A</label>
                <Button variant="ghost" className="w-full justify-start text-left text-gray-300 hover:text-white hover:bg-slate-600 p-2 h-auto">
                  <span className="truncate">Add Plot A</span>
                  <ChevronDown className="w-4 h-4 ml-auto" />
                </Button>
              </div>

              {/* Sub Plot B */}
              <div>
                <label className="text-sm text-gray-300 block mb-1">Sub Plot B</label>
                <Button variant="ghost" className="w-full justify-start text-left text-gray-300 hover:text-white hover:bg-slate-600 p-2 h-auto">
                  <span className="truncate">Add Sub Plot B</span>
                  <ChevronDown className="w-4 h-4 ml-auto" />
                </Button>
              </div>

              {/* Sub Plot C */}
              <div>
                <label className="text-sm text-gray-300 block mb-1">Sub Plot C</label>
                <Button variant="ghost" className="w-full justify-start text-left text-gray-300 hover:text-white hover:bg-slate-600 p-2 h-auto">
                  <span className="truncate">Add Sub Plot C</span>
                  <ChevronDown className="w-4 h-4 ml-auto" />
                </Button>
              </div>

              {/* Plot Twists */}
              <div>
                <label className="text-sm text-gray-300 block mb-1">Plot Twists</label>
                <Button variant="ghost" className="w-full justify-start text-left text-gray-300 hover:text-white hover:bg-slate-600 p-2 h-auto">
                  <span className="truncate">Add Plot Twist</span>
                  <ChevronDown className="w-4 h-4 ml-auto" />
                </Button>
              </div>

              {/* Emotional Hook */}
              <div>
                <label className="text-sm text-gray-300 block mb-1">Emotional Hook</label>
                <Button variant="ghost" className="w-full justify-start text-left text-gray-300 hover:text-white hover:bg-slate-600 p-2 h-auto">
                  <span className="truncate">Add Emotional Hook</span>
                  <ChevronDown className="w-4 h-4 ml-auto" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Story Editor */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Editor Toolbar */}
          <div className="border-b border-gray-200 px-4 py-2">
            <div className="flex items-center space-x-1">
              {/* Font and Size Controls */}
              <Button variant="ghost" size="sm" className="text-sm">
                100% <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
              <div className="w-px h-6 bg-gray-300 mx-2"></div>
              <Button variant="ghost" size="sm" className="text-sm">
                Normal text <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
              <Button variant="ghost" size="sm" className="text-sm">
                Arial <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
              <Button variant="ghost" size="sm" className="text-sm">
                11 <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
              
              <div className="w-px h-6 bg-gray-300 mx-2"></div>
              
              {/* Formatting Controls */}
              <Button variant="ghost" size="sm">
                <Bold className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Italic className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Underline className="w-4 h-4" />
              </Button>
              
              <div className="w-px h-6 bg-gray-300 mx-2"></div>
              
              {/* Alignment Controls */}
              <Button variant="ghost" size="sm">
                <AlignLeft className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <AlignCenter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <AlignRight className="w-4 h-4" />
              </Button>
              
              <div className="w-px h-6 bg-gray-300 mx-2"></div>
              
              {/* List Controls */}
              <Button variant="ghost" size="sm">
                <List className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <ListOrdered className="w-4 h-4" />
              </Button>
              
              <div className="w-px h-6 bg-gray-300 mx-2"></div>
              
              {/* Additional Controls */}
              <Button variant="ghost" size="sm">
                <Link className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Story Content Editor */}
          <div className="flex-1 p-6">
            <div className="h-full">
              <Textarea
                value={storyData.storyContent}
                onChange={(e) => handleInputChange('storyContent', e.target.value)}
                className="w-full h-full border-0 resize-none text-base leading-relaxed focus:outline-none focus:ring-0 shadow-none"
                placeholder="Describe the Story you want to create..."
              />
            </div>
          </div>

          {/* Bottom Status Bar */}
          <div className="border-t border-gray-200 px-4 py-2 flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span>●</span>
              <span>●</span>
              <span>○</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}