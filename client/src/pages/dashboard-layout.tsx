import { useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

// Import logo and components
import storyXcelLogo from "@assets/StoryXcel_Secondary_Logo_1753649730340.png";
import StoryBuilder from "@/components/story-builder";
import AIStoryAssistant from "@/components/ai-story-assistant";

// Builder tabs configuration - moved inside component to access activeTab
const getBuilderTabs = (activeTab: string) => [
  { id: "world", name: "World", isActive: activeTab === "world" },
  { id: "production", name: "Production", isActive: activeTab === "production" },
  { id: "asset", name: "Asset", isActive: activeTab === "asset" },
  { id: "story", name: "Story", isActive: activeTab === "story" },
  { id: "script", name: "Script", isActive: activeTab === "script" },
  { id: "deck", name: "Deck", isActive: activeTab === "deck" },
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
const LeftSidebar = ({ activeTab }: { activeTab: string }) => (
  <div className="h-full border-r border-slate-600 flex flex-col" style={{ backgroundColor: '#47566b' }}>
    {activeTab === 'story' ? (
      // Story Overview with structured elements
      <div className="p-4 h-full overflow-y-auto" style={{ backgroundColor: '#47566b' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Story Overview</h3>
          <div className="bg-teal-400 text-white text-xs px-2 py-1 rounded">
            STEP 1
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <Label htmlFor="story-projectName" className="text-sm font-medium text-white block mb-1">Project Name</Label>
            <Select>
              <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                <SelectValue placeholder="Select Project Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="story">Story Project</SelectItem>
                <SelectItem value="script">Script Project</SelectItem>
                <SelectItem value="novel">Novel Project</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="story-genre" className="text-sm font-medium text-white block mb-1">Genre</Label>
            <Select>
              <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                <SelectValue placeholder="Select Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="drama">Drama</SelectItem>
                <SelectItem value="comedy">Comedy</SelectItem>
                <SelectItem value="thriller">Thriller</SelectItem>
                <SelectItem value="romance">Romance</SelectItem>
                <SelectItem value="scifi">Sci-Fi</SelectItem>
                <SelectItem value="fantasy">Fantasy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="story-subGenre" className="text-sm font-medium text-white block mb-1">Sub Genre</Label>
            <Select>
              <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                <SelectValue placeholder="Select Sub Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="psychological">Psychological</SelectItem>
                <SelectItem value="action">Action</SelectItem>
                <SelectItem value="mystery">Mystery</SelectItem>
                <SelectItem value="adventure">Adventure</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="story-theme" className="text-sm font-medium text-white block mb-1">Theme</Label>
            <Select>
              <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                <SelectValue placeholder="Select Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="love">Love</SelectItem>
                <SelectItem value="betrayal">Betrayal</SelectItem>
                <SelectItem value="redemption">Redemption</SelectItem>
                <SelectItem value="justice">Justice</SelectItem>
                <SelectItem value="family">Family</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="story-subTheme" className="text-sm font-medium text-white block mb-1">Sub Theme</Label>
            <Select>
              <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                <SelectValue placeholder="Select Sub Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sacrifice">Sacrifice</SelectItem>
                <SelectItem value="loyalty">Loyalty</SelectItem>
                <SelectItem value="forgiveness">Forgiveness</SelectItem>
                <SelectItem value="courage">Courage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="story-centralConflict" className="text-sm font-medium text-white block mb-1">Central Conflict</Label>
            <Select>
              <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                <SelectValue placeholder="Select Central Conflict" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="internal">Internal Conflict</SelectItem>
                <SelectItem value="external">External Conflict</SelectItem>
                <SelectItem value="society">Man vs Society</SelectItem>
                <SelectItem value="nature">Man vs Nature</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="story-plotA" className="text-sm font-medium text-white block mb-1">Plot A</Label>
            <Button variant="ghost" className="w-full justify-start bg-slate-600 text-white hover:bg-slate-500 border-slate-500">
              Add Plot A
            </Button>
          </div>

          <div>
            <Label htmlFor="story-subplotB" className="text-sm font-medium text-white block mb-1">Sub Plot B</Label>
            <Button variant="ghost" className="w-full justify-start bg-slate-600 text-white hover:bg-slate-500 border-slate-500">
              Add Sub Plot B
            </Button>
          </div>

          <div>
            <Label htmlFor="story-subplotC" className="text-sm font-medium text-white block mb-1">Sub Plot C</Label>
            <Button variant="ghost" className="w-full justify-start bg-slate-600 text-white hover:bg-slate-500 border-slate-500">
              Add Sub Plot C
            </Button>
          </div>

          <div>
            <Label htmlFor="story-plotTwists" className="text-sm font-medium text-white block mb-1">Plot Twists</Label>
            <Button variant="ghost" className="w-full justify-start bg-slate-600 text-white hover:bg-slate-500 border-slate-500">
              Add Plot Twist
            </Button>
          </div>

          <div>
            <Label htmlFor="story-emotionalHook" className="text-sm font-medium text-white block mb-1">Emotional Hook</Label>
            <Button variant="ghost" className="w-full justify-start bg-slate-600 text-white hover:bg-slate-500 border-slate-500">
              Add Emotional Hook
            </Button>
          </div>
        </div>
      </div>
    ) : (
      // Default Dashboard Left Sidebar Content
      <>
        {/* First Gray Frame - Project Name Section - 25% */}
        <div className="p-2 border-b border-slate-600" style={{ height: '25%' }}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-white">Project Name</h3>
            <Button variant="ghost" size="sm" className="text-white p-1">
              <Menu className="w-3 h-3" />
            </Button>
          </div>
          
          <div className="rounded-lg p-2 h-4/5 overflow-y-auto" style={{ backgroundColor: '#758595' }}>
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
          <div className="rounded-lg p-2 h-full flex items-center" style={{ backgroundColor: '#758595' }}>
            <h4 className="text-xs font-semibold text-white">Store</h4>
          </div>
        </div>

        {/* Third Gray Frame - Featured Modules Section - 20% */}
        <div className="p-2 border-b border-slate-600" style={{ height: '20%' }}>
          <div className="rounded-lg p-2 h-full flex items-center" style={{ backgroundColor: '#758595' }}>
            <h4 className="text-xs font-semibold text-white">Featured Modules</h4>
          </div>
        </div>

        {/* Fourth Gray Frame - Site News Section - 35% */}
        <div className="p-2 flex-1" style={{ height: '35%' }}>
          <div className="rounded-lg p-2 h-full overflow-y-auto" style={{ backgroundColor: '#758595' }}>
            <h4 className="text-xs font-semibold text-white mb-2">Site News</h4>
            <div className="text-xs text-slate-300 leading-relaxed space-y-1">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
            </div>
          </div>
        </div>
      </>
    )}
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
    <div className="border-t-2 border-slate-400 p-4" style={{ backgroundColor: '#758595' }}>
      <h3 className="text-sm font-semibold text-white mb-4">Site Links</h3>
      <div className="grid grid-cols-4 gap-2">
        {Array.from({length: 16}, (_, i) => (
          <button
            key={i}
            className="w-10 h-10 rounded-full hover:opacity-80 transition-opacity"
            style={{ backgroundColor: '#47566b' }}
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
          <Card className="rounded-lg border-0 w-full max-w-[14.5in] h-full" style={{ backgroundColor: '#3f4c5f' }}>
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
                <Card className="rounded-lg border-0 h-full flex-1" style={{ backgroundColor: '#3f4c5f' }}></Card>
                
                {/* Second project card */}
                <Card className="rounded-lg border-0 h-full flex-1" style={{ backgroundColor: '#3f4c5f' }}></Card>
                
                {/* Third project card */}
                <Card className="rounded-lg border-0 h-full flex-1" style={{ backgroundColor: '#3f4c5f' }}></Card>
              </div>
            </div>
          </div>

          {/* AI Chat Window - takes remaining space */}
          <AIStoryAssistant 
            chatMessages={chatMessages}
            chatMessage={chatMessage}
            setChatMessage={setChatMessage}
            handleSendMessage={handleSendMessage}
            handleKeyPress={handleKeyPress}
          />
        </div>
      </div>
    </div>
  </div>
);

// Main Dashboard Layout
export default function DashboardLayout() {
  const [location, navigate] = useLocation();
  const [currentProjectSlide, setCurrentProjectSlide] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'ai', content: 'Hello! I\'m your StoryXcel AI assistant. I can help you with character development, backstory creation, and creative writing suggestions for your western project.' }
  ]);
  const [chatMessage, setChatMessage] = useState("");
  const [mobileLeftOpen, setMobileLeftOpen] = useState(false);
  const [mobileRightOpen, setMobileRightOpen] = useState(false);
  
  // Determine active tab from current route
  const getActiveTab = () => {
    if (location === '/dashboard') return 'dashboard';
    const match = location.match(/\/builder\/(.+)/);
    return match ? match[1] : 'story';
  };
  
  const activeTab = getActiveTab();

  const handleTabChange = (tabId: string) => {
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
                {getBuilderTabs(activeTab).map((tab, index) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className="px-4 py-3 text-base font-medium text-white transition-all duration-300 rounded-none"
                    style={{ 
                      textAlign: 'center',
                      textShadow: tab.isActive ? '0 0 5px #00d8ff, 0 0 10px #00d8ff, 0 0 15px #00d8ff' : ''
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textShadow = '0 0 5px #00d8ff, 0 0 10px #00d8ff, 0 0 15px #00d8ff';
                    }}
                    onMouseLeave={(e) => {
                      if (!tab.isActive) {
                        e.currentTarget.style.textShadow = '';
                      }
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
            <LeftSidebar activeTab={activeTab} />
          </div>
          
          {/* Main Content - Columns 6-24 - Conditional rendering based on active tab */}
          <div className="col-span-19">
            {activeTab === 'story' ? (
              <div className="bg-gray-100 flex flex-col h-full">
                {/* Story Builder Header */}
                <div className="bg-white border-b border-gray-200 px-4 pb-4">
                  <h2 className="text-lg font-semibold text-slate-800">Story Builder</h2>
                </div>
                
                {/* Constrained Content Container - EXACT SAME as Dashboard - 15.25 inches max width */}
                <div className="flex-1 flex justify-center overflow-hidden">
                  <div className="w-full max-w-[15.25in] p-4 flex flex-col h-full">
                    {/* Main Story Builder Section - Expanded as AI Assistant reduced by 20.84% */}
                    <div className="flex justify-center items-center" style={{ height: 'calc(60% + 1in + 8.336%)' }}>
                      <div className="w-full max-w-[14.5in] h-full">
                        {/* Story Content Editor - Full width document style */}
                        <div className="h-full bg-white border border-gray-200 shadow-sm flex flex-col">
                          {/* Enhanced Toolbar - Matching reference design */}
                          <div className="border-b border-gray-200 px-4 py-2">
                            <div className="flex items-center space-x-1 text-sm flex-wrap">
                              {/* File operations */}
                              <Button variant="ghost" size="sm" className="h-6 px-2 text-slate-600 hover:bg-gray-100">📄</Button>
                              <Button variant="ghost" size="sm" className="h-6 px-2 text-slate-600 hover:bg-gray-100">💾</Button>
                              <Button variant="ghost" size="sm" className="h-6 px-2 text-slate-600 hover:bg-gray-100">↩️</Button>
                              <Button variant="ghost" size="sm" className="h-6 px-2 text-slate-600 hover:bg-gray-100">↪️</Button>
                              
                              <div className="w-px h-4 bg-gray-300 mx-1"></div>
                              
                              {/* Text formatting */}
                              <Select>
                                <SelectTrigger className="h-6 w-20 text-xs">
                                  <SelectValue placeholder="Normal text" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="normal">Normal text</SelectItem>
                                  <SelectItem value="heading1">Heading 1</SelectItem>
                                  <SelectItem value="heading2">Heading 2</SelectItem>
                                  <SelectItem value="heading3">Heading 3</SelectItem>
                                </SelectContent>
                              </Select>
                              
                              <Select>
                                <SelectTrigger className="h-6 w-16 text-xs">
                                  <SelectValue placeholder="Arial" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="arial">Arial</SelectItem>
                                  <SelectItem value="times">Times</SelectItem>
                                  <SelectItem value="calibri">Calibri</SelectItem>
                                  <SelectItem value="helvetica">Helvetica</SelectItem>
                                </SelectContent>
                              </Select>
                              
                              <Select>
                                <SelectTrigger className="h-6 w-12 text-xs">
                                  <SelectValue placeholder="11" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="8">8</SelectItem>
                                  <SelectItem value="9">9</SelectItem>
                                  <SelectItem value="10">10</SelectItem>
                                  <SelectItem value="11">11</SelectItem>
                                  <SelectItem value="12">12</SelectItem>
                                  <SelectItem value="14">14</SelectItem>
                                  <SelectItem value="16">16</SelectItem>
                                  <SelectItem value="18">18</SelectItem>
                                </SelectContent>
                              </Select>
                              
                              <div className="w-px h-4 bg-gray-300 mx-1"></div>
                              
                              {/* Text styling */}
                              <Button variant="ghost" size="sm" className="h-6 px-2 text-slate-600 hover:bg-gray-100">
                                <span className="font-bold">B</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 px-2 text-slate-600 hover:bg-gray-100">
                                <span className="italic">I</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 px-2 text-slate-600 hover:bg-gray-100">
                                <span className="underline">U</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 px-2 text-slate-600 hover:bg-gray-100">A🎨</Button>
                              <Button variant="ghost" size="sm" className="h-6 px-2 text-slate-600 hover:bg-gray-100">🎨</Button>
                              
                              <div className="w-px h-4 bg-gray-300 mx-1"></div>
                              
                              {/* Alignment, Lists, and Additional tools - condensed */}
                              <Button variant="ghost" size="sm" className="h-6 px-2 text-slate-600 hover:bg-gray-100">≡</Button>
                              <Button variant="ghost" size="sm" className="h-6 px-2 text-slate-600 hover:bg-gray-100">≣</Button>
                              <Button variant="ghost" size="sm" className="h-6 px-2 text-slate-600 hover:bg-gray-100">• •</Button>
                              <Button variant="ghost" size="sm" className="h-6 px-2 text-slate-600 hover:bg-gray-100">1. 2.</Button>
                              <Button variant="ghost" size="sm" className="h-6 px-2 text-slate-600 hover:bg-gray-100">🔗</Button>
                              <Button variant="ghost" size="sm" className="h-6 px-2 text-slate-600 hover:bg-gray-100">📊</Button>
                              <Button variant="ghost" size="sm" className="h-6 px-2 text-slate-600 hover:bg-gray-100">📷</Button>
                            </div>
                          </div>
                          
                          {/* Document Content */}
                          <div className="flex-1 p-8">
                            <Textarea
                              className="w-full h-full resize-none border-none shadow-none text-slate-700 leading-relaxed text-sm focus:outline-none"
                              placeholder="Start writing your story here..."
                              style={{ 
                                fontSize: '14px',
                                lineHeight: '1.6',
                                fontFamily: 'Arial, sans-serif'
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom section - Reduced by 20.84% for AI Assistant */}
                    <div style={{ height: 'calc(40% - 1in - 8.336%)' }} className="flex flex-col justify-start pt-4">
                      {/* AI Chat Window - reduced height by 20.84% */}
                      <AIStoryAssistant 
                        chatMessages={chatMessages}
                        chatMessage={chatMessage}
                        setChatMessage={setChatMessage}
                        handleSendMessage={handleSendMessage}
                        handleKeyPress={handleKeyPress}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
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
            )}
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
          {activeTab === 'story' ? (
            <div className="bg-gray-100 flex flex-col h-full">
              {/* Story Builder Header */}
              <div className="bg-white border-b border-gray-200 px-4 pb-4">
                <h2 className="text-lg font-semibold text-slate-800">Story Builder</h2>
              </div>
              
              {/* Mobile Story Builder Content */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Simple Mobile Toolbar */}
                <div className="bg-white border-b border-gray-200 px-4 py-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-slate-600">
                      <span className="font-bold">B</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-slate-600">
                      <span className="italic">I</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-slate-600">
                      <span className="underline">U</span>
                    </Button>
                  </div>
                </div>
                
                {/* Full Document Writing Area */}
                <div className="flex-1 bg-gray-50 p-4">
                  <div className="h-full bg-white border border-gray-200 shadow-sm flex flex-col">
                    {/* Document Content */}
                    <div className="flex-1 p-4">
                      <Textarea
                        className="w-full h-full resize-none border-none shadow-none text-slate-700 leading-relaxed text-sm focus:outline-none"
                        placeholder="Start writing your story here..."
                        style={{ 
                          fontSize: '14px',
                          lineHeight: '1.6',
                          fontFamily: 'Arial, sans-serif'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* AI Story Assistant - Bottom Section */}
                <div className="h-64 border-t border-gray-200 bg-gray-50 p-4">
                  <AIStoryAssistant 
                    chatMessages={chatMessages}
                    chatMessage={chatMessage}
                    setChatMessage={setChatMessage}
                    handleSendMessage={handleSendMessage}
                    handleKeyPress={handleKeyPress}
                  />
                </div>
              </div>
            </div>
          ) : (
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
          )}
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
                <LeftSidebar activeTab={activeTab} />
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