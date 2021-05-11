import React from 'react';
import MainLayout from 'components/layout/main-layout';
import MetaHead from 'components/seo/meta';
import MyGaragePageTemplate from 'components/pages/my-garage';

import { GetCanonicalUrl } from 'helpers/urlHelper';

const MyGarageInternalPage = () => {
    return (
        <>
            <MetaHead>
                <title>Compare Car Lease Deals: Comparison Garage | Leasing Options</title>
                <meta name="description" content="Use the My Garage Leasing Options tool to quickly and easily compare Cars and Car Lease Deals to find your perfect lease." />
                <meta name="keywords" content="Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire" />
                <link rel="canonical" href={GetCanonicalUrl(`/my-garage`)} />
            </MetaHead>
            <MyGaragePageTemplate isInternal={true} />
        </>
    );
}

MyGarageInternalPage.layout = MainLayout;

export default MyGarageInternalPage;