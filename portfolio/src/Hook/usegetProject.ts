import { createAxiosClient } from "@/api/axiosClient"
import { docApi } from "@/api/docApi"
import { QueryKeys } from "@/Constants/query-key";
import {  ProjectResponse } from "@/Interface/TProject";
import { useQuery } from "@tanstack/react-query";

export const useProject= (accessToken:string,pageIndex:number,pageSize:number)=>{
    const api = docApi(createAxiosClient(accessToken));
    return useQuery<ProjectResponse>({
        queryKey:[QueryKeys.PROJECTS,accessToken,pageIndex],
        queryFn:()=>api.getProject(pageIndex,pageSize),
        enabled:!!accessToken
    })
}