import React, { useContext } from 'react';
import PageBanner from 'components/page-banner';
import ModalContext from 'components/HOCs/modal/modalContext';
import ModalPricePromise from 'components/price-promise/modal-price-promise';

import { GetPhoneNumber } from 'helpers/helpers';

type Props = {
    isInternal: boolean;
}

const PricePromisePage: React.FC<Props> = ({ isInternal }) => {
    const modalContext = useContext(ModalContext);

    const handlePricePromiseClick = (evt) => {
        modalContext.showModal(ModalPricePromise, { show: true, isInternal: isInternal })
    };

    return (
        <>
            <PageBanner className="page-banner--fluid" image={`${process.env.NEXT_PUBLIC_CDN}/website/static/hero/part-ex-bg.jpg`} trustPilot={true}>
                <div className="container">
                    <div className="row">
                        <div className="col-24 py-md-5">
                            <h1 className="text-white"><strong>Price Match Promise</strong></h1>
                            <h2 className="text-white mb-3 mb-md-5">Challenge us to beat any quote with our car lease Price Match Promise. If you find a cheaper deal, call us on {GetPhoneNumber(isInternal)} or match online. Get a £50 store voucher for John Lewis/Waitrose if we can’t beat it!</h2>
                            <button type="button" className="btn btn-primary btn-lg" onClick={handlePricePromiseClick}>Match My Price</button>
                        </div>
                    </div>
                </div>
            </PageBanner>
            <section className="container-fluid py-3 p-md-5 bg-light-grey">
                <div className="container">
                    <div className="row">
                        <div className="col-24">
                            <div className="w-100 bg-white p-3 p-md-5">
                                <h2>Our Price Match Promise</h2>
                                <p>Leasing Options knows that everyone wants to get the best possible price. We are confident that our prices are extremely competitive, and we put a great deal of time and effort into trying to ensure they are always kept up to date. We are always checking the market to make sure our prices are the cheapest, because those savings can make a huge difference.</p>
                                <p>As we have over 10,000 cars and vans on our site, on occasion, we may not have advertised our very best lease deal. Because of this, we are willing to offer a car lease Price Match Promise to all our customers.</p>
                                <h2>Get £50 If We Can’t Beat Your Quote</h2>
                                <p>If you can find a cheaper genuine price on a like for like basis from one of our online competitors, then we will promise to match it! However, in the unlikely event we can’t match the price, we will send you with our compliments a £50 store voucher for John Lewis or Waitrose, absolutely free, as an apology for wasting your time.</p>
                                <h2>Match Online or Call Us</h2>
                                <p>It is easy to use our Price Match Promise online. All we need is your full name, telephone number, email address and details of your quote. One of our friendly team members will be in touch to match your cheaper deal or offer you a £50 store voucher for John Lewis or Waitrose if we can’t beat it.</p>
                                <p>Alternatively, you can call us on {GetPhoneNumber(isInternal)} to speak to our team straight away.</p>
                                <h2>Eligibility</h2>
                                <p>To qualify for the car lease Price Match Promise, we must see a written quotation so we can carry out a price match. If in the event of Leasing Options being unable to match the deal, we will request a copy of your signed contract after you have taken delivery of your car as proof of purchase before you will be sent your voucher.</p><img alt="Price Match Promise" className="img-fluid lazyload" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/price-match/price-match-1.jpg`} />
                                <h3>No Pressure</h3>
                                <p>We are not a hard-sell business so you can rest assured that when we speak to you, we will not pressure you into taking a deal. We believe our prices and our service speak for themselves.</p>
                                <h3>The Best Rates</h3>
                                <p>There is no need to haggle for a better deal with Leasing Options Limited. We constantly research the marketplace to bring you the best cars and vans at incredibly low prices so you achieve the best value for money. We have a dedicated pricing team with over 80 staff.</p>
                                <h3>No Hidden Charges</h3>
                                <p>All of our quotations are designed to be clear, transparent and jargon-free so you know exactly what you’re paying for. We’ll also tell you about any charges upfront so there’s no hidden surprises later on.</p><img alt="Price Match Promise" className="img-fluid lazyload" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/price-match/price-match-2.jpg`} />
                                <h3>Compare Prices Online</h3>
                                <p>Our unique quotation system allows you to customise your vehicle online without even speaking to an adviser, making it easier than ever to compare prices online.</p>
                                <h3>Price Match Challenge</h3>
                                <p>We aim to offer the best prices in the market so if you find a cheaper “like for like” quote elsewhere, challenge us to beat it and we’ll try our best to keep you as a customer.</p>
                                <h3>Quality, Straightforward Advice</h3>
                                <p>Whether you’re a first time lessee or an existing Leasing Options customer, you’ll always receive fair and quality advice from our experienced sales team based on your specific needs, priorities and circumstances. look at your monthly incomings and outgoings to assess which one is more affordable for you.</p>
                                <h3>Leasing Options Price Match Promise Terms and Conditions</h3>
                                <ul>
                                    <li>Leasing Options Limited of Options House, Atkin Street, Worsley, Manchester, M28 3DG (<strong>"We"</strong>, <strong>"Us"</strong>) is the promoter of this offer.</li>
                                    <li>In order to submit a request, you must complete the online Match My Price Form (the <strong>"Request"</strong>).</li>
                                    <li>When submitting the Request, you must provide a copy of the quotation (the <strong>"Competitor Quotation"</strong>) that you should like Us to match. The Competitor Quotation must have been provided by a competitor, on headed paper. Alternatively, you may provide a working link to, or screenshot of, the Competitor Quotation as displayed on the competitor's website.</li>
                                    <li>To qualify for submission, the Competitor Quotation must be based on an identical vehicle description, identical OEM model year, mileage allowance, term and initial rental as the quotation provided by Us.</li>
                                    <li>The Competitor Quotation must be a genuine offer and valid. We will not consider any Requests relating to Competitor Quotations that have expired or that cannot be honoured.</li>
                                    <li>We will then endeavour to match the quotation, on like-for-like terms. In the unlikely event that we are unable to do so, Leasing Options will send a £50 High Street Voucher (the <strong>"Voucher"</strong>) to you, upon sight of proof that you have placed an order on the terms of the Competitor Quotation and supply a copy of signed finance documents. We may, at our discretion, also request proof of delivery.</li>
                                    <li>To qualify for the Voucher, you must give Leasing Options a minimum of two working days to review and respond to the Request, with an opportunity to at least MATCH the total cost of the deal. The Request will not qualify if you have already chosen to proceed with the Competitor Quotation.</li>
                                    <li>The Voucher is non-refundable, non-transferable and non-exchangeable. A cash alternative is not available.</li>
                                    <li>We reserve the right to amend or withdraw this offer, without notice, at any time.</li>
                                </ul>
                                <button type="button" className="btn btn-primary btn-lg" role="button" onClick={handlePricePromiseClick}>Match My Price</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default PricePromisePage;