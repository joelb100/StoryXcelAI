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
    <Card className="bg-gray-200 rounded-lg h-full flex flex-col border-0">
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <h3 className="text-sm font-medium text-gray-700">AI Story Assistant</h3>
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      </div>
      
      {/* Chat Messages Area */}
      <div className="flex-1 bg-white rounded-lg p-3 m-4 mb-0 overflow-y-auto min-h-0" style={{scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 #f1f5f9'}}>
        <div className="space-y-3">
          {chatMessages.length === 0 ? (
            <div className="rounded-lg p-3 bg-blue-100 max-w-[85%]">
              <p className="text-sm text-gray-800">
                Hello! I'm your StoryXcel AI assistant. I can help you with character development, backstory creation, and creative writing suggestions for your western project.
              </p>
            </div>
          ) : (
            chatMessages.map((message) => (
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
            ))
          )}
        </div>
      </div>
      
      {/* Chat Input Area */}
      <div className="p-4">
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
    </Card>
  );
}