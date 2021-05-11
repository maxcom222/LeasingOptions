import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/main-layout';
import ContactBlocks from '../components/layout/contact-blocks';
import MetaHead from '../components/seo/meta';
import TrustHorizontalContainer from '../components/trustpilot/trust-horizontal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-regular-svg-icons";
import { useForm } from "react-hook-form";
import { EnquiryService } from "business-logic/enquiryService";
import { AuthenticationService } from "business-logic/authenticationService";
import { useRouter } from 'next/router';
import { GetThankYouPageUrl, GetCanonicalUrl } from 'helpers/urlHelper';
import { PhoneNumberIsValid } from 'helpers/validation';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        isInternal: state.isInternal,
        previousRoute: GetCanonicalUrl(state.referrerRoute)
    };
}


function RequestCallback({isInternal, previousRoute}) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, handleSubmit, errors } = useForm();
    const router = useRouter();

    const onSubmit = async (data) => {
        if (!isLoading) {
            setIsLoading(true);

            EnquiryService.SubmitRequestCallback(data.name, data.telephone, previousRoute)
                .then(result => {
                    if (result.data) {
                        router.push(GetThankYouPageUrl(isInternal, "callbackrequest"));
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }

    return (
        <>
            <MetaHead>
                <title>Request a Callback - Talk to one of our friendly Team | Leasing Options</title>
                <meta name="description" content="Our team of experts are here to help you find your perfect vehicle and answer any questions you may have about Leasing." />
                <meta name="keywords" content="Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire" />
                <link rel="canonical" href={GetCanonicalUrl(`/request-callback`)} />
            </MetaHead>
            <section className="container py-3 py-md-5">
                <div className="row">
                    <div className="col-24 text-center">
                        <h1 className="mb-3">Request A Callback</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-24 text-center">
                        <TrustHorizontalContainer />
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
                                        <form className="px-md-5 text-center" onSubmit={handleSubmit(onSubmit)}>
                                            <div className="form-group text-left">
                                                <label htmlFor="name">Name *</label>
                                                <input type="text" className={`form-control ${errors.name ? "is-invalid" : ""}`} id="name" name="name" aria-describedby="name" placeholder="First &amp; Last Name" ref={register({ required: true })} />
                                                {errors.name && <span className="invalid-feedback d-block">This field is required</span>}
                                            </div>
                                            <div className="form-group text-left">
                                                <label htmlFor="telephone">Telephone *</label>
                                                <input type="text" className={`form-control ${errors.telephone ? "is-invalid" : ""}`} id="telephone" name="telephone" placeholder="Mobile or Home"
                                                    ref={register({
                                                        required: 'This field is required',
                                                        validate: value => PhoneNumberIsValid(value) === true || 'Invalid phone number'
                                                    })} />
                                                {errors.telephone && <span className="invalid-feedback d-block">{errors.telephone?.message}</span>}
                                            </div>
                                            <button type="submit" className="btn btn-primary btn-lg mt-3">
                                                {isLoading ? <FontAwesomeIcon width="16" height="16" icon={faSpinner} className="fa-spin" /> : "Submit" }
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ContactBlocks />
                    </div>
                </div>
            </section>
        </>
    )
}

RequestCallback.layout = MainLayout;

export default connect(mapStateToProps)(RequestCallback);