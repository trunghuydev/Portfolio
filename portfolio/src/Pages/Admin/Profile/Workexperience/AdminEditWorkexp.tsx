import { useAuthStore } from '@/Store/auth';
import LoadingSpinner from '@/Util/loading';

import { Typography, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useWorkExpHandlers } from './useWorkExpHandlers';
import { WorkExpCreateForm } from './WorkExpCreateForm';
import { WorkExpList } from './WorkExpList';

const { Title, Paragraph } = Typography;

const AdminEditWorkexp = () => {
  const { accessToken } = useAuthStore();
  const [showCreateForm, setShowCreateForm] = useState(false);

  if (!accessToken) {
    return <div>Vui lòng đăng nhập để chỉnh sửa thông tin cá nhân.</div>;
  }

  const {
    data,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    isCreatingTask,
    isUpdatingTask,
    isDeletingTask,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleCreateTasks,
    handleUpdateTask,
    handleDeleteTask,
  } = useWorkExpHandlers(accessToken!, 1);

  if (isLoading) return <LoadingSpinner fullPage />;

  return (
    <div className="max-w-4xl p-6 mx-auto bg-white rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <Title level={3}>Danh sách Kinh nghiệm làm việc</Title>
        <Button icon={<PlusOutlined />} onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? 'Huỷ' : 'Tạo mới'}
        </Button>
      </div>

      <Paragraph type="secondary">
        💡 Hướng dẫn: Tạo Work Experience trước rồi thêm Task. Khi xoá Work, hãy xoá hết Task trước.
      </Paragraph>

      {showCreateForm && (
        <WorkExpCreateForm
          onCreate={(values) => handleCreate(values, () => setShowCreateForm(false))}
          loading={isCreating}
          onCancel={() => setShowCreateForm(false)}
        />
      )}

      {data?.data?.length ? (
        <WorkExpList
          data={data.data}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
          isCreatingTask={isCreatingTask}
          isUpdatingTask={isUpdatingTask}
          isDeletingTask={isDeletingTask}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onCreateTasks={handleCreateTasks}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
        />
      ) : (
        <div>Không có dữ liệu kinh nghiệm làm việc.</div>
      )}
    </div>
  );
};

export default AdminEditWorkexp;
