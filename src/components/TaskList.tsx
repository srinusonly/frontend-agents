import React from 'react';
import { CheckCircle, Clock, PlayCircle } from 'lucide-react';
import type { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-gray-500" />;
      case 'in_progress':
        return <PlayCircle className="w-5 h-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {getStatusIcon(task.status)}
              <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">{task.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {task.assignedAgents.map((agent) => (
              <span
                key={agent.id}
                className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
              >
                {agent.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};