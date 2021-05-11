import React from 'react';
import { connect } from 'react-redux';
import wrapper from 'redux/store.tsx/store';
import MainLayout from 'components/layout/main-layout';
import VehiclesSearchPageTemplate from 'components/pages/vehicles-search';

import { getProps } from 'ssr/body-type-page';

export const getServerSideProps = wrapper.getServerSideProps(getProps);

function mapStateToProps(state) {
    return {
        leasingDealType: state.dealSelector
    };
}

const CarBodyTypePage = ({ leasingDealType, title, description, vehicleFilter, modelPreviews, topPicks }) => {
    return (
        <VehiclesSearchPageTemplate
            leasingDealType={leasingDealType}
            title={title}
            description={description}
            vehicleFilter={vehicleFilter}
            modelPreviews={modelPreviews}
            topPicks={topPicks}
        />
    );
}

CarBodyTypePage.layout = MainLayout;

export default connect(mapStateToProps)(CarBodyTypePage);