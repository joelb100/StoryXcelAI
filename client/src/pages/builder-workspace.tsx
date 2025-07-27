import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { 
  FileText, 
  Users, 
  BookOpen, 
  Box, 
  Settings,
  Edit,
  Video,
  Palette,
  Clock,
  DollarSign,
  BarChart3,
  Brain,
  Link,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import storyXcelLogo from "@assets/StoryXcel_Secondary_Logo_1753649730340.png";

// Builder tabs configuration
const builderTabs = [
  { id: "world", name: "World Builder", color: "bg-purple-600" },
  { id: "production", name: "Production Builder", color: "bg-blue-600" },
  { id: "asset", name: "Asset Builder", color: "bg-green-600" },
  { id: "story", name: "Story Builder", color: "bg-orange-600" },
  { id: "script", name: "Script Builder", color: "bg-red-600" },
  { id: "deck", name: "Deck Builder", color: "bg-teal-600" },
];

// Left sidebar navigation icons
const leftSidebarItems = [
  { icon: FileText, label: "Asset Folder" },
  { icon: Users, label: "Character Manager" },
  { icon: BookOpen, label: "Script Library" },
  { icon: Box, label: "World Objects" },
  { icon: Settings, label: "Settings" },
];

// Right sidebar action tools
const rightSidebarItems = [
  { icon: Edit, label: "Editor Tools" },
  { icon: Video, label: "Scene Preview" },
  { icon: Palette, label: "Visual Assets" },
  { icon: Clock, label: "Timeline" },
  { icon: DollarSign, label: "Budget Tracking" },
  { icon: BarChart3, label: "Data Dashboard" },
  { icon: Brain, label: "AI Memory" },
  { icon: Link, label: "Link Assets" },
];

export default function BuilderWorkspace() {
  const params = useParams<{ type?: string }>();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState(params.type || "world");
  const [chatMessage, setChatMessage] = useState("");
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    navigate(`/builder/${tabId}`);
  };

  const currentBuilder = builderTabs.find(tab => tab.id === activeTab);

  return (
    <div className="h-screen bg-[#3B4D66] grid grid-rows-[64px_1fr_80px] overflow-hidden">
      {/* Header with Logo and Builder Tabs - Fixed 64px height */}
      <header className="bg-[#2D3A4D] border-b border-[#4A5A70] grid grid-cols-[240px_1fr]">
        {/* Logo Area - Fixed 240px width */}
        <div className="px-6 bg-purple-600 flex items-center">
          <img 
            src={storyXcelLogo} 
            alt="StoryXcel" 
            className="h-8 w-auto"
          />
        </div>

        {/* Builder Tab Navigation */}
        <div className="flex items-center bg-red-600">
          <nav className="flex h-full">
            {builderTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-8 h-full text-sm font-medium transition-colors border-r border-[#4A5A70] ${
                  activeTab === tab.id
                    ? "bg-[#4A5A70] text-white"
                    : "text-slate-300 hover:text-white hover:bg-[#4A5A70]"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content Area - Grid with fixed sidebar widths */}
      <div className="grid grid-cols-[64px_240px_1fr_64px] overflow-hidden">
        {/* Left Sidebar - Navigation Icons - Fixed 64px width */}
        <div className="bg-yellow-500 flex flex-col items-center py-4 space-y-4 border-r border-[#4A5A70]">
          {leftSidebarItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="w-10 h-10 p-0 text-slate-700 hover:text-white hover:bg-[#4A5A70]"
              onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
            >
              <item.icon className="w-5 h-5" />
            </Button>
          ))}
        </div>

        {/* Left Scroll Column - Asset Overview - Fixed 240px width */}
        <div className="bg-orange-500 border-r border-[#4A5A70] overflow-hidden">
          <div className="p-4 border-b border-[#4A5A70]">
            <h3 className="text-sm font-semibold text-white mb-2">Asset Overview</h3>
            <p className="text-xs text-slate-200">
              {currentBuilder?.name} assets and resources
            </p>
          </div>
          <div className="p-4 space-y-3 overflow-y-auto h-full">
            {[1, 2, 3, 4, 5].map((item) => (
              <Card key={item} className="p-3 bg-[#4A5A70] border-[#5A6B82]">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-600 rounded flex items-center justify-center">
                    <FileText className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      Asset {item}
                    </p>
                    <p className="text-xs text-slate-400">
                      {currentBuilder?.name} resource
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Workspace - White Center Panel - Flexible width */}
        <div className="bg-white relative overflow-auto">
          <div className="h-full p-8">
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-2xl">
                <h1 className="text-3xl font-bold text-slate-800 mb-4">
                  {currentBuilder?.name}
                </h1>
                <p className="text-slate-600 mb-8">
                  Welcome to the {currentBuilder?.name}. This workspace will contain all the tools and interfaces specific to this builder type.
                </p>
                <div className="bg-slate-100 rounded-lg p-8">
                  <p className="text-slate-500 text-sm">
                    Builder interface will be customized based on the selected tab above.
                    Each builder will have its own unique toolset and layout.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Action Tools - Fixed 64px width */}
        <div className="bg-green-500 border-l border-[#4A5A70] flex flex-col items-center py-4 space-y-3">
          {rightSidebarItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="w-10 h-10 p-0 text-slate-700 hover:text-white hover:bg-[#4A5A70]"
              title={item.label}
            >
              <item.icon className="w-5 h-5" />
            </Button>
          ))}
        </div>
      </div>

      {/* Bottom Panel - AI Chat Assistant - Fixed 80px height */}
      <div className="bg-blue-600 border-t border-[#4A5A70] p-4 flex items-center">
        <div className="w-full max-w-6xl mx-auto flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-cyan-300" />
            <span className="text-sm font-medium text-white">
              AI Assistant - {currentBuilder?.name} Mode
            </span>
          </div>
          <div className="flex-1">
            <div className="relative">
              <Textarea
                placeholder="Describe the story you want to create..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="w-full bg-[#3B4D66] border-[#4A5A70] text-white placeholder-slate-400 resize-none h-12"
                rows={1}
              />
              <div className="absolute right-2 top-2 flex space-x-1">
                <Button size="sm" variant="ghost" className="w-8 h-8 p-0 text-slate-300">
                  📎
                </Button>
                <Button size="sm" variant="ghost" className="w-8 h-8 p-0 text-slate-300">
                  🎤
                </Button>
                <Button size="sm" variant="ghost" className="w-8 h-8 p-0 text-slate-300">
                  ➤
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}