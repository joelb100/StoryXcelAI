import { useState, useEffect, useRef, useMemo } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import StoryBuilder from "@/components/story-builder";
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
  Bookmark,
  HelpCircle,
  User,
  LogOut,
  Shield,
  CreditCard,
  Palette,
  Mail,
  Bell
} from "lucide-react";

// Import logo and components
import storyXcelLogo from "@assets/StoryXcel_Secondary_Logo_1753649730340.png";
import AIStoryAssistant from "@/components/ai-story-assistant";

// Builder tabs configuration
const getBuilderTabs = (activeTab: string) => [
  { id: "world", name: "World", isActive: activeTab === "world" },
  { id: "production", name: "Production", isActive: activeTab === "production" },
  { id: "asset", name: "Asset", isActive: activeTab === "asset" },
  { id: "story", name: "Story", isActive: activeTab === "story" },
  { id: "script", name: "Script", isActive: activeTab === "script" },
  { id: "deck", name: "Deck", isActive: activeTab === "deck" },
];

// Central Conflict options
const CENTRAL_CONFLICT_OPTIONS = [
  { value: "man-v-man", label: "[Wo]Man vs. [Wo]Man" },
  { value: "man-v-nature", label: "[Wo]Man vs. Nature" },
  { value: "man-v-environment", label: "[Wo]Man vs. the Environment" },
  { value: "man-v-tech", label: "[Wo]Man vs. Machines / Technology" },
  { value: "man-v-supernatural", label: "[Wo]Man vs. the Supernatural" },
  { value: "man-v-self", label: "[Wo]Man vs. Self" },
  { value: "man-v-god", label: "[Wo]Man vs. God / Religion" },
  { value: "man-v-society", label: "[Wo]Man vs. Society" },
];

const CENTRAL_CONFLICT_DEFS: Record<string, string> = {
  "man-v-man": "A conflict where the main opposition is another person or group with clashing goals, values, or power.",
  "man-v-nature": "The protagonist struggles against natural forces like weather, wilderness, or disease.",
  "man-v-environment": "The setting itself poses the challenge—hostile worlds, harsh landscapes, or broken systems.",
  "man-v-tech": "Conflict arises from machines, AI, or technology that threatens, controls, or outpaces humanity.",
  "man-v-supernatural": "Opposition comes from forces beyond the natural world—spirits, magic, curses, or cosmic entities.",
  "man-v-self": "The protagonist's greatest obstacle is internal—fear, guilt, addiction, identity, or beliefs.",
  "man-v-god": "The character wrestles with fate, divine will, or religious doctrine and its demands.",
  "man-v-society": "The hero confronts unjust norms, institutions, or cultural expectations enforced by the collective."
};

// Friends list data
const friendsList = [
  "Buck Rogers", "Peter Parker", "Tony Stark", "Sonny Crockett",
  "Robert Wagner", "Lando Calrissian", "Bob Dylan", "Ned Flanders"
];

