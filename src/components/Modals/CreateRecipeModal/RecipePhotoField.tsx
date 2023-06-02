import React, { FC, useMemo, useState, useContext, useEffect, useCallback } from 'react';
import { notification, Upload, UploadFile, UploadProps } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import { FieldRenderProps } from 'react-final-form';
import classes from '../AdminModal.module.scss';
import { OpenNotificationType } from '../../../utils/types';

const customRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
        onSuccess('ok');
    }, 0);
};

type RecipePhotoFieldProps = {
    uploadData: FieldRenderProps<string, HTMLInputElement>,
};

const RecipePhotoField:FC<RecipePhotoFieldProps> = ({ uploadData: { value, name, onChange, ...input } }) => {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = useCallback(({ message, type }: OpenNotificationType) => {
        api[type]({
            message,
            type: type || 'info',
            placement: 'bottom',
        });
    }, [api]);

    const onChangeHandler: UploadProps['onChange'] = useCallback((data: UploadChangeParam<UploadFile>) => {
        const isValidSize = data.file.size / 1024 / 1024 < 3;
        if (data.file.size && !isValidSize) {
            openNotification({
                message: 'Максимальный размер файла не должен превышать 3Мб',
                type: 'error',
            });
            return;
        }
        onChange(data.fileList);
    }, [onChange, openNotification]);

    return (
        <div>
            {contextHolder}
            <div className={classes.adminModalBodyTitle}>
                Фото
            </div>
            <Upload
                {...input}
                accept="image/png, image/jpeg"
                name={name}
                multiple
                fileList={value}
                onChange={onChangeHandler}
                listType="picture-card"
                customRequest={customRequest}
            >
                {value.length < 5 && 'Добавить фото'}
            </Upload>
        </div>
    );
};

export default RecipePhotoField;