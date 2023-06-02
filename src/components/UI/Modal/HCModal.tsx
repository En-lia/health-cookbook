import React, { FC, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import classes from './HCModal.module.scss';
import HcButton from '../Button/HCButton';
import './HCModalAnimation.scss';
import { usePortalContainer } from '../../../hooks/usePortalContainer';

type ModalProps = {
    children: JSX.Element,
    visible: boolean,
    onClose?: React.Dispatch<React.SetStateAction<boolean>>,
    closable?: boolean,
    className?: string,
};

const HСModal:FC<ModalProps> = ({ visible, onClose, closable, className, children }) => {
    const { element, removeElement } = usePortalContainer(visible);
    const modalClasses = useMemo(() => {
        return classNames(className, classes.modal);
    }, [className]);
    const nodeRef = useRef(null);
    return (
        ReactDOM.createPortal(
            <CSSTransition
                nodeRef={nodeRef}
                timeout={200}
                in={visible}
                onExited={removeElement}
                unmountOnExit
                classNames="modal"
            >
                <div className={modalClasses} ref={nodeRef}>
                    <div className={classes.modalContainer}>
                        <div className={classes.modalHeader}>
                            { closable
                                && (
                                    <HcButton onClick={() => onClose(false)}>
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            size="lg"
                                            className={classes.modalCloseButton}
                                        />
                                    </HcButton>
                                ) }
                        </div>
                        <div className={classes.modalContent}>
                            {children}
                        </div>
                    </div>
                </div>
            </CSSTransition>,
            element)
    );
};

export default HСModal;