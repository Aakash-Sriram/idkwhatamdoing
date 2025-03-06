import { Clock, Brain, BookOpen, Activity, Award, BarChart2 } from 'lucide-react';

export default function ParentDashboard() {
  // Mock data - In a real app, this would come from a backend service
  const studentProgress = {
    name: 'Alex',
    totalStudyHours: 28,
    weeklyProgress: 85,
    completedTasks: 12,
    pendingTasks: 3,
    lastActive: '2 hours ago',
    currentFocus: 'Advanced Mathematics',
    recentGrades: [
      { subject: 'Physics', grade: 'A', date: '2024-03-15' },
      { subject: 'Mathematics', grade: 'A-', date: '2024-03-10' },
      { subject: 'Chemistry', grade: 'B+', date: '2024-03-05' }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Student Progress Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitoring {studentProgress.name}'s learning journey</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Last active: {studentProgress.lastActive}</span>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </div>

      {/* Current Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Current Activity</h2>
          <Activity className="text-blue-600" size={20} />
        </div>
        <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex-1">
            <p className="font-medium text-gray-900 dark:text-white">{studentProgress.currentFocus}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Currently studying</p>
          </div>
          <span className="px-3 py-1 text-sm text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/40 rounded-full">
            In Progress
          </span>
        </div>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="text-purple-600" size={20} />
            <h3 className="font-semibold text-gray-900 dark:text-white">Study Hours</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{studentProgress.totalStudyHours}h</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total this month</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <Award className="text-green-600" size={20} />
            <h3 className="font-semibold text-gray-900 dark:text-white">Weekly Progress</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{studentProgress.weeklyProgress}%</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Of weekly goals met</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart2 className="text-orange-600" size={20} />
            <h3 className="font-semibold text-gray-900 dark:text-white">Tasks</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {studentProgress.completedTasks}/{studentProgress.completedTasks + studentProgress.pendingTasks}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Tasks completed</p>
        </div>
      </div>

      {/* Recent Performance */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Grades</h2>
          <BookOpen className="text-blue-600" size={20} />
        </div>
        <div className="space-y-4">
          {studentProgress.recentGrades.map((grade, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{grade.subject}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{grade.date}</p>
              </div>
              <span className={`px-3 py-1 text-sm rounded-full ${
                grade.grade.startsWith('A') ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
              }`}>
                {grade.grade}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Learning Insights</h2>
          <Brain className="text-purple-600" size={20} />
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-sm text-gray-800 dark:text-gray-200">
              Based on recent performance, {studentProgress.name} shows strong understanding in Physics 
              but may benefit from additional practice in Chemical Equations.
            </p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-sm text-gray-800 dark:text-gray-200">
              Study patterns indicate peak productivity during morning hours (9 AM - 11 AM).
              Recommended to schedule challenging topics during this time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}