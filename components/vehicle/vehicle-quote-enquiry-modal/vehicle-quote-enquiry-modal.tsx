import React, { useState, useEffect } from 'react';
import { useForm, FormContext } from "react-hook-form";
import { useRouter } from 'next/router';
import Modal from 'react-bootstrap/Modal';
import MarketingConsent from 'components/marketing-consent';
import PrivacyPolicyConsent from 'components/privacy-policy-consent';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-regular-svg-icons";

import { ApiResponse } from 'types/infrastructure/ApiResponse';
import { LeasingDealTypes } from "enums/LeasingDealTypes";
import { formatMoney } from 'helpers/currencyHelper';
import { PhoneNumberIsValid, EmailAddressIsValid } from 'helpers/validation';
import { getGAClientId, logLabelEvent } from 'helpers/analytics';
import { setPrivacyAccepted } from 'helpers/cookiesHelper';
import { GetThankYouPageUrl } from 'helpers/urlHelper';
import { MarketingCommunicationsService } from 'business-logic/marketingCommunicationsService';
import { EnquiryService } from "business-logic/enquiryService";
import { QuotesService } from 'business-logic/quotesService';
import { GetSalesPeople } from 'business-logic/systemService';

type Props = {
    title: string;
    onRequestClose: any;

    baseData: any;//TODO: add some type class?

    settings: {
        isInternal: boolean;
        showPriceWarning?: boolean;
        leasingMessage?: string;
        proceededToApplyForFinanceDirectly: boolean;
        salesPersons: any;
    };
}

