import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { Layers, Settings } from "lucide-react";

const builderTabs = [
  { name: "Dashboard", path: "/" },
  { name: "Production Builder", path: "/builder/production" },
  { name: "Asset Builder", path: "/builder/asset" },
  { name: "Story Builder", path: "/builder/story" },
  { name: "Script Builder", path: "/builder/script" },
  { name: "Deck Builder", path: "/builder/deck" },
];

export default function Header() {
  const { user } = useAuth();
  const [location, navigate] = useLocation();

  const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.[0] || '';
    const last = lastName?.[0] || '';
    return (first + last).toUpperCase() || 'U';
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Layers className="text-white text-sm" />
            </div>
            <h1 className="text-xl font-bold text-charcoal">StoryXcel</h1>
          </div>
          
          {/* Builder Navigation Tabs */}
          <nav className="flex space-x-1">
            {builderTabs.map((tab) => (
              <Button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                variant="ghost"
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  location === tab.path
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'bg-gray-500 text-white hover:bg-gray-600'
                }`}
              >
                {tab.name}
              </Button>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="p-2">
            <Settings className="text-gray-600" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.profileImageUrl} />
              <AvatarFallback className="bg-accent text-white text-sm font-semibold">
                {getInitials(user?.firstName, user?.lastName)}
              </AvatarFallback>
            </Avatar>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.location.href = "/api/logout"}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
