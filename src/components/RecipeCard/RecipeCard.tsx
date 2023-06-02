import React, { FC, useMemo, useCallback } from 'react';
import { faBookBookmark, faStar } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './RecipeCard.module.scss';
import RecipePlaceholder from '../Placeholders/RecipePlaceholder/RecipePlaceholder';
import StarRating from '../StarRating/StarRating';
import RecipeTags from '../RecipeTags/RecipeTags';
import RecipeTypes from '../RecipeTypes/RecipeTypes';
import { GetRecipeType } from '../../service/recipes/RecipeAPI';

type RecipeCardProps = {
    recipe: GetRecipeType,
};

const RecipeCard:FC<RecipeCardProps> = ({ recipe: { title, tags, photos, benefit, ratings } }) => {
    const recipeRating = useMemo(() => {
        if (ratings) {
            return ratings[0]?.rate;
        }
    }, [ratings]);

    return (
        <div className={classes.recipeCard}>
            <div className={classes.recipeCardWrapper}>
                <RecipeTypes tags={tags} className={classes.recipeCardTypes} />
                <h3 className={classes.recipeCardTitle}>{title}</h3>
                <div className={classes.recipeCardContent}>
                    <div className={classes.recipeCardPhoto}>
                        {
                            photos.length > 0
                                ? <img src={process.env.APP_HOST + photos[0].img} alt={title} />
                                : <RecipePlaceholder />
                        }

                    </div>
                    <div>
                        <RecipeTags tags={tags} color="gray" size="lg" className={classes.recipeCardTags} />
                        <div className={classes.recipeCardDescription}>
                            {benefit}
                        </div>
                    </div>

                </div>
            </div>
            <div className={classes.recipeCardFooter}>
                <div className={classes.recipeCardRatingStars}>
                    <StarRating rating={recipeRating} size="lg" />
                </div>

                <div>
                    <FontAwesomeIcon
                        icon={faBookmark}
                        size="lg"
                        style={{ marginRight: 15, cursor: 'no-drop' }}
                    />
                    <FontAwesomeIcon
                        icon={faBookBookmark}
                        size="lg"
                        style={{ cursor: 'no-drop' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;