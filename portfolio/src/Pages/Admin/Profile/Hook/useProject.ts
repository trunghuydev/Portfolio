import { createAxiosClient } from "@/api/axiosClient";
import { docApi } from "@/api/docApi";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

export const useProjectMutations = (accessToken: string) => {
  const api = docApi(createAxiosClient(accessToken));

  const createProject = useMutation({
    mutationFn: async (formData: FormData) => await api.createProject(formData),
    onSuccess: () => {
      message.success("Tạo dự án thành công!");
    },
    onError: (err: any) => {
      console.error(err);
      message.error("Tạo dự án thất bại!");
    },
  });

  const updateProject = useMutation({
    mutationFn: async ({
      project_id,
      formData,
    }: {
      project_id: string;
      formData: FormData;
    }) => await api.updateProject(project_id, formData),
    onSuccess: () => {
      message.success("Cập nhật dự án thành công!");
    },
    onError: (err: any) => {
      console.error("Update project error:", err);
      console.error("Error response:", err?.response?.data);
      const errorMessage = err?.response?.data?.message || err?.message || "Cập nhật dự án thất bại!";
      message.error(errorMessage);
    },
  });

  const deleteProject = useMutation({
    mutationFn: async (project_id: string) => await api.deleteProject(project_id),
    onSuccess: () => {
      message.success("Xoá dự án thành công!");
    },
    onError: (err: any) => {
      console.error(err);
      message.error("Xoá dự án thất bại!");
    },
  });

  return {
    createProject,
    updateProject,
    deleteProject,
  };
};
