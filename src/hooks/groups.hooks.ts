
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { getGroups } from "../api/groups.api";
import { Category } from "./categories.hooks";

export type Group = {
    name: {
        en: string;
        ar: string;
    };
    image: string;
    category: Category;
    createdAt: string;
    updatedAt: string;
    id: string;
};

export interface GroupFilters {
    query?: string;
    categoryId?: string;
  }




export const useGetGroups = (filters: GroupFilters = {}): UseQueryResult<Group[]> => {
  const query = useQuery({
    queryKey: ['groups', filters], // cache based on filters
    queryFn: () => getGroups(filters),
  });

  return query;
};
