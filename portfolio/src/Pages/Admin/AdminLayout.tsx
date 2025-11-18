import Sidebar from '@/Components/AdminSidebar/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useAuthStore } from '@/Store/auth';

const AdminLayout = () => {
  const navigate = useNavigate();
  const userName = useAuthStore((state) => state.userName);

  const handleViewCV = () => {
    if (userName) {
      navigate(`/${userName}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full p-6 ml-48">
        <div className="mb-4">
          <Button icon={<HomeOutlined />} onClick={handleViewCV} type="primary">
            Quay về xem CV
          </Button>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
