
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { addProductToFav, getMostSaledProducts, getProductDetails, getProducts, getProductVariants } from "../api/products.api";
import { Category } from "./categories.hooks";
import { Brand } from "./brands.hooks";
import { Group } from "./groups.hooks";
import { User } from "./user.hooks";
import { addAddress, getAddresses, updateAddress } from "../api/addresses.api";



export type Address = {
    id?: string;
    _id?: string;
    name: string;
    user?: User
    phone: string;
    deliveryAddress: string;
    location: {
        lng: number;
        lat: number;
        displayName: string;
    };
    isDefault?: boolean; // Optional, if not provided, it will be false by default
}

export type Product = {
    id: string;
    _id: string;
    name: {
        en: string;
        ar: string;
    };
    description: {
        en: string;
        ar: string;
    };
    components: {
        en: string;
        ar: string;
    };
    brand: Brand;
    group: Group;
    price: number;
    salesPrice: number;
    maxQuantity: number;
    stock: number;
    sku: string;
    averageRating: number;
    reviewCount: number;
    productCardImage: string;
    images: [{
        public_id: string,
        url: string
    }];
    variants: Variant[];
    isOutOfStock: boolean;
    isOnSale: boolean;
    isFeatured: boolean;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
    reviews: any[];
};
export interface ProductFilters {
    query?: string;
    groupId?: string;
    categoryId?: string;
    brandId?: string;
    sortBy?: string;
    priceFrom?: string;
    priceTo?: string;
}




export const useGetAddresses = (): UseQueryResult<Address[]> => {
    const query = useQuery({
        queryKey: ['addresses'], // cache based on filters
        queryFn: getAddresses,
    });

    return query;
};



export const useAddAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addAddress,
        onSuccess: (res) => {
            console.log("res for add address : ", res)
            queryClient.invalidateQueries({ queryKey: ['addresses'] });
            queryClient.invalidateQueries({ queryKey: ['user'] });

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





