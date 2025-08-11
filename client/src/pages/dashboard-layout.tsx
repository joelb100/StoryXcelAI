import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useLocation } from "wouter";
import { upsertStoryTitleInText } from '@/lib/storyTitleUpsert';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DefinitionTooltip } from "@/components/definition-tooltip";
import StoryRightSidebar from "@/components/layout/right-sidebar";
import DashboardLookFriendsList from "@/components/friends/DashboardLookFriendsList";
import RichEditor, { OVERVIEW_START, OVERVIEW_END } from '@/components/editor/RichEditor';
import debounce from 'lodash.debounce';

// --- Story Beats System ---
type Beats = { plotA: string[]; plotB: string[]; plotC: string[]; twists: string[]; hook: string[] };

const CONFLICT_BEATS: Record<string, Beats> = {
  "[Wo]Man vs. [Wo]Man": {
    plotA: [
      "Rival's goals directly threaten the protagonist.",
      "Escalating tit‑for‑tat forces a public confrontation.",
      "A line is crossed that demands a reckoning."
    ],
    plotB: [
      "Allies pick sides; loyalties strain under pressure.",
      "Romance/friendship complicates the main conflict.",
      "Power dynamics shift after a small victory."
    ],
    plotC: [
      "Rumors, reputation, or status become weapons.",
      "Institutions (school, job, team) amplify the feud.",
      "A past slight resurfaces with new consequences."
    ],
    twists: [
      "The rival wanted the same 'good' outcome all along.",
      "A mentor betrays the protagonist—or vice versa."
    ],
    hook: [
      "What you win costs who you are.",
      "The truest victory isn't crushing them; it's changing you."
    ]
  },
  "[Wo]Man vs. Nature": {
    plotA: [
      "Environment threatens survival; adapt or perish.",
      "A safe path fails; a risky path appears.",
      "Weather/terrain escalates into catastrophe."
    ],
    plotB: [
      "Team fractures over tactics and trust.",
      "A companion's injury or loss forces hard trade‑offs.",
      "Old skills prove useless; new ones emerge."
    ],
    plotC: [
      "Limited resources become moral dilemmas.",
      "Local wildlife/ecosystem reacts unexpectedly.",
      "A map/myth misleads; the land 'refuses' them."
    ],
    twists: [
      "The 'threat' is a pattern the hero misread.",
      "The rescue is the real danger."
    ],
    hook: [
      "The wild doesn't forgive—only teaches.",
      "To live here, you must become of here."
    ]
  },
  "[Wo]Man vs. the Environment": {
    plotA: [
      "Systems force adaptation or extinction.",
      "A breaking point demands radical action.",
      "Rules shift mid‑story, invalidating old strategies."
    ],
    plotB: [
      "Personal relationships strain under systemic stress.",
      "Survival needs clash with values.",
      "Someone pays a price for 'playing by the rules'."
    ],
    plotC: [
      "Infrastructure failure cascades into larger crises.",
      "Gatekeepers tighten control to hide cracks.",
      "Scarcity creates new hierarchies of power."
    ],
    twists: [
      "The system 'fix' produces worse harms.",
      "An insider becomes a whistleblower."
    ],
    hook: [
      "What you built to protect you became your prison.",
      "Reforming a machine that eats reformers."
    ]
  },
  "[Wo]Man vs. Machines / Technology": {
    plotA: [
      "Automation outpaces human control.",
      "Convenience erodes privacy and choice.",
      "A black‑box decision endangers someone the hero loves."
    ],
    plotB: [
      "Teammates disagree: unplug or retrain?",
      "A clone/AI 'copy' competes for trust.",
      "Dependency makes rebellion costly."
    ],
    plotC: [
      "An obsolete tool holds the real fix.",
      "A failsafe has a human catch.",
      "Glitches reveal the machine's hidden bias."
    ],
    twists: [
      "The model learned from the hero's worst day.",
      "Killing it kills livelihoods."
    ],
    hook: [
      "If it thinks like us, it inherits our ghosts.",
      "We programmed the future with our fears."
    ]
  },
  "[Wo]Man vs. the Supernatural": {
    plotA: [
      "Uncanny signs escalate from nuisance to threat.",
      "Rules of the curse/creature slowly surface.",
      "A ritual or threshold must be crossed."
    ],
    plotB: [
      "Skeptics vs believers fracture the group.",
      "A legacy ties the hero to the haunting.",
      "Protection requires a personal sacrifice."
    ],
    plotC: [
      "Sacred/profane spaces invert power.",
      "Old folklore hides practical instructions.",
      "The mundane world refuses to see the horror."
    ],
    twists: [
      "The monster wants witness, not blood.",
      "Breaking the curse fulfills it."
    ],
    hook: [
      "What hunts you knows your name.",
      "Faith is a door; doubt is a lock."
    ]
  },
  "[Wo]Man vs. Self": {
    plotA: [
      "An old wound triggers self‑sabotage.",
      "A chance at growth collides with comfort.",
      "The mask cracks in public."
    ],
    plotB: [
      "A relationship mirrors the hero's flaw.",
      "A mentor pushes the wrong lesson.",
      "Relapse or regression tempts at the midpoint."
    ],
    plotC: [
      "Past and present collide in a hard choice.",
      "A false victory hides the real rot.",
      "A small kindness opens a bigger door."
    ],
    twists: [
      "The 'antagonist' was a projection.",
      "Winning the external fight feels hollow."
    ],
    hook: [
      "You can't outrun the person in your footprints.",
      "To become new, something must die."
    ]
  },
  "[Wo]Man vs. God / Religion": {
    plotA: [
      "Doctrine clashes with lived reality.",
      "A miracle or scandal shatters certainty.",
      "Exile or heresy becomes unavoidable."
    ],
    plotB: [
      "Community love turns conditional.",
      "A sacred text yields a dangerous reading.",
      "An elder's faith quietly breaks."
    ],
    plotC: [
      "Ritual becomes protest.",
      "Power protects piety—or vice versa.",
      "Silence is demanded where truth is owed."
    ],
    twists: [
      "The 'voice of God' was forged by men.",
      "Faith returns in a different form."
    ],
    hook: [
      "When you ask the heavens, the echo is you.",
      "Reverence without mercy is cruelty."
    ]
  },
  "[Wo]Man vs. Society": {
    plotA: [
      "Oppressive norms punish non‑conformity.",
      "Law/order is used to maintain injustice.",
      "Collective action becomes the only path."
    ],
    plotB: [
      "Allies disagree on tactics: reform vs revolt.",
      "Public sentiment swings; costs mount.",
      "Betrayal from within endangers many."
    ],
    plotC: [
      "Media narrative warps the truth.",
      "An unlikely coalition forms.",
      "Small local wins unlock bigger doors."
    ],
    twists: [
      "A 'villain' shares the hero's origin story.",
      "Victory exposes a deeper system beneath."
    ],
    hook: [
      "Change the rules, or the rules change you.",
      "Freedom is contagious—and costly."
    ]
  }
};

const BEATS_START = "<!-- STORYXCEL_BEATS_START -->";
const BEATS_END = "<!-- STORYXCEL_BEATS_END -->";

// Helper functions for Story Beats
function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, ch =>
    ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" } as any)[ch]
  );
}

function beatsToHTML(beats: Beats) {
  const li = (xs: string[]) => xs.map(s => `<li>${escapeHtml(s)}</li>`).join("");

  return `
    ${BEATS_START}
    <p><strong>Story Beats</strong></p>

    <p><strong>Plot A —</strong> The high level description of the story's key sequential events of the main story</p>
    <ul>${li(beats.plotA)}</ul>

    <p><strong>Sub Plot B —</strong> The storyline's Secondary sequential story points that focus on relationships</p>
    <ul>${li(beats.plotB)}</ul>

    <p><strong>Sub Plot C —</strong> The storyline's Tertiary sequential story points that focus on background elements</p>
    <ul>${li(beats.plotC)}</ul>

    <p><strong>Plot Twists —</strong></p>
    <ul>${li(beats.twists)}</ul>

    <p><strong>Emotional Hook —</strong> A powerful narrative element designed to evoke strong feelings</p>
    <ul>${li(beats.hook)}</ul>
    ${BEATS_END}
  `.trim();
}

