import { useQuery, UseQueryOptions, useMutation, UseMutationOptions, useQueryClient, QueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { RatingType, APISetRatingParameters, setRating, getRatingById } from './RatingAPI';
import { GetRecipeType, RecipesType } from '../recipes/RecipeAPI';
import { UserType } from '../user/UserAPI';

const updateRecipeInCache = async (client: QueryClient, recipeId: number, userId: number, newRating: APISetRatingParameters) => {
    await client.cancelQueries({ queryKey: ['recipe', recipeId, userId] });
    const previousRecipe = client.getQueryData(['recipe', recipeId, userId]);
    client.setQueryData(['recipe', recipeId, userId], (oldRecipe: GetRecipeType) => {
        const newRecipe = { ...oldRecipe };

        newRecipe.ratings = [{
            rate: newRating.rate,
            recipeId,
        }];

        return newRecipe;
    });

    return { previousRecipe };
};

const updateRecipesInCache = async (client: QueryClient, userId: number, newRating: APISetRatingParameters, {
    recipeId,
    selectedTags,
    page,
    limit,
}:UseSetRatingParameters) => {
    const queryKey = ['recipes', userId, selectedTags, page, limit];
    await client.cancelQueries({ queryKey });
    const previousRecipes = client.getQueryData(queryKey);

    if (previousRecipes) {
        client.setQueryData(queryKey, (oldRecipes: { pages: RecipesType[] }) => {
            let rowIndex:number = null;
            let recipeIndex:number = -1;

            oldRecipes?.pages.forEach((row, index) => {
                const recipeIndexItem = row?.data.findIndex((r) => r.id === recipeId);

                if (recipeIndexItem !== -1) {
                    rowIndex = index;
                    recipeIndex = recipeIndexItem
                }

            });

            if (recipeIndex === -1) return;

            const newRecipes = { ...oldRecipes };
            newRecipes.pages[rowIndex].data[recipeIndex].ratings = [{
                rate: newRating.rate,
                recipeId,
            }]

            return newRecipes;
        });
    }

    return { previousRecipes };
};

type UseSetRatingParameters = {
    recipeId: number,
    selectedTags?: string[],
    page: number,
    limit: number
};

export const useSetRating = (options:UseMutationOptions<unknown, AxiosError<any>, APISetRatingParameters>,
    { recipeId, selectedTags, page, limit }:UseSetRatingParameters) => {
    const client = useQueryClient();
    const user: UserType = client.getQueryData('user');

    return useMutation({
        mutationFn: setRating,
        onMutate: async (newRating) => {
            const { previousRecipe } = await updateRecipeInCache(client, recipeId, user.id, newRating);
            const { previousRecipes } = await updateRecipesInCache(client, user.id, newRating, {
                recipeId,
                selectedTags,
                page,
                limit,
            });

            return { previousRecipe, previousRecipes };
        },
        onError: (err, newRecipe, context: any) => {
            client.setQueryData(['recipe', recipeId, user.id], context.previousRecipe);
            client.setQueryData(['recipes', user.id, selectedTags, page, limit], context.previousRecipes);
        },
        ...options,
    });
};

// export const useGetRating = (options: UseQueryOptions<RatingType>, recipeId:number) => {
//     return useQuery<RatingType>(['rating', recipeId], getRatingById, options);
// };