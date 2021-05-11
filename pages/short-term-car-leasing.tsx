import React from 'react';
import { connect } from 'react-redux';
import wrapper from 'redux/store.tsx/store';
import MainLayout from 'components/layout/main-layout';
import ShortTermPageTemplate from 'components/pages/short-term';

import { getProps } from 'ssr/short-term-page';

export const getServerSideProps = wrapper.getServerSideProps(getProps);

function mapStateToProps(state) {
    return {
        leasingDealType: state.dealSelector
    };
}

const CarShortTermPage = ({ leasingDealType, vehicleType, shortTermDeals, faqList, categoryList }) => {
    return (
        <ShortTermPageTemplate
            leasingDealType={leasingDealType}
            vehicleType={vehicleType}
            shortTermDeals={shortTermDeals}
            faqList={faqList}
            categoryList={categoryList}
        />
    );
}

CarShortTermPage.layout = MainLayout;

export default connect(mapStateToProps)(CarShortTermPage);