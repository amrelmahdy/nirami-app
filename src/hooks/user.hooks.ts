
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { getGroups } from "../api/groups.api";
import { Category } from "./categories.hooks";
import { getBrands } from "../api/brands.api";
import { getCurrentUser } from "../api/auth.api";

export type User = {
    name: {
        en: string;
        ar: string;
    };
    image: string;
    createdAt: string;
    updatedAt: string;
    id: string;
};


export const useGetCurrentUser = (): UseQueryResult<User> => {
  const query = useQuery({
    queryKey: ['user'], // cache based on filters
    queryFn: getCurrentUser,
  });
  return query;
};
