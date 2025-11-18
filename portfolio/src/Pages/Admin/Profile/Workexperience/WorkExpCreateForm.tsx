import { WorkExperiencePayload } from '@/Interface/TWorkExp';
import { Form, Input, Button, Space } from 'antd';

interface Props {
  onCreate: (values: WorkExperiencePayload) => void;
  loading?: boolean;
  onCancel?: () => void;
}

export const WorkExpCreateForm: React.FC<Props> = ({ onCreate, loading, onCancel }) => {
  const [form] = Form.useForm<WorkExperiencePayload>();

  const handleFinish = (values: WorkExperiencePayload) => {
    onCreate(values);
    form.resetFields();
  };

  return (
    <div className="p-4 mb-8 border border-blue-300 rounded">
      <Form layout="vertical" form={form} onFinish={handleFinish}>
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

        <Form.Item label="Project ID" name="project_id">
          <Input />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              Lưu
            </Button>
            <Button onClick={onCancel}>Huỷ</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};
