import React, { FC, useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import classes from './HCAccordion.module.scss';
import HCButton from '../Button/HCButton';

type AccordionProps = {
    title: JSX.Element | string;
    body: JSX.Element | string;
};

const HCAccordion:FC<AccordionProps> = ({ title, body }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [bodyHeight, setBodyHeight] = useState('');
    const bodyRef = useRef();

    useEffect(() => {
        if (bodyRef.current) {
            // @ts-ignore
            setBodyHeight(`${bodyRef?.current?.scrollHeight}px`);
        }
        // @ts-ignore
    }, [bodyRef?.current?.scrollHeight]);

    return (
        <div className={classes.accordion}>
            <HCButton
                className={classes.accordionTitle}
                onClick={() => { setIsVisible(!isVisible); }}
            >
                <FontAwesomeIcon
                    icon={faChevronUp}
                    size="sm"
                    style={{ transform: isVisible ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    className={classes.accordionTitleIcon}
                />
                {title}
            </HCButton>
            <div
                className={classes.accordionBody}
                ref={bodyRef}
                style={{ maxHeight: isVisible ? bodyHeight : '0px' }}
            >
                <div className={classes.accordionBodyContainer}>
                    {body}
                </div>
            </div>

        </div>
    );
};

export default HCAccordion;