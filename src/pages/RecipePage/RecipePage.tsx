import React, { FC, useMemo, useState, useContext, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookBookmark, faPencil, faPersonRays, faCheckDouble, faPenNib } from '@fortawesome/free-solid-svg-icons';
import { SwiperSlide } from 'swiper/react';
import { useQueryClient } from 'react-query';
import classes from './RecipePage.module.scss';
import RecipePlaceholder from '../../components/Placeholders/RecipePlaceholder/RecipePlaceholder';
import StarRating from '../../components/StarRating/StarRating';
import RecipeTypes from '../../components/RecipeTypes/RecipeTypes';
import RecipeTags from '../../components/RecipeTags/RecipeTags';
import Slider from '../../components/Slider/Slider';
import { RECIPE_ROUTE, INGREDIENT_AMOUNT_TEXT } from '../../utils/const';
import { useGetRecipeById } from '../../service/recipes/recipeHooks';
import { GetIngredientType } from '../../service/ingredients/IngredientsAPI';
import { GetRecipeType } from '../../service/recipes/RecipeAPI';
import HCLoader from '../../components/UI/Loader/HCLoader';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { useSetRating } from '../../service/rating/ratingHooks';
import { Context } from '../../components/App/App';
import { ModalContext } from '../../components/AppRouter/AppRouter';
import HCButton from '../../components/UI/Button/HCButton';
import { UserType } from '../../service/user/UserAPI';
import { isAdmin } from '../../utils/helper';

