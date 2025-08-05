import { useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DefinitionTooltip } from "@/components/definition-tooltip";
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
  FileDown,
  Shield,
  CreditCard,
  Palette,
  Mail,
  Undo,
  Redo,
  Printer,
  PaintBucket,
  Minus,
  Bold,
  Italic,
  Underline,
  Type,
  Highlighter,
  Link,
  Image,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Indent,
  Outdent,
  MoreHorizontal,
  Bell
} from "lucide-react";

// Import logo and components
import storyXcelLogo from "@assets/StoryXcel_Secondary_Logo_1753649730340.png";
import StoryBuilder from "@/components/story-builder";
import AIStoryAssistant from "@/components/ai-story-assistant";

// Import tab icons
import worldBuilderIcon from "@assets/worldBuilder_1754280588370.png";
import productionBuilderIcon from "@assets/productionBuilder_1754280596376.png";
import assetBuilderIcon from "@assets/assetBuilder_1754280609014.png";
import storyBuilderIcon from "@assets/storyBuilder_1754280620526.png";
import scriptBuilderIcon from "@assets/scriptBuilder_1754280628421.png";
import deckBuilderIcon from "@assets/deckBuilder1_1754280635988.png";

// Import sidebar icons
import storyOverviewIcon from "@assets/story_1754371104469.png";
import formatOverviewIcon from "@assets/format_1754371161796.png";
import assetOverviewIcon from "@assets/Asset_1754371169859.png";
import pitchIcon from "@assets/pitch_1754371175274.png";

// Import right sidebar icons
import assetTagIcon from "@assets/AssetTag_1754371518555.png";
import storyDetailsIcon from "@assets/storyDetails_1754371523841.png";
import storyMechanicsIcon from "@assets/storyMechanics_1754371530436.png";
import taskIcon from "@assets/task_1754371536085.png";

