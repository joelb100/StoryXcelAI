import DashboardLookFriendsList from "@/components/friends/DashboardLookFriendsList";
import { UserPlus } from "lucide-react";

export default function RightSidebar() {
  // Mock friends data matching Dashboard names for consistency
  const mockFriends = [
    { id: "1", name: "Buck Rogers", initials: "BR" },
    { id: "2", name: "Peter Parker", initials: "PP" },
    { id: "3", name: "Tony Stark", initials: "TS" },
    { id: "4", name: "Sonny Crockett", initials: "SC" },
    { id: "5", name: "Robert Wagner", initials: "RW" },
    { id: "6", name: "Lando Calrissian", initials: "LC" },
    { id: "7", name: "Bob Dylan", initials: "BD" },
    { id: "8", name: "Ned Flanders", initials: "NF" }
  ];

  return (
    <DashboardLookFriendsList
      friends={mockFriends}
      trailingSlot={
        <button
          type="button"
          className="inline-flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-md bg-white/10 hover:bg-white/15 transition"
        >
          <UserPlus className="h-4 w-4" />
          Add Friend +
        </button>
      }
    />
  );
}