const RecipePage: FC = () => {
    const queryClient = useQueryClient();
    const user: UserType = queryClient.getQueryData('user');

    const { filter: { selectedTags, page, limit } } = useContext(Context);

    const { id } = useParams();
    const { isLoading: isRecipeLoading, data: recipe } = useGetRecipeById({}, Number(id));
    const { mutate: setRating } = useSetRating({},
        {
            recipeId: Number(id),
            selectedTags,
            page,
            limit,
        });

    const { recipeModal } = useContext(ModalContext);
    const showRecipeModal = useCallback(() => {
        recipeModal.setRecipeModalRecipeId(id);
        recipeModal.setIsRecipeModalVisible(true);
    }, [id, recipeModal]);

    const setRatingHandler = useCallback((rate: number) => {
        setRating({ recipeId: Number(id), rate });
    }, [id, setRating]);

    const recipeRating = useMemo(() => {
        if (recipe?.ratings) {
            return recipe.ratings[0]?.rate;
        }
    }, [recipe?.ratings]);

    const helpfulRecipes = useMemo(() => {
        if (!recipe?.helpful.length) return null;

        return recipe.helpful.map((helpfulItem) => {
            return helpfulItem.helpfulRecipe;
        });
    }, [recipe?.helpful]);

    const ingredients = useMemo(() => (
        recipe?.ingredients.map((i:GetIngredientType) => (
            <div key={i.id} className={classes.recipePageIngredient}>
                <div className={classes.recipePageIngredientProduct}>
                    {
                        i.product.recipeId
                            ? <Link to={`${RECIPE_ROUTE}/${i.product.recipeId}`}>{i.product.label}</Link>
                            : <span>{i.product.label}</span>
                    }
                    {
                        i.alternative && (i.alternative.recipeId
                            ? <Link to={`${RECIPE_ROUTE}/${i.alternative.recipeId}`}>{`/${i.alternative.label}`}</Link>
                            : <span>{`/${i.alternative.label}`}</span>)
                    }
                </div>
                <span className={classes.recipePageIngredientSeparator} />
                <span className={classes.recipePageIngredientAmount}>
                    {`${i.measureValue ? i.measureValue : ''} ${INGREDIENT_AMOUNT_TEXT[i.measure]}`}
                </span>
            </div>
        ))
    ), [recipe?.ingredients]);

    const inAdvancePreparations = useMemo(() => {
        const products:{ id: number, product: string, preparation: string }[] = [];

        recipe?.ingredients.forEach((i:GetIngredientType) => {
            if (i.preparation?.length) {
                products.push({
                    id: i.product.id,
                    product: i.product.label,
                    preparation: i.preparation,
                });
            }
        });

        return products;
    }, [recipe?.ingredients]);

    if (isRecipeLoading) {
        return <div style={{ height: '100%' }}><HCLoader /></div>;
    }

    return (
        <div className={classes.recipePage}>
            <div className={classes.recipePageHeader}>
                {
                    recipe.photos.length > 0
                        ? (
                            <img
                                src={process.env.APP_HOST + recipe.photos[0].img}
                                alt={recipe.title}
                                className={classes.recipePageHeaderPhoto}
                            />
                        )
                        : <RecipePlaceholder className={classes.recipePageHeaderPhoto} />
                }

                <div className={classes.recipePageHeaderTextContent}>
                    <div className={classes.recipePageHeaderTopPanel}>
                        <RecipeTypes
                            tags={recipe.tags}
                            className={classes.recipePageTypes}
                        />

                        <div className={classes.recipePageHeaderButtonPanel}>
                            <FontAwesomeIcon
                                icon={faBookmark}
                                size="xl"
                                style={{ marginRight: 15 }}
                            />
                            <FontAwesomeIcon
                                icon={faBookBookmark}
                                size="xl"
                                style={{ marginRight: 15 }}
                            />
                            {isAdmin(user) && (
                                <HCButton className={classes.recipeAdminTableEditBtn} onClick={showRecipeModal}>
                                    <FontAwesomeIcon
                                        icon={faPencil}
                                        size="xl"
                                    />
                                </HCButton>
                            )}
                        </div>
                    </div>

                    <h3 className={classes.recipePageTitle}>{ recipe.title}</h3>

                    <div className={classes.recipePageHeaderBottomPanel}>
                        <RecipeTags tags={recipe.tags} className={classes.recipePageTags} />
                        <StarRating rating={recipeRating} changeRating={setRatingHandler} editable />
                    </div>
                </div>
            </div>

            <div className={classes.recipePageInfoContainer}>
                <div className={classes.recipePageInfoBlock}>
                    { recipe.benefit && (
                        <div className={classes.recipePageBenefits}>
                            <h4 className={classes.recipePageSubtitle}>
                                <FontAwesomeIcon
                                    icon={faPersonRays}
                                    size="lg"
                                />
                                {' '}
                                Польза
                            </h4>
                            <div>{recipe.benefit}</div>
                        </div>
                    )}

                    { inAdvancePreparations.length > 0 && (
                        <div className={classes.recipePagePreparation}>
                            <h4 className={classes.recipePageSubtitle}>
                                <FontAwesomeIcon
                                    icon={faCheckDouble}
                                    size="lg"
                                />
                                {' '}
                                Нужно заготовить заранее
                            </h4>
                            <ul style={{ marginLeft: 15 }}>
                                {
                                    inAdvancePreparations.map((i) => (
                                        <li key={i.id}>
                                            <span>{i.product}</span>
                                            <span>{` : ${i.preparation}`}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    )}

                    { false && (
                        <div className={classes.recipePageNotes}>
                            <h4 className={classes.recipePageSubtitle}>
                                <FontAwesomeIcon
                                    icon={faPenNib}
                                    size="lg"
                                />
                                {' '}
                                Мои заметки
                            </h4>
                            Заметки
                        </div>
                    )}
                </div>

                <div className={classes.recipePageIngredients}>
                    {ingredients}
                </div>

                <div className={classes.recipePageCookingContainer}>
                    {
                        recipe.photos.length > 0 && (
                            <Slider className={classes.recipePageCookingSlider}>
                                {
                                    recipe.photos.map((slide, index:number) => (
                                        <SwiperSlide
                                            key={index}
                                            className={classes.recipePageCookingSlide}
                                        >
                                            <img
                                                src={process.env.APP_HOST + slide.img}
                                                alt=""
                                            />
                                        </SwiperSlide>
                                    ))
                                }
                            </Slider>
                        )
                    }
                    <div className={classes.recipePageCooking}>
                        <h4 className={classes.recipePageSubtitle}>Как готовим</h4>
                        <div>{recipe.cooking}</div>
                    </div>
                </div>
                {
                    helpfulRecipes && (
                        <div className={classes.recipePageSimilarRecipes}>
                            <h3 className={classes.recipePageSimilarSubtitle}>
                                Может пригодиться
                            </h3>
                            <div className={classes.recipePageSimilarRecipesContainer}>
                                {
                                    helpfulRecipes.map((helpfulRecipeItem: GetRecipeType) => (
                                        <Link
                                            key={helpfulRecipeItem.id}
                                            to={`${RECIPE_ROUTE}/${helpfulRecipeItem.id}`}
                                        >
                                            <RecipeCard recipe={helpfulRecipeItem} />
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default RecipePage;