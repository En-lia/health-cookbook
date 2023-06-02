import { QueryFunctionContext } from 'react-query';
import { $authHost } from '../index';

export type RatingType = {
    rate: number,
    recipeId: number
};

export type APISetRatingParameters = Omit<RatingType, 'id'>;
export const setRating = async ({ recipeId, rate }:APISetRatingParameters): Promise<any> => {
    const { data } = await $authHost.post('api/rating', { recipeId, rate });
    return data;
};

export const getRatingById = async ({ queryKey }: QueryFunctionContext<[string, number]>):Promise<RatingType> => {
    const [, recipeId] = queryKey;
    const { data } = await $authHost.get(`api/rating/${recipeId}`);
    return data;
};