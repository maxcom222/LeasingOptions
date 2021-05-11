import React, { useState } from 'react';
import { useForm, FormContext } from "react-hook-form";
import { useRouter } from 'next/router';
import Modal from 'react-bootstrap/Modal';
import MarketingConsent from 'components/marketing-consent';
import PrivacyPolicyConsent from 'components/privacy-policy-consent';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-regular-svg-icons";
import style from './price-promise.module.scss';

import { setPrivacyAccepted } from 'helpers/cookiesHelper';
import { PhoneNumberIsValid, EmailAddressIsValid } from 'helpers/validation';
import { GetThankYouPageUrl } from 'helpers/urlHelper';
import { EnquiryService } from "business-logic/enquiryService";
import { MarketingCommunicationsService } from 'business-logic/marketingCommunicationsService';
import { FilesAPI } from 'API/FilesAPI';

type Props = {
    isInternal: boolean;
    onRequestClose: any
}

const ModalPricePromise: React.FC<Props> = ({ isInternal, onRequestClose, ...otherProps }) => {
    const router = useRouter();
    const methods = useForm();
    const { register, handleSubmit, errors } = methods;

    const bucket: string = "leasingoptions";
    const filesKeyPrefix: string = "website/temp/price-promise";

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [marketingConsentIsVerifying, setMarketingConsentIsVerifying] = useState<boolean>(false);
    const [emailAddressConsent, setEmailAddressConsent] = useState<string>(null);
    const [selectedFilename, setSelectedFilename] = useState<string>(null);
    const [fileId, setFileId] = useState<string>(null);

    //Fires only when input loses focus and triggers marketing-consent to reinitialize
    const onEmailFocusOut = (event) => {
        if (!isInternal) {
            if (event.target.value && EmailAddressIsValid(event.target.value)) {
                setEmailAddressConsent(event.target.value);
            } else {
                setEmailAddressConsent(null);
            }
        }
    };

    const onFileChange = event => {

        const uploadedFile = event.target.files[0];

        // Update the state 
        setSelectedFilename(event.target.files[0].name);

        // Create an object of formData 
        const formData = new FormData();

        // Update the formData object 
        formData.append(
            "PricePromise",
            uploadedFile,
            uploadedFile.name
        );

        FilesAPI.UploadFile(formData, bucket, filesKeyPrefix).then(result => {
            if (result.status.code === 0) {
                setFileId(result.data.id);
            }
        });
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
                var fileKey = filesKeyPrefix + "/" + fileId;

                EnquiryService.SubmitPricePromiseEnquiry(data.fullName, data.companyName, data.telephone, data.email, data.comments, fileKey, communicationTypes)
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
            })

            promise.then(result => {
                if (result) {
                    router.push(GetThankYouPageUrl(isInternal, "pricepromise"));
                }
            }).catch(function (error) {
                console.log(error);
            }).finally(() => {
                setIsLoading(false);
            });
        }
    }

    return (
        <React.Fragment>
            <Modal onHide={onRequestClose} centered={true} {...otherProps}>
                <Modal.Header className="d-flex flex-nowrap justify-content-center align-items-center" closeButton>
                    <Modal.Title className="text-left mb-0">Price Match Promise</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormContext {...methods}>
                        <form className="px-md-3" onSubmit={handleSubmit(onSubmit)}>
                            <>
                                <p className="mb-4">A member of our team will contact you shortly after your submission.</p>
                                <div className="row">
                                    <div className="col-24 col-lg-12 form-group">
                                        <label>Full Name <span className={style["required"]}>(Required)</span></label>
                                        <input type="text" className="form-control" placeholder="Full Name" maxLength={100} name="fullName" ref={register({ required: true })} />
                                        {errors.fullName && <span className="invalid-feedback d-block">This field is required</span>}
                                    </div>
                                    <div className="col-24 col-lg-12  form-group">
                                        <label htmlFor="companyName">Company Name</label>
                                        <input type="text" className="form-control" id="companyName" name="companyName" aria-describedby="companyName" placeholder="Company Name" ref={register()} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-24 col-lg-12 form-group">
                                        <label>Telephone <span className={style["required"]}>(Required)</span></label>
                                        <input type="tel" className={`form-control ${errors.telephone ? "is-invalid" : ""}`} placeholder="Telephone" maxLength={50} name="telephone"
                                            ref={register({
                                                required: 'This field is required',
                                                validate: value => PhoneNumberIsValid(value) === true || 'Invalid phone number'
                                            })}
                                        />
                                        {errors.telephone && <span className="invalid-feedback d-block">{errors.telephone?.message}</span>}
                                    </div>
                                    <div className="col-24 col-lg-12 form-group">
                                        <label>Email <span className={style["required"]}>(Required)</span></label>
                                        <input type="text" className={`form-control ${errors.email ? "is-invalid" : ""}`} placeholder="Email" maxLength={70} name="email"
                                            onBlur={onEmailFocusOut}
                                            ref={register({
                                                required: 'This field is required',
                                                validate: value => EmailAddressIsValid(value) === true || 'Invalid email address'
                                            })}
                                        />
                                        {errors.email && <span className="invalid-feedback d-block">{errors.email?.message}</span>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-24 form-group">
                                        <label>Additional Comments</label>
                                        <input type="text" className="form-control" placeholder="Additional Comments" name="comments" ref={register()} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-24 form-group">
                                        <input id="attachedFile" name="attachedFile" type="file" className={`form-control ${style["fileUpload"]}`} onChange={onFileChange} accept=".pdf, image/*" ref={register({ required: true })} />
                                        <label className={style["cstm-upload"]} htmlFor="attachedFile" data-bind="validationElement: $parent.fileId">
                                            <span className="txt">{selectedFilename ?? "Upload file..."}</span>
                                        </label>
                                        <strong className="d-block">* Only PDF or JPG files accepted</strong>
                                        {errors.attachedFile && <span className="invalid-feedback d-block">No file selected</span>}
                                    </div>
                                </div>
                                {!isInternal ?
                                    (<div className="row">
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
                                    </div>) : null
                                }
                            </>
                        </form>
                    </FormContext>
                </Modal.Body>
                <Modal.Footer>
                    <div className="row">
                        <div className="col-24 d-flex justify-content-end">
                            <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit(onSubmit)}>
                                {isLoading ? <FontAwesomeIcon width="16" height="16" icon={faSpinner} className="fa-spin" /> : "Match My Price"}
                            </button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
};

export default ModalPricePromise;