import { useQuery, UseQueryOptions, useMutation, UseMutationOptions } from 'react-query';
import { AxiosError } from 'axios';
import { APICreateProductParameters, createProduct, getProducts, ProductType } from './ProductsAPI';

export const useGetProducts = (options?: UseQueryOptions<ProductType[]>) => {
    return useQuery<ProductType[]>('products', getProducts, options);
};

export const useCreateProduct = (options:UseMutationOptions<unknown, AxiosError<any>, APICreateProductParameters>) => {
    return useMutation(createProduct, options);
};
