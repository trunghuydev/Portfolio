import { createAxiosClient } from "@/api/axiosClient";
import { docApi } from "@/api/docApi";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

export const useProjectMutations = (accessToken: string) => {
  const api = docApi(createAxiosClient(accessToken));

  const updateProject = useMutation({
    mutationFn: async ({
      project_id,
      formData,
    }: {
      project_id: string;
      formData: FormData;
    }) => await api.updateProject(project_id, formData),

   
    onError: (err: any) => {
      console.error(err);
      message.error("Cập nhật dự án thất bại!");
    },
  });

  const deleteProject = useMutation({
    mutationFn: async (project_id: string) => await api.deleteProject(project_id),

   
    onError: (err: any) => {
      console.error(err);
      message.error("Xoá dự án thất bại!");
    },
  });

  return {
    updateProject,
    deleteProject,
  };
};
