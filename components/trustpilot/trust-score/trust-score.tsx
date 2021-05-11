import React, { useState, useEffect } from 'react';
import style from './trust-score.module.scss';
import { formatNumber, formatNumberThousands } from 'helpers/currencyHelper';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        trustPilotRating: state.trustPilotRating,
    };
}

type Props = {
    trustPilotRating: any;
}

const TrustScore:React.FC<Props> = ({trustPilotRating}) => {
    
    return (
        <div className={style['trust-score']}>
            <div className={style['trust-score__logo']}>
                <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/trustpilot-logo-score.svg`} className={`${style['trust-micro__logo']} img-fluid lazyload`} alt="Trustpilot logo" />
            </div>
            <div className={style['trust-score__reviews']}>{formatNumber(Math.round(parseInt(trustPilotRating?.reviewsCount) * 10 / 10))}k reviews</div>
        </div>
    )
}
export default connect(mapStateToProps)(TrustScore);