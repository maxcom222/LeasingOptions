import React from 'react';
import wrapper from 'redux/store.tsx/store';
import MainLayout from 'components/layout/main-layout';
import VehiclesSearchPageTemplate from 'components/pages/vehicles-search';

import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { getProps } from 'ssr/instock-page';

export const getServerSideProps = wrapper.getServerSideProps(getProps);

const VanInStockPage = ({ title, description, vehicleFilter, modelPreviews, topPicks }) => {
    return (
        <VehiclesSearchPageTemplate
            leasingDealType={LeasingDealTypes.Van}
            title={title}
            description={description}
            vehicleFilter={vehicleFilter}
            modelPreviews={modelPreviews}
            topPicks={topPicks}
        />
    );
}

VanInStockPage.layout = MainLayout;

export default VanInStockPage;