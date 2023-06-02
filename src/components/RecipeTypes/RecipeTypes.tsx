import React, { FC, useMemo } from 'react';
import classNames from 'classnames';
import classes from './RecipeTypes.module.scss';
import { resolveColor } from '../../utils/helper';
import { TagType } from '../../service/tags/TagAPI';

type RecipeTypesProps = {
    tags: TagType[],
    color?: string,
    className?: string,
};

const RecipeTypes:FC<RecipeTypesProps> = ({ tags, className, color }) => {
    const types = useMemo(() => {
        return tags?.filter((i) => i.group.title === 'meals' || i.group.title === 'types');
    }, [tags]);
    const recipeTypesClassName = classNames(classes.recipeTypes, className);

    return (
        <div className={recipeTypesClassName} style={{ color: resolveColor(color) }}>
            {
                types.map((i) => (
                    <span
                        key={i.title}
                        className={classes.recipeTypesItem}
                    >
                        {i.label}
                    </span>
                ))
            }
        </div>
    );
};

export default RecipeTypes;