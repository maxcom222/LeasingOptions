import React, { useState, useEffect } from 'react';
import { useForm, FormContext } from "react-hook-form";
import { useRouter } from 'next/router';
import ContactBlocks from 'components/layout/contact-blocks';
import MarketingConsent from 'components/marketing-consent';
import PrivacyPolicyConsent from 'components/privacy-policy-consent';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-regular-svg-icons";

import { PhoneNumberIsValid, EmailAddressIsValid } from 'helpers/validation';
import { GetThankYouPageUrl } from 'helpers/urlHelper';
import { getQueryParams } from 'helpers/urlsHelper';
import { setPrivacyAccepted } from 'helpers/cookiesHelper';
import { EnquiryService } from "business-logic/enquiryService";
import { MarketingCommunicationsService } from 'business-logic/marketingCommunicationsService';

type Props = {
    isInternal: boolean;
    previousRoute: string;
}

const ContactPage: React.FC<Props> = ({ isInternal, previousRoute }) => {
    const router = useRouter();
    const methods = useForm();
    const { register, handleSubmit, errors, setValue } = methods;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [marketingConsentIsVerifying, setMarketingConsentIsVerifying] = useState<boolean>(false);
    const [emailAddressConsent, setEmailAddressConsent] = useState<string>(null);

    useEffect(() => {
        const pathParts = router.asPath.split('?');

        if (pathParts[1]) {
            const queryParams = getQueryParams(pathParts[1].split('&'));

            const type: string = queryParams["type"] || null;
            const source: string = queryParams["source"] || null;

            if (type && source && type.toLowerCase() === "bik") {
                setValue("message", `Please send me the BIK details for the following vehicle - ${source}`);
            }
        }
    }, []);

    //Fires only when input loses focus and triggers marketing-consent to reinitialize
    const handleEmailFocusOut = (event) => {
        if (!isInternal) {
            if (event.target.value && EmailAddressIsValid(event.target.value)) {
                setEmailAddressConsent(event.target.value);
            } else {
                setEmailAddressConsent(null);
            }
        }
    };

    const onSubmit = data => {
        if (!isLoading && !marketingConsentIsVerifying) {
            setIsLoading(true);

            let communicationTypes: number[] = null;

            //Should check if form was visible or user did any updates to those fields
            //If no form is displayed data.contactEmail and other checkbox properties are "undefined"
            if (!isInternal && data.contactEmail != undefined && data.allowedCommunicationTypes) {
                communicationTypes = data.allowedCommunicationTypes;
            }

            var promise = new Promise(resolve => {
                EnquiryService.SubmitContactEnquiry(data.email, data.fullName, data.telephone, data.companyName, data.leaseType, data.message, communicationTypes, previousRoute)
                    .then(result => {
                        //TODO; check is required
                        if (result.data) {
                            if (!isInternal) {
                                let expiryDate = new Date();
                                expiryDate.setFullYear(expiryDate.getFullYear() + 1);

                                if (data.privacyConfirmed) {
                                    setPrivacyAccepted(expiryDate);
                                }

                                if (communicationTypes) {
                                    MarketingCommunicationsService.SetToSeenMarketingForm(data.email, expiryDate);
                                }
                            }

                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    })
            });

            promise.then(result => {
                if (result) {
                    router.push(GetThankYouPageUrl(isInternal, "contactus"));
                }
            }).catch(function (error) {
                console.log(error);
            }).finally(() => {
                setIsLoading(false);
            });
        }
    }

    return (
        <>
            <section className="container py-3 py-md-5">
                <div className="row">
                    <div className="col-24 text-center">
                        <h1>Contact Us</h1>
                        <h4 className="text-blue">Have a question or simply want to know more? We’d love to hear from you!</h4>
                    </div>
                </div>
            </section>
            <section className="container-fluid py-3 py-md-5 bg-light-grey">
                <div className="row">
                    <div className="container">
                        <div className="row">
                            <div className="col-24">
                                <div className="w-100 box bg-white p-0 mb-3 mb-md-4">
                                    <div className="box__header">Your Contact Details <small>Fields marked * are required</small></div>
                                    <div className="box__content p-md-5">
                                        <FormContext {...methods}>
                                            <form className="px-md-5" onSubmit={handleSubmit(onSubmit)}>
                                                <div className="row">
                                                    <div className="col-24 col-md-16">
                                                        <div className="form-group">
                                                            <label htmlFor="fullName">Full Name *</label>
                                                            <input type="text" className={`form-control ${errors.fullName ? "is-invalid" : ""}`} id="fullName" name="fullName" aria-describedby="fullName" placeholder="First &amp; Last Name" ref={register({ required: true })} />
                                                            {errors.fullName && <span className="invalid-feedback d-block">This field is required</span>}
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="companyName">Company Name</label>
                                                            <input type="text" className="form-control" id="companyName" name="companyName" aria-describedby="companyName" placeholder="Company Name" ref={register()} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="telephone">Telephone *</label>
                                                            <input type="text" className={`form-control ${errors.telephone ? "is-invalid" : ""}`} id="telephone" name="telephone" placeholder="Mobile or Home"
                                                                ref={register({
                                                                    required: 'This field is required',
                                                                    validate: value => PhoneNumberIsValid(value) === true || 'Invalid phone number'
                                                                })} />
                                                            {errors.telephone && <span className="invalid-feedback d-block">{errors.telephone?.message}</span>}
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="email">Email *</label>
                                                            <input type="email" className={`form-control ${errors.email ? "is-invalid" : ""}`} id="email" name="email" placeholder="E.g. johnsmith@website.co.uk"
                                                                onBlur={handleEmailFocusOut}
                                                                ref={register({
                                                                    required: 'This field is required',
                                                                    validate: value => EmailAddressIsValid(value) === true || 'Invalid email address'
                                                                })} />
                                                            {errors.email && <span className="invalid-feedback d-block">{errors.email?.message}</span>}
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="message">Your Message</label>
                                                            <textarea className="form-control" id="message" name="message" placeholder="Your message to us" ref={register()}></textarea>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="leaseType">Lease Type *</label>
                                                            <select className={`form-control ${errors.leaseType ? "is-invalid" : ""}`} id="leaseType" name="leaseType" ref={register({ required: true })}>
                                                                <option value="">Please Select</option>
                                                                <option value="2">Personal Lease</option>
                                                                <option value="1">Business Lease</option>
                                                                <option value="3">Van Lease</option>
                                                            </select>
                                                            {errors.leaseType && <span className="invalid-feedback d-block">This field is required</span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-24 d-none col-md-8 d-md-block">
                                                        <h4 className="mb-3 mb-md-5">Where to find us</h4>
                                                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/office-1.jpg`} className="lazyload img-fluid" alt="Office photo" />
                                                        <a href="https://goo.gl/maps/RhF8FrSw9iT2" target="_blank"><img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/office-2.jpg`} className="lazyload img-fluid" alt="Click to see our location on Google Maps" /></a>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-24">
                                                        {!isInternal ?
                                                            (
                                                                <>
                                                                    <MarketingConsent
                                                                        emailAddress={emailAddressConsent}
                                                                        settings={{
                                                                            onVerificationStart: () => {
                                                                                setMarketingConsentIsVerifying(true);
                                                                            },
                                                                            onVerificationComplete: () => {
                                                                                setMarketingConsentIsVerifying(false);
                                                                            }
                                                                        }}
                                                                    />
                                                                    <PrivacyPolicyConsent />
                                                                </>
                                                            ) : null
                                                        }
                                                        <button type="submit" className="btn btn-primary mt-3">
                                                            {isLoading ? <FontAwesomeIcon width="16" height="16" icon={faSpinner} className="fa-spin" /> : "Submit"}
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </FormContext>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container-fluid py-3 py-md-5 bg-white">
                <div className="row">
                    <div className="container">
                        <ContactBlocks />
                    </div>
                </div>
            </section>
            <section className="container-fluid py-3 py-md-5 bg-light-grey">
                <div className="row">
                    <div className="container">
                        <div className="row">
                            <div className="col-24 col-md-8 mb-3 mb-md-0">
                                <h4 className="mb-3 mb-md-5">About Leasing Options</h4>
                                <p>Here at Leasing Options, we have a unique team of leasing experts who can assist you with finding your perfect car for personal leasing or finding a solution for fleet leasing.</p>
                                <p>Our experts are here to help you feel comfortable and understand the benefits from leasing.</p>
                            </div>
                            <div className="col-24 col-md-8 mb-3 mb-md-0">
                                <h4 className="mb-3 mb-md-5">Registered Office Address</h4>
                                <p>Leasing Options Limited.<br />Options House, Atkin Street, Worsley<br />Manchester<br />England<br />M28 3DG</p>
                                <p>Leasing Options Limited is registered in England and Wales under company registration number <strong>02487254</strong></p>
                            </div>
                            <div className="col-24 col-md-8">
                                <h4 className="mb-3 mb-md-5">Company Registration Details</h4>
                                <p className="w-100 d-flex justify-content-between align-items-center">VAT Registration Number: <strong>519 4636 28</strong></p>
                                <p className="w-100 d-flex justify-content-between align-items-center">Data Protection Number: <strong>Z7436776</strong></p>
                                <p className="w-100 d-flex justify-content-between align-items-center">FCA Firm Reference Number: <strong>660061</strong></p>
                                <p>Leasing Options Limited is authorised and regulated by the Financial Conduct Authority. Leasing Options Limited is a credit broker, not a lender.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ContactPage;