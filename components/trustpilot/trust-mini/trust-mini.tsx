import React, { useState, useEffect } from 'react';
import style from './trust-mini.module.scss';
import { TrustThemeTypes } from 'enums/TrustThemeTypes';
import { formatNumber } from 'helpers/currencyHelper';
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

const TrustMini: React.FC<Props> = ({ trustPilotRating, theme = TrustThemeTypes.Light,  }) => {
 
    return (
    <>
        { trustPilotRating &&
        <div className={`${style['trust-mini']} ${theme === TrustThemeTypes.Dark ? style['trust-mini--dark'] : ''}`}>
            <a href="https://uk.trustpilot.com/review/leasingoptions.co.uk?utm_medium=trustbox&utm_source=Mini" target="_blank">
                {theme === TrustThemeTypes.Dark &&
                    <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/trustpilot-wstars--dark.svg`} width="145" height="50" className="img-fluid lazyload" alt="Trustpilot logo" />
                }
                {theme === TrustThemeTypes.Light &&
                    <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/trustpilot-wstars.svg`} width="145" height="50" className="img-fluid lazyload" alt="Trustpilot logo" />
                }
                <br />
                <span>TrustScore</span> <strong>{trustPilotRating?.score} | {(formatNumber(trustPilotRating?.reviewsCount))}</strong> <span>reviews</span>
            </a>
        </div>
        }
    </>

    )
}

export default connect(mapStateToProps)(TrustMini);