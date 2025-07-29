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
  X
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

// Left Sidebar Component
const LeftSidebar = () => (
  <div className="w-64 bg-slate-700 border-r border-slate-600 flex flex-col h-full">
    {/* Project Name Section */}
    <div className="p-4 border-b border-slate-600">
      <h3 className="text-sm font-semibold text-white mb-4">Project Name</h3>
      <div className="bg-slate-600 rounded-lg h-64 mb-4">
        {/* Large project showcase area */}
      </div>
    </div>

    {/* Store Section */}
    <div className="p-4 border-b border-slate-600">
      <div className="bg-slate-600 rounded-lg p-4 h-20">
        <h4 className="text-xs font-semibold text-white">Store</h4>
      </div>
    </div>

    {/* Featured Modules Section */}
    <div className="p-4 border-b border-slate-600">
      <div className="bg-slate-600 rounded-lg p-4 h-20">
        <h4 className="text-xs font-semibold text-white mb-2">Featured Modules</h4>
      </div>
    </div>

    {/* Site News Section */}
    <div className="p-4 flex-1">
      <div className="bg-slate-600 rounded-lg p-4 h-20">
        <h4 className="text-xs font-semibold text-white">Site News</h4>
      </div>
    </div>
  </div>
);

// Right Sidebar Component
const RightSidebar = () => (
  <div className="w-64 bg-slate-600 border-l border-slate-500 flex flex-col h-full">
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
  <div className="flex-1 bg-gray-100 flex flex-col h-full">
    {/* Dashboard Header */}
    <div className="bg-white border-b border-gray-200 p-4">
      <h2 className="text-lg font-semibold text-slate-800">Dashboard</h2>
    </div>

    <div className="flex-1 p-6 flex flex-col space-y-4">
      {/* Main Project Display */}
      <Card className="relative bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 rounded-lg overflow-hidden h-80 border-0">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full p-8 flex items-center">
          <div className="text-white max-w-lg w-full">
            <h1 className="text-4xl font-black mb-4 tracking-wider">
              {dashboardData.projects.active[currentProjectSlide].title}
            </h1>
            <p className="text-sm leading-relaxed mb-6 opacity-90">
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
        
        {/* Create New Project Button */}
        <Button
          variant="outline"
          className="absolute top-4 right-4 bg-white/20 border-white/30 text-white hover:bg-white/30"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Project
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
      </Card>

      {/* Project Name Section */}
      <div>
        <h3 className="text-sm font-medium text-slate-700 mb-3">Project Name</h3>
        <div className="flex gap-6 h-24">
          <Card className="flex-1 bg-slate-500 rounded-lg border border-slate-400"></Card>
          <Card className="flex-[2] bg-slate-500 rounded-lg border border-slate-400"></Card>
        </div>
      </div>

      {/* AI Chat Window */}
      <Card className="bg-gray-200 rounded-lg p-4 flex-1 flex flex-col border-0">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-slate-700">AI chat window</h3>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 bg-white rounded-lg p-3 mb-4 overflow-y-auto min-h-0">
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
      </Card>
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
      {/* Top Navigation Header */}
      <header className="bg-slate-800 border-b border-slate-700 flex">
        {/* Logo Area */}
        <div className="w-64 px-6 py-4 bg-slate-800 flex items-center border-r border-slate-700">
          <img 
            src={storyXcelLogo} 
            alt="StoryXcel" 
            className="h-8 w-auto"
          />
        </div>

        {/* Tab Navigation */}
        <div className="flex-1 flex items-center bg-slate-800">
          <nav className="flex h-full w-full">
            {builderTabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 h-full text-sm font-medium transition-all duration-300 ${
                  index < builderTabs.length - 1 ? 'border-r border-slate-700' : ''
                } ${
                  tab.isActive
                    ? "text-[#00d8ff] bg-slate-700"
                    : "text-slate-300 hover:text-white hover:bg-slate-700"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile Menu Buttons */}
        <div className="lg:hidden flex items-center px-4 space-x-2">
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

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Layout */}
        <div className="hidden lg:flex flex-1">
          <LeftSidebar />
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
          <RightSidebar />
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
            <div className="absolute left-0 top-0 h-full w-64 bg-white">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Projects</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileLeftOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="h-full overflow-hidden">
                <LeftSidebar />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Right Sidebar Drawer */}
        {mobileRightOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileRightOpen(false)} />
            <div className="absolute right-0 top-0 h-full w-64 bg-white">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Friends & Links</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileRightOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="h-full overflow-hidden">
                <RightSidebar />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}