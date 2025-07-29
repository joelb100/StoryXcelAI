import { useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Send, 
  Search,
  UserPlus,
  Menu,
  X,
  FileText,
  Users,
  BookOpen,
  Box,
  Settings,
  Upload,
  Download,
  Info,
  Star,
  MessageSquare,
  Calendar,
  Clock,
  Globe,
  Bookmark
} from "lucide-react";

// Import logo
import storyXcelLogo from "@assets/StoryXcel_Secondary_Logo_1753649730340.png";

// Builder tabs configuration
const builderTabs = [
  { id: "world", name: "World", isActive: false },
  { id: "production", name: "Production", isActive: false },
  { id: "asset", name: "Asset", isActive: false },
  { id: "story", name: "Story", isActive: true },
  { id: "script", name: "Script", isActive: false },
  { id: "deck", name: "Deck", isActive: false },
];

// Friends list data
const friendsList = [
  "Buck Rogers",
  "Peter Parker", 
  "Tony Stark",
  "Sonny Crockett",
  "Robert Wagner",
  "Lando Calrissian",
  "Bob Dylan",
  "Ned Flanders"
];

// Dashboard data
const dashboardData = {
  projects: {
    active: [
      {
        id: 1,
        title: "PROJECT GUN SMOKE",
        description: "Drifting into the dying town of Red Hollow, bounty hunter Eli Graves is hunting the ruthless outlaw Silas Kane. But the town is strangled by corrupt Sheriff Benjamin, who secretly protects Kane's gang in exchange for blood money. When Eli crosses paths with a vengeful widow and a tree bear with a violent past, he realizes justice won't come easy. As tensions rise and bullets fly, the streets fill with gun smoke - where only the fastest draw will decide who walks away alive.",
        type: "story",
        lastModified: "2024-01-20",
      }
    ]
  }
};

// Far Left Icon Sidebar Component - Green from grid (Columns 1-3)
const IconSidebar = () => (
  <div className="h-full border-r border-slate-600 flex flex-col justify-between items-center py-4" style={{ backgroundColor: '#29415d' }}>
    {/* Top navigation icons */}
    <div className="flex flex-col items-center space-y-4">
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
        title="Asset Folder"
      >
        <FileText className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
        title="Character Manager"
      >
        <Users className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
        title="Script Library"
      >
        <BookOpen className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
        title="World Objects"
      >
        <Box className="w-5 h-5" />
      </Button>
    </div>
    
    {/* Bottom action icons */}
    <div className="flex flex-col items-center space-y-2">
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
        title="Import"
      >
        <Upload className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
        title="Export"
      >
        <Download className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
        title="Settings"
      >
        <Settings className="w-5 h-5" />
      </Button>
    </div>
  </div>
);

// Left Content Sidebar Component - Purple from grid (Columns 4-7)
const LeftSidebar = () => (
  <div className="h-full border-r border-slate-600 flex flex-col" style={{ backgroundColor: '#47566b' }}>
    {/* First Gray Frame - Project Name Section - 25% */}
    <div className="p-2 border-b border-slate-600" style={{ height: '25%' }}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-white">Project Name</h3>
        <Button variant="ghost" size="sm" className="text-white p-1">
          <Menu className="w-3 h-3" />
        </Button>
      </div>
      
      <div className="bg-slate-600 rounded-lg p-2 h-4/5 overflow-y-auto">
        <h4 className="text-xs font-semibold text-white mb-1">Project Name</h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-1 text-xs">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0"></div>
            <span className="text-cyan-400 truncate">Gun Smoke</span>
            <span className="text-slate-300 text-xs">— In progress</span>
          </div>
          <div className="text-xs text-slate-400 truncate">Project description</div>
          
          <div className="flex items-center space-x-1 text-xs">
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full flex-shrink-0"></div>
            <span className="text-yellow-400 truncate">Gun Smoke</span>
            <span className="text-slate-300 text-xs">— Planning</span>
          </div>
          <div className="text-xs text-slate-400 truncate">Project description</div>
          
          <div className="flex items-center space-x-1 text-xs">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0"></div>
            <span className="text-green-400 truncate">Gun Smoke</span>
            <span className="text-slate-300 text-xs">— Completed</span>
          </div>
          <div className="text-xs text-slate-400 truncate">Project description</div>
        </div>
      </div>
    </div>

    {/* Second Gray Frame - Store Section - 20% */}
    <div className="p-2 border-b border-slate-600" style={{ height: '20%' }}>
      <div className="bg-slate-600 rounded-lg p-2 h-full flex items-center">
        <h4 className="text-xs font-semibold text-white">Store</h4>
      </div>
    </div>

    {/* Third Gray Frame - Featured Modules Section - 20% */}
    <div className="p-2 border-b border-slate-600" style={{ height: '20%' }}>
      <div className="bg-slate-600 rounded-lg p-2 h-full flex items-center">
        <h4 className="text-xs font-semibold text-white">Featured Modules</h4>
      </div>
    </div>

    {/* Fourth Gray Frame - Site News Section - 35% */}
    <div className="p-2 flex-1" style={{ height: '35%' }}>
      <div className="bg-slate-600 rounded-lg p-2 h-full overflow-y-auto">
        <h4 className="text-xs font-semibold text-white mb-2">Site News</h4>
        <div className="text-xs text-slate-300 leading-relaxed space-y-1">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
        </div>
      </div>
    </div>
  </div>
);

