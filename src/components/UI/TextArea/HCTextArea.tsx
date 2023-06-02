import React, { FC } from 'react';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input/TextArea';

const { TextArea } = Input;

const HCTextArea:FC<TextAreaProps> = ({ ...textAreaProps }) => {
    return (
        <TextArea {...textAreaProps} />
    );
};

export default HCTextArea;