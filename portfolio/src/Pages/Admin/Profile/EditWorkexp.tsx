import { useState } from 'react';
import { Button, Form, Input, Space, Typography, Collapse, message } from 'antd';
import { DeleteOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons';
import { useAuthStore } from '@/Store/auth';
import { useWorkexp } from '@/Hook/usegetWorkexp';
import { useUpdateWorkexp } from './Hook/ useUpdateWorkexp';
import { useDeleteWorkexp } from './Hook/useDeleteWorkexp';

import LoadingSpinner from '@/Util/loading';
import { useCreateWorkexp } from './Hook/useCreateWorkexp';

const { Title } = Typography;
const { Panel } = Collapse;

const AdminEditWorkexp = () => {
  const { accessToken } = useAuthStore();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const pageIndex = 1;

  if (!accessToken) {
    return <div>Vui lòng đăng nhập để chỉnh sửa thông tin cá nhân.</div>;
  }

  const { data, isLoading, refetch } = useWorkexp(accessToken, pageIndex);
  const { mutate: updateWorkExp, isPending: isUpdating } = useUpdateWorkexp(accessToken);
  const { mutate: deleteWorkExp, isPending: isDeleting } = useDeleteWorkexp(accessToken);
  const { mutate: createWorkExp, isPending: isCreating } = useCreateWorkexp(accessToken);

  const handleUpdate = (values: any) => {
    const { we_id, ...payload } = values;
    updateWorkExp(
      { we_id, payload },
      {
        onSuccess: () => {
          message.success('Cập nhật thành công!');
          refetch();
        },
        onError: () => message.error('Cập nhật thất bại!'),
      }
    );
  };

  const handleDelete = (we_id: string) => {
    deleteWorkExp(we_id, {
      onSuccess: () => {
        message.success('Xoá thành công!');
        refetch();
      },
      onError: () => message.error('Xoá thất bại!'),
    });
  };

  const handleCreate = (values: any) => {
    createWorkExp(values, {
      onSuccess: () => {
        message.success('Tạo mới thành công!');
        refetch();
        setShowCreateForm(false);
      },
      onError: () => message.error('Tạo mới thất bại!'),
    });
  };

  if (isLoading) return <LoadingSpinner fullPage />;

  return (
    <div className="max-w-4xl p-6 mx-auto bg-white rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <Title level={3}>Danh sách Kinh nghiệm làm việc</Title>
        <Button icon={<PlusOutlined />} onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? 'Huỷ' : 'Tạo mới'}
        </Button>
      </div>

      {showCreateForm && (
        <div className="p-4 mb-8 border border-blue-300 rounded">
          <Form layout="vertical" onFinish={handleCreate}>
            <Form.Item
              label="Tên công ty"
              name="company_name"
              rules={[{ required: true, message: 'Vui lòng nhập tên công ty' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Vị trí" name="position">
              <Input />
            </Form.Item>

            <Form.Item label="Thời gian làm việc" name="duration">
              <Input />
            </Form.Item>

            <Form.Item label="Mô tả công việc" name="description">
              <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" loading={isCreating}>
                  Lưu
                </Button>
                <Button onClick={() => setShowCreateForm(false)}>Huỷ</Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      )}

      {data?.data?.length ? (
        <Collapse accordion>
          {data.data.map((item) => (
            <Panel header={item.company_name} key={item.we_id}>
              <Form layout="vertical" initialValues={item} onFinish={handleUpdate} key={item.we_id}>
                <Form.Item name="we_id" hidden>
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Tên công ty"
                  name="company_name"
                  rules={[{ required: true, message: 'Vui lòng nhập tên công ty' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item label="Vị trí" name="position">
                  <Input />
                </Form.Item>

                <Form.Item label="Thời gian làm việc" name="duration">
                  <Input />
                </Form.Item>

                <Form.Item label="Mô tả công việc" name="description">
                  <Input.TextArea rows={3} />
                </Form.Item>

                <Form.Item>
                  <Space>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SaveOutlined />}
                      loading={isUpdating}
                    >
                      Cập nhật
                    </Button>
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      loading={isDeleting}
                      onClick={() => handleDelete(item.we_id)}
                    >
                      Xoá
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Panel>
          ))}
        </Collapse>
      ) : (
        <div>Không có dữ liệu kinh nghiệm làm việc.</div>
      )}
    </div>
  );
};

export default AdminEditWorkexp;
