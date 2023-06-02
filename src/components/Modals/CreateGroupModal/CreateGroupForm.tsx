import React, { FC } from 'react';
import { Form, Field } from 'react-final-form';
import { useQueryClient } from 'react-query';
import { notification } from 'antd';
import classes from '../AdminModal.module.scss';
import HCInput from '../../UI/Input/HCInput';
import HCButton from '../../UI/Button/HCButton';
import { isTitleValidate } from '../../../utils/validate';
import { useCreateGroup } from '../../../service/groups/groupHooks';
import { OpenNotificationType } from '../../../utils/types';
import { APICreateGroupParameters } from '../../../service/groups/GroupAPI';

type CreateGroupFormProps = {
    onClose: () => any,
    onSuccess: () => any,
};

const CreateGroupForm:FC<CreateGroupFormProps> = ({ onClose, onSuccess }) => {
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
    const { mutate: create, isLoading: isCreateGroupLoading } = useCreateGroup(
        {
            onSuccess: () => {
                client.invalidateQueries('groups');

                openNotification({
                    message: 'Группа создана',
                    type: 'success',
                    onClose: onSuccess,
                    duration: 1.5,
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

    const onSubmit = async ({ title, label }: APICreateGroupParameters) => {
        create({ title, label });
    };

    const validate = (values: { title:string, label: string }) => {
        const errors: {
            title?: string,
            label?: string,
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

    return (
        <Form
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
                                    <HCInput {...input} placeholder="Например, meals" />
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
                                    <HCInput {...input} placeholder="Например, Приём пищи" />
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
                            disabled={isCreateGroupLoading}
                            isLoading={isCreateGroupLoading}
                        >
                            Добавить
                        </HCButton>
                    </div>
                </form>
            )}
        />
    );
};

export default CreateGroupForm;