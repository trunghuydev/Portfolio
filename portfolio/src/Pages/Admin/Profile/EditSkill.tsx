import { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, Space, message, Popconfirm, Table } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useAuthStore } from '@/Store/auth';
import { useSkills } from '@/Hook/usegetSkills';
import { Skill } from '@/Interface/TSkills';
import { useSkillMutations } from './Hook/useSkillMutations';

const { Title } = Typography;

const AdminEditSkill = () => {
  const [form] = Form.useForm();
  const { accessToken } = useAuthStore();
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  if (!accessToken) {
    return <div>Vui lòng đăng nhập để chỉnh sửa skills.</div>;
  }

  const { data: skills, isLoading, refetch } = useSkills(accessToken);
  const { addSkill, updateSkill, deleteSkill, deleteAllSkills } = useSkillMutations(accessToken);

  useEffect(() => {
    if (selectedSkill) {
      form.setFieldsValue({
        skill_name: selectedSkill.skill_name,
        position: selectedSkill.position,
      });
      setIsCreating(false);
    } else {
      form.resetFields();
    }
  }, [selectedSkill, form]);

  const handleSubmit = (values: { skill_name: string; position?: string }) => {
    if (!values.skill_name) {
      message.warning('Vui lòng nhập tên skill!');
      return;
    }

    if (selectedSkill) {
      updateSkill.mutate(
        {
          skill_id: selectedSkill.skill_id,
          body: {
            skill_name: values.skill_name,
            position: values.position,
          },
        },
        {
          onSuccess: () => {
            refetch();
            setSelectedSkill(null);
            form.resetFields();
          },
        }
      );
    } else {
      addSkill.mutate(
        {
          skill_name: values.skill_name,
          position: values.position,
        },
        {
          onSuccess: () => {
            refetch();
            form.resetFields();
            setIsCreating(false);
          },
        }
      );
    }
  };

  const handleEdit = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsCreating(false);
  };

  const handleDelete = (skillId: string) => {
    deleteSkill.mutate(skillId, {
      onSuccess: () => {
        refetch();
        if (selectedSkill?.skill_id === skillId) {
          setSelectedSkill(null);
          form.resetFields();
        }
      },
    });
  };

  const handleDeleteAll = () => {
    deleteAllSkills.mutate(undefined, {
      onSuccess: () => {
        setSelectedSkill(null);
        form.resetFields();
      },
    });
  };

  const columns = [
    {
      title: 'Tên Skill',
      dataIndex: 'skill_name',
      key: 'skill_name',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Skill) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xoá skill này?"
            onConfirm={() => handleDelete(record.skill_id)}
            okText="Xoá"
            cancelText="Huỷ"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              Xoá
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="max-w-5xl p-6 mx-auto bg-white rounded shadow">
      <Title level={3}>Quản lý Skills</Title>

      <div className="mb-6">
        <Button
          icon={<PlusOutlined />}
          onClick={() => {
            setSelectedSkill(null);
            setIsCreating(true);
            form.resetFields();
          }}
        >
          Thêm Skill mới
        </Button>
        {skills && skills.length > 0 && (
          <Popconfirm
            title="Bạn có chắc chắn muốn xoá tất cả skills?"
            onConfirm={handleDeleteAll}
            okText="Xoá"
            cancelText="Huỷ"
          >
            <Button danger className="ml-2" icon={<DeleteOutlined />}>
              Xoá tất cả
            </Button>
          </Popconfirm>
        )}
      </div>

      {(isCreating || selectedSkill) && (
        <Form 
          layout="vertical" 
          form={form} 
          onFinish={handleSubmit} 
          className="mb-6"
          validateTrigger={['onBlur', 'onSubmit']}
        >
          <Form.Item
            label="Tên Skill"
            name="skill_name"
            rules={[{ required: true, message: 'Vui lòng nhập tên skill' }]}
          >
            <Input placeholder="VD: React, Node.js, Python" autoComplete="off" />
          </Form.Item>

          <Form.Item label="Position" name="position">
            <Input placeholder="VD: Frontend, Backend, Full Stack" autoComplete="off" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={addSkill.isPending || updateSkill.isPending}
              >
                {selectedSkill ? 'Cập nhật' : 'Thêm mới'}
              </Button>
              <Button
                onClick={() => {
                  setSelectedSkill(null);
                  setIsCreating(false);
                  form.resetFields();
                }}
              >
                Huỷ
              </Button>
            </Space>
          </Form.Item>
        </Form>
      )}

      <Table
        columns={columns}
        dataSource={skills}
        rowKey="skill_id"
        loading={isLoading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default AdminEditSkill;
