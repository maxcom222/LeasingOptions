import React from 'react';
import wrapper from 'redux/store.tsx/store';
import MainLayout from 'components/layout/main-layout';
import SearchPageTemplate from 'components/pages/search';

import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { getProps } from 'ssr/search-page';

export const getServerSideProps = wrapper.getServerSideProps(getProps);

const VanSearchPage = ({ vehicleFilter, modelPreviews, topPicks }) => {
    return (
        <SearchPageTemplate
            leasingDealType={LeasingDealTypes.Van}
            vehicleFilter={vehicleFilter}
            modelPreviews={modelPreviews}
            topPicks={topPicks}
        />
    );
}

VanSearchPage.layout = MainLayout;

export default VanSearchPage;