// Right Icon Sidebar Component - Blue from grid (Columns 27-28)
const RightIconSidebar = () => (
  <div className="h-full border-l border-slate-600 flex flex-col justify-between items-center py-4" style={{ backgroundColor: '#29415d' }}>
    {/* Top navigation icons */}
    <div className="flex flex-col items-center space-y-4">
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
        title="Favorites"
      >
        <Star className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
        title="Messages"
      >
        <MessageSquare className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
        title="Calendar"
      >
        <Calendar className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
        title="Recent"
      >
        <Clock className="w-5 h-5" />
      </Button>
    </div>
    
    {/* Bottom action icons */}
    <div className="flex flex-col items-center space-y-2">
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
        title="Web Links"
      >
        <Globe className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
        title="Bookmarks"
      >
        <Bookmark className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
        title="More Options"
      >
        <Menu className="w-5 h-5" />
      </Button>
    </div>
  </div>
);

// Right Content Sidebar Component - Yellow from grid (Columns 24-26)
const RightSidebar = () => (
  <div className="h-full border-l border-slate-500 flex flex-col" style={{ backgroundColor: '#47566b' }}>
    {/* Friends List */}
    <div className="p-4 flex-1">
      <h3 className="text-sm font-semibold text-white mb-4">Friends List</h3>
      <div className="space-y-2">
        {friendsList.map((friendName, index) => (
          <div key={index} className="flex items-center space-x-3 p-2 rounded hover:bg-slate-500 cursor-pointer">
            <div className="relative">
              <div className="w-8 h-8 bg-slate-400 rounded-full flex items-center justify-center text-sm">
                {friendName.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-600 bg-blue-400"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{friendName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Site Links */}
    <div className="border-t border-slate-500 p-4">
      <h3 className="text-sm font-semibold text-white mb-4">Site Links</h3>
      <div className="grid grid-cols-4 gap-2">
        {Array.from({length: 16}, (_, i) => (
          <button
            key={i}
            className="w-10 h-10 bg-slate-500 rounded-full hover:bg-slate-400 transition-colors"
          >
          </button>
        ))}
      </div>
    </div>
  </div>
);

// Main Dashboard Content
interface DashboardContentProps {
  chatMessages: any[];
  chatMessage: string;
  setChatMessage: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  currentProjectSlide: number;
  setCurrentProjectSlide: (value: number | ((prev: number) => number)) => void;
  navigate: (to: string) => void;
}

const DashboardContent = ({ 
  chatMessages, 
  chatMessage, 
  setChatMessage, 
  handleSendMessage, 
  handleKeyPress,
  currentProjectSlide,
  setCurrentProjectSlide,
  navigate 
}: DashboardContentProps) => (
  <div className="bg-gray-100 flex flex-col h-full">
    {/* Dashboard Header */}
    <div className="bg-white border-b border-gray-200 px-4 pb-4">
      <h2 className="text-lg font-semibold text-slate-800">Dashboard</h2>
    </div>

    {/* Constrained Content Container - 15.25 inches max width */}
    <div className="flex-1 flex justify-center overflow-hidden">
      <div className="w-full max-w-[15.25in] p-4 flex flex-col h-full">
        {/* Main Dashboard Section - Red Box takes up upper portion */}
        <div className="flex justify-center items-center" style={{ height: '60%' }}>
          <Card className="bg-red-600 rounded-lg border-0 w-full max-w-[14.5in] h-full">
            {/* Main dashboard content area */}
          </Card>
        </div>

        {/* Bottom section - scales to remaining 40% of screen */}
        <div className="flex-1 flex flex-col justify-start pt-4">
          {/* Project Name Section */}
          <div className="flex justify-center mb-4">
            <div className="w-full max-w-[14.5in]">
              {/* Project Name label */}
              <div className="mb-2">
                <h3 className="text-sm font-medium text-slate-700">Project Name</h3>
              </div>
              
              {/* Three equal pink bars with 0.25 inch spacing - scale horizontally only */}
              <div className="flex gap-[0.25in]" style={{ height: '25%', minHeight: '80px' }}>
                {/* First project card */}
                <Card className="bg-pink-500 rounded-lg border-0 h-full flex-1"></Card>
                
                {/* Second project card */}
                <Card className="bg-pink-400 rounded-lg border-0 h-full flex-1"></Card>
                
                {/* Third project card */}
                <Card className="bg-pink-300 rounded-lg border-0 h-full flex-1"></Card>
              </div>
            </div>
          </div>

          {/* AI Chat Window - takes remaining space */}
          <div className="flex justify-center flex-1">
            <Card className="bg-pink-300 rounded-lg p-4 border-0 w-full max-w-[14.5in] h-full flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-slate-700">AI Story Assistant</h3>
                <Button variant="ghost" size="sm" className="text-slate-600 p-1">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Chat Messages Area */}
              <div className="flex-1 bg-white rounded-lg p-3 mb-3 overflow-y-auto">
                <div className="space-y-3">
                  {chatMessages.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-2 rounded-lg text-sm ${
                        message.type === 'user' 
                          ? 'bg-blue-500 text-white rounded-br-none' 
                          : 'bg-gray-100 text-slate-700 rounded-bl-none'
                      }`}>
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Chat Input Area */}
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe your story idea..."
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!chatMessage.trim()}
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
                >
                  Send
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Main Dashboard Layout
export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState("story");
  const [currentProjectSlide, setCurrentProjectSlide] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'ai', content: 'Hello! I\'m your StoryXcel AI assistant. I can help you with character development, backstory creation, and creative writing suggestions for your western project.' }
  ]);
  const [chatMessage, setChatMessage] = useState("");
  const [mobileLeftOpen, setMobileLeftOpen] = useState(false);
  const [mobileRightOpen, setMobileRightOpen] = useState(false);
  const [, navigate] = useLocation();

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    navigate(`/builder/${tabId}`);
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const userMessage = {
        id: chatMessages.length + 1,
        type: 'user',
        content: chatMessage.trim()
      };
      
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
    const input = userInput.toLowerCase();
    
    if (input.includes('character') || input.includes('eli graves')) {
      return "Great question about character development! For character depth, consider exploring their backstory, motivations, flaws, and growth arc. What specific aspect of the character would you like to develop further?";
    } else if (input.includes('plot') || input.includes('story')) {
      return "Story structure is crucial for engaging narratives. Consider the three-act structure: setup, confrontation, and resolution. What's the central conflict in your story?";
    } else if (input.includes('western') || input.includes('cowboy')) {
      return "Western stories often explore themes of frontier justice, moral ambiguity, and civilization vs. wilderness. What western elements are you incorporating into your narrative?";
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

  return (
    <div className="h-screen bg-slate-800 flex flex-col overflow-hidden">
      {/* Top Navigation Header - Spans full 28 columns */}
      <header className="border-b border-slate-700 grid grid-cols-28 h-16" style={{ backgroundColor: '#0d274c' }}>
        {/* Logo Area - Columns 1-5 (matches new sidebar widths) */}
        <div className="col-span-5 px-6 py-4 flex items-center justify-center border-r border-slate-700" style={{ backgroundColor: '#0d274c' }}>
          <button 
            onClick={() => navigate('/dashboard')}
            className="hover:opacity-80 transition-opacity"
          >
            <img 
              src={storyXcelLogo} 
              alt="StoryXcel" 
              className="h-8 w-auto cursor-pointer"
            />
          </button>
        </div>

        {/* Tab Navigation - Columns 6-28 */}
        <div className="col-span-23" style={{ backgroundColor: '#0d274c' }}>
          <div className="w-full h-16" style={{ backgroundColor: '#0d274c' }}>
            <div className="max-w-[15.25in] w-full mx-auto h-full flex items-center px-4">
              <nav className="flex justify-evenly w-full h-full items-center transform -translate-x-36">
                {builderTabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`px-4 py-3 text-base font-medium transition-all duration-300 rounded-none ${
                      tab.isActive
                        ? "text-[#00d8ff] bg-slate-700"
                        : "text-slate-300 hover:text-white hover:bg-slate-700"
                    }`}
                    style={{ 
                      textAlign: 'center'
                    }}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile Menu Buttons */}
        <div className="lg:hidden flex items-center px-4 space-x-2 col-span-28 justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileLeftOpen(!mobileLeftOpen)}
          >
            <Menu className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileRightOpen(!mobileRightOpen)}
          >
            <UserPlus className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Main Content Area - 28 Column Grid */}
      <div className="flex-1 grid grid-cols-28 overflow-hidden">
        {/* Desktop Layout */}
        <div className="hidden lg:contents">
          {/* Left Icon Sidebar - Column 1 only (very narrow) */}
          <div className="col-span-1">
            <IconSidebar />
          </div>
          
          {/* Left Content Sidebar - Columns 2-5 */}
          <div className="col-span-4">
            <LeftSidebar />
          </div>
          
          {/* Main Dashboard Content - Columns 6-24 */}
          <div className="col-span-19">
            <DashboardContent 
              chatMessages={chatMessages}
              chatMessage={chatMessage}
              setChatMessage={setChatMessage}
              handleSendMessage={handleSendMessage}
              handleKeyPress={handleKeyPress}
              currentProjectSlide={currentProjectSlide}
              setCurrentProjectSlide={setCurrentProjectSlide}
              navigate={navigate}
            />
          </div>
          
          {/* Right Content Sidebar - Columns 25-27 */}
          <div className="col-span-3">
            <RightSidebar />
          </div>
          
          {/* Right Icon Sidebar - Column 28 only (very narrow) */}
          <div className="col-span-1">
            <RightIconSidebar />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden flex-1 flex flex-col">
          <DashboardContent 
            chatMessages={chatMessages}
            chatMessage={chatMessage}
            setChatMessage={setChatMessage}
            handleSendMessage={handleSendMessage}
            handleKeyPress={handleKeyPress}
            currentProjectSlide={currentProjectSlide}
            setCurrentProjectSlide={setCurrentProjectSlide}
            navigate={navigate}
          />
        </div>

        {/* Mobile Left Sidebar Drawer */}
        {mobileLeftOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileLeftOpen(false)} />
            <div className="absolute left-0 top-0 h-full w-80 bg-white flex">
              <div className="flex items-center justify-between p-4 border-b absolute top-0 left-0 right-0 z-10 bg-white">
                <h2 className="text-lg font-semibold">Projects</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileLeftOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="h-full overflow-hidden flex pt-16">
                <IconSidebar />
                <LeftSidebar />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Right Sidebar Drawer */}
        {mobileRightOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileRightOpen(false)} />
            <div className="absolute right-0 top-0 h-full w-80 bg-white flex">
              <div className="flex items-center justify-between p-4 border-b absolute top-0 left-0 right-0 z-10 bg-white">
                <h2 className="text-lg font-semibold">Friends & Links</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileRightOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="h-full overflow-hidden flex pt-16">
                <RightSidebar />
                <RightIconSidebar />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}