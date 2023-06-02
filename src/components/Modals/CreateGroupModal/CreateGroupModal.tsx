import React, { FC } from 'react';
import HСModal from '../../UI/Modal/HCModal';
import classes from '../AdminModal.module.scss';
import modalClasses from './CreateGroupModal.module.scss';
import CreateGroupForm from './CreateGroupForm';

type CreateGroupModalProps = {
    visible: boolean,
    onClose: () => any,
};

const CreateGroupModal:FC<CreateGroupModalProps> = ({ visible, onClose }) => {
    return (
        <HСModal
            closable
            visible={visible}
            onClose={() => onClose()}
        >
            <div className={modalClasses.createGroupModalContent}>
                <h3 className={classes.adminModalTitle}>Добавить группу</h3>

                <CreateGroupForm onClose={() => onClose()} onSuccess={() => onClose()} />
            </div>
        </HСModal>
    );
};

export default CreateGroupModal;