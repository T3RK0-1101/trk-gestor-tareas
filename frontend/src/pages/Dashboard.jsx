import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [filtro, setFiltro] = useState('todas');

  const fetchTasks = async () => {
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    const loadTasks = async () => {
      const res = await api.get('/tasks');
      setTasks(res.data);
    };
    loadTasks();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await api.post('/tasks', { title, description, dueDate });
    setTitle('');
    setDescription('');
    setDueDate('');
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const handleComplete = async (task) => {
    await api.put(`/tasks/${task.id}`, {
      title: task.title,
      description: task.description,
      status: task.status === 'completada' ? 'pendiente' : 'completada'
    });
    fetchTasks();
  };

  const tasksFiltradas = tasks.filter(task => {
    if (filtro === 'todas') return true;
    return task.status === filtro;
  });

  const hoy = new Date();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="flex min-h-screen bg-[#111118]">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <Sidebar />

      <div className="flex-1 p-6">
        <form onSubmit={handleCreate} className="bg-[#1c1c26] border border-[#2e2e3d] rounded-xl p-6 mb-6 shadow-lg shadow-purple-950 max-w-2xl">
          <h2 className="text-base font-semibold text-[#a99cc2] mb-4 uppercase tracking-widest">Nueva tarea</h2>
          <input
            type="text"
            placeholder="Título de la tarea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#111118] border border-[#2e2e3d] text-white placeholder-[#4a4360] rounded-lg px-4 py-2.5 mb-3 focus:outline-none focus:border-[#6b5f8a] text-sm"
            required
          />
          <input
            type="text"
            placeholder="Descripción (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#111118] border border-[#2e2e3d] text-white placeholder-[#4a4360] rounded-lg px-4 py-2.5 mb-3 focus:outline-none focus:border-[#6b5f8a] text-sm"
          />
          <div className="mb-4">
            <label className="block text-[#8a7faa] text-xs mb-1.5 uppercase tracking-wider">Fecha límite</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-[#111118] border border-[#2e2e3d] text-[#a99cc2] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#6b5f8a] text-sm"
            />
          </div>
          <button type="submit" className="w-full bg-[#4a3f6b] hover:bg-[#574a7a] text-white py-2.5 rounded-lg font-semibold transition text-sm tracking-wide">
            + Agregar tarea
          </button>
        </form>

        <div className="flex gap-2 mb-4 max-w-2xl">
          {['todas', 'pendiente', 'completada'].map(f => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition ${filtro === f ? 'bg-[#4a3f6b] text-white' : 'bg-[#1c1c26] text-[#8a7faa] border border-[#2e2e3d] hover:border-[#6b5f8a]'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-3 max-w-2xl">
          {tasksFiltradas.map(task => {
            const vencida = task.dueDate && new Date(task.dueDate) < hoy && task.status !== 'completada';
            return (
              <div key={task.id} className={`bg-[#1c1c26] border rounded-xl p-4 flex justify-between items-start transition ${vencida ? 'border-red-700' : 'border-[#2e2e3d] hover:border-[#3d3550]'}`}>
                <div>
                  <p className={`font-semibold text-sm ${task.status === 'completada' ? 'line-through text-[#4a4360]' : 'text-white'}`}>
                    {task.title}
                  </p>
                  {task.description && <p className="text-xs text-[#8a7faa] mt-1">{task.description}</p>}
                  {task.dueDate && (
                    <p className={`text-xs mt-2 ${vencida ? 'text-red-400' : 'text-[#5c5475]'}`}>
                      {vencida ? '⚠ Vencida: ' : '🗓 Fecha límite: '}
                      {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 ml-4 flex-shrink-0">
                  <button
                    onClick={() => handleComplete(task)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${task.status === 'completada' ? 'bg-[#2a2240] text-[#8a7faa] hover:bg-[#332b4d]' : 'bg-green-900 text-green-400 hover:bg-green-800'}`}
                  >
                    {task.status === 'completada' ? 'Deshacer' : '✓'}
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-red-950 text-red-400 hover:bg-red-900 font-medium transition"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
          {tasksFiltradas.length === 0 && (
            <p className="text-center text-[#4a4360] py-10 text-sm">No hay tareas aquí</p>
          )}
        </div>
      </div>
    </div>
  );
}