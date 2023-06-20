import React, {FC, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Recipes.module.scss';
import HCLoader from '../UI/Loader/HCLoader';
import RecipeCard from '../RecipeCard/RecipeCard';
import { RECIPE_ROUTE } from '../../utils/const';
import {useGetInfiniteRecipes, useGetRecipes} from '../../service/recipes/recipeHooks';
import {GetRecipeType, RecipesType} from '../../service/recipes/RecipeAPI';
import { Context } from '../App/App';
import NoFoundPlaceholder from '../Placeholders/NoFoundPlaceholder/NoFoundPlaceholder';
import { debounce } from 'lodash';

const Recipes: FC = () => {
    const navigate = useNavigate();
    const { filter: { selectedTags, setSelectedTag, page, limit } } = useContext(Context);
    const allSelectedTags = useMemo(() => selectedTags && Object.keys(selectedTags), [selectedTags]);
    const [currentPage, setCurrentPage] = useState(1);
    const { isLoading: isRecipesLoading, data:recipes, fetchNextPage } = useGetInfiniteRecipes(
        {
            getNextPageParam: (lastPage, allPages) => {
                return  currentPage <  Math.ceil(lastPage.count/limit ) ? currentPage + 1 : undefined;
            },
        },
        { selectedTags: allSelectedTags, limit, page });

    const recipesData = useMemo(()=>{
        return recipes?.pages.map(item => item.data).flat();
    }, [recipes?.pages]);

    const pageCount = useMemo(()=>{
        return Math.ceil(recipes?.pages[0].count/limit );
    }, [recipes?.pages[0].count, limit]);

    const scrollHandler = useCallback((e?: any) => {
        const isBottomOfPage = e?.target?.documentElement.scrollHeight-(e?.target?.documentElement.scrollTop+window.innerHeight) < 200;
        if (isBottomOfPage && !isRecipesLoading && currentPage < pageCount && recipesData.length < recipes?.pages[0].count) {
            setCurrentPage(currentPage+1);
            fetchNextPage();
        };
    }, [isRecipesLoading, currentPage]);

    const debounceScroll = useMemo(() => {
        return debounce(scrollHandler, 150);
    }, [scrollHandler]);

    useEffect(() => {
        debounceScroll();
    }, [debounceScroll]);

    useEffect(()=> {
        document.addEventListener('scroll', scrollHandler);

        return function () {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, [scrollHandler]);

    if (isRecipesLoading && currentPage === 1) {
        return <div style={{ height: '100%' }}><HCLoader /></div>;
    }

    return (
        <>
            { recipesData.length
                ? (
                    <div className={classes.recipes}>
                        {recipesData.map((recipe: GetRecipeType) => (
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