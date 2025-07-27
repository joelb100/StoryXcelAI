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
    <div className="h-screen bg-[#4A5B72] grid grid-rows-[64px_1fr_80px] overflow-hidden">
      {/* Header with Logo and Builder Tabs - Fixed 64px height */}
      <header className="bg-[#2E3A4F] border-b border-[#3B4A5F] grid grid-cols-[240px_1fr]">
        {/* Logo Area - Fixed 240px width */}
        <div className="px-6 bg-[#2E3A4F] flex items-center">
          <img 
            src={storyXcelLogo} 
            alt="StoryXcel" 
            className="h-8 w-auto"
          />
        </div>

        {/* Builder Tab Navigation */}
        <div className="flex items-center bg-[#2E3A4F] w-full">
          <nav className="flex h-full w-full">
            {builderTabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 h-full text-sm font-medium transition-all duration-300 ${
                  index < builderTabs.length - 1 ? 'border-r border-[#3B4A5F]' : ''
                } ${
                  activeTab === tab.id
                    ? "text-[#00d8ff] animate-slow-pulse"
                    : "text-slate-300 hover:text-white hover:bg-[#3B4A5F]"
                }`}
                style={
                  activeTab === tab.id
                    ? {
                        textShadow: '0 0 5px #00d8ff, 0 0 10px #00d8ff, 0 0 15px #00d8ff'
                      }
                    : {}
                }
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
        <div className="bg-[#4A5B72] flex flex-col justify-between items-center py-4 border-r border-[#3B4A5F]">
          {/* Top navigation icons */}
          <div className="flex flex-col items-center space-y-4">
            {leftSidebarItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-[#3B4A5F]"
                onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
              >
                <item.icon className="w-5 h-5" />
              </Button>
            ))}
          </div>
          
          {/* Logout button at bottom */}
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 text-slate-300 hover:text-red-400 hover:bg-[#3B4A5F]"
            onClick={() => navigate("/login")}
            title="Logout"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </Button>
        </div>

        {/* Left Scroll Column - Asset Overview - Fixed 240px width */}
        <div className="bg-[#4A5B72] border-r border-[#3B4A5F] overflow-hidden">
          <div className="p-4 border-b border-[#3B4A5F]">
            <h3 className="text-sm font-semibold text-white mb-2">Asset Overview</h3>
            <p className="text-xs text-slate-300">
              {currentBuilder?.name} assets and resources
            </p>
          </div>
          <div className="p-4 space-y-3 overflow-y-auto h-full">
            {[1, 2, 3, 4, 5].map((item) => (
              <Card key={item} className="p-3 bg-[#3B4A5F] border-[#56677D]">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#56677D] rounded flex items-center justify-center">
                    <FileText className="w-4 h-4 text-slate-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      Asset {item}
                    </p>
                    <p className="text-xs text-slate-300">
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
        <div className="bg-[#4A5B72] border-l border-[#3B4A5F] flex flex-col items-center py-4 space-y-3">
          {rightSidebarItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-[#3B4A5F]"
              title={item.label}
            >
              <item.icon className="w-5 h-5" />
            </Button>
          ))}
        </div>
      </div>

      {/* Bottom Panel - AI Chat Assistant - Fixed 80px height */}
      <div className="bg-[#2E3A4F] border-t border-[#3B4A5F] p-4 flex items-center">
        <div className="w-full max-w-6xl mx-auto flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-slate-300" />
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
                className="w-full bg-[#4A5B72] border-[#56677D] text-white placeholder-slate-400 resize-none h-12"
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