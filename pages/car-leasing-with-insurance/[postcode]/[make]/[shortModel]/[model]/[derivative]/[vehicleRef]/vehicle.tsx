import React, { useEffect } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import wrapper from 'redux/store.tsx/store';
import MainLayout from 'components/layout/main-layout';
import VehiclePageTemplate from 'components/pages/vehicle';

import { GetFullUrlPath } from 'helpers/urlHelper';
import { getProps } from 'ssr/atc-vehicle-page';

export const getServerSideProps = wrapper.getServerSideProps(getProps);

function mapStateToProps(state) {
    return {
        isInternal: state.isInternal,
        leasingDealType: state.dealSelector
    };
}

const AtcVehiclePage = ({ isInternal, pricingType, userPostcode, leasingDealType, vehicle }) => {
    useEffect(() => {
        // Redirect internal users
        if (isInternal) {
            Router.push("/internal" + GetFullUrlPath());
        }
    }, [isInternal]);

    return (<VehiclePageTemplate isInternal={false} pricingType={pricingType} userPostcode={userPostcode} leasingDealType={leasingDealType} vehicle={vehicle} />);
}

AtcVehiclePage.layout = MainLayout;

export default connect(mapStateToProps)(AtcVehiclePage);