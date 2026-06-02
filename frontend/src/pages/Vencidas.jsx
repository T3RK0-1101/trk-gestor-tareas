import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

export default function Vencidas() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const res = await api.get('/tasks/vencidas');
      setTasks(res.data);
    };
    loadTasks();
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="flex min-h-screen bg-[#111118]">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-base font-semibold text-[#a99cc2] mb-6 uppercase tracking-widest">Tareas vencidas</h2>
        <div className="space-y-3 max-w-2xl">
          {tasks.map(task => (
            <div key={task.id} className="bg-[#1c1c26] border border-red-900 rounded-xl p-4">
              <p className="font-semibold text-sm text-white">{task.title}</p>
              {task.description && <p className="text-xs text-[#8a7faa] mt-1">{task.description}</p>}
              <p className="text-xs text-red-400 mt-2">
                ⚠ Venció: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </div>
          ))}
          {tasks.length === 0 && (
            <p className="text-center text-[#4a4360] py-10 text-sm">No tienes tareas vencidas</p>
          )}
        </div>
      </div>
    </div>
  );
}