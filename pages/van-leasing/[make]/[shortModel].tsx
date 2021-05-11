import React, { useEffect } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import wrapper from 'redux/store.tsx/store';
import MainLayout from 'components/layout/main-layout';
import MetaHead from 'components/seo/meta';
import ShortModelPageTemplate from 'components/pages/short-model';

import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { getWebPageSchema, GetSerializedSchema } from 'helpers/schemaHelper';
import { GetFullUrlPath } from 'helpers/urlHelper';
import { getProps } from 'ssr/model-page';

export const getServerSideProps = wrapper.getServerSideProps(getProps);

function mapStateToProps(state) {
    return {
        isInternal: state.isInternal
    };
}

const VanShortModelPage = ({ isInternal, vehicleType, title, description, metaData, vehicleModelSchema, modelImage, modelGallery, modelReview, vehicleFilter, make, model, topRecommended, alternativeModels }) => {
    useEffect(() => {
        // Redirect internal users
        if (isInternal) {
            Router.push("/internal" + GetFullUrlPath());
        }
    }, [isInternal]);

    return (
        <>
            <MetaHead>
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: getWebPageSchema(title, metaData.description)
                }}>
                </script>
                {vehicleModelSchema ?
                    (<script type="application/ld+json" dangerouslySetInnerHTML={{
                        __html: GetSerializedSchema(vehicleModelSchema)
                    }}>
                    </script>) : null}
            </MetaHead>
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
        </>
    );
}

VanShortModelPage.layout = MainLayout;

export default connect(mapStateToProps)(VanShortModelPage);