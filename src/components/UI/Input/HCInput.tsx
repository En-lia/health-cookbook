import React, { ChangeEvent, FC, useState, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import HcButton from '../Button/HCButton';
import classes from './HCInput.module.scss';

export type InputProps = Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> & {
    clearable?: boolean;
    onChange: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => any;
    prependContent?: JSX.Element;
    appendContent?: JSX.Element;
    innerRef?: React.RefObject<HTMLInputElement>;
};

const HCInput: FC<InputProps> = ({
    value,
    onChange,
    clearable = false,
    prependContent,
    appendContent,
    innerRef,
    ...rest
}) => {
    const [stateValue, setStateValue] = useState('');

    const inputValue = value === undefined ? stateValue : value;
    const isEmpty = inputValue === '';
    const isShowCleanButton = clearable && !isEmpty;

    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const inputClasses = useMemo(() => {
        return classNames(classes.input, rest.className, { [`${classes.inputFocused}`]: isFocused, [`${classes.inputHovered}`]: isHovered });
    }, [isFocused, isHovered, rest.className]);

    const inputChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        onChange(newValue, e);
        setStateValue(newValue);
    }, [onChange]);
    const clearButtonHandler = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        onChange('');
        setStateValue('');
    }, [onChange]);

    return (
        <div
            className={inputClasses}
            ref={innerRef}
            onMouseEnter={() => { setIsHovered(true); }}
            onMouseLeave={() => { setIsHovered(false); }}
        >
            <div className={classes.inputFieldWrapper}>
                {prependContent
                    && <span className={classes.inputPrependContent}>{prependContent}</span>}

                <input
                    value={inputValue}
                    onChange={inputChangeHandler}
                    onFocus={() => { setIsFocused(true); }}
                    onBlur={() => { setIsFocused(false); }}
                    type={rest.type || 'text'}
                    {...rest}
                    className={classes.inputField}
                />
                {(appendContent || isShowCleanButton)
                    && (
                        <span className={classes.inputAppendContent}>
                            {
                                isShowCleanButton ? (
                                    <HcButton
                                        onClick={clearButtonHandler}
                                        className={classes.inputClearButton}
                                    >
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            size="sm"
                                        />
                                    </HcButton>
                                ) : <span>{appendContent}</span>
                            }
                        </span>
                    )}

            </div>
        </div>
    );
};

export default HCInput;