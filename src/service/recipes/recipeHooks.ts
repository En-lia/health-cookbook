import { useQuery, UseQueryOptions, useInfiniteQuery, UseInfiniteQueryOptions, useMutation, UseMutationOptions, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import {
    createRecipe,
    APICreateRecipeParameters,
    RecipesType,
    GetRecipeType,
    getRecipes,
    getRecipeById, deleteRecipe,
} from './RecipeAPI';
import { UserType } from '../user/UserAPI';

export type APIRecipesParameters = {
    selectedTags?: string[],
    page?: number,
    limit?: number,
    searchQuery?: string,
    pageParam?: number,
};

export const useGetRecipes = (options: UseQueryOptions<RecipesType>, { selectedTags, page, limit, searchQuery }: APIRecipesParameters) => {
    const queryClient = useQueryClient();
    const user: UserType = queryClient.getQueryData('user');

    return useQuery<RecipesType>(['recipes', user.id, selectedTags, page, limit], () => getRecipes(
        {
            selectedTags,
            page,
            limit,
            searchQuery,
        },
    ), options);
};

export const useGetInfiniteRecipes = (options: UseInfiniteQueryOptions<RecipesType>, { selectedTags, page, limit, searchQuery }: APIRecipesParameters) => {
    const queryClient = useQueryClient();
    const user: UserType = queryClient.getQueryData('user');

    return useInfiniteQuery<RecipesType>(
        ['recipes', user.id, selectedTags, page, limit],
        ({ pageParam = 1 }) => getRecipes(
        {
            selectedTags,
            page,
            limit,
            searchQuery,
            pageParam,
        },
    ),
        options);
};

export const useGetRecipeById = (options: UseQueryOptions<GetRecipeType>, recipeId:number) => {
    const queryClient = useQueryClient();
    const user: UserType = queryClient.getQueryData('user');
    // const queryCache = queryClient.getQueryCache();

    return useQuery<GetRecipeType>(['recipe', recipeId, user.id], getRecipeById, options);
};

export const useCreateRecipe = (options:UseMutationOptions<unknown, AxiosError<any>, APICreateRecipeParameters>) => {
    return useMutation(createRecipe, options);
};

export const useDeleteRecipe = (options:UseMutationOptions<unknown, AxiosError<any>, number>) => {
    return useMutation(deleteRecipe, options);
};