import { Collapse, Divider, Typography, Form, Input, Space, Button } from 'antd';
import { SaveOutlined, DeleteOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { WorkExp, WorkExpTask } from '@/Interface/TWorkExp';

const { Panel } = Collapse;

interface WorkExpListProps {
  data: WorkExp[];
  isUpdating: boolean;
  isDeleting: boolean;
  isCreatingTask: boolean;
  isUpdatingTask: boolean;
  isDeletingTask: boolean;
  onUpdate: (values: WorkExp) => void;
  onDelete: (we_id: string, tasksLength: number) => void;
  onCreateTasks: (
    we_id: string,
    values: { dynamicTasks?: Pick<WorkExpTask, 'task_description'>[] }
  ) => void;
  onUpdateTask: (we_id: string, mt_id: string, task_description: string) => void;
  onDeleteTask: (we_id: string, mt_id: string) => void;
}

export const WorkExpList: React.FC<WorkExpListProps> = ({
  data,
  isUpdating,
  isDeleting,
  isCreatingTask,
  isUpdatingTask,
  isDeletingTask,
  onUpdate,
  onDelete,
  onCreateTasks,
  onUpdateTask,
  onDeleteTask,
}) => {
  return (
    <Collapse accordion>
      {data?.map((item) => {
        const existingTasks = item.tasks ?? [];

        return (
          <Panel header={item.company_name} key={item.we_id}>
            <Form layout="vertical" initialValues={item} onFinish={onUpdate} key={item.we_id}>
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
                    onClick={() => onDelete(item.we_id, existingTasks.length)}
                  >
                    Xoá
                  </Button>
                </Space>
              </Form.Item>
            </Form>

            {existingTasks.length > 0 && (
              <>
                <Divider />
                <Typography.Text strong>Tasks hiện có</Typography.Text>

                {existingTasks.map((t: WorkExpTask, idx: number) => (
                  <Form
                    key={t.mt_id ?? idx}
                    layout="inline"
                    initialValues={{ task_description: t.task_description }}
                    onFinish={(values) => onUpdateTask(item.we_id, t.mt_id, values.task_description)}
                    style={{ marginTop: 8, gap: 8 }}
                  >
                    <Form.Item
                      name="task_description"
                      rules={[{ required: true, message: 'Nhập mô tả task' }]}
                      style={{ flex: 1 }}
                    >
                      <Input placeholder="Mô tả công việc..." style={{ minWidth: 320 }} />
                    </Form.Item>

                    <Form.Item>
                      <Space>
                        <Button
                          type="primary"
                          htmlType="submit"
                          size="small"
                          icon={<SaveOutlined />}
                          loading={isUpdatingTask}
                        >
                          Lưu
                        </Button>
                        <Button
                          danger
                          size="small"
                          icon={<DeleteOutlined />}
                          loading={isDeletingTask}
                          onClick={() => onDeleteTask(item.we_id, t.mt_id)}
                        >
                          Xoá
                        </Button>
                      </Space>
                    </Form.Item>
                  </Form>
                ))}
              </>
            )}

            <Divider />
            <Form
              layout="vertical"
              onFinish={(values) => onCreateTasks(item.we_id, values)}
              key={`${item.we_id}-tasks`}
            >
              <Typography.Text strong>Thêm My Tasks</Typography.Text>

              <Form.List name="dynamicTasks">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} align="start" style={{ display: 'flex', marginBottom: 8 }}>
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
  );
};
