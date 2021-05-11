import React from 'react';
import wrapper from 'redux/store.tsx/store';
import MainLayout from 'components/layout/main-layout';
import VehiclePageTemplate from 'components/pages/vehicle';

import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { getProps } from 'ssr/vehicle-page';

export const getServerSideProps = wrapper.getServerSideProps(getProps);

const VanVehicleInternalPage = ({ vehicle, orderModalOpenned }) => {
    return (<VehiclePageTemplate isInternal={true} leasingDealType={LeasingDealTypes.Van} vehicle={vehicle} orderModalOpenned={orderModalOpenned} />);
}

VanVehicleInternalPage.layout = MainLayout;

export default VanVehicleInternalPage;