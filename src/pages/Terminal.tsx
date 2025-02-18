import React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import ChatUI from '../components/ChatUI';

function Terminal() {
  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 px-6 bg-neutral-900 flex justify-between items-center border-b border-neutral-800">
          <div className="flex items-center gap-3.5">
            <button className="p-2.5 text-white font-['Kode Mono']">Learn More</button>
            <button className="p-2.5 text-white font-['Kode Mono'] flex items-center">
              How It Works
              <ChevronDown className="ml-2" />
            </button>
          </div>
          <div className="flex items-center gap-3.5">
            <button className="w-10 h-10 rounded-full bg-[#1F2B27] flex items-center justify-center">
              <Search className="text-white w-4 h-4" />
            </button>
            <button className="px-4 py-2 bg-neutral-800 rounded-xl border border-emerald-400 flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 19.5H3C2.46957 19.5 1.96086 19.2893 1.58579 18.9142C1.21071 18.5391 1 18.0304 1 17.5V11.5C1 10.9696 1.21071 10.4609 1.58579 10.0858C1.96086 9.71071 2.46957 9.5 3 9.5H13" stroke="#36C58C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-emerald-400 text-sm font-bold font-['Kode Mono']">H8D9_hFkM</span>
              <ChevronDown className="text-emerald-400 w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-black overflow-hidden relative">
          <div className="absolute inset-0 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute left-0 top-[50%] opacity-20">
              <div className="w-[400px] h-[400px] rounded-full bg-emerald-400/5 filter blur-3xl"></div>
            </div>
            <div className="absolute right-0 bottom-[20%] opacity-20">
              <div className="w-[400px] h-[400px] rounded-full bg-emerald-400/5 filter blur-3xl"></div>
            </div>
          </div>

          {/* Terminal Chat UI */}
          <div className="relative z-10 h-full">
            <ChatUI />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terminal;