import React from 'react';
import { RouteObject } from 'react-router-dom';
import AdminPage from '../pages/AdminPage/AdminPage';
import {
    ADMIN_ROUTE, DETOX_PAGE_ROUTE, FAVORITES_PAGE_ROUTE,
    LOGIN_ROUTE,
    MAIN_PAGE_ROUTE, MENUBOOK_PAGE_ROUTE,
    RECIPE_ROUTE,
    REGISTRATION_ROUTE,
    USER_PAGE_ROUTE,
} from '../utils/const';
import RecipePage from '../pages/RecipePage/RecipePage';
import AuthPage from '../pages/AuthPage/AuthPage';
import MainPage from '../pages/MainPage/MainPage';
import UserPage from '../pages/UserPage/UserPage';
// import Favorites from '../pages/Favorites/FavoritesPage';
// import RecipeBook from '../pages/UserPage/RecipeBook/RecipeBookPage';
// import Detox from '../pages/UserPage/Detox/DetoxPage';

export const authRoutes: RouteObject[] = [
    {
        path: ADMIN_ROUTE,
        element: <AdminPage />,
        index: false,
    },
    {
        path: MAIN_PAGE_ROUTE,
        element: <MainPage />,
        index: true,
    },
    {
        path: `${RECIPE_ROUTE}/:id`,
        element: <RecipePage />,
        index: false,
    },
    {
        path: USER_PAGE_ROUTE,
        element: <UserPage />,
        index: false,
    },
    {
        path: FAVORITES_PAGE_ROUTE,
        element: <UserPage />,
        index: false,
    },
    {
        path: MENUBOOK_PAGE_ROUTE,
        element: <UserPage />,
        index: false,
    },
    {
        path: DETOX_PAGE_ROUTE,
        element: <UserPage />,
        index: false,
    },
    {
        path: `${DETOX_PAGE_ROUTE}/:id`,
        element: <UserPage />,
        index: false,
    },
];

export const publicRoutes: RouteObject[] = [
    {
        path: LOGIN_ROUTE,
        element: <AuthPage />,
        index: false,
    },
    {
        path: REGISTRATION_ROUTE,
        element: <AuthPage />,
        index: false,
    },
];