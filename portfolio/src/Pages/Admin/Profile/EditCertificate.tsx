import { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Typography,
  Space,
  message,
  Popconfirm,
  Table,
} from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useAuthStore } from '@/Store/auth';
import { useProfile } from '@/Hook/usegetInform';
import { Certificate } from '@/Interface/TCertificate';
import { useCertificateMutations } from './Hook/useCertificateMutations';

const { Title } = Typography;

const AdminEditCertificate = () => {
  const [form] = Form.useForm();
  const { accessToken } = useAuthStore();
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  if (!accessToken) {
    return <div>Vui lòng đăng nhập để chỉnh sửa certificates.</div>;
  }

  const { data: profile, isLoading, refetch } = useProfile(accessToken);
  const { addCertificate, updateCertificate, deleteCertificate } = useCertificateMutations(accessToken);

  const certificates = profile?.certificates || [];

  useEffect(() => {
    if (selectedCertificate) {
      form.setFieldsValue({
        certificate_name: selectedCertificate.certificate_name,
      });
      setIsCreating(false);
    } else {
      form.resetFields();
    }
  }, [selectedCertificate, form]);

  const handleSubmit = (values: { certificate_name: string }) => {
    if (!values.certificate_name) {
      message.warning('Vui lòng nhập tên certificate!');
      return;
    }

    if (selectedCertificate) {
      updateCertificate.mutate(
        {
          certificate_id: selectedCertificate.id,
          body: {
            certificate_name: values.certificate_name,
          },
        },
        {
          onSuccess: () => {
            refetch();
            setSelectedCertificate(null);
            form.resetFields();
          },
        }
      );
    } else {
      addCertificate.mutate(
        {
          certificate_name: values.certificate_name,
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

  const handleEdit = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsCreating(false);
  };

  const handleDelete = (certificateId: string) => {
    deleteCertificate.mutate(certificateId, {
      onSuccess: () => {
        refetch();
        if (selectedCertificate?.id === certificateId) {
          setSelectedCertificate(null);
          form.resetFields();
        }
      },
    });
  };

  const columns = [
    {
      title: 'Tên Certificate',
      dataIndex: 'certificate_name',
      key: 'certificate_name',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Certificate) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xoá certificate này?"
            onConfirm={() => handleDelete(record.id)}
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
      <Title level={3}>Quản lý Certificates</Title>

      <div className="mb-6">
        <Button
          icon={<PlusOutlined />}
          onClick={() => {
            setSelectedCertificate(null);
            setIsCreating(true);
            form.resetFields();
          }}
        >
          Thêm Certificate mới
        </Button>
      </div>

      {(isCreating || selectedCertificate) && (
        <Form 
          layout="vertical" 
          form={form} 
          onFinish={handleSubmit} 
          className="mb-6"
          validateTrigger={['onBlur', 'onSubmit']}
        >
          <Form.Item
            label="Tên Certificate"
            name="certificate_name"
            rules={[{ required: true, message: 'Vui lòng nhập tên certificate' }]}
          >
            <Input 
              placeholder="VD: AWS Certified Solutions Architect, Google Cloud Professional" 
              autoComplete="off" 
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={addCertificate.isPending || updateCertificate.isPending}>
                {selectedCertificate ? 'Cập nhật' : 'Thêm mới'}
              </Button>
              <Button
                onClick={() => {
                  setSelectedCertificate(null);
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
        dataSource={certificates}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: 'Chưa có certificate nào' }}
      />
    </div>
  );
};

export default AdminEditCertificate;

