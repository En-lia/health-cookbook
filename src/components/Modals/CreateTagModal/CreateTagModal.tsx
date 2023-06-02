import React, { FC, useContext, useMemo } from 'react';
import HСModal from '../../UI/Modal/HCModal';
import classes from '../AdminModal.module.scss';
import modalClasses from './CreateTagModal.module.scss';
import CreateTagForm from './CreateTagForm';

type CreateTagModalProps = {
    visible: boolean,
    onClose: () => any,
};

const CreateTagModal:FC<CreateTagModalProps> = ({ visible, onClose }) => {
    return (
        <HСModal
            closable
            visible={visible}
            onClose={() => onClose()}
        >
            <div className={modalClasses.createTagModalContent}>
                <h3 className={classes.adminModalTitle}>Добавить тег</h3>

                <CreateTagForm onClose={() => onClose()} onSuccess={() => onClose()} />
            </div>
        </HСModal>
    );
};

export default CreateTagModal;