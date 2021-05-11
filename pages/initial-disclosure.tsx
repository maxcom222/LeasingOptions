import React from 'react';
import Link from 'next/link';
import MainLayout from 'components/layout/main-layout';
import MetaHead from '../components/seo/meta';
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { GetPhoneNumber } from 'helpers/helpers';
import { connect } from 'react-redux';
import { LayoutProps } from 'types/LayoutProps';

type Props = {
    isInternal: boolean;
}
const InitialDisclosure:LayoutProps<Props> = ({isInternal}) => {
    return (
        <>
            <MetaHead>
                <title>Initial Disclosure Document | Leasing Options</title>
                <meta name="description" content="Read the Leasing Options Limited Initial Disclosure Policy Document." />
                <meta name="keywords" content="Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire" />
                <link rel="canonical" href={GetCanonicalUrl(`/initial-disclosure`)} />
            </MetaHead>
            <section className="container-fluid py-3 py-md-5 bg-light-grey">
                <div className="container bg-white">
                    <div className="row">
                        <div className="col-24 py-3">
                            <h1 className="h2">Initial Disclosure Document</h1>
                            <p>We are required by the Financial Conduct Authority (FCA), who regulates the financial
services industry, of which we are a part, to provide you with an Initial Disclosure Document
(IDD) to enable you to decide, whether or not the products and services we offer are suitable
for your needs. In addition we are required to advise you on how to make a complaint should
you need to do so.</p>
                            <h2 className="text-mint h3">Affordability</h2>
                            <p>You should assess the monthly payments you are required to make throughout the
agreement and ensure you are able to meet these obligations and other obligations you
already have without suffering undue hardship. If you are aware of any future events that will
affect your ability to meet these payments, you should ensure the provider is informed
immediately.</p>
<p>Your credit rating could be adversely affected if you do not make payments when due which
could make it harder or more expensive for you to access finance facilities in the future.</p>

                            <h2 className="text-mint h3">Who are we?</h2>
                            <p>We are a credit broker for vehicle finance and insurance related products whose registered office is Leasing Options Limited, Options House, Atkin Street, Worsley, Manchester, M28 3DG. We are an independent vehicle finance broker, not a lender, authorised and regulated by the Financial Conduct Authority. Our Financial Conduct Authority Firm Reference Number is 660061, which can be verified by contacting the FCA on
                            0800 111 6768 or by viewing the Financial Services Register at <a href="https://register.fca.org.uk" target="_blank" className="text-mint">register.fca.org.uk</a></p>
                            <h2 className="text-mint h3">What do we Offer?</h2>
                            <p>We offer a range of vehicle leasing facilities through a panel of carefully selected third-party
lenders from whom we may receive an introductory fee or commission. We will not offer
facilities from lenders outside of this panel. Different lenders may pay us different amounts,
depending on the volume of business that we submit to them and the terms of the financial
agreement that you choose to enter into.</p><p>
In addition, we may offer Finance GAP Insurance, Return to Invoice GAP Insurance, Early
Termination Insurance (ETI), Tyre & Alloy Insurance and SMART Repair Insurance via two
separate providers, Spectrum Insurance Services Limited and Premia Solutions Limited.</p>
                            <h2 className="text-mint h3">What Services will we provide you with?</h2>
                            <p>We will provide you with either comparable details of firms most appropriate to your lending
requirements or general information relating to finance products. In assessing your
requirements we may seek information about your personal circumstances and objectives to
enable us to identify your needs. It is important that you provide us with accurate and
relevant information enabling us to hone down the selection of firms offered, from which you
can more easily make your choice.</p>
                            <h2 className="text-mint h3">What do we charge for our Services?</h2>
                            <p>We charge a Processing Fee of £165.83 + VAT (£199.00) which is only payable at order
stage, once acceptable finance has been obtained, as a contribution to the costs incurred in
processing the vehicle finance agreement. We do not charge fees for processing insurance
products. Payment of the Processing Fee can be made on-line using a credit or debit card or
by BACs transfer.</p>
                            <h2 className="text-mint h3">Confidentiality and Data Protection</h2>
                            <p>Throughout the process of obtaining finance for you and/or your partner vehicle agreement
we will need to collect personal information from you and/or your partner and pass this
information onto one or more third party lenders to enable them to make a credit decision.
We will not disclose you and/or your partner’s personal information outside of this group of
lenders. Those lenders whom sought you and/or your partner’s information in order to
conduct an affordability and credit worthiness assessment will do through the Consent given
by you and/or your partner. </p><p>
In cases where you and/or your partner’s initial application may be refused by the most
suited lender, further searches may be carried out with other lenders on our panel in order to
find a lender that is willing to accept you and/or your partner’s application for finance. Those
lenders, including Leasing Options Limited will not use you and/or your partner’s personal
information in order to provide you and/or your partner with promotional or marketing
material or offers, unless you and/or your partner have specifically consented by Opting-In.
The lenders will obtain individual consent from you and/or your partner in order to market to
you and/or your partner and provide you and/or your partner with offers. We are able to
supply a comprehensive list of lenders by request.</p>
                            <h2 className="text-mint h3">Other Finance Facilities</h2>
                            <p>You may be able to obtain finance for your purchase from other lenders and you are
encouraged to seek alternative quotations and details of their products by researching on the
high street, in the media and online.</p>
                            <h2 className="text-mint h3">What to do if you have a complaint?</h2>
                            <p>Our aim is to provide a first class service and we are committed to treating our customers fairly, however if you wish to register a complaint please contact us:</p>
                            <p>By Phone: <a href={`tel:${GetPhoneNumber(isInternal)}`} className="text-mint">{GetPhoneNumber(isInternal)}</a></p>
                            <p>By Email: <a href="mailto:complaints@leasingoptions.co.uk" className="text-mint">complaints@leasingoptions.co.uk</a></p>
                            <p>In Writing: FAO: Compliance Manager, Leasing Options Limited, Options House, Atkin St, Worsley, Manchester M28 3DG</p>
                            <p>Our Complaints Procedure is available to view on our website at <Link href="/complaints" passHref><a className="text-mint">www.leasingoptions.co.uk/complaints</a></Link> 
                            If you are not satisfied with a decision taken in
respect of a complaint or appeal, you may contact the BVRLA (our industry trade
association) who will act as an independent arbiter, at www.bvrla.co.uk. You may also have
the right to refer a complaint to the Financial Ombudsman Service.</p>
                        </div>
                    </div>
                
                
                
                    <div className="row">

                    </div>
                </div>
            </section>
        </>
    )
}

InitialDisclosure.layout = MainLayout;

const mapStateToProps = (state) => ({
    isInternal: state.isInternal
});

export default connect(mapStateToProps)(InitialDisclosure);