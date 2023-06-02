import React, { FC, useState, useCallback, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faObjectGroup, faTag, faFileCirclePlus, faPlateWheat } from '@fortawesome/free-solid-svg-icons';
import HCButton from '../../components/UI/Button/HCButton';
import classes from './AdminPage.module.scss';
import CreateTagModal from '../../components/Modals/CreateTagModal/CreateTagModal';
import CreateGroupModal from '../../components/Modals/CreateGroupModal/CreateGroupModal';
import CreateProductModal from '../../components/Modals/CreateProductModal/CreateProductModal';
import RecipesAdminTable from '../../components/RecipesAdminTable/RecipesAdminTable';
import { ModalContext } from '../../components/AppRouter/AppRouter';

const AdminPage:FC = () => {
    const [isTagModalVisible, setIsTagModalVisible] = useState(false);
    const [isGroupModalVisible, setIsGroupModalVisible] = useState(false);
    const [isProductModalVisible, setIsProductModalVisible] = useState(false);

    const { recipeModal } = useContext(ModalContext);
    const createRecipeHandler = useCallback(() => {
        recipeModal.setIsRecipeModalVisible(true);
    }, [recipeModal]);

    return (
        <div className={classes.adminPage}>
            <h1 className={classes.adminPageTitle}>Страница администратора</h1>
            <div className={classes.adminPageButtonPanel}>
                <HCButton
                    onClick={() => setIsGroupModalVisible(true)}
                    className={classes.adminPageButton}
                >
                    <FontAwesomeIcon
                        icon={faObjectGroup}
                        size="lg"
                        style={{ marginRight: '5px' }}
                    />
                    Добавить группу
                </HCButton>

                <HCButton
                    onClick={() => setIsTagModalVisible(true)}
                    className={classes.adminPageButton}
                >
                    <FontAwesomeIcon
                        icon={faTag}
                        size="lg"
                        style={{ marginRight: '5px' }}
                    />
                    Добавить тег
                </HCButton>

                <HCButton
                    onClick={createRecipeHandler}
                    className={classes.adminPageButton}
                >
                    <FontAwesomeIcon
                        icon={faFileCirclePlus}
                        size="lg"
                        style={{ marginRight: '5px' }}
                    />
                    Добавить рецепт
                </HCButton>

                <HCButton
                    onClick={() => setIsProductModalVisible(true)}
                    className={classes.adminPageButton}
                >

                    <FontAwesomeIcon
                        icon={faPlateWheat}
                        size="lg"
                        style={{ marginRight: '5px' }}
                    />
                    Добавить продукт
                </HCButton>
            </div>

            <CreateGroupModal
                visible={isGroupModalVisible}
                onClose={() => setIsGroupModalVisible(false)}
            />
            <CreateTagModal
                visible={isTagModalVisible}
                onClose={() => setIsTagModalVisible(false)}
            />
            <CreateProductModal
                visible={isProductModalVisible}
                onClose={() => setIsProductModalVisible(false)}
            />
            <div style={{ marginTop: '10px' }}>
                <RecipesAdminTable />
            </div>
        </div>
    );
};

export default AdminPage;