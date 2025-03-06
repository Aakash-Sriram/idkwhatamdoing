import React from 'react';
import { CheckSquare, Clock, AlertCircle } from 'lucide-react';

export default function Tasks() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tasks</h1>
        <CheckSquare className="text-blue-600" size={24} />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['All', 'Today', 'Upcoming', 'Completed'].map(filter => (
          <button
            key={filter}
            className={`px-4 py-1 rounded-full text-sm whitespace-nowrap
              ${filter === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}
            `}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {[
          {
            title: 'Complete Physics Assignment',
            deadline: 'Today, 11:59 PM',
            priority: 'high',
            subject: 'Physics'
          },
          {
            title: 'Review Math Notes',
            deadline: 'Tomorrow, 2:00 PM',
            priority: 'medium',
            subject: 'Mathematics'
          }
        ].map((task, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <div className="flex items-start gap-3">
              <button className="mt-1 w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white">{task.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <div className="flex items-center text-gray-500">
                    <Clock size={14} className="mr-1" />
                    {task.deadline}
                  </div>
                  <div className="flex items-center text-orange-500">
                    <AlertCircle size={14} className="mr-1" />
                    {task.priority}
                  </div>
                </div>
                <span className="inline-block mt-2 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">
                  {task.subject}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}