import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import accounting from 'accounting';
import Modal from 'react-bootstrap/Modal';
import { useForm, FormContext } from "react-hook-form";
import style from './px.module.scss';

import { setPrivacyAccepted } from 'helpers/cookiesHelper';
import { EnquiryService } from "business-logic/enquiryService";
import { ValueYourCarService } from "business-logic/valueYourCarService";
import { MarketingCommunicationsService } from 'business-logic/marketingCommunicationsService';

import { VehicleTypes } from 'enums/VehicleTypes';
import { ContactRequestTypes } from "enums/ContactRequestTypes"
import { GetValuationRequest } from "types/value-your-car/GetValuationRequest";
import { ValuationEnquiry } from "types/enquiry/ValuationEnquiry";
import { PhoneNumberIsValid, EmailAddressIsValid } from 'helpers/validation';
import { getGAClientId } from 'helpers/analytics';
import ModalContext from 'components/HOCs/modal/modalContext';

import MarketingConsent from 'components/marketing-consent';
import PrivacyPolicyConsent from 'components/privacy-policy-consent';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-regular-svg-icons";
import Search from 'components/search';
import { Make } from 'types/Make';
import { GetThankYouPageUrl } from 'helpers/urlHelper';
import { useRouter } from 'next/router';
import { GetSalesPeople } from 'business-logic/systemService';
import { GetModels } from 'business-logic/vehicleService';

type Props = {
    isInternal: boolean;
    onRequestClose: any,
    registration?: string,
    carManufacturerList: Array<Make>,
}

type ValuationResult = {
    cap: any,
    id: any,
    value: any
}

function mapStateToProps(state) {
    return {
        carManufacturerList: state.carManufacturerList,
    };
}

