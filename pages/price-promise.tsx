import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import MainLayout from 'components/layout/main-layout';
import MetaHead from 'components/seo/meta';
import PricePromisePageTemplate from 'components/pages/price-promise';

import { GetCanonicalUrl, GetFullUrlPath } from 'helpers/urlHelper';

function mapStateToProps(state) {
    return {
        isInternal: state.isInternal
    };
}

const PricePromisePage = ({ isInternal }) => {
    useEffect(() => {
        // Redirect internal users
        if (isInternal) {
            Router.push("/internal" + GetFullUrlPath());
        }
    }, [isInternal]);

    return (
        <>
            <MetaHead>
                <title>Price Match Promise | £50 if we cant Price Match | Leasing Options</title>
                <meta name="description" content="Leasing Options offer competitive Leasing Deals and if you find a cheaper price elsewhere we will match it and offer £50 off!" />
                <meta name="keywords" content="Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire" />
                <link rel="canonical" href={GetCanonicalUrl(`/price-promise`)} />
            </MetaHead>
            <PricePromisePageTemplate isInternal={false} />
        </>
    )
}

PricePromisePage.layout = MainLayout;

export default connect(mapStateToProps)(PricePromisePage);