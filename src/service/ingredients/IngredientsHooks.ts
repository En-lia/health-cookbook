import { useQuery, UseQueryOptions, useMutation, UseMutationOptions } from 'react-query';
import { AxiosError } from 'axios';
import { APICreateIngredientParameters, createIngredient, getIngredients, GetIngredientType } from './IngredientsAPI';

export const useGetIngredients = (options?: UseQueryOptions<GetIngredientType[]>) => {
    return useQuery<GetIngredientType[]>('ingredients', getIngredients, options);
};

export const useCreateIngredient = (options:UseMutationOptions<unknown, AxiosError<any>, APICreateIngredientParameters>) => {
    return useMutation(createIngredient, options);
};
