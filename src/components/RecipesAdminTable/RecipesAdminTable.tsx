import React, { FC, useMemo, useCallback, useContext } from 'react';
import { Space, Table, Popconfirm, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useQueryClient } from 'react-query';
import { useCreateRecipe, useDeleteRecipe, useGetRecipes } from '../../service/recipes/recipeHooks';
import HCLoader from '../UI/Loader/HCLoader';
import { TagType } from '../../service/tags/TagAPI';
import HCButton from '../UI/Button/HCButton';
import classes from './RecipeAdminTable.module.scss';
import { GetRecipeType, RecipesType } from '../../service/recipes/RecipeAPI';
import { ModalContext } from '../AppRouter/AppRouter';
import { UserType } from '../../service/user/UserAPI';
import { OpenNotificationType } from '../../utils/types';

// const columns = [
// {
//     title: 'Польза',
//     dataIndex: 'benefit',
//     key: 'benefit',
// },
// {
//     title: 'Приготовление',
//     dataIndex: 'cooking',
//     key: 'cooking',
// },
// {
//     title: 'Теги',
//     dataIndex: 'tags',
//     key: 'tags',
//     render: (_:any, { tags }: { tags: TagType[] }) => (
//         <>
//             {tags.map((tag) => {
//                 const color = (tag.group.title === 'meals' || tag.group.title === 'types') ? 'green' : 'yellow';
//
//                 return (
//                     <Tag color={color} key={tag.id}>
//                         {tag.label}
//                     </Tag>
//                 );
//             })}
//         </>
//     ),
// },
// ...actionColumn,
// ];

const RecipesAdminTable:FC = () => {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = ({ message, duration, description, type = 'info' }: OpenNotificationType) => {
        api[type]({
            message,
            description,
            type,
            placement: 'bottom',
            duration,
        });
    };

    const { isLoading: isRecipesLoading, data: recipes } = useGetRecipes({}, { limit: 100 });

    const dataSource = useMemo(() => {
        return recipes?.data.map((recipe) => {
            return { ...recipe, key: recipe.id };
        });
    }, [recipes?.data]);

    const { recipeModal } = useContext(ModalContext);
    const showRecipeModal = useCallback((id:number) => {
        recipeModal.setRecipeModalRecipeId(id);
        recipeModal.setIsRecipeModalVisible(true);
    }, [recipeModal]);

    const client = useQueryClient();
    const user: UserType = client.getQueryData('user');
    const { isLoading: isDeleteRecipeLoading, mutate: deleteRecipe } = useDeleteRecipe(
        {
            onSuccess: () => {
                client.invalidateQueries(['recipes', user.id]);

                openNotification({
                    message: 'Рецепт удален',
                    type: 'success',
                    duration: 1,
                });
            },
            onError: (e) => {
                const { message } = e.response.data;
                openNotification({
                    message,
                    type: 'error',
                });
            },
        });
    const deleteRecipeHandler = useCallback((record:GetRecipeType) => {
        deleteRecipe(record.id);
    }, [deleteRecipe]);

    const tableChangeHandler = useCallback((data: any) => {
        console.log('tableChangeHandler');
        console.log(data);
    }, []);

    const columns = useMemo(() => {
        return [
            {
                title: '№',
                dataIndex: 'point',
                key: 'point',
                render: (_: any, record: GetRecipeType, index:number) => {
                    return (
                        <span>{index + 1}</span>
                    );
                },
            },
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Название',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'Действия',
                key: 'action',
                render: (_: any, record: GetRecipeType) => {
                    return (
                        <Space size="middle">
                            <HCButton className={classes.recipeAdminTableEditBtn} onClick={() => showRecipeModal(record.id)}>
                                <FontAwesomeIcon
                                    icon={faPenToSquare}
                                    size="lg"
                                />
                            </HCButton>
                            <Popconfirm
                                placement="top"
                                title="Удалить этот рецепт?"
                                onConfirm={() => deleteRecipeHandler(record)}
                                okText="Удалить"
                                cancelText="Отмена"
                            >
                                <HCButton className={classes.recipeAdminTableDeleteBtn}>
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        size="lg"
                                    />
                                </HCButton>
                            </Popconfirm>
                        </Space>
                    );
                },
            },
        ];
    }, [deleteRecipeHandler, showRecipeModal]);

    if (isRecipesLoading) {
        return <div><HCLoader /></div>;
    }

    return (
        <div className={classes.recipeAdminTable}>
            {contextHolder}
            <h3 className={classes.recipeAdminTableTitle}>Рецепты</h3>
            <Table bordered dataSource={dataSource} columns={columns} onChange={tableChangeHandler} />
        </div>
    );
};

export default RecipesAdminTable;
