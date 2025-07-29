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
  MessageCircle,
  User,
  Info,
  Upload,
  Download,
  Plus,
  Search,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  Circle,
  ExternalLink,
  Play,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import storyXcelLogo from "@assets/StoryXcel_Secondary_Logo_1753649730340.png";

// Builder tabs configuration
const builderTabs = [
  { id: "dashboard", name: "Dashboard", color: "bg-gray-600" },
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
  const [activeTab, setActiveTab] = useState(params.type || "dashboard");
  const [chatMessage, setChatMessage] = useState("");
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  
  // Dashboard state
  const [currentProjectSlide, setCurrentProjectSlide] = useState(0);
  const [friendsSearch, setFriendsSearch] = useState("");
  
  // Chat messages state
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your StoryXcel AI assistant. I can help you with character development, plot structure, and creative writing suggestions for your western project."
    },
    {
      id: 2,
      type: 'user',
      content: "Can you help me develop the backstory for Eli Graves?"
    },
    {
      id: 3,
      type: 'ai',
      content: "Absolutely! For Eli Graves' backstory, let's explore his motivation for hunting Kane's gang. Consider these elements:\n\n• Personal loss that drives his vendetta\n• His skills as a bounty hunter\n• The moral complexity of his methods"
    }
  ]);

  // Dynamic content management - structured for future backend integration
  const [dashboardData, setDashboardData] = useState({
    projects: {
      active: [
        {
          id: 1,
          title: "PROJECT GUN SMOKE",
          description: "Drifting into the dying town of Red Hollow, bounty hunter Eli Graves is hunting the ruthless outlaw Silas Kane. But the town is strangled by corrupt Sheriff Benjamin, who secretly protects Kane's gang in exchange for blood money. When Eli crosses paths with a vengeful widow and a tree bear with a violent past, he realizes justice won't come easy. As tensions rise and bullets fly, the streets fill with gun smoke - where only the fastest draw will decide who walks away alive.",
          type: "story",
          lastModified: "2024-01-20",
          collaborators: ["alex", "sarah"]
        },
        {
          id: 2,
          title: "EPIC FANTASY CHRONICLES",
          description: "In the mystical realm of Aethermoor, ancient magic awakens as darkness threatens to consume the land. Follow the journey of unlikely heroes as they discover their true powers and unite against an ancient evil that seeks to reshape the world.",
          type: "world",
          lastModified: "2024-01-19",
          collaborators: ["marcus"]
        },
        {
          id: 3,
          title: "SCI-FI ADVENTURE SERIES",
          description: "Set in the year 2387, humanity has colonized the outer rim of the galaxy. When a mysterious signal from deep space threatens the fragile peace between worlds, a crew of rebels must uncover the truth behind an interstellar conspiracy.",
          type: "script",
          lastModified: "2024-01-18",
          collaborators: ["emma", "david"]
        }
      ]
    },
    social: {
      friends: [
        { id: "alex", name: "Alex Rivera", status: "online", avatar: "👤", projectAccess: ["gun-smoke"] },
        { id: "sarah", name: "Sarah Chen", status: "online", avatar: "👤", projectAccess: ["gun-smoke"] },
        { id: "marcus", name: "Marcus Johnson", status: "offline", avatar: "👤", projectAccess: ["fantasy"] },
        { id: "emma", name: "Emma Wilson", status: "online", avatar: "👤", projectAccess: ["sci-fi"] },
        { id: "david", name: "David Park", status: "offline", avatar: "👤", projectAccess: ["sci-fi"] }
      ]
    },
    tools: {
      quickLinks: [
        { id: 1, name: "Adobe", icon: "🎨", url: "https://adobe.com", scope: "global" },
        { id: 2, name: "Figma", icon: "🎯", url: "https://figma.com", scope: "global" },
        { id: 3, name: "GitHub", icon: "🐙", url: "https://github.com", scope: "global" },
        { id: 4, name: "Notion", icon: "📝", url: "https://notion.so", scope: "global" }
      ]
    },
    media: {
      referenceVideos: [
        { 
          id: 1, 
          title: "How to Draw Western Characters", 
          creator: "Art Pro", 
          views: "1.2M", 
          duration: "23:35", 
          thumbnail: "🎬",
          scope: "project",
          projectId: 1,
          url: "https://youtube.com/watch?v=example1"
        },
        { 
          id: 2, 
          title: "Screenwriting Tips for Action Scenes", 
          creator: "Script Master", 
          views: "856K", 
          duration: "18:42", 
          thumbnail: "🎬",
          scope: "global",
          projectId: null,
          url: "https://youtube.com/watch?v=example2"
        },
        { 
          id: 3, 
          title: "Character Development Masterclass", 
          creator: "Story Guru", 
          views: "2.1M", 
          duration: "31:15", 
          thumbnail: "🎬",
          scope: "global",
          projectId: null,
          url: "https://youtube.com/watch?v=example3"
        },
        { 
          id: 4, 
          title: "Western Film Analysis", 
          creator: "Film Study", 
          views: "654K", 
          duration: "27:08", 
          thumbnail: "🎬",
          scope: "project",
          projectId: 1,
          url: "https://youtube.com/watch?v=example4"
        },
        { 
          id: 5, 
          title: "How to Draw Western Characters", 
          creator: "Art Pro", 
          views: "1.7M", 
          duration: "23:35", 
          thumbnail: "🎬",
          scope: "project",
          projectId: 1,
          url: "https://youtube.com/watch?v=example5"
        },
        { 
          id: 6, 
          title: "Screenwriting Tips for Action Scenes", 
          creator: "Script Master", 
          views: "892K", 
          duration: "18:42", 
          thumbnail: "🎬",
          scope: "global",
          projectId: null,
          url: "https://youtube.com/watch?v=example6"
        },
        { 
          id: 7, 
          title: "Character Development Masterclass", 
          creator: "Story Guru", 
          views: "2.7M", 
          duration: "31:15", 
          thumbnail: "🎬",
          scope: "global",
          projectId: null,
          url: "https://youtube.com/watch?v=example7"
        },
        { 
          id: 8, 
          title: "Western Film Analysis", 
          creator: "Film Study", 
          views: "743K", 
          duration: "27:08", 
          thumbnail: "🎬",
          scope: "project",
          projectId: 1,
          url: "https://youtube.com/watch?v=example8"
        },
        { 
          id: 9, 
          title: "Cinematic Storytelling Techniques", 
          creator: "Cinema Craft", 
          views: "1.4M", 
          duration: "29:42", 
          thumbnail: "🎬",
          scope: "global",
          projectId: null,
          url: "https://youtube.com/watch?v=example9"
        },
        { 
          id: 10, 
          title: "Building Tension in Scripts", 
          creator: "WriteWell", 
          views: "567K", 
          duration: "22:18", 
          thumbnail: "🎬",
          scope: "project",
          projectId: 1,
          url: "https://youtube.com/watch?v=example10"
        },
        { 
          id: 11, 
          title: "Color Theory for Film", 
          creator: "Visual Academy", 
          views: "981K", 
          duration: "35:27", 
          thumbnail: "🎬",
          scope: "global",
          projectId: null,
          url: "https://youtube.com/watch?v=example11"
        },
        { 
          id: 12, 
          title: "Sound Design Fundamentals", 
          creator: "Audio Master", 
          views: "1.1M", 
          duration: "41:33", 
          thumbnail: "🎬",
          scope: "global",
          projectId: null,
          url: "https://youtube.com/watch?v=example12"
        }
      ]
    }
  });

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    navigate(`/builder/${tabId}`);
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Add user message
      const userMessage = {
        id: chatMessages.length + 1,
        type: 'user',
        content: chatMessage.trim()
      };
      
      // Generate AI response (simplified for demo)
      const aiResponse = {
        id: chatMessages.length + 2,
        type: 'ai',
        content: generateAIResponse(chatMessage.trim())
      };
      
      setChatMessages(prev => [...prev, userMessage, aiResponse]);
      setChatMessage("");
    }
  };

  const generateAIResponse = (userInput: string): string => {
    // Simple AI response generator based on keywords
    const input = userInput.toLowerCase();
    
    if (input.includes('character') || input.includes('eli graves')) {
      return "Great question about character development! For character depth, consider exploring their backstory, motivations, flaws, and growth arc. What specific aspect of the character would you like to develop further?";
    } else if (input.includes('plot') || input.includes('story')) {
      return "Story structure is crucial for engaging narratives. Consider the three-act structure: setup, confrontation, and resolution. What's the central conflict in your story?";
    } else if (input.includes('western') || input.includes('cowboy')) {
      return "Western stories often explore themes of frontier justice, moral ambiguity, and civilization vs. wilderness. What western elements are you incorporating into your narrative?";
    } else if (input.includes('scene') || input.includes('dialogue')) {
      return "Effective scenes need clear objectives, conflict, and consequences. For dialogue, focus on subtext and character voice. What scene are you working on?";
    } else {
      return "I'm here to help with your creative project! I can assist with character development, plot structure, dialogue, world building, and more. What specific aspect would you like to explore?";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
          
          {/* Bottom action icons */}
          <div className="flex flex-col items-center space-y-2">
            {/* Import Icon */}
            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-[#3B4A5F]"
              title="Import"
            >
              <Upload className="w-5 h-5" />
            </Button>
            
            {/* Export Icon */}
            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-[#3B4A5F]"
              title="Export"
            >
              <Download className="w-5 h-5" />
            </Button>
            
            {/* Info Icon */}
            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-[#3B4A5F]"
              title="Information"
            >
              <Info className="w-5 h-5" />
            </Button>
            
            {/* Profile Icon */}
            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-[#3B4A5F]"
              title="Profile"
              onClick={() => navigate("/profile")}
            >
              <User className="w-5 h-5" />
            </Button>
            
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
        </div>

        {/* Left Sidebar for Non-Dashboard Views Only */}
        {activeTab !== "dashboard" && (
          <div className="bg-[#4A5B72] border-r border-[#3B4A5F] overflow-hidden w-64">
            <div className="p-4 border-b border-[#3B4A5F]">
              <h3 className="text-sm font-semibold text-white mb-2">
                {(() => {
                  switch(activeTab) {
                    case "world": return "Asset Overview";
                    case "production": return "Production Overview";
                    case "asset": return "Asset Overview";
                    case "story": return "Story Overview";
                    case "script": return "Script Overview";
                    case "deck": return "Deck Overview";
                    default: return "Asset Overview";
                  }
                })()}
              </h3>
              <p className="text-xs text-slate-300">
                {`${currentBuilder?.name} assets and resources`}
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
        )}

        {/* Main Workspace - Proper 3-Column Grid Layout */}
        <div className="bg-white relative overflow-hidden">
          {activeTab === "dashboard" ? (
            /* 3-COLUMN GRID DASHBOARD LAYOUT */
            <div className="grid grid-cols-[256px_1fr_256px] h-full">
              {/* LEFT COLUMN - Projects, Store, Featured Modules, Site News */}
              <div className="bg-[#4A5B72] border-r border-[#3B4A5F] flex flex-col overflow-hidden">
                {/* Projects Section - Top Half */}
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-white mb-2">Project Name</h3>
                    <p className="text-xs text-slate-300">Your active projects</p>
                  </div>
                  <div className="bg-[#3B4A5F] rounded-lg p-4 h-48 mb-4">
                    {/* Large project showcase area */}
                  </div>
                </div>

                {/* Bottom Three Windows - Store, Featured Modules, Site News */}
                <div className="border-t border-[#3B4A5F] space-y-3 p-3">
                  {/* Store Window */}
                  <div className="bg-[#3B4A5F] rounded-lg p-3 border border-[#56677D]">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-white">Store</h4>
                    </div>
                  </div>

                  {/* Featured Modules Window */}
                  <div className="bg-[#3B4A5F] rounded-lg p-3 border border-[#56677D]">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-white">Featured Modules</h4>
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      {['🛒', '🎬', '🔧', '📊', '🎨', '📝', '🗺️', '💾'].map((icon, index) => (
                        <div key={index} className="w-6 h-6 bg-[#4A5B72] rounded flex items-center justify-center cursor-pointer hover:bg-[#56677D] transition-colors">
                          <span className="text-xs">{icon}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Site News Window */}
                  <div className="bg-[#3B4A5F] rounded-lg p-3 border border-[#56677D]">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-white">Site News</h4>
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed">
                      <p className="font-medium text-white mb-1">New updates are available!</p>
                      <p>Recent updates and changes to the platform.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CENTER COLUMN - Project Highlight + Featured Videos + AI Chat */}
              <div className="p-6 flex flex-col h-full">
                {/* Project Highlight Section - Large top section */}
                <div className="mb-4 flex-[0_0_45%]">
                  <div className="relative bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 rounded-lg overflow-hidden h-full">
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="relative h-full p-8 flex items-center">
                      <div className="text-white max-w-lg w-full">
                        <h1 className="text-4xl font-black mb-4 tracking-wider">
                          {dashboardData.projects.active[currentProjectSlide].title}
                        </h1>
                        <p className="text-sm leading-relaxed mb-6 opacity-90 line-clamp-6">
                          {dashboardData.projects.active[currentProjectSlide].description}
                        </p>
                        <Button 
                          className="bg-white text-black hover:bg-gray-100"
                          onClick={() => navigate(`/builder/story`)}
                        >
                          Open Project
                        </Button>
                      </div>
                    </div>
                    
                    {/* Navigation arrows */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                      onClick={() => setCurrentProjectSlide(prev => prev === 0 ? dashboardData.projects.active.length - 1 : prev - 1)}
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                      onClick={() => setCurrentProjectSlide(prev => prev === dashboardData.projects.active.length - 1 ? 0 : prev + 1)}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </Button>
                    
                    {/* Slide indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                      {dashboardData.projects.active.map((_, index) => (
                        <button
                          key={index}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentProjectSlide ? 'bg-white' : 'bg-white/50'
                          }`}
                          onClick={() => setCurrentProjectSlide(index)}
                        />
                      ))}
                    </div>
                    
                    {/* Create New Project Button */}
                    <Button
                      variant="outline"
                      className="absolute top-4 right-4 bg-white/20 border-white/30 text-white hover:bg-white/30"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Project
                    </Button>
                  </div>
                </div>

                {/* Project Name Section - Two side-by-side boxes */}
                <div className="mb-4 flex-[0_0_15%]">
                  <div className="mb-2">
                    <h3 className="text-sm font-medium text-gray-700">Project Name</h3>
                  </div>
                  <div className="flex gap-4 h-full">
                    <div className="flex-1 bg-gray-200 rounded-lg p-4">
                      <div className="bg-gray-300 rounded h-full"></div>
                    </div>
                    <div className="flex-[2] bg-gray-200 rounded-lg p-4">
                      <div className="bg-gray-300 rounded h-full"></div>
                    </div>
                  </div>
                </div>

                {/* AI Chat Window - Bottom section */}
                <div className="flex-1 min-h-0">
                  <div className="mb-2">
                    <h3 className="text-sm font-medium text-gray-700">AI chat window</h3>
                  </div>
                  <div className="bg-gray-200 rounded-lg p-4 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">AI Assistant</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    
                    {/* Chat Messages */}
                    <div className="flex-1 bg-white rounded-lg p-3 mb-4 overflow-y-auto min-h-0" style={{scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 #f1f5f9'}}>
                      <div className="space-y-3">
                        {chatMessages.map((message) => (
                          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : ''}`}>
                            <div className={`rounded-lg p-3 max-w-[85%] ${
                              message.type === 'ai' 
                                ? 'bg-blue-100' 
                                : 'bg-gray-100'
                            }`}>
                              <p className="text-sm text-gray-800 whitespace-pre-line">
                                {message.content}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Chat Input */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ask AI assistant..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} size="sm">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN - Friends List + Site Links */}
              <div className="bg-gray-100 border-l border-gray-300 flex flex-col overflow-hidden">
                {/* Friends List */}
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Friends List</h3>
                  </div>
                  
                  {/* Friends list */}
                  <div className="space-y-2 mb-6">
                    {[
                      "Buck Rogers",
                      "Peter Parker", 
                      "Tony Stark",
                      "Sonny Crockett",
                      "Robert Wagner",
                      "Lando Calrissian",
                      "Bob Dylan",
                      "Ned Flanders"
                    ].map((friendName, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 bg-white rounded hover:bg-gray-50 cursor-pointer">
                        <div className="relative">
                          <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-sm">
                            {friendName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white bg-blue-400"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{friendName}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Site Links */}
                <div className="border-t border-gray-300 p-4">
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Site Links</h3>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({length: 16}, (_, i) => (
                      <button
                        key={i}
                        className="w-10 h-10 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors"
                      >
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
          ) : (
            /* OTHER BUILDERS CONTENT */
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
          )}
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
                onKeyPress={handleKeyPress}
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
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="w-8 h-8 p-0 text-slate-300 hover:text-white" 
                  onClick={handleSendMessage}
                  disabled={!chatMessage.trim()}
                >
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