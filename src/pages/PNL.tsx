import React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import Sidebar from '../components/Sidebar';

function PNL() {
  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-12 px-4 bg-neutral-900 flex justify-between items-center border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <button className="px-2 py-1 text-white text-xs font-['Kode Mono']">Learn More</button>
            <button className="px-2 py-1 text-white text-xs font-['Kode Mono'] flex items-center">
              How It Works
              <ChevronDown className="ml-1 w-3 h-3" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full bg-[#1F2B27] flex items-center justify-center">
              <Search className="text-white w-3 h-3" />
            </button>
            <button className="px-3 py-1.5 bg-neutral-800 rounded-lg border border-emerald-400 flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 19.5H3C2.46957 19.5 1.96086 19.2893 1.58579 18.9142C1.21071 18.5391 1 18.0304 1 17.5V11.5C1 10.9696 1.21071 10.4609 1.58579 10.0858C1.96086 9.71071 2.46957 9.5 3 9.5H13" stroke="#36C58C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-emerald-400 text-xs font-bold font-['Kode Mono']">H8D9_hFkM</span>
              <ChevronDown className="text-emerald-400 w-3 h-3" />
            </button>
          </div>
        </div>

        {/* PNL Content */}
        <div className="flex-1 bg-black overflow-y-auto p-4">
          {/* Time Period Selector */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-emerald-400 text-lg font-semibold font-['Kode Mono']">Performance Metrics</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-neutral-800 rounded-lg text-emerald-400 text-xs font-['Kode Mono'] border border-emerald-400">1D</button>
              <button className="px-3 py-1 bg-neutral-900 rounded-lg text-emerald-400 text-xs font-['Kode Mono']">1W</button>
              <button className="px-3 py-1 bg-neutral-900 rounded-lg text-emerald-400 text-xs font-['Kode Mono']">1M</button>
              <button className="px-3 py-1 bg-neutral-900 rounded-lg text-emerald-400 text-xs font-['Kode Mono']">1Y</button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-neutral-900 rounded-lg border border-emerald-400 p-4">
              <h3 className="text-emerald-400 text-sm font-['Kode Mono'] mb-2">Total PNL</h3>
              <p className="text-green-200 text-2xl font-bold font-['Kode Mono']">+$24,632.50</p>
              <span className="text-emerald-400 text-xs">+15.4%</span>
            </div>
            <div className="bg-neutral-900 rounded-lg border border-emerald-400 p-4">
              <h3 className="text-emerald-400 text-sm font-['Kode Mono'] mb-2">Win Rate</h3>
              <p className="text-green-200 text-2xl font-bold font-['Kode Mono']">76.5%</p>
              <span className="text-emerald-400 text-xs">+2.3%</span>
            </div>
            <div className="bg-neutral-900 rounded-lg border border-emerald-400 p-4">
              <h3 className="text-emerald-400 text-sm font-['Kode Mono'] mb-2">Avg. Trade</h3>
              <p className="text-green-200 text-2xl font-bold font-['Kode Mono']">$420.50</p>
              <span className="text-emerald-400 text-xs">+5.2%</span>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-neutral-900 rounded-lg border border-emerald-400 p-4">
              <h3 className="text-emerald-400 text-sm font-['Kode Mono'] mb-4">Cumulative PNL</h3>
              <div className="h-48 bg-gradient-to-b from-emerald-400/10 to-transparent rounded-lg relative">
                <div className="absolute inset-0 flex items-end">
                  <div className="w-full h-3/4 border-t border-l border-emerald-400/20">
                    <svg className="w-full h-full" preserveAspectRatio="none">
                      <path d="M0 100 Q 50 80, 100 60 T 200 40 T 300 30 T 400 20" fill="none" stroke="#36C58C" strokeWidth="2"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-neutral-900 rounded-lg border border-emerald-400 p-4">
              <h3 className="text-emerald-400 text-sm font-['Kode Mono'] mb-4">Trade Distribution</h3>
              <div className="h-48 bg-gradient-to-b from-emerald-400/10 to-transparent rounded-lg relative">
                <div className="absolute inset-0 flex items-end justify-around p-4">
                  <div className="w-8 h-32 bg-emerald-400/20 rounded-t"></div>
                  <div className="w-8 h-48 bg-emerald-400/40 rounded-t"></div>
                  <div className="w-8 h-24 bg-emerald-400/20 rounded-t"></div>
                  <div className="w-8 h-36 bg-emerald-400/30 rounded-t"></div>
                  <div className="w-8 h-16 bg-emerald-400/20 rounded-t"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Trades */}
          <div className="bg-neutral-900 rounded-lg border border-emerald-400 p-4">
            <h3 className="text-emerald-400 text-sm font-['Kode Mono'] mb-4">Recent Trades</h3>
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-neutral-800">
                  <div>
                    <span className="text-white text-sm font-['Kode Mono']">BTC/USDT</span>
                    <span className="text-white/60 text-xs ml-2">Long</span>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-400 text-sm font-['Kode Mono']">+$1,245.30</span>
                    <span className="text-white/60 text-xs ml-2">2.3%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PNL;