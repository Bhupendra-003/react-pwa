import { ChevronDown, ChevronUp, Star, MoreHorizontal, RotateCcw } from 'lucide-react';
import { useState } from 'react';

const TaskList = () => {
  const [tasks] = useState([
    {
      id: 1,
      title: 'Call Jason',
      section: 'Overdue',
      date: 'Yesterday',
      tag: 'Tasks',
      starred: false,
    },
    {
      id: 2,
      title: 'Email Back Mrs James',
      description: 'Email Mrs. James for the new intern we have next week from Alex Carter, a marketing student from Brookfield University. Confirm their start date, schedu...',
      section: 'Today',
      date: 'Today',
      tag: 'Tasks',
      starred: true,
    },
    {
      id: 3,
      title: 'New Design System',
      subtask: 'Update The UI System With A Modern, Cohesive Design.',
      subtaskText: '4 More Steps',
      section: 'Today',
      date: 'Today - 12th',
      tag: 'New Design',
      progress: 20,
      starred: true,
    },
    {
      id: 4,
      title: 'Continue Coding',
      section: 'Today',
      date: 'Today',
      tag: 'Tech-Upgrade',
      starred: false,
    },
  ]);

  const [expandedTask, setExpandedTask] = useState(null);

  const renderTask = (task) => (
    <div key={task.id} className="bg-neutral-800 rounded-lg p-4 mb-3 transition-all cursor-pointer hover:bg-[#2b2b2b]">
      <div className="flex items-start gap-3 mb-2">
        <div className="w-5 h-5 border-2 border-neutral-500 rounded-full cursor-pointer shrink-0 mt-0.5 transition-all hover:border-blue-500"></div>
        <div className="flex-1 min-w-0">
          <div className="text-[15px] font-medium text-white mb-1">{task.title}</div>
          {task.description && (
            <div className="text-xs text-neutral-500 mb-2">{task.description}</div>
          )}
          {task.subtask && (
            <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="3" fill="currentColor"></circle>
              </svg>
              {task.subtask}
            </div>
          )}
          {task.subtaskText && (
            <div className="text-xs text-neutral-500 mb-2">{task.subtaskText}</div>
          )}
          <div className="flex items-center gap-3 text-xs flex-wrap">
            <span className={task.date.includes('Yesterday') ? 'text-red-600' : 'text-emerald-500'}>
              {task.date}
            </span>
            {task.tag && (
              <>
                <span className="text-neutral-500">•</span>
                <span className="text-blue-500">{task.tag}</span>
              </>
            )}
          </div>
          {task.progress !== undefined && (
            <div className="mt-3">
              <div className="h-1 bg-neutral-700 rounded overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded transition-all duration-300" 
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2 items-center">
          {task.subtask && (
            <button 
              className={`bg-transparent border-none text-neutral-500 cursor-pointer p-1 flex items-center justify-center transition-transform hover:text-white ${expandedTask === task.id ? 'rotate-180' : ''}`}
              onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
            >
              <ChevronUp size={18} />
            </button>
          )}
          <button className={`bg-transparent border-none cursor-pointer p-1 flex items-center justify-center transition-colors ${task.starred ? 'text-yellow-500' : 'text-neutral-500 hover:text-yellow-500'}`}>
            <Star size={18} fill={task.starred ? 'currentColor' : 'none'} />
          </button>
          {task.tag === 'Tech-Upgrade' && (
            <button className="bg-transparent border-none text-neutral-500 cursor-pointer p-1 flex items-center justify-center hover:text-white">
              <RotateCcw size={18} />
            </button>
          )}
          <button className="bg-transparent border-none text-neutral-500 cursor-pointer p-1 flex items-center justify-center hover:text-white">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  const overdueTasks = tasks.filter(t => t.section === 'Overdue');
  const todayTasks = tasks.filter(t => t.section === 'Today');

  return (
    <div className="flex-1 overflow-y-auto py-6 px-8">
      {/* Overdue Section */}
      {overdueTasks.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-base font-semibold text-white">Overdue</h2>
            <button className="bg-transparent border-none text-neutral-400 cursor-pointer p-1 flex items-center justify-center">
              <ChevronDown size={18} />
            </button>
          </div>
          {overdueTasks.map(renderTask)}
        </div>
      )}

      {/* Today Section */}
      {todayTasks.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-base font-semibold text-white">Today</h2>
            <button className="bg-transparent border-none text-neutral-400 cursor-pointer p-1 flex items-center justify-center">
              <ChevronDown size={18} />
            </button>
          </div>
          {todayTasks.map(renderTask)}
        </div>
      )}
    </div>
  );
};

export default TaskList;
