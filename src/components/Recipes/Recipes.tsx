import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Recipes.module.scss';
import HCLoader from '../UI/Loader/HCLoader';
import RecipeCard from '../RecipeCard/RecipeCard';
import { RECIPE_ROUTE } from '../../utils/const';
import { useGetRecipes } from '../../service/recipes/recipeHooks';
import { GetRecipeType } from '../../service/recipes/RecipeAPI';
import { Context } from '../App/App';
import NoFoundPlaceholder from '../Placeholders/NoFoundPlaceholder/NoFoundPlaceholder';

const Recipes: FC = () => {
    const navigate = useNavigate();
    const { filter: { selectedTags, setSelectedTag, page, limit } } = useContext(Context);
    const allSelectedTags = useMemo(() => selectedTags && Object.keys(selectedTags), [selectedTags]);

    const { isLoading: isRecipesLoading, data: recipes } = useGetRecipes(
        {},
        { selectedTags: allSelectedTags, page, limit });

    if (isRecipesLoading) {
        return <div style={{ height: '100%' }}><HCLoader /></div>;
    }

    return (
        <>
            { recipes?.data.length
                ? (
                    <div className={classes.recipes}>
                        {recipes.data.map((recipe: GetRecipeType) => (
                            <div
                                key={recipe.id}
                                onClick={() => {
                                    navigate(`${RECIPE_ROUTE}/${recipe.id}`);
                                    setSelectedTag(null);
                                }}
                                className={classes.recipesItem}
                            >
                                <RecipeCard recipe={recipe} />
                            </div>
                        ))}
                    </div>
                )

                : (
                    <div className={classes.recipesNoFoundPlaceholder}>
                        <NoFoundPlaceholder />
                    </div>
                )}
        </>

    );
};

export default Recipes;