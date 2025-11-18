import React, { useState } from 'react';
import { Form, Input, Button, Card, Tabs, message, Modal } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useLogin } from '@/Pages/Login/Hook/useLogin';
import { useRegister } from '@/Pages/Login/Hook/useRegister';
import { useCheckUsername } from '@/Hook/useCheckUsername';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/Store/auth';

const { TabPane } = Tabs;

const LandingPage: React.FC = () => {
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('login');
  const [showActionModal, setShowActionModal] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState<string>('');

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const navigate = useNavigate();
  const userName = useAuthStore((state) => state.userName);

  const username = Form.useWatch('username', registerForm);
  const { data: usernameCheck } = useCheckUsername(
    username || '',
    activeTab === 'register' && !!username && username.length >= 3
  );

  const handleLogin = async (values: { username: string; password: string }) => {
    try {
      const normalizedUsername = values.username.toLowerCase().trim();
      await loginMutation.mutateAsync({
        username: normalizedUsername,
        password: values.password,
      });
      message.success('Đăng nhập thành công!');
      setLoggedInUsername(normalizedUsername);
      setShowActionModal(true);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Đăng nhập thất bại!';
      message.error(errorMessage);
    }
  };

  const handleViewCV = () => {
    const username = loggedInUsername || userName || '';
    if (username) {
      navigate(`/${username}`);
      setShowActionModal(false);
    }
  };

  const handleEdit = () => {
    setShowActionModal(false);

    if (userName) {
      navigate('/a-dmin/edit-profile');
    } else {
      message.warning('Vui lòng đăng nhập để chỉnh sửa');
    }
  };

  const handleRegister = async (values: {
    username: string;
    email?: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (values.password !== values.confirmPassword) {
      message.error('Mật khẩu xác nhận không khớp!');
      return;
    }

    if (values.password.length < 6) {
      message.error('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    const normalizedUsername = values.username.toLowerCase().trim();

    if (!usernameCheck || !usernameCheck.available) {
      message.error('Vui lòng chọn username khác!');
      return;
    }

    try {
      await registerMutation.mutateAsync({
        username: normalizedUsername,
        email: values.email?.trim(),
        password: values.password,
      });

      setLoggedInUsername(normalizedUsername);
      setShowActionModal(true);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Đăng ký thất bại!';
      message.error(errorMessage);
    }
  };

  const validateUsername = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error('Vui lòng nhập username!'));
    }
    const lowerValue = value.toLowerCase();
    if (lowerValue.length < 3 || lowerValue.length > 30) {
      return Promise.reject(new Error('Username phải từ 3-30 ký tự!'));
    }
    if (!/^[a-z0-9_-]+$/.test(lowerValue)) {
      return Promise.reject(new Error('Username chỉ được chứa chữ thường, số, - và _'));
    }
    if (
      lowerValue.startsWith('-') ||
      lowerValue.startsWith('_') ||
      lowerValue.endsWith('-') ||
      lowerValue.endsWith('_')
    ) {
      return Promise.reject(new Error('Username không được bắt đầu hoặc kết thúc bằng - hoặc _'));
    }
    if (usernameCheck && !usernameCheck.available && lowerValue.length >= 3) {
      return Promise.reject(new Error('Username đã được sử dụng!'));
    }
    return Promise.resolve();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Tạo Portfolio Của Bạn</h1>
            <p className="text-xl text-gray-600 mb-8">
              Xây dựng portfolio chuyên nghiệp và chia sẻ với thế giới
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold mb-2">Dễ Sử Dụng</h3>
                <p className="text-gray-600">Tạo portfolio chỉ trong vài phút</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold mb-2">Thiết Kế Đẹp</h3>
                <p className="text-gray-600">Giao diện hiện đại và chuyên nghiệp</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">🌐</div>
                <h3 className="text-xl font-semibold mb-2">Chia Sẻ Dễ Dàng</h3>
                <p className="text-gray-600">URL riêng cho mỗi portfolio</p>
              </div>
            </div>
          </div>

          <div className="max-w-md mx-auto mt-16">
            <Card className="shadow-xl">
              <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
                <TabPane tab="Đăng Nhập" key="login">
                  <Form form={loginForm} layout="vertical" onFinish={handleLogin} className="mt-4">
                    <Form.Item
                      name="username"
                      label="Username"
                      rules={[{ required: true, message: 'Vui lòng nhập username!' }]}
                      normalize={(value) => value?.toLowerCase()}
                    >
                      <Input prefix={<UserOutlined />} placeholder="Nhập username" size="large" />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      label="Mật khẩu"
                      rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Nhập mật khẩu"
                        size="large"
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        block
                        size="large"
                        loading={loginMutation.isPending}
                      >
                        Đăng Nhập
                      </Button>
                    </Form.Item>
                  </Form>
                </TabPane>

                <TabPane tab="Đăng Ký" key="register">
                  <Form
                    form={registerForm}
                    layout="vertical"
                    onFinish={handleRegister}
                    className="mt-4"
                  >
                    <Form.Item
                      name="username"
                      label="Username"
                      rules={[{ validator: validateUsername }]}
                      hasFeedback
                      normalize={(value) => value?.toLowerCase()}
                    >
                      <Input
                        prefix={<UserOutlined />}
                        placeholder="Nhập username (3-30 ký tự)"
                        size="large"
                        onInput={(e: any) => {
                          e.target.value = e.target.value.toLowerCase();
                        }}
                      />
                      {username && username.length >= 3 && usernameCheck && (
                        <div className="mt-1">
                          {usernameCheck.available ? (
                            <span className="text-green-600 text-sm">
                              <CheckCircleOutlined /> Username có sẵn
                            </span>
                          ) : (
                            <span className="text-red-600 text-sm">Username đã được sử dụng</span>
                          )}
                        </div>
                      )}
                    </Form.Item>

                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[{ type: 'email', message: 'Email không hợp lệ!' }]}
                    >
                      <Input
                        prefix={<MailOutlined />}
                        placeholder="Email (tùy chọn)"
                        size="large"
                      />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      label="Mật khẩu"
                      rules={[
                        { required: true, message: 'Vui lòng nhập mật khẩu!' },
                        { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                        size="large"
                      />
                    </Form.Item>

                    <Form.Item
                      name="confirmPassword"
                      label="Xác nhận mật khẩu"
                      dependencies={['password']}
                      rules={[
                        { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Nhập lại mật khẩu"
                        size="large"
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        block
                        size="large"
                        loading={registerMutation.isPending}
                      >
                        Đăng Ký
                      </Button>
                    </Form.Item>
                  </Form>
                </TabPane>
              </Tabs>
            </Card>

            <div className="text-center mt-8 text-gray-600">
              <p>
                Bằng cách đăng ký, bạn đồng ý với{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Điều khoản sử dụng
                </a>{' '}
                và{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Chính sách bảo mật
                </a>
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Tính Năng Nổi Bật</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold mb-2"> Quản Lý Profile</h4>
                <p className="text-sm text-gray-600">Cập nhật thông tin cá nhân dễ dàng</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold mb-2"> Kinh Nghiệm</h4>
                <p className="text-sm text-gray-600">Thêm và quản lý kinh nghiệm làm việc</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold mb-2"> Dự Án</h4>
                <p className="text-sm text-gray-600">Showcase các dự án của bạn</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold mb-2"> Kỹ Năng</h4>
                <p className="text-sm text-gray-600">Liệt kê kỹ năng và công nghệ</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={showActionModal}
        onCancel={() => setShowActionModal(false)}
        footer={null}
        centered
        width={400}
      >
        <div className="text-center py-6">
          <h2 className="text-2xl font-bold mb-6">Chọn hành động</h2>
          <div className="space-y-4">
            <Button
              type="primary"
              size="large"
              icon={<EyeOutlined />}
              onClick={handleViewCV}
              block
              className="h-12 text-lg"
            >
              Xem CV
            </Button>
            <Button
              type="default"
              size="large"
              icon={<EditOutlined />}
              onClick={handleEdit}
              block
              className="h-12 text-lg"
            >
              Chỉnh sửa
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;
