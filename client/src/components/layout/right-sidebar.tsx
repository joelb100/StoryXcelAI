import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  UserPlus,
  MessageCircle,
  Github,
  Youtube,
  Twitter,
  Palette,
  Figma,
  Gamepad
} from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import type { FriendWithUser } from "@shared/schema";

const utilityLinks = [
  { icon: FaDiscord, bgClass: "bg-blue-500 hover:bg-blue-600", name: "Discord" },
  { icon: FaDiscord, bgClass: "bg-indigo-600 hover:bg-indigo-700", name: "Discord Alt" },
  { icon: Github, bgClass: "bg-gray-800 hover:bg-gray-900", name: "GitHub" },
  { icon: Youtube, bgClass: "bg-red-600 hover:bg-red-700", name: "YouTube" },
  { icon: Twitter, bgClass: "bg-blue-400 hover:bg-blue-500", name: "Twitter" },
  { icon: Palette, bgClass: "bg-gray-700 hover:bg-gray-800", name: "Design Tools" },
  { icon: Figma, bgClass: "bg-purple-600 hover:bg-purple-700", name: "Figma" },
  { icon: Gamepad, bgClass: "bg-gray-900 hover:bg-black", name: "Gaming" },
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'online': return 'bg-success';
    case 'away': return 'bg-accent';
    case 'busy': return 'bg-destructive';
    default: return 'bg-gray-300';
  }
};

const getStatusText = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

type RightSidebarProps = {
  showSiteLinks?: boolean; // default true keeps dashboard behavior
};

export default function RightSidebar({ showSiteLinks = true }: RightSidebarProps) {
  // Mock friends data for demo
  const mockFriends: FriendWithUser[] = [
    {
      id: 1,
      userId: "demo-user",
      friendId: "friend-1",
      status: "accepted",
      createdAt: new Date(),
      friend: {
        id: "friend-1",
        email: "sarah@example.com",
        firstName: "Sarah",
        lastName: "Penny",
        profileImageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    },
    {
      id: 2,
      userId: "demo-user", 
      friendId: "friend-2",
      status: "accepted",
      createdAt: new Date(),
      friend: {
        id: "friend-2",
        email: "joel@example.com",
        firstName: "Joel",
        lastName: "Calloway",
        profileImageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    },
    {
      id: 3,
      userId: "demo-user",
      friendId: "friend-3", 
      status: "accepted",
      createdAt: new Date(),
      friend: {
        id: "friend-3",
        email: "cole@example.com",
        firstName: "Cole",
        lastName: "Downing",
        profileImageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    },
    {
      id: 4,
      userId: "demo-user",
      friendId: "friend-4",
      status: "accepted", 
      createdAt: new Date(),
      friend: {
        id: "friend-4",
        email: "steve@example.com",
        firstName: "Steve",
        lastName: "Grady",
        profileImageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    },
    {
      id: 5,
      userId: "demo-user",
      friendId: "friend-5",
      status: "accepted",
      createdAt: new Date(), 
      friend: {
        id: "friend-5",
        email: "brooke@example.com",
        firstName: "Brooke",
        lastName: "McGraw",
        profileImageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }
  ];

  const { data: friends, isLoading: friendsLoading } = useQuery<FriendWithUser[]>({
    queryKey: ["/api/friends"],
    retry: false,
    placeholderData: mockFriends,
  });

  // Mock online status for demo (in production, this would come from real-time data)
  const mockFriendStatuses = ['online', 'offline', 'away', 'online', 'busy'];

  return (
    <aside className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      {/* Notification Banner */}
      <Card className="bg-primary/10 border-primary/20 p-3 mb-6 text-center">
        <p className="text-primary font-medium text-sm flex items-center justify-center">
          <Lightbulb className="w-4 h-4 mr-2" />
          Create! Fund your next project here!
        </p>
      </Card>

      {/* Friends List Section */}
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-4">Friends List</h3>
        
        {friendsLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3 p-2 animate-pulse">
                <div className="w-10 h-10 bg-muted rounded-full" />
                <div className="flex-1">
                  <div className="w-20 h-3 bg-muted rounded mb-1" />
                  <div className="w-12 h-2 bg-muted rounded" />
                </div>
                <div className="w-3 h-3 bg-muted rounded-full" />
              </div>
            ))}
          </div>
        ) : friends && friends.length > 0 ? (
          <div className="space-y-3">
            {friends.map((friendship, index) => (
              <div 
                key={friendship.id} 
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <Avatar className="w-10 h-10">
                  <AvatarImage src={friendship.friend.profileImageUrl} />
                  <AvatarFallback>
                    {friendship.friend.firstName?.[0]}{friendship.friend.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">
                    {friendship.friend.firstName} {friendship.friend.lastName}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {getStatusText(mockFriendStatuses[index % mockFriendStatuses.length])}
                  </p>
                </div>
                <div className={`w-3 h-3 rounded-full ${getStatusColor(mockFriendStatuses[index % mockFriendStatuses.length])}`} />
              </div>
            ))}
          </div>
        ) : (
          <Card className="p-4 text-center border-dashed border-2">
            <p className="text-muted-foreground text-sm mb-2">No friends yet</p>
            <p className="text-xs text-muted-foreground mb-3">
              Connect with other creators to collaborate
            </p>
          </Card>
        )}

        <Button 
          variant="ghost" 
          className="text-primary font-medium text-sm hover:text-primary/80 mt-3 w-full justify-start"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Friends +
        </Button>
      </div>

      {/* Utility Links Section - conditionally rendered */}
      {showSiteLinks && (
        <div className="border-t border-slate-600 pt-4">
          <h3 className="font-semibold text-lg mb-4">Idle Links</h3>
          <div className="grid grid-cols-4 gap-3">
            {utilityLinks.map((link, index) => (
              <div
                key={index}
                className={`${link.bgClass} rounded-lg p-3 flex items-center justify-center transition-colors cursor-pointer`}
                title={link.name}
              >
                <link.icon className="text-white text-xl" />
              </div>
            ))}
          </div>
          
          <Card className="mt-4 p-3 border-dashed border-2">
            <div className="text-center">
              <MessageCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">
                More integrations coming soon
              </p>
            </div>
          </Card>
        </div>
      )}
    </aside>
  );
}
