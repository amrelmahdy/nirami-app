
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { addProductReview, addProductToFav, getMostSaledProducts, getProductDetails, getProducts, getProductVariants, getRelatedProducts } from "../api/products.api";
import { Category } from "./categories.hooks";
import { Brand } from "./brands.hooks";
import { Group } from "./groups.hooks";
import { Review } from "./reviews.hooks";


export type Variant = {
    id?: string;
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


export const useGetRelatedProducts = (productId: string): UseQueryResult<Product[]> => {
    return useQuery({
        queryKey: ['related-products', productId],
        queryFn: () => getRelatedProducts(productId),
        enabled: !!productId, // optional: prevents the query from running if productId is falsy
    });
};


export const useGetProduct = (id: string): UseQueryResult<Product> => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductDetails(id),
        enabled: !!id, // optional: prevents the query from running if id is falsy
    });
};


export const useGetProductVariants = (id: string): UseQueryResult<Product[]> => {
    return useQuery({
        queryKey: ['product-variants', id],
        queryFn: () => getProductVariants(id),
        enabled: !!id, // optional: prevents the query from running if id is falsy
    });
};



export const useAddProductToFav = (): UseMutationResult<Product, Error, string> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addProductToFav,
        onSuccess: (data, productId) => {
            // Invalidate the products query to refetch the updated list
            queryClient.invalidateQueries({ queryKey: ['products'] });
            // Invalidate the products query to refetch the updated list
            queryClient.invalidateQueries({ queryKey: ['most-saled-products'] });
            // Optionally, you can also update the specific product in the cache
            queryClient.setQueryData(['product', productId], data);
            // Invalidate current user query to refetch the user data
            queryClient.invalidateQueries({ queryKey: ['user'] });
        }
    });
};





export const useAddProductReview = (): UseMutationResult<any, Error, { productId: string; review: Review }> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ productId, review }) => addProductReview(productId, review),
        onSuccess: (data, { productId }) => {
            console.log("Review added successfully::::", productId);
            // Invalidate the product query to refetch the updated product details
            queryClient.invalidateQueries({
                queryKey: ['product', productId]
            });
            // Optionally, you can also update the specific product in the cache
        }
    });
}




