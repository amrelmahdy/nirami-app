
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { addProductToFav, getMostSaledProducts, getProductDetails, getProducts, getProductVariants } from "../api/products.api";
import { Category } from "./categories.hooks";
import { Brand } from "./brands.hooks";
import { Group } from "./groups.hooks";
import { User } from "./user.hooks";
import { addAddress, getAddresses, updateAddress } from "../api/addresses.api";
import { checkout, getOrderDetails, getOrders } from "../api/orders.api";



export type OrderStatus =
  | 'pending'
  | 'awaiting_payment'
  | 'payment_failed'
  | 'processing'
  | 'on_hold'
  | 'ready_for_pickup'
  | 'shipped'
  | 'partially_shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'completed'
  | 'cancelled'
  | 'failed'
  | 'returned'
  | 'refunded'
  | 'partially_refunded';

export type Order = {
    id?: string;
    _id?: string;
    user: User;
    finalPrice: number,
    paymentMethod: string,
    shippingCost: number,
    paymentStatus: string,
    shippingAddress: string,
    status: OrderStatus,
    orderNumber: string,
}



export const useGetOrdres = (): UseQueryResult<Order[]> => {
    const query = useQuery({
        queryKey: ['orders'], // cache based on filters
        queryFn: getOrders,
    });

    return query;
};



export const useGetOrderDetails = (id: string): UseQueryResult<Order> => {
    const query = useQuery({
        queryKey: ['order', id],
        queryFn: () => getOrderDetails(id),
        enabled: !!id, // optional: prevents the query from running if id is falsy
    });

    return query;
};



export const useCheckout = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: checkout,
        onSuccess: (res) => {
            console.log("res for add address : ", res)
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            queryClient.invalidateQueries({ queryKey: ['user'] });
            queryClient.invalidateQueries({ queryKey: ['products'] });
            // Invalidate the products query to refetch the updated list
            queryClient.invalidateQueries({ queryKey: ['most-saled-products'] });

        }
    });
}


export const useUpdateAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, address }: { id: string; address: any }) => updateAddress(id, address),
        onSuccess: (res) => {
            console.log("Product updated:", res);
            // Invalidate the cache to refetch the updated product data
            queryClient.invalidateQueries({ queryKey: ['addresses'] });
            queryClient.invalidateQueries({ queryKey: ['user'] });

        },
        onError: (error: any) => {
            console.error('Error updating address:', error?.response?.data || error.message);
        },
    });
};





