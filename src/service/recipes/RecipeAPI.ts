import { QueryFunctionContext } from 'react-query';
import { $authHost } from '../index';
import { TagType } from '../tags/TagAPI';
import { CreateIngredientType, GetIngredientType } from '../ingredients/IngredientsAPI';
import { RatingType } from '../rating/RatingAPI';
import { APIRecipesParameters } from './recipeHooks';

type PhotoType = {
    id: number,
    img: string,
};

export type BaseRecipeType = {
    id: number,
    title: string,
    benefit: string,
    photos: PhotoType[],
    tags: TagType[],
    helpful?: { id: number, helpfulRecipe: GetRecipeType }[] | null,
};

export type CreateRecipeType = BaseRecipeType & {
    ingredients: CreateIngredientType[],
    cooking: string,
};

export type GetRecipeType = BaseRecipeType & {
    cooking?: string,
    ingredients?: GetIngredientType[],
    ratings: RatingType[]
};

export type RecipesType = {
    count: number,
    data: GetRecipeType[]
};

export const getRecipes = async ({ selectedTags, pageParam, page, limit, searchQuery } :APIRecipesParameters):Promise<RecipesType> => {
    const { data } = await $authHost.get('api/recipe', {
        params: {
            tags: selectedTags,
            page: pageParam || page,
            limit,
            searchQuery,
        } });
    return data;
};

export const getRecipeById = async ({ queryKey }: QueryFunctionContext<[string, number]>):Promise<GetRecipeType> => {
    const [, id] = queryKey;
    const { data } = await $authHost.get(`api/recipe/${id}`);
    return data;
};

export type APICreateRecipeParameters = Omit<CreateRecipeType, 'id'>;
export const createRecipe = async (value:APICreateRecipeParameters): Promise<any> => {
    const { data } = await $authHost.post('api/recipe', value);
    return data;
};

export const deleteRecipe = async (id:number): Promise<any> => {
    const { data } = await $authHost.delete(`api/recipe/${id}`);
    return data;
};