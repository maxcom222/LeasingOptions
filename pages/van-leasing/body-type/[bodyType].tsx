import React from 'react';
import wrapper from 'redux/store.tsx/store';
import MainLayout from 'components/layout/main-layout';
import VehiclesSearchPageTemplate from 'components/pages/vehicles-search';

import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { getProps } from 'ssr/body-type-page';

export const getServerSideProps = wrapper.getServerSideProps(getProps);

const VanBodyTypePage = ({ title, description, vehicleFilter, modelPreviews, topPicks }) => {
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

VanBodyTypePage.layout = MainLayout;

export default VanBodyTypePage;