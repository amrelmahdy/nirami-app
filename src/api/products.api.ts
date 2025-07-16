import httpClient from "../helpers/httpClient";
import { ProductFilters } from "../hooks/products.hooks";
import { Review } from "../hooks/reviews.hooks";


export const getProducts = async (filters: ProductFilters = {}) => {
    const params = new URLSearchParams();

    if (filters.query) params.append('query', filters.query);
    if (filters.groupId) params.append('groupId', filters.groupId);
    if (filters.categoryId) params.append('categoryId', filters.categoryId);
    if (filters.brandId) params.append('brandId', filters.brandId);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.priceFrom) params.append('priceFrom', filters.priceFrom);
     if (filters.priceTo) params.append('priceTo', filters.priceTo);
    const url = `/products?${params.toString()}`;
    const result = await httpClient.get(url);
    return result.data;
};

export const getMostSaledProducts = async () => {  
    const result = await httpClient.get('/products/most-saled');
    return result.data;
};

export const getProductDetails = async (productId: string) => {
    const result = await httpClient.get(`/products/${productId}`);
    return result.data;
}

export const getProductVariants = async (productId: string) => {
    const result = await httpClient.get(`/products/${productId}/variants`);
    return result.data;
}


export const getRelatedProducts = async (productId: string) => {
    const result = await httpClient.get(`/products/related/${productId}`);
    return result.data;
};

export const addProductToFav = async (productId: string) => {
    const result = await httpClient.post(`/products/${productId}/favourite`);
    return result.data;
};

export const addProductReview = async (productId: string, review: Review) => {
    const result = await httpClient.post(`/products/${productId}/reviews`, review);
    return result.data;
};

export const makeProductReviewHelpfull = async (reviewId: string) => {
    const result = await httpClient.post(`/products/${reviewId}/reviews/helpful`);
    return result.data;
};

