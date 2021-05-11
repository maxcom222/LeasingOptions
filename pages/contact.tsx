import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import MainLayout from 'components/layout/main-layout';
import MetaHead from 'components/seo/meta';
import ContactPageTemplate from 'components/pages/contact';

import { GetCanonicalUrl, GetFullUrlPath } from 'helpers/urlHelper';

function mapStateToProps(state) {
    return {
        isInternal: state.isInternal,
        previousRoute: GetCanonicalUrl(state.referrerRoute)
    };
}

const ContactPage = ({ isInternal, previousRoute }) => {
    useEffect(() => {
        // Redirect internal users
        if (isInternal) {
            Router.push("/internal" + GetFullUrlPath());
        }
    }, [isInternal]);

    return (
        <>
            <MetaHead>
                <title>Contact Us | Leasing Options the UK Car Leasing Specialist</title>
                <meta name="description" content="Find details on how to contact us. Here at Leasing Options we have a unique team of Leasing Experts to assist you with any of your needs." />
                <meta name="keywords" content="Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire" />
                <link rel="canonical" href={GetCanonicalUrl(`/contact`)} />
            </MetaHead>
            <ContactPageTemplate isInternal={false} previousRoute={previousRoute} />
        </>
    );
}

ContactPage.layout = MainLayout;

export default connect(mapStateToProps)(ContactPage);