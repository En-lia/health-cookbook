import React, { FC, useRef, useCallback, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import classNames from 'classnames';
import { Swiper as SwiperClass } from 'swiper/types';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Slider.module.scss';

type SliderProps = {
    className?: string,
    children: JSX.Element | JSX.Element[],
};

const Slider:FC<SliderProps> = ({ className, children }) => {
    const sliderClassName = classNames(classes.slider, className);

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    const handleOnBeforeInit = useCallback((swiper:SwiperClass) => {
        if (typeof swiper.params.navigation === 'boolean') return;
        // eslint-disable-next-line no-param-reassign
        swiper.params.navigation.prevEl = navigationPrevRef.current;
        // eslint-disable-next-line no-param-reassign
        swiper.params.navigation.nextEl = navigationNextRef.current;
    }, []);

    const autoplayData = useMemo(() => {
        return {
            delay: 2500,
            disableOnInteraction: true,
        };
    }, []);
    const navigationData = useMemo(() => {
        return {
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
            disabledClass: classes.sliderBtnDisabled,
        };
    }, []);

    return (
        <Swiper
            modules={[Navigation, EffectFade, Autoplay]}
            effect="cards"
            speed={800}
            centeredSlides
            slidesPerView="auto"
            spaceBetween={0}
            autoplay={autoplayData}
            navigation={navigationData}
            onBeforeInit={handleOnBeforeInit}
            className={sliderClassName}
        >
            {children}
            <div className={classes.sliderPrevBtn} ref={navigationPrevRef}>
                <FontAwesomeIcon
                    icon={faAngleLeft}
                    size="2xl"
                />
            </div>
            <div className={classes.sliderNextBtn} ref={navigationNextRef}>
                <FontAwesomeIcon
                    icon={faAngleRight}
                    size="2xl"
                />
            </div>
        </Swiper>
    );
};

export default Slider;
