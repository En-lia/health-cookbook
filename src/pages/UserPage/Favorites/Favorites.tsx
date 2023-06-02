import React from 'react';
import classes from '../UserPage.module.scss';

const Favorites = () => {
    return (
        <div>
            <h2 className={classes.userPageContentTitle}>Избранное</h2>
            <div> Здесь будут отображаться рецепты, добавленные в избранное</div>
        </div>
    );
};

export default Favorites;