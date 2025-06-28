import { useMutation } from '@tanstack/react-query';
import { docApi } from '@/api/docApi';
import { createAxiosClient } from '@/api/axiosClient';

export const useDeleteWorkexp = (accessToken: string) => {
  const api = docApi(createAxiosClient(accessToken));

  return useMutation({
    mutationFn: (we_id: string) => api.deleteWorkExperience(we_id),
  });
};
