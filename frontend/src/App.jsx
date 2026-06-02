import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Vencidas from './pages/Vencidas';
import Historial from './pages/Historial';
import Consejos from './pages/Consejos';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/vencidas" element={<PrivateRoute><Vencidas /></PrivateRoute>} />
        <Route path="/historial" element={<PrivateRoute><Historial /></PrivateRoute>} />
        <Route path="/consejos" element={<PrivateRoute><Consejos /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}