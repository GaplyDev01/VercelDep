import React from 'react';
import { BarChart, Plus, MessageCircle, Settings, Brain, LineChart } from 'lucide-react';
import FrogHeadSVG from './FrogHeadSVG';

interface GooeyMenuProps {
  onModeSwitch: () => void;
  isPerplexityMode: boolean;
}

const GooeyMenu: React.FC<GooeyMenuProps> = ({ onModeSwitch, isPerplexityMode }) => {
  return (
    <>
      <nav className="menu">
        <input type="checkbox" className="menu-open" name="menu-open" id="menu-open"/>
        <label className="menu-open-button" htmlFor="menu-open">
          <FrogHeadSVG className="w-7 h-7 text-white transform scale-[1.15]" />
        </label>
        
        <a href="#" className="menu-item" onClick={() => onModeSwitch()}>
          <Brain className="w-6 h-6" />
        </a>
        <a href="#" className="menu-item">
          <LineChart className="w-6 h-6" />
        </a>
        <a href="#" className="menu-item">
          <Plus className="w-6 h-6" />
        </a>
        <a href="#" className="menu-item">
          <MessageCircle className="w-6 h-6" />
        </a>
        <a href="#" className="menu-item">
          <Settings className="w-6 h-6" />
        </a>
      </nav>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="hidden">
        <defs>
          <filter id="shadowed-goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
            <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow" />
            <feOffset in="shadow" dx="1" dy="1" result="shadow" />
            <feBlend in2="shadow" in="goo" result="goo" />
            <feBlend in2="goo" in="SourceGraphic" result="mix" />
          </filter>
        </defs>
      </svg>

      <style jsx>{`
        .menu {
          filter: url('#shadowed-goo');
          position: relative;
          width: 380px;
          height: 80px;
          box-sizing: border-box;
          font-size: 20px;
          text-align: left;
          margin-left: -190px;
          left: 50%;
        }

        .menu-item, .menu-open-button {
          background: #10B981;
          border-radius: 100%;
          width: 50px;
          height: 50px;
          position: absolute;
          top: 20px;
          color: white;
          text-align: center;
          line-height: 50px;
          transform: translate3d(0,0,0);
          transition: transform ease-out 200ms;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .menu-open {
          display: none;
        }

        .menu-item:hover {
          background: white;
          color: #10B981;
        }

        .menu-item:nth-child(3) { transition-duration: 70ms; }
        .menu-item:nth-child(4) { transition-duration: 130ms; }
        .menu-item:nth-child(5) { transition-duration: 190ms; }
        .menu-item:nth-child(6) { transition-duration: 250ms; }
        .menu-item:nth-child(7) { transition-duration: 310ms; }

        .menu-open-button {
          z-index: 2;
          transition-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1.275);
          transition-duration: 400ms;
          transform: scale(1.1,1.1) translate3d(0,0,0);
          cursor: pointer;
        }

        .menu-open-button:hover {
          transform: scale(1.2,1.2) translate3d(0,0,0);
        }

        .menu-open:checked + .menu-open-button {
          transition-timing-function: linear;
          transition-duration: 200ms;
          transform: scale(0.8,0.8) translate3d(0,0,0) rotate(45deg);
        }

        .menu-open:checked ~ .menu-item {
          transition-timing-function: cubic-bezier(0.935, 0.000, 0.340, 1.330);
        }

        .menu-open:checked ~ .menu-item:nth-child(3) {
          transition-duration: 160ms;
          transform: translate3d(114.355px, -37.6198px, 0);
        }
        .menu-open:checked ~ .menu-item:nth-child(4) {
          transition-duration: 240ms;
          transform: translate3d(77.0375px, -92.8223px, 0);
        }
        .menu-open:checked ~ .menu-item:nth-child(5) {
          transition-duration: 320ms;
          transform: translate3d(0.0px, -115px, 0);
        }
        .menu-open:checked ~ .menu-item:nth-child(6) {
          transition-duration: 400ms;
          transform: translate3d(-77.0375px, -92.8223px, 0);
        }
        .menu-open:checked ~ .menu-item:nth-child(7) {
          transition-duration: 480ms;
          transform: translate3d(-114.355px, -37.6198px, 0);
        }
      `}</style>
    </>
  );
};

export default GooeyMenu;
