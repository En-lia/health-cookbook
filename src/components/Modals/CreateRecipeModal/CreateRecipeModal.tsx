import React, { FC, useState, useCallback, useContext, useMemo } from 'react';
import HСModal from '../../UI/Modal/HCModal';
import classes from '../AdminModal.module.scss';
import modalClasses from './CreateRecipeModal.module.scss';
import CreateRecipeForm from './CreateRecipeForm';

type CreateRecipeModalProps = {
    visible: boolean,
    onClose?: () => any,
    recipeId?: number | null,
};

const CreateRecipeModal:FC<CreateRecipeModalProps> = ({ visible, recipeId, onClose }) => {
    const modalTitle = useMemo(() => {
        return recipeId ? 'Редактировать рецепт' : 'Добавить рецепт';
    }, [recipeId]);

    return (
        <HСModal
            className={modalClasses.createRecipeModal}
            closable
            visible={visible}
            onClose={() => onClose()}
        >
            <div className={modalClasses.createRecipeModalContent}>
                <h3 className={classes.adminModalTitle}>{modalTitle}</h3>

                <CreateRecipeForm onClose={() => onClose()} onSuccess={() => onClose()} recipeId={recipeId} />
            </div>

        </HСModal>
    );
};

export default CreateRecipeModal;