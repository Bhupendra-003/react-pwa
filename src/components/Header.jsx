import { Settings, Lightbulb, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

const Header = ({ onMenuClick }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = () => {
    const options = { weekday: 'short', day: '2-digit', month: 'long' };
    return currentTime.toLocaleDateString('en-US', options);
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    }).toLowerCase();
  };

  return (
    <div className="py-4 border-neutral-700 flex justify-between items-center bg-neutral-900">
      <div className="flex gap-2 md:gap-3">
        <button 
          onClick={onMenuClick}
          className="md:hidden text-white hover:bg-neutral-800 rounded-md transition-colors"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-lg md:text-2xl font-semibold leading-10 text-white truncate">My Day</h1>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <div className="text-right">
          <div className="text-base md:text-2xl text-white font-medium">{formatDate()}</div>
          <div className='text-xs sm:text-sm mt-1 md:text-xl text-neutral-300'>{formatTime()}</div>
        </div>
        
        <div className="flex items-center gap-1 md:gap-3">
          <button className="bg-transparent border-none text-neutral-300 cursor-pointer p-1.5 md:p-2 rounded-md transition-all hover:bg-neutral-800 hover:text-white flex items-center justify-center">
            <Settings className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button className="bg-transparent border-none text-neutral-300 cursor-pointer p-1.5 md:p-2 rounded-md transition-all hover:bg-neutral-800 hover:text-white flex items-center justify-center">
            <Lightbulb className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
