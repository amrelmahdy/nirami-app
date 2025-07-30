
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { getGroups } from "../api/groups.api";
import { Category } from "./categories.hooks";
import { getBrands } from "../api/brands.api";

export type Brand = {
    name: {
        en: string;
        ar: string;
    };
    image?: string;
    createdAt?: string;
    updatedAt?: string;
    id?: string;
    _id?: string;
};

export interface GroupFilters {
    query?: string;
    categoryId?: string;
  }




export const useGetBrands = (): UseQueryResult<Brand[]> => {
  const query = useQuery({
    queryKey: ['brands'], // cache based on filters
    queryFn: getBrands,
  });

  return query;
};
