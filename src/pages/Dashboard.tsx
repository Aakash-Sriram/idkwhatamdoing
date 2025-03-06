
import { Clock, Brain, BookOpen, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, Aakash</h1>
          <p className="text-gray-600 dark:text-gray-400">Let's continue your learning journey</p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces"
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
      </div>

      {/* Today's Schedule */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Schedule</h2>
          <Clock className="text-blue-600" size={20} />
        </div>
        <div className="space-y-4">
          {/* Schedule items would go here */}
          <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white">Advanced Mathematics</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">10:00 AM - 11:30 AM</p>
            </div>
            <span className="px-3 py-1 text-sm text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/40 rounded-full">
              In Progress
            </span>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="text-purple-600" size={20} />
            <h3 className="font-semibold text-gray-900 dark:text-white">Focus Areas</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">AI suggests focusing on Calculus today</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="text-green-600" size={20} />
            <h3 className="font-semibold text-gray-900 dark:text-white">Progress</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">You're 15% ahead of schedule</p>
        </div>
      </div>

      {/* Recent Notes */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Notes</h2>
          <BookOpen className="text-blue-600" size={20} />
        </div>
        <div className="space-y-4">
          {/* Note previews would go here */}
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white">Quantum Mechanics Overview</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Key concepts of wave functions and probability...
            </p>
            <div className="flex gap-2 mt-2">
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">Physics</span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">Chapter 5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}