import { createAxiosClient } from "@/api/axiosClient"
import { docApi } from "@/api/docApi"
import { QueryKeys } from "@/Constants/query-key";
import { Skill } from "@/Interface/TSkills";
import { useQuery } from "@tanstack/react-query";

export const useSkills = (accessToken:string)=>{
    const api = docApi(createAxiosClient(accessToken));
    return useQuery<Skill[]>({
        queryKey:[QueryKeys.SKILLS,accessToken],
        queryFn:()=>api.getSkills(),
        enabled:!!accessToken
    })
}