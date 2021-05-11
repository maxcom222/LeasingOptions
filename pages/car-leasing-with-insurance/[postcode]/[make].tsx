import React from 'react';
import { connect } from 'react-redux';
import wrapper from 'redux/store.tsx/store';
import MainLayout from 'components/layout/main-layout';
import MakePageTemplate from 'components/pages/make';

import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { VehicleTypes } from 'enums/VehicleTypes';
import { CustomContentTypes } from 'enums/CustomContentTypes';
import { MetaData } from 'types/infrastructure/MetaData';
import { getBaseUrl } from 'helpers/urlsHelper';
import { isNullOrWhiteSpace, capitalize } from 'helpers/stringHelper';
import { MakePageMetaTitle, MakePageMetaDescription } from 'helpers/seoHelper';
import { getLOSSRFetchHeaders } from 'helpers/apiHelper';
import { GetProperManufacturerName } from 'helpers/helpers';
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { getVehiclesFilter } from 'helpers/vehiclesFilterHelper';
import { ContentService } from 'business-logic/contentService';
import { dispatchUpdateDealToggle, dispatchUpdateUserPostcode, dispatchUpdateVehicleFilterSearch } from 'redux/dispatches/dispatchs';
import { GetVehicleModelPreviews, GetTopLoPickVehicles, GetAvailableShortModels, GetStaticMakes } from 'business-logic/vehicleService';

export const getServerSideProps = wrapper.getServerSideProps(

    async (context) => {
        dispatchUpdateDealToggle(context);
        dispatchUpdateUserPostcode(context);

        const vehicleType = VehicleTypes.Car;
        const leasingDealType = context.store.getState().dealSelector;//TODO: ensure always is Personal - not critical
        const makeUrl = context.query.make as string;
        const userPostcode = context.store.getState().userPostcode;
        const make = GetStaticMakes(vehicleType).find(item => { return item.id === makeUrl });

        if (!make) {
            context.res.writeHead(302, {
                Location: '/car-leasing-with-insurance'
            });
            context.res.end();
            return;
        }

        const vehiclesFilter = getVehiclesFilter(context);
        vehiclesFilter.vehicleType = vehicleType;
        vehiclesFilter.leasingDealType = leasingDealType;
        vehiclesFilter.maintenance = true;
        await dispatchUpdateVehicleFilterSearch(context, vehiclesFilter);

        const fetchHeaders = getLOSSRFetchHeaders(context);
        const pricingType = vehiclesFilter.pricingType;//Shouldn't it be set above?

        //Why do we need them on server-side?
        const modelPreviews = (await GetVehicleModelPreviews(vehiclesFilter, { pageSize: 12, pageIndex: 1 }, undefined, fetchHeaders)).data;
        const topPicks = (await GetTopLoPickVehicles(vehicleType, make.id, pricingType, userPostcode, fetchHeaders)).data;
        const modelData = (await GetAvailableShortModels(vehiclesFilter, fetchHeaders)).data;

        const pageContent = (await ContentService.GetManufacturePageContent(CustomContentTypes.Manufacturer, LeasingDealTypes.Personal, make.id)).data;

        const makeName = capitalize(GetProperManufacturerName(make.text).toUpperCase());

        const title = `Explore the ${makeName} Lease Range`;
        const description = pageContent?.text || null;
        //TODO: implement
        //Description = !string.IsNullOrEmpty(customContent.Text) ? customContent.Text.Replace("#manufacturer#", manufacturer.Text.ToUpper()).Replace("<br/>", "").Replace("<br>", "") : null

        //TODO: implement - not critical
        //if (!string.IsNullOrEmpty(customContent.ImageUrl)) {
        //    contentItem.ImageUrl = customContent.ImageUrl;
        //}
        //else {
        //    contentItem.ImageUrl = await this._vehicleImagesService.GetVehicleManufacturerTopImageUrlAsync(vehicleType, manufacturer.Text);
        //}

        //----MetaData----
        const metaData: MetaData = {
            title: capitalize(pageContent?.metaPageTitle) || null,
            description: pageContent?.metaDescription || null,
            keywords: pageContent?.metaKeywords || null,
            canonicalUrl: GetCanonicalUrl(getBaseUrl(context.req.url)),
            noIndex: true
        }

        if (isNullOrWhiteSpace(metaData.title)) {
            metaData.title = MakePageMetaTitle(leasingDealType, makeName);
        }

        if (isNullOrWhiteSpace(metaData.description)) {
            metaData.description = MakePageMetaDescription(leasingDealType, makeName);
        }

        if (!isNullOrWhiteSpace(metaData.description)) {
            metaData.description = metaData.description.replace(/[\r\n]+/g, " ").trim();
        }
        //----//MetaData----

        return {
            props: {
                pricingType: vehiclesFilter.pricingType,
                userPostcode: userPostcode,
                title: title,
                description: description,
                metaData: metaData,

                makeName: makeName,
                makeUrl: makeUrl,

                modelPreviews: modelPreviews,
                topPicks: topPicks,
                modelData: modelData,

                //if we pass whole filter why do we need separate properties
                vehicleType: vehiclesFilter.vehicleType,
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

const AtcMakePage = ({ pricingType, userPostcode, leasingDealType, vehicleType, title, description, vehicleFilter, modelData, makeUrl, makeName, modelPreviews, topPicks }) => {
    return (
        <MakePageTemplate
            pricingType={pricingType}
            userPostcode={userPostcode}
            leasingDealType={leasingDealType}
            vehicleType={vehicleType}
            title={title}
            description={description}
            vehicleFilter={vehicleFilter}
            modelData={modelData}
            makeName={makeName}
            makeUrl={makeUrl}
            modelPreviews={modelPreviews}
            topPicks={topPicks}
        />
    );
}

AtcMakePage.layout = MainLayout;

export default connect(mapStateToProps)(AtcMakePage);