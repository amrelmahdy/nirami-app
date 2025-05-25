
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { getCategories } from "../api/categories.api";
import { Department } from "./departments.hooks";




export type Category = {
    name: {
        en: string;
        ar: string;
    };
    department: Department,
    image?: string;
    createdAt?: string;
    updatedAt?: string;
    id?: string;
};

export interface CategoryFilters {
  query?: string;
  departmentId?: string;
}

export const useGetCategories = (filters: CategoryFilters = {}): UseQueryResult<Category[]> => {
  const query = useQuery({
    queryKey: ['categories', filters], // cache based on filters
    queryFn: () => getCategories(filters),
  });

  return query;
};