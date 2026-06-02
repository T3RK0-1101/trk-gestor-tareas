import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

const categorias = [
  { id: 'productividad', label: 'Productividad', icon: '⚡' },
  { id: 'salud', label: 'Salud', icon: '🫀' },
  { id: 'estudio', label: 'Técnicas de estudio', icon: '📖' },
  { id: 'motivacion', label: 'Motivación', icon: '🎯' },
];

export default function Consejos() {
  const [categoriaActiva, setCategoriaActiva] = useState('productividad');
  const [pregunta, setPregunta] = useState('');
  const [consejo, setConsejo] = useState('');
  const [cargando, setCargando] = useState(false);
  const [modo, setModo] = useState('categoria');

  const getConsejo = async () => {
    setCargando(true);
    setConsejo('');
    try {
      const body = modo === 'libre'
        ? { pregunta }
        : { categoria: categoriaActiva };
      const res = await api.post('/consejos', body);
      setConsejo(res.data.consejo);
    } catch {
      setConsejo('Error al obtener el consejo, intenta de nuevo.');
    }
    setCargando(false);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="flex min-h-screen bg-[#111118]">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-base font-semibold text-[#a99cc2] mb-6 uppercase tracking-widest">Consejos</h2>

        <div className="max-w-2xl">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setModo('categoria')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition ${modo === 'categoria' ? 'bg-[#4a3f6b] text-white' : 'bg-[#1c1c26] text-[#8a7faa] border border-[#2e2e3d] hover:border-[#6b5f8a]'}`}
            >
              Por categoría
            </button>
            <button
              onClick={() => setModo('libre')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition ${modo === 'libre' ? 'bg-[#4a3f6b] text-white' : 'bg-[#1c1c26] text-[#8a7faa] border border-[#2e2e3d] hover:border-[#6b5f8a]'}`}
            >
              Cuéntame tu situación
            </button>
          </div>

          {modo === 'categoria' && (
            <div className="grid grid-cols-2 gap-3 mb-6">
              {categorias.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategoriaActiva(cat.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition ${
                    categoriaActiva === cat.id
                      ? 'bg-[#4a3f6b] border-[#6b5f8a] text-white'
                      : 'bg-[#1c1c26] border-[#2e2e3d] text-[#8a7faa] hover:border-[#6b5f8a]'
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          )}

          {modo === 'libre' && (
            <div className="mb-6">
              <label className="block text-[#8a7faa] text-xs mb-2 uppercase tracking-wider">¿Qué está pasando? Cuéntame</label>
              <textarea
                value={pregunta}
                onChange={(e) => setPregunta(e.target.value)}
                placeholder="Ej: Tengo muchos exámenes esta semana y no sé por dónde empezar..."
                rows={4}
                className="w-full bg-[#111118] border border-[#2e2e3d] text-white placeholder-[#4a4360] rounded-lg px-4 py-3 focus:outline-none focus:border-[#6b5f8a] text-sm resize-none"
              />
            </div>
          )}

          <button
            onClick={getConsejo}
            disabled={cargando || (modo === 'libre' && !pregunta.trim())}
            className="w-full bg-[#4a3f6b] hover:bg-[#574a7a] disabled:bg-[#2a2240] disabled:text-[#5c5475] text-white py-2.5 rounded-lg font-semibold transition text-sm tracking-wide mb-6"
          >
            {cargando ? 'Generando consejo...' : '✦ Generar consejo'}
          </button>

          {consejo && (
            <div className="bg-[#1c1c26] border border-[#6b5f8a] rounded-xl p-6">
              <p className="text-[#8a7faa] text-xs uppercase tracking-widest mb-3">
                {modo === 'libre' ? '✦ Consejo personalizado' : `${categorias.find(c => c.id === categoriaActiva)?.icon} ${categorias.find(c => c.id === categoriaActiva)?.label}`}
              </p>
              <p className="text-white text-sm leading-relaxed">{consejo}</p>
            </div>
          )}

          {!consejo && !cargando && (
            <div className="bg-[#1c1c26] border border-[#2e2e3d] rounded-xl p-6 text-center">
              <p className="text-[#4a4360] text-sm">
                {modo === 'libre' ? 'Escribe tu situación y obtén un consejo personalizado' : 'Selecciona una categoría y genera un consejo'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}