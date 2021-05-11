import React from 'react';
import { connect } from 'react-redux';
import wrapper from 'redux/store.tsx/store';
import MainLayout from 'components/layout/main-layout';
import SearchPageTemplate from 'components/pages/search';

import { PricingTypes } from 'enums/PricingTypes';
import { MetaData } from 'types/infrastructure/MetaData';
import { PaginationCriteria } from 'types/PaginationCriteria';
import { getLOSSRFetchHeaders } from 'helpers/apiHelper';
import { getBaseUrl } from 'helpers/urlsHelper';
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { getVehiclesFilter } from 'helpers/vehiclesFilterHelper';
import { dispatchUpdateDealToggle, dispatchUpdateUserPostcode, dispatchUpdateVehicleFilterSearch } from 'redux/dispatches/dispatchs';
import { GetTopLoPickVehicles, GetVehicleModelPreviews } from 'business-logic/vehicleService';

//TODO: check logic
export const getServerSideProps = wrapper.getServerSideProps(

    async (context) => {
        dispatchUpdateDealToggle(context);
        dispatchUpdateUserPostcode(context);

        const dealSelector = context.store.getState().dealSelector;
        const userPostcode = context.store.getState().userPostcode;

        let vehiclesFilter = getVehiclesFilter(context);
        vehiclesFilter.leasingDealType = dealSelector;
        vehiclesFilter.postcode = userPostcode;
        vehiclesFilter.maintenance = false;

        await dispatchUpdateVehicleFilterSearch(context, vehiclesFilter);
        const fetchHeaders = getLOSSRFetchHeaders(context);

        const paginationCriteria: PaginationCriteria = {
            pageSize: 11,
            pageIndex: 1
        }

        const modelPreviews = (await GetVehicleModelPreviews(vehiclesFilter, paginationCriteria, undefined, fetchHeaders)).data;
        const topPicks = (await GetTopLoPickVehicles(vehiclesFilter.vehicleType, '', PricingTypes.Atc, userPostcode, fetchHeaders)).data;//Missing postcode

        const metaData: MetaData = {
            title: `Car Leasing | Personal Lease Deals &amp; Contract Hire | Leasing Options`,
            description: `Get the best car leasing deals for personal contract hire from Leasing Options. Vehicles delivered anywhere in the UK. Get your FREE instant quote, today.`,
            canonicalUrl: GetCanonicalUrl(getBaseUrl(context.req.url)),
            keywords: `Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire`
        }

        return {
            props: {
                pricingType: vehiclesFilter.pricingType,
                userPostcode: userPostcode,
                metaData: metaData,

                modelPreviews: modelPreviews,
                topPicks: topPicks,

                vehicleFilter: vehiclesFilter
            }
        }
    }
);

function mapStateToProps(state) {
    return {
        leasingDealType: state.dealSelector
    };
}

const AtcSearchPage = ({ pricingType, userPostcode, leasingDealType, vehicleFilter, modelPreviews, topPicks }) => {
    return (
        <SearchPageTemplate
            pricingType={pricingType}
            userPostcode={userPostcode}
            leasingDealType={leasingDealType}
            vehicleFilter={vehicleFilter}
            modelPreviews={modelPreviews}
            topPicks={topPicks}
        />
    );
}

AtcSearchPage.layout = MainLayout;

export default connect(mapStateToProps)(AtcSearchPage);