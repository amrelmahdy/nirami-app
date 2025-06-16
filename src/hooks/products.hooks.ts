
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { getMostSaledProducts, getProductDetails, getProducts } from "../api/products.api";
import { Category } from "./categories.hooks";
import { Brand } from "./brands.hooks";
import { Group } from "./groups.hooks";


export type Variant = {
    id?: string
    name: { ar: string; en: string };
    sku: string;
    price: number;
    salesPrice: number;
    stock: number;
    maxQuantity: number;
    images?: [{
        public_id: string,
        url: string
    }];
    color: string
}

export type Product = {
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
    id: string;
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




export const useGetProducts = (filters: ProductFilters = {}): UseQueryResult<Product[]> => {
    const query = useQuery({
        queryKey: ['products', filters], // cache based on filters
        queryFn: () => getProducts(filters),
    });

    return query;
};

export const useGetMostSaledProducts = (): UseQueryResult<Product[]> => {
    const query = useQuery({
        queryKey: ['most-saled-products'],
        queryFn: getMostSaledProducts
    });

    return query;
}


export const useGetProduct = (id: string): UseQueryResult<Product> => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductDetails(id),
        enabled: !!id, // optional: prevents the query from running if id is falsy
    });
};

