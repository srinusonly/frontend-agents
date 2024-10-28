import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Agent } from '../types';

interface CreateTaskFormProps {
  agents: Agent[];
  onSubmit: (data: {
    title: string;
    description: string;
    assignedAgentIds: string[];
  }) => void;
}

export const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ agents, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      assignedAgentIds: selectedAgents,
    });
    setTitle('');
    setDescription('');
    setSelectedAgents([]);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Task</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assign Agents
          </label>
          <div className="space-y-2">
            {agents.map((agent) => (
              <label key={agent.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedAgents.includes(agent.id)}
                  onChange={(e) => {
                    setSelectedAgents(
                      e.target.checked
                        ? [...selectedAgents, agent.id]
                        : selectedAgents.filter((id) => id !== agent.id)
                    );
                  }}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">{agent.name}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Task
        </button>
      </div>
    </form>
  );
};