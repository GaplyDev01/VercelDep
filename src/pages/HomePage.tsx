import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import SocialButtons from '../components/SocialButtons';

function HomePage() {
  const [showTerminalPopup, setShowTerminalPopup] = useState(false);
  const [showInvestPopup, setShowInvestPopup] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-900 relative">
      {/* Navbar */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3.5">
          <div className="h-8 flex items-center">
            <svg width="39" height="24" viewBox="0 0 39 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.0565 23.4144C15.5857 23.2968 14.3754 23.1034 12.0136 22.5907C10.1309 22.1789 7.52546 21.1619 5.58396 20.0861C4.50814 19.481 2.76835 18.3379 2.07915 17.7832C1.33113 17.1697 0.255318 16.1107 0.112436 15.8417C-0.0388499 15.5475 -0.0388519 14.9928 0.120839 14.6818C0.415007 14.1103 1.69254 13.48 4.55017 12.4966C8.16423 11.2359 9.08876 10.7988 9.97126 9.89951C10.484 9.37841 10.9546 8.52112 11.1311 7.7815C11.2908 7.09231 11.2908 6.79814 11.1227 6.11735C10.7277 4.50363 9.36611 3.12525 7.75239 2.70501C5.86972 2.20912 3.7433 3.38579 2.70951 5.5038L2.30609 6.31907L1.82701 6.34428L1.34794 6.3695L1.28911 6.06693C1.18825 5.5038 1.70934 4.05818 2.35651 3.10844C2.76835 2.5117 3.5668 1.77208 4.19716 1.39386C5.78567 0.452523 7.97932 0.242404 9.82838 0.864359C11.005 1.25938 11.8623 1.90655 12.8121 3.12525C13.9972 4.63811 15.2663 5.3273 17.4851 5.64669C18.6198 5.80638 19.5695 5.80638 20.5865 5.64669C22.6037 5.3189 23.4862 4.91547 24.5368 3.81444C26.2513 2.01582 26.6212 1.67122 27.1338 1.36865C28.9745 0.292833 31.5548 0.208785 33.5215 1.15853C34.093 1.43588 34.3704 1.646 34.9587 2.23434C35.774 3.0412 36.1774 3.67996 36.606 4.7894C36.9002 5.55423 36.9675 6.14257 36.8078 6.45355C36.6985 6.64686 36.0934 6.68048 35.8496 6.50397C35.774 6.44514 35.5639 6.07533 35.3874 5.6803C35.2108 5.28528 34.9419 4.77259 34.7906 4.54566C33.7484 3.03279 31.9834 2.29317 30.4201 2.70501C27.386 3.50346 25.9488 6.78133 27.5625 9.20191C28.4534 10.5383 29.3443 11.0173 33.5299 12.4714C35.8916 13.2866 37.1692 13.875 37.6987 14.3877C38.0433 14.7071 38.0685 14.7659 38.0685 15.1693C38.0685 15.7745 37.9844 15.9342 37.3036 16.657C35.3033 18.7666 30.8908 21.2544 27.3356 22.2798C23.7299 23.322 20.4688 23.6834 17.0565 23.4144Z" fill="#36C58C"/>
            </svg>
            <div className="text-white text-2xl font-bold font-['Kode Mono'] ml-2">TradesXBT</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-12">
          <Link to="/" className="text-white text-base font-semibold">Home</Link>
          <a href="#" className="text-white text-base font-semibold">Roadmap</a>
          <a href="#" className="text-white text-base font-semibold">About</a>
          <a href="#" className="text-white text-base font-semibold">Team</a>
          <div className="flex items-start gap-0.5">
            <div className="text-zinc-500 text-base font-semibold">PNL</div>
            <div className="text-emerald-400 text-xs font-medium">Soon</div>
          </div>
        </div>

        <div className="flex items-center gap-16">
          <SocialButtons />
          <button className="h-12 px-3.5 py-3.5 bg-emerald-400 rounded-2xl text-white text-base font-bold">
            Buy $XBT
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 mt-24">
        <div className="max-w-3xl">
          <h2 className="text-green-200 text-5xl font-semibold mb-5">
            Welcome to<br/>TradesXBT ($XBT)
          </h2>
          <h1 className="text-6xl font-semibold mb-12">
            <span className="text-white">The </span>
            <span className="text-emerald-400">first</span>
            <span className="text-white"> Fully Autonomous </span>
            <span className="text-emerald-400">Hedge Fund</span>
          </h1>
          
          <div className="flex gap-5 mb-12">
            <button 
              onClick={() => setShowTerminalPopup(true)}
              className="h-12 px-3.5 py-3.5 bg-neutral-800 rounded-2xl border border-emerald-400 text-emerald-400 text-base font-semibold"
            >
              Terminal
            </button>
            <button 
              onClick={() => setShowInvestPopup(true)}
              className="h-12 px-3.5 py-3.5 bg-neutral-800 rounded-2xl border border-emerald-400 text-emerald-400 text-base font-semibold"
            >
              Invest With Us
            </button>
          </div>

          <div className="px-5 py-3.5 bg-gradient-to-r from-neutral-800 to-zinc-800 rounded-2xl border border-neutral-600 flex justify-between items-center">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 bg-emerald-400/40 rounded-full flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 39 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.0565 23.4144C15.5857 23.2968 14.3754 23.1034 12.0136 22.5907C10.1309 22.1789 7.52546 21.1619 5.58396 20.0861C4.50814 19.481 2.76835 18.3379 2.07915 17.7832C1.33113 17.1697 0.255318 16.1107 0.112436 15.8417C-0.0388499 15.5475 -0.0388519 14.9928 0.120839 14.6818C0.415007 14.1103 1.69254 13.48 4.55017 12.4966C8.16423 11.2359 9.08876 10.7988 9.97126 9.89951C10.484 9.37841 10.9546 8.52112 11.1311 7.7815C11.2908 7.09231 11.2908 6.79814 11.1227 6.11735C10.7277 4.50363 9.36611 3.12525 7.75239 2.70501C5.86972 2.20912 3.7433 3.38579 2.70951 5.5038L2.30609 6.31907L1.82701 6.34428L1.34794 6.3695L1.28911 6.06693C1.18825 5.5038 1.70934 4.05818 2.35651 3.10844C2.76835 2.5117 3.5668 1.77208 4.19716 1.39386C5.78567 0.452523 7.97932 0.242404 9.82838 0.864359C11.005 1.25938 11.8623 1.90655 12.8121 3.12525C13.9972 4.63811 15.2663 5.3273 17.4851 5.64669C18.6198 5.80638 19.5695 5.80638 20.5865 5.64669C22.6037 5.3189 23.4862 4.91547 24.5368 3.81444C26.2513 2.01582 26.6212 1.67122 27.1338 1.36865C28.9745 0.292833 31.5548 0.208785 33.5215 1.15853C34.093 1.43588 34.3704 1.646 34.9587 2.23434C35.774 3.0412 36.1774 3.67996 36.606 4.7894C36.9002 5.55423 36.9675 6.14257 36.8078 6.45355C36.6985 6.64686 36.0934 6.68048 35.8496 6.50397C35.774 6.44514 35.5639 6.07533 35.3874 5.6803C35.2108 5.28528 34.9419 4.77259 34.7906 4.54566C33.7484 3.03279 31.9834 2.29317 30.4201 2.70501C27.386 3.50346 25.9488 6.78133 27.5625 9.20191C28.4534 10.5383 29.3443 11.0173 33.5299 12.4714C35.8916 13.2866 37.1692 13.875 37.6987 14.3877C38.0433 14.7071 38.0685 14.7659 38.0685 15.1693C38.0685 15.7745 37.9844 15.9342 37.3036 16.657C35.3033 18.7666 30.8908 21.2544 27.3356 22.2798C23.7299 23.322 20.4688 23.6834 17.0565 23.4144Z" fill="#36C58C"/>
                </svg>
              </div>
              <div>
                <div className="text-green-200 text-base font-semibold">Contract Address</div>
                <div className="text-white text-xl font-medium">0x57fd3480581f72b0df1adead72b4181a52a1d7de</div>
              </div>
            </div>
            <button className="flex items-center gap-2 text-white">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 9.66669C5 7.31002 5 6.13085 5.7325 5.39919C6.46417 4.66669 7.64333 4.66669 10 4.66669H12.5C14.8567 4.66669 16.0358 4.66669 16.7675 5.39919C17.5 6.13085 17.5 7.31002 17.5 9.66669V13.8334C17.5 16.19 17.5 17.3692 16.7675 18.1009C16.0358 18.8334 14.8567 18.8334 12.5 18.8334H10C7.64333 18.8334 6.46417 18.8334 5.7325 18.1009C5 17.3692 5 16.19 5 13.8334V9.66669Z" stroke="#B3FFE1" strokeWidth="1.5"/>
              </svg>
              Copy
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 mt-32">
        <div className="flex flex-col items-center gap-24">
          <div className="text-center max-w-4xl">
            <h2 className="text-5xl font-bold mb-6">
              <span className="text-white">What is </span>
              <span className="text-emerald-400">TradesXBT</span>
            </h2>
            <p className="text-white text-base font-semibold mb-6">
              A Swarm of Analyzer and Trader Agents to profit from all Financial Markets with Low, Medium and High Risk investment Baskets. With a veteran team in crypto since 2012 and +20 years in Financial and Business Markets from PWC, UBS, BNY and more than 10 Venture and Hedge Funds Under Management.
            </p>
            <button className="w-48 p-3.5 bg-neutral-800 rounded-2xl border border-emerald-400 text-emerald-400 text-base font-semibold">
              Learn More
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-5 bg-neutral-800 rounded-2xl border border-emerald-400 flex items-start gap-5">
              <div className="w-14 h-14 bg-emerald-400/10 rounded-full flex items-center justify-center">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M15 1.5625C13.4253 1.5625 11.9151 2.18806 10.8016 3.30155C9.68806 4.41505 9.0625 5.92528 9.0625 7.5C9.0625 9.07472 9.68806 10.5849 10.8016 11.6984C11.9151 12.8119 13.4253 13.4375 15 13.4375C16.5747 13.4375 18.0849 12.8119 19.1984 11.6984C20.3119 10.5849 20.9375 9.07472 20.9375 7.5C20.9375 5.92528 20.3119 4.41505 19.1984 3.30155C18.0849 2.18806 16.5747 1.5625 15 1.5625Z" fill="#36C58C"/>
                </svg>
              </div>
              <div>
                <h3 className="text-white text-xl font-bold mb-2.5">Community Benefit</h3>
                <p className="text-white text-base font-medium">Our system are enabling stakeholder to join create coin</p>
              </div>
            </div>

            <div className="p-5 bg-neutral-800 rounded-2xl border border-emerald-400 flex items-start gap-5">
              <div className="w-14 h-14 bg-emerald-400/10 rounded-full flex items-center justify-center">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 13.125C20 14.16 19.44 15 18.75 15C18.06 15 17.5 14.16 17.5 13.125C17.5 12.09 18.06 11.25 18.75 11.25C19.44 11.25 20 12.09 20 13.125Z" fill="#36C58C"/>
                </svg>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-white text-xl font-bold">98%</span>
                <span className="text-white text-base font-medium">Customer satisfaction</span>
              </div>
            </div>

            <div className="p-5 bg-neutral-800 rounded-2xl border border-emerald-400 flex items-start gap-5">
              <div className="w-14 h-14 bg-emerald-400/10 rounded-full flex items-center justify-center">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.825 13.125C18.9908 12.9393 19.076 12.6954 19.0619 12.4469C19.0479 12.1984 18.9357 11.9657 18.75 11.7999C18.5644 11.6342 18.3205 11.549 18.072 11.563C17.8235 11.5771 17.5908 11.6893 17.425 11.8749L13.6613 16.0924L12.5738 14.8749C12.4076 14.6913 12.1754 14.5809 11.9281 14.5678C11.6807 14.5547 11.4383 14.6401 11.2537 14.8052C11.069 14.9704 10.9573 15.2019 10.9428 15.4491C10.9283 15.6964 11.0122 15.9394 11.1763 16.1249L12.9613 18.1249C13.0492 18.2235 13.157 18.3023 13.2775 18.3562C13.398 18.4102 13.5286 18.4381 13.6607 18.4381C13.7927 18.4381 13.9233 18.4102 14.0438 18.3562C14.1643 18.3023 14.2721 18.2235 14.36 18.1249L18.825 13.125Z" fill="#36C58C"/>
                </svg>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-white text-xl font-bold">97.6%</span>
                <span className="text-white text-base font-medium">Safety Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 mt-32">
        <div className="flex flex-col gap-12">
          <div className="flex justify-between items-center">
            <h2 className="text-5xl font-bold">
              <span className="text-white">Meet </span>
              <span className="text-emerald-400">TradesXBT </span>
              <span className="text-white">Team</span>
            </h2>
            <div className="flex gap-5">
              <button className="w-14 h-14 bg-emerald-400/10 rounded-full flex items-center justify-center">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25 15H5M5 15L12.5 7.5M5 15L12.5 22.5" stroke="#36C58C" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="w-14 h-14 bg-emerald-400/10 rounded-full flex items-center justify-center">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 15H25M25 15L17.5 7.5M25 15L17.5 22.5" stroke="#36C58C" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="flex flex-col items-center gap-2.5">
              <div className="p-1.5 rounded-full border border-emerald-400">
                <div className="w-32 h-32 bg-gradient-to-b from-neutral-800 to-neutral-800 rounded-full border-4 border-zinc-800"></div>
              </div>
              <h3 className="text-white text-xl font-bold text-center">Rayka<br/>Moradi</h3>
              <p className="text-white text-sm font-medium">Founder & CEO</p>
            </div>

            {/* Team Member 2 */}
            <div className="flex flex-col items-center gap-2.5">
              <div className="p-1.5 rounded-full border border-emerald-400">
                <div className="w-32 h-32 bg-gradient-to-b from-neutral-800 to-neutral-800 rounded-full border-4 border-zinc-800"></div>
              </div>
              <h3 className="text-white text-xl font-bold text-center">Melanie<br/>Mohr</h3>
              <p className="text-white text-sm font-medium">Blockchain Officer</p>
            </div>

            {/* Team Member 3 */}
            <div className="flex flex-col items-center gap-2.5">
              <div className="p-1.5 rounded-full border border-emerald-400">
                <div className="w-32 h-32 bg-gradient-to-b from-neutral-800 to-neutral-800 rounded-full border-4 border-zinc-800"></div>
              </div>
              <h3 className="text-white text-xl font-bold text-center">Konstantinos<br/>Papadakis</h3>
              <p className="text-white text-sm font-medium">CPO</p>
            </div>

            {/* Team Member 4 */}
            <div className="flex flex-col items-center gap-2.5">
              <div className="p-1.5 rounded-full border border-emerald-400">
                <div className="w-32 h-32 bg-gradient-to-b from-neutral-800 to-neutral-800 rounded-full border-4 border-zinc-800"></div>
              </div>
              <h3 className="text-white text-xl font-bold text-center">Michael<br/>Krützfeldt</h3>
              <p className="text-white text-sm font-medium">CMO</p>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-7">
            <div className="flex justify-center items-center gap-3.5">
              <span className="text-white text-base font-semibold">+ 10's More</span>
              <div className="flex -space-x-4">
                <img className="w-12 h-12 rounded-full border-4 border-zinc-900" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Team member" />
                <img className="w-12 h-12 rounded-full border-4 border-zinc-900" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Team member" />
                <img className="w-12 h-12 rounded-full border-4 border-zinc-900" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Team member" />
                <img className="w-12 h-12 rounded-full border-4 border-zinc-900" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Team member" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-32 border-t border-neutral-700">
        <div className="container mx-auto px-4 py-5 flex justify-between items-center">
          <div className="text-center">
            <span className="text-white text-base font-semibold">Autoramated By </span>
            <span className="text-emerald-400 text-base font-semibold">@GaplyLabs</span>
          </div>

          <div className="hidden md:flex items-center gap-12">
            <Link to="/" className="text-white text-base font-semibold">Home</Link>
            <a href="#" className="text-white text-base font-semibold">Roadmap</a>
            <a href="#" className="text-white text-base font-semibold">About</a>
            <a href="#" className="text-white text-base font-semibold">Team</a>
            <div className="flex items-start gap-0.5">
              <div className="text-zinc-500 text-base font-semibold">PNL</div>
              <div className="text-emerald-400 text-xs font-medium">Soon</div>
            </div>
          </div>

          <div className="flex items-center gap-16">
            <SocialButtons />
          </div>
        </div>
      </footer>

      {/* Popup Modals */}
      {showTerminalPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="TerminalPopup w-96 h-52 p-5 bg-neutral-800 rounded-2xl border border-emerald-400 flex-col justify-start items-start gap-6 inline-flex">
            <div className="Title self-stretch justify-between items-start inline-flex">
              <div className="Alert text-green-200 text-2xl font-semibold font-['Kode Mono']">Alert!</div>
              <button onClick={() => setShowTerminalPopup(false)} className="hover:opacity-80">
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <div className="self-stretch">
              <span className="text-white text-base font-medium font-['Kode Mono']">Reach out to </span>
              <span className="text-emerald-400 text-base font-medium font-['Kode Mono']">@GaplyORG</span>
              <span className="text-white text-base font-medium font-['Kode Mono']"> on telegram to get access if you hold 100,000 TXBT</span>
            </div>
            <Link 
              to="/terminal" 
              className="Btn self-stretch p-3.5 bg-emerald-400 rounded-2xl border border-emerald-400 justify-center items-center gap-2.5 inline-flex"
              onClick={() => setShowTerminalPopup(false)}
            >
              <div className="text-white text-base font-bold font-['Kode Mono']">GaplyORG on Telegram</div>
            </Link>
          </div>
        </div>
      )}

      {showInvestPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="InvestPopup w-96 h-52 p-5 bg-neutral-800 rounded-2xl border border-emerald-400 flex-col justify-start items-start gap-6 inline-flex">
            <div className="Title self-stretch justify-between items-start inline-flex">
              <div className="Alert text-green-200 text- text-2xl font-semibold font-['Kode Mono']">Alert!</div>
              <button onClick={() => setShowInvestPopup(false)} className="hover:opacity-80">
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <div className="self-stretch">
              <span className="text-white text-base font-medium font-['Kode Mono']">Reach out to </span>
              <span className="text-emerald-400 text-base font-medium font-['Kode Mono']">@GaplyORG</span>
              <span className="text-white text-base font-medium font-['Kode Mono']"> on telegram to get access if you hold 100,000 TXBT</span>
            </div>
            <button className="Btn self-stretch p-3.5 bg-emerald-400 rounded-2xl border border-emerald-400 justify-center items-center gap-2.5 inline-flex">
              <div className="text-white text-base font-bold font-['Kode Mono']">GaplyORG on Telegram</div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;