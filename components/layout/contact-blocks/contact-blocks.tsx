import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faPoundSign } from "@fortawesome/pro-light-svg-icons";
import { GetPhoneNumber } from 'helpers/helpers';
import { connect } from 'react-redux';

type Props = {
    isInternal: boolean;
}
const ContactBlocks:React.FC<Props> = ({isInternal}) => {
    
    return (
        <div className="row">
            <div id="openinghours" className="col-24 col-md-8 d-flex mb-3 mb-md-0">
                <div className="w-100 box bg-white p-0">
                    <div className="box__header">Contact Information</div>
                    <div className="box__content text-center">
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/logosig.png`} className="lazyload mx-auto mb-3" alt="Leasing Options logo" />
                        <strong className="w-100 d-block text-left">Get in touch:</strong>
                        <p className="w-100 d-flex justify-content-between align-items-center my-2">Telephone: <span><a aria-label="Phone number" href={`tel:${GetPhoneNumber(isInternal)}`} className="text-mint"><span className="phonenumber_call_now">{GetPhoneNumber(isInternal)}</span></a></span></p>
                        <p className="w-100 d-flex justify-content-between align-items-center my-2">Fax: <strong className="text-mint">0161 790 7731</strong></p>
                        <p className="w-100 d-flex justify-content-between align-items-center my-2">Email: <span><a href="mailto:info@leasingoptions.co.uk" className="text-mint">info@leasingoptions.co.uk</a></span></p>
                        <br />
                        <strong className="w-100 d-block text-left">Opening Hours:</strong>
                        <p className="w-100 d-flex justify-content-between align-items-center mt-2 mb-3">Monday to Friday:<strong>9.00am - 6.00pm</strong></p>
                        <p className="text-left">If your enquiry is out of hours please use our contact form and a member of our team will call you back.</p>
                    </div>
                </div>
            </div>
            <div className="col-24 col-md-8 d-flex mb-3 mb-md-0">
                <div className="w-100 box bg-gearknob p-0 d-flex justify-content-center align-items-center">
                    <div className="box__content text-center">
                        <FontAwesomeIcon width="70" height="70" icon={faThumbsUp} className="fa-5x mb-3" />
                        <h2 className="w-100 h4">Lease Easy</h2>
                        <p className="w-100">The latest breaking deals as they happen. Don't miss out!</p>
                        <br />
                        <br />
                        <ul className="text-left">
                            <li><strong>Free Driven Delivery Straight To Your Door</strong></li>
                            <li><strong>Full UK Manufacturer's Warranty</strong></li>
                            <li><strong>Road Tax Included</strong></li>
                            <li><strong>12 Months Breakdown Assistance</strong></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-24 col-md-8 d-flex">
                <div className="w-100 box bg-handshake p-0 d-flex justify-content-center align-items-center">
                    <div className="box__content text-center">
                        <FontAwesomeIcon width="70" height="70" icon={faPoundSign} className="fa-5x icon-circle mb-3" />
                        <h2 className="w-100 h4">Price Match Promise</h2>
                        <p className="w-100">Get £50 if we can't beat a competitor's price <br />- Put us to the test!</p>
                        <br />
                        <br />
                        <p className="w-100"><strong>With our Price Match Promise Guarantee you can be rest assured you are getting the most competitive price on your vehicle lease.</strong></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isInternal: state.isInternal
});

export default connect(mapStateToProps)(ContactBlocks);