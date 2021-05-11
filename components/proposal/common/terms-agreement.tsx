import React from 'react';
import { useFormContext } from "react-hook-form";
import { GetPhoneNumber } from 'helpers/helpers';
import { connect } from 'react-redux';

const TermsAgreement = ({ isInternal, defaultValue, onAcceptChange }) => {

    const { register, errors } = useFormContext();

    return (
        <div className="w-100 bg-light-grey p-3 mb-3">
            <h3>Use of your Personal Data</h3>
            <p className="mb-5">By submitting and completing this credit application, you confirm that you understand that Leasing Options will use your Personal Data in the ways set out in our <a href="https://www.leasingoptions.co.uk/privacy-policy" target="_blank">Privacy Policy</a>. For the avoidance of doubt, this will involve submitting your details to one or more of our carefully selected funding partners who will conduct searches with Credit Reference Agencies. The lenders will leave a footprint of their searches which may be visible to other organisations if you apply for credit again in the future.</p>
            <h4>Our Privacy Policy</h4>
            <p><i className="h5 text-blue">IMPORTANT: USE OF YOUR PERSONAL DATA. Please read this information carefully before proceeding</i></p>
            <div className="terms-and-conditions">
                <p>We are Leasing Options Limited, a financial services intermediary with company number 02487254 and whose registered office is at Options House, Atkin Street, Worsley, Manchester, M28 3DG (‘we’, ‘us’ or ‘our’). We take the privacy of our customers very seriously. We ask that you read this Privacy Policy (‘the Policy’) carefully as it contains important information about how we will use your personal data.</p>
                <p>For the purposes of the Data Protection Act (‘DPA’), we are the ‘Data Controller’ (i.e. the company who is responsible for, and controls the processing of, your personal data).</p>
                <p>This Policy was last updated June 2018 in line with requirements as set out under the GDPR and the Data Protection Act 2018. The reform sets out more rights for individuals and greater transparency in how personal data is processed by Data Controllers, such as consent, distribution, marketing and deletion. As we are a credit intermediary, we undertake a number of financial tasks that relate to consumer credit and insurance mediation. Our firm’s lawful basis for processing your personal data is done so under a Legitimate Interest - Article 6(1)(f) – “the processing is necessary for your legitimate interests or the legitimate interests of a third party unless there is a good reason to protect the individual’s personal data which overrides those legitimate interests.”</p>
                <p>The Legitimate Interest relates to legal requirements for us to hold your personal data and financial information on record for up to a total of six years from the end date of your credit agreement. This six-year period satisfies the requirement of our regulator, The Financial Conduct Authority. Additionally, there is also a legal requirement to hold accounting information with Her Majesty’s Revenue &amp; Customs (HMR&amp;C). This is in line with other financial industry retention periods. Please also refer to a separate document - “Legitimate Interest Assessment” which can be provided to you by requesting it from us.</p>
                <h4>Personal data We may collect</h4>
                <p>We will obtain personal data about you (including your name, address, date of birth, contact information, interests, payment details, financial information and opinions) and those whose personal data you have with express authority disclosed to us (‘others’) whenever you complete an online form or make a telephone enquiry with us to receive our services. If you submit an online enquiry you will be required to agree to the terms of this Policy which include permitting us to contact you for the purposes of the finance related or insurance enquiries via the contact means of which you provide us with the details of. i.e. email address, telephone number etc.</p>
                <p>For example, we will obtain personal data when you (i.e. contact us for any reason, or purchase services). In certain circumstances, we may hold sensitive personal data if you provide us with such information if you feel that it is relevant for the purpose of your enquiry, but we will not ask for such information. Any sensitive personal data obtained and recorded will only be done so with your explicit consent.</p>
                <h4>How We use personal data</h4>
                <p>We will use the personal data you disclose to us for the purposes described in Our Terms. These purposes include:</p>
                <ul>
                    <li>to assist us in processing your enquiries and obtaining the services which you require;</li>
                    <li>to help us identify you and any accounts that you hold with us;</li>
                    <li>undertaking credit checks;</li>
                    <li>administration;</li>
                    <li>research, statistical analysis and behavioural analysis;</li>
                    <li>customer profiling and analysing your preferences;</li>
                    <li>marketing (providing you have opted-in) [for further information see ‘Marketing and opting-in’ below];</li>
                    <li>fraud prevention and detection;</li>
                    <li>billing and order fulfilment;</li>
                    <li>customising our website and its content to your particular preferences;</li>
                    <li>to notify you of any changes to our website or to our services which may affect you;</li>
                    <li>security vetting; and</li>
                    <li>improving our services.</li>
                </ul>
                <h4>Marketing and opting-in</h4>
                <p>We may share your personal data with organisations as set out in the ‘Disclosure of personal data’ section below. If you have opted-in to receive our marketing material, we will ensure that it is to your requirements and granular. We or they may contact you or others (unless you have asked us or them not to do so) by mail, telephone, text message, email, (each contact method requires its own consent via an opt-in selection) The nature of these marketing communications relate to information on products, services, promotions and special offers which we believe may be of interest to you or others. If you or others would prefer not to receive any further direct marketing communications from us or our business partners, it is possible to opt out at any time. See further ‘Your rights’ below</p>
                <h4>Disclosure of personal data</h4>
                <p>When acting as a credit intermediary for vehicle finance and associated insurance products, there would be a reasonable expectation for us to share your personal data with finance houses and funding partners for the purposes of arranging finance for your new vehicle(s).</p>
                <p>We may disclose personal data which you provide to us to:</p>
                <ul>
                    <li>Our agents and service providers (e.g. providers of web hosting, maintenance services or potential lenders);</li>
                    <li>When using the part-ex valuation area of the website (www.leasingoptions.co.uk), the personal data that you submit which includes your full name, telephone number, post code, email address as well as the make, model and registration of your vehicle and the vehicle mileage will be securely transferred to the Digital Automotive Solutions Limited T/as The Car Buying Group. This transfer is for the purposes of providing you with a purchase price quotation on the vehicle. For further information on how they will use your personal data, please read their Privacy Policy</li>
                    <li>Advise you on insurance products which we are authorised and regulated to do so. These relate to add-on products of your finance agreement with our approved insurance partners; Look After My Car and lookaftermycar.co.uk Trading As Premia Solutions Limited (read their Privacy Policy) and Tobell Automotive Limited (read their Privacy Policy).</li>
                    <li>When using the website (www.leasingoptions.co.uk) online chat facility, the chat message content is relayed to a third-party, The Chat Shop Limited that provide this service on our behalf, 24 hours a day. For the purposes of being transparent, your personal data may be transferred outside of the European Economic Area (EEA) when using this service, however adequate safeguards are in place to ensure its protection. Please also see ‘International Transfers’ below;</li>
                    <li>Law enforcement agencies in connection with any investigation to help prevent unlawful activity;</li>
                    <li>Our business partners in accordance with the ‘Marketing and opting out’ section above, specifically being:
                                <ul>
                            <li>our group companies (as defined in the Companies Act 2006);</li>
                            <li>finance companies with whom we deal for the purposes of providing our services to you;</li>
                            <li>Insurance companies with whom we deal for the purposes of providing our services to you and to verify information provided to us by you; and</li>
                            <li>other third parties with whom we deal with in the course of providing our services to you; and</li>
                        </ul>
                    </li>
                    <li>Any regulators within whose jurisdiction we operate within from time to time.</li>
                </ul>
                <h4>Motorfinity Customers</h4>
                <p>Motorfinity Group Limited (Data Protection Registration No: ZA230768) and Leasing Options Limited (Data Protection Registration No: Z7436776).</p>
                <p>Where you may have made an enquiry through Motorfinity Group Limited via motorfinityleasing.co.uk for vehicle leasing, your personal data will be used within the group and shared with Leasing Options Limited, who act as the preferred partner to Motorfinity Group Limited for vehicle leasing. For further information on how Motorfinity Group Limited use your information, please read their terms, privacy and data protection statement.</p>
                <p>Motorfinity Leasing and motorfinityleasing.co.uk are trading styles of Leasing Options Limited.</p>
                <p>Motorfinity Group Limited and Leasing Options Limited are joint Data Controller’s in regard to the security and processing of your personal data.</p>
                <p>Please be aware that we will not sell or otherwise disclose any personal data provided to us to any other party.</p>
                <h4>Keeping data secure</h4>
                <p>We currently safeguard personal data by storing it on a CRM protected by password and shall ensure that from time to time we use no lesser technical and organisational measures to safeguard personal data which is disclosed to us. Whilst we will use all reasonable efforts to safeguard such personal data, you acknowledge that the use of the internet is not entirely secure and for this reason we cannot guarantee the security or integrity of any personal data which are transferred from you or to you via the internet.</p>
                <h4>Monitoring</h4>
                <p>We may monitor and record communications with you (such as telephone conversations and emails) for the purpose of quality assurance, training, fraud prevention, compliance or charitable purposes.</p>
                <h4>Information about other individuals</h4>
                <p>If you give us information about others, you confirm that the other third party person has appointed you to act on his/her behalf. This is also relevant where others are concerned if you indeed ask another person to act on your behalf as a third party.</p>
                <p>Under the third party authorisation, the other person can:</p>
                <ul>
                    <li>Give consent on his/her behalf to the processing of his or her personal data for the purposes and reasons set out in this Policy; and</li>
                    <li>Receive on his/her behalf any data protection notices.</li>
                </ul>
                <p>Such authorisation will remain in place until this has been revoked, either by verbal or written communication.</p>
                <h4>Use of Google Analytics Advertising</h4>
                <p>We use Google Analytics Advertising Features (‘GAAF’) through our website, which means that certain information about the traffic on our website is collected. In light of using GAAF, We will not facilitate the merging of personally-identifiable information with non-personally identifiable information collected through GAAF unless we receive your express consent to that merger.</p>
                <p>Furthermore, We are hereby notifying You that:</p>
                <ul>
                    <li>The specific GAAF feature(s) which we have implemented are:
                                <ul>
                            <li>Remarketing with Google Analytics</li>
                            <li>Google Display Network Impression Reporting</li>
                            <li>Google Analytics Demographics and Interest Reporting</li>
                        </ul>
                    </li>
                    <li>We use first-party cookies (such as GAAF cookies) or other first-party identifiers, and third-party cookies (such as advertising cookies) or other third-party identifiers together and that this is done in the ways detailed under the sub-heading ‘Use of First &amp; Third Party Cookies and Identifiers’ below; and</li>
                    <li>You can opt-out of the GAAF you use, including through Ads Settings, Ad Settings for mobile apps, or any other available means such as the Google Analytics currently available opt-outs accessible via tools.google.com/dlpage/gaoptout</li>
                </ul>
                <h4>Your rights</h4>
                <p>You have the right to request access to your personal data which we process. This formal request is made under the DPA and is referred to as a Subject Access Request. If you wish to exercise this right and make a Subject Access Request, you should;</p>
                <ul>
                    <li>Put your request in writing; either by Email or by letter.</li>
                    <li>Include proof of your identity and address (e.g. a copy of your driving licence or passport, and a recent utility or credit card bill);</li>
                    <li>Specify the personal data you want access to, including any account or reference numbers where applicable.</li>
                </ul>
                <p>You have the right to require us to correct any inaccuracies in your data free of charge. If you wish to exercise this right, you should:</p>
                <ul>
                    <li>Either speak to us via telephone or put your request in writing;</li>
                    <li>Provide us with enough information to identify you (e.g. account/order number, username, registration details); and</li>
                    <li>Specify the information that is incorrect and what it should be replaced with.</li>
                </ul>
                <p>You also have the right to ask us to stop processing your personal data for direct marketing purposes. If you wish to exercise this right you should:</p>
                <ul>
                    <li>put your request in writing (an email sent to compliance@leasingoptions.co.uk with a header that says ‘unsubscribe’ is acceptable);</li>
                    <li>provide us with enough information to identify you (e.g. account/order number, username, registration details);</li>
                    <li>if your objection is not to direct marketing in general, but to direct marketing by a particular channel (e.g. email or telephone) please specify the channel you are objecting to.</li>
                </ul>
                <h4>Data Retention</h4>
                <p>The retention period for your personal data will be up to a total of six years from the end data of the credit agreement. If you do not proceed with an enquiry for finance, or, you do not obtain a finance agreement under which we have arranged for you with our panel of lenders, your personal data is likely to be subject to a shorter retention period and in line with Article 5(1)(c) of the GDPR – “adequate, relevant and limited to what is necessary in relation to the purposes for which they are processed (‘data minimisation’)”.</p>
                <h4>International Transfers</h4>
                <p>In the normal course of business there may be a need for Leasing Options Limited or any other firm associated to the business, usually when processing an application for credit, personal data would have to be transferred outside of the European Economic Area (EEA) where those countries do not typically have the same protections and safeguards in place for the protection of personal data to those countries within the EEA.</p>
                <p>Leasing Options deal with a number of large, international corporations where data is likely to be transferred in this way. Assurances and processes will always be put in place and considered before any international transfer to a non-EEA country is undertaken to ensure the protection and security of the personal data.</p>
                <h4>Our contact details</h4>
                <p>We welcome your feedback and questions. If You wish to contact us, please send an email to marketing@leasingoptions.co.uk or you can write to us at Options House, Atkin Street, Worsley, Manchester, M28 3DG or call us on {GetPhoneNumber(isInternal)}. We may change this Policy from time to time. You should check this policy occasionally to ensure you are aware of the most recent version which will apply each time you deal with us.</p>
            </div>
            <div className="w-100 text-right form-check pt-3 pl-0 pr-3 mb-3">
                <label className="form-check-label" htmlFor="privacy">I confirm that I have read and understand this Privacy Policy</label>
                <input className={`form-check-input mr-0 ml-2 ${errors.privacy ? "is-invalid" : ""}`} type="checkbox" value="" id="privacy" name="privacy"
                    ref={register({ required: true })}
                    defaultChecked={defaultValue}
                    onChange={(evt) => onAcceptChange(evt)}></input>
                {errors.privacy && <span className="invalid-feedback d-block">Please confirm that you have read and understood the Privacy Policy</span>}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isInternal: state.isInternal
});

export default connect(mapStateToProps)(TermsAgreement);