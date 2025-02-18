import React from 'react';

const ChatUI: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-neutral-900">
      {/* Chat messages area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Messages will be rendered here */}
      </div>
      
      {/* Input area */}
      <div className="p-6 border-t border-neutral-800">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-neutral-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
