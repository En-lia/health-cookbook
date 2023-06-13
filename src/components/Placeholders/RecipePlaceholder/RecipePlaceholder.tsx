import React, { FC } from 'react';
import classNames from 'classnames';
import classes from './RecipePlaceholder.module.scss';
import recipePlaceholder from '../../../assets/images/placeholders/recipePlaceholder.svg'

type RecipePlaceholderProps = {
    className?: string,
};

const RecipePlaceholder:FC<RecipePlaceholderProps> = ({ className }) => {
    const recipePlaceholderClassName = classNames(classes.recipePlaceholder, className);

    return (
        <img alt="" src={recipePlaceholder} className={recipePlaceholderClassName} />
    );
};

export default RecipePlaceholder;