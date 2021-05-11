import React, { useState, useEffect } from 'react';
import style from './trust-micro.module.scss';
import { TrustThemeTypes } from 'enums/TrustThemeTypes';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        trustPilotRating: state.trustPilotRating,
    };
}

type Props = {
    theme: TrustThemeTypes;
    trustPilotRating: any;
}

const TrustMicro: React.FC<Props> = ({ theme, trustPilotRating }) => {
  
    return (
        <>
        {trustPilotRating?.score &&
            <div className={`${style['trust-micro']} ${theme === TrustThemeTypes.Light ? style['trust-micro--light'] : ''}`}>
                <a href="https://uk.trustpilot.com/review/leasingoptions.co.uk?utm_medium=trustbox&utm_source=MicroTrustScore" target="_blank">
                    <strong className={style['lg-text']}>Excellent</strong><strong>{trustPilotRating?.score}</strong><span>out of 5</span>
                    {theme === TrustThemeTypes.Light ? <img src={`${process.env.NEXT_PUBLIC_CDN}/website/static/trustpilot-logo-star--white.svg`} width="65" height="16" className={`${style['trust-micro__logo']} img-fluid`} alt="Trustpilot logo" /> : <img src={`${process.env.NEXT_PUBLIC_CDN}/website/static/trustpilot-logo-star.svg`} width="65" height="16" className={`${style['trust-micro__logo']} img-fluid lazyload`} alt="Trustpilot logo" />}
                </a>
            </div>
        }
        </>
        
    )
}

export default connect(mapStateToProps)(TrustMicro);