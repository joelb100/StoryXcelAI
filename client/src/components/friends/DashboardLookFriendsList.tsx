import React from "react";
import clsx from "clsx";

/**
 * Props:
 * - friends: Array<{ id: string; name: string; initials: string }>
 * - className: optional wrapper classes
 * - showHeader: defaults true ("Friends List")
 * - trailingSlot: optional ReactNode (e.g., Add Friend button row)
 */
export default function DashboardLookFriendsList({
  friends,
  className,
  showHeader = true,
  trailingSlot,
}: {
  friends: { id: string; name: string; initials: string }[];
  className?: string;
  showHeader?: boolean;
  trailingSlot?: React.ReactNode;
}) {
  // NOTE: classes below intentionally mirror the Dashboard look
  // (background ~ #47566b, text sizes, spacing).
  return (
    <aside
      className={clsx(
        "w-[280px] h-full flex flex-col bg-[#47566b] text-white",
        "rounded-none", // keep square like dashboard
        className
      )}
    >
      {showHeader && (
        <div className="px-4 pt-4 pb-2 text-sm font-semibold">Friends List</div>
      )}

      <div className="flex-1 overflow-auto">
        <ul className="px-2">
          {friends.map((f) => (
            <li
              key={f.id}
              className={clsx(
                "flex items-center gap-3 px-2 py-2 rounded-md",
                "hover:bg-white/5 transition"
              )}
            >
              <div className="w-9 h-9 rounded-full bg-slate-300/30 flex items-center justify-center text-sm font-semibold">
                {f.initials}
              </div>
              <span className="truncate text-sm">{f.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Optional extra row at bottom of friends list (e.g., Add Friend +) */}
      {trailingSlot ? <div className="px-4 py-3 border-t border-white/10">{trailingSlot}</div> : null}
    </aside>
  );
}