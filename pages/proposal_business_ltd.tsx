import React, { useEffect } from 'react';
import MainLayout from '../components/layout/main-layout';
import MetaHead from '../components/seo/meta';
import { ProposalTypes } from 'enums/ProposalTypes';
import DynamicProposalWizardComponent from 'components/proposal/dynamicWizard';



const ProposalPersonal = (props) => {

    return (
        <>
            <MetaHead>
                <title>Proposal Personal</title>
                <meta name="description" content="Proposal Business Ltd" />
                <meta name="keywords" content="Proposal Business Ltd" />
            </MetaHead>
            <section className="container-fluid py-3 py-md-5 bg-light-grey">
                <div className="container">
                    <div className="row">
                        <div className="col-24">
                            <DynamicProposalWizardComponent proposalType={ProposalTypes.BusinessLtd} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

ProposalPersonal.layout = MainLayout;

export default ProposalPersonal;