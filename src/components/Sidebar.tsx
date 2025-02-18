import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';

function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-56 bg-neutral-900 pl-3 pt-2 pb-4 flex flex-col gap-4 border-r border-neutral-800">
      <div className="py-4 text-center">
        <h1 className="text-green-200 text-2xl font-semibold font-['Kode Mono']">Dashboard</h1>
      </div>

      {/* Home Button */}
      <div className="p-1.5">
        <Link 
          to="/"
          className="w-full h-12 pl-2 pr-4 bg-neutral-900 flex items-center gap-2 hover:bg-neutral-800 transition-colors"
        >
          <Home className="w-5 h-5 text-white" />
          <span className="text-white text-sm font-semibold font-['Kode Mono']">Home</span>
        </Link>
      </div>

      {/* Feeds Section */}
      <div className="p-1.5">
        <Link 
          to="/feeds"
          className={`w-full h-12 pl-2 pr-4 bg-neutral-900 flex items-center gap-2 hover:bg-neutral-800 transition-colors ${
            location.pathname === '/feeds' ? 'border-r-8 border-emerald-400' : ''
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 75 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.5 29H45.5" stroke={location.pathname === '/feeds' ? "#36C58C" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M29.5 37H41.5" stroke={location.pathname === '/feeds' ? "#36C58C" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M39.5 47L29.5 53V47H25.5C23.9087 47 22.3826 46.3679 21.2574 45.2426C20.1321 44.1174 19.5 42.5913 19.5 41V25C19.5 23.4087 20.1321 21.8826 21.2574 20.7574C22.3826 19.6321 23.9087 19 25.5 19H49.5C51.0913 19 52.6174 19.6321 53.7426 20.7574C54.8679 21.8826 55.5 23.4087 55.5 25V36" stroke={location.pathname === '/feeds' ? "#36C58C" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className={`text-sm font-semibold font-['Kode Mono'] ${
            location.pathname === '/feeds' ? 'text-emerald-400' : 'text-white'
          }`}>Feeds</span>
        </Link>
      </div>

      {/* Terminal Section */}
      <div className="h-14 p-1.5">
        <Link 
          to="/terminal"
          className={`w-full h-12 pl-2 pr-4 bg-neutral-900 flex items-center gap-2 hover:bg-neutral-800 transition-colors ${
            location.pathname === '/terminal' ? 'border-r-8 border-emerald-400' : ''
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 88 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31.1667 32.25L35.9167 37L31.1667 41.75" stroke={location.pathname === '/terminal' ? "#36C58C" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M39.0833 41.75H43.8333" stroke={location.pathname === '/terminal' ? "#36C58C" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23.25 27.4999C23.25 26.6601 23.5836 25.8546 24.1775 25.2607C24.7714 24.6669 25.5768 24.3333 26.4167 24.3333H48.5833C49.4232 24.3333 50.2286 24.6669 50.8225 25.2607C51.4164 25.8546 51.75 26.6601 51.75 27.4999V46.4999C51.75 47.3398 51.4164 48.1452 50.8225 48.7391C50.2286 49.333 49.4232 49.6666 48.5833 49.6666H26.4167C25.5768 49.6666 24.7714 49.333 24.1775 48.7391C23.5836 48.1452 23.25 47.3398 23.25 46.4999V27.4999Z" stroke={location.pathname === '/terminal' ? "#36C58C" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className={`text-sm font-semibold font-['Kode Mono'] ${
            location.pathname === '/terminal' ? 'text-emerald-400' : 'text-white'
          }`}>Terminal</span>
        </Link>
      </div>

      {/* PNL Section */}
      <div className="h-14 p-1.5">
        <Link 
          to="/pnl"
          className={`w-full h-12 pl-2 pr-4 bg-neutral-900 flex items-center gap-2 hover:bg-neutral-800 transition-colors ${
            location.pathname === '/pnl' ? 'border-r-8 border-emerald-400' : ''
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M37 31.3333V36.9999L39.8333 39.8333" stroke={location.pathname === '/pnl' ? "#36C58C" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M24.3209 35.5834C24.6383 32.4668 26.0921 29.5762 28.4047 27.463C30.7174 25.3499 33.7271 24.1621 36.8596 24.1263C39.9921 24.0905 43.0282 25.2093 45.3885 27.2691C47.7488 29.3289 49.2682 32.1855 49.6568 35.294C50.0453 38.4026 49.2759 41.5453 47.4952 44.1228C45.7145 46.7002 43.0473 48.5318 40.0023 49.2682C36.9574 50.0046 33.7479 49.5942 30.9863 48.1154C28.2246 46.6365 26.104 44.1926 25.0292 41.2501M24.3209 48.3334V41.2501H31.4042" stroke={location.pathname === '/pnl' ? "#36C58C" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className={`text-sm font-semibold font-['Kode Mono'] ${
            location.pathname === '/pnl' ? 'text-emerald-400' : 'text-white'
          }`}>PNL</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;