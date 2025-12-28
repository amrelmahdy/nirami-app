import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { getAllSettings } from "../api/settings.api";



export type Settings = {
    aboutUs: string,
    ourStory: string,
    returnAndExchangePolicy: string,
    contactWhatsapp: string,
    contactPhone: string,
    contactEmail: string
}



export const useGetAllSettings = (): UseQueryResult<Settings> => {
    const query = useQuery({
        queryKey: ['settings'], // cache based on filters
        queryFn: getAllSettings,
    });

    return query;
};