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
    <div className="flex justify-center">
      <div className="rounded-lg p-4 w-full flex flex-col" style={{ backgroundColor: '#d4dee7' }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-slate-700">AI Story Assistant</h3>
          <Button variant="ghost" size="sm" className="text-slate-600 p-1">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Chat Messages Area */}
        <div className="flex-1 bg-white rounded-lg p-3 mb-3 overflow-y-auto">
          <div className="space-y-3">
            {chatMessages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-2 rounded-lg text-sm ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white rounded-br-none' 
                    : 'bg-gray-100 text-slate-700 rounded-bl-none'
                }`}>
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat Input Area */}
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask AI about your story..."
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!chatMessage.trim()}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}