import React, { FC } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import classes from './HCButton.module.scss';

const LoadingIcon = <LoadingOutlined style={{ fontSize: 16, color: 'white', marginRight: '5px' }} spin />;

type HCButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isLoading?: boolean,
};

const HCButton: FC<HCButtonType> = ({ isLoading, children, ...rest }) => {
    const buttonClasses = [rest.className, classes.button].filter(Boolean).join(' ');

    return (
        <button
            type="button"
            {...rest}
            className={buttonClasses}
        >
            {isLoading && <Spin indicator={LoadingIcon} />}
            {children}
        </button>
    );
};

export default HCButton;