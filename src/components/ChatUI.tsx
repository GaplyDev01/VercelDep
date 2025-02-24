import React, { useState } from 'react';
import { Send, ChevronDown } from 'lucide-react';
import FrogHeadSVG from './FrogHeadSVG';
import GooeyMenu from './GooeyMenu';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatUI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPerplexityMode, setIsPerplexityMode] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    setInput('');
  };

  const handleModeSwitch = () => {
    setIsPerplexityMode(!isPerplexityMode);
  };

  return (
    <div className="flex flex-col h-full bg-black border border-emerald-500/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Glowing circle */}
        <div className="absolute w-[90%] h-[90%] rounded-full bg-emerald-900/20 blur-3xl" />
        <div className="absolute w-[85%] h-[85%] rounded-full bg-emerald-800/10 blur-2xl" />
        {/* Frog SVG */}
        <FrogHeadSVG className="absolute w-[70%] h-[70%] text-emerald-500/[0.05] transform rotate-[-10deg]" />
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between px-6 py-4 border-b border-emerald-500/20 bg-black/40 backdrop-blur-3xl z-10">
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="text-emerald-500 font-['JetBrains_Mono'] text-sm font-medium">tradesXBT</h2>
        </div>
        <button className="text-emerald-500/70 hover:text-emerald-400 transition-colors">
          <ChevronDown size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="relative flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-black/40 z-10">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-lg backdrop-blur-3xl ${
                message.role === 'user'
                  ? 'bg-emerald-500/10 text-emerald-500 ml-12'
                  : 'bg-black/40 text-emerald-400 mr-12'
              } font-['JetBrains_Mono'] text-sm leading-relaxed shadow-lg shadow-emerald-500/5`}
            >
              {message.content}
              <div className={`text-xs mt-2 ${
                message.role === 'user' ? 'text-emerald-500/50' : 'text-emerald-400/50'
              }`}>
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gooey Menu */}
      <div className="relative z-20">
        <GooeyMenu onModeSwitch={handleModeSwitch} isPerplexityMode={isPerplexityMode} />
      </div>

      {/* Input area */}
      <div className="relative p-6 border-t border-emerald-500/20 bg-black/40 backdrop-blur-3xl z-10">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Send a message..."
            className="flex-1 bg-black/40 text-emerald-500 placeholder-emerald-500/30 px-4 py-3 rounded-lg border border-emerald-500/20 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 focus:outline-none font-['JetBrains_Mono'] text-sm backdrop-blur-3xl"
          />
          <button
            onClick={handleSend}
            className="p-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
