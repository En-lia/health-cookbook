import React, { FC, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import classes from './RecipeTags.module.scss';
import { tagsIcons } from '../../utils/tagsIcon';
import { resolveColor } from '../../utils/helper';
import { TagType } from '../../service/tags/TagAPI';

type RecipeTagsProps = {
    tags: TagType[],
    color?: string,
    className?: string,
    size?: SizeProp,
};

const RecipeTags: FC <RecipeTagsProps> = ({ tags, className, color, size = 'xl' }) => {
    const recipeTags = useMemo(() => {
        return tags?.filter((i) => i.group.title === 'tags' || i.group.title === 'benefits');
    }, [tags]);
    const recipeTagsClassName = classNames(classes.recipeTags, className);

    return (
        <div className={recipeTagsClassName} style={{ color: resolveColor(color) }}>
            {
                recipeTags.map((i) => (
                    <span
                        key={i.title}
                        className={classes.recipeTagItem}
                    >
                        {
                            tagsIcons[i.title]
                                ? (
                                    <FontAwesomeIcon
                                        icon={tagsIcons[i.title]}
                                        size={size}
                                    />
                                )
                                : i.title
                        }
                    </span>
                ))
            }
        </div>

    );
};

export default RecipeTags;