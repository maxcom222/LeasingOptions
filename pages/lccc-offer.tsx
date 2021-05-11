import React from 'react';
import MainLayout from 'components/layout/main-layout';
import MetaHead from '../components/seo/meta';
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { GetPhoneNumber } from 'helpers/helpers';
import { connect } from 'react-redux';
import { LayoutProps } from 'types/LayoutProps';

type Props = {
    isInternal: boolean;
}
const LcccOffer:LayoutProps<Props> = ({isInternal}) => {

    return (
        <>
            <MetaHead>
                <title>Lancashire County Cricket Club Special Offer | Leasing Options</title>
                <meta name="description" content="Read about our Lancashire County Cricket Club Special Offer." />
                <meta name="keywords" content="Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire" />
                <link rel="canonical" href={GetCanonicalUrl(`/lccc-offer`)} />
            </MetaHead>
            <section className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-24">
                            <h1>Lancashire County Cricket Club Special Offer</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-24 col-md-19 mb-3">
                            <p>We've teamed up with our partners Lancashire County Cricket Club to put together a brilliant deal, exclusively available to club members. Fans can claim £199 off the value of a new vehicle plus a free shirt signed by a Lancs player!</p>
                            <p>Speak to us today to find out more and redeem this fantastic offer. Simply call <a href={`tel:${GetPhoneNumber(isInternal)}`} className="phonenumber_call_now">{GetPhoneNumber(isInternal)}</a> quoting “LANCS OFFER” and chat to one of our friendly account managers.</p>
                            <h1>Offer Terms &amp; Conditions</h1>
                            <ol className="ordered-list">
                                <li>Offer available to Lancashire County Cricket Club members only.</li>
                                <li>Quote "LANCS OFFER" to your account manager to claim your discount voucher.</li>
                                <li>Voucher is for the value of £199 against the processing fee on a new vehicle.</li>
                                <li>A maximum of one voucher can be presented for person.</li>
                                <li>Upon delivery of your vehicle you will be eligible to claim a player signed Lancashire County Cricket Club shirt.</li>
                                <li>Vouchers are valid until 31st September 2018.</li>
                                <li>Vouchers have no monetary value.</li>
                                <li>Vouchers cannot be combined with other offers, except as permitted by Leasing Options Ltd.</li>
                                <li>All offers are subject to availability.</li>
                            </ol>
                        </div>
                        <div className="col-24 col-md-5 d-none d-md-block text-right">
                            <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/Shirt.png`} className="img-fluid lazyload" alt="LCCC shirt" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

LcccOffer.layout = MainLayout;

const mapStateToProps = (state) => ({
    isInternal: state.isInternal
});

export default connect(mapStateToProps)(LcccOffer);