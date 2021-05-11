import React, { useState, useEffect } from 'react';
import { useForm, FormContext } from "react-hook-form";
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-regular-svg-icons";

import { PricingErrorFeedbackTypes } from 'enums/internal/PricingErrorFeedbackTypes';
import { ApiResponse } from 'types/infrastructure/ApiResponse';
import { PricingErrorFeedback } from 'types/internal/PricingErrorFeedback';
import { PricingErrorFeedbackSubtypes } from 'types/internal/PricingErrorFeedbackSubtypes';
import { GetSalesPeople, SendPricingFeedback } from 'business-logic/systemService';

type Props = {
    onRequestClose: any,

    vehicleRef: number;
    capId: number;
    vehicleName: string;
    vehiclePageUrl: string;

    settings: {
        salespersons: any;
    }
}

const VehiclePricingErrorFeedbackModal: React.FC<Props> = ({ onRequestClose, vehicleRef, capId, vehicleName, vehiclePageUrl, settings, ...otherProps }) => {
    const methods = useForm();
    const { register, handleSubmit, errors } = methods;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [type, setType] = useState<number>(null);
    const [subtype, setSubtype] = useState<number>(null);
    const [salespersons, setSalespersons] = useState(settings.salespersons || []);

    //TODO: get salespersons with settings
    useEffect(() => {
        if (salespersons.length === 0) {
            GetSalesPeople()
                .then(result => {
                    setSalespersons(result.data);
                });
        }
    }, []);

    useEffect(() => {
        setSubtype(null);
    }, [type]);

    const onSubmit = data => {
        if (!isLoading) {
            setIsLoading(true);

            let pricingFeedback: PricingErrorFeedback = {
                vehicleRef: vehicleRef,
                capId: capId,
                vehicleName: vehicleName,
                vehiclePageUrl: vehiclePageUrl,

                ...data
            };

            SendPricingFeedback(pricingFeedback)
                .then((result: ApiResponse) => {
                    setIsLoading(false);

                    if (result.isSucceed) {
                        onRequestClose();
                    }
                    else {
                        alert("Failed to submit form.");
                    }
                });
        }
    }

    return (
        <Modal onHide={onRequestClose} centered={true} {...otherProps}>
            <Modal.Header className="d-flex flex-nowrap justify-content-center align-items-center" closeButton>
                <Modal.Title className="text-center">Pricing Error Feedback</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body--dark">
                <FormContext {...methods}>
                    <div className="row">
                        <div className="col-8 mb-3"><strong>Vehicle Ref:</strong></div>
                        <div className="col-16 mb-3">{vehicleRef}</div>
                    </div>
                    <div className="row">
                        <div className="col-8 mb-3"><strong>Vehicle:</strong></div>
                        <div className="col-16 mb-3">{vehicleName}</div>
                    </div>
                    <div className="row">
                        <div className="col-8 mb-3"><strong>Salesperson:</strong></div>
                        <div className="col-16 mb-3">
                            <select className={`form-control ${errors.salespersonId ? "is-invalid" : ""}`} id="salespersonId" name="salespersonId" ref={register({ required: true })}>
                                <option value="">Please select</option>
                                {salespersons.map((item) => (
                                    <option key={item.id} value={item.id}>{item.fullName}</option>
                                ))}
                            </select>
                            {errors.salespersonId ? <span className="invalid-feedback d-block">Salesperson is required</span> : null}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-8 mb-3"><strong>Type:</strong></div>
                        <div className="col-16 mb-3">
                            <select className={`form-control ${errors.type ? "is-invalid" : ""}`} id="type" name="type" onChange={(evt) => { setType(parseInt(evt.target.value)) }} ref={register({ required: true })}>
                                <option value="">Please select</option>
                                <option value={PricingErrorFeedbackTypes.PricingIssue}>Pricing Issue</option>
                                <option value={PricingErrorFeedbackTypes.StockUpdate}>Stock Update</option>
                                <option value={PricingErrorFeedbackTypes.Other}>Other</option>
                            </select>
                            {errors.type ? <span className="invalid-feedback d-block">Type is required</span> : null}
                        </div>
                    </div>

                    {([PricingErrorFeedbackTypes.PricingIssue, PricingErrorFeedbackTypes.StockUpdate].includes(type)) ?
                        (
                            <div className="row">
                                <div className="col-8 mb-3"><strong>Subtype:</strong></div>
                                <div className="col-16 mb-3">
                                    <select className={`form-control ${errors.subtype ? "is-invalid" : ""}`} id="subtype" name="subtype" onChange={(evt) => { setSubtype(parseInt(evt.target.value)) }} ref={register({ required: true })}>
                                        <option value="">Please select</option>
                                        {type === PricingErrorFeedbackTypes.PricingIssue ?
                                            (
                                                <>
                                                    <option value={PricingErrorFeedbackSubtypes.DoesntStack}>Doesn't stack</option>
                                                    <option value={PricingErrorFeedbackSubtypes.TooExpensive}>Too expensive</option>
                                                    <option value={PricingErrorFeedbackSubtypes.ShowingRatebookPrice}>Showing ratebook price</option>
                                                </>
                                            ) : null
                                        }
                                        {type === PricingErrorFeedbackTypes.StockUpdate ?
                                            (
                                                <>
                                                    <option value={PricingErrorFeedbackSubtypes.SoldOut}>Sold Out</option>
                                                    <option value={PricingErrorFeedbackSubtypes.StockAvailable}>Stock Available</option>
                                                </>
                                            ) : null
                                        }
                                    </select>
                                    {errors.subtype ? <span className="invalid-feedback d-block">Subtype is required</span> : null}
                                </div>
                            </div>
                        ) : null
                    }

                    {([PricingErrorFeedbackTypes.Other].includes(type)) ?
                        (
                            <div className="row">
                                <div className="col-8 mb-3"><strong>Note:</strong></div>
                                <div className="col-16 mb-3">
                                    <textarea className={`form-control ${errors.note ? "is-invalid" : ""}`} id="note" name="note" ref={register({ required: true })}></textarea>
                                    {errors.note ? <span className="invalid-feedback d-block">Note is required</span> : null}
                                </div>
                            </div>
                        ) : null
                    }

                    {([PricingErrorFeedbackSubtypes.DoesntStack, PricingErrorFeedbackSubtypes.TooExpensive].includes(subtype)) ?
                        (
                            <>
                                <div className="row">
                                    <div className="col-8 mb-3"><strong>Funder:</strong></div>
                                    <div className="col-16 mb-3">
                                        <input type="text" className={`form-control ${errors.funder ? "is-invalid" : ""}`} id="funder" name="funder" ref={register({ required: true })}></input>
                                        {errors.funder ? <span className="invalid-feedback d-block">Funder is required</span> : null}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-8 mb-3"><strong>Quote Number:</strong></div>
                                    <div className="col-16 mb-3">
                                        <input type="text" className={`form-control ${errors.quoteNumber ? "is-invalid" : ""}`} id="quoteNumber" name="quoteNumber" ref={register({ required: true })}></input>
                                        {errors.quoteNumber ? <span className="invalid-feedback d-block">Quote Number is required</span> : null}
                                    </div>
                                </div>
                            </>
                        ) : null
                    }

                    {([PricingErrorFeedbackSubtypes.SoldOut].includes(subtype)) ?
                        (
                            <div className="row">
                                <div className="col-8 mb-3"><strong>Dealer Contacted:</strong></div>
                                <div className="col-16 mb-3">
                                    <input type="text" className={`form-control ${errors.dealerContacted ? "is-invalid" : ""}`} id="dealerContacted" name="dealerContacted" ref={register({ required: true })}></input>
                                    {errors.dealerContacted ? <span className="invalid-feedback d-block">Value is required</span> : null}
                                </div>
                            </div>
                        ) : null
                    }

                    {([PricingErrorFeedbackSubtypes.StockAvailable].includes(subtype)) ?
                        (
                            <>
                                <div className="row">
                                    <div className="col-8 mb-3"><strong>Where:</strong></div>
                                    <div className="col-16 mb-3">
                                        <input type="text" className={`form-control ${errors.where ? "is-invalid" : ""}`} id="where" name="where" ref={register({ required: true })}></input>
                                        {errors.where ? <span className="invalid-feedback d-block">Value is required</span> : null}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-8 mb-3"><strong>How Many:</strong></div>
                                    <div className="col-16 mb-3">
                                        <input type="text" className={`form-control ${errors.howMany ? "is-invalid" : ""}`} id="howMany" name="howMany" ref={register({ required: true })}></input>
                                        {errors.howMany ? <span className="invalid-feedback d-block">Value is required</span> : null}
                                    </div>
                                </div>
                            </>
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
    );
};

export default VehiclePricingErrorFeedbackModal;