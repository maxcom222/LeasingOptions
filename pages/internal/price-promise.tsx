import React from 'react';
import MainLayout from 'components/layout/main-layout';
import MetaHead from 'components/seo/meta';
import PricePromisePageTemplate from 'components/pages/price-promise';

import { GetCanonicalUrl } from 'helpers/urlHelper';

const PricePromiseInternalPage = () => {
    return (
        <>
            <MetaHead>
                <title>Price Match Promise | £50 if we cant Price Match | Leasing Options</title>
                <meta name="description" content="Leasing Options offer competitive Leasing Deals and if you find a cheaper price elsewhere we will match it and offer £50 off!" />
                <meta name="keywords" content="Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire" />
                <link rel="canonical" href={GetCanonicalUrl(`/price-promise`)} />
            </MetaHead>
            <PricePromisePageTemplate isInternal={true} />
        </>
    );
}

PricePromiseInternalPage.layout = MainLayout;

export default PricePromiseInternalPage;