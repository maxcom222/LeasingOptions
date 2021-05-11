import React from 'react';
import wrapper from 'redux/store.tsx/store';
import MainLayout from 'components/layout/main-layout';
import ShortTermPageTemplate from 'components/pages/short-term';

import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { getProps } from 'ssr/short-term-page';

export const getServerSideProps = wrapper.getServerSideProps(getProps);

const VanShortTermPage = ({ vehicleType, shortTermDeals, faqList, categoryList }) => {
    return (
        <ShortTermPageTemplate
            leasingDealType={LeasingDealTypes.Van}
            vehicleType={vehicleType}
            shortTermDeals={shortTermDeals}
            faqList={faqList}
            categoryList={categoryList}
        />
    );
}

VanShortTermPage.layout = MainLayout;

export default VanShortTermPage;