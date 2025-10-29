import Sidebar from '../../Sidebar/';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Outlet /> {/* Aquí se muestra el contenido que cambia */}
      </div>
    </div>
  );
}