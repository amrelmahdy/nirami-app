
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { addProductToFav, getMostSaledProducts, getProductDetails, getProducts, getProductVariants } from "../api/products.api";
import { Category } from "./categories.hooks";
import { Brand } from "./brands.hooks";
import { Group } from "./groups.hooks";
import { User } from "./user.hooks";
import { addAddress, getAddresses, updateAddress } from "../api/addresses.api";
import { addTicket, getTickets } from "../api/tickets.api";


export type Ticket = {
    name: string
    phone: string
    email: string
    type: "complaint" | "return" | "exchange" | "other";
    message: string;
    orderNumber: string;
}





export const useGetTickets = (): UseQueryResult<Ticket[]> => {
    const query = useQuery({
        queryKey: ['tickets'], // cache based on filters
        queryFn: getTickets,
    });

    return query;
};



export const useAddTicket = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addTicket,
        onSuccess: (res) => {
            console.log("res for add ticket : ", res)
            queryClient.invalidateQueries({ queryKey: ['tickets'] });
        }
    });
}