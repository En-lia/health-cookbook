// @ts-nocheck
import React, { FC, useState, useMemo, useEffect } from 'react';
import { notification } from 'antd';
import { Form, Field } from 'react-final-form';
import { useQueryClient } from 'react-query';
import classes from '../AdminModal.module.scss';
import HCInput from '../../UI/Input/HCInput';
import HCButton from '../../UI/Button/HCButton';
import HCSelect from '../../UI/Select/HCSelect';
import HCTextArea from '../../UI/TextArea/HCTextArea';
import { useGetTags } from '../../../service/tags/tagHooks';
import { useCreateRecipe, useGetRecipeById, useGetRecipes } from '../../../service/recipes/recipeHooks';
import { OpenNotificationType } from '../../../utils/types';
import { APICreateRecipeParameters, GetRecipeType } from '../../../service/recipes/RecipeAPI';
import RecipePhotoField from './RecipePhotoField';
import RecipeIngredientsField from './RecipeIngredientsField';
import { TagType } from '../../../service/tags/TagAPI';
import { UserType } from '../../../service/user/UserAPI';
import HCLoader from '../../UI/Loader/HCLoader';

type CreateRecipeFormProps = {
    onClose: () => any,
    onSuccess: () => any,
    recipeId?: number | null,

};

const CreateRecipeForm:FC<CreateRecipeFormProps> = ({ recipeId, onClose, onSuccess }) => {
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

    const [recipeInitialValues, setRecipeInitialValues] = useState({
        title: '',
        benefit: '',
        photos: [],
        tags: [],
        ingredients: [],
        cooking: '',
        helpful: [],
    });

    const { isLoading: isRecipeByIdLoading, data: recipe, refetch } = useGetRecipeById({
        enabled: false,
        onSuccess: (data) => {
            setRecipeInitialValues({
                id: data.id,
                title: data.title,
                benefit: data.benefit,
                photos: data.photos.map((i) => {
                    return {
                        name: i.img,
                        id: i.id,
                        type: `image/${i.img.split('.')[1]}`,
                        thumbUrl: process.env.APP_HOST + i.img,

                    };
                }),
                tags: data.tags.map((r) => r.id),
                ingredients: data.ingredients.map((i) => {
                    return {
                        id: i.id,
                        alternativeProductId: i.alternative?.id,
                        measure: i.measure,
                        measureValue: i.measureValue,
                        preparation: i.preparation,
                        productId: i.product.id,
                    };
                }),
                cooking: data.cooking,
                helpful: data.helpful.map((r) => r.helpfulRecipe.id),
            });
        },
    }, Number(recipeId));

    useEffect(() => {
        if (recipeId) {
            refetch();
        }
    }, [recipeId, refetch]);

    const { isLoading: isTagsLoading, data: tags } = useGetTags({});
    const tagsOptions = useMemo(() => {
        const options: { value: number, label: string }[] = [];
        tags?.forEach((tag: TagType) => {
            options.push({ value: tag.id, label: tag.label });
        });
        return options;
    }, [tags]);

    const { isLoading: isRecipesLoading, data: recipes } = useGetRecipes({}, {});
    const helpfulRecipeOptions = useMemo(() => {
        const options: { value: number, label: string }[] = [];
        recipes?.data?.forEach((rec: GetRecipeType) => {
            options.push({ value: rec.id, label: rec.title });
        });
        return options;
    }, [recipes?.data]);

    const client = useQueryClient();
    const user: UserType = client.getQueryData('user');
    const { isLoading: isRecipeLoading, mutate: create } = useCreateRecipe(
        {
            onSuccess: () => {
                client.invalidateQueries(['recipes', user.id]);

                openNotification({
                    message: recipeId ? 'Рецепт отредактирован' : 'Рецепт создан',
                    type: 'success',
                    onClose: onSuccess,
                    duration: 1,
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

    const onSubmit = (value: APICreateRecipeParameters) => {
        if (isRecipeLoading) return;

        const formData = new FormData();
        Object.keys(value).forEach((key) => {
            if (key === 'photos') {
                value[key].forEach((photo) => {
                    let file = null;
                    if (!photo.originFileObj) {
                        file = new File([photo.img], photo.name, {
                            ...photo,
                        });
                    }
                    formData.append(`${key}`, photo.originFileObj || file);
                });
            } else {
                const itemValue = typeof value[key] === 'object' ? JSON.stringify(value[key]) : value[key];
                formData.append(`${key}`, itemValue);
            }
        });

        create(formData);
    };

    const validate = (values: APICreateRecipeParameters) => {
        const errors: {
            title?: string,
            benefit?: string,
            cooking?: string,
            tags?: string,
            ingredients?: [],
            helpful?: number[],
        } = {};

        if (!values.title) {
            errors.title = 'Поле не может быть пустым';
        }

        if (values.title?.length > 255) {
            errors.title = 'Максимальная длинна не должна превышать 255 символов';
        }

        if (values.benefit?.length > 255) {
            errors.benefit = 'Максимальная длинна не должна превышать 255 символов';
        }

        if (!values.cooking) {
            errors.cooking = 'Поле не может быть пустым';
        }

        if (values.cooking?.length > 2000) {
            errors.cooking = 'Максимальная длинна не должна превышать 2000 символов';
        }

        if (!values.ingredients?.length) {
            errors.ingredients = 'Следует добавить ингредиенты для рецепта';
        }

        return errors;
    };

    if (isRecipeByIdLoading) {
        return (
            <div style={{ height: '600px' }}><HCLoader /></div>
        );
    }

    return (
        <Form
            initialValues={recipeInitialValues}
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit, values, form }) => {
                return (
                    <form onSubmit={handleSubmit}>
                        {contextHolder}
                        <div className={classes.adminModalBody}>
                            <Field name="title">
                                {({ input, meta }) => (
                                    <div>
                                        <div className={classes.adminModalBodyTitle}>
                                            Название
                                        </div>
                                        <HCInput {...input} placeholder="Например, Сырники из пшенки" />
                                        {meta.error && meta.submitFailed
                                            && (
                                                <div className={classes.adminModalErrorMsg}>
                                                    {meta.error}
                                                </div>
                                            )}
                                    </div>
                                )}
                            </Field>

                            <Field name="benefit">
                                {({ input, meta }) => (
                                    <div>
                                        <div className={classes.adminModalBodyTitle}>
                                            Польза
                                        </div>
                                        <HCTextArea {...input} placeholder="Например, Повышает кальций" allowClear />
                                        {meta.error && meta.submitFailed
                                            && (
                                                <div className={classes.adminModalErrorMsg}>
                                                    {meta.error}
                                                </div>
                                            )}
                                    </div>
                                )}
                            </Field>

                            <Field name="ingredients">
                                {({ input, meta }) => (
                                    <div>
                                        <RecipeIngredientsField ingredientsData={input} />

                                        {meta.error && meta.submitFailed
                                            && (
                                                <div className={classes.adminModalErrorMsg}>
                                                    {meta.error}
                                                </div>
                                            )}
                                    </div>
                                )}
                            </Field>

                            <Field name="cooking">
                                {({ input, meta }) => (
                                    <div>
                                        <div className={classes.adminModalBodyTitle}>
                                            Приготовление
                                        </div>
                                        <HCTextArea
                                            {...input}
                                            placeholder="Например, Смешать все ингредиенты"
                                            allowClear
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

                            <Field name="tags">
                                {({ input, meta }) => (
                                    <div>
                                        <div className={classes.adminModalBodyTitle}>
                                            Тэги
                                        </div>
                                        <HCSelect
                                            {...input}
                                            mode="multiple"
                                            allowClear
                                            showArrow
                                            style={{ width: '100%' }}
                                            placeholder="Выберите теги"
                                            options={tagsOptions}
                                            loading={isTagsLoading}
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

                            <Field name="helpful">
                                {({ input, meta }) => (
                                    <div>
                                        <div className={classes.adminModalBodyTitle}>
                                            Похожие рецепты
                                        </div>
                                        <HCSelect
                                            {...input}
                                            mode="multiple"
                                            allowClear
                                            showArrow
                                            style={{ width: '100%' }}
                                            placeholder="Выберите похожие рецепты"
                                            options={helpfulRecipeOptions}
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

                            <Field name="photos">
                                {({ input }) => (
                                    <RecipePhotoField uploadData={input} />
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
                                disabled={isRecipeLoading}
                                isLoading={isRecipeLoading}
                                className={classes.adminModalButton}
                            >
                                {recipeId ? 'Редактировать' : 'Добавить'}
                            </HCButton>
                        </div>
                    </form>
                );
            }}
        />
    );
};

export default CreateRecipeForm;