import React from 'react';
import wrapper from 'redux/store.tsx/store';
import MainLayout from 'components/layout/main-layout';
import ShortModelPageTemplate from 'components/pages/short-model';

import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { getProps } from 'ssr/model-page';

export const getServerSideProps = wrapper.getServerSideProps(getProps);

const VanShortModelInternalPage = ({ vehicleType, title, description, modelImage, modelGallery, modelReview, vehicleFilter, make, model, topRecommended, alternativeModels }) => {
    return (
        <ShortModelPageTemplate
            isInternal={true}
            leasingDealType={LeasingDealTypes.Van}
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

VanShortModelInternalPage.layout = MainLayout;

export default VanShortModelInternalPage;