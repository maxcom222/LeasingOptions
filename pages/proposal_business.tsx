import React, { useEffect, useState } from 'react';
import MainLayout from '../components/layout/main-layout';
import MetaHead from '../components/seo/meta';

import { useRouter } from 'next/router';
import { joinNotEmpty } from "helpers/stringHelper";
import Link from 'next/link';

import { GetPhoneNumber } from 'helpers/helpers';
import { connect } from 'react-redux';
import { LayoutProps } from 'types/LayoutProps';

type Props = {
    isInternal: boolean;
}
const ProposalBusiness:LayoutProps<Props> = ({isInternal}) => {
    const router = useRouter();

    const [proposalSoleUrl, setProposalSoleUrl] = useState<string>();
    const [proposalPartnerUrl, setProposalPartnerUrl] = useState<string>();
    const [proposalLtdUrl, setProposalLtdUrl] = useState<string>();

    useEffect(() => {

        const queryParams = new URLSearchParams(window.location.search);

        let quoteid = router.query.quoteid || queryParams.get("quoteid");
        let enquiryid = router.query.enquiryid || queryParams.get("enquiryid");
        let uid = router.query.uid || queryParams.get("uid");
        let directfinance = router.query.directfinance || queryParams.get("directfinance");

        let urlParams = [];

        if (quoteid) {
            urlParams.push(`quoteid=${quoteid}`);
        }

        if (enquiryid) {
            urlParams.push(`enquiryid=${enquiryid}`);
        }

        if (uid) {
            urlParams.push(`uid=${uid}`);
        }

        if (directfinance) {
            urlParams.push(`directfinance=${directfinance}`);
        }

        setProposalSoleUrl("/proposal_business_sole" + ((urlParams.length > 0) ? `?${joinNotEmpty('&', urlParams)}` : ''));
        setProposalPartnerUrl("/proposal_business_partner" + ((urlParams.length > 0) ? `?${joinNotEmpty('&', urlParams)}` : ''));
        setProposalLtdUrl("/proposal_business_ltd" + ((urlParams.length > 0) ? `?${joinNotEmpty('&', urlParams)}` : ''));

    }, []);

    return (
        <>
            <MetaHead>
                <title>Proposal Personal</title>
                <meta name="description" content="Proposal Business" />
                <meta name="keywords" content="Proposal Business" />
            </MetaHead>
            <section className="container-fluid py-3 py-md-5 bg-light-grey">
                <div className="container bg-white p-3 p-md-5">
                    <h2 className="mb-5">Secure Business Lease Credit Application</h2>
                    <p className="mb-4">Select the type of application you would like to complete.</p>

                    <div className="row">
                        <div className="col-24 col-md-6">
                            <Link href={`${proposalSoleUrl}`}><a className="btn btn-primary btn-block btn-lg p-4">Sole Trader Application</a></Link>
                        </div>
                        <div className="col-24 col-md-6">
                            <Link href={`${proposalPartnerUrl}`}><a className="btn btn-primary btn-block btn-lg p-4">Partnership Application</a></Link>
                        </div>
                        <div className="col-24 col-md-6">
                            <Link href={`${proposalLtdUrl}`}><a className="btn btn-primary btn-block btn-lg p-4">Limited Company Application</a></Link>
                        </div>
                    </div>

                    <p className="mt-5">If you have any questions or require further information, call our friendly team on <a aria-label="Phone number" href={`tel:${GetPhoneNumber(isInternal)}`}><span className="phonenumber_call_now">{GetPhoneNumber(isInternal)}</span></a> and we'll be happy to assist you.</p>

                </div >
            </section >
        </>
    )
}

ProposalBusiness.layout = MainLayout;

const mapStateToProps = (state) => ({
    isInternal: state.isInternal
});

export default connect(mapStateToProps)(ProposalBusiness);