// --- Quill header writer (replace top header, preserve the rest) ---
type OverviewState = {
  projectName: string;
  projectType: string;
  genre: string;
  subGenre: string;
  theme: string;
  subTheme: string;
  centralConflict: string;
  lengthPages: string | number;
  lengthMinutes: string | number;
};

function buildOverviewHTML(data: {
  title?: string;
  projectType?: string;
  genreLabel?: string;
  genreDef?: string;
  subGenreLabel?: string;
  subGenreDef?: string;
  themeLabel?: string;
  themeDef?: string;
  subThemeLabel?: string;
  subThemeDef?: string;
  conflictLabel?: string;
  conflictDef?: string;
}) {
  const {
    title,
    projectType,
    genreLabel,
    genreDef,
    subGenreLabel,
    subGenreDef,
    themeLabel,
    themeDef,
    subThemeLabel,
    subThemeDef,
    conflictLabel,
    conflictDef,
  } = data;

  return [
    line('Story Title', title),
    line('Project Type', projectType),
    genreLabel ? `<p><strong>Genre</strong> — ${genreLabel}</p>` : '',
    genreDef ? `<p style="margin-left:1rem;">${genreDef}</p>` : '',
    subGenreLabel ? `<p><strong>Sub Genre</strong> — ${subGenreLabel}</p>` : '',
    subGenreDef ? `<p style="margin-left:1rem;">${subGenreDef}</p>` : '',
    themeLabel ? `<p><strong>Theme</strong> — ${themeLabel}</p>` : '',
    themeDef ? `<p style="margin-left:1rem;">${themeDef}</p>` : '',
    subThemeLabel ? `<p><strong>Sub Theme</strong> — ${subThemeLabel}</p>` : '',
    subThemeDef ? `<p style="margin-left:1rem;">${subThemeDef}</p>` : '',
    conflictLabel ? `<p><strong>Central Conflict</strong> — ${conflictLabel}</p>` : '',
    conflictDef ? `<p style="margin-left:1rem;">${conflictDef}</p>` : '',
  ].filter(Boolean).join('');
}

/**
 * Returns HTML from container start until (but not including) the 'untilNode'
 * or from 'fromNode' to the end if untilNode is null.
 */
function sliceOuterHTML(container: HTMLElement, fromNode: ChildNode | null, untilNode: ChildNode | null) {
  const frag = document.createDocumentFragment();
  let cur = fromNode ?? container.firstChild;

  while (cur && cur !== untilNode) {
    const clone = cur.cloneNode(true);
    frag.appendChild(clone);
    cur = cur.nextSibling;
  }

  const div = document.createElement('div');
  div.appendChild(frag);
  return div.innerHTML;
}

/**
 * Replaces the HTML between our start/end markers.
 * If markers are missing, we re-seed them and drop any previously duplicated block.
 */
function replaceOverviewSafe(editorHtml: string, overviewHTML: string) {
  // Normalize: Quill always wraps block content in <p>…</p>
  // We parse as DOM so wrapper tags don't break us.
  const container = document.createElement('div');
  container.innerHTML = editorHtml || '';

  let start = container.querySelector('span[data-sx-marker="overview-start"]');
  let end   = container.querySelector('span[data-sx-marker="overview-end"]');

  // If markers are missing OR out of order, re-seed a clean header
  if (!start || !end) {
    const clean = document.createElement('div');
    clean.innerHTML = `${OVERVIEW_START}${overviewHTML}${OVERVIEW_END}<p>Your story begins here...</p>`;
    return clean.innerHTML;
  }

  // Build a range that covers everything between markers
  // We'll rebuild innerHTML with three slices: [before][header][after]
  const beforeHtml = sliceOuterHTML(container, container.firstChild, start);
  const afterHtml  = sliceOuterHTML(container, end, null);

  const nextHtml =
    beforeHtml +
    OVERVIEW_START + overviewHTML + OVERVIEW_END +
    afterHtml;

  return nextHtml;
}

function line(label?: string, value?: string) {
  return label && value
    ? `<p><strong>${label}</strong> — ${value}</p>`
    : label
    ? `<p><strong>${label}</strong></p>`
    : '';
}



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

// Editor section markers are imported from RichEditor component

type ConflictBlock = {
  plotA: string[];
  plotB: string[];
  plotC: string[];
  twists: string[];
  hook: string[];
};

const CONFLICT_TEMPLATES: Record<string, ConflictBlock> = {
  'man-v-man': {
    plotA: [
      'Opposing goals create inevitable confrontation.',
      'Power dynamics shift, forcing alliance or betrayal.',
      'Personal history complicates present conflict.'
    ],
    plotB: [
      'Allies question the protagonist\'s methods or motives.',
      'Collateral damage affects innocent parties.'
    ],
    plotC: [
      'Past relationships resurface at critical moments.',
      'The opponent\'s perspective reveals uncomfortable truths.'
    ],
    twists: [
      'The antagonist was right about something crucial.',
      'Victory requires becoming what you fought against.'
    ],
    hook: [
      'Your enemy knows you better than you know yourself.',
      'Defeating them means losing who you are.'
    ]
  },
  'man-v-nature': {
    plotA: [
      'Natural forces operate beyond human control or understanding.',
      'Survival instincts conflict with civilized behavior.',
      'The environment punishes human arrogance or negligence.'
    ],
    plotB: [
      'Group dynamics fracture under natural pressure.',
      'Nature reveals hidden aspects of character.'
    ],
    plotC: [
      'Technology fails when most needed.',
      'Animals or natural phenomena become active obstacles.'
    ],
    twists: [
      'Humans caused the natural disaster they\'re fleeing.',
      'Civilization\'s comforts have made survival skills obsolete.'
    ],
    hook: [
      'The land doesn\'t hate you—it doesn\'t care.',
      'Earn every breath.'
    ]
  },
  'man-v-environment': {
    plotA: [
      'Systems pressure force adaptation or extinction.',
      'A breaking point demands radical action despite consequences.',
      'The environment\'s "rules" shift mid-story, invalidating old strategies.'
    ],
    plotB: [
      'Personal relationships strain under environmental stress.',
      'Old loyalties conflict with survival needs.'
    ],
    plotC: [
      'Infrastructure failures cascade into larger crises.',
      'Resource scarcity creates new hierarchies of power.'
    ],
    twists: [
      'The environment was shaped by past human choices.',
      'Adaptation changes the protagonist in unexpected ways.'
    ],
    hook: [
      'What you built to protect you becomes your prison.',
      'Adaptation costs identity.'
    ]
  },
  'man-v-tech': {
    plotA: [
      'Technological dependence reveals fatal vulnerabilities.',
      'A system malfunction forces manual intervention beyond training.',
      'The technology "evolves" beyond its original programming.'
    ],
    plotB: [
      'Human connections weaken as technology strengthens.',
      'Old skills become invaluable when systems fail.'
    ],
    plotC: [
      'Data privacy breaches expose personal secrets.',
      'Automation eliminates human agency in critical decisions.'
    ],
    twists: [
      'The technology was designed to fail at this moment.',
      'Human intuition trumps algorithmic certainty.'
    ],
    hook: [
      'Your convenience becomes your cage.',
      'The tools reshape the user.'
    ]
  },
  'man-v-supernatural': {
    plotA: [
      'Supernatural rules operate by alien logic that punishes assumption.',
      'A bargain or curse escalates beyond the protagonist\'s control.',
      'The supernatural force demands a sacrifice that defines character.'
    ],
    plotB: [
      'Loved ones are affected by supernatural consequences.',
      'Reality becomes unreliable as supernatural influence grows.'
    ],
    plotC: [
      'Ancient knowledge conflicts with modern understanding.',
      'The supernatural bleeds into mundane life unpredictably.'
    ],
    twists: [
      'The supernatural was always present, just hidden.',
      'The protagonist has supernatural heritage or connection.'
    ],
    hook: [
      'Some doors should never be opened.',
      'The price of power is paid by others.'
    ]
  },
  'man-v-self': {
    plotA: [
      'Internal contradictions create paralysis at crucial moments.',
      'Past trauma resurfaces to sabotage present progress.',
      'Core beliefs are challenged by undeniable evidence.'
    ],
    plotB: [
      'External relationships mirror internal conflicts.',
      'Self-sabotage patterns repeat despite awareness.'
    ],
    plotC: [
      'Identity crises manifest in changing behavior.',
      'Fear of success competes with fear of failure.'
    ],
    twists: [
      'The flaw was actually a strength misunderstood.',
      'Others see the protagonist more clearly than they see themselves.'
    ],
    hook: [
      'Your greatest enemy knows all your moves.',
      'Freedom requires facing what you\'ve been running from.'
    ]
  },
  'man-v-god': {
    plotA: [
      'Divine command conflicts with human morality or logic.',
      'Faith is tested by suffering that challenges core beliefs.',
      'Religious duty demands sacrifice that questions worthiness.'
    ],
    plotB: [
      'Community faith wavers, creating isolation or solidarity.',
      'Miracles have terrible costs or conditions.'
    ],
    plotC: [
      'Religious hierarchy conflicts with spiritual truth.',
      'Sacred texts are reinterpreted under pressure.'
    ],
    twists: [
      'The divine test was actually human manipulation.',
      'Doubt becomes a form of deeper faith.'
    ],
    hook: [
      'God\'s silence is not absence.',
      'True faith questions everything.'
    ]
  },
  'man-v-society': {
    plotA: [
      'Social norms criminalize necessary actions.',
      'Institutional power protects itself through individual sacrifice.',
      'Cultural change requires personal rebellion with social costs.'
    ],
    plotB: [
      'Family loyalties divide over social issues.',
      'Legal systems fail to deliver justice.'
    ],
    plotC: [
      'Public opinion shifts unpredictably.',
      'Economic pressure enforces social conformity.'
    ],
    twists: [
      'The system was designed to create this specific problem.',
      'Individual change influences unexpected social transformation.'
    ],
    hook: [
      'The majority can be morally wrong.',
      'Standing alone requires the courage of your convictions.'
    ]
  }
};

