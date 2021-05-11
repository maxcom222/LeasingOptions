import React, { ReactNode } from 'react';
import Slider from "react-slick";
import style from './vehicle-carousel.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

type Props = {
    className?: string,
    dots?: boolean,
    mobileAuto?: boolean,
    mobileArrows?: boolean,
    tabletAuto?: boolean,
    tabletArrows?: boolean,
    desktopAuto?: boolean,
    desktopArrows?: boolean,
    children: ReactNode,
    infinite?: boolean,
    slidesMax?: number,
}

const VehicleCarousel: React.FC<Props> = ({ className, dots = false, mobileAuto = false, mobileArrows = true, tabletAuto = false, tabletArrows = false, desktopAuto = false, desktopArrows = false, infinite = true, slidesMax = 4, children }) => {
    const ArrowLeft = (props) => {
        const { onClick } = props;
        return (<span className="slick-arrow slick-prev" onClick={onClick}><FontAwesomeIcon width="25" height="25" icon={faChevronLeft} /></span>);
    }
    const ArrowRight = (props) => {
        const { onClick } = props;
        return (<span className="slick-arrow slick-next" onClick={onClick}><FontAwesomeIcon width="25" height="25" icon={faChevronRight} /></span>);
    }
    const settings = {
        autoplay: desktopAuto,
        autoplaySpeed: 5000,
        lazyLoad: 'ondemand',
        arrows: desktopArrows,
        prevArrow: <ArrowLeft />,
        nextArrow: <ArrowRight />,
        dots: false,
        infinite: infinite,
        speed: 500,
        slidesToShow: slidesMax,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1401,
                settings: {
                    autoplay: desktopAuto,
                    arrows: desktopArrows,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: false
                }
            },
            {
                breakpoint: 1025,
                settings: {
                    autoplay: tabletAuto,
                    arrows: tabletArrows,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: dots
                }
            },
            {
                breakpoint: 481,
                settings: {
                    autoplay: mobileAuto,
                    arrows: mobileArrows,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: dots
                }
            }
        ]
    };

    return (
        <div className={`vehicle-carousel ${style['vehicle-carousel']} ${className ? className : ''}`}>       
            <Slider {...settings}>
                {children}
            </Slider>
        </div>
    )
}

export default VehicleCarousel;