import React, { useEffect } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import wrapper from 'redux/store.tsx/store';
import MainLayout from 'components/layout/main-layout';
import ShortModelPageTemplate from 'components/pages/short-model';

import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { GetFullUrlPath } from 'helpers/urlHelper';
import { getProps } from 'ssr/model-page';

export const getServerSideProps = wrapper.getServerSideProps(getProps);

function mapStateToProps(state) {
    return {
        isInternal: state.isInternal
    };
}

const VanModelPage = ({ isInternal, vehicleType, title, description, modelImage, modelGallery, modelReview, vehicleFilter, make, model, topRecommended, alternativeModels }) => {
    useEffect(() => {
        // Redirect internal users
        if (isInternal) {
            Router.push("/internal" + GetFullUrlPath());
        }
    }, [isInternal]);

    return (
        <ShortModelPageTemplate
            isInternal={false}
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

VanModelPage.layout = MainLayout;

export default connect(mapStateToProps)(VanModelPage);