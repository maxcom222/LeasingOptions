import React from 'react';
import { connect } from 'react-redux';
import wrapper from 'redux/store.tsx/store';
import MainLayout from 'components/layout/main-layout';
import MetaHead from 'components/seo/meta';
import HomePageTemplate from 'components/pages/home';

import { GetCanonicalUrl } from 'helpers/urlHelper';
import { getProps } from 'ssr/home-page';

export const getServerSideProps = wrapper.getServerSideProps(getProps);

function mapStateToProps(state) {
    return {
        leasingDealType: state.dealSelector,
        carManufacturerList: state.carManufacturerList
    };
}

const HomeInternalPage = ({ leasingDealType, carManufacturerList, topVehicles }) => {
    return (
        <>
            <MetaHead>
                <title>Leasing Options | 5* Professional &amp; Personal Vehicle Leasing Service</title>
                <meta name="description" content="Business &amp; Personal Car Leasing Deals from Leasing Options UK - 30 Years Experience, FREE Instant Quotes &amp; Price Match Promise on our Car Lease Deals."></meta>
                <meta name="keywords" content="Car Leasing, Business Car Leasing, Car Lease Deals, Car Leasing Manchester, Contract Hire"></meta>
                <link rel="canonical" href={GetCanonicalUrl(`/`)} />
            </MetaHead>
            <HomePageTemplate isInternal={true} leasingDealType={leasingDealType} carManufacturerList={carManufacturerList} topVehicles={topVehicles} />
        </>
    );
}

HomeInternalPage.layout = MainLayout;

export default connect(mapStateToProps)(HomeInternalPage);