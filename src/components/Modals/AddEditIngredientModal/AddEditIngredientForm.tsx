import React, { FC, useMemo, useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Form, Field } from 'react-final-form';
import classes from '../AdminModal.module.scss';
import formClasses from './AddEditIngredientModal.module.scss';
import HCSelect from '../../UI/Select/HCSelect';
import HCInput from '../../UI/Input/HCInput';
import HCTextArea from '../../UI/TextArea/HCTextArea';
import HCButton from '../../UI/Button/HCButton';
import { INGREDIENT_AMOUNT_TEXT } from '../../../utils/const';
import { useGetProducts } from '../../../service/products/productsHooks';
import { CreateIngredientType } from '../../../service/ingredients/IngredientsAPI';
import CreateProductModal from '../CreateProductModal/CreateProductModal';

type AddEditIngredientFormProps = {
    onClose: () => any,
    onSuccess: (val: any) => any,
    data: any,
};

const AddEditIngredientForm: FC<AddEditIngredientFormProps> = ({ onClose, onSuccess, data }) => {
    const [isProductModalVisible, setIsProductModalVisible] = useState(false);
    const { isLoading, data: products } = useGetProducts({});
    const [initialValue, setInitialValue] = useState({
        productId: data?.productId || null,
        alternativeProductId: data?.alternativeProductId || null,
        measureValue: data?.measureValue || '',
        measure: data?.measure || null,
        preparation: data?.preparation || '',
    });

    const productOptions = useMemo(() => {
        const options: { value: number, label: string }[] = [];
        products?.forEach((product) => {
            options.push({ value: product.id, label: product.label });
        });
        return options;
    }, [products]);

    const measureOptions = useMemo(() => {
        const options: { value: string, label: string }[] = [];
        Object.keys(INGREDIENT_AMOUNT_TEXT).forEach((key: 'count' | 'grams' | 'ml' | 'l' | 'cup' | 'tablespoon' | 'teaspoon' | 'taste') => {
            options.push({ value: key, label: INGREDIENT_AMOUNT_TEXT[key] });
        });
        return options;
    }, []);

    const onSubmit = (value: CreateIngredientType) => {
        onSuccess(value);
    };

    const validate = (values: { productId: number, alternativeProductId: number, measureValue: string, measure: string, preparation: string }) => {
        const errors: {
            productId?: string,
            alternativeProductId?: string,
            measureValue?: string,
            measure?: string,
            preparation?: string,
        } = {};
        if (!values.productId) {
            errors.productId = 'Необходимо выбрать продукт';
        }

        if (!values.measure) {
            errors.measure = 'Поле не может быть пустым';
        }

        if (!values.measureValue && values.measure !== 'taste') {
            errors.measureValue = 'Поле не может быть пустым';
        }

        return errors;
    };

    return (
        <Form
            initialValues={initialValue}
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div className={classes.adminModalBody}>
                        <div className={formClasses.addEditIngredientModalInfoBlock}>
                            <FontAwesomeIcon
                                className={formClasses.addEditIngredientModalInfoIcon}
                                icon={faCircleInfo}
                                size="lg"
                            />
                            <div className={formClasses.addEditIngredientModalInfoText}>Если продукта нет в списке, </div>
                            <HCButton
                                onClick={() => setIsProductModalVisible(true)}
                                className={formClasses.addEditIngredientModalInfoButton}
                            >
                                добавьте новый продукт
                            </HCButton>

                            <CreateProductModal
                                visible={isProductModalVisible}
                                onClose={() => setIsProductModalVisible(false)}
                            />
                        </div>

                        <Field name="productId" allowNull>
                            {({ input, meta }) => (
                                <div>
                                    <div className={classes.adminModalBodyTitle}>Продукт</div>
                                    <HCSelect
                                        {...input}
                                        allowClear
                                        showArrow
                                        style={{ width: '100%' }}
                                        placeholder="Выберите продукт"
                                        options={productOptions}
                                        loading={isLoading}
                                    />
                                    {meta.error && meta.submitFailed
                                        && (
                                            <div className={classes.adminModalErrorMsg}>
                                                {meta.error}
                                            </div>
                                        )}
                                </div>
                            )}
                        </Field>

                        <Field name="alternativeProductId" allowNull>
                            {({ input, meta }) => (
                                <div>
                                    <div className={classes.adminModalBodyTitle}>Альтернативный продукт</div>
                                    <HCSelect
                                        {...input}
                                        allowClear
                                        showArrow
                                        style={{ width: '100%' }}
                                        placeholder="Выберите альтернативный продукт"
                                        options={productOptions}
                                    />
                                    {meta.error && meta.submitFailed
                                        && (
                                            <div className={classes.adminModalErrorMsg}>
                                                {meta.error}
                                            </div>
                                        )}
                                </div>
                            )}
                        </Field>

                        <Field name="measureValue">
                            {({ input, meta }) => (
                                <div>
                                    <div className={classes.adminModalBodyTitle}>Количество</div>
                                    <HCInput {...input} placeholder="Количество продукта. Например, 160 или 1/2" />
                                    {meta.error && meta.submitFailed
                                        && (
                                            <div className={classes.adminModalErrorMsg}>
                                                {meta.error}
                                            </div>
                                        )}
                                </div>
                            )}
                        </Field>

                        <Field name="measure" allowNull>
                            {({ input, meta }) => (
                                <div>
                                    <div className={classes.adminModalBodyTitle}>Единица измерения</div>
                                    <HCSelect
                                        {...input}
                                        allowClear
                                        showArrow
                                        style={{ width: '100%' }}
                                        placeholder="Единица измерения продукта"
                                        options={measureOptions}
                                    />
                                    {meta.error && meta.submitFailed
                                        && (
                                            <div className={classes.adminModalErrorMsg}>
                                                {meta.error}
                                            </div>
                                        )}
                                </div>
                            )}
                        </Field>

                        <Field name="preparation">
                            {({ input, meta }) => (
                                <div>
                                    <div className={classes.adminModalBodyTitle}>Требуется заготовить заранее</div>
                                    <HCTextArea {...input} placeholder="Например, Замочить на ночь орехи" allowClear />
                                    {meta.error && meta.submitFailed
                                        && (
                                            <div className={classes.adminModalErrorMsg}>
                                                {meta.error}
                                            </div>
                                        )}
                                </div>
                            )}
                        </Field>

                    </div>

                    <div className={classes.adminModalFooter}>
                        <HCButton
                            className={classes.adminModalCloseButton}
                            onClick={() => onClose()}
                        >
                            Закрыть
                        </HCButton>
                        <HCButton
                            type="submit"
                            className={classes.adminModalButton}
                        >
                            Добавить
                        </HCButton>
                    </div>
                </form>
            )}
        />
    );
};

export default AddEditIngredientForm;