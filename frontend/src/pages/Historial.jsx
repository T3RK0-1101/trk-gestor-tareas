import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

export default function Historial() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const res = await api.get('/tasks/historial');
      setTasks(res.data);
    };
    loadTasks();
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="flex min-h-screen bg-[#111118]">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-base font-semibold text-[#a99cc2] mb-6 uppercase tracking-widest">Historial de tareas</h2>
        <div className="space-y-3 max-w-2xl">
          {tasks.map(task => (
            <div key={task.id} className="bg-[#1c1c26] border border-[#2e2e3d] rounded-xl p-4">
              <p className="font-semibold text-sm text-[#8a7faa] line-through">{task.title}</p>
              {task.description && <p className="text-xs text-[#5c5475] mt-1">{task.description}</p>}
              <p className="text-xs text-[#4a4360] mt-2">
                Eliminada el {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
          {tasks.length === 0 && (
            <p className="text-center text-[#4a4360] py-10 text-sm">No hay tareas en el historial</p>
          )}
        </div>
      </div>
    </div>
  );
}