import React from 'react';
import { connect } from 'react-redux';
import wrapper from 'redux/store.tsx/store';
import MainLayout from 'components/layout/main-layout';
import SearchPageTemplate from 'components/pages/search';

import { getProps } from 'ssr/search-page';

export const getServerSideProps = wrapper.getServerSideProps(getProps);

function mapStateToProps(state) {
    return {
        leasingDealType: state.dealSelector
    };
}

const CarSearchPage = ({ leasingDealType, vehicleFilter, modelPreviews, topPicks }) => {
    return (
        <SearchPageTemplate
            leasingDealType={leasingDealType}
            vehicleFilter={vehicleFilter}
            modelPreviews={modelPreviews}
            topPicks={topPicks}
        />
    );
}

CarSearchPage.layout = MainLayout;

export default connect(mapStateToProps)(CarSearchPage);