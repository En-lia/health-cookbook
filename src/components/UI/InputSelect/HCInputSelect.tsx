import React, { useState, FC, ChangeEvent, useRef, useCallback, useEffect } from 'react';
import { Popover } from 'antd';
import HCInput, { InputProps } from '../Input/HCInput';

type InputSelectProps = {
    inputProps: InputProps,
    popperContent: JSX.Element,
    onChange: (value: string, event?: ChangeEvent<HTMLInputElement>) => any;
};

const HCInputSelect:FC<InputSelectProps> = ({
    inputProps,
    popperContent,
    onChange }) => {
    const inputRef = useRef(null);
    const [open, setOpen] = useState(false);

    const handleOpenChange = useCallback((newOpen: boolean) => {
        if (!newOpen) setOpen(newOpen);
    }, []);

    const handleOnBlur = useCallback((e: any) => {
        // setOpen(false);
    }, []);

    useEffect(() => {
        if (inputProps.value) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [inputProps.value]);

    const handleOnChange = useCallback((value: string, e: ChangeEvent<HTMLInputElement>) => {
        onChange(value, e);
    }, [onChange]);

    return (
        <Popover
            content={popperContent}
            trigger="click"
            open={open}
            arrow={false}
            overlayStyle={{ width: inputRef?.current?.offsetWidth }}
            overlayInnerStyle={{ maxHeight: 300, overflowY: 'auto', padding: 20 }}
            onOpenChange={handleOpenChange}
        >
            <HCInput
                {...inputProps}
                innerRef={inputRef}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
            />
        </Popover>
    );
};

export default React.memo(HCInputSelect);