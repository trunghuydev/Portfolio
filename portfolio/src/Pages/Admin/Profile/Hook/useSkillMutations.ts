import { createAxiosClient } from '@/api/axiosClient';
import { docApi } from '@/api/docApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { QueryKeys } from '@/Constants/query-key';


export const useSkillMutations = (accessToken: string) => {
  const api = docApi(createAxiosClient(accessToken));
  const queryClient = useQueryClient();

  const addSkill = useMutation({
    mutationFn: async (body: { skill_name: string; position?: string }) => await api.addSkill(body),
    onSuccess: () => {
      message.success('Thêm skill thành công!');
      queryClient.invalidateQueries({ queryKey: [QueryKeys.SKILLS] });
    },
    onError: (err: any) => {
      console.error(err);
      message.error('Thêm skill thất bại!');
    },
  });

  const updateSkill = useMutation({
    mutationFn: async ({ skill_id, body }: { skill_id: string; body: { skill_name?: string; position?: string } }) =>
      await api.updateSkill(skill_id, body),
    onSuccess: () => {
      message.success('Cập nhật skill thành công!');
      queryClient.invalidateQueries({ queryKey: [QueryKeys.SKILLS] });
    },
    onError: (err: any) => {
      console.error(err);
      message.error('Cập nhật skill thất bại!');
    },
  });

  const deleteSkill = useMutation({
    mutationFn: async (skill_id: string) => await api.deleteSkill(skill_id),
    onSuccess: () => {
      message.success('Xoá skill thành công!');
      queryClient.invalidateQueries({ queryKey: [QueryKeys.SKILLS] });
    },
    onError: (err: any) => {
      console.error(err);
      message.error('Xoá skill thất bại!');
    },
  });

  const deleteAllSkills = useMutation({
    mutationFn: async () => await api.deleteAllSkills(),
    onSuccess: () => {
      message.success('Xoá tất cả skills thành công!');
      queryClient.invalidateQueries({ queryKey: [QueryKeys.SKILLS] });
    },
    onError: (err: any) => {
      console.error(err);
      message.error('Xoá tất cả skills thất bại!');
    },
  });

  return {
    addSkill,
    updateSkill,
    deleteSkill,
    deleteAllSkills,
  };
};

