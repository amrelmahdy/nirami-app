
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { getBrands } from "./brands.api";




export type Brand = {
    name: {
        en: string;
        ar: string;
    };
    image?: string;
    createdAt?: string;
    updatedAt?: string;
    id?: string;
};



export const useGetBrands = (): UseQueryResult<Brand[]> => {
    const query = useQuery({ queryKey: ['brands'], queryFn: getBrands });
    return query;
}
