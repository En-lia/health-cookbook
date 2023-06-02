import React, { FC } from 'react';
import classNames from 'classnames';
import classes from './RecipePlaceholder.module.scss';

type RecipePlaceholderProps = {
    className?: string,
};

const RecipePlaceholder:FC<RecipePlaceholderProps> = ({ className }) => {
    const recipePlaceholderClassName = classNames(classes.recipePlaceholder, className);

    return (
        <img alt="" src="/assets/images/placeholders/recipePlaceholder.svg" className={recipePlaceholderClassName} />
    );
};

export default RecipePlaceholder;