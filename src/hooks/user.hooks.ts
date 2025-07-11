
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { getGroups } from "../api/groups.api";
import { Category } from "./categories.hooks";
import { getBrands } from "../api/brands.api";
import { getCurrentUser } from "../api/auth.api";
import { Address } from "./addresses.hooks";

export type User = {
    firstName?: string;
    lastName?: string;
    image?: string;
    createdAt?: string;
    updatedAt?: string;
    id?: string;
    _id?: string;
    addresses?: Address[];
    phone?: string;
    email?: string;
    gender: string;
    dateOfBirth?: string | Date;
    
};


export const useGetCurrentUser = (): UseQueryResult<User> => {
  const query = useQuery({
    queryKey: ['user'], // cache based on filters
    queryFn: getCurrentUser,
  });
  return query;
};
