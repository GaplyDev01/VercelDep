import React from 'react';

const SocialButtons = () => {
  const openDiscord = () => window.open('https://discord.gg/Kq67h9AX', '_blank');
  const openTelegram = () => window.open('https://t.me/GaplyOrg', '_blank');
  const openTwitter = () => window.open('https://x.com/tradesxbt', '_blank');

  return (
    <div className="relative group">
      {/* Main Frog Icon */}
      <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border border-emerald-400 relative z-10">
        <svg width="24" height="24" viewBox="0 0 39 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.0565 23.4144C15.5857 23.2968 14.3754 23.1034 12.0136 22.5907C10.1309 22.1789 7.52546 21.1619 5.58396 20.0861C4.50814 19.481 2.76835 18.3379 2.07915 17.7832C1.33113 17.1697 0.255318 16.1107 0.112436 15.8417C-0.0388499 15.5475 -0.0388519 14.9928 0.120839 14.6818C0.415007 14.1103 1.69254 13.48 4.55017 12.4966C8.16423 11.2359 9.08876 10.7988 9.97126 9.89951C10.484 9.37841 10.9546 8.52112 11.1311 7.7815C11.2908 7.09231 11.2908 6.79814 11.1227 6.11735C10.7277 4.50363 9.36611 3.12525 7.75239 2.70501C5.86972 2.20912 3.7433 3.38579 2.70951 5.5038L2.30609 6.31907L1.82701 6.34428L1.34794 6.3695L1.28911 6.06693C1.18825 5.5038 1.70934 4.05818 2.35651 3.10844C2.76835 2.5117 3.5668 1.77208 4.19716 1.39386C5.78567 0.452523 7.97932 0.242404 9.82838 0.864359C11.005 1.25938 11.8623 1.90655 12.8121 3.12525C13.9972 4.63811 15.2663 5.3273 17.4851 5.64669C18.6198 5.80638 19.5695 5.80638 20.5865 5.64669C22.6037 5.3189 23.4862 4.91547 24.5368 3.81444C26.2513 2.01582 26.6212 1.67122 27.1338 1.36865C28.9745 0.292833 31.5548 0.208785 33.5215 1.15853C34.093 1.43588 34.3704 1.646 34.9587 2.23434C35.774 3.0412 36.1774 3.67996 36.606 4.7894C36.9002 5.55423 36.9675 6.14257 36.8078 6.45355C36.6985 6.64686 36.0934 6.68048 35.8496 6.50397C35.774 6.44514 35.5639 6.07533 35.3874 5.6803C35.2108 5.28528 34.9419 4.77259 34.7906 4.54566C33.7484 3.03279 31.9834 2.29317 30.4201 2.70501C27.386 3.50346 25.9488 6.78133 27.5625 9.20191C28.4534 10.5383 29.3443 11.0173 33.5299 12.4714C35.8916 13.2866 37.1692 13.875 37.6987 14.3877C38.0433 14.7071 38.0685 14.7659 38.0685 15.1693C38.0685 15.7745 37.9844 15.9342 37.3036 16.657C35.3033 18.7666 30.8908 21.2544 27.3356 22.2798C23.7299 23.322 20.4688 23.6834 17.0565 23.4144Z" fill="#36C58C"/>
        </svg>
      </div>

      {/* Social Icons Container */}
      <div className="absolute top-0 left-0 w-10 h-10">
        {/* Discord - Bottom */}
        <div 
          onClick={openDiscord}
          className="absolute w-10 h-10 top-[44px] opacity-0 group-hover:opacity-100 transform group-hover:translate-y-1 transition-all duration-300"
        >
          <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#8c9eff] transition-colors border border-emerald-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" className="fill-[#8c9eff] hover:fill-white transition-colors">
              <path d="M40,12c0,0-4.585-3.588-10-4l-0.488,0.976C34.408,10.174,36.654,11.891,39,14c-4.045-2.065-8.039-4-15-4s-10.955,1.935-15,4c2.346-2.109,5.018-4.015,9.488-5.024L18,8c-5.681,0.537-10,4-10,4s-5.121,7.425-6,22c5.162,5.953,13,6,13,6l1.639-2.185C13.857,36.848,10.715,35.121,8,32c3.238,2.45,8.125,5,16,5s12.762-2.55,16-5c-2.715,3.121-5.857,4.848-8.639,5.815L33,40c0,0,7.838-0.047,13-6C45.121,19.425,40,12,40,12z M17.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C21,28.209,19.433,30,17.5,30z M30.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C34,28.209,32.433,30,30.5,30z" />
            </svg>
          </div>
        </div>

        {/* Telegram - Right */}
        <div 
          onClick={openTelegram}
          className="absolute w-10 h-10 left-[44px] opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300"
        >
          <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#29b6f6] transition-colors border border-emerald-400">
            <svg height="24px" width="24px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z" className="fill-[#29b6f6]"/>
              <path d="M33.95,15l-3.746,19.126c0,0-0.161,0.874-1.245,0.874c-0.576,0-0.873-0.274-0.873-0.274l-8.114-6.733 l-3.97-2.001l-5.095-1.355c0,0-0.907-0.262-0.907-1.012c0-0.625,0.933-0.923,0.933-0.923l21.316-8.468 c-0.001-0.001,0.651-0.235,1.126-0.234C33.667,14,34,14.125,34,14.5C34,14.75,33.95,15,33.95,15z" className="fill-white"/>
              <path d="M23,30.505l-3.426,3.374c0,0-0.149,0.115-0.348,0.12c-0.069,0.002-0.143-0.009-0.219-0.043 l0.964-5.965L23,30.505z" className="fill-[#b0bec5]"/>
              <path d="M29.897,18.196c-0.169-0.22-0.481-0.26-0.701-0.093L16,26c0,0,2.106,5.892,2.427,6.912 c0.322,1.021,0.58,1.045,0.58,1.045l0.964-5.965l9.832-9.096C30.023,18.729,30.064,18.416,29.897,18.196z" className="fill-[#cfd8dc]"/>
            </svg>
          </div>
        </div>

        {/* Twitter - Left */}
        <div 
          onClick={openTwitter}
          className="absolute w-10 h-10 -left-[44px] opacity-0 group-hover:opacity-100 transform group-hover:-translate-x-1 transition-all duration-300"
        >
          <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-black transition-colors border border-emerald-400">
            <svg height="24px" width="24px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="fill-white">
              <path d="M 32.3 10.6 C 31.4 11 30.5 11.2 29.5 11.3 C 30.5 10.7 31.3 9.7 31.6 8.6 C 30.7 9.1 29.7 9.5 28.7 9.7 C 27.9 8.7 26.7 8.2 25.4 8.2 C 22.8 8.2 20.7 10.3 20.7 12.9 C 20.7 13.3 20.7 13.7 20.8 14 C 16.9 13.8 13.4 11.9 11.1 9.1 C 10.7 9.9 10.4 10.7 10.4 11.7 C 10.4 13.4 11.3 15 12.7 15.9 C 11.9 15.9 11.2 15.7 10.6 15.3 L 10.6 15.3 C 10.6 17.6 12.2 19.5 14.3 19.9 C 13.9 20 13.5 20.1 13.1 20.1 C 12.8 20.1 12.5 20.1 12.3 20 C 12.8 21.9 14.6 23.2 16.7 23.3 C 15 24.5 12.9 25.2 10.6 25.2 C 10.2 25.2 9.8 25.2 9.4 25.1 C 11.5 26.4 14 27.1 16.7 27.1 C 25.4 27.1 30.2 19.9 30.2 13.7 C 30.2 13.5 30.2 13.3 30.2 13.1 C 31.2 12.4 32 11.6 32.3 10.6 Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialButtons;