import { createAxiosClient } from "@/api/axiosClient";
import { docApi } from "@/api/docApi";
import { WorkExperiencePayload } from "@/Interface/TWorkExp";
import { useMutation } from "@tanstack/react-query";

export const useCreateWorkexp = (accessToken: string) => {
  const api = docApi(createAxiosClient(accessToken));
  
  return useMutation({
    mutationFn: (payload: WorkExperiencePayload) => api.createExperience(payload),
  });
};
