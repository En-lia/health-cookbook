import React, { FC, useState, useMemo } from 'react';
import HСModal from '../../UI/Modal/HCModal';
import classes from '../AdminModal.module.scss';
import AddEditIngredientForm from './AddEditIngredientForm';

type AddEditIngredientModalProps = {
    visible: boolean,
    onClose: () => any,
    onSuccess: (val: any) => any,
    initialData?: object | null,
    modalData: any,
};

const AddEditIngredientModal: FC <AddEditIngredientModalProps> = ({
    initialData,
    visible,
    modalData,
    onClose,
    onSuccess }) => {
    const modalTitle = useMemo(() => {
        return initialData ? 'Редактиовать ингредиент' : 'Добавить ингредиент';
    }, [initialData]);

    return (
        <HСModal
            closable
            visible={visible}
            onClose={() => onClose()}
        >
            <div className={classes.addEditIngredientModalContent}>
                <h3 className={classes.adminModalTitle}>{modalTitle}</h3>

                <AddEditIngredientForm onClose={() => onClose()} onSuccess={(val) => onSuccess(val)} data={modalData} />
            </div>
        </HСModal>
    );
};

export default AddEditIngredientModal;