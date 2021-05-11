import React from 'react';
import wrapper from 'redux/store.tsx/store';
import MainLayout from 'components/layout/main-layout';
import ShortModelPageTemplate from 'components/pages/short-model';

import { getProps } from 'ssr/atc-model-page';

//TODO: check whole implementation. Do we need this page at all?
export const getServerSideProps = wrapper.getServerSideProps(getProps);

const AtcModelInternalPage = ({ pricingType, userPostcode, leasingDealType, vehicleType, title, description, modelImage, modelGallery, modelReview, vehicleFilter, make, model, topRecommended, alternativeModels }) => {
    return (
        <ShortModelPageTemplate
            isInternal={true}
            pricingType={pricingType}
            userPostcode={userPostcode}
            leasingDealType={leasingDealType}
            vehicleType={vehicleType}
            title={title}
            description={description}
            modelImage={modelImage}
            modelGallery={modelGallery}
            modelReview={modelReview}
            vehicleFilter={vehicleFilter}
            make={make}
            model={model}
            topRecommended={topRecommended}
            alternativeModels={alternativeModels}
        />
    );
}

AtcModelInternalPage.layout = MainLayout;

export default AtcModelInternalPage;