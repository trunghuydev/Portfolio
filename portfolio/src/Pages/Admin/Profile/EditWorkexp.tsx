import { useState } from 'react';
import { Button, Form, Input, Space, Typography, Collapse, message, Divider } from 'antd';
import { DeleteOutlined, SaveOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useAuthStore } from '@/Store/auth';
import { useWorkexp } from '@/Hook/usegetWorkexp';
import { useUpdateWorkexp } from './Hook/ useUpdateWorkexp';
import { useDeleteWorkexp } from './Hook/useDeleteWorkexp';

import LoadingSpinner from '@/Util/loading';
import { useCreateWorkexp } from './Hook/useCreateWorkexp';

import { useCreateTask } from './Hook/useCreateTask';

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

  const { mutate: createTask, isPending: isCreatingTask } = useCreateTask(accessToken);

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

  const handleCreateTasks = (
    we_id: string,
    values: { dynamicTasks?: { task_description: string }[] }
  ) => {
    const tasks = values.dynamicTasks?.filter((t) => t?.task_description?.trim()) || [];
    if (!tasks.length) {
      message.warning('Vui lòng nhập ít nhất 1 task.');
      return;
    }
    tasks.forEach((t) => {
      createTask({ we_id, body: { task_description: t.task_description } });
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
          {data.data.map((item: any) => {
            const existingTasks: any[] =
              (item?.myTasks as any[]) ?? (item?.tasks as any[]) ?? (item?.mytask as any[]) ?? [];

            return (
              <Panel header={item.company_name} key={item.we_id}>
                <Form
                  layout="vertical"
                  initialValues={item}
                  onFinish={handleUpdate}
                  key={item.we_id}
                >
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

                {existingTasks?.length > 0 && (
                  <>
                    <Divider />
                    <Typography.Text strong>Tasks hiện có</Typography.Text>
                    <ul className="pl-5 mt-2 list-disc">
                      {existingTasks.map((t: any, idx: number) => (
                        <li key={t?.myTask_id ?? idx}>
                          {t?.task_description ?? t?.description ?? '—'}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <Divider />

                <Form
                  layout="vertical"
                  onFinish={(values) => handleCreateTasks(item.we_id, values)}
                  key={`${item.we_id}-tasks`}
                >
                  <Typography.Text strong>Thêm My Tasks</Typography.Text>

                  <Form.List name="dynamicTasks">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space
                            key={key}
                            align="start"
                            style={{ display: 'flex', marginBottom: 8 }}
                          >
                            <Form.Item
                              {...restField}
                              name={[name, 'task_description']}
                              rules={[{ required: true, message: 'Nhập mô tả task' }]}
                              style={{ minWidth: 320 }}
                            >
                              <Input placeholder="Mô tả công việc..." />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}

                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                            Thêm task
                          </Button>
                        </Form.Item>

                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            loading={isCreatingTask}
                            icon={<SaveOutlined />}
                          >
                            Lưu Task
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Form>
              </Panel>
            );
          })}
        </Collapse>
      ) : (
        <div>Không có dữ liệu kinh nghiệm làm việc.</div>
      )}
    </div>
  );
};

export default AdminEditWorkexp;
