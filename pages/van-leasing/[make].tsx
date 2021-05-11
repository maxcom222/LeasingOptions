import React from 'react';
import wrapper from 'redux/store.tsx/store';
import MainLayout from 'components/layout/main-layout';
import MetaHead from 'components/seo/meta';
import MakePageTemplate from 'components/pages/make';

import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { getWebPageSchema } from 'helpers/schemaHelper';
import { getProps } from 'ssr/make-page';

export const getServerSideProps = wrapper.getServerSideProps(getProps);

const VanMakePage = ({ vehicleType, title, description, metaData, vehicleFilter, modelData, makeName, makeUrl, modelPreviews, topPicks }) => {
    return (
        <>
            <MetaHead>
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: getWebPageSchema(title, metaData.description)
                }}>
                </script>
            </MetaHead>
            <MakePageTemplate
                leasingDealType={LeasingDealTypes.Van}
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
        </>
    );
}

VanMakePage.layout = MainLayout;

export default VanMakePage;