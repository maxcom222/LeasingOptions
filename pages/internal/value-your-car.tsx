import React from 'react';
import MainLayout from 'components/layout/main-layout';
import MetaHead from 'components/seo/meta';
import ValueYourCarPageTemplate from 'components/pages/value-your-car';

import { GetCanonicalUrl } from 'helpers/urlHelper';

const ValueYourCarInternalPage = () => {
    return (
        <>
            <MetaHead>
                <title>Part Exchange Car Lease - Value Your Car | Leasing Options</title>
                <meta name="description" content="Value your car online now with Leasing Options and work out how much you can put towards your new car leasing deal. You'll even have your car picked up for free!" />
                <meta name="keywords" content="Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire" />
                <link rel="canonical" href={GetCanonicalUrl(`/value-your-car`)} />
            </MetaHead>
            <ValueYourCarPageTemplate isInternal={true} />
        </>
    );
}

ValueYourCarInternalPage.layout = MainLayout;

export default ValueYourCarInternalPage;