const ModalPartExchange: React.FC<Props> = ({ isInternal, onRequestClose, registration = '', carManufacturerList, ...otherProps }) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [marketingConsentIsVerifying, setMarketingConsentIsVerifying] = useState<boolean>(false);
    const [emailAddressConsent, setEmailAddressConsent] = useState<string>(null);
    const router = useRouter();

    const [modelsList, setModelsList] = useState([]);
    const [selectedMake, setSelectedMake] = useState(null);
    const [salesPeopleList, setSalesPeopleList] = useState([]);

    const [valuationData, setValuationData] = useState<ValuationResult>(null);

    //used later to close current dialog and open searh
    const modalContext = useContext(ModalContext);


    const methods = useForm();
    const { register, handleSubmit, errors } = methods;

    useEffect(() => {
        GetSalesPeople()
            .then(result => {
                setSalesPeopleList(result.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (selectedMake) {
            GetModels(VehicleTypes.Car, selectedMake).then((data) => {
                setModelsList(data.data);
            });
        }
        else {
            setModelsList([]);
        }
    }, [selectedMake]);


    const onMakeSelected = (evt) => {
        setSelectedMake(evt.target.value);
    }

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

    const handleSearchClick = (evt) => {
        modalContext.hideModal();
        modalContext.showModal(Search, { show: true, title: "Start Your Search" })
    }

    const onSubmit = data => {
        setIsLoading(false);

        if (!isLoading && !marketingConsentIsVerifying) {
            setIsLoading(true);

            //Send valuation request
            var request: GetValuationRequest = {
                vrm: data.vrm,
                mileage: data.mileage,
                fullName: data.fullName,
                telephone: data.telephone,
                email: data.email,
                postCode: data.postCode
            }

            var promise = new Promise(resolve => {

                ValueYourCarService.GetValuation(request).then(valuationResult => {

                    if (valuationResult?.data?.id) {
                        setValuationData(valuationResult.data);

                        let communicationTypes: number[] = null;
                        //Should check if form was visible or user did any updates to those fields
                        //If no form is displayed data.contactEmail and other checkbox properties are "undefined"
                        if (!isInternal && data.contactEmail != undefined && data.allowedCommunicationTypes) {
                            communicationTypes = data.allowedCommunicationTypes;
                        }

                        const enquiry: ValuationEnquiry = new ValuationEnquiry();
                        enquiry.vrm = data.vrm;
                        enquiry.mileage = data.mileage;
                        enquiry.fullName = data.fullName;
                        enquiry.telephone = data.telephone;
                        enquiry.email = data.email;
                        enquiry.postCode = data.postCode;
                        enquiry.allowedCommunicationTypes = communicationTypes;

                        enquiry.valuationCap = valuationResult.data.cap;
                        enquiry.valuationId = valuationResult.data.id;
                        enquiry.valuationValue = valuationResult.data.value;
                        enquiry.make = data.make.replace("-", " ");
                        enquiry.model = data.model.replace("-", " ");
                        enquiry.salesPersonId = isInternal ? data.salesPersonId : null;
                        enquiry.gaClientId = getGAClientId();

                        EnquiryService.SubmitValuationEnquiry(enquiry)
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
                    }
                    else {
                        setValuationData(null);
                        resolve(false);
                    }
                });
            });

            promise.then(result => {
                //do nothing

                router.push(GetThankYouPageUrl(false, "valuation"));

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
                    <Modal.Title className="text-left mb-0">{valuationData == null ? "Value Your Part Exchange" : "Your Valuation Is:"}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={`${style['px']}`}>
                    <FormContext {...methods}>
                        <form className="px-md-3" onSubmit={handleSubmit(onSubmit)}>
                            {valuationData == null &&
                                <>
                                    <p className="mb-4">We and our partners will give you a fair value for your part-exchange.<br />You can even have it collected for FREE!</p>
                                    <p>Simply enter the number plate of the car you'd like a valuation for below.</p>
                                    <div className="row">
                                        <div className="col-24 col-lg-12 form-group">
                                            <div id="yourReg">
                                                <input className={`${style["your-registration"]} ${errors.vrm ? style['is-invalid'] : ""}`} type="text" placeholder="ENTER YOUR REG" defaultValue={registration} maxLength={10} name="vrm" ref={register({ required: true })} />
                                            </div>
                                            {errors.vrm && <span className="invalid-feedback d-block">This field is required</span>}
                                        </div>
                                        <div className="col-24 col-lg-12 form-group">
                                            <input type="text" className={`form-control ${errors.mileage ? "is-invalid" : ""}`} placeholder="Enter Your Current Mileage (required)" maxLength={10} name="mileage"
                                                ref={register(
                                                    {
                                                        required: {
                                                            value: true,
                                                            message: "This field is required"
                                                        },
                                                        pattern: {
                                                            value: /^\d+$/,
                                                            message: "A valid numeric value is expected"
                                                        }
                                                    })
                                                } />
                                            {errors.mileage && <span className="invalid-feedback d-block">{errors.mileage?.message}</span>}
                                        </div>
                                    </div>
                                    <h3>I'm interested in leasing:</h3>
                                    <div className="row">
                                        <div className="col-24 col-lg-12 form-group">
                                            <label>Make <span className={style["required"]}>(Required)</span></label>
                                            <select className={`form-control ${errors.make ? "is-invalid" : ""}`} onChange={(evt) => onMakeSelected(evt)} name="make" ref={register({ required: true })} >
                                                <option value="">- Select Make -</option>
                                                {carManufacturerList?.map(make =>
                                                    (<option key={make.id} value={make.id}>{make.text}</option>)
                                                )}
                                            </select>
                                            {errors.make && <span className="invalid-feedback d-block">This field is required</span>}
                                        </div>
                                        <div className="col-24 col-lg-12 form-group">
                                            <label>Model <span className={style["required"]}>(Required)</span></label>
                                            <select className={`form-control ${errors.model ? "is-invalid" : ""}`} name="model" ref={register({ required: true })} >
                                                <option value="">- Select Model -</option>
                                                {modelsList?.map(model =>
                                                    (<option key={model.id} value={model.id}>{model.text}</option>)
                                                )}
                                            </select>
                                            {errors.model && <span className="invalid-feedback d-block">This field is required</span>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-24 col-lg-12 form-group">
                                            <label>Full Name <span className={style["required"]}>(Required)</span></label>
                                            <input type="text" className="form-control" placeholder="Full Name" maxLength={100} name="fullName" ref={register({ required: true })} />
                                            {errors.fullName && <span className="invalid-feedback d-block">This field is required</span>}
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
                                            <label>Post Code <span className={style["required"]}>(Required)</span></label>
                                            <input type="text" className={`form-control ${errors.postCode ? "is-invalid" : ""}`} placeholder="Post Code" maxLength={10} name="postCode" ref={register({ required: true })} />
                                            {errors.postCode && <span className="invalid-feedback d-block">This field is required</span>}
                                        </div>
                                    </div>
                                    {
                                        isInternal &&
                                        <div className="row">
                                            <div className="col-24 col-lg-12 form-group">
                                                <label>Salesperson </label>
                                                <select className="form-control" name="salesPersonId" ref={register()}>
                                                    <option value="">- Select Salesperson -</option>
                                                    {salesPeopleList?.map(user =>
                                                        (<option key={user.id} value={user.id}>{user.fullName}</option>)
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    }
                                    {!isInternal ?
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
                                </>
                            }
                            {
                                valuationData != null &&
                                <div className="row">
                                    <div className="col-24">
                                        <div className={style["valuation-result"]}>
                                            <i className="fal fa-gbp"></i><span dangerouslySetInnerHTML={{ __html: accounting.formatMoney(valuationData.value) }}></span>
                                        </div>
                                        <p>This is an approximate value dependant on the condition, exact mileage, service history and other factors. To take this further or accept this please click on the link below.</p>
                                        <p>The amount you get may be more or less dependent on the factors mentioned above. Have you been offered more elsewhere? Tell our team!</p>
                                    </div>
                                </div>
                            }
                        </form>
                    </FormContext>
                </Modal.Body>
                <Modal.Footer>
                    <div className="w-100 row">
                        <div className="col-24 d-flex justify-content-center justify-content-md-end">
                            {
                                valuationData == null &&
                                <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit(onSubmit)}>
                                    {isLoading ? <FontAwesomeIcon width="16" height="16" icon={faSpinner} className="fa-spin" /> : "Get Valuation"}
                                </button>
                            }
                            {
                                valuationData != null &&
                                <button type="button" className="btn btn-primary btn-lg" onClick={(evt) => handleSearchClick(evt)}>Ready to find a new car?</button>
                            }
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
    //}

};

export default connect(mapStateToProps)(ModalPartExchange);