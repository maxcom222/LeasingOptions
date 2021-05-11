import React from 'react';
import TrustScoreContainer from '../../trustpilot/trust-slider'

const TrustScoreReviewsSection = () => {
    
    return (
        <>
            <div className="container-fluid py-3 py-md-5 bg-light-grey">
                <div className="row">
                    <div className="col-24 text-center">
                        <h2 className="mb-3 text-center">Our customers think we're fantastic and so will you</h2>
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/trustpilot-rating.svg`} className="mb-3 img-fluid tp-logo lazyload" alt="Trustpilot Logo" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-24">
                        <TrustScoreContainer />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrustScoreReviewsSection