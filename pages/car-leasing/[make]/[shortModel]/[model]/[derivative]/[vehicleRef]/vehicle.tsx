import React, { useEffect } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import wrapper from 'redux/store.tsx/store';
import MainLayout from 'components/layout/main-layout';
import MetaHead from 'components/seo/meta';
import VehiclePageTemplate from 'components/pages/vehicle';

import { GetVehicleSchema, GetSerializedSchema } from 'helpers/schemaHelper';
import { GetFullUrlPath } from 'helpers/urlHelper';
import { getProps } from 'ssr/vehicle-page';

export const getServerSideProps = wrapper.getServerSideProps(getProps);

function mapStateToProps(state) {
    return {
        isInternal: state.isInternal,
        leasingDealType: state.dealSelector
    };
}

const CarVehiclePage = ({ isInternal, leasingDealType, vehicle, metaData, orderModalOpenned }) => {
    useEffect(() => {
        // Redirect internal users
        if (isInternal) {
            Router.push("/internal" + GetFullUrlPath());
        }
    }, [isInternal]);

    return (
        <>
            <MetaHead>
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="product" />
                <meta property="og:url" content={metaData.canonicalUrl} />
                <meta property="og:title" content={metaData.title} />
                <meta property="og:description" content={metaData.description} />
                <meta property="og:image" content={metaData.imageUrl ? metaData.imageUrl : process.env.NEXT_PUBLIC_CDN + "/fit-in/400x400/website/static/img-placeholder.jpg"} />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={metaData.canonicalUrl} />
                <meta property="twitter:title" content={metaData.title} />
                <meta property="twitter:description" content={metaData.description} />
                <meta property="twitter:image" content={metaData.imageUrl ? metaData.imageUrl : process.env.NEXT_PUBLIC_CDN + "/fit-in/400x400/website/static/img-placeholder.jpg"} />

                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: GetSerializedSchema(GetVehicleSchema(vehicle, metaData.canonicalUrl, metaData.imageUrl))
                }}>
                </script>
            </MetaHead>
            <VehiclePageTemplate isInternal={false} leasingDealType={leasingDealType} vehicle={vehicle} orderModalOpenned={orderModalOpenned} />
        </>
    );
}

CarVehiclePage.layout = MainLayout;

export default connect(mapStateToProps)(CarVehiclePage);