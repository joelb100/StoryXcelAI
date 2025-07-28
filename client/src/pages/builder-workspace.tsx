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
  Play
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

        {/* Left Scroll Column - Projects - Fixed 240px width */}
        <div className="bg-[#4A5B72] border-r border-[#3B4A5F] overflow-hidden">
          <div className="p-4 border-b border-[#3B4A5F]">
            <h3 className="text-sm font-semibold text-white mb-2">
              {(() => {
                switch(activeTab) {
                  case "dashboard": return "Projects";
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
              {activeTab === "dashboard" 
                ? "Your active projects" 
                : `${currentBuilder?.name} assets and resources`
              }
            </p>
          </div>
          <div className="p-4 space-y-3 overflow-y-auto h-full">
            {activeTab === "dashboard" ? (
              // Dashboard Projects List
              [
                "Epic Fantasy Chronicles",
                "Sci-Fi Adventure Series", 
                "Mystery Detective Story",
                "Romance Novel Draft",
                "Documentary Project"
              ].map((projectName, index) => (
                <Card key={index} className="p-3 bg-[#3B4A5F] border-[#56677D] hover:bg-[#4A5B72] cursor-pointer transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#56677D] rounded flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-slate-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {projectName}
                      </p>
                      <p className="text-xs text-slate-300">
                        Active project
                      </p>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              // Other Builders Asset List
              [1, 2, 3, 4, 5].map((item) => (
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
              ))
            )}
          </div>
        </div>

        {/* Main Workspace - White Center Panel - Flexible width */}
        <div className="bg-white relative overflow-hidden">
          {activeTab === "dashboard" ? (
            /* DASHBOARD TEMPLATE */
            <div className="h-full p-6">
              {/* Top Row: Project Carousel + Right Sidebar */}
              <div className="flex flex-col lg:flex-row gap-6 mb-8">
                {/* SECTION 1: Project Carousel - Match Quick Links width */}
                <div className="flex-1 lg:flex-[0_0_68%]">
                {/* Project Carousel */}
                <div className="relative bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 rounded-lg overflow-hidden min-h-[300px] lg:min-h-[400px]">
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="relative h-full p-4 md:p-8 flex items-center">
                    <div className="text-white max-w-lg w-full">
                      <h1 className="text-2xl md:text-4xl font-black mb-4 tracking-wider">
                        {dashboardData.projects.active[currentProjectSlide].title}
                      </h1>
                      <p className="text-xs md:text-sm leading-relaxed mb-6 opacity-90 line-clamp-4 md:line-clamp-6">
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

                {/* SECTION 2: Right Side Panel - Friends + Quick Links - 27% width */}
                <div className="flex-1 lg:flex-[0_0_27%] space-y-6">
                  {/* Friends/Collaborators */}
                  <div className="bg-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-800">Friends List</h3>
                      <Button variant="ghost" size="sm">
                        <UserPlus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    {/* Search bar */}
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search friends..."
                        value={friendsSearch}
                        onChange={(e) => setFriendsSearch(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    
                    {/* Friends list */}
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {dashboardData.social.friends.filter(friend => 
                        friend.name.toLowerCase().includes(friendsSearch.toLowerCase())
                      ).map(friend => (
                        <div key={friend.id} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded cursor-pointer">
                          <div className="relative">
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm">
                              {friend.avatar}
                            </div>
                            <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                              friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                            }`}></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{friend.name}</p>
                            <p className="text-xs text-gray-500">{friend.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full mt-4" size="sm">
                      Add Friends +
                    </Button>
                  </div>

                  {/* Quick Links */}
                  <div className="bg-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {dashboardData.tools.quickLinks.map(link => (
                        <button
                          key={link.id}
                          className="flex flex-col items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-150 transition-colors"
                          onClick={() => window.open(link.url, '_blank')}
                        >
                          <span className="text-2xl mb-1">{link.icon}</span>
                          <span className="text-xs font-medium text-gray-700">{link.name}</span>
                        </button>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Link
                    </Button>
                  </div>
                </div>
              </div>

              {/* Bottom Section: Feature Videos - Left-aligned to match carousel width */}
              <div className="mt-8">
                <div className="bg-gray-200 rounded-lg p-4 w-full lg:w-[68%]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">Feature Video</h3>
                    <Button variant="ghost" size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="overflow-x-auto overflow-y-hidden">
                    <div className="flex space-x-4 pb-2 min-w-max">
                    {dashboardData.media.referenceVideos.map(video => (
                      <div 
                        key={video.id} 
                        className="flex-none w-64 bg-gray-100 rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => window.open(video.url, '_blank')}
                        title={`Watch "${video.title}" on YouTube`}
                      >
                        <div className="relative bg-gray-800 rounded-lg h-32 flex items-center justify-center mb-3 group">
                          <span className="text-2xl">{video.thumbnail}</span>
                          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                            {video.duration}
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                            <Play className="w-6 h-6 text-white/80 group-hover:text-white group-hover:scale-110 transition-all" />
                          </div>
                        </div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 leading-tight">{video.title}</h4>
                        <p className="text-sm text-gray-600 mb-1">{video.creator}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500">{video.views} views</p>
                          <span className="text-sm text-gray-400">
                            {video.scope === 'project' ? '🎯' : '🌐'}
                          </span>
                        </div>
                      </div>
                    ))}
                    </div>
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