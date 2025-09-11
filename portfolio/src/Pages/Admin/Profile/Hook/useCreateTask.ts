import { createAxiosClient } from "@/api/axiosClient";
import { docApi } from "@/api/docApi";
import { WorkExpTask } from "@/Interface/TWorkExp";
import { useMutation } from "@tanstack/react-query";

type Variables = { we_id: string; body: WorkExpTask; };
export const useCreateTask = (accessToken: string) => {
  const api = docApi(createAxiosClient(accessToken));
  
  return useMutation({
      mutationFn: ({ we_id, body }: Variables) => api.createMyTask(body, we_id)
  });
}; 