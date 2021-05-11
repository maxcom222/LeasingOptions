import React from 'react';
import { connect } from 'react-redux';
import wrapper from 'redux/store.tsx/store';
import MainLayout from 'components/layout/main-layout';
import SpecialOffersPageTemplate from 'components/pages/special-offers';

import { VehicleTypes } from 'enums/VehicleTypes';
import { MetaData } from 'types/infrastructure/MetaData';
import { GetServiceSchema } from 'helpers/schemaHelper';
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { getBaseUrl } from 'helpers/urlsHelper';
import { dispatchUpdateDealToggle, dispatchSearchType } from 'redux/dispatches/dispatchs';
import { GetTopSpecialOffers, GetSpecialOffersGrouped } from 'business-logic/vehicleService';

export const getServerSideProps = wrapper.getServerSideProps(

    async (context) => {
        dispatchUpdateDealToggle(context);
        dispatchSearchType(context, "offers", "Search special offers only");

        const vehicleType = VehicleTypes.Car;

        let topSpecialOffers = (await GetTopSpecialOffers(vehicleType)).data;
        let specialOffersGrouped = (await GetSpecialOffersGrouped(vehicleType)).data;

        const serviceSchema = await GetServiceSchema(vehicleType);

        const metaData: MetaData = {
            title: `Best Car Lease Deals & Special Offers | Leasing Options`,
            description: `Take advantage of our best car lease deals. Personal &amp; business lease deals available all in one place, vehicles delivered anywhere in the UK.`,
            canonicalUrl: GetCanonicalUrl(getBaseUrl(context.req.url)),
            keywords: "Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire"
        }

        return {
            props: {
                metaData: metaData,
                serviceSchema: serviceSchema,

                topSpecialOffers: topSpecialOffers,
                specialOffersGrouped: specialOffersGrouped
            }
        };
    }
);

function mapStateToProps(state) {
    return {
        leasingDealType: state.dealSelector
    };
}

const CarSpecialOffersPage = ({ leasingDealType, topSpecialOffers, specialOffersGrouped, serviceSchema }) => {
    return (
        <SpecialOffersPageTemplate leasingDealType={leasingDealType} vehicleType={VehicleTypes.Car} topSpecialOffers={topSpecialOffers} specialOffersGrouped={specialOffersGrouped} serviceSchema={serviceSchema} />
    );
};

CarSpecialOffersPage.layout = MainLayout;

export default connect(mapStateToProps)(CarSpecialOffersPage);
