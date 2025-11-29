import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TaskList from './components/TaskList';
import NotificationHandler from './components/NotificationHandler';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <NotificationHandler />
      <div className="flex h-screen overflow-hidden bg-neutral-900">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden w-full relative">
          <div className="px-4 md:px-12 lg:px-48 py-8 flex-1 flex flex-col overflow-hidden">
            <Header onMenuClick={() => setIsSidebarOpen(true)} />
            <TaskList />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;