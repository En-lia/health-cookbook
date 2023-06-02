import React, { FC, useState, useMemo, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as filledStarIcon } from '@fortawesome/free-solid-svg-icons';
import { faStar as unfilledStarIcon, IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import classes from './StarRating.module.scss';
import HcButton from '../UI/Button/HCButton';

type StarRatingProps = {
    rating: number,
    changeRating?: React.Dispatch<React.SetStateAction<number>>,
    size?: SizeProp,
    editable?: boolean,
};
const StarRating: FC<StarRatingProps> = ({ rating, changeRating, size = 'xl', editable = false }) => {
    const [starRating, setStarRating] = useState(rating);
    const [stars, setStars] = useState< IconDefinition[]>([]);

    useEffect(() => {
        const starsIcon: IconDefinition[] = [];

        [...Array(5)].forEach((item, index) => {
            if (index + 1 <= starRating) {
                starsIcon.push(filledStarIcon);
            } else {
                starsIcon.push(unfilledStarIcon);
            }
        });
        setStars(starsIcon);
    }, [starRating]);

    const mouseEnterHandler = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        if (!editable) return;

        const el = e.target as HTMLButtonElement;
        const starCount = Number(el.getAttribute('data-star'));

        if (starCount) {
            setStarRating(starCount);
        }
    }, [editable]);

    const mouseLeaveHandler = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        if (!editable) return;

        setStarRating(rating);
    }, [editable, rating]);

    const onClickHandler = useCallback((starCount: number) => {
        if (!editable) return;

        changeRating(starCount);
    }, [changeRating, editable]);

    return (
        <div className={classes.starRating} onClick={(e) => e.preventDefault()}>
            {
                stars.map((star, index) => {
                    const starCount = index + 1;
                    return (
                        <HcButton
                            key={starCount}
                            onMouseLeave={mouseLeaveHandler}
                            onMouseEnter={mouseEnterHandler}
                            onClick={() => onClickHandler(starCount)}
                        >
                            <FontAwesomeIcon
                                data-star={starCount}
                                icon={star}
                                size={size}
                            />
                        </HcButton>
                    );
                })
            }
        </div>
    );
};

export default StarRating;