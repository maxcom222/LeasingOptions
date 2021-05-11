import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import style from './trust-slider.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/pro-regular-svg-icons";
import TrustCard from '../trust-card';
import { TrustWidgetTypes } from 'enums/TrustWidgetTypes';
import { formatNumber } from 'helpers/currencyHelper';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        trustPilotRating: state.trustPilotRating,
    };
}

type Props = {
    trustPilotRating: any;
}


const TrustSlider:React.FC<Props> = ({trustPilotRating}) => {
 const ArrowLeft = (props) => {
        const { onClick } = props;
        return (<div className={`${style['slick-arrow']} ${style['slick-prev']}`}><FontAwesomeIcon width="25" height="25" icon={faChevronLeft} onClick={onClick} /></div>);
    }
    const ArrowRight = (props) => {
        const { onClick } = props;
        return (<div className={`${style['slick-arrow']} ${style['slick-next']}`}><FontAwesomeIcon width="25" height="25" icon={faChevronRight} onClick={onClick} /></div>);
    }
var settings = {
        autoplay: false,
        autoplaySpeed: 5000,
        lazyLoad: 'ondemand',
        arrows: true,
        prevArrow: <ArrowLeft />,
        nextArrow: <ArrowRight />,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    arrows: true,
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 481,
                settings: {
                    arrows: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
   

    return (
        <div className={`trust-slider ${style['trust-slider']}`}>
            <Slider {...settings}>
                <TrustCard type={TrustWidgetTypes.Slider} rating={5} date="" header="After being let down by another leasing" text="After being let down by another leasing company, leasing options was Recommend to me..." name="John" url="https://uk.trustpilot.com/reviews/5f45598802e85708c8d8b23b?utm_medium=trustbox&utm_source=Slider" />
                <TrustCard type={TrustWidgetTypes.Slider} rating={5} date="" header="Returning Customer!" text="Returning Customer! Again, another easy, simple service by provided Cass" name="Anthony Pinnell" url="https://uk.trustpilot.com/reviews/5f45546e02e85708c8d8ae20?utm_medium=trustbox&utm_source=Slider" />
                <TrustCard type={TrustWidgetTypes.Slider} rating={5} date="" header="Brilliant Service" text="Sal helped us find our new car. He was at the end of the phone answering any queries..." name="Jeni Mason" url="https://uk.trustpilot.com/reviews/5f4542c102e8570814f8bba7?utm_medium=trustbox&utm_source=Slider" />
                <TrustCard type={TrustWidgetTypes.Slider} rating={5} date="" header="Excellent 5*" text="This has been my first time leasing a vehicle through Leasing Options and I'm more th..." name="Lisa Marie Jones" url="https://uk.trustpilot.com/reviews/5f45005c02e8570814f87981?utm_medium=trustbox&utm_source=Slider" />
                <TrustCard type={TrustWidgetTypes.Slider} rating={5} date="" header="Leasing Options - Car Lease" text="Recently leased two Tesla cars through Leasing Options. Michelle was fantastic thro..." name="Glenn R" url="https://uk.trustpilot.com/reviews/5f44fb1102e8570814f87466?utm_medium=trustbox&utm_source=Slider" />
                <TrustCard type={TrustWidgetTypes.Slider} rating={5} date="" header="10/10 Excellent!!" text="Natalie was amazing, she found me a cat really efficiently and at a great price. She..." name="Laura" url="https://uk.trustpilot.com/reviews/5f44e88402e85708c8d8453a?utm_medium=trustbox&utm_source=Slider" />
                <TrustCard type={TrustWidgetTypes.Slider} rating={5} date="" header="Really friendly and efficient service." text="Really friendly and efficient service. Lesley was incredibly helpful and prompt throu..." name="SteveC" url="https://uk.trustpilot.com/reviews/5f44d57502e8570814f850c1?utm_medium=trustbox&utm_source=Slider" />
                <TrustCard type={TrustWidgetTypes.Slider} rating={5} date="" header="First time I've leased .Jake was very" text="First time I've leased .Jake was very helpful and went through it step by step very c..." name="Chris Lister" url="https://uk.trustpilot.com/reviews/5f44d24f02e8570814f84dd0?utm_medium=trustbox&utm_source=Slider" />
                <TrustCard type={TrustWidgetTypes.Slider} rating={5} date="" header="This is my 2nd time leasing from" text="This is my 2nd time leasing from Leasing Options and they have been fantastic through..." name="K.Man" url="https://uk.trustpilot.com/reviews/5f44a04502e8570814f831db?utm_medium=trustbox&utm_source=Slider" />
                <TrustCard type={TrustWidgetTypes.Slider} rating={5} date="" header="Rachael was friendly" text="Rachael was friendly, efficient and a pleasure to deal with. She explained everything..." name="Hazel Parmenter" url="https://uk.trustpilot.com/reviews/5f43b22302e8570814f7ae0b?utm_medium=trustbox&utm_source=Slider" />
                <TrustCard type={TrustWidgetTypes.Slider} rating={5} date="" header="Fantastic customer service" text="Rachael Shaw handled my application and was fantastic. I was so impressed I wrote a l..." name="Mark  Barnett" url="https://uk.trustpilot.com/reviews/5f43803602e8570814f7824b?utm_medium=trustbox&utm_source=Slider" />
                <TrustCard type={TrustWidgetTypes.Slider} rating={5} date="" header="Leasing Options Review" text="I dealt with Luke at Leasing Options. Brilliant service and I will definitely be reco..." name="Harry" url="https://uk.trustpilot.com/reviews/5f40c09702e85708c8d64bd3?utm_medium=trustbox&utm_source=Slider" />
                <TrustCard type={TrustWidgetTypes.Slider} rating={5} date="" header="Thanks Andy" text="Andy Cliffe has just processed my second order and, as before, he has been a pleasure..." name="Geoff Ralph" url="https://uk.trustpilot.com/reviews/5f40b9ce02e8570814f668f8?utm_medium=trustbox&utm_source=Slider" />
                <TrustCard type={TrustWidgetTypes.Slider} rating={5} date="" header="Cass Tynan handled my order.  She was capable and very professional throughout. Cass was also very responsive to any questions and quick to call back at all times." text="Cass Tynan handled my order.  She was capable and very professional throughout. Cass..." name="Shannon Riley-Gregson" url="https://uk.trustpilot.com/reviews/5f3fe21902e85708c8d5e5a6?utm_medium=trustbox&utm_source=Slider" />
                <TrustCard type={TrustWidgetTypes.Slider} rating={5} date="" header="Yet another vehicle I have leased via" text="Yet another vehicle I have leased via Leasing Options, This Will be my 5th, I have le..." name="Dan Mortlock" url="https://uk.trustpilot.com/reviews/5f3fd97d02e85708c8d5dcfe?utm_medium=trustbox&utm_source=Slider" />
            </Slider>
            <div className={style['trust-slider__rating']}>Rated <strong> {trustPilotRating?.score} </strong> out of 5 based on <a target="_blank" href="https://uk.trustpilot.com/review/leasingoptions.co.uk?utm_medium=trustbox&amp;utm_source=Slider"><strong> {formatNumber(trustPilotRating?.reviewsCount)} reviews </strong></a> on <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/trustpilot-logo-star.svg`} className="img-fluid lazyload" alt="Trustpilot logo" /></div>
        </div>
    )
}
export default connect(mapStateToProps)(TrustSlider);