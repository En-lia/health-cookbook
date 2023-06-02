import React, { FC } from 'react';
import Recipes from '../../components/Recipes/Recipes';
import classes from './MainPage.module.scss';
import Filter from '../../components/Filter/Filter';

const MainPage:FC = () => {
    return (
        <div className={classes.mainPage}>
            <Filter />
            <Recipes />
        </div>
    );
};

export default MainPage;