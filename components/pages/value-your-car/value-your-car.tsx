import React, { useContext } from 'react';
import PageBanner from 'components/page-banner';
import Faqs from 'components/layout/faqs';
import ModalContext from 'components/HOCs/modal/modalContext';
import ModalPartExchange from 'components/value-your-car/modal-part-exchange';

import { FaqItem } from 'types/FaqItem';
import { GetPhoneNumber } from 'helpers/helpers';

type Props = {
    isInternal: boolean;
}
const ValueYourCarPage: React.FC<Props> = ({ isInternal }) => {
    const modalContext = useContext(ModalContext);

    const handleValuationClick = (evt) => {
        modalContext.showModal(ModalPartExchange, { show: true, isInternal: isInternal })
    };

    const faqs: Array<FaqItem> = [
        { question: "PCP vs. leasing - which is better?", answer: "Car leasing works by essentially renting a brand-new vehicle for an agreed period, typically between 2-4 years. You pay an initial rental fee and make fixed monthly payments until your lease ends. When your contract finishes, simply return the car. Read more in our complete guide to <a href=\"/advice/personal-leasing/what-is-car-leasing\">what is car leasing?</a>" },
        { question: "How does leasing a car work?", answer: "Car leasing means you can drive the latest models every few years and return the vehicle when your contract ends. PCP works similarly, except you can buy the car at the end of your agreement. You’ll pay interest on a PCP, plus a balloon payment if you purchase the vehicle." },
    ];

    return (
        <>
            <PageBanner className="page-banner--fluid" image={`${process.env.NEXT_PUBLIC_CDN}/website/static/hero/part-ex-bg.jpg`} trustPilot={true}>
                <div className="container">
                    <div className="row">
                        <div className="col-24 py-md-5">
                            <h1 className="text-white"><strong>Value Your Part Exchange Car Lease</strong></h1>
                            <h2 className="text-white mb-2">We and our partners will give you a fair value for your part-exchange.</h2>
                            <h3 className="text-white mb-5">You can even have it collected for FREE!</h3>
                            <div className="hero-buttons">
                                <button className="btn btn-primary btn-lg btn-fluid-xs valuation-button" role="button" onClick={handleValuationClick}>Get Valuation</button>
                            </div>
                        </div>
                    </div>
                </div>
            </PageBanner>
            <section className="container-fluid py-5 bg-white">
                <div className="row">
                    <div className="container px-md-5">
                        <div className="row">
                            <div className="col-24">
                                <h2 className="text-center mb-5">Part exchanging your old car is easy</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-24 col-md-8 px-5 px-md-3 text-center">
                                <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/px/collect-car.svg`} className="mx-3 d-block lazyload" alt="Collect Car" />
                                <h3>We'll collect your car FREE</h3>
                                <p>There’s no need to waste time delivering your old vehicle, we’ll come to collect it at a time and place that suits you.</p>
                            </div>
                            <div className="col-24 col-md-8 px-5 px-md-3 text-center">
                                <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/px/fees.svg`} className="mx-3 d-block lazyload" alt="Fees" />
                                <h3>No Fees</h3>
                                <p>Unlike some car buying services we won’t charge a penny to purchase your vehicle, all the money will go towards your new lease!</p>
                            </div>
                            <div className="col-24 col-md-8 px-5 px-md-3 text-center">
                                <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/px/payment.svg`} className="mx-3 d-block lazyload" alt="Payment" />
                                <h3>Immediate secure payments</h3>
                                <p>Money in your bank instantly - no hassle, no risk, no problems. The process couldn’t be simpler.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container-fluid py-5 bg-light-grey">
                <div className="container">
                    <div className="row">
                        <div className="col-24">
                            <div className="w-100 bg-white p-3 p-md-5">
                                <h3>Sell your car the simple way</h3>
                                <p>If it’s time to upgrade your car, you may want to find out how much your car is worth first to see how much you could get towards a new leased vehicle. Our online car valuation works in a couple of clicks to get you an instant valuation for free. Enter your number plate and current mileage for a quick car valuation today and we’ll do the rest.</p>
                                <h3>How much is my car worth?</h3>
                                <p>When it is time to move on to your next car you may find yourself thinking "What is my car worth?". How much your car is worth will depend greatly on the vehicle model, age and condition. Put the money towards a new lease car or treat yourself - the choice is yours.</p>
                                <h3>Free nationwide collection</h3>
                                <p>We will collect your car from anywhere in the UK, saving you time and money.</p>
                                <h3>Immediate secure payments</h3>
                                <p>Payment will be made directly into your bank account before we drive away.</p>
                                <h3>No fees</h3>
                                <p>
                                    There are absolutely no fees or hidden costs when selling your car.</p>
                                <h3>Speak to us</h3>
                                <p>Contact our friendly, knowledgeable support team on <a aria-label="Phone number" href={`tel:${GetPhoneNumber(isInternal)}`}><span className="phonenumber_call_now">{GetPhoneNumber(isInternal)}</span></a> or <a href="mailto:info@leasingoptions.co.uk">info@leasingoptions.co.uk</a></p>
                                <button className="btn btn-primary btn-lg valuation-button d-block mt-5" role="button" onClick={handleValuationClick}>Get Valuation</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container">
                <Faqs faqs={faqs} title="Part Exchange Frequently Asked Questions" />
            </div>
        </>
    );
}

export default ValueYourCarPage;