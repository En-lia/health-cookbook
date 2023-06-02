import { $authHost } from '../index';

export type ProductType = {
    id: number,
    title: string,
    label: string,
    recipeId?: any,
};

export type APICreateProductParameters = Omit<ProductType, 'id'>;
export const createProduct = async (value:APICreateProductParameters): Promise<any> => {
    const { data } = await $authHost.post('api/products', value);
    return data;
};

export const getProducts = async ():Promise<ProductType[]> => {
    const { data } = await $authHost.get('api/products');
    return data;
};