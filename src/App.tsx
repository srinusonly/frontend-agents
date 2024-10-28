import React, { useEffect, useState } from 'react';
import { Bot, LayoutGrid } from 'lucide-react';
import { AgentCard } from './components/AgentCard';
import { TaskList } from './components/TaskList';
import { CreateTaskForm } from './components/CreateTaskForm';
import { fetchAgents, fetchTasks, createTask } from './services/api';
import type { Agent, Task } from './types';

function App() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      const [agentsResponse, tasksResponse] = await Promise.all([
        fetchAgents(),
        fetchTasks(),
      ]);

      if (agentsResponse.error || tasksResponse.error) {
        setError('Failed to load data. Please try again later.');
        return;
      }

      setAgents(agentsResponse.data);
      setTasks(tasksResponse.data);
    };

    loadData();
  }, []);

  const handleCreateTask = async (data: {
    title: string;
    description: string;
    assignedAgentIds: string[];
  }) => {
    const assignedAgents = agents.filter((agent) =>
      data.assignedAgentIds.includes(agent.id)
    );

    const response = await createTask({
      title: data.title,
      description: data.description,
      status: 'pending',
      assignedAgents,
    });

    if (response.error) {
      setError('Failed to create task. Please try again.');
      return;
    }

    setTasks([...tasks, response.data]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Bot className="w-8 h-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                CrewAI Dashboard
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section>
            <div className="flex items-center space-x-2 mb-6">
              <Bot className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">AI Agents</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {agents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center space-x-2 mb-6">
              <LayoutGrid className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
            </div>
            <div className="space-y-6">
              <CreateTaskForm agents={agents} onSubmit={handleCreateTask} />
              <TaskList tasks={tasks} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;