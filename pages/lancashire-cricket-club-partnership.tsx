import React from 'react';
import MainLayout from 'components/layout/main-layout';
import MetaHead from '../components/seo/meta';
import { GetCanonicalUrl } from 'helpers/urlHelper';


export default function LancashireCc () {
    return (
        <>
            <MetaHead>
                <title>Lancashire Cricket Club Partnership | Leasing Options</title>
                <meta name="description" content="Find out more about the partnership between Lancashire Cricket Club and Leasing Options." />
                <meta name="keywords" content="Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire" />
                <link rel="canonical" href={GetCanonicalUrl(`/lancashire-cricket-club-partnership`)} />
            </MetaHead>
            <section className="container-fluid py-3 py-md-5">
                <div className="container">
                    <div className="row">
                        <div className="col-24">
                            <h1>Lancashire County Cricket Club Partnership</h1>
                            <p><img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/lancashire-county-cricket-club.png`} className="lazyload float-right m-3" alt="Lancashire County Cricket Club" /><br />Leasing Options are proud to partner with Lancashire County Cricket Club and Emirates Old Trafford. As a local business with Lancashire based owners, LCCC were the obvious choice for Leasing Options to form a relationship with and we're also thrilled to be working with a global brand like Emirates. We are extremely excited about collaborating with a team that has such sporting heritage and pedigree, not to mention a truly top drawer venue, and we can't wait to get involved over the next two seasons and hopefully beyond.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

LancashireCc.layout = MainLayout;