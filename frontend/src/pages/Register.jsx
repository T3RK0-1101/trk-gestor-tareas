import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { nombre, email, password });
      navigate('/login');
    } catch {
      setError('Error al registrar, intenta con otro email');
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-[#111118] flex items-center justify-center">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div className="w-full max-w-md px-6">
        <div className="text-center mb-8">
          <img src="/src/assets/logo.svg" alt="logo" className="w-16 h-16 mx-auto" />
          <h1 className="text-2xl font-bold text-white mt-2 tracking-wide">Gestor de Tareas</h1>
          <p className="text-[#5c5475] text-sm mt-1">Crea tu cuenta para comenzar</p>
        </div>

        <div className="bg-[#1c1c26] border border-[#2e2e3d] rounded-xl p-8 shadow-lg">
          <h2 className="text-base font-semibold text-[#a99cc2] mb-6 uppercase tracking-widest">Crear cuenta</h2>

          {error && (
            <div className="bg-red-950 border border-red-800 text-red-400 text-sm rounded-lg px-4 py-2.5 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-[#8a7faa] text-xs mb-1.5 uppercase tracking-wider">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full bg-[#111118] border border-[#2e2e3d] text-white placeholder-[#4a4360] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#6b5f8a] text-sm"
                placeholder="Tu nombre"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#8a7faa] text-xs mb-1.5 uppercase tracking-wider">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#111118] border border-[#2e2e3d] text-white placeholder-[#4a4360] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#6b5f8a] text-sm"
                placeholder="tu@email.com"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-[#8a7faa] text-xs mb-1.5 uppercase tracking-wider">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#111118] border border-[#2e2e3d] text-white placeholder-[#4a4360] rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#6b5f8a] text-sm"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#4a3f6b] hover:bg-[#574a7a] text-white py-2.5 rounded-lg font-semibold transition text-sm tracking-wide"
            >
              Registrarse
            </button>
          </form>

          <p className="mt-5 text-center text-[#5c5475] text-sm">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-[#a99cc2] hover:text-white transition">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}