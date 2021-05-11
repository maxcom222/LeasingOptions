import React, { useState, useEffect } from 'react';
import style from './trust-horizontal.module.scss';
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

const TrustHorizontal:React.FC<Props> = ({trustPilotRating }) => {
  
    return (
        <div className={style['trust-horizontal']}>
            <a href="https://uk.trustpilot.com/review/leasingoptions.co.uk?utm_medium=trustbox&utm_source=Horizontal" target="_blank">
                <span>Our customers say</span><strong className={style['lg-text']}>Excellent</strong><img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/trustpilot-5stars.svg`} className={`${style['trust-horizontal__stars']} img-fluid lazyload`} alt="Trustpilot star logo" /><strong>{trustPilotRating?.score}</strong><span>out of 5 based on </span><strong>{formatNumber(trustPilotRating?.reviewsCount)}</strong><span>reviews</span><img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/trustpilot-logo-star.svg`} className={`${style['trust-horizontal__logo']} img-fluid lazyload`} alt="Trustpilot logo" />
            </a>
        </div>
    )
}

export default connect(mapStateToProps)(TrustHorizontal);