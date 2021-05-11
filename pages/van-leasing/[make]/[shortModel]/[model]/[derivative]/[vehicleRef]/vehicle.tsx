import React, { useEffect } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import wrapper from 'redux/store.tsx/store';
import MainLayout from 'components/layout/main-layout';
import MetaHead from 'components/seo/meta';
import VehiclePageTemplate from 'components/pages/vehicle';

import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { GetVehicleSchema, GetSerializedSchema } from 'helpers/schemaHelper';
import { GetFullUrlPath } from 'helpers/urlHelper';
import { getProps } from 'ssr/vehicle-page';

export const getServerSideProps = wrapper.getServerSideProps(getProps);

function mapStateToProps(state) {
    return {
        isInternal: state.isInternal
    };
}

const VanVehiclePage = ({ isInternal, vehicle, metaData, orderModalOpenned }) => {
    useEffect(() => {
        // Redirect internal users
        if (isInternal) {
            Router.push("/internal" + GetFullUrlPath());
        }
    }, [isInternal]);

    return (
        <>
            <MetaHead>
                <meta property="og:type" content="product" />
                <meta property="og:title" content={metaData.title} />
                <meta property="og:url" content={metaData.canonicalUrl} />
                <meta property="og:image" content={metaData.imageUrl} />
                <meta property="og:description" content={metaData.description} />

                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: GetSerializedSchema(GetVehicleSchema(vehicle, metaData.canonicalUrl, metaData.imageUrl))
                }}>
                </script>
            </MetaHead>
            <VehiclePageTemplate isInternal={false} leasingDealType={LeasingDealTypes.Van} vehicle={vehicle} orderModalOpenned={orderModalOpenned} />
        </>
    );
}

VanVehiclePage.layout = MainLayout;

export default connect(mapStateToProps)(VanVehiclePage);