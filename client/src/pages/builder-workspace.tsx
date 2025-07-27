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
import storyXcelLogo from "@assets/StoryXcel_Secondary_Logo_1753647459400.png";

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
    <div className="h-screen bg-slate-800 flex flex-col overflow-hidden">
      {/* Header with Logo and Builder Tabs */}
      <header className="bg-slate-900 border-b border-slate-700">
        <div className="flex items-center h-16">
          {/* Logo Area */}
          <div className="w-64 px-6 bg-purple-700 h-full flex items-center">
            <img 
              src={storyXcelLogo} 
              alt="StoryXcel" 
              className="h-8 w-auto"
            />
          </div>

          {/* Builder Tab Navigation */}
          <div className="flex-1 flex items-center bg-slate-800">
            <nav className="flex">
              {builderTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-6 py-4 text-sm font-medium transition-colors border-r border-slate-600 ${
                    activeTab === tab.id
                      ? "bg-slate-700 text-white border-b-2 border-cyan-400"
                      : "text-slate-400 hover:text-white hover:bg-slate-700"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Navigation Icons */}
        <div className="w-16 bg-slate-900 border-r border-slate-700 flex flex-col items-center py-4 space-y-4">
          {leftSidebarItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="w-10 h-10 p-0 text-slate-400 hover:text-white hover:bg-slate-700"
              onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
            >
              <item.icon className="w-5 h-5" />
            </Button>
          ))}
        </div>

        {/* Left Scroll Column - Asset Overview */}
        <div className={`bg-slate-800 border-r border-slate-700 transition-all duration-300 ${
          leftSidebarOpen ? "w-80" : "w-64"
        }`}>
          <div className="p-4 border-b border-slate-700">
            <h3 className="text-sm font-semibold text-white mb-2">Asset Overview</h3>
            <p className="text-xs text-slate-400">
              {currentBuilder?.name} assets and resources
            </p>
          </div>
          <div className="p-4 space-y-3 overflow-y-auto h-full">
            {/* Asset items would go here - showing placeholder */}
            {[1, 2, 3, 4, 5].map((item) => (
              <Card key={item} className="p-3 bg-slate-700 border-slate-600">
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

        {/* Main Workspace - White Center Panel */}
        <div className="flex-1 bg-white relative">
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

        {/* Right Sidebar - Action Tools */}
        <div className={`bg-slate-900 border-l border-slate-700 transition-all duration-300 ${
          rightSidebarOpen ? "w-16" : "w-0"
        }`}>
          <div className="w-16 flex flex-col items-center py-4 space-y-4">
            {rightSidebarItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="w-10 h-10 p-0 text-slate-400 hover:text-white hover:bg-slate-700"
                title={item.label}
              >
                <item.icon className="w-5 h-5" />
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Panel - AI Chat Assistant */}
      <div className="bg-slate-900 border-t border-slate-700 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-cyan-400" />
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
                  className="w-full bg-slate-800 border-slate-600 text-white placeholder-slate-400 resize-none"
                  rows={1}
                />
                <div className="absolute right-2 bottom-2 flex space-x-1">
                  <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                    📎
                  </Button>
                  <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                    🎤
                  </Button>
                  <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                    ➤
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}