const VehicleQuoteEnquiryModal: React.FC<Props> = ({ title, baseData, settings, onRequestClose, ...otherProps }) => {
    const router = useRouter();
    const methods = useForm();
    const { register, handleSubmit, errors } = methods;

    const procFee = parseFloat(process.env.NEXT_PUBLIC_PCH_PROC_FEE);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [marketingConsentIsVerifying, setMarketingConsentIsVerifying] = useState<boolean>(false);
    const [emailAddressConsent, setEmailAddressConsent] = useState<string>(null);
    const [salesPersons, setSalesPersons] = useState(settings.salesPersons || []);
    const [salesPersonVerificationRequired, setSalesPersonVerificationRequired] = useState<boolean>(false);
    const [ownerConfirmRequired, setOwnerConfirmRequired] = useState<boolean>(false);
    const [owners, setOwners] = useState([]);
    const [owner, setOwner] = useState(null);

    const [step, setStep] = useState<number>(1);
    const [formState, setFormState] = useState({
        fullName: null,
        telephone: null,
        email: null,
        companyName: null,
        ownerId: null,
        allowedCommunicationTypes: null,
        informationNoticeConfirmed: false
    });

    //TODO: get salespersons with settings
    useEffect(() => {
        if (salesPersons.length === 0 && settings.isInternal) {
            GetSalesPeople()
                .then(result => {
                    setSalesPersons(result.data);
                });
        }
    }, []);

    const getTitle = (step) => {
        let result = title;

        if (step === 2) {
            result = "Information Notice";
        }

        return result;
    }

    //Fires only when input loses focus and triggers marketing-consent to reinitialize
    const handleEmailFocusOut = (event) => {
        if (!settings.isInternal) {
            if (event.target.value && EmailAddressIsValid(event.target.value)) {
                setEmailAddressConsent(event.target.value);
            } else {
                setEmailAddressConsent(null);
            }
        }

        setSalesPersonVerificationFlag();
    };

    const handleTelephoneFocusOut = (event) => {
        setSalesPersonVerificationFlag();
    };

    const handleSalesPersonChange = (event) => {
        setSalesPersonVerificationFlag();
    };

    const setSalesPersonVerificationFlag = () => {
        if (settings.isInternal) {
            setSalesPersonVerificationRequired(true);
            setOwnerConfirmRequired(false);
            setOwners([]);
            setOwner(null);
        }
    }

    const verifySalesPerson = (salesPersonId: string, email: string, telephone: string) => {
        return new Promise(resolve => {
            if (salesPersonVerificationRequired) {
                setOwnerConfirmRequired(false);
                setOwner(null);
            }

            if (salesPersonVerificationRequired && salesPersonId) {
                QuotesService.VerifySalesPerson(salesPersonId, email, telephone)
                    .then((result: ApiResponse) => {
                        let stopExecutionFlag = false;
                        setSalesPersonVerificationRequired(false);

                        if (result.isSucceed && result.data.isRequired && result.data.salesPersons) {
                            setOwnerConfirmRequired(true);

                            const ownersList = result.data.salesPersons;

                            var existingOwner = ownersList.find((item) => { return item.isExisting; });
                            if (existingOwner) {
                                setOwner({ id: existingOwner.id, name: existingOwner.text });
                            }

                            setOwners(ownersList);
                            stopExecutionFlag = true;
                        }
                        else {
                            setOwner({ id: salesPersonId, name: null });
                        }

                        resolve(stopExecutionFlag);
                    });
            }
            else {
                setSalesPersonVerificationRequired(false);
                resolve(false);
            }
        });
    }

    const onSubmit = data => {
        if (!isLoading && !marketingConsentIsVerifying) {
            if (step === 1) {
                setIsLoading(true);

                const email = data.email;
                const telephone = data.telephone;
                const salesPersonId = data.salesPersonId;

                verifySalesPerson(salesPersonId, email, telephone)
                    .then((verifySalesPersonStopExecutionFlag: boolean) => {
                        if (verifySalesPersonStopExecutionFlag) {
                            setIsLoading(false);
                        }
                        else {
                            let formData = {
                                fullName: data.fullName,
                                telephone: data.telephone,
                                email: data.email,
                                companyName: data.companyName,
                                ownerId: (data.ownerId || data.salesPersonId) || null,
                                allowedCommunicationTypes: data.allowedCommunicationTypes
                            };

                            if (settings.proceededToApplyForFinanceDirectly) {
                                QuotesService.CheckInformationNoticAcceptance(email, telephone).then((result: boolean) => {
                                    if (result) {
                                        setFormState((prevState) => {
                                            return { ...prevState, ...formData };
                                        });

                                        setIsLoading(false);
                                        setStep(2);
                                    }
                                    else {
                                        doSubmit(formData);
                                    }
                                });
                            }
                            else {
                                doSubmit(formData);
                            }
                        }
                    });
            }
            else if (step === 2) {
                let formData = { ...formState };
                formData.informationNoticeConfirmed = data.informationNoticeConfirmed;

                doSubmit(formData);
            }
        }
    }

    const doSubmit = (formData) => {
        if (formData && baseData) {
            setIsLoading(true);

            let enquiryData = {
                ...baseData,

                quoteEnquiryType: settings.proceededToApplyForFinanceDirectly ? 2 : 1,
                isIDDAccepted: settings.proceededToApplyForFinanceDirectly && formData.informationNoticeConfirmed,

                fullName: formData.fullName,
                telephone: formData.telephone,
                email: formData.email,
                companyName: baseData.leasingDealType !== 2 ? formData.companyName : null,

                gaClientId: getGAClientId()
            };

            if (settings.isInternal) {
                enquiryData.salesPersonId = formData.ownerId;
            }
            else {
                enquiryData.allowedCommunicationTypes = formData.allowedCommunicationTypes || null;
            }

            EnquiryService.SubmitQuoteEnquiry(enquiryData)
                .then((result: ApiResponse) => {
                    setIsLoading(false);

                    if (result.isSucceed && result.data) {
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

                        if (settings.proceededToApplyForFinanceDirectly) {
                            switch (enquiryData.leasingDealType.toString()) {
                                case "1":
                                case "3":
                                var url = "/proposal_business?directfinance=1&fromconfirmquote=1&enquiryid=" + result.data + "&email=" + encodeURI(enquiryData.email);
                                    if(window.location.href.includes("car-leasing-with-insurance")){
                                        url+= "&fromInsuredLeasing=1"
                                    }
                                    router.push(url); 
                                    break;

                                case "2":
                                    var url = "/proposal_personal?directfinance=1&fromconfirmquote=1&enquiryid=" + result.data + "&email=" + encodeURI(enquiryData.email);
                                   
                                    if(window.location.href.includes("car-leasing-with-insurance")){
                                        url+= "&fromInsuredLeasing=1"
                                    }

                                    router.push(url)
                                    break;
                            }
                        }
                        else {
                            if (settings.isInternal) {
                                router.push(GetThankYouPageUrl(true));
                            }
                            else {
                                router.push(GetThankYouPageUrl(false, "quoteconfirm"));
                            }
                        }

                        onRequestClose();
                    }
                });
        }
    }

    return (
        <Modal onHide={onRequestClose} centered={true} scrollable={false} {...otherProps}>
            <Modal.Header className="d-flex flex-nowrap justify-content-center align-items-center" closeButton>
                <Modal.Title className="mb-0">{getTitle(step)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormContext {...methods}>
                    <div className="row">
                        <div className="col-24">
                            <p>A member of our team will contact you shortly after your submission.</p>
                        </div>
                    </div>
                    {step === 1 ?
                        (<>
                            <div className="row">
                                {settings.leasingMessage ? (<div className="col-24"><p>I’m interested in leasing of <strong>{settings.leasingMessage}</strong></p></div>) : null}
                                <div className="col-24 col-lg-12 form-group">
                                    <label>Full Name <span>(Required)</span></label>
                                    <input type="text" className={`form-control ${errors.fullName ? "is-invalid" : ""}`} placeholder="First &amp; Last Name" maxLength={50} name="fullName"
                                        disabled={ownerConfirmRequired}
                                        ref={register({ required: true })}
                                    />
                                    {errors.fullName ? (<span className="invalid-feedback d-block">Full Name is required.</span>) : null}
                                </div>
                                {baseData.leasingDealType !== LeasingDealTypes.Personal ?
                                    (< div className="col-24 col-lg-12 form-group">
                                        <label>Company Name</label>
                                        <input type="text" className="form-control" placeholder="Company Name" maxLength={50} name="companyName"
                                            disabled={ownerConfirmRequired}
                                            ref={register()}
                                        />
                                    </div>) : null}
                                <div className="col-24 col-lg-12 form-group">
                                    <label>Telephone <span>(Required)</span></label>
                                    <input type="tel" className={`form-control ${errors.telephone ? "is-invalid" : ""}`} placeholder="Mobile or Home" maxLength={20} name="telephone"
                                        onBlur={handleTelephoneFocusOut}
                                        disabled={ownerConfirmRequired}
                                        ref={register({
                                            required: 'Telephone is required.',
                                            validate: value => PhoneNumberIsValid(value) === true || 'Please specify a valid UK phone number.'
                                        })}
                                    />
                                    {errors.telephone ? (<span className="invalid-feedback d-block">{errors.telephone?.message}</span>) : null}
                                </div>
                                <div className="col-24 col-lg-12 form-group">
                                    <label>Email <span>(Required)</span></label>
                                    <input type="email" className={`form-control ${errors.email ? "is-invalid" : ""}`} placeholder="E.g. johnsmith@website.co.uk" maxLength={50} name="email"
                                        onBlur={handleEmailFocusOut}
                                        disabled={ownerConfirmRequired}
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
                                            <select className="form-control" name="salesPersonId" onChange={handleSalesPersonChange} disabled={ownerConfirmRequired} ref={register}>
                                                <option value="">Please select</option>
                                                {salesPersons.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.fullName}</option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : null
                                }
                            </div>
                            {(settings.isInternal && ownerConfirmRequired) ?
                                (
                                    <div className="row">
                                        <div className="col-24">
                                            {(owner && owner.name) ?
                                                (
                                                    <>Account with these details already exists for Owner: {owner.name}</>
                                                ) : null
                                            }
                                            {owners.map((item, idx) => (
                                                <div key={item.id}>
                                                    <input type="radio" className="d-inline mr-1" name="ownerId" id={`salesPerson_${idx}`} value={item.id} defaultChecked={owner.id === item.id}
                                                        ref={register({
                                                            required: 'Owner is required.',
                                                        })}
                                                    />
                                                    <label className="d-inline" htmlFor={`salesPerson_${idx}`}>{item.text}</label>
                                                </div>
                                            ))}
                                            {errors.ownerId ? (<span className="invalid-feedback d-block">{errors.ownerId?.message}</span>) : null}
                                        </div>
                                    </div>
                                ) : null
                            }
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
                        </>) : null}

                    { /*TODO: unifications with privacy-policy-consent component styles required */}
                    {step === 2 ?
                        (<div className="row">
                            <div className="col-24">
                                <ul className="mb-3">
                                    <li>We are <strong>Leasing Options Limited</strong>, a credit intermediary for vehicle finance and insurance related products. Our registered office is <strong>Options House, Atkin Street, Worsley, Manchester, M28 3DG</strong></li>
                                    <li>We are authorised and regulated by the Financial Conduct Authority. Registered no: <strong>660061</strong>.</li>
                                    <li>We are a credit broker of vehicle finance, we are not a funder or a lender.</li>
                                    <li>We charge a Processing Fee of {formatMoney(procFee)} including VAT which is only payable at order stage, once acceptable finance has been obtained, as a contribution to the costs incurred in processing the vehicle finance agreement. We do not charge fees for processing insurance products. Payment of the Processing Fee can be made on-line using a credit or debit card or by BACs transfer.</li>
                                </ul>
                                <div className="form-group">
                                    <div className="form-check form-check-inline privacy-agreement">
                                        <input type="checkbox" className="form-check-input" id="infoConfirmed" name="informationNoticeConfirmed" ref={register({
                                            validate: (value) => value === true || "Information Notice confirmation required."
                                        })} />
                                        <label htmlFor="infoConfirmed" className={errors.informationNoticeConfirmed ? "invalid-feedback" : null}>
                                            Please respond to this 'Information Notice' confirming that you understand and acknowledge the above and that you are happy to proceed. Any delays in receiving confirmation may impact on the rates quoted.
                                        </label>
                                    </div>
                                    {errors.informationNoticeConfirmed && <span className="invalid-feedback d-block">{errors.informationNoticeConfirmed?.message}</span>}
                                </div>
                            </div>
                        </div>) : null}
                    {settings.showPriceWarning ?
                        (
                            <div className="row">
                                <div className="col-24">
                                    <div className="alert alert-warning" role="alert"><strong>IMPORTANT:</strong> This is an indicative price, please speak to your account manager for the exact rental.</div>
                                </div>
                            </div>
                        ) : null
                    }
                </FormContext>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit(onSubmit)}>
                    {isLoading ? (<FontAwesomeIcon width="16" height="16" icon={faSpinner} className="fa-spin" />) : "Submit"}
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default VehicleQuoteEnquiryModal;