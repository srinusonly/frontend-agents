import React from 'react';
import { Activity, Brain, Target } from 'lucide-react';
import type { Agent } from '../types';

interface AgentCardProps {
  agent: Agent;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const statusColors = {
    idle: 'bg-gray-100 text-gray-800',
    working: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Brain className="w-6 h-6 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[agent.status]}`}>
          {agent.status}
        </span>
      </div>
      
      <div className="text-gray-600 mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Activity className="w-4 h-4" />
          <span>{agent.role}</span>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Target className="w-4 h-4" />
          Goals
        </h4>
        <ul className="list-disc list-inside text-sm text-gray-600 pl-2">
          {agent.goals.map((goal, index) => (
            <li key={index}>{goal}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};