
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { getGroups } from "../api/groups.api";
import { Category } from "./categories.hooks";
import { getBrands } from "../api/brands.api";
import { Product } from "./products.hooks";
import { User } from "./user.hooks";

export type Review = {
    id?: string;
    _id?: string;
    product?: Product;
    user?: User;
    rating: number;
    review?: string;
    showName?: boolean;
    helpfulVotes?: number;
    createdAt?: Date
};




// export const useGetBrands = (): UseQueryResult<Brand[]> => {
//   const query = useQuery({
//     queryKey: ['brands'], // cache based on filters
//     queryFn: getBrands,
//   });

//   return query;
// };
