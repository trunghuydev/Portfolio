import { createAxiosClient } from '@/api/axiosClient';
import { docApi } from '@/api/docApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { CertificateCreatePayload, CertificateUpdatePayload } from '@/Interface/TCertificate';

export const useCertificateMutations = (accessToken: string) => {
  const api = docApi(createAxiosClient(accessToken));
  const queryClient = useQueryClient();

  const addCertificate = useMutation({
    mutationFn: async (body: CertificateCreatePayload) => await api.addCertificate(body),
    onSuccess: () => {
      message.success('Thêm certificate thành công!');
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (err: any) => {
      console.error(err);
      message.error('Thêm certificate thất bại!');
    },
  });

  const updateCertificate = useMutation({
    mutationFn: async ({ certificate_id, body }: { certificate_id: string; body: CertificateUpdatePayload }) =>
      await api.updateCertificate(certificate_id, body),
    onSuccess: () => {
      message.success('Cập nhật certificate thành công!');
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (err: any) => {
      console.error(err);
      message.error('Cập nhật certificate thất bại!');
    },
  });

  const deleteCertificate = useMutation({
    mutationFn: async (certificate_id: string) => await api.deleteCertificate(certificate_id),
    onSuccess: () => {
      message.success('Xoá certificate thành công!');
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (err: any) => {
      console.error(err);
      message.error('Xoá certificate thất bại!');
    },
  });

  return {
    addCertificate,
    updateCertificate,
    deleteCertificate,
  };
};