// Helper to strip any old blocks
function stripBlock(html: string, start: string, end: string) {
  const s = html.indexOf(start);
  const e = html.indexOf(end);
  if (s !== -1 && e !== -1 && e > s) {
    return html.slice(0, s) + html.slice(e + end.length);
  }
  return html;
}



// Build Story Beats HTML from conflict key
function buildBeatsHTML(conflictKey: string) {
  const t = CONFLICT_TEMPLATES[conflictKey];
  if (!t) return '';

  const toUL = (items: string[]) =>
    `<ul style="margin:4px 0 12px 18px; padding:0;">${items.map(li => `<li>${li}</li>`).join('')}</ul>`;

  return (
    `<strong>Story Beats</strong><br/>
<strong>Plot A —</strong> The high level description of the story's key sequential events of the main story
${toUL(t.plotA)}
<strong>Sub Plot B —</strong> The storyline's Secondary sequential story points that focus on relationships
${toUL(t.plotB)}
<strong>Sub Plot C —</strong> The storyline's Tertiary sequential story points that focus on background elements
${toUL(t.plotC)}
<strong>Plot Twists —</strong>
${toUL(t.twists)}
<strong>Emotional Hook —</strong> A powerful narrative element designed to evoke strong feelings
${toUL(t.hook)}`
  );
}



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

// Central Conflict options and definitions
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
const LeftSidebar = ({ 
  activeTab, 
  projectName, 
  onProjectNameChange,
  onProjectTypeChange,
  genre,
  onGenreChange,
  subGenre,
  onSubGenreChange,
  theme,
  onThemeChange,
  subTheme,
  onSubThemeChange,
  centralConflict,
  onCentralConflictChange,
  overviewInputProps
}: { 
  activeTab: string;
  projectName?: string;
  onProjectNameChange?: (value: string) => void;
  onProjectTypeChange?: (value: string) => void;
  genre?: string;
  onGenreChange?: (value: string) => void;
  subGenre?: string;
  onSubGenreChange?: (value: string) => void;
  theme?: string;
  onThemeChange?: (value: string) => void;
  subTheme?: string;
  onSubThemeChange?: (value: string) => void;
  centralConflict?: string;
  onCentralConflictChange?: (value: string) => void;
  overviewInputProps?: { onFocus: () => void; onBlur: () => void; };
}) => (
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
              value={projectName ?? ''}
              onChange={(e) => onProjectNameChange?.(e.target.value)}
              placeholder="Enter project name..."
              className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-400"
              {...(overviewInputProps || {})}
            />
          </div>

          <div>
            <Label htmlFor="story-projectType" className="text-sm font-medium text-white block mb-1">Project Type</Label>
            <Select onValueChange={onProjectTypeChange}>
              <SelectTrigger className="bg-slate-600 border-slate-500 text-white" {...overviewInputProps}>
                <SelectValue placeholder="Select Project Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Worldbuilding" title="Worldbuilding - The process of creating detailed fictional universes, including their cultures, geography, history, and rules.">Worldbuilding</SelectItem>
                <SelectItem value="Novel" title="Novel - A long-form narrative work of fiction that explores characters, plots, and themes through descriptive prose.">Novel</SelectItem>
                <SelectItem value="Script" title="Script - A written blueprint for stage plays, TV shows, or other media, focusing on dialogue and scene directions.">Script</SelectItem>
                <SelectItem value="Screenplay" title="Screenplay - A formatted script specifically for film or television, detailing visual actions, camera cues, and spoken dialogue.">Screenplay</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="story-genre" className="text-sm font-medium text-white block mb-1">Genre</Label>
            <Select value={genre} onValueChange={onGenreChange}>
              <SelectTrigger className="bg-slate-600 border-slate-500 text-white" {...overviewInputProps}>
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
            <Select value={subGenre || ''} onValueChange={onSubGenreChange}>
              <SelectTrigger className="bg-slate-600 border-slate-500 text-white" {...overviewInputProps}>
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
            <Select value={theme} onValueChange={onThemeChange}>
              <SelectTrigger className="bg-slate-600 border-slate-500 text-white" {...overviewInputProps}>
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
            <Select value={subTheme} onValueChange={onSubThemeChange}>
              <SelectTrigger className="bg-slate-600 border-slate-500 text-white" {...overviewInputProps}>
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
            <Select value={centralConflict} onValueChange={onCentralConflictChange}>
              <SelectTrigger className="bg-slate-600 border-slate-500 text-white" {...overviewInputProps}>
                <SelectValue placeholder="Select Central Conflict" />
              </SelectTrigger>
              <SelectContent>
                {CENTRAL_CONFLICT_OPTIONS.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    title={CENTRAL_CONFLICT_DEFS[opt.value]}
                  >
                    {opt.label}
                  </SelectItem>
                ))}
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

