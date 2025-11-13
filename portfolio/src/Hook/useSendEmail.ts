import { useMutation } from '@tanstack/react-query';
import { EmailPayload, EmailResponse } from '@/Interface/TEmail';
import { docApi } from '@/api/docApi';
import { createAxiosClient } from '@/api/axiosClient';
import { message } from 'antd';

export const useSendEmail = (accessToken: string) => {
  const api = docApi(createAxiosClient(accessToken));

  return useMutation<EmailResponse, Error, EmailPayload>({
    mutationFn: (body: EmailPayload) => api.sendEmail(body),
    onSuccess: (data) => {
      message.success(data.message || 'Email đã được gửi thành công!');
    },
    onError: (err: any) => {
      console.error(err);
      message.error('Gửi email thất bại!');
    },
  });
};

