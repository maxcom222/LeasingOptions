import React from 'react';
import style from './page-usps.module.scss';
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/pro-regular-svg-icons";

type Props = {
    className?: string;
    logoUrl: string;
    children: any;
}

function ArrowLeft(props) {
    const { onClick } = props;
    return (<a href="#" className={`${style['usp-carousel__btn']} ${style['usp-carousel__prev']} d-lg-none`} onClick={onClick}><FontAwesomeIcon width="10" height="20" icon={faChevronLeft} /></a>);
}

function ArrowRight(props) {
    const { onClick } = props;
    return (<a href="#" className={`${style['usp-carousel__btn']} ${style['usp-carousel__next']} d-lg-none`} onClick={onClick}><FontAwesomeIcon width="10" height="20" icon={faChevronRight} /></a>);
}

const settings = {
    infinite: true,
    controls: true,
       lazyLoad: 'ondemand',
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: <ArrowLeft />,
    nextArrow: <ArrowRight />,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                arrows: true,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 724,
            settings: {
                arrows: true,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const PageUsps:React.FC<Props> = ({className, logoUrl, children}) => {
    
    return (
        <section className={`container-fluid ${style['page-usps']} py-3 ${className ? className : ''}`}>
            <div className="row">
                <div className="col-4 d-none d-lg-flex justify-content-start align-items-center">
                    <img data-src={logoUrl} className="lazyload" alt="Short Term Leasing logo" />
                </div>
                <div className={`page-usps ${style['page-usps__carousel']} col-24 col-lg-20`}>
                    <Slider {...settings}>
                        {children}
                    </Slider>
                </div>
            </div>
        </section>
    );
}

export default PageUsps;