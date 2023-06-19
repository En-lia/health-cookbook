import React, { FC, useMemo } from 'react';
import { Form, Field } from 'react-final-form';
import { useQueryClient } from 'react-query';
import { notification } from 'antd';
import classes from '../AdminModal.module.scss';
import HCInput from '../../UI/Input/HCInput';
import HCButton from '../../UI/Button/HCButton';
import { isTitleValidate } from '../../../utils/validate';
import { OpenNotificationType } from '../../../utils/types';
import { useCreateProduct } from '../../../service/products/productsHooks';
import { APICreateProductParameters } from '../../../service/products/productsAPI';
import HCSelect from '../../UI/Select/HCSelect';
import { useGetRecipes } from '../../../service/recipes/recipeHooks';
import { GetRecipeType } from '../../../service/recipes/RecipeAPI';

type CreateGroupFormProps = {
    onClose: () => any,
    onSuccess: () => any,
};

const CreateProductForm:FC<CreateGroupFormProps> = ({ onClose, onSuccess }) => {
    const { isLoading: isRecipesLoading, data: recipes } = useGetRecipes({}, {limit: 100});

    const productRecipeOptions = useMemo(() => {
        const options: { value: number, label: string }[] = [];
        recipes?.data?.forEach((rec: GetRecipeType) => {
            options.push({ value: rec.id, label: rec.title });
        });
        return options;
    }, [recipes?.data]);

    const [api, contextHolder] = notification.useNotification();
    const openNotification = ({ message, duration, description, type = 'info' }: OpenNotificationType) => {
        api[type]({
            message,
            description,
            type,
            placement: 'bottom',
            onClose,
            duration,
        });
    };

    const client = useQueryClient();
    const { mutate: create, isLoading: isCreateProductLoading } = useCreateProduct(
        {
            onSuccess: () => {
                client.invalidateQueries('products');

                openNotification({
                    message: 'Продук создан',
                    type: 'success',
                    duration: 1.5,
                    onClose: onSuccess,
                });
            },
            onError: (e) => {
                const { message } = e.response.data;
                openNotification({
                    message,
                    type: 'error',
                    onClose,
                });
            },
        });

    const onSubmit = async ({ title, label, recipeId }: APICreateProductParameters) => {
        create({ title, label, recipeId });
    };

    const validate = (values: { title:string, label: string, recipeId: number }) => {
        const errors: {
            title?: string,
            label?: string,
            recipeId?: number,
        } = {};
        if (!values.title) {
            errors.title = 'Поле не может быть пустым';
        }

        if (!isTitleValidate(values.title)) {
            errors.title = 'Поле должно содержать только латинские символы без пробелов';
        }

        if (values.title?.length > 30) {
            errors.title = 'Максимальная длина не должна превышать 30 символов';
        }

        if (!values.label) {
            errors.label = 'Поле не может быть пустым';
        }

        if (values.label?.length > 30) {
            errors.label = 'Максимальная длинна не должна превышать 30 символов';
        }

        return errors;
    };
    const productInitialValues: APICreateProductParameters = {
        title: '',
        label: '',
        recipeId: null,
    };
    return (
        <Form
            initialValues={productInitialValues}
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    {contextHolder}
                    <div className={classes.adminModalBody}>
                        <Field name="title">
                            {({ input, meta }) => (
                                <div>
                                    <div className={classes.adminModalBodyTitle}>Title</div>
                                    <HCInput {...input} placeholder="Например, almondMilk" />
                                    {meta.error && meta.submitFailed
                                        && (
                                            <div className={classes.adminModalErrorMsg}>
                                                {meta.error}
                                            </div>
                                        )}
                                </div>
                            )}
                        </Field>

                        <Field name="label">
                            {({ input, meta }) => (
                                <div>
                                    <div className={classes.adminModalBodyTitle}>Label</div>
                                    <HCInput {...input} placeholder="Например, Миндальное молоко" />
                                    {meta.error && meta.submitFailed
                                        && (
                                            <div className={classes.adminModalErrorMsg}>
                                                {meta.error}
                                            </div>
                                        )}
                                </div>
                            )}
                        </Field>

                        <Field name="recipeId" allowNull>
                            {({ input, meta }) => (
                                <div>
                                    <div className={classes.adminModalBodyTitle}>
                                        Рецепт приготовления продукта
                                    </div>
                                    <HCSelect
                                        {...input}
                                        style={{ width: '100%' }}
                                        placeholder="Выберите рецепт"
                                        options={productRecipeOptions}
                                        allowClear
                                        loading={isRecipesLoading}
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
                            disabled={isCreateProductLoading}
                            isLoading={isCreateProductLoading}
                        >
                            Добавить
                        </HCButton>
                    </div>
                </form>
            )}
        />
    );
};

export default CreateProductForm;