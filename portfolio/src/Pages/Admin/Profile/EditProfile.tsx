import { useEffect, useState } from 'react';
import { Form, Input, Button, Typography, Avatar, Space, message } from 'antd';

const { Title } = Typography;

type ProfileForm = {
  name: string;
  email: string;
  bio: string;
  avatar: string;
};

// Mock dữ liệu ban đầu
const getMockProfile = async (): Promise<ProfileForm> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        name: 'Nguyễn Văn A',
        email: 'vana@example.com',
        bio: 'Lập trình viên frontend đam mê UI/UX.',
        avatar: 'https://i.pravatar.cc/150?img=12',
      });
    }, 300)
  );
};

// Mock cập nhật
const mockUpdateProfile = async (data: ProfileForm) => {
  return new Promise((resolve) => {
    console.log('🔄 Dữ liệu gửi:', data);
    setTimeout(() => resolve(data), 1000);
  });
};

const AdminEditProfile = () => {
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState<string>('');

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getMockProfile();
      form.setFieldsValue(profile);
      setAvatarUrl(profile.avatar);
    };
    fetchProfile();
  }, [form]);

  const onFinish = async (values: ProfileForm) => {
    try {
      await mockUpdateProfile(values);
      message.success('Cập nhật thành công!');
    } catch (err) {
      console.error(err);
      message.error('Lỗi khi cập nhật');
    }
  };

  return (
    <div className="max-w-2xl p-6 mx-auto bg-white rounded-md shadow-md">
      <Title level={3}>Chỉnh sửa thông tin cá nhân</Title>

      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onValuesChange={(changed) => {
          if (changed.avatar) setAvatarUrl(changed.avatar);
        }}
      >
        <Form.Item
          label="Họ và tên"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập email' },
            { type: 'email', message: 'Email không hợp lệ' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Avatar URL" name="avatar">
          <Input />
        </Form.Item>

        {avatarUrl && (
          <Space className="mb-4">
            <Avatar src={avatarUrl} size={64} />
            <span>Preview avatar</span>
          </Space>
        )}

        <Form.Item label="Giới thiệu" name="bio">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu thay đổi
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminEditProfile;