// Left Icon Sidebar Component
const IconSidebar = ({ 
  supportMenuOpen, 
  setSupportMenuOpen, 
  accountMenuOpen, 
  setAccountMenuOpen,
  onSignOut 
}: { 
  supportMenuOpen: boolean;
  setSupportMenuOpen: (open: boolean) => void;
  accountMenuOpen: boolean;
  setAccountMenuOpen: (open: boolean) => void;
  onSignOut: () => void;
}) => (
  <div className="h-full bg-slate-700 border-r border-slate-600 flex flex-col justify-between items-center py-4 w-16">
    {/* Top navigation icons */}
    <div className="flex flex-col items-center space-y-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="w-10 h-10 p-0 text-slate-300 hover:text-white">
              <FileText className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Story Overview</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="w-10 h-10 p-0 text-slate-300 hover:text-white">
              <BookOpen className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Format Overview</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    
    {/* Bottom action icons */}
    <div className="flex flex-col items-center space-y-2 relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="w-10 h-10 p-0 text-slate-300 hover:text-white">
              <Download className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Import Files</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {/* Support Menu */}
      <div className="relative">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`w-10 h-10 p-0 transition-colors ${
                  supportMenuOpen ? 'text-white bg-slate-600' : 'text-slate-300 hover:text-white'
                }`}
                onClick={() => {
                  setSupportMenuOpen(!supportMenuOpen);
                  setAccountMenuOpen(false);
                }}
              >
                <HelpCircle className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Support Options</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {supportMenuOpen && (
          <div className="absolute left-12 bottom-0 bg-slate-700 border border-slate-600 rounded-lg shadow-lg p-2 z-50">
            <div className="flex flex-col space-y-2 min-w-[120px]">
              <Button variant="ghost" size="sm" className="justify-start text-white hover:bg-slate-600 h-8 px-2">
                <Info className="w-4 h-4 mr-2" />
                FAQ
              </Button>
              <Button variant="ghost" size="sm" className="justify-start text-white hover:bg-slate-600 h-8 px-2">
                <Settings className="w-4 h-4 mr-2" />
                Tech Support
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="w-10 h-10 p-0 text-slate-300 hover:text-white" onClick={onSignOut}>
              <LogOut className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Sign Out</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
);

// Left Content Sidebar Component
const LeftSidebar = ({ 
  activeTab, 
  projectName, 
  onProjectNameChange,
  onProjectTypeChange,
  genre,
  onGenreChange,
  centralConflict,
  onCentralConflictChange
}: { 
  activeTab: string;
  projectName?: string;
  onProjectNameChange?: (value: string) => void;
  onProjectTypeChange?: (value: string) => void;
  genre?: string;
  onGenreChange?: (value: string) => void;
  centralConflict?: string;
  onCentralConflictChange?: (value: string) => void;
}) => (
  <div className="h-full bg-slate-600 border-r border-slate-500 flex flex-col w-64">
    {activeTab === 'story' ? (
      <div className="p-4 h-full overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Story Overview</h3>
          <div className="bg-teal-400 text-white text-xs px-2 py-1 rounded">
            STEP 1
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <Label htmlFor="story-projectName" className="text-sm font-medium text-white block mb-1">
              Project Name
            </Label>
            <Input
              id="story-projectName"
              type="text"
              value={projectName ?? ''}
              onChange={(e) => onProjectNameChange?.(e.target.value)}
              placeholder="Enter project name..."
              className="bg-slate-700 border-slate-500 text-white placeholder:text-slate-400"
            />
          </div>

          <div>
            <Label htmlFor="story-projectType" className="text-sm font-medium text-white block mb-1">
              Project Type
            </Label>
            <Select onValueChange={onProjectTypeChange}>
              <SelectTrigger className="bg-slate-700 border-slate-500 text-white">
                <SelectValue placeholder="Select Project Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Novel">Novel</SelectItem>
                <SelectItem value="Script">Script</SelectItem>
                <SelectItem value="Screenplay">Screenplay</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="story-genre" className="text-sm font-medium text-white block mb-1">
              Genre
            </Label>
            <Select value={genre} onValueChange={onGenreChange}>
              <SelectTrigger className="bg-slate-700 border-slate-500 text-white">
                <SelectValue placeholder="Select Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="western">Western</SelectItem>
                <SelectItem value="sci-fi">Science Fiction</SelectItem>
                <SelectItem value="fantasy">Fantasy</SelectItem>
                <SelectItem value="horror">Horror</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="story-centralConflict" className="text-sm font-medium text-white block mb-1">
              Central Conflict
            </Label>
            <Select value={centralConflict} onValueChange={onCentralConflictChange}>
              <SelectTrigger className="bg-slate-700 border-slate-500 text-white">
                <SelectValue placeholder="Select Central Conflict" />
              </SelectTrigger>
              <SelectContent>
                {CENTRAL_CONFLICT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value} title={CENTRAL_CONFLICT_DEFS[opt.value]}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    ) : (
      <div className="p-4">
        <h3 className="text-white font-semibold mb-4">Dashboard Menu</h3>
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start text-white">
            <FileText className="w-4 h-4 mr-2" />
            Projects
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
    )}
  </div>
);

// Right Sidebar Component
const RightSidebar = () => (
  <div className="h-full bg-slate-600 border-l border-slate-500 flex flex-col w-64">
    <div className="p-4 border-b border-slate-500">
      <h3 className="text-white font-semibold mb-4">Friends List</h3>
      <div className="space-y-2">
        {friendsList.slice(0, 4).map((friend, index) => {
          const initials = friend.split(' ').map(n => n[0]).join('');
          return (
            <div key={index} className="flex items-center space-x-2 p-2 rounded hover:bg-slate-500">
              <div className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center text-white text-xs">
                {initials}
              </div>
              <div className="flex-1">
                <div className="text-white text-sm">{friend}</div>
                <div className="text-slate-400 text-xs">Online</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    
    <div className="p-4">
      <h3 className="text-white font-semibold mb-4">Site Links</h3>
      <div className="grid grid-cols-4 gap-2">
        {Array.from({length: 8}, (_, i) => (
          <button
            key={i}
            className="w-8 h-8 bg-slate-500 rounded hover:bg-slate-400 transition-colors"
          />
        ))}
      </div>
    </div>
  </div>
);

// Main Dashboard Content
const DashboardContent = ({ 
  chatMessages, 
  chatMessage, 
  setChatMessage, 
  handleSendMessage, 
  handleKeyPress 
}: {
  chatMessages: any[];
  chatMessage: string;
  setChatMessage: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}) => (
  <div className="bg-gray-100 flex flex-col h-full">
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <h2 className="text-2xl font-semibold text-slate-800">Dashboard</h2>
    </div>
    
    <div className="flex-1 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Main Project Card */}
        <Card className="p-6 bg-slate-700 text-white">
          <h3 className="text-xl font-semibold mb-4">PROJECT GUN SMOKE</h3>
          <p className="text-slate-300 leading-relaxed">
            Drifting into the dying town of Red Hollow, bounty hunter Eli Graves is hunting the 
            ruthless outlaw Silas Kane. But the town is strangled by corrupt Sheriff Benjamin, 
            who secretly protects Kane's gang in exchange for blood money.
          </p>
        </Card>
        
        {/* Project Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({length: 3}, (_, i) => (
            <Card key={i} className="p-4 bg-slate-600 text-white">
              <div className="h-16 flex items-center justify-center">
                Project {i + 1}
              </div>
            </Card>
          ))}
        </div>
        
        {/* AI Assistant */}
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
);

// FIXED AI THAT MATCHES DASHBOARD EXACTLY
const MatchingFixedAI = ({ 
  activeTab,
  chatMessages, 
  chatMessage, 
  setChatMessage, 
  handleSendMessage, 
  handleKeyPress 
}: {
  activeTab: string;
  chatMessages: any[];
  chatMessage: string;
  setChatMessage: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}) => {
  // Only show on Story Builder page
  if (activeTab !== 'story') return null;

  return (
    <div 
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
      style={{
        width: 'min(90vw, 14.5in)',
        maxWidth: '14.5in'
      }}
    >
      {/* Use EXACT same container structure as Dashboard */}
      <div className="flex-1 flex flex-col justify-start pt-4">
        {/* Project Name Section - COPIED from Dashboard */}
        <div className="flex justify-center mb-4">
          <div className="w-full max-w-[14.5in]">
            <div className="mb-2">
              <h3 className="text-sm font-medium text-slate-700">Project Name</h3>
            </div>
            
            {/* Three equal project cards - COPIED from Dashboard */}
            <div className="flex gap-[0.25in]" style={{ height: '25%', minHeight: '80px' }}>
              <Card className="rounded-lg border-0 h-full flex-1" style={{ backgroundColor: '#3f4c5f' }}></Card>
              <Card className="rounded-lg border-0 h-full flex-1" style={{ backgroundColor: '#3f4c5f' }}></Card>
              <Card className="rounded-lg border-0 h-full flex-1" style={{ backgroundColor: '#3f4c5f' }}></Card>
            </div>
          </div>
        </div>

        {/* AI Chat Window - EXACT same component as Dashboard */}
        <AIStoryAssistant 
          chatMessages={chatMessages}
          chatMessage={chatMessage}
          setChatMessage={setChatMessage}
          handleSendMessage={handleSendMessage}
          handleKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

// Main Dashboard Layout
export default function DashboardLayout() {
  const [location, navigate] = useLocation();
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'ai', content: 'Hello! I\'m your StoryXcel AI assistant. I can help you with character development, backstory creation, and creative writing suggestions.' }
  ]);
  const [chatMessage, setChatMessage] = useState("");
  const [supportMenuOpen, setSupportMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectType, setProjectType] = useState('');
  const [genre, setGenre] = useState('');
  const [centralConflict, setCentralConflict] = useState('');
  const [storyHtml, setStoryHtml] = useState('<p>Your story begins here...</p>');

  const getActiveTab = () => {
    if (location === '/dashboard') return 'dashboard';
    const match = location.match(/\/builder\/(.+)/);
    return match ? match[1] : 'dashboard';
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
    
    if (input.includes('character')) {
      return "Great question about character development! Consider exploring their backstory, motivations, flaws, and growth arc.";
    } else if (input.includes('plot') || input.includes('story')) {
      return "Story structure is crucial for engaging narratives. Consider the three-act structure: setup, confrontation, and resolution.";
    } else {
      return "I'm here to help with your creative project! I can assist with character development, plot structure, dialogue, and more.";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSignOut = () => {
    window.location.href = '/api/logout';
  };

  return (
    <TooltipProvider>
      <div className="h-screen bg-slate-800 flex flex-col overflow-hidden">
        {/* Top Navigation Header */}
        <header className="bg-slate-900 border-b border-slate-700 h-16 flex items-center">
          {/* Logo Area */}
          <div className="w-64 px-6 py-4 flex items-center border-r border-slate-700">
            <button 
              onClick={() => navigate('/dashboard')}
              className="hover:opacity-80 transition-opacity"
            >
              <img 
                src={storyXcelLogo} 
                alt="StoryXcel" 
                className="h-8 w-auto"
              />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex-1 flex items-center justify-center">
            <nav className="flex space-x-8">
              {getBuilderTabs(activeTab).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    tab.isActive 
                      ? 'text-cyan-400 border-b-2 border-cyan-400' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Icon Sidebar */}
          <IconSidebar 
            supportMenuOpen={supportMenuOpen}
            setSupportMenuOpen={setSupportMenuOpen}
            accountMenuOpen={accountMenuOpen}
            setAccountMenuOpen={setAccountMenuOpen}
            onSignOut={handleSignOut}
          />
          
          {/* Left Content Sidebar */}
          <LeftSidebar 
            activeTab={activeTab}
            projectName={projectName}
            onProjectNameChange={setProjectName}
            onProjectTypeChange={setProjectType}
            genre={genre}
            onGenreChange={setGenre}
            centralConflict={centralConflict}
            onCentralConflictChange={setCentralConflict}
          />
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {activeTab === 'dashboard' ? (
              <DashboardContent 
                chatMessages={chatMessages}
                chatMessage={chatMessage}
                setChatMessage={setChatMessage}
                handleSendMessage={handleSendMessage}
                handleKeyPress={handleKeyPress}
              />
            ) : activeTab === 'story' ? (
              <div className="bg-gray-100 flex flex-col h-full">
                <div className="bg-white border-b border-gray-200 px-6 py-4">
                  <h2 className="text-2xl font-semibold text-slate-800">Story Builder</h2>
                </div>
                
                <div className="flex-1 p-6">
                  <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden h-full">
                    <StoryBuilder 
                      projectName={projectName}
                      projectType={projectType}
                      genre={genre}
                      centralConflict={centralConflict}
                      centralConflictDef={CENTRAL_CONFLICT_DEFS[centralConflict]}
                      storyHtml={storyHtml}
                      setStoryHtml={setStoryHtml}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-100 flex flex-col h-full">
                <div className="bg-white border-b border-gray-200 px-6 py-4">
                  <h2 className="text-2xl font-semibold text-slate-800">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Builder
                  </h2>
                </div>
                
                <div className="flex-1 p-6">
                  <Card className="h-full bg-slate-700 text-white flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-xl mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Builder</h3>
                      <p className="text-slate-300">Coming soon...</p>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>
          
          {/* Right Sidebar */}
          <RightSidebar />
        </div>

        {/* NEW: FIXED AI ASSISTANT - Only addition */}
        <MatchingFixedAI 
          activeTab={activeTab}
          chatMessages={chatMessages}
          chatMessage={chatMessage}
          setChatMessage={setChatMessage}
          handleSendMessage={handleSendMessage}
          handleKeyPress={handleKeyPress}
        />
      </div>
    </TooltipProvider>
  );
}