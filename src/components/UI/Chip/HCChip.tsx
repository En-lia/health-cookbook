import React, { FC, useMemo } from 'react';
import classNames from 'classnames';
import HCButton from '../Button/HCButton';
import classes from './HCChip.module.scss';

type ChipProps = {
    children: JSX.Element | string,
    className?: string,
    active?: boolean,
    data: any,
    onClick: (tag?:any)=>void,
};

const HCChip: FC<ChipProps> = ({ data, active, className, onClick, children }) => {
    const chipClasses = useMemo(() => {
        return classNames(className, classes.chip, { [`${classes.chipActive}`]: active });
    }, [active, className]);

    const onClickHandler = () => {
        onClick(data);
    };

    return (
        <HCButton
            onClick={onClickHandler}
            className={chipClasses}
        >
            {children}
        </HCButton>
    );
};

export default HCChip;