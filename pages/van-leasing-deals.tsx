import React from 'react';
import wrapper from 'redux/store.tsx/store';
import MainLayout from 'components/layout/main-layout';
import SpecialOffersPageTemplate from 'components/pages/special-offers';

import { VehicleTypes } from 'enums/VehicleTypes';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { MetaData } from 'types/infrastructure/MetaData';
import { GetServiceSchema } from 'helpers/schemaHelper';
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { getBaseUrl } from 'helpers/urlsHelper';
import { dispatchSearchType } from 'redux/dispatches/dispatchs';
import { GetTopSpecialOffers, GetSpecialOffersGrouped } from 'business-logic/vehicleService';

export const getServerSideProps = wrapper.getServerSideProps(

    async (context) => {
        dispatchSearchType(context, "offers", "Search special offers only");

        const vehicleType = VehicleTypes.Commercial;

        let topSpecialOffers = (await GetTopSpecialOffers(vehicleType)).data;
        let specialOffersGrouped = (await GetSpecialOffersGrouped(vehicleType)).data;

        const serviceSchema = await GetServiceSchema(vehicleType);

        const metaData: MetaData = {
            title: `Best Van Lease Deals & Special Offers | Leasing Options`,
            description: `Take advantage of our best van lease deals. Personal & business lease deals available all in one place, vehicles delivered anywhere in the UK.`,
            canonicalUrl: GetCanonicalUrl(getBaseUrl(context.req.url)),
            keywords: "Van Leasing, Long Term Van Hire, Van lease deals"
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

const VanSpecialOffersPage = ({ topSpecialOffers, specialOffersGrouped, serviceSchema }) => {
    return (
        <SpecialOffersPageTemplate leasingDealType={LeasingDealTypes.Van} vehicleType={VehicleTypes.Commercial} topSpecialOffers={topSpecialOffers} specialOffersGrouped={specialOffersGrouped} serviceSchema={serviceSchema} />
    );
};

VanSpecialOffersPage.layout = MainLayout;

export default VanSpecialOffersPage;