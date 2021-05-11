import React from 'react';
import { connect } from 'react-redux';
import MainLayout from 'components/layout/main-layout';
import MetaHead from 'components/seo/meta';
import ContactPageTemplate from 'components/pages/contact';

import { GetCanonicalUrl } from 'helpers/urlHelper';

function mapStateToProps(state) {
    return {
        previousRoute: GetCanonicalUrl(state.referrerRoute)
    };
}

const ContactInternalPage = ({ previousRoute }) => {
    return (
        <>
            <MetaHead>
                <title>Contact Us | Leasing Options the UK Car Leasing Specialist</title>
                <meta name="description" content="Find details on how to contact us. Here at Leasing Options we have a unique team of Leasing Experts to assist you with any of your needs." />
                <meta name="keywords" content="Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire" />
                <link rel="canonical" href={GetCanonicalUrl(`/contact`)} />
            </MetaHead>
            <ContactPageTemplate isInternal={true} previousRoute={previousRoute} />
        </>
    );
}

ContactInternalPage.layout = MainLayout;

export default connect(mapStateToProps)(ContactInternalPage);