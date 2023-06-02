import React from 'react';
import classes from '../UserPage.module.scss';

const MenuBook = () => {
    return (
        <div>
            <h2 className={classes.userPageContentTitle}>Меню на неделю</h2>
            <div> Здесь можно будет составить свое меню на неделю </div>
        </div>
    );
};

export default MenuBook;