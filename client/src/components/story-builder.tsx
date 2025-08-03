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

export default function StoryBuilder() {
  const [storyContent, setStoryContent] = useState("");

  return (
    <div className="flex-1 overflow-hidden bg-gray-100">
      {/* Story Overview Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <h2 className="text-lg font-semibold text-slate-800">Story Overview</h2>
      </div>

      {/* Story Editor - Full Width */}
      <div className="flex-1 flex flex-col bg-white h-full">
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
              value={storyContent}
              onChange={(e) => setStoryContent(e.target.value)}
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
  );
}