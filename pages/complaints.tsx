import React from 'react';
import MainLayout from 'components/layout/main-layout';
import MetaHead from '../components/seo/meta';
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { GetPhoneNumber } from 'helpers/helpers';
import { connect } from 'react-redux';
import { LayoutProps } from 'types/LayoutProps';

type Props = {
    isInternal: boolean;
}
const Complaints:LayoutProps<Props> = ({isInternal}) => {

    return (
        <>
            <MetaHead>
                <title>Complaints Procedure | Leasing Options </title>
                <meta name="description" content="Let us help you resolve your complaint, find details of how Leasing Options can help." />
                <meta name="keywords" content="Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire" />
                <link rel="canonical" href={GetCanonicalUrl(`/complaints`)} />
            </MetaHead>
            <section className="container-fluid py-3 py-md-5 bg-light-grey">
                <div className="container bg-white">
                    <div className="row">
                        <div className="col-24 py-3">
                            <h1>Complaints</h1>
                            <p>At Leasing Options, we pride ourselves on providing a high level of customer service. Our ethos is to treat all customers fairly and to exceed your expectations at every level. On most occasions, your dedicated Account Manager will be able to quickly address any concerns that you may have. However, we recognise that on some occasions, things may not go right and should you feel unhappy with any aspect of our services, we would like to know.</p>
                            <p>We aim to resolve all complaints promptly and impartially. This procedure explains how you can make a complaint to us and what you can do if you remain dissatisfied, following our investigation.</p>
                            <h3>How to make a complaint</h3>
                            <p>You can make a complaint:</p>
                            <ul className="mb-3">
                                <li>by <strong>emailing</strong>&nbsp; <a href="mailto:complaints@leasingoptions.co.uk">complaints@leasingoptions.co.uk</a>;</li>
                                <li>by <strong>calling</strong> <a href={`tel:${GetPhoneNumber(isInternal)}`}>{GetPhoneNumber(isInternal)}</a>; or</li>
                                <li>by <strong>writing</strong> to: Complaints Department, Leasing Options Limited, Options House, Atkin Street, Worsley, Manchester, M28 3DG.</li>
                            </ul>
                            <p>To help us to assess your complaint, please try to provide as much of the following information as possible:</p>
                            <ul className="mb-3">
                                <li>your name and contact details;</li>
                                <li>details of your complaint;</li>
                                <li>an explanation of any steps which you have already taken to try and resolve the complaint;<br />and</li>
                                <li>what you would like us to do, to put things right.</li>
                            </ul>
                            <h3>What happens next?</h3>
                            <p>You should receive an acknowledgement of your complaint within three working days of our receipt and a Final Response within 28 days. If this is not possible, we will keep you informed about our investigation and tell you when you can expect to receive our Final Response.</p>
                            <p>As a business, we aim to resolve all complaints within 21 working days. Should we require more time to investigate your complaint, we can take up to a maximum of eight weeks from the receipt of the complaint, to issue our Final Response. If we are unable to provide you with a Final Response within this timeframe, we will write to you, explaining why we have been unable to do so.</p>
                            <h3>Independent review of your complaint</h3>
                            <p>If you remain dissatisfied after receiving our Final Response, or we have been unable to issue a Final Response within eight weeks, you may have the right to refer your complaint to the Financial Ombudsman Service (“FOS”), free of charge.</p>
                            <p>You can refer your complaint to the FOS:</p>
                            <ul className="mb-3">
                                <li>by <strong>emailing </strong><a href="mailto:complaint.info@financial-ombudsman.org">complaint.info@financial-ombudsman.org</a>;</li>
                                <li>by <strong>telephoning</strong> 0800 023 4567; or</li>
                                <li>by <strong>writing</strong> to: Exchange Tower, London, E14 9SR.</li>
                            </ul>
                            <p><a href="https://www.financial-ombudsman.org.uk/" target="_blank">Visit the FOS website</a></p>
                            <p>Alternatively, you may also be able to refer your complaint to the British Vehicle Rental and Leasing Association (“BVRLA”) Conciliation Service. Further information about the Conciliation Service can be found <a href="http://www.bvrla.co.uk/advice/guidance/using-bvrlas-conciliation-service" target="_blank">here</a>.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

Complaints.layout = MainLayout;

const mapStateToProps = (state) => ({
    isInternal: state.isInternal
});

export default connect(mapStateToProps)(Complaints);