// Builder tabs configuration - moved inside component to access activeTab
const getBuilderTabs = (activeTab: string) => [
  { id: "world", name: "World", icon: worldBuilderIcon, isActive: activeTab === "world" },
  { id: "production", name: "Production", icon: productionBuilderIcon, isActive: activeTab === "production" },
  { id: "asset", name: "Asset", icon: assetBuilderIcon, isActive: activeTab === "asset" },
  { id: "story", name: "Story", icon: storyBuilderIcon, isActive: activeTab === "story" },
  { id: "script", name: "Script", icon: scriptBuilderIcon, isActive: activeTab === "script" },
  { id: "deck", name: "Deck", icon: deckBuilderIcon, isActive: activeTab === "deck" },
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

// Friends List Component
const FriendsListSidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <div className={`fixed top-0 right-0 h-full bg-green-600 border-l border-slate-600 transition-transform duration-300 ease-in-out z-30 ${
    isOpen ? 'translate-x-0' : 'translate-x-full'
  }`} style={{ width: '280px' }}>
    <div className="p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Friends List</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-slate-300 hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      <div className="space-y-3">
        {friendsList.map((friend, index) => {
          const initials = friend.split(' ').map(n => n[0]).join('');
          return (
            <div key={index} className="flex items-center space-x-3 p-2 rounded hover:bg-slate-600 transition-colors">
              <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center text-white text-sm font-medium">
                {initials}
              </div>
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{friend}</div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-slate-400 text-xs">Online</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

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
  <div className="h-full border-r border-slate-600 flex flex-col justify-between items-center py-4 relative" style={{ backgroundColor: '#29415d' }}>
    {/* Top navigation icons */}
    <div className="flex flex-col items-center space-y-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
          >
            <img 
              src={storyOverviewIcon} 
              alt="Story Overview"
              className="w-5 h-5 object-contain filter brightness-0 invert"
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-slate-700 text-white border-slate-600">
          <p>Story Overview</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
          >
            <img 
              src={formatOverviewIcon} 
              alt="Format Overview"
              className="w-5 h-5 object-contain filter brightness-0 invert"
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-slate-700 text-white border-slate-600">
          <p>Format Overview</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
          >
            <img 
              src={assetOverviewIcon} 
              alt="Asset Overview"
              className="w-5 h-5 object-contain filter brightness-0 invert"
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-slate-700 text-white border-slate-600">
          <p>Asset Overview</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
          >
            <img 
              src={pitchIcon} 
              alt="Pitch"
              className="w-5 h-5 object-contain filter brightness-0 invert"
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-slate-700 text-white border-slate-600">
          <p>Pitch</p>
        </TooltipContent>
      </Tooltip>
    </div>
    
    {/* Bottom action icons - From top to bottom: Import, Export, Support, Accounts, Sign Out */}
    <div className="flex flex-col items-center space-y-2 relative">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
            onClick={() => {
              // TODO: Implement file import functionality
              console.log('Import files');
            }}
          >
            <Download className="w-5 h-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-slate-700 text-white border-slate-600">
          <p>Import Files</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
            onClick={() => {
              // TODO: Implement export functionality
              console.log('Export project');
            }}
          >
            <Upload className="w-5 h-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-slate-700 text-white border-slate-600">
          <p>Export Project</p>
        </TooltipContent>
      </Tooltip>
      
      {/* Support Menu */}
      <div className="relative">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={`w-10 h-10 p-0 transition-colors ${
                supportMenuOpen ? 'text-white bg-slate-700' : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
              onClick={() => {
                setSupportMenuOpen(!supportMenuOpen);
                setAccountMenuOpen(false);
              }}
            >
              <HelpCircle className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-slate-700 text-white border-slate-600">
            <p>Support Options</p>
          </TooltipContent>
        </Tooltip>
        
        {supportMenuOpen && (
          <div className="absolute left-12 bottom-0 bg-slate-700 border border-slate-600 rounded-lg shadow-lg p-2 z-50">
            <div className="flex flex-col space-y-2 min-w-[120px]">
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-white hover:bg-slate-600 h-8 px-2"
                onClick={() => {
                  console.log('FAQ');
                  setSupportMenuOpen(false);
                }}
              >
                <Info className="w-4 h-4 mr-2" />
                FAQ
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-white hover:bg-slate-600 h-8 px-2"
                onClick={() => {
                  console.log('Technical Support');
                  setSupportMenuOpen(false);
                }}
              >
                <Settings className="w-4 h-4 mr-2" />
                Tech Support
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-white hover:bg-slate-600 h-8 px-2"
                onClick={() => {
                  console.log('Live Chat');
                  setSupportMenuOpen(false);
                }}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Live Chat
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-white hover:bg-slate-600 h-8 px-2"
                onClick={() => {
                  console.log('Messaging');
                  setSupportMenuOpen(false);
                }}
              >
                <Mail className="w-4 h-4 mr-2" />
                Messaging
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Account Menu */}
      <div className="relative">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={`w-10 h-10 p-0 transition-colors ${
                accountMenuOpen ? 'text-white bg-slate-700' : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
              onClick={() => {
                setAccountMenuOpen(!accountMenuOpen);
                setSupportMenuOpen(false);
              }}
            >
              <User className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-slate-700 text-white border-slate-600">
            <p>Account Settings</p>
          </TooltipContent>
        </Tooltip>
        
        {accountMenuOpen && (
          <div className="absolute left-12 bottom-0 bg-slate-700 border border-slate-600 rounded-lg shadow-lg p-2 z-50">
            <div className="flex flex-col space-y-2 min-w-[120px]">
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-white hover:bg-slate-600 h-8 px-2"
                onClick={() => {
                  console.log('Settings');
                  setAccountMenuOpen(false);
                }}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-white hover:bg-slate-600 h-8 px-2"
                onClick={() => {
                  console.log('Personalize');
                  setAccountMenuOpen(false);
                }}
              >
                <Palette className="w-4 h-4 mr-2" />
                Personalize
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-white hover:bg-slate-600 h-8 px-2"
                onClick={() => {
                  console.log('Security');
                  setAccountMenuOpen(false);
                }}
              >
                <Shield className="w-4 h-4 mr-2" />
                Security
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-white hover:bg-slate-600 h-8 px-2"
                onClick={() => {
                  console.log('Payment');
                  setAccountMenuOpen(false);
                }}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Payment
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
            onClick={onSignOut}
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-slate-700 text-white border-slate-600">
          <p>Sign Out</p>
        </TooltipContent>
      </Tooltip>
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
            <Input
              id="story-projectName"
              type="text"
              placeholder="Enter project name..."
              className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-400"
            />
          </div>

          <div>
            <Label htmlFor="story-projectType" className="text-sm font-medium text-white block mb-1">Project Type</Label>
            <Select>
              <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                <SelectValue placeholder="Select Project Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="worldbuilding" title="Worldbuilding - The process of creating detailed fictional universes, including their cultures, geography, history, and rules.">Worldbuilding</SelectItem>
                <SelectItem value="novel" title="Novel - A long-form narrative work of fiction that explores characters, plots, and themes through descriptive prose.">Novel</SelectItem>
                <SelectItem value="script" title="Script - A written blueprint for stage plays, TV shows, or other media, focusing on dialogue and scene directions.">Script</SelectItem>
                <SelectItem value="screenplay" title="Screenplay - A formatted script specifically for film or television, detailing visual actions, camera cues, and spoken dialogue.">Screenplay</SelectItem>
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
                <SelectItem value="classic" title="Timeless literary works that have enduring cultural, artistic, or historical significance.">Classic</SelectItem>
                <SelectItem value="crime-drama" title="Stories focused on criminal activities, investigations, and the emotional/psychological conflicts surrounding them.">Crime / Drama</SelectItem>
                <SelectItem value="epic" title="Grand, lengthy narratives involving heroic deeds and large-scale adventures or conflicts.">Epic</SelectItem>
                <SelectItem value="fable" title="Short tales with moral lessons, often featuring anthropomorphic animals or mythical creatures.">Fable</SelectItem>
                <SelectItem value="fairy-tale" title="Magical stories involving enchantments, fantastical beings, and clear distinctions between good and evil.">Fairy Tale</SelectItem>
                <SelectItem value="fantasy" title="Fiction set in imaginative worlds where magic, mythical creatures, and supernatural forces are common.">Fantasy</SelectItem>
                <SelectItem value="folktale" title="Traditional stories passed down orally that reflect cultural values, customs, and beliefs.">Folktale</SelectItem>
                <SelectItem value="gothic-fiction" title="Dark, atmospheric tales blending horror, romance, and mystery, often set in decaying or haunted locations.">Gothic Fiction</SelectItem>
                <SelectItem value="historical-fiction" title="Stories set in a real past era, blending fictional characters with actual historical events and settings.">Historical Fiction</SelectItem>
                <SelectItem value="horror" title="Fiction designed to evoke fear, dread, and shock through terrifying situations and monstrous antagonists.">Horror</SelectItem>
                <SelectItem value="humor" title="Lighthearted, comedic stories intended to entertain through wit, satire, and absurd situations.">Humor</SelectItem>
                <SelectItem value="legend" title="Semi-true stories rooted in historical events but embellished with heroic feats or supernatural elements.">Legend</SelectItem>
                <SelectItem value="magical-realism" title="Fiction where magical elements seamlessly blend into realistic, everyday settings.">Magical Realism</SelectItem>
                <SelectItem value="meta-fiction" title="Self-referential stories that break the fourth wall, acknowledging their own fictional nature.">Meta Fiction</SelectItem>
                <SelectItem value="mystery" title="Plots centered around solving a crime, uncovering secrets, or piecing together enigmatic puzzles.">Mystery</SelectItem>
                <SelectItem value="realistic-fiction" title="Stories that could happen in real life, portraying believable characters, settings, and scenarios.">Realistic Fiction</SelectItem>
                <SelectItem value="romance" title="Narratives focusing on romantic relationships, emotional conflicts, and love as a central theme.">Romance</SelectItem>
                <SelectItem value="satire" title="Fiction that uses humor, irony, and exaggeration to critique social norms, politics, or human behavior.">Satire</SelectItem>
                <SelectItem value="science-fiction" title="Speculative stories exploring futuristic technology, space, time travel, and scientific possibilities.">Science Fiction</SelectItem>
                <SelectItem value="spy-fiction" title="Tales of espionage, secret agents, and covert missions involving political intrigue and deception.">Spy Fiction</SelectItem>
                <SelectItem value="superhero" title="Stories about individuals with extraordinary abilities who combat villains and protect society.">Superhero</SelectItem>
                <SelectItem value="swashbuckler" title="Adventure tales filled with sword fights, daring heroes, and high-action exploits, often in historical settings.">Swashbuckler</SelectItem>
                <SelectItem value="suspense-thriller" title="Fast-paced, tension-filled stories that keep readers on edge through danger and unexpected twists.">Suspense / Thriller</SelectItem>
                <SelectItem value="tall-tale" title="Exaggerated, humorous stories featuring larger-than-life characters and impossible feats.">Tall Tale</SelectItem>
                <SelectItem value="theological" title="Fiction that explores religious themes, spiritual dilemmas, and the nature of faith and divinity.">Theological</SelectItem>
                <SelectItem value="tragicomedy" title="Blends elements of tragedy and comedy, finding humor in sorrowful or serious situations.">Tragicomedy</SelectItem>
                <SelectItem value="travel" title="Stories that center around journeys, exploration, and discovering new places and cultures.">Travel</SelectItem>
                <SelectItem value="western" title="Tales set in the American frontier, often involving cowboys, outlaws, and lawmen in rugged landscapes.">Western</SelectItem>
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
                <SelectItem value="acid" title="Stories that embrace surreal, psychedelic, or mind-bending visuals and narratives, often inspired by counterculture.">Acid</SelectItem>
                <SelectItem value="buddy" title="Focuses on two (or more) characters with contrasting personalities who form a strong bond through shared adventures.">Buddy</SelectItem>
                <SelectItem value="classic" title="Traditional storytelling that follows timeless themes and structures, often paying homage to literary or cinematic classics.">Classic</SelectItem>
                <SelectItem value="comedy" title="Stories designed to entertain and amuse through humor, wit, and exaggerated situations.">Comedy</SelectItem>
                <SelectItem value="contemporary" title="Set in the present day, focusing on modern societal issues, relationships, or environments.">Contemporary</SelectItem>
                <SelectItem value="family" title="Themes of familial bonds, responsibilities, and conflicts are central to the plot.">Family</SelectItem>
                <SelectItem value="feminist" title="Focuses on themes of gender equality, female empowerment, and critiques of patriarchal systems.">Feminist</SelectItem>
                <SelectItem value="gunslinger" title="Revolves around lone, rugged protagonists who live by the gun, often in lawless frontier settings.">Gunslinger</SelectItem>
                <SelectItem value="historical" title="Set in a specific historical era, emphasizing period-accurate settings, characters, and events.">Historical</SelectItem>
                <SelectItem value="horror" title="Stories designed to evoke fear, suspense, or dread, often through supernatural or psychological threats.">Horror</SelectItem>
                <SelectItem value="martial-arts" title="Focuses on combat disciplines, choreographed fight scenes, and themes of honor, skill, and perseverance.">Martial Arts</SelectItem>
                <SelectItem value="musical" title="Integrates songs and dance as a primary method of storytelling and emotional expression.">Musical</SelectItem>
                <SelectItem value="noir" title="Dark, cynical crime dramas featuring morally ambiguous characters, often set in gritty urban environments.">Noir</SelectItem>
                <SelectItem value="psychological" title="Explores the inner workings of characters' minds, delving into mental struggles, paranoia, or psychological manipulation.">Psychological</SelectItem>
                <SelectItem value="railroad" title="Stories centered around trains, railways, or the culture and history surrounding them, often symbolizing journey or progress.">Railroad</SelectItem>
                <SelectItem value="revisionist" title="Reinterprets established genres or historical events by challenging traditional perspectives or myths.">Revisionist</SelectItem>
                <SelectItem value="sci-fi" title="Focused on futuristic technology, space exploration, and scientific advancements, often exploring ethical dilemmas.">Sci Fi</SelectItem>
                <SelectItem value="southern-gothic" title="Combines Gothic elements with the American South's decayed grandeur, eccentric characters, and dark social themes.">Southern Gothic</SelectItem>
                <SelectItem value="spaghetti" title="A sub-genre of Westerns, typically Italian-made, known for stylistic violence, anti-heroes, and morally grey storylines.">Spaghetti</SelectItem>
                <SelectItem value="survival" title="Focuses on characters enduring extreme conditions or situations where their survival is constantly at stake.">Survival</SelectItem>
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
                <SelectItem value="abandonment" title="The emotional struggle or consequences of being left behind or deserted.">Abandonment</SelectItem>
                <SelectItem value="acceptance" title="The journey toward embracing oneself or others despite differences or flaws.">Acceptance</SelectItem>
                <SelectItem value="adultery" title="The betrayal of trust through infidelity in relationships.">Adultery</SelectItem>
                <SelectItem value="adventure" title="The pursuit of thrilling experiences or quests filled with danger and discovery.">Adventure</SelectItem>
                <SelectItem value="alienation" title="The feeling of being isolated or disconnected from society or oneself.">Alienation</SelectItem>
                <SelectItem value="ambition" title="The drive to achieve greatness, often at a personal or ethical cost.">Ambition</SelectItem>
                <SelectItem value="betrayal" title="The breaking of trust or loyalty, leading to conflict or emotional pain.">Betrayal</SelectItem>
                <SelectItem value="coming-of-age" title="The transition from youth to adulthood, marked by personal growth.">Coming of Age</SelectItem>
                <SelectItem value="death" title="The exploration of mortality and its impact on characters.">Death</SelectItem>
                <SelectItem value="discovery" title="The act of uncovering hidden truths about the world or oneself.">Discovery</SelectItem>
                <SelectItem value="escape" title="The desire to break free from confinement, danger, or oppression.">Escape</SelectItem>
                <SelectItem value="forbidden-love" title="A romance that defies social, cultural, or moral boundaries.">Forbidden Love</SelectItem>
                <SelectItem value="forgiveness" title="The journey of letting go of resentment to heal emotional wounds.">Forgiveness</SelectItem>
                <SelectItem value="freedom" title="The struggle to achieve personal, political, or spiritual liberation.">Freedom</SelectItem>
                <SelectItem value="friendship" title="The bonds of loyalty, trust, and support between individuals.">Friendship</SelectItem>
                <SelectItem value="greed" title="The excessive desire for wealth, power, or material gain.">Greed</SelectItem>
                <SelectItem value="justice" title="The pursuit of fairness, moral rightness, or legal retribution.">Justice</SelectItem>
                <SelectItem value="legacy" title="The lasting impact one leaves on future generations or society.">Legacy</SelectItem>
                <SelectItem value="loneliness" title="The emotional void of isolation, either physical or emotional.">Loneliness</SelectItem>
                <SelectItem value="love" title="The profound emotional connection between individuals, romantic or otherwise.">Love</SelectItem>
                <SelectItem value="morality" title="The internal or societal struggle between right and wrong.">Morality</SelectItem>
                <SelectItem value="obsession" title="An overpowering fixation on an idea, person, or goal.">Obsession</SelectItem>
                <SelectItem value="overcoming" title="The triumph over personal flaws, fears, or external obstacles.">Overcoming</SelectItem>
                <SelectItem value="patriot" title="A theme centered on devotion and sacrifice for one's country.">Patriot</SelectItem>
                <SelectItem value="poverty" title="The harsh realities and struggles associated with economic deprivation.">Poverty</SelectItem>
                <SelectItem value="prejudice" title="The exploration of bias, discrimination, and its consequences.">Prejudice</SelectItem>
                <SelectItem value="redemption" title="The quest to atone for past sins or mistakes.">Redemption</SelectItem>
                <SelectItem value="revenge" title="The pursuit of retribution for a personal or moral wrongdoing.">Revenge</SelectItem>
                <SelectItem value="rivalry" title="The competitive conflict between individuals or groups.">Rivalry</SelectItem>
                <SelectItem value="sacrifice" title="The act of giving up something valuable for a greater cause or person.">Sacrifice</SelectItem>
                <SelectItem value="survival" title="The primal struggle to stay alive against overwhelming odds.">Survival</SelectItem>
                <SelectItem value="temptation" title="The internal conflict between desire and moral restraint.">Temptation</SelectItem>
                <SelectItem value="the-right" title="The defense or pursuit of what is morally or legally correct.">The Right</SelectItem>
                <SelectItem value="tradition" title="The importance and challenges of preserving cultural or familial customs.">Tradition</SelectItem>
                <SelectItem value="transformation" title="A profound change in character, perspective, or circumstances.">Transformation</SelectItem>
                <SelectItem value="war" title="The brutal realities, strategies, and consequences of armed conflict.">War</SelectItem>
                <SelectItem value="wealth-found" title="The discovery of fortune and its transformative effects.">Wealth Found</SelectItem>
                <SelectItem value="war-zone" title="The personal and collective experiences of life amidst conflict zones.">War Zone</SelectItem>
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
                <SelectItem value="abduction" title="A character is kidnapped or taken against their will, sparking conflict or rescue.">Abduction</SelectItem>
                <SelectItem value="adventure" title="The protagonist embarks on an exciting journey full of risks and discoveries.">Adventure</SelectItem>
                <SelectItem value="adultery" title="A betrayal of romantic commitment, leading to emotional fallout.">Adultery</SelectItem>
                <SelectItem value="ambition" title="A character's relentless pursuit of power, success, or personal goals.">Ambition</SelectItem>
                <SelectItem value="ascension" title="A rise to power, enlightenment, or higher status.">Ascension</SelectItem>
                <SelectItem value="deliverance" title="Being rescued or freed from a dire situation.">Deliverance</SelectItem>
                <SelectItem value="descension" title="A fall from grace, status, or moral standing.">Descension</SelectItem>
                <SelectItem value="disaster" title="A catastrophic event upends lives and environments.">Disaster</SelectItem>
                <SelectItem value="discovery" title="Unveiling hidden truths, objects, or aspects of oneself.">Discovery</SelectItem>
                <SelectItem value="escape" title="A character's struggle to break free from confinement or danger.">Escape</SelectItem>
                <SelectItem value="forbidden-love" title="A romance that defies societal, cultural, or moral boundaries.">Forbidden Love</SelectItem>
                <SelectItem value="forgiveness" title="Characters confront emotional wounds to offer or seek redemption.">Forgiveness</SelectItem>
                <SelectItem value="freedom" title="The pursuit of autonomy from oppression or control.">Freedom</SelectItem>
                <SelectItem value="honor" title="Upholding personal or cultural codes of ethics and duty.">Honor</SelectItem>
                <SelectItem value="justice" title="The moral quest to right a wrong or balance fairness.">Justice</SelectItem>
                <SelectItem value="love" title="Emotional connection driving character motivation and conflicts.">Love</SelectItem>
                <SelectItem value="loyalty" title="Allegiance to a person, cause, or belief, even at great cost.">Loyalty</SelectItem>
                <SelectItem value="madness" title="Descent into insanity, blurring reality and delusion.">Madness</SelectItem>
                <SelectItem value="maturation" title="A coming-of-age journey of personal growth and responsibility.">Maturation</SelectItem>
                <SelectItem value="metamorphosis" title="A profound transformation in identity, form, or perspective.">Metamorphosis</SelectItem>
                <SelectItem value="moral-ambiguity" title="A blurred line between right and wrong in character choices.">Moral Ambiguity</SelectItem>
                <SelectItem value="obtaining" title="The relentless pursuit to acquire a prized object or goal.">Obtaining</SelectItem>
                <SelectItem value="ownership" title="Themes of control, possession, or claiming what one believes is theirs.">Ownership</SelectItem>
                <SelectItem value="pursuit" title="A relentless chase, whether for justice, revenge, or desire.">Pursuit</SelectItem>
                <SelectItem value="quest" title="A character's journey to achieve a nearly impossible objective.">Quest</SelectItem>
                <SelectItem value="redemption" title="Atonement for past sins through sacrifice or good deeds.">Redemption</SelectItem>
                <SelectItem value="remorse" title="A character grapples with guilt and regret.">Remorse</SelectItem>
                <SelectItem value="rescue" title="Saving someone from imminent peril.">Rescue</SelectItem>
                <SelectItem value="respect" title="Earning recognition and dignity through actions or perseverance.">Respect</SelectItem>
                <SelectItem value="revenge" title="Retribution for a past wrong, regardless of consequence.">Revenge</SelectItem>
                <SelectItem value="revolt" title="An uprising against authority or oppressive forces.">Revolt</SelectItem>
                <SelectItem value="rivalry" title="Intense competition between two characters or factions.">Rivalry</SelectItem>
                <SelectItem value="sacrifice" title="Giving up something of great personal value for a higher cause.">Sacrifice</SelectItem>
                <SelectItem value="supplication" title="A desperate plea for aid, mercy, or forgiveness.">Supplication</SelectItem>
                <SelectItem value="survival" title="Battling overwhelming odds to stay alive.">Survival</SelectItem>
                <SelectItem value="temptation" title="A character is lured toward desires that conflict with their morals.">Temptation</SelectItem>
                <SelectItem value="the-riddle" title="Solving a complex mystery or intellectual challenge.">The Riddle</SelectItem>
                <SelectItem value="transformation" title="A fundamental change in a character's nature or circumstances.">Transformation</SelectItem>
                <SelectItem value="underdog" title="A lesser-powered character defies expectations against stronger opponents.">Underdog</SelectItem>
                <SelectItem value="wretched-excess" title="Characters driven to ruin by indulgence, greed, or obsession.">Wretched Excess</SelectItem>
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
                <SelectItem value="man-vs-man">[Wo]Man vs. [Wo]Man</SelectItem>
                <SelectItem value="man-vs-nature">[Wo]Man vs. Nature</SelectItem>
                <SelectItem value="man-vs-environment">[Wo]Man vs. the Environment</SelectItem>
                <SelectItem value="man-vs-machines">[Wo]Man vs. Machines / Technology</SelectItem>
                <SelectItem value="man-vs-supernatural">[Wo]Man vs. the Supernatural</SelectItem>
                <SelectItem value="man-vs-self">[Wo]Man vs. Self</SelectItem>
                <SelectItem value="man-vs-god">[Wo]Man vs. God / Religion</SelectItem>
                <SelectItem value="man-vs-society">[Wo]Man vs. Society</SelectItem>
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

// Site Links Sidebar Component - Purple panel showing site links
const SiteLinksSidebar = () => (
  <div className="h-full border-l border-slate-600 p-4 overflow-y-auto" style={{ backgroundColor: '#29415d' }}>
    <h3 className="text-white text-sm font-semibold mb-4">Site Links</h3>
    
    {/* Grid of circular icons as shown in purple panel */}
    <div className="grid grid-cols-4 gap-2">
      {Array.from({ length: 16 }, (_, index) => (
        <div
          key={index}
          className="w-8 h-8 rounded-full bg-slate-600 hover:bg-slate-500 cursor-pointer flex items-center justify-center"
        >
          <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
        </div>
      ))}
    </div>
  </div>
);

// Right Icon Sidebar Component - Blue from grid (Columns 27-28)
const RightIconSidebar = ({ onFriendsListToggle, onSiteLinksToggle, activeTab }: { 
  onFriendsListToggle?: () => void; 
  onSiteLinksToggle?: () => void; 
  activeTab: string 
}) => (
  <div className="h-full border-l border-slate-600 flex flex-col justify-between items-center py-4 relative z-50" style={{ backgroundColor: '#29415d' }}>
    {/* Top navigation icons */}
    <div className="flex flex-col items-center space-y-4">
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
        title="Friends List"
        onClick={() => {
          if (activeTab !== 'dashboard' && onFriendsListToggle) {
            onFriendsListToggle();
          }
        }}
        disabled={activeTab === 'dashboard'}
      >
        <Users className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
        title="Notifications"
      >
        <Bell className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
        title="Asset Tag"
      >
        <img 
          src={assetTagIcon} 
          alt="Asset Tag"
          className="w-5 h-5 object-contain filter brightness-0 invert"
        />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
        title="Story Details"
      >
        <img 
          src={storyDetailsIcon} 
          alt="Story Details"
          className="w-5 h-5 object-contain filter brightness-0 invert"
        />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
        title="Story Mechanic"
      >
        <img 
          src={storyMechanicsIcon} 
          alt="Story Mechanic"
          className="w-5 h-5 object-contain filter brightness-0 invert"
        />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
        title="Task"
      >
        <img 
          src={taskIcon} 
          alt="Task"
          className="w-5 h-5 object-contain filter brightness-0 invert"
        />
      </Button>
    </div>
    
    {/* Bottom action icons */}
    <div className="flex flex-col items-center space-y-2">
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
        title="Site link"
        onClick={() => {
          if (activeTab !== 'dashboard' && onSiteLinksToggle) {
            onSiteLinksToggle();
          }
        }}
        disabled={activeTab === 'dashboard'}
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
  const [supportMenuOpen, setSupportMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [isFriendsListOpen, setIsFriendsListOpen] = useState(false);
  const [isSiteLinksOpen, setIsSiteLinksOpen] = useState(false);
  
  // Determine active tab from current route
  const getActiveTab = () => {
    if (location === '/dashboard') return 'dashboard';
    const match = location.match(/\/builder\/(.+)/);
    return match ? match[1] : 'dashboard';  // Default to dashboard instead of story
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

  const handleSignOut = () => {
    // Navigate to login page (assuming it's the root path when not authenticated)
    window.location.href = '/api/logout';
  };

  return (
    <div className="h-screen bg-slate-800 flex flex-col overflow-hidden">
      {/* Top Navigation Header - Spans full 28 columns */}
      <header className="border-b border-slate-700 grid grid-cols-28 h-16 relative z-50" style={{ backgroundColor: '#0d274c' }}>
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
                    className="px-4 py-3 text-base font-medium text-white transition-all duration-300 rounded-none flex items-center gap-2"
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
                    <img 
                      src={tab.icon} 
                      alt={`${tab.name} icon`}
                      className="w-5 h-5 object-contain filter brightness-0 invert"
                      style={{
                        filter: tab.isActive 
                          ? 'brightness(0) invert(1) drop-shadow(0 0 3px #00d8ff)' 
                          : 'brightness(0) invert(1)'
                      }}
                    />
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
            <IconSidebar 
              supportMenuOpen={supportMenuOpen}
              setSupportMenuOpen={setSupportMenuOpen}
              accountMenuOpen={accountMenuOpen}
              setAccountMenuOpen={setAccountMenuOpen}
              onSignOut={handleSignOut}
            />
          </div>
          
          {/* Left Content Sidebar - Columns 2-5 */}
          <div className="col-span-4">
            <LeftSidebar activeTab={activeTab} />
          </div>
          
          {/* Main Content - Dashboard fixed, Builder tabs dynamic based on rendered panels */}
          <div className={`${
            activeTab === 'dashboard' 
              ? 'col-span-19' 
              : (() => {
                  // Calculate main content span: 28 - 1 (left icon) - 4 (left content) - (friends ? 3 : 0) - (sitelinks ? 3 : 0) - 1 (right icon)
                  const mainContentSpan = 28 - 1 - 4 - (isFriendsListOpen ? 3 : 0) - (isSiteLinksOpen ? 3 : 0) - 1;
                  return `col-span-${mainContentSpan} transition-all duration-300`;
                })()
          }`}>
            {activeTab === 'story' ? (
              <div className="bg-gray-100 flex flex-col h-full">
                {/* Story Builder Header */}
                <div className="bg-white border-b border-gray-200 px-4 pb-4">
                  <h2 className="text-lg font-semibold text-slate-800">Story Builder</h2>
                </div>
                
                {/* Constrained Content Container - EXACT SAME as Dashboard - 15.25 inches max width */}
                <div className="flex-1 flex justify-center overflow-hidden">
                  <div className="w-full max-w-[15.25in] p-4 flex flex-col h-full">
                    {/* Main Story Builder Section - Expanded as AI Assistant reduced by 10% */}
                    <div className="flex justify-center items-center" style={{ height: 'calc(60% + 1in + 8.336% - 1.35in)' }}>
                      <div className="w-full max-w-[14.5in] h-full">
                        {/* Story Content Editor - Full width document style */}
                        <div className="h-full bg-white border border-gray-200 shadow-sm flex flex-col">
                          {/* Enhanced Toolbar - Google Docs Style */}
                          <div className="border-b border-gray-200 px-4 py-2">
                            <div className="flex items-center space-x-1 text-sm flex-wrap">
                              {/* Undo/Redo */}
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-600 hover:bg-gray-100">
                                <Undo className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-600 hover:bg-gray-100">
                                <Redo className="w-4 h-4" />
                              </Button>
                              
                              {/* Print */}
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-600 hover:bg-gray-100">
                                <Printer className="w-4 h-4" />
                              </Button>
                              
                              {/* Format Painter */}
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-600 hover:bg-gray-100">
                                <PaintBucket className="w-4 h-4" />
                              </Button>
                              
                              {/* Zoom */}
                              <Select>
                                <SelectTrigger className="h-7 w-16 text-xs">
                                  <SelectValue placeholder="100%" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="50">50%</SelectItem>
                                  <SelectItem value="75">75%</SelectItem>
                                  <SelectItem value="100">100%</SelectItem>
                                  <SelectItem value="125">125%</SelectItem>
                                  <SelectItem value="150">150%</SelectItem>
                                </SelectContent>
                              </Select>
                              
                              <div className="w-px h-4 bg-gray-300 mx-1"></div>
                              
                              {/* Format */}
                              <Select>
                                <SelectTrigger className="h-7 w-28 text-xs">
                                  <SelectValue placeholder="Normal text" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="normal">Normal text</SelectItem>
                                  <SelectItem value="heading1">Heading 1</SelectItem>
                                  <SelectItem value="heading2">Heading 2</SelectItem>
                                  <SelectItem value="heading3">Heading 3</SelectItem>
                                </SelectContent>
                              </Select>
                              
                              {/* Font Family */}
                              <Select>
                                <SelectTrigger className="h-7 w-20 text-xs">
                                  <SelectValue placeholder="Arial" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="arial">Arial</SelectItem>
                                  <SelectItem value="times">Times</SelectItem>
                                  <SelectItem value="calibri">Calibri</SelectItem>
                                  <SelectItem value="helvetica">Helvetica</SelectItem>
                                </SelectContent>
                              </Select>
                              
                              <div className="w-px h-4 bg-gray-300 mx-1"></div>
                              
                              {/* Font Size */}
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-600 hover:bg-gray-100">
                                <Minus className="w-3 h-3" />
                              </Button>
                              
                              <Select>
                                <SelectTrigger className="h-7 w-12 text-xs">
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
                              
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-600 hover:bg-gray-100">
                                <Plus className="w-3 h-3" />
                              </Button>
                              
                              <div className="w-px h-4 bg-gray-300 mx-1"></div>
                              
                              {/* Text Formatting */}
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-600 hover:bg-gray-100">
                                <Bold className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-600 hover:bg-gray-100">
                                <Italic className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-600 hover:bg-gray-100">
                                <Underline className="w-4 h-4" />
                              </Button>
                              
                              {/* Text Color */}
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-600 hover:bg-gray-100">
                                <Type className="w-4 h-4" />
                              </Button>
                              
                              {/* Highlight Color */}
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-600 hover:bg-gray-100">
                                <Highlighter className="w-4 h-4" />
                              </Button>
                              
                              <div className="w-px h-4 bg-gray-300 mx-1"></div>
                              
                              {/* Link */}
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-600 hover:bg-gray-100">
                                <Link className="w-4 h-4" />
                              </Button>
                              
                              {/* Comment */}
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-600 hover:bg-gray-100">
                                <MessageSquare className="w-4 h-4" />
                              </Button>
                              
                              {/* Image */}
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-600 hover:bg-gray-100">
                                <Image className="w-4 h-4" />
                              </Button>
                              
                              <div className="w-px h-4 bg-gray-300 mx-1"></div>
                              
                              {/* Alignment */}
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-600 hover:bg-gray-100">
                                <AlignLeft className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-600 hover:bg-gray-100">
                                <AlignCenter className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-600 hover:bg-gray-100">
                                <AlignRight className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-600 hover:bg-gray-100">
                                <AlignJustify className="w-4 h-4" />
                              </Button>
                              
                              <div className="w-px h-4 bg-gray-300 mx-1"></div>
                              
                              {/* Lists */}
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-600 hover:bg-gray-100">
                                <List className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-600 hover:bg-gray-100">
                                <ListOrdered className="w-4 h-4" />
                              </Button>
                              
                              <div className="w-px h-4 bg-gray-300 mx-1"></div>
                              
                              {/* Indent */}
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-600 hover:bg-gray-100">
                                <Indent className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-600 hover:bg-gray-100">
                                <Outdent className="w-4 h-4" />
                              </Button>
                              
                              {/* More Options */}
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-600 hover:bg-gray-100">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
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

                    {/* Bottom section - Reduced by 10% to match Dashboard proportions */}
                    <div style={{ height: 'calc(40% - 1in - 8.336% + 1.35in)' }} className="flex flex-col justify-start pt-4">
                      {/* AI Chat Window - reduced by 10% to match Dashboard height */}
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
          
          {/* Friends List Panel - Dashboard always shows, Builder tabs conditionally render */}
          {activeTab === 'dashboard' ? (
            <div className="col-span-3 relative z-40">
              <RightSidebar />
            </div>
          ) : (
            isFriendsListOpen && (
              <div className="col-span-3 relative z-40 overflow-hidden">
                <div className="h-full transition-transform duration-300 translate-x-0" style={{ width: '280px' }}>
                  <RightSidebar />
                </div>
              </div>
            )
          )}
          
          {/* Site Links Panel - Only render when open on non-dashboard tabs */}
          {activeTab !== 'dashboard' && isSiteLinksOpen && (
            <div className="col-span-3 relative z-40 overflow-hidden">
              <div className="h-full transition-transform duration-300 translate-x-0" style={{ width: '280px' }}>
                <SiteLinksSidebar />
              </div>
            </div>
          )}
          
          {/* Right Icon Sidebar - Always visible */}
          <div className="col-span-1 relative z-50 h-full">
            <RightIconSidebar 
              onFriendsListToggle={() => setIsFriendsListOpen(!isFriendsListOpen)}
              onSiteLinksToggle={() => setIsSiteLinksOpen(!isSiteLinksOpen)}
              activeTab={activeTab}
            />
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
                <IconSidebar 
                  supportMenuOpen={supportMenuOpen}
                  setSupportMenuOpen={setSupportMenuOpen}
                  accountMenuOpen={accountMenuOpen}
                  setAccountMenuOpen={setAccountMenuOpen}
                  onSignOut={handleSignOut}
                />
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
                <RightIconSidebar 
                  onFriendsListToggle={() => setIsFriendsListOpen(!isFriendsListOpen)}
                  activeTab={activeTab}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}