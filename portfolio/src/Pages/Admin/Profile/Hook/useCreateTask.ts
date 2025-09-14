
import { createAxiosClient } from "@/api/axiosClient";
import { docApi } from "@/api/docApi";
import { useMutation } from "@tanstack/react-query";
import type { WorkExperienceUpdateRs, WorkExpTaskCreate } from "@/Interface/TWorkExp";

type CreateVars = { we_id: string; body: WorkExpTaskCreate };

export const useCreateTask = (accessToken: string) => {
  const api = docApi(createAxiosClient(accessToken));

  return useMutation<WorkExperienceUpdateRs, unknown, CreateVars>({
    mutationFn: ({ we_id, body }) => api.createMyTask(body, we_id),
  });
};
