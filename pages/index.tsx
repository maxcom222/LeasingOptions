import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import wrapper from 'redux/store.tsx/store';
import Router from 'next/router';
import MainLayout from 'components/layout/main-layout';
import MetaHead from 'components/seo/meta';
import HomePageTemplate from 'components/pages/home';

import { GetPhoneNumber } from 'helpers/helpers';
import { GetCanonicalUrl } from 'helpers/urlHelper';

import { getProps } from 'ssr/home-page';

export const getServerSideProps = wrapper.getServerSideProps(getProps);

function mapStateToProps(state) {
    return {
        isInternal: state.isInternal,
        leasingDealType: state.dealSelector,
        carManufacturerList: state.carManufacturerList
    };
}

const HomePage = ({ isInternal, leasingDealType, carManufacturerList, topVehicles }) => {
    useEffect(() => {
        // Redirect internal users
        if (isInternal) {
            Router.push("/internal");
        }
    }, [isInternal]);

    return (
        <>
            <MetaHead>
                <title>Leasing Options | 5* Professional &amp; Personal Vehicle Leasing Service</title>
                <meta name="description" content="Business &amp; Personal Car Leasing Deals from Leasing Options UK - 30 Years Experience, FREE Instant Quotes &amp; Price Match Promise on our Car Lease Deals."></meta>
                <meta name="keywords" content="Car Leasing, Business Car Leasing, Car Lease Deals, Car Leasing Manchester, Contract Hire"></meta>
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={process.env.NEXT_PUBLIC_CANONICALBASEURL} />
                <meta property="og:title" content="Leasing Options | 5* Professional &amp; Personal Vehicle Leasing Service" />
                <meta property="og:description" content="Business &amp; Personal Car Leasing Deals from Leasing Options UK - 30 Years Experience, FREE Instant Quotes &amp; Price Match Promise on our Car Lease Deals." />
                <meta property="og:image" content={process.env.NEXT_PUBLIC_CDN + "/website/static/hero/morning-1.jpg"} />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={process.env.NEXT_PUBLIC_CANONICALBASEURL} />
                <meta property="twitter:title" content="Leasing Options | 5* Professional &amp; Personal Vehicle Leasing Service" />
                <meta property="twitter:description" content="Business &amp; Personal Car Leasing Deals from Leasing Options UK - 30 Years Experience, FREE Instant Quotes &amp; Price Match Promise on our Car Lease Deals." />
                <meta property="twitter:image" content={process.env.NEXT_PUBLIC_CDN + "/website/static/hero/morning-1.jpg"} />
                <link rel="canonical" href={GetCanonicalUrl(`/`)} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: `{
                    "@context":"http://schema.org",
                    "@type":"Organization",
                    "name": "Leasing Options Ltd",
                    "logo": "https://imagecdn.leasingoptions.co.uk/website/static/leasing-options-logo.svg",
                    "sameAs": [
                    "https://www.facebook.com/LeasingOptionsLtd",
                    "https://uk.trustpilot.com/review/leasingoptions.co.uk",
                    "https://www.linkedin.com/company/leasing-options-ltd",
                    "https://twitter.com/LeasingOptions",
                    "https://www.instagram.com/leasing_options_ltd/",
                    "https://www.youtube.com/channel/UCavDFgP64eci2XUTqElJvcQ"],
                    "telephone": ${GetPhoneNumber(false)},
                    "email": "info@leasingoptions.co.uk",
                    "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Options House, Atkin Street, Worsley",
                    "addressLocality": "Manchester",
                    "addressCountry": "England",
                    "postalCode": "M28 3DG"},
                    "url": "https://www.leasingoptions.co.uk/"
                    }`
                }}>
                </script>
            </MetaHead>
            <HomePageTemplate isInternal={false} leasingDealType={leasingDealType} carManufacturerList={carManufacturerList} topVehicles={topVehicles} />
        </>
    )
}

HomePage.layout = MainLayout;

export default connect(mapStateToProps)(HomePage);