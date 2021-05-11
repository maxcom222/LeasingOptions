import React from 'react';
import MainLayout from 'components/layout/main-layout';
import TrustBox from 'components/trustpilot/trust-box';
import MetaHead from '../components/seo/meta';
import { GetCanonicalUrl } from 'helpers/urlHelper';

export default function CustomerTestimonials () {
    return (
        <>
            <MetaHead>
                <title>Car Leasing Customer Testimonials | Leasing Options</title>
                <meta name="description" content="Watch our Customer Testimonial video and find out what happy customers who took advantage of our Car Leasing deals have to say, on LeasingOptions.co.uk" />
                <meta name="keywords" content="Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire" />
                <link rel="canonical" href={GetCanonicalUrl(`/customer-testimonials`)} />
            </MetaHead>
            <section className="container-fluid py-3 py-md-5">
                <div className="container">
                    <div className="row">
                        <div className="col-24">
                            <h1>Customer Testimonials - Personal</h1>
                            <h2 className="text-mint">At Leasing Options we're extremely proud of the relationships we form with our customers...</h2>
                            <p>At Leasing Options we're extremely proud of the relationships we form with our customers. The Price Match Promise means we won't be beaten by our competitors on price, but more importantly we think we offer the best service too. From the first point of contact you'll be assigned a dedicated account manager who will guide you through every step of the leasing process, all the way through to the delivery of your brand new vehicle.</p>
                            <div className="video-responsive mb-3">
                                <iframe width="1024" height="315" data-src="https://www.youtube.com/embed/SrETI47TRqw" className="lazyload" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                            </div>
                            <p>"My name's Mark Orford and I've been a customer of Leasing Options for just over a year. I've always owned my cars in the past, having either financed them directly through a main dealer or bought the car with cash. I lost too much money on the last car I owned so thought I needed to look at different options this time and leasing seemed to be the right approach for me.”</p>
                            <p>“I wanted to lease two cars because we were selling both privately owned cars so I was looking at lots of different leasing companies. What really stood out about Leasing Options was that they price matched for both cars and gave me a fantastic deal.”</p>
                            <h2>“The process was really straightforward and hassle free.”</h2>
                            <p>“A big shout out to Paul Hughes who was on the phone to me immediately after I put the enquiry in and developed that customer relationship pretty quickly. He was really helpful throughout and kept me up to date on a daily basis making it a no-brainer to go with Leasing Options.”</p>
                            <p>
                            “I would definitely recommend Leasing Options to other people because the customer care is second to none, from the first contact right the way through to singing all the paperwork and the car being delivered on your drive and ready to go. The price was right, the customer service was excellent and I couldn't
                            fault them.”
                            </p>
                            <p>Don't just take Mark's word for it though, our 5 star Trustpilot rating built up from over 1,500 reviews speaks for itself too!</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-24 my-3 my-md-5">
                        <TrustBox />
                    </div>
                </div>
            </section>
        </>
    )
}

CustomerTestimonials.layout = MainLayout;