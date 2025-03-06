import { BookOpen, CheckSquare, Calendar as CalendarIcon, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CreateNew() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New</h1>
      </div>

      <div className="grid gap-4">
        <button
          onClick={() => navigate('/notes')}
          className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
        >
          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
            <BookOpen className="text-blue-600" size={24} />
          </div>
          <div className="text-left">
            <h3 className="font-medium text-gray-900 dark:text-white">New Note</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Create a new study note</p>
          </div>
        </button>

        <button
          onClick={() => navigate('/tasks')}
          className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
        >
          <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
            <CheckSquare className="text-green-600" size={24} />
          </div>
          <div className="text-left">
            <h3 className="font-medium text-gray-900 dark:text-white">New Task</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Add a new task or assignment</p>
          </div>
        </button>

        <button
          onClick={() => navigate('/calendar')}
          className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
        >
          <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
            <CalendarIcon className="text-purple-600" size={24} />
          </div>
          <div className="text-left">
            <h3 className="font-medium text-gray-900 dark:text-white">New Event</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Schedule a new study session</p>
          </div>
        </button>
      </div>
    </div>
  );
}