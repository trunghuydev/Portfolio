
import { useMutation } from "@tanstack/react-query";
import { UpdateProfileRs } from "@/Interface/TPersonalInfo";
import { docApi } from "@/api/docApi";
import { createAxiosClient } from "@/api/axiosClient";

export const useEditProfile = (accessToken: string) => {
  const api = docApi(createAxiosClient(accessToken));

  return useMutation<UpdateProfileRs, Error, FormData>({
    mutationFn: (formData: FormData) => api.editProfile(formData),
  });
};
