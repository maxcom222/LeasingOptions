import React from 'react';
import MainLayout from 'components/layout/main-layout';
import MetaHead from '../components/seo/meta';
import { GetCanonicalUrl } from 'helpers/urlHelper';


export default function CookiePolicy () {
    return (
        <>
            <MetaHead>
                <title>Our Partners Contact Details | Leasing Options</title>
                <meta name="description" content="" />
                <meta name="keywords" content="" />
                <link rel="canonical" href={GetCanonicalUrl(`/our-partners-contact-details`)} />
            </MetaHead>
            <section className="container-fluid py-3 py-md-5 bg-light-grey">
                <div className="container bg-white">
                    <div className="row">
                        <div className="col-24 py-3">
                            <h1>Our Partners Contact Details</h1>
                            <p>Whilst Leasing Options will always endeavour to support you to solve any issues  and we should have more detail than your funder in many circumstances. However we appreciate, there may be times you need to contact your funder directly.</p>
                            <p>If you have an urgent unanswered question about an existing agreement, you can contact your funder directly using the contact details below.</p>
                            <h4 className="text-mint mb-1">ALD Automotive Limited</h4>
                            <p>Phone: <a href="tel:03700011181" className="text-mint">03700 011 181</a></p>
                            <p>Email: <a href="mailto:customerrelations@aldautomotive.com" className="text-mint">customerrelations@aldautomotive.com </a><br />Please quote your customer account number and vehicle registration number.</p>
                            
                            <h4 className="text-mint mt-5 mb-1">Alphabet (GB) Limited</h4>
                            <p>Phone: <a href="tel:0370012034" className="text-mint">0370 012 034</a></p>
                            <p>Email: <a href="mailto:csalphabet@alphabet.co.uk" className="text-mint">csalphabet@alphabet.co.uk</a></p>
                            
                            <h4 className="text-mint mt-5 mb-1">Arval UK Limited</h4>
                            <p>Phone: <a href="tel:03452665228" className="text-mint">0345 266 5228</a></p>
                            <p>Payment Queries: <a href="mailto:paymentbreak@arval.co.uk " className="text-mint">paymentbreak@arval.co.uk </a><br />General Queries: <a href="mailto:brokercustomerservices1@arval.co.uk" className="text-mint">brokercustomerservices1@arval.co.uk</a></p>

                            <h4 className="text-mint mt-5 mb-1">Hitachi Capital (UK) PLC</h4>
                            <p>Phone: <a href="tel:03433519021" className="text-mint">0343 351 9021</a></p>
                            <p>Email: <a href="mailto:RAMT@hitachicapital.co.uk" className="text-mint">RAMT@hitachicapital.co.uk</a></p>

                            <h4 className="text-mint mt-5 mb-1">Leaseplan UK Limited</h4>
                            <p>Phone: <a href="tel:03444935811" className="text-mint">0344 493 5811</a></p>
                            <p>Email: <a href="mailto:specialsupportunit@leaseplan.com" className="text-mint">specialsupportunit@leaseplan.com</a></p>

                            <h4 className="text-mint mt-5 mb-1">Leasys UK Limited</h4>
                            <p>Phone: <a href="tel:03445614611" className="text-mint">0344 561 4611</a></p>
                            <p>Email: <a href="mailto:contractsmanagement.uk@leasys.com" className="text-mint">contractsmanagement.uk@leasys.com</a></p>

                            <h4 className="text-mint mt-5 mb-1">Lex Autolease Limited</h4>
                            <p>Phone: <a href="tel:03448796633" className="text-mint">0344 879 6633</a></p>
                            <p>Email: <a href="mailto:customer.services@lexautolease.co.uk" className="text-mint">customer.services@lexautolease.co.uk</a><br /></p>

                            <h4 className="text-mint mt-5 mb-1">Santander Consumer (UK) PLC</h4>
                            <p>Phone: <a href="tel:03701348751" className="text-mint">0370 134 8751</a></p>
                            <p>Email: <a href="mailto:customerservices@santanderconsumer.co.uk" className="text-mint">customerservices@santanderconsumer.co.uk</a><br /></p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

CookiePolicy.layout = MainLayout;