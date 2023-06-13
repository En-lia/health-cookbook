export const BASE_URL = process.env.NODE_ENV === "production" ? '/health-cookbook/' : '/';
export const ADMIN_ROUTE = `${BASE_URL}admin`;
export const LOGIN_ROUTE = `${BASE_URL}login`;
export const REGISTRATION_ROUTE = `${BASE_URL}registration`;
export const MAIN_PAGE_ROUTE = `${BASE_URL}`;
export const RECIPE_ROUTE = `${BASE_URL}recipe`;
export const USER_PAGE_ROUTE = `${BASE_URL}user`;
export const FAVORITES_PAGE_ROUTE = `${BASE_URL}favorites`;
export const MENUBOOK_PAGE_ROUTE = `${BASE_URL}menubook`;
export const DETOX_PAGE_ROUTE = `${BASE_URL}detox`;
export const INGREDIENT_AMOUNT_TEXT = {
    count: 'шт',
    grams: 'г',
    ml: 'мл',
    l: 'л',
    cup: 'стакан',
    tablespoon: 'ст. л.',
    teaspoon: 'ч. л.',
    taste: 'по вкусу',
};
export const ROLES = {
    admin: 1,
    superadmin: 2,
    user: 3,
};