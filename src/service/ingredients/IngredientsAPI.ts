import { $authHost } from '../index';
import { ProductType } from '../products/productsAPI';

export type BaseIngredientType = {
    id: number,
    measure: 'count' | 'grams' | 'ml' | 'l' | 'cup' | 'tablespoon' | 'teaspoon' | 'taste',
    measureValue: string,
    preparation: string,
};

export type CreateIngredientType = BaseIngredientType & {
    productId: number,
    alternativeProductId: number,
};

export type GetIngredientType = BaseIngredientType & {
    product: ProductType,
    alternative: ProductType,
};

export type APICreateIngredientParameters = Omit<CreateIngredientType, 'id'>;
export const createIngredient = async (value:APICreateIngredientParameters): Promise<any> => {
    const { data } = await $authHost.post('api/ingredients', value);
    return data;
};

export const getIngredients = async ():Promise<GetIngredientType[]> => {
    const { data } = await $authHost.get('api/ingredients');
    return data;
};