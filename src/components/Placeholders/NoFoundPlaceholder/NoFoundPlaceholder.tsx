import React, { FC } from 'react';
import classNames from 'classnames';
import classes from './NoFoundPlaceholder.module.scss';

type NoFoundPlaceholderProps = {
    className?: string,
};

const NoFoundPlaceholder:FC<NoFoundPlaceholderProps> = ({ className }) => {
    const noFoundPlaceholderClassName = classNames(classes.noFoundPlaceholder, className);

    return (
        <div className={noFoundPlaceholderClassName}>
            <img alt="Ничего не найдено" src="/assets/images/placeholders/noResult.svg" />
            <h4> НИЧЕГО НЕ НАЙДЕНО :( </h4>
        </div>
    );
};

export default NoFoundPlaceholder;