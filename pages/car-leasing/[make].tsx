import React from 'react';
import { connect } from 'react-redux';
import wrapper from 'redux/store.tsx/store';
import MainLayout from 'components/layout/main-layout';
import MetaHead from 'components/seo/meta';
import MakePageTemplate from 'components/pages/make';

import { getWebPageSchema } from 'helpers/schemaHelper';
import { getProps } from 'ssr/make-page';

export const getServerSideProps = wrapper.getServerSideProps(getProps);

function mapStateToProps(state) {
    return {
        leasingDealType: state.dealSelector
    };
}

const CarMakePage = ({ leasingDealType, vehicleType, title, description, metaData, vehicleFilter, modelData, makeName, makeUrl, modelPreviews, topPicks, categoryNews }) => {
    return (
        <>
            <MetaHead>
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: getWebPageSchema(title, metaData.description)
                }}>
                </script>
            </MetaHead>
            <MakePageTemplate
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
                categoryNews={categoryNews}
            />
        </>
    );
}

CarMakePage.layout = MainLayout;

export default connect(mapStateToProps)(CarMakePage);