import React, { FC } from 'react';
import HСModal from '../../UI/Modal/HCModal';
import classes from '../AdminModal.module.scss';
import modalClasses from './CreateProductModal.module.scss';
import CreateProductForm from './CreateProductForm';

type CreateProductModalProps = {
    visible: boolean,
    onClose: () => any,
};

const CreateProductModal:FC<CreateProductModalProps> = ({ visible, onClose }) => {
    return (
        <HСModal
            closable
            visible={visible}
            onClose={() => onClose()}
        >
            <div className={modalClasses.createProductModalContent}>
                <h3 className={classes.adminModalTitle}>Добавить продукт</h3>

                <CreateProductForm onClose={() => onClose()} onSuccess={() => onClose()} />
            </div>
        </HСModal>
    );
};

export default CreateProductModal;