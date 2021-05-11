import React, { useState, useEffect } from 'react';
import { useFormContext } from "react-hook-form";
import { useRouter } from 'next/router';
import MarketingConsent from 'components/marketing-consent';
import PrivacyPolicyConsent from 'components/privacy-policy-consent';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-regular-svg-icons";

import { ApiResponse } from 'types/infrastructure/ApiResponse';
import { PhoneNumberIsValid, EmailAddressIsValid } from 'helpers/validation';
import { setPrivacyAccepted } from 'helpers/cookiesHelper';
import { getGAClientId } from 'helpers/analytics';
import { GarageStorageHelper } from '../_libs/helpers/garageStorageHelper';
import { GarageService } from 'business-logic/garageService';
import { MarketingCommunicationsService } from 'business-logic/marketingCommunicationsService';
import { EnquiryService } from 'business-logic/enquiryService';
import { GetSalesPeople } from 'business-logic/systemService';

type Props = {
    settings: {
        isInternal: boolean;
        isDisabled: boolean;
        getData: any;
        salesPersons: any;
    }
}

const GarageEnquiryForm: React.FC<Props> = ({ settings }) => {
    const router = useRouter();
    const { register, handleSubmit, errors } = useFormContext();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [salesPersons, setSalesPersons] = useState(settings.salesPersons || []);
    const [marketingConsentIsVerifying, setMarketingConsentIsVerifying] = useState<boolean>(false);
    const [emailAddressConsent, setEmailAddressConsent] = useState<string>(null);

    //TODO: get salespersons with settings
    useEffect(() => {
        if (salesPersons.length === 0 && settings.isInternal) {
            GetSalesPeople()
                .then(result => {
                    setSalesPersons(result.data);
                });
        }
    }, []);

    //Fires only when input loses focus and triggers marketing-consent to reinitialize
    const onEmailFocusOut = (event) => {
        if (!settings.isInternal) {
            if (event.target.value && EmailAddressIsValid(event.target.value)) {
                setEmailAddressConsent(event.target.value);
            } else {
                setEmailAddressConsent(null);
            }
        }
    };

    const onSubmit = formData => {
        if (!settings.isDisabled && !isLoading && !marketingConsentIsVerifying) {
            setIsLoading(true);

            const garageData = {
                email: formData.email,
                state: settings.isInternal ? settings.getData(formData.garageManualData, formData.fees) : settings.getData()
            };

            GarageService.SaveGarage(garageData)
                .then((saveResult: ApiResponse) => {
                    if (saveResult.isSucceed && saveResult.data) {
                        let enquiryData = {
                            garageEnquiryType: settings.isInternal ? 2 : 1,

                            fullName: formData.fullName,
                            telephone: formData.telephone,
                            email: formData.email,
                            persistedGarageId: saveResult.data,

                            gaClientId: getGAClientId(),

                            allowedCommunicationTypes: null
                        };

                        if (settings.isInternal) {
                            enquiryData["salesPersonId"] = formData.salesPersonId || null;
                        }
                        else {
                            enquiryData.allowedCommunicationTypes = formData.allowedCommunicationTypes || null;
                        }

                        EnquiryService.SubmitGarageEnquiry(enquiryData)
                            .then((enquiryResult: ApiResponse) => {
                                setIsLoading(false);

                                if (enquiryResult.isSucceed && enquiryResult.data) {
                                    if (!settings.isInternal) {
                                        let expiryDate = new Date();
                                        expiryDate.setFullYear(expiryDate.getFullYear() + 1);

                                        if (enquiryData.allowedCommunicationTypes) {
                                            MarketingCommunicationsService.SetToSeenMarketingForm(enquiryData.email, expiryDate);
                                        }

                                        if (formData.privacyConfirmed) {
                                            setPrivacyAccepted(expiryDate);
                                        }
                                    }

                                    GarageStorageHelper.clear();

                                    if (settings.isInternal) {
                                        router.push("/thankyouinternal");
                                    }
                                    else {
                                        //TODO: what value should be passed here?
                                        router.push("/thankyou?goal=mygarage&i=" + enquiryResult.data);
                                    }
                                }
                                else {
                                    alert("Failed to send enquiry.");
                                }
                            });
                    }
                    else {
                        alert("Failed to save garage.");
                        setIsLoading(false);
                    }
                });
        }
    }

    return (
        <div className="w-100 box bg-white p-0">
            <div className="box__header">Enquire on selected vehicles</div>
            <div className="box__content">
                <div className="row">
                    <div className="col-24 col-md-12 form-group">
                        <label htmlFor="fullName">Full Name *</label>
                        <input type="text" className={`form-control ${errors.fullName ? "is-invalid" : ""}`} id="fullName" name="fullName" aria-describedby="fullName" placeholder="First &amp; Last Name"
                            maxLength={50}
                            ref={register({ required: true })} />
                        {errors.fullName ? (<span className="invalid-feedback d-block">Full Name is required.</span>) : null}
                    </div>
                    <div className="col-24 col-md-12 form-group">
                        <label htmlFor="telephone">Telephone *</label>
                        <input type="tel" className={`form-control ${errors.telephone ? "is-invalid" : ""}`} id="telephone" name="telephone" aria-describedby="telephone" placeholder="Mobile or Home"
                            maxLength={20}
                            ref={register({
                                required: 'Telephone is required.',
                                validate: value => PhoneNumberIsValid(value) === true || 'Please specify a valid UK phone number.'
                            })}
                        />
                        {errors.telephone ? (<span className="invalid-feedback d-block">{errors.telephone?.message}</span>) : null}
                    </div>
                    <div className="col-24 col-md-12 form-group">
                        <label htmlFor="emailEnquiry">Email Address *</label>
                        <input type="email" className={`form-control ${errors.email ? "is-invalid" : ""}`} id="emailEnquiry" name="email" aria-describedby="email" placeholder="E.g. johnsmith@website.co.uk"
                            maxLength={50}
                            onBlur={onEmailFocusOut}
                            ref={register({
                                required: 'Email is required.',
                                validate: value => EmailAddressIsValid(value) === true || 'Email is invalid.'
                            })}
                        />
                        {errors.email ? (<span className="invalid-feedback d-block">{errors.email?.message}</span>) : null}
                    </div>
                    {settings.isInternal ?
                        (
                            <div className="col-24 col-lg-12 form-group">
                                <label>Salesperson</label>
                                <select className="form-control" name="salesPersonId" ref={register}>
                                    <option value="">Please select</option>
                                    {salesPersons.map((item) => (
                                        <option key={item.id} value={item.id}>{item.fullName}</option>
                                    ))}
                                </select>
                            </div>
                        ) : null
                    }
                </div>
                {!settings.isInternal ?
                    (
                        <div className="row">
                            <div className="col-24">
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
                            </div>
                        </div>
                    ) : null
                }
                <div className="row">
                    <div className="col-24 col-md-12 offset-md-12">
                        <button type="button" className="w-100 btn btn-primary btn-lg" disabled={settings.isDisabled} onClick={handleSubmit(onSubmit)}>
                            {isLoading ? (<FontAwesomeIcon width="16" height="16" icon={faSpinner} className="fa-spin" />) : (settings.isInternal ? "Get a Multi-Car Quote" : "Enquire")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GarageEnquiryForm;