
import { createAxiosClient } from "@/api/axiosClient";
import { docApi } from "@/api/docApi";
import { useMutation } from "@tanstack/react-query";
import type { WorkExperienceUpdateRs ,WorkExpTaskUpdateBody} from "@/Interface/TWorkExp";

type EditVars = { we_id: string; body: WorkExpTaskUpdateBody }; 
// body: { mt_id: string; task_description: string }

export const useEditTask = (accessToken: string) => {
  const api = docApi(createAxiosClient(accessToken));

  return useMutation<WorkExperienceUpdateRs, unknown, EditVars>({
    mutationFn: ({ we_id, body }) => api.editMytask(body, we_id),
  });
};



type DeleteVars = { mt_id: string };

export const useDeleteTask = (accessToken: string) => {
  const api = docApi(createAxiosClient(accessToken));

  return useMutation<WorkExperienceUpdateRs, unknown, DeleteVars>({
    mutationFn: ({ mt_id }) => api.deleteMytask(mt_id),
  });
};