// Site Links Sidebar Component - Now matches Dashboard Site Links color
const SiteLinksSidebar = () => (
  <div className="h-full border-l border-slate-600 p-4 overflow-y-auto" style={{ backgroundColor: '#758595' }}>
    <h3 className="text-white text-sm font-semibold mb-4">Site Links</h3>
    
    {/* Grid of circular icons matching Dashboard appearance */}
    <div className="grid grid-cols-4 gap-2">
      {Array.from({ length: 16 }, (_, index) => (
        <div
          key={index}
          className="w-10 h-10 rounded-full hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center"
          style={{ backgroundColor: '#47566b' }}
        >
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

// Dashboard Right Content Sidebar Component - Yellow from grid (Columns 24-26)
const DashboardRightSidebar = () => (
  <div className="h-full border-l border-slate-500 flex flex-col" style={{ backgroundColor: '#47566b' }}>
    {/* Friends List using shared component */}
    <div className="flex-1">
      <DashboardLookFriendsList
        friends={friendsList.map((name, idx) => ({
          id: String(idx),
          name,
          initials: name
            .split(" ")
            .map(p => p[0])
            .join("")
            .slice(0,2)
        }))}
        className="border-l-0" // Remove left border since parent has it
      />
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
  // Story tab specific panel states (default both open as shown in first image)
  const [isFriendsListOpen, setIsFriendsListOpen] = useState(true);
  const [isSiteLinksOpen, setIsSiteLinksOpen] = useState(true);
  // Project name state for live-sync with Story Builder
  const [projectName, setProjectName] = useState('');
  
  // --- StoryXcel Overview block control ---
  const SX_START = '// STORYXCEL_OVERVIEW_START';
  const SX_END   = '// STORYXCEL_OVERVIEW_END';

  // --- NEW STATE ---
  const [projectType, setProjectType] = useState<string>('');
  const [lengthModalOpen, setLengthModalOpen] = useState(false);
  const [lengthPages, setLengthPages] = useState<number | ''>('');
  const [lengthMinutes, setLengthMinutes] = useState<number | ''>('');
  
  // Genre state for auto-insertion into overview block
  const [genre, setGenre] = useState<string>('');
  
  // Sub-Genre state for auto-insertion into overview block (single selection)
  const [subGenre, setSubGenre] = useState<string>('');
  
  // Theme state for auto-insertion into overview block
  const [theme, setTheme] = useState<string>('');
  
  // Sub Theme state for auto-insertion into overview block
  const [subTheme, setSubTheme] = useState<string>('');

  // Central Conflict state for auto-insertion into overview block
  const [centralConflict, setCentralConflict] = useState<string>('');
  
  // Genre definitions map (matches the definitions in the UI)
  const GENRE_DEFS: Record<string, string> = {
    'classic': 'Timeless literary works that have enduring cultural, artistic, or historical significance.',
    'crime-drama': 'Stories focused on criminal activities, investigations, and the emotional/psychological conflicts surrounding them.',
    'epic': 'Grand, lengthy narratives involving heroic deeds and large-scale adventures or conflicts.',
    'fable': 'Short tales with moral lessons, often featuring anthropomorphic animals or mythical creatures.',
    'fairy-tale': 'Magical stories involving enchantments, fantastical beings, and clear distinctions between good and evil.',
    'fantasy': 'Fiction set in imaginative worlds where magic, mythical creatures, and supernatural forces are common.',
    'folktale': 'Traditional stories passed down orally that reflect cultural values, customs, and beliefs.',
    'gothic-fiction': 'Dark, atmospheric tales blending horror, romance, and mystery, often set in decaying or haunted locations.',
    'historical-fiction': 'Stories set in a real past era, blending fictional characters with actual historical events and settings.',
    'horror': 'Fiction designed to evoke fear, dread, and shock through terrifying situations and monstrous antagonists.',
    'humor': 'Lighthearted, comedic stories intended to entertain through wit, satire, and absurd situations.',
    'legend': 'Semi-true stories rooted in historical events but embellished with heroic feats or supernatural elements.',
    'magical-realism': 'Fiction where magical elements seamlessly blend into realistic, everyday settings.',
    'mystery': 'Narratives centered on solving a crime or uncovering hidden truths through clues and deduction.',
    'myth': 'Sacred tales from ancient cultures explaining the origins of the world, gods, and fundamental human experiences.',
    'romance': 'Stories centered on romantic relationships, exploring themes of love, attraction, and emotional connection.',
    'satire': 'Works that use irony, humor, and exaggeration to criticize and expose flaws in human behavior or society.',
    'science-fiction': 'Imaginative fiction featuring futuristic concepts, advanced technology, space exploration, or alternative realities.',
    'thriller': 'Fast-paced stories designed to keep readers in constant suspense with high stakes and relentless tension.',
    'tragedy': 'Serious dramatic works depicting the downfall of a protagonist due to fate, character flaws, or circumstances.',
    'western': 'Stories typically set in the American Old West and feature themes of rugged individualism, justice, and frontier life.'
  };

  // Genre label mapping (value to display name)
  const GENRE_LABELS: Record<string, string> = {
    'classic': 'Classic',
    'crime-drama': 'Crime / Drama',
    'epic': 'Epic',
    'fable': 'Fable',
    'fairy-tale': 'Fairy Tale',
    'fantasy': 'Fantasy',
    'folktale': 'Folktale',
    'gothic-fiction': 'Gothic Fiction',
    'historical-fiction': 'Historical Fiction',
    'horror': 'Horror',
    'humor': 'Humor',
    'legend': 'Legend',
    'magical-realism': 'Magical Realism',
    'mystery': 'Mystery',
    'myth': 'Myth',
    'romance': 'Romance',
    'satire': 'Satire',
    'science-fiction': 'Science Fiction',
    'thriller': 'Thriller',
    'tragedy': 'Tragedy',
    'western': 'Western'
  };

  // Sub-Genre definitions map (matches the definitions in the UI)
  const SUBGENRE_DEFS: Record<string, string> = {
    'acid': 'Stories that embrace surreal, psychedelic, or mind-bending visuals and narratives, often inspired by counterculture.',
    'buddy': 'Focuses on two (or more) characters with contrasting personalities who form a strong bond through shared adventures.',
    'classic': 'Traditional storytelling that follows timeless themes and structures, often paying homage to literary or cinematic classics.',
    'comedy': 'Stories designed to entertain and amuse through humor, wit, and exaggerated situations.',
    'contemporary': 'Set in the present day, focusing on modern societal issues, relationships, or environments.',
    'family': 'Themes of familial bonds, responsibilities, and conflicts are central to the plot.',
    'feminist': 'Focuses on themes of gender equality, female empowerment, and critiques of patriarchal systems.',
    'gunslinger': 'Revolves around lone, rugged protagonists who live by the gun, often in lawless frontier settings.',
    'historical': 'Set in a specific historical era, emphasizing period-accurate settings, characters, and events.',
    'horror': 'Stories designed to evoke fear, suspense, or dread, often through supernatural or psychological threats.',
    'martial-arts': 'Focuses on combat disciplines, choreographed fight scenes, and themes of honor, skill, and perseverance.',
    'musical': 'Integrates songs and dance as a primary method of storytelling and emotional expression.',
    'noir': 'Dark, cynical crime dramas featuring morally ambiguous characters, often set in gritty urban environments.',
    'psychological': 'Explores the inner workings of characters\' minds, delving into mental struggles, paranoia, or psychological manipulation.',
    'railroad': 'Stories centered around trains, railways, or the culture and history surrounding them, often symbolizing journey or progress.',
    'revisionist': 'Reinterprets established genres or historical events by challenging traditional perspectives or myths.',
    'sci-fi': 'Focused on futuristic technology, space exploration, and scientific advancements, often exploring ethical dilemmas.',
    'southern-gothic': 'Combines Gothic elements with the American South\'s decayed grandeur, eccentric characters, and dark social themes.',
    'spaghetti': 'A sub-genre of Westerns, typically Italian-made, known for stylistic violence, anti-heroes, and morally grey storylines.',
    'survival': 'Focuses on characters enduring extreme conditions or situations where their survival is constantly at stake.'
  };

  // Sub-Genre label mapping (value to display name)
  const SUBGENRE_LABELS: Record<string, string> = {
    'acid': 'Acid',
    'buddy': 'Buddy',
    'classic': 'Classic',
    'comedy': 'Comedy',
    'contemporary': 'Contemporary',
    'family': 'Family',
    'feminist': 'Feminist',
    'gunslinger': 'Gunslinger',
    'historical': 'Historical',
    'horror': 'Horror',
    'martial-arts': 'Martial Arts',
    'musical': 'Musical',
    'noir': 'Noir',
    'psychological': 'Psychological',
    'railroad': 'Railroad',
    'revisionist': 'Revisionist',
    'sci-fi': 'Sci Fi',
    'southern-gothic': 'Southern Gothic',
    'spaghetti': 'Spaghetti',
    'survival': 'Survival'
  };

  // Theme definitions map (matches the definitions in the UI)
  const THEME_DEFS: Record<string, string> = {
    'abandonment': 'The emotional struggle or consequences of being left behind or deserted.',
    'acceptance': 'The journey toward embracing oneself or others despite differences or flaws.',
    'adultery': 'The betrayal of trust through infidelity in relationships.',
    'adventure': 'The pursuit of thrilling experiences or quests filled with danger and discovery.',
    'alienation': 'The feeling of being isolated or disconnected from society or oneself.',
    'ambition': 'The drive to achieve greatness, often at a personal or ethical cost.',
    'betrayal': 'The breaking of trust or loyalty, leading to conflict or emotional pain.',
    'coming-of-age': 'The transition from youth to adulthood, marked by personal growth.',
    'death': 'The exploration of mortality and its impact on characters.',
    'discovery': 'The act of uncovering hidden truths about the world or oneself.',
    'escape': 'The desire to break free from confinement, danger, or oppression.',
    'forbidden-love': 'A romance that defies social, cultural, or moral boundaries.',
    'forgiveness': 'The journey of letting go of resentment to heal emotional wounds.',
    'freedom': 'The struggle to achieve personal, political, or spiritual liberation.',
    'friendship': 'The bonds of loyalty, trust, and support between individuals.',
    'greed': 'The excessive desire for wealth, power, or material gain.',
    'justice': 'The pursuit of fairness, moral rightness, or legal retribution.',
    'legacy': 'The lasting impact one leaves on future generations or society.',
    'loneliness': 'The emotional void of isolation, either physical or emotional.',
    'love': 'The profound emotional connection between individuals, romantic or otherwise.',
    'morality': 'The internal or societal struggle between right and wrong.',
    'obsession': 'An overpowering fixation on an idea, person, or goal.',
    'overcoming': 'The triumph over personal flaws, fears, or external obstacles.',
    'patriot': 'A theme centered on devotion and sacrifice for one\'s country.',
    'poverty': 'The harsh realities and struggles associated with economic deprivation.',
    'prejudice': 'The exploration of bias, discrimination, and its consequences.',
    'redemption': 'The quest to atone for past sins or mistakes.',
    'revenge': 'The pursuit of retribution for a personal or moral wrongdoing.',
    'rivalry': 'The competitive conflict between individuals or groups.',
    'sacrifice': 'The act of giving up something valuable for a greater cause or person.',
    'survival': 'The primal struggle to stay alive against overwhelming odds.',
    'temptation': 'The internal conflict between desire and moral restraint.',
    'the-right': 'The defense or pursuit of what is morally or legally correct.',
    'tradition': 'The importance and challenges of preserving cultural or familial customs.',
    'transformation': 'A profound change in character, perspective, or circumstances.',
    'war': 'The brutal realities, strategies, and consequences of armed conflict.',
    'wealth-found': 'The discovery of fortune and its transformative effects.',
    'war-zone': 'The personal and collective experiences of life amidst conflict zones.'
  };

  // Sub Theme definitions map (matches the definitions in the UI)
  const SUBTHEME_DEFS: Record<string, string> = {
    'abduction': 'A character is kidnapped or taken against their will, sparking conflict or rescue.',
    'adventure': 'The protagonist embarks on an exciting journey full of risks and discoveries.',
    'adultery': 'A betrayal of romantic commitment, leading to emotional fallout.',
    'ambition': 'A character\'s relentless pursuit of power, success, or personal goals.',
    'ascension': 'A rise to power, enlightenment, or higher status.',
    'deliverance': 'Being rescued or freed from a dire situation.',
    'descension': 'A fall from grace, status, or moral standing.',
    'disaster': 'A catastrophic event upends lives and environments.',
    'discovery': 'Unveiling hidden truths, objects, or aspects of oneself.',
    'escape': 'A character\'s struggle to break free from confinement or danger.',
    'forbidden-love': 'A romance that defies societal, cultural, or moral boundaries.',
    'forgiveness': 'Characters confront emotional wounds to offer or seek redemption.',
    'freedom': 'The pursuit of autonomy from oppression or control.',
    'honor': 'Upholding personal or cultural codes of ethics and duty.',
    'justice': 'The moral quest to right a wrong or balance fairness.',
    'love': 'Emotional connection driving character motivation and conflicts.',
    'loyalty': 'Allegiance to a person, cause, or belief, even at great cost.',
    'madness': 'Descent into insanity, blurring reality and delusion.',
    'maturation': 'A coming-of-age journey of personal growth and responsibility.',
    'metamorphosis': 'A profound transformation in identity, form, or perspective.',
    'moral-ambiguity': 'A blurred line between right and wrong in character choices.',
    'obtaining': 'The relentless pursuit to acquire a prized object or goal.',
    'ownership': 'Themes of control, possession, or claiming what one believes is theirs.',
    'pursuit': 'A relentless chase, whether for justice, revenge, or desire.',
    'quest': 'A character\'s journey to achieve a nearly impossible objective.',
    'redemption': 'Atonement for past sins through sacrifice or good deeds.',
    'remorse': 'A character grapples with guilt and regret.',
    'rescue': 'Saving someone from imminent peril.',
    'respect': 'Earning recognition and dignity through actions or perseverance.',
    'revenge': 'Retribution for a past wrong, regardless of consequence.',
    'revolt': 'An uprising against authority or oppressive forces.',
    'rivalry': 'Intense competition between two characters or factions.',
    'sacrifice': 'Giving up something of great personal value for a higher cause.',
    'supplication': 'A desperate plea for aid, mercy, or forgiveness.',
    'survival': 'Battling overwhelming odds to stay alive.',
    'temptation': 'A character is lured toward desires that conflict with their morals.',
    'the-riddle': 'Solving a complex mystery or intellectual challenge.',
    'transformation': 'A fundamental change in a character\'s nature or circumstances.',
    'underdog': 'A lesser-powered character defies expectations against stronger opponents.',
    'wretched-excess': 'Characters driven to ruin by indulgence, greed, or obsession.'
  };
  
  // Rich text editor state for HTML content  
  const [storyHtml, setStoryHtml] = useState<string>(() => {
    // Initial empty doc with invisible markers pre-seeded so we can replace between them.
    return `${OVERVIEW_START}${OVERVIEW_END}<p>Your story begins here...</p>`;
  });

  // Legacy state (keeping for reference during migration)
  const [rawStoryText, setRawStoryText] = useState<string>(`${SX_START}\nStory Title — \n${SX_END}\n\nYour story begins here...`);
  
  // derived text shown to the user (no markers)
  const displayText = useMemo(() => stripOverviewMarkers(rawStoryText), [rawStoryText]);

  function stripOverviewMarkers(text: string) {
    // what the user sees in the textarea (markers removed)
    return text
      .split('\n')
      .filter(line => line.trim() !== SX_START && line.trim() !== SX_END)
      .join('\n');
  }

  // Build overview HTML with TRUE bold labels
  function line(label?: string, value?: string) {
    return label && value
      ? `<p><strong>${label}</strong> — ${value}</p>`
      : label
      ? `<p><strong>${label}</strong></p>`
      : '';
  }



  /**
   * Returns HTML from container start until (but not including) the 'untilNode'
   * or from 'fromNode' to the end if untilNode is null.
   */
  function sliceOuterHTML(container: HTMLElement, fromNode: ChildNode | null, untilNode: ChildNode | null) {
    const frag = document.createDocumentFragment();
    let cur = fromNode ?? container.firstChild;

    while (cur && cur !== untilNode) {
      const clone = cur.cloneNode(true);
      frag.appendChild(clone);
      cur = cur.nextSibling;
    }

    const div = document.createElement('div');
    div.appendChild(frag);
    return div.innerHTML;
  }

  /**
   * Replaces the HTML between our start/end markers.
   * If markers are missing, we re-seed them and drop any previously duplicated block.
   */
  function replaceOverviewSafe(editorHtml: string, overviewHTML: string) {
    // Normalize: Quill always wraps block content in <p>…</p>
    // We parse as DOM so wrapper tags don't break us.
    const container = document.createElement('div');
    container.innerHTML = editorHtml || '';

    let start = container.querySelector('span[data-sx-marker="overview-start"]');
    let end   = container.querySelector('span[data-sx-marker="overview-end"]');

    // If markers are missing OR out of order, re-seed a clean header
    if (!start || !end) {
      const clean = document.createElement('div');
      clean.innerHTML = `${OVERVIEW_START}${overviewHTML}${OVERVIEW_END}<p>Your story begins here...</p>`;
      return clean.innerHTML;
    }

    // Build a range that covers everything between markers
    // We'll rebuild innerHTML with three slices: [before][header][after]
    const beforeHtml = sliceOuterHTML(container, container.firstChild, start);
    const afterHtml  = sliceOuterHTML(container, end, null);

    const nextHtml =
      beforeHtml +
      OVERVIEW_START + overviewHTML + OVERVIEW_END +
      afterHtml;

    return nextHtml;
  }

  function buildOverviewBlock(opts: {
    title?: string;
    projectType?: string; // e.g., "Screenplay"
    pages?: number | null;
    minutes?: number | null;
    genreLabel?: string | null;
    genreDef?: string | null;
    subGenreLabel?: string | null;
    subGenreDef?: string | null;
    themeLabel?: string | null;
    themeDef?: string | null;
    subThemeLabel?: string | null;
    subThemeDef?: string | null;
    centralConflictLabel?: string | null;
    centralConflictDef?: string | null;
  }) {
    const { title, projectType, pages, minutes, genreLabel, genreDef, subGenreLabel, subGenreDef, themeLabel, themeDef, subThemeLabel, subThemeDef, centralConflictLabel, centralConflictDef } = opts;

    // SINGLE title line only — never duplicate
    const lines: string[] = [];
    if (title?.trim()) lines.push(`**Story Title — ${title.trim()}**`);

    // Project Type line (only when we have a type)
    if (projectType) {
      const parts: string[] = [projectType];
      if (typeof pages === 'number')   parts.push(`${pages} pages`);
      if (typeof minutes === 'number') parts.push(`${minutes} mins`);
      lines.push(`**Project Type — ${parts.join(' / ')}**`);
    }

    // ---- Genre ----
    if (genreLabel) {
      lines.push(`**Genre — ${genreLabel}**`);
      if (genreDef?.trim()) {
        // keep the "indented second line" look from your reference
        lines.push(`  **${genreLabel} : ${genreDef.trim()}**`);
      }
    }

    // ---- Sub Genre ----
    if (subGenreLabel) {
      lines.push(`**Sub Genre — ${subGenreLabel}**`);
      if (subGenreDef?.trim()) {
        lines.push(`  **${subGenreLabel} : ${subGenreDef.trim()}**`);
      }
    }

    // ---- Theme ----
    if (themeLabel) {
      lines.push(`**Theme — ${themeLabel}**`);
      if (themeDef?.trim()) {
        lines.push(`  **${themeLabel} : ${themeDef.trim()}**`);
      }
    }

    // ---- Sub Theme ----
    if (subThemeLabel) {
      lines.push(`**Sub Theme — ${subThemeLabel}**`);
      if (subThemeDef?.trim()) {
        lines.push(`  **${subThemeLabel} : ${subThemeDef.trim()}**`);
      }
    }

    // ---- Central Conflict ----
    if (centralConflictLabel) {
      lines.push(`**Central Conflict — ${centralConflictLabel}**`);
      if (centralConflictDef?.trim()) {
        lines.push(`  **${centralConflictLabel} : ${centralConflictDef.trim()}**`);
      }
    }

    return [SX_START, ...lines, SX_END].join('\n');
  }

  function upsertOverviewBlock(rawText: string, block: string) {
    const startIdx = rawText.indexOf(SX_START);
    const endIdx = rawText.indexOf(SX_END);

    if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
      // replace current block
      const before = rawText.slice(0, startIdx);
      const after  = rawText.slice(endIdx + SX_END.length);
      // ensure we keep neat spacing around the block
      return `${before.trimEnd()}\n${block}\n${after.trimStart()}`;
    }
    // no markers yet — inject at top
    return `${block}\n\n${rawText}`.trimEnd();
  }

  /** Reinsert markers before persisting, in case user removed them */
  function ensureMarkersBeforeSave(displayText: string, currentOverviewBlock: string) {
    // If display already contains the block lines (without markers), we still write the
    // official block (with markers) on top and then the user text below (sans the block),
    // to avoid duplication.
    const withoutOverviewLines = displayText
      .split('\n')
      .filter(l =>
        !l.startsWith('Story Title —') &&
        !l.startsWith('Project Type —') &&
        !l.startsWith('Genre —') &&
        !l.startsWith('Sub Genre —') &&
        !l.startsWith('Theme —') &&
        !l.startsWith('Sub Theme —') &&
        !l.trim().match(/^([A-Za-z].*?)\s:\s/) // strips indented "<Genre/SubGenre/Theme/SubTheme> : def" line
      )
      .join('\n')
      .trimStart();

    return `${currentOverviewBlock}\n\n${withoutOverviewLines}`.trimEnd();
  }

  // Determine active tab from current route
  const LENGTH_PRESETS: Record<string, Array<{label:string; pages:number; mins:number}>> = {
    Worldbuilding: [{ label: 'N/A', pages: 0, mins: 0 }],
    Novel: [
      { label: 'Short (200 pages / n/a)', pages: 200, mins: 0 },
      { label: 'Standard (300 pages / n/a)', pages: 300, mins: 0 },
      { label: 'Long (400 pages / n/a)', pages: 400, mins: 0 },
    ],
    Script: [
      { label: 'Half‑hour TV (30 / 30)', pages: 30, mins: 30 },
      { label: 'Hour TV (60 / 60)', pages: 60, mins: 60 },
    ],
    Screenplay: [
      { label: 'Feature Short (80 / 80)', pages: 80, mins: 80 },
      { label: 'Feature Standard (100 / 100)', pages: 100, mins: 100 },
      { label: 'Feature Long (120 / 120)', pages: 120, mins: 120 },
    ],
  };

  function applyProjectTypeToBuilder(type: string, pages: number | '', mins: number | '') {
    setProjectType(type);
    setLengthPages(pages);
    setLengthMinutes(mins);
  }

  const getActiveTab = () => {
    if (location === '/dashboard') return 'dashboard';
    const match = location.match(/\/builder\/(.+)/);
    return match ? match[1] : 'dashboard';  // Default to dashboard instead of story
  };
  
  const activeTab = getActiveTab();

  const handleTabChange = (tabId: string) => {
    navigate(`/builder/${tabId}`);
  };

  // Derive genre label and definition
  const genreLabel = genre ? (GENRE_LABELS[genre] ?? null) : null;
  const genreDef = genreLabel ? (GENRE_DEFS[genre] ?? '') : '';

  // Derive sub-genre label and definition
  const subGenreLabel = subGenre ? (SUBGENRE_LABELS[subGenre] ?? subGenre) : null;
  const subGenreDef = subGenreLabel ? (SUBGENRE_DEFS[subGenre] ?? '') : '';

  // Derive theme label and definition  
  const themeLabel = theme ? (theme.charAt(0).toUpperCase() + theme.slice(1).replace(/-/g, ' ')) : null;
  const themeDef = themeLabel ? (THEME_DEFS[theme] ?? '') : '';

  // Derive sub-theme label and definition
  const subThemeLabel = subTheme ? (subTheme.charAt(0).toUpperCase() + subTheme.slice(1).replace(/-/g, ' ')) : null;  
  const subThemeDef = subThemeLabel ? (SUBTHEME_DEFS[subTheme] ?? '') : '';

  // Derive central conflict label and definition
  const centralConflictOption = CENTRAL_CONFLICT_OPTIONS.find(opt => opt.value === centralConflict);
  const centralConflictLabel = centralConflictOption?.label || null;
  const centralConflictDef = centralConflict ? (CENTRAL_CONFLICT_DEFS[centralConflict] ?? '') : '';

  // on type, update ONLY the "display" portion; we'll reinsert markers on save
  const onChangeDisplay = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // we keep the current overview block we last computed
    const block = buildOverviewBlock({ 
      title: projectName, 
      projectType, 
      pages: typeof lengthPages === 'number' ? lengthPages : null, 
      minutes: typeof lengthMinutes === 'number' ? lengthMinutes : null,
      genreLabel,
      genreDef,
      subGenreLabel,
      subGenreDef,
      themeLabel,
      themeDef,
      subThemeLabel,
      subThemeDef,
      centralConflictLabel,
      centralConflictDef
    });
    const merged = ensureMarkersBeforeSave(e.target.value, block);
    setRawStoryText(merged);
  };

  // Keep the overview single-title and invisible markers during updates
  useEffect(() => {
    // whenever any overview field changes, rebuild the block and upsert into raw
    const newBlock = buildOverviewBlock({
      title: projectName || '',
      projectType: projectType || undefined,
      pages: typeof lengthPages === 'number' ? lengthPages : null,
      minutes: typeof lengthMinutes === 'number' ? lengthMinutes : null,
      genreLabel: genreLabel || null,
      genreDef: genreDef || null,
      subGenreLabel: subGenreLabel || null,
      subGenreDef: subGenreDef || null,
      themeLabel: themeLabel || null,
      themeDef: themeDef || null,
      subThemeLabel: subThemeLabel || null,
      subThemeDef: subThemeDef || null,
      centralConflictLabel: centralConflictLabel || null,
      centralConflictDef: centralConflictDef || null,
    });

    setRawStoryText(prev => upsertOverviewBlock(prev ?? '', newBlock));
  }, [projectName, projectType, lengthPages, lengthMinutes, genreLabel, genreDef, subGenreLabel, subGenreDef, themeLabel, themeDef, subThemeLabel, subThemeDef, centralConflictLabel, centralConflictDef]);

  // Update rich text editor with HTML overview (debounced for better UX)
  useEffect(() => {
    const id = setTimeout(() => {
      // Build project type string
      const projectTypeDisplay = projectType ? (() => {
        const parts: string[] = [projectType];
        if (typeof lengthPages === 'number') parts.push(`${lengthPages} pages`);
        if (typeof lengthMinutes === 'number') parts.push(`${lengthMinutes} mins`);
        return parts.join(' / ');
      })() : undefined;

      const overviewHTML = buildOverviewHTML({
        title: projectName,
        projectType: projectTypeDisplay,
        genreLabel: genreLabel || undefined,
        genreDef: genreDef || undefined,
        subGenreLabel: subGenreLabel || undefined,
        subGenreDef: subGenreDef || undefined,
        themeLabel: themeLabel || undefined,
        themeDef: themeDef || undefined,
        subThemeLabel: subThemeLabel || undefined,
        subThemeDef: subThemeDef || undefined,
        conflictLabel: centralConflictLabel || undefined,
        conflictDef: centralConflictDef || undefined,
      });

      setStoryHtml(prev => replaceOverviewSafe(prev, overviewHTML));
    }, 250);
    
    return () => clearTimeout(id);
  }, [
    projectName,
    projectType, lengthPages, lengthMinutes,
    genreLabel, genreDef,
    subGenreLabel, subGenreDef,
    themeLabel, themeDef,
    subThemeLabel, subThemeDef,
    centralConflictLabel, centralConflictDef
  ]);

  // Central Conflict state and last applied tracking
  const [lastAppliedConflict, setLastAppliedConflict] = useState<string>('');
  
  // Keep track of latest HTML content for sections
  const [latestOverviewHTML, setLatestOverviewHTML] = useState<string>('');
  const [latestBeatsHTML, setLatestBeatsHTML] = useState<string>('');
  
  // Use the existing storyHtml state from above

  // Add overviewInputProps for LeftSidebar compatibility
  const overviewInputProps = {
    onFocus: () => console.log("[OVERVIEW] focus"),
    onBlur: () => console.log("[OVERVIEW] blur")
  };

  // Synchronize overview changes to the editor
  useEffect(() => {
    const overviewData = {
      title: projectName,
      projectType: projectType && lengthPages && lengthMinutes 
        ? `${projectType} / ${lengthPages} pages / ${lengthMinutes} mins`
        : projectType,
      genreLabel: genreLabel,
      genreDef: genreDef,
      subGenreLabel: subGenreLabel,
      subGenreDef: subGenreDef,
      themeLabel: themeLabel,
      themeDef: themeDef,
      subThemeLabel: subThemeLabel,
      subThemeDef: subThemeDef,
      conflictLabel: centralConflictLabel,
      conflictDef: centralConflictDef,
    };

    const overviewHTML = buildOverviewHTML(overviewData);
    const updatedHtml = replaceOverviewSafe(storyHtml, overviewHTML);
    
    if (updatedHtml !== storyHtml) {
      setStoryHtml(updatedHtml);
    }
  }, [
    projectName, projectType, lengthPages, lengthMinutes,
    genreLabel, genreDef, subGenreLabel, subGenreDef,
    themeLabel, themeDef, subThemeLabel, subThemeDef,
    centralConflictLabel, centralConflictDef, storyHtml
  ]);
  


  // Handle sub-genre change (single value)
  const handleSubGenreChange = (value: string) => {
    setSubGenre(value);
  };

  // Handle Central Conflict change with conflict-based story beats insertion
  const handleCentralConflictChange = (value: string) => {
    console.log('[CC onChange]', value);
    setCentralConflict(value);

    // If there is no beats template for this conflict, do nothing.
    if (!CONFLICT_BEATS[value]) {
      console.log('[CC] No beats template for', value);
      return;
    }

    if (lastAppliedConflict === value) {
      console.log('[CC] Already applied conflict', value);
      return;
    }

    console.log('[CC] Generating beats for', value);
    // Generate new beats HTML using the conflict beats data
    const beats = CONFLICT_BEATS[value];
    const newBeatsHTML = beatsToHTML(beats);
    setLatestBeatsHTML(newBeatsHTML);
    
    // Update the editor content immediately by adding beats to current content
    setStoryHtml(currentHtml => {
      console.log('[CC] Current HTML length:', currentHtml.length);
      const hasBeats = currentHtml.includes(BEATS_START) && currentHtml.includes(BEATS_END);
      console.log('[CC] Has existing beats:', hasBeats);
      
      if (hasBeats) {
        // Replace existing beats block
        const updatedHtml = currentHtml.replace(
          new RegExp(`${BEATS_START}[\\s\\S]*?${BEATS_END}`), 
          newBeatsHTML
        );
        console.log('[CC] Replaced beats, new length:', updatedHtml.length);
        return updatedHtml;
      } else {
        // Append beats after overview (or at end if no overview)
        if (currentHtml.includes(OVERVIEW_END)) {
          const updatedHtml = currentHtml.replace(
            OVERVIEW_END,
            `${OVERVIEW_END}\n\n${newBeatsHTML}`
          );
          console.log('[CC] Added beats after overview, new length:', updatedHtml.length);
          return updatedHtml;
        } else {
          const updatedHtml = `${currentHtml}\n\n${newBeatsHTML}`;
          console.log('[CC] Appended beats at end, new length:', updatedHtml.length);
          return updatedHtml;
        }
      }
    });
    
    setLastAppliedConflict(value);
  };

  // Overview changes are now automatically handled by useEffect

  const handleProjectTypeChange = (val: string) => {
    setProjectType(val);
    const presets = LENGTH_PRESETS[val] ?? [];

    if (val === 'Worldbuilding') {
      // N/A — apply immediately with no modal
      setLengthPages(0); setLengthMinutes(0);
      applyProjectTypeToBuilder(val, '', ''); // no pages/mins in header
      return;
    }

    // Preselect first preset then open modal
    if (presets.length) {
      setLengthPages(presets[0].pages);
      setLengthMinutes(presets[0].mins);
    } else {
      setLengthPages(''); setLengthMinutes('');
    }
    setLengthModalOpen(true);
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

  // Central Conflict beats effect
  useEffect(() => {
    console.log('[CC effect] centralConflict:', centralConflict);
    console.log('[CC effect] lastAppliedConflict:', lastAppliedConflict);
    
    if (!centralConflict || !CONFLICT_BEATS[centralConflict]) {
      console.log('[CC effect] No conflict or no beats for:', centralConflict);
      return;
    }

    if (lastAppliedConflict === centralConflict) {
      console.log('[CC effect] Already applied this conflict');
      return;
    }

    console.log('[CC effect] Applying beats for:', centralConflict);
    const beats = CONFLICT_BEATS[centralConflict];
    const newBeatsHTML = beatsToHTML(beats);
    
    setStoryHtml(currentHtml => {
      console.log('[CC effect] Current HTML length:', currentHtml.length);
      const hasBeats = currentHtml.includes(BEATS_START) && currentHtml.includes(BEATS_END);
      console.log('[CC effect] Has existing beats:', hasBeats);
      
      if (hasBeats) {
        const updatedHtml = currentHtml.replace(
          new RegExp(`${BEATS_START}[\\s\\S]*?${BEATS_END}`), 
          newBeatsHTML
        );
        console.log('[CC effect] Replaced beats, new length:', updatedHtml.length);
        return updatedHtml;
      } else {
        if (currentHtml.includes(OVERVIEW_END)) {
          const updatedHtml = currentHtml.replace(
            OVERVIEW_END,
            `${OVERVIEW_END}\n\n${newBeatsHTML}`
          );
          console.log('[CC effect] Added beats after overview, new length:', updatedHtml.length);
          return updatedHtml;
        } else {
          const updatedHtml = `${currentHtml}\n\n${newBeatsHTML}`;
          console.log('[CC effect] Appended beats at end, new length:', updatedHtml.length);
          return updatedHtml;
        }
      }
    });
    
  }, [centralConflict]);

  // Old Quill sync logic removed - now using controlled ReactQuill component




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
            <LeftSidebar 
              activeTab={activeTab}
              projectName={projectName}
              onProjectNameChange={setProjectName}
              onProjectTypeChange={handleProjectTypeChange}
              genre={genre}
              onGenreChange={setGenre}
              subGenre={subGenre}
              onSubGenreChange={handleSubGenreChange}
              theme={theme}
              onThemeChange={setTheme}
              subTheme={subTheme}
              onSubThemeChange={setSubTheme}
              centralConflict={centralConflict}
              onCentralConflictChange={handleCentralConflictChange}
              overviewInputProps={overviewInputProps}
            />
          </div>
          
          {/* Main Content - Dashboard fixed, Story tab dynamic, other tabs static */}
          <div className={`transition-all duration-300 ${
            activeTab === 'dashboard' 
              ? 'col-span-19' 
              : activeTab === 'story'
                ? (isFriendsListOpen || isSiteLinksOpen ? 'col-span-19' : 'col-span-22')
                : 'col-span-22' // Other builder tabs without panels
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
                          {/* Enhanced Toolbar - Google Docs Style - Hidden for now, using Quill's built-in toolbar */}
                          <div className="border-b border-gray-200 px-4 py-2 hidden">
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
                          
                          {/* Rich Text Editor Content - Fixed height to prevent AI assistant movement */}
                          <div className="h-[520px] md:h-[560px] lg:h-[600px] overflow-auto rounded-md border m-4">
                            <div id="story-editor">
                              <RichEditor
                                value={storyHtml}
                                onChange={(html) => setStoryHtml(html)}
                                className="w-full h-full"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Story Assistant - Fixed position at bottom */}
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
          
          {/* Right Rail - Dashboard shows fixed Friends panel, Story shows dynamic stacked panels */}
          {activeTab === 'dashboard' ? (
            <div className="col-span-3 relative z-40">
              <DashboardRightSidebar />
            </div>
          ) : (
            activeTab === 'story' && (isFriendsListOpen || isSiteLinksOpen) && (
              <div className="col-span-3 relative z-40">
                <div className="h-full flex flex-col" style={{ width: '280px' }}>
                  {/* FRIENDS LIST (top, fills available space) */}
                  <div className={`flex-1 overflow-y-auto transition-transform duration-300 ${
                    isFriendsListOpen ? 'translate-x-0' : 'translate-x-full'
                  }`}>
                    <StoryRightSidebar />
                  </div>

                  {/* SITE LINKS (bottom, fixed height) */}
                  <div className={`transition-transform duration-300 border-t border-slate-600 ${
                    isSiteLinksOpen ? 'translate-x-0' : 'translate-x-full'
                  }`} style={{ height: '240px' }}>
                    <SiteLinksSidebar />
                  </div>
                </div>
              </div>
            )
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
                <LeftSidebar 
                  activeTab={activeTab}
                  projectName={projectName}
                  onProjectNameChange={setProjectName}
                  onProjectTypeChange={handleProjectTypeChange}
                  genre={genre}
                  onGenreChange={setGenre}
                  subGenre={subGenre}
                  onSubGenreChange={handleSubGenreChange}
                  theme={theme}
                  onThemeChange={setTheme}
                  subTheme={subTheme}
                  onSubThemeChange={setSubTheme}
                  centralConflict={centralConflict}
                  onCentralConflictChange={handleCentralConflictChange}
                />
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
                <DashboardRightSidebar />
                <RightIconSidebar 
                  onFriendsListToggle={() => setIsFriendsListOpen(!isFriendsListOpen)}
                  onSiteLinksToggle={() => setIsSiteLinksOpen(!isSiteLinksOpen)}
                  activeTab={activeTab}
                />
              </div>
            </div>
          </div>
        )}

        {/* Project Type Length Modal */}
        <Dialog open={lengthModalOpen} onOpenChange={setLengthModalOpen}>
          <DialogContent className="sm:max-w-[520px]">
            <DialogHeader>
              <DialogTitle>Set length for {projectType}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <RadioGroup
                onValueChange={(v) => {
                  const [p, m] = v.split("|");
                  setLengthPages(p === '' ? '' : Number(p));
                  setLengthMinutes(m === '' ? '' : Number(m));
                }}
                defaultValue={
                  typeof lengthPages === 'number' || typeof lengthMinutes === 'number'
                    ? `${lengthPages || ''}|${lengthMinutes || ''}` : ''
                }
              >
                {(LENGTH_PRESETS[projectType] ?? []).map((opt) => (
                  <div key={opt.label} className="flex items-center space-x-2 rounded-md border p-2">
                    <RadioGroupItem id={opt.label} value={`${opt.pages}|${opt.mins}`} />
                    <Label htmlFor={opt.label}>{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="customPages">Custom pages</Label>
                  <Input
                    id="customPages" type="number" min={0} placeholder="e.g., 95"
                    value={lengthPages === '' ? '' : lengthPages}
                    onChange={(e) => setLengthPages(e.target.value === '' ? '' : Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="customMins">Custom minutes</Label>
                  <Input
                    id="customMins" type="number" min={0} placeholder="e.g., 95"
                    value={lengthMinutes === '' ? '' : lengthMinutes}
                    onChange={(e) => setLengthMinutes(e.target.value === '' ? '' : Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setLengthModalOpen(false)}>Cancel</Button>
              <Button
                onClick={() => {
                  applyProjectTypeToBuilder(projectType, lengthPages, lengthMinutes);
                  setLengthModalOpen(false);
                }}
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}