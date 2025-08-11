import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

interface AIStoryAssistantProps {
  chatMessages: any[];
  chatMessage: string;
  setChatMessage: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}

export default function AIStoryAssistant({
  chatMessages,
  chatMessage,
  setChatMessage,
  handleSendMessage,
  handleKeyPress
}: AIStoryAssistantProps) {
  return (
    <div className="flex justify-center flex-1">
      <Card className="rounded-lg p-2 border-0 w-full max-w-[14.5in] h-full flex flex-col" style={{ backgroundColor: '#d4dee7' }}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-medium text-slate-700">AI Story Assistant</h3>
          <Button variant="ghost" size="sm" className="text-slate-600 p-1 h-5 w-5">
            <Settings className="w-3 h-3" />
          </Button>
        </div>
        
        {/* Compact greeting message */}
        <div className="flex-1 bg-white rounded-lg p-2 mb-2 text-xs text-slate-600 line-clamp-2">
          Hello! I'm your StoryXcel AI assistant. I can help you with character development, backstory creation, and creative writing suggestions for your western project.
        </div>
        
        {/* Compact Chat Input Area */}
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask AI about your story..."
              className="w-full px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!chatMessage.trim()}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-2 py-1 rounded text-xs font-medium transition-colors"
          >
            Send
          </button>
        </div>
      </Card>
    </div>
  );
}