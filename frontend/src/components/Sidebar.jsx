import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  const links = [
    { path: '/dashboard', label: 'Mis tareas', icon: '▦' },
    { path: '/vencidas', label: 'Vencidas', icon: '⚠' },
    { path: '/historial', label: 'Historial', icon: '◷' },
    { path: '/consejos', label: 'Consejos IA', icon: '✦' },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="w-56 min-h-screen bg-[#1c1c26] border-r border-[#2e2e3d] flex flex-col">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div className="px-5 py-6 border-b border-[#2e2e3d]">
        <div className="flex items-center gap-2">
          <img src="/src/assets/logo.svg" alt="logo" className="w-7 h-7" />
          <span className="text-white font-bold tracking-wide text-sm">Gestor de Tareas</span>
        </div>
        <p className="text-[#5c5475] text-xs mt-3">Hola, <span className="text-[#a99cc2] font-semibold">{usuario?.nombre}</span></p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(link => (
          <button
            key={link.path}
            onClick={() => navigate(link.path)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
              location.pathname === link.path
                ? 'bg-[#4a3f6b] text-white'
                : 'text-[#8a7faa] hover:bg-[#2a2240] hover:text-white'
            }`}
          >
            <span>{link.icon}</span>
            {link.label}
          </button>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-[#2e2e3d]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-950 transition"
        >
          <span>⏻</span>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}