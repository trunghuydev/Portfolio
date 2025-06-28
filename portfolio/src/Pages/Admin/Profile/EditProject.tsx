import { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Typography,
  Checkbox,
  Space,
  message,
  Select,
  Popconfirm,
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAuthStore } from '@/Store/auth';
import { useProject } from '@/Hook/usegetProject';
import { Project } from '@/Interface/TProject';
import { useProjectMutations } from './Hook/useProject';

const { Title } = Typography;

const AdminEditProjects = () => {
  const [form] = Form.useForm();
  const { accessToken } = useAuthStore();
  const pageIndex = 1;
  const pageSize = 20;

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  if (!accessToken) {
    return <div>Vui lòng đăng nhập để chỉnh sửa thông tin cá nhân.</div>;
  }
  const { data: projectData, isLoading, refetch } = useProject(accessToken, pageIndex, pageSize);

  const { updateProject, deleteProject } = useProjectMutations(accessToken);

  useEffect(() => {
    if (selectedProject) {
      form.setFieldsValue({
        ...selectedProject,
        teches: selectedProject.teches.map((tech) => tech.tech_name).join(', '),
      });
    } else {
      form.resetFields();
    }
  }, [selectedProject]);

  const handleSubmit = (values: any) => {
    if (!accessToken) return;

    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key === 'teches') {
        const teches = (value as string)
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean);
        formData.append('teches', JSON.stringify(teches.map((tech) => ({ tech_name: tech }))));
      } else if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
      ) {
        formData.append(key, String(value));
      } else {
        formData.append(key, '');
      }
    });

    if (selectedProject) {
      formData.append('project_id', selectedProject.project_id);
      updateProject.mutate(
        { project_id: selectedProject.project_id, formData },
        {
          onSuccess: (res) => {
            message.success(res.message || 'Cập nhật dự án thành công!');
            refetch();
            setSelectedProject(null);
            form.resetFields();
          },
        }
      );
    } else {
      message.warning('Hiện tại chưa hỗ trợ tạo mới từ hook này!');
    }
  };

  const handleSelectProject = (projectId: string) => {
    const found = projectData?.data.find((p) => p.project_id === projectId);
    setSelectedProject(found || null);
  };

  const handleDelete = () => {
    if (!selectedProject) return;
    deleteProject.mutate(selectedProject.project_id, {
      onSuccess: () => {
        message.success('Xoá dự án thành công!');
        setSelectedProject(null);
        form.resetFields();
        refetch();
      },
    });
  };

  return (
    <div className="max-w-5xl p-6 mx-auto bg-white rounded shadow">
      <Title level={3}>Quản lý Dự án</Title>

      <div className="flex items-center gap-4 mb-6">
        <Select
          placeholder="Chọn dự án để chỉnh sửa"
          style={{ width: 300 }}
          loading={isLoading}
          onChange={handleSelectProject}
          value={selectedProject?.project_id}
        >
          {projectData?.data.map((proj) => (
            <Select.Option key={proj.project_id} value={proj.project_id}>
              {proj.project_name}
            </Select.Option>
          ))}
        </Select>

        <Button icon={<PlusOutlined />} onClick={() => setSelectedProject(null)}>
          Tạo mới dự án
        </Button>
      </div>

      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        {selectedProject && (
          <Form.Item name="project_id" hidden>
            <Input />
          </Form.Item>
        )}

        <Form.Item
          label="Tên dự án"
          name="project_name"
          rules={[{ required: true, message: 'Vui lòng nhập tên dự án' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Loại dự án" name="project_type">
          <Input />
        </Form.Item>

        <Form.Item name="is_Reality" valuePropName="checked">
          <Checkbox>Dự án thực tế</Checkbox>
        </Form.Item>

        <Form.Item label="Thời gian" name="duration">
          <Input />
        </Form.Item>

        <Form.Item label="Từ" name="from">
          <Input />
        </Form.Item>

        <Form.Item label="Đến" name="to">
          <Input />
        </Form.Item>

        <Form.Item label="URL chính" name="url_project">
          <Input />
        </Form.Item>

        <Form.Item label="Demo" name="url_demo">
          <Input />
        </Form.Item>

        <Form.Item label="GitHub" name="url_github">
          <Input />
        </Form.Item>

        <Form.Item label="Hình ảnh (URL)" name="img_url">
          <Input />
        </Form.Item>

        <Form.Item label="Hợp đồng (nếu có)" name="url_contract">
          <Input />
        </Form.Item>

        <Form.Item label="File Excel (nếu có)" name="url_excel">
          <Input />
        </Form.Item>

        <Form.Item label="Công nghệ (VD: React, NodeJS)" name="teches">
          <Input placeholder="Ngăn cách bởi dấu phẩy" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={updateProject.isPending}>
              {selectedProject ? 'Cập nhật dự án' : 'Tạo dự án'}
            </Button>

            {selectedProject && (
              <Popconfirm
                title="Bạn có chắc chắn muốn xoá dự án này?"
                onConfirm={handleDelete}
                okText="Xoá"
                cancelText="Huỷ"
              >
                <Button danger icon={<DeleteOutlined />} loading={deleteProject.isPending}>
                  Xoá dự án
                </Button>
              </Popconfirm>
            )}
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminEditProjects;
