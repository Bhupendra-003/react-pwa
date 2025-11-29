import { Calendar, Menu, Plus, Search, StickyNote, ChevronDown, MoreHorizontal, Sun, X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-[320px] bg-zinc-800 border-r border-neutral-700 
        flex flex-col p-4 shrink-0 transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* User Profile */}
        <div className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors mb-4">
          <img 
            src="https://i.pravatar.cc/150?img=5" 
            alt="Jessie" 
            className="w-8 h-8 rounded-full object-cover" 
          />
          <div className="flex-1">
            <div className="text-sm font-medium text-white">Jessie</div>
          </div>
          <ChevronDown size={16} className="text-neutral-500" />
          
          {/* Close button for mobile */}
          <button 
            onClick={onClose}
            className="md:hidden ml-2 text-neutral-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Add Task Button */}
        <button className="w-full py-2.5 px-4 text-white border-none rounded-lg text-sm cursor-pointer flex items-center gap-2 transition-colors hover:bg-zinc-700 mb-4">
          <Plus size={18} />
          Add Task
        </button>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full py-2 px-3 pl-9 rounded-md text-white text-sm outline-none transition-colors focus:border-blue-500 bg-neutral-700/50"
          />
        </div>

        {/* Navigation */}
        <div className="mb-5">
          <div className="flex items-center gap-3 py-2.5 px-3 rounded-md cursor-pointer transition-colors mb-1 text-white text-sm bg-neutral-700/30">
            <Sun size={18} className="shrink-0" />
            <span className="flex-1">My Day</span>
            <span className="text-neutral-500 text-xs">4</span>
          </div>
          <div className="flex items-center gap-3 py-2.5 px-3 rounded-md cursor-pointer transition-colors mb-1 hover:bg-neutral-700 text-white text-sm">
            <Calendar size={18} className="shrink-0" />
            <span className="flex-1">Calendar</span>
            <span className="text-neutral-500 text-xs">2</span>
          </div>
        </div>

        {/* Workspace */}
        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider my-4 mx-3">Workspace</div>
        <div className="mb-5">
          <div className="flex items-center gap-3 py-2.5 px-3 rounded-md cursor-pointer transition-colors mb-1 hover:bg-neutral-700 text-white text-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span className="flex-1">All</span>
            <span className="text-neutral-500 text-xs">12</span>
          </div>
          <div className="flex items-center gap-3 py-2.5 px-3 rounded-md cursor-pointer transition-colors mb-1 hover:bg-neutral-700 text-white text-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <polyline points="9 11 12 14 22 4"></polyline>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>
            <span className="flex-1">Tasks</span>
            <span className="text-neutral-500 text-xs">8</span>
          </div>
          <div className="flex items-center gap-3 py-2.5 px-3 rounded-md cursor-pointer transition-colors mb-1 hover:bg-neutral-700 text-white text-sm">
            <StickyNote size={18} className="shrink-0" />
            <span className="flex-1">Notes</span>
            <span className="text-neutral-500 text-xs">4</span>
          </div>
        </div>

        {/* Projects */}
        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider my-4 mx-3">Projects</div>
        <div className="mb-5">
          <div className="flex items-center gap-2 py-2 px-3 rounded-md cursor-pointer transition-colors mb-1 hover:bg-neutral-700 text-white text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M2 12h20" />
            </svg>
            <span className="flex-1">Tech-Upgrade</span>
            <span className="text-neutral-500 text-xs">3</span>
          </div>
          <div className="flex items-center gap-2 py-2 px-3 rounded-md cursor-pointer transition-colors mb-1 hover:bg-neutral-700 text-white text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M2 12h20" />
            </svg>
            <span className="flex-1">New-Design</span>
            <span className="text-neutral-500 text-xs">3</span>
          </div>
        </div>

        {/* New List Button */}
        <button className="flex items-center gap-2 py-2.5 px-3 bg-transparent text-neutral-400 border-none rounded-md text-sm cursor-pointer transition-colors hover:bg-neutral-700 mt-auto">
          <Plus size={16} />
          New List
          <MoreHorizontal size={16} className="ml-auto" />
        </button>
      </div>
    </>
  );
};

export default Sidebar;
