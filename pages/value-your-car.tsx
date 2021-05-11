import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import MainLayout from 'components/layout/main-layout';
import MetaHead from 'components/seo/meta';
import ValueYourCarPageTemplate from 'components/pages/value-your-car';

import { GetFullUrlPath } from 'helpers/urlHelper';
import { GetCanonicalUrl } from 'helpers/urlHelper';

function mapStateToProps(state) {
    return {
        isInternal: state.isInternal
    };
}

const ValueYourCarPage = ({ isInternal }) => {
    useEffect(() => {
        // Redirect internal users
        if (isInternal) {
            Router.push("/internal" + GetFullUrlPath());
        }
    }, [isInternal]);

    return (
        <>
            <MetaHead>
                <title>Part Exchange Car Lease - Value Your Car | Leasing Options</title>
                <meta name="description" content="Value your car online now with Leasing Options and work out how much you can put towards your new car leasing deal. You'll even have your car picked up for free!" />
                <meta name="keywords" content="Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire" />
                <link rel="canonical" href={GetCanonicalUrl(`/value-your-car`)} />
            </MetaHead>
            <ValueYourCarPageTemplate isInternal={false} />
        </>
    )
}

ValueYourCarPage.layout = MainLayout;

export default connect(mapStateToProps)(ValueYourCarPage);