import React from 'react';
import MainLayout from 'components/layout/main-layout';
import MetaHead from '../components/seo/meta';
import { Stream } from "@cloudflare/stream-react";
import { GetCanonicalUrl } from 'helpers/urlHelper';

export default function MyCar () {
    return (
        <>
            <MetaHead>
                <title>Look After My Car | Leasing Options UK</title>
                <meta name="description" content="Get the best car leasing deals for personal contract hire from Leasing Options. Vehicles delivered anywhere in the UK. Get your FREE instant quote, today." />
                <meta name="keywords" content="Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire" />
                <link rel="canonical" href={GetCanonicalUrl(`/look-after-my-car`)} />
         </MetaHead>
            <section className="container-fluid bg-lamc py-3 py-md-5">
                <div className="container">
                    <div className="row">
                        <div className="col-24 col-md-12 pb-3 pb-md-5">
                            <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/leasing_lookafter.svg`} className="lazyload" alt="" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-24 col-md-20 mb-3">
                            <h3 className="text-white">Congratulations on leasing your new car! It’s an exciting time! We want that to continue right through to renewal…</h3>
                            <p className="text-white">Look After My Car with Leasing Options is an online membership-only club that offers a range of insurance products and complimentary services designed to protect you and your vehicle:</p>
                        </div>
                        <div className="col-24 col-md-4 mb-3">
                            <div className="free-products">
                                <h4 className="text-center m-0">Get 3 months of any product FREE</h4><br /><small>*no purchase necessary</small>
                            </div>
                        </div>
                    </div>                  
                    <div className="row">
                        <div className="col-24 col-md-8 mb-3">
                            <div className="w-100 position-relative bg-white p-3">
                                <h5 className="mb-3">GAP Insurance</h5>
                                <Stream controls src="81e554af022cbf77e1cdbd6984a28886" />
                            </div>
                        </div>
                        <div className="col-24 col-md-8 mb-3">
                            <div className="w-100 position-relative bg-white p-3">
                                <h5>Tyre &amp; Alloy Insurance</h5>
                                <Stream controls src="84fb6c661bfcdb3c5706b57e13f43e87" />
                            </div>
                        </div>
                        <div className="col-24 col-md-8 mb-3">
                            <div className="w-100 position-relative bg-white p-3">
                                <h5>SMART Insurance</h5>
                                <Stream controls src="8e81b90bc2edbeffbf5d54eeaf837335" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-24">
                            <p className="text-white">As a member you will also get access to exclusive services including discounted rates on mobile wheel, tyre and body repairs. Best of all, you can stay a member for the full length of your lease and take advantage of any new offers as they become available.</p>
                            <h3 className="text-white">Take a 3 month FREE trial of any product </h3>
                            <p className="text-white">Want to try out the GAP Insurance, Tyre &amp; Alloy Insurance or the SMART Insurance for 3 months absolutely FREE?
                            Now that your new vehicle’s delivery details have been confirmed, you should have received an email from Look After My Car inviting you to complete your registration. Don’t worry if you haven’t - it’ll be arriving soon!</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

MyCar.layout = MainLayout;