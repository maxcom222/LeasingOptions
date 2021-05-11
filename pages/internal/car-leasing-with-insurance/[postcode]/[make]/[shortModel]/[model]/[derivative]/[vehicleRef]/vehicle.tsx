import React from 'react';
import { connect } from 'react-redux';
import wrapper from 'redux/store.tsx/store';
import MainLayout from 'components/layout/main-layout';
import VehiclePageTemplate from 'components/pages/vehicle';

import { getProps } from 'ssr/atc-vehicle-page';

export const getServerSideProps = wrapper.getServerSideProps(getProps);

function mapStateToProps(state) {
    return {
        leasingDealType: state.dealSelector
    };
}

const AtcVehicleInternalPage = ({ pricingType, userPostcode, leasingDealType, vehicle }) => {
    return (<VehiclePageTemplate isInternal={true} pricingType={pricingType} userPostcode={userPostcode} leasingDealType={leasingDealType} vehicle={vehicle} />);
}

AtcVehicleInternalPage.layout = MainLayout;

export default connect(mapStateToProps)(AtcVehicleInternalPage);