import { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Typography,
  Avatar,
  Space,
  message,
  DatePicker,
  InputNumber,
  Upload,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useAuthStore } from '@/Store/auth';
import { useProfile } from '@/Hook/usegetInform';
import { useEditProfile } from './Hook/useEditProfile';

const { Title } = Typography;

const AdminEditProfile = () => {
  const [form] = Form.useForm();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  const { id: user_id, accessToken } = useAuthStore();

  if (!accessToken) {
    return <div>Vui lòng đăng nhập để chỉnh sửa thông tin cá nhân.</div>;
  }

  const { data: profile, isLoading: isProfileLoading } = useProfile(accessToken);
  const { mutate: updateProfile, isPending } = useEditProfile(accessToken);

  useEffect(() => {
    if (profile) {
      setAvatarPreview(profile.avatar);
      form.setFieldsValue({
        ...profile,
        dob: profile.dob ? dayjs(profile.dob, 'DD/MM/YYYY') : null,
      });
    }
  }, [profile]);

  const onFinish = async (values: any) => {
    if (!user_id) {
      return message.error('Không tìm thấy thông tin người dùng!');
    }

    const formData = new FormData();
    formData.append('user_id', user_id);

    Object.entries(values).forEach(([key, value]) => {
      if (value === null || value === undefined) return;

      if (key === 'dob' && dayjs.isDayjs(value)) {
        formData.append('dob', value.format('DD/MM/YYYY'));
      } else if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
      ) {
        formData.append(key, String(value));
      }
    });

    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    updateProfile(formData, {
      onSuccess: (res) => {
        message.success(res.message || 'Cập nhật thành công!');
      },
      onError: (err: any) => {
        console.error(err);
        message.error('Cập nhật thất bại!');
      },
    });
  };

  return (
    <div className="max-w-3xl p-6 mx-auto bg-white rounded-md shadow-md">
      <Title level={3}>Chỉnh sửa thông tin cá nhân</Title>

      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="Họ và tên" name="fullname" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Ngày sinh" name="dob">
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item label="Số điện thoại" name="phone_number">
          <Input />
        </Form.Item>

        <Form.Item label="Địa chỉ" name="address">
          <Input />
        </Form.Item>

        <Form.Item label="Trường đại học" name="university_name">
          <Input />
        </Form.Item>

        <Form.Item label="GPA" name="gpa">
          <InputNumber min={0} max={4} step={0.01} />
        </Form.Item>

        <Form.Item label="Số năm kinh nghiệm" name="workExpOfYear">
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item label="Github" name="github">
          <Input />
        </Form.Item>

        <Form.Item label="LinkedIn" name="linkedin_url">
          <Input />
        </Form.Item>

        <Form.Item label="Facebook" name="facebook_url">
          <Input />
        </Form.Item>

        <Form.Item label="Vị trí làm việc" name="position_career">
          <Input />
        </Form.Item>

        <Form.Item label="Mindset" name="mindset">
          <Input.TextArea rows={2} />
        </Form.Item>

        <Form.Item label="Giới thiệu bản thân" name="background">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Ảnh đại diện">
          <Upload
            accept="image/*"
            showUploadList={false}
            beforeUpload={(file) => {
              const isImage = file.type.startsWith('image/');
              if (!isImage) {
                message.error('Chỉ chấp nhận ảnh!');
                return Upload.LIST_IGNORE;
              }

              setAvatarFile(file);
              setAvatarPreview(URL.createObjectURL(file));
              return false;
            }}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>

          {avatarPreview && (
            <Space className="mt-3">
              <Avatar src={avatarPreview} size={64} />
              <span>Preview avatar</span>
            </Space>
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isPending || isProfileLoading}>
            Lưu thay đổi
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminEditProfile;
