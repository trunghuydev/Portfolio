import Sidebar from '@/Components/AdminSidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full p-6 ml-48">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
