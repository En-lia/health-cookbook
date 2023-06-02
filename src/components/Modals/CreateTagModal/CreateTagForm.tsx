import React, { FC, useMemo } from 'react';
import { Form, Field } from 'react-final-form';
import { notification } from 'antd';
import { useQueryClient } from 'react-query';
import classes from '../AdminModal.module.scss';
import HCInput from '../../UI/Input/HCInput';
import HCButton from '../../UI/Button/HCButton';
import { isTitleValidate } from '../../../utils/validate';
import HCSelect from '../../UI/Select/HCSelect';
import { APICreateTagParameters } from '../../../service/tags/TagAPI';
import { OpenNotificationType } from '../../../utils/types';
import { useGetGroups } from '../../../service/groups/groupHooks';
import { useCreateTag } from '../../../service/tags/tagHooks';

type CreateTagFormProps = {
    onClose: () => any,
    onSuccess: () => any,
};

const CreateTagForm:FC<CreateTagFormProps> = ({ onClose, onSuccess }) => {
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

    const { data: groups } = useGetGroups({});

    const client = useQueryClient();
    const { mutate: create, isLoading: isCreateTagLoading } = useCreateTag(
        {
            onSuccess: () => {
                client.invalidateQueries('tags');

                openNotification({
                    message: 'Тег создан',
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

    const groupsOptions = useMemo(() => {
        const options: { value: number, label: string }[] = [];
        groups?.forEach((group) => {
            options.push({ value: group.id, label: group.label });
        });
        return options;
    }, [groups]);

    const onSubmit = async ({ title, label, groupId }: APICreateTagParameters) => {
        create({ title, label, groupId });
    };

    const validate = (values: { title: string, label: string, groupId: number }) => {
        const errors: {
            title?: string,
            label?: string,
            groupId?: string,
        } = {};
        if (!values.title) {
            errors.title = 'Поле не может быть пустым';
        }

        if (!isTitleValidate(values.title)) {
            errors.title = 'Поле должно содержать только латинские символы без пробелов';
        }

        if (values.title?.length > 30) {
            errors.title = 'Максимальная длинна не должна превышать 30 символов';
        }

        if (!values.label) {
            errors.label = 'Поле не может быть пустым';
        }

        if (values.label?.length > 30) {
            errors.label = 'Максимальная длинна не должна превышать 30 символов';
        }

        if (!values.groupId) {
            errors.groupId = 'Необходимо выбрать группу';
        }

        return errors;
    };

    return (
        <Form
            initialValues={{ title: '', label: '', groupId: null }}
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
                                    <HCInput {...input} placeholder="Например, breakfast" />
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
                                    <HCInput {...input} placeholder="Например, Завтраки" />
                                    {meta.error && meta.submitFailed
                                        && (
                                            <div className={classes.adminModalErrorMsg}>
                                                {meta.error}
                                            </div>
                                        )}
                                </div>
                            )}
                        </Field>

                        <Field allowNull name="groupId">
                            {({ input, meta }) => (
                                <div>
                                    <div className={classes.adminModalBodyTitle}>
                                        Группа
                                    </div>
                                    <HCSelect
                                        {...input}
                                        style={{ width: '100%' }}
                                        placeholder="Выберите группу"
                                        options={groupsOptions}
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
                            disabled={isCreateTagLoading}
                            isLoading={isCreateTagLoading}
                        >
                            Добавить
                        </HCButton>
                    </div>
                </form>
            )}
        />
    );
};

export default CreateTagForm;