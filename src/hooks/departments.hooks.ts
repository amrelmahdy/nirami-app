import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import {  getDepartments } from "./../api/departments.api";


export type Department = {
    name: {
      en: string;
      ar: string;
  };
    image?: string;
    createdAt?: string;
    updatedAt?: string;
    id?: string;
};



export const useGetDepartments = (): UseQueryResult<Department[]> => {
    const query = useQuery({ queryKey: ['departments'], queryFn: getDepartments });
    return query;
}
