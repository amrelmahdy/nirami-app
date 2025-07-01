
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { addToCart, clearCart, getCart, orderCart, removeFromCart } from "../api/cart.api";


export type CartItem = {
    product: string;
    quantity: number;
}

export type Cart = {
    id?: string;
    user: string;
    itams: CartItem[];
    totalItems: number;
    totalPrice: number;
    isOrderedr: boolean
}

export const useGetCart = (): UseQueryResult<Cart> => {
    const query = useQuery({
        queryKey: ['cart'],
        queryFn: getCart,
    });
    return query;
};






export const useAddProductToCart = (): UseMutationResult<Cart, Error, string> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addToCart,
        onSuccess: (data, productId) => {
            // Invalidate the products query to refetch the updated list
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['most-saled-products'] });

        }
    });
};

export const useRemoveProductFromCart = (): UseMutationResult<Cart, Error, { productId: string; removeCompletely?: boolean }> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: removeFromCart,
        onSuccess: (data, variables) => {
            // Invalidate the products query to refetch the updated list
           queryClient.invalidateQueries({ queryKey: ['cart'] });
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['most-saled-products'] });

        }
    });
};



export const useClearCart = (): UseMutationResult<Cart, Error, string> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: clearCart,
        onSuccess: (data) => {
            // Invalidate the products query to refetch the updated list
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            queryClient.invalidateQueries({ queryKey: ['products'] });
        }
    });
};


export const useOrderCart = (): UseMutationResult<Cart, Error, string> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: orderCart,
        onSuccess: (data) => {
            // Invalidate the products query to refetch the updated list
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            //queryClient.invalidateQueries({ queryKey: ['products'] });
        }
    });
};
