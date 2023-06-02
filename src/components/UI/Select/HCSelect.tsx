import React, { FC } from 'react';
import { Select, SelectProps } from 'antd';

const HCSelect:FC<SelectProps> = ({ ...selectProps }) => {
    return (
        <Select
            {...selectProps}
        />
    );
};

export default HCSelect;