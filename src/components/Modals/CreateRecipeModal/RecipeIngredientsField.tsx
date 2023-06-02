import React, { FC, useState, useCallback } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from '../AdminModal.module.scss';
import modalClasses from './CreateRecipeModal.module.scss';
import { CreateIngredientType } from '../../../service/ingredients/IngredientsAPI';
import { INGREDIENT_AMOUNT_TEXT } from '../../../utils/const';
import HCButton from '../../UI/Button/HCButton';
import AddEditIngredientModal from '../AddEditIngredientModal/AddEditIngredientModal';
import { useGetProducts } from '../../../service/products/productsHooks';

type RecipeIngredientsFieldProps = {
    ingredientsData: FieldRenderProps<string, HTMLInputElement>,
};

const RecipeIngredientsField: FC<RecipeIngredientsFieldProps> = ({ ingredientsData: { value, name, onChange, ...input } }) => {
    const { data: products } = useGetProducts({});
    const [currentIngredientIndex, setCurrentIngredientIndex] = useState(null);
    const [isIngredientModalVisible, setIsIngredientModalVisible] = useState(false);

    // todo переделать на бэке продукты. массив на объект
    const getProductName = useCallback((id: number) => {
        const product = products.find((prod) => prod.id === id);
        return product.label;
    }, [products]);

    const onCloseModalHandler = useCallback(() => {
        setCurrentIngredientIndex(null);
        setIsIngredientModalVisible(false);
    }, []);

    const onSuccessModalHandler = useCallback((val: CreateIngredientType) => {
        const ingredients = [...value];

        if (currentIngredientIndex === null) {
            ingredients.push(val);
        } else {
            ingredients[currentIngredientIndex] = val;
        }

        onChange(ingredients);
        onCloseModalHandler();
    }, [currentIngredientIndex, onChange, onCloseModalHandler, value]);

    const removeIngredient = useCallback((index: number) => {
        const ingredients = [...value];
        ingredients.splice(index, 1);
        onChange(ingredients);
    }, [onChange, value]);

    return (
        <div>
            <div className={classes.adminModalBodyTitle}>Ингредиенты</div>
            <div className={modalClasses.createRecipeModalIngredients}>
                {value.map((ing: CreateIngredientType, index:number) => (
                    <div
                        key={index}
                        className={modalClasses.createRecipeModalIngredientItem}
                    >
                        <span>{index + 1}</span>
                        <span>
                            {getProductName(ing.productId)}
                        </span>
                        <div>
                            <span>{ing.measureValue}</span>
                            <span>{INGREDIENT_AMOUNT_TEXT[ing.measure]}</span>
                        </div>

                        <div>
                            <HCButton onClick={() => {
                                setCurrentIngredientIndex(index);
                                setIsIngredientModalVisible(true);
                            }}
                            >
                                <FontAwesomeIcon
                                    icon={faPen}
                                    size="sm"
                                />
                            </HCButton>
                            <HCButton
                                onClick={() => removeIngredient(index)}
                                className={modalClasses.createRecipeModalDeleteButton}
                            >
                                <FontAwesomeIcon
                                    icon={faTrashCan}
                                    size="sm"
                                />
                            </HCButton>
                        </div>
                    </div>
                ))}
                <div className={modalClasses.createRecipeModalIngredientItem}>
                    <span>{value.length + 1}</span>
                    <HCButton
                        onClick={() => {
                            setIsIngredientModalVisible(true);
                        }}
                        className={modalClasses.createRecipeModalAddButton}
                    >
                        + Добавить
                    </HCButton>
                </div>
            </div>
            <AddEditIngredientModal
                visible={isIngredientModalVisible}
                modalData={value.length ? value[currentIngredientIndex] : null}
                onClose={onCloseModalHandler}
                onSuccess={onSuccessModalHandler}
            />
        </div>
    );
};

export default RecipeIngredientsField;