import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  List, 
  ListOrdered,
  Link,
  ChevronDown,
  Settings
} from "lucide-react";

export default function StoryBuilder() {
  const [storyContent, setStoryContent] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'ai', content: 'Hello! I\'m your StoryXcel AI assistant. I can help you with character development, backstory creation, and creative writing suggestions for your western project.' }
  ]);
  const [chatMessage, setChatMessage] = useState("");

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

  return (
    <div className="bg-gray-100 flex flex-col h-full">
      {/* Story Overview Header */}
      <div className="bg-white border-b border-gray-200 px-4 pb-4">
        <h2 className="text-lg font-semibold text-slate-800">Story Overview</h2>
      </div>

      {/* Constrained Content Container - 15.25 inches max width */}
      <div className="flex-1 flex justify-center overflow-hidden">
        <div className="w-full max-w-[15.25in] p-4 flex flex-col h-full">
          {/* Main Story Editor Section - takes up upper portion */}
          <div className="flex justify-center items-center" style={{ height: '60%' }}>
            <Card className="rounded-lg border-0 w-full max-w-[14.5in] h-full flex flex-col bg-white">
              {/* Editor Toolbar */}
              <div className="border-b border-gray-200 px-4 py-2">
                <div className="flex items-center space-x-1">
                  {/* Font and Size Controls */}
                  <Button variant="ghost" size="sm" className="text-sm">
                    100% <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                  <div className="w-px h-6 bg-gray-300 mx-2"></div>
                  <Button variant="ghost" size="sm" className="text-sm">
                    Normal text <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-sm">
                    Arial <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-sm">
                    11 <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                  
                  <div className="w-px h-6 bg-gray-300 mx-2"></div>
                  
                  {/* Formatting Controls */}
                  <Button variant="ghost" size="sm">
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Italic className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Underline className="w-4 h-4" />
                  </Button>
                  
                  <div className="w-px h-6 bg-gray-300 mx-2"></div>
                  
                  {/* Alignment Controls */}
                  <Button variant="ghost" size="sm">
                    <AlignLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <AlignCenter className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <AlignRight className="w-4 h-4" />
                  </Button>
                  
                  <div className="w-px h-6 bg-gray-300 mx-2"></div>
                  
                  {/* List Controls */}
                  <Button variant="ghost" size="sm">
                    <List className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ListOrdered className="w-4 h-4" />
                  </Button>
                  
                  <div className="w-px h-6 bg-gray-300 mx-2"></div>
                  
                  {/* Link Control */}
                  <Button variant="ghost" size="sm">
                    <Link className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Story Content Editor */}
              <div className="flex-1 p-6">
                <div className="h-full">
                  <Textarea
                    value={storyContent}
                    onChange={(e) => setStoryContent(e.target.value)}
                    className="w-full h-full border-0 resize-none text-base leading-relaxed focus:outline-none focus:ring-0 shadow-none"
                    placeholder="Describe the Story you want to create..."
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Bottom section - scales to remaining 40% of screen */}
          <div className="flex-1 flex flex-col justify-start pt-4">
            {/* AI Story Assistant - Below main editor as shown in reference image */}
            <div className="flex justify-center flex-1">
              <Card className="rounded-lg p-4 border-0 w-full max-w-[14.5in] h-full flex flex-col" style={{ backgroundColor: '#d4dee7' }}>
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
                      placeholder="Describe your story idea..."
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!chatMessage.trim()}
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
                  >
                    Send
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}