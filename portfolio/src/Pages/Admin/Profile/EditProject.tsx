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
  Upload,
} from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [initialValues, setInitialValues] = useState<any>(null);

  if (!accessToken) {
    return <div>Vui lòng đăng nhập để chỉnh sửa thông tin cá nhân.</div>;
  }
  const { data: projectData, isLoading, refetch } = useProject(accessToken, pageIndex, pageSize);

  const { createProject, updateProject, deleteProject } = useProjectMutations(accessToken);

  useEffect(() => {
    if (selectedProject) {
      const initialData = {
        ...selectedProject,
        teches:
          selectedProject.teches && selectedProject.teches.length > 0
            ? selectedProject.teches.map((tech) => tech.tech_name).join(', ')
            : '',
      };
      form.setFieldsValue(initialData);
      setInitialValues(initialData);
      setImageFile(null);
    } else {
      form.resetFields();
      setInitialValues(null);
      setImageFile(null);
    }
  }, [selectedProject, form]);

  const handleSubmit = (values: any) => {
    if (!accessToken) return;

    const formData = new FormData();

    if (selectedProject) {
      Object.entries(values).forEach(([key, value]) => {
        if (key === 'teches') {
          const currentTechs = (initialValues?.teches || '').trim();
          const newTechs = ((value as string) || '').trim();

          if (currentTechs !== newTechs) {
            if (newTechs) {
              const teches = newTechs
                .split(',')
                .map((t: string) => t.trim())
                .filter(Boolean);
              if (teches.length > 0) {
                teches.forEach((tech: string, index: number) => {
                  formData.append(`tech[${index}].tech_name`, tech);
                });
              }
            }
          }
        } else if (key === 'project_id') {
          return;
        } else if (key === 'img_url') {
          return;
        } else if (
          typeof value === 'string' ||
          typeof value === 'number' ||
          typeof value === 'boolean'
        ) {
          const initialValue = initialValues?.[key];

          if (typeof value === 'boolean') {
            if (value !== initialValue) {
              formData.append(key, String(value));
            }
          } else {
            const normalizedValue = value === null || value === undefined ? '' : String(value);
            const normalizedInitial =
              initialValue === null || initialValue === undefined ? '' : String(initialValue);

            if (normalizedValue !== normalizedInitial && normalizedValue !== '') {
              formData.append(key, normalizedValue);
            }
          }
        }
      });

      if (imageFile) {
        formData.append('img_url', imageFile);
      }

      const formDataEntries = Array.from(formData.entries());
      if (formDataEntries.length === 0) {
        message.warning('Không có thay đổi nào để cập nhật!');
        return;
      }

      console.log('FormData contents:');
      for (const [key, val] of formDataEntries) {
        console.log(key, val);
      }

      updateProject.mutate(
        { project_id: selectedProject.project_id, formData },
        {
          onSuccess: () => {
            refetch();
            setSelectedProject(null);
            form.resetFields();
            setInitialValues(null);
          },
          onError: (error: any) => {
            console.error('Update project error details:', error);
            console.error('Error response data:', error?.response?.data);
          },
        }
      );
    } else {
      Object.entries(values).forEach(([key, value]) => {
        if (key === 'teches') {
          if (value && typeof value === 'string' && value.trim()) {
            const teches = (value as string)
              .split(',')
              .map((t: string) => t.trim())
              .filter(Boolean);
            if (teches.length > 0) {
              teches.forEach((tech: string, index: number) => {
                formData.append(`tech[${index}].tech_name`, tech);
              });
            }
          }
        } else if (
          typeof value === 'string' ||
          typeof value === 'number' ||
          typeof value === 'boolean'
        ) {
          if (value !== null && value !== undefined && key !== 'img_url') {
            formData.append(key, String(value));
          }
        }
      });

      if (imageFile) {
        formData.append('img_url', imageFile);
      }

      createProject.mutate(formData, {
        onSuccess: () => {
          refetch();
          form.resetFields();
          setInitialValues(null);
        },
      });
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

      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        validateTrigger={['onBlur', 'onSubmit']}
      >
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
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Loại dự án" name="project_type">
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item name="is_Reality" valuePropName="checked">
          <Checkbox>Dự án thực tế</Checkbox>
        </Form.Item>

        <Form.Item label="Thời gian" name="duration">
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item label="Từ" name="from">
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item label="Đến" name="to">
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item label="URL chính" name="url_project">
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item label="Demo" name="url_demo">
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item label="GitHub" name="url_github">
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item label="Hình ảnh">
          <Upload
            accept="image/*"
            showUploadList={false}
            beforeUpload={(file) => {
              setImageFile(file);
              return false;
            }}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
          {imageFile && <span className="ml-2 text-sm text-gray-600">{imageFile.name}</span>}
          {selectedProject?.img_url && !imageFile && (
            <div className="mt-2">
              <img src={selectedProject.img_url} alt="Preview" className="h-20 rounded" />
            </div>
          )}
        </Form.Item>

        <Form.Item label="Hợp đồng (nếu có)" name="url_contract">
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item label="File Excel (nếu có)" name="url_excel">
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item label="Công nghệ (VD: React, NodeJS)" name="teches">
          <Input placeholder="Ngăn cách bởi dấu phẩy" autoComplete="off" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              loading={updateProject.isPending || createProject.isPending}
            >
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
