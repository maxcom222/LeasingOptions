import React from 'react';
import { connect } from 'react-redux';
import wrapper from 'redux/store.tsx/store';
import MainLayout from 'components/layout/main-layout';
import VehiclePageTemplate from 'components/pages/vehicle';

import { getProps } from 'ssr/vehicle-page';

export const getServerSideProps = wrapper.getServerSideProps(getProps);

function mapStateToProps(state) {
    return {
        leasingDealType: state.dealSelector
    };
}

const CarVehicleInternalPage = ({ leasingDealType, vehicle, orderModalOpenned }) => {
    return (<VehiclePageTemplate isInternal={true} leasingDealType={leasingDealType} vehicle={vehicle} orderModalOpenned={orderModalOpenned} />);
}

CarVehicleInternalPage.layout = MainLayout;

export default connect(mapStateToProps)(CarVehicleInternalPage);