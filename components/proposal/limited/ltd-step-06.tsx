import { logLabelEvent } from 'helpers/analytics';
import React, { useState, useEffect } from 'react';
import { useForm, FormContext } from "react-hook-form";
import { connect } from 'react-redux'
import { ProposalStepProps } from '../types/ProposalStepProps';

import AddressInput from './../address/address-input'

const mapStateToProps = (state) => {
    return {
        formData: state.formData,
        stepNumber: state.stepIndicator
    };
}

const LimitedStepSix: React.FC<ProposalStepProps> = (props) => {

    const handleGATracking = () => logLabelEvent('prop_form_tracking_ltd', 'Click', 'bank-address-details-completed');

    const prepareFormData = () => {
        let data = props.formData[props.stepNumber];
        const prevStepData = props.formData[props.stepNumber - 1];

        let timestampPrev = (prevStepData) ? parseInt(prevStepData.timestamp || 0) : 0;
        let timestampCurr = (data) ? parseInt(data.timestamp || 0) : 0;

        if (timestampPrev > timestampCurr) {
            data = {
                ...data,
                postcode: prevStepData.postcode,
                address1: prevStepData.address1,
                address2: prevStepData.address2,
                address3: prevStepData.address3,
                town: prevStepData.town,
                county: prevStepData.county
            };
        }
        return data;
    }
    const formData = prepareFormData();

    const methods = useForm();
    const { register, handleSubmit, errors } = methods;

    const onSubmit = (data) => {
        if (props.handleFormSave(props.stepNumber, data)) {
            props.handleFormStep(props.stepNumber + 1);
        }
    }

    const onBack = () => {
        props.handleFormStep(props.stepNumber - 1);
    }



    return (
        <div className="w-100 bg-white p-3 p-md-5">
            <h3>Your Bank's Address</h3>
            <FormContext {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <AddressInput excludeTownAndCounty={false} formData={formData} index={0} collectionName={null} />

                    <div className="form-row mb-3">
                        <div className="col-24 col-md-6">
                            <label htmlFor="firstName">Years with Bank  <small>(Required)</small></label>
                            <input type="text" className={`form-control ${errors.bankYears ? "is-invalid" : ""}`} id="bankYears" name="bankYears" aria-describedby="bankYears" placeholder="Years" maxLength={100}
                                ref={register({ required: true, pattern: /^[0-9]*$/ })}
                                defaultValue={formData.bankYears}
                            />
                            {errors.bankYears && <span className="invalid-feedback d-block">This field is required</span>}
                        </div>
                    </div>

                    <div className="form-row d-flex justify-content-end">
                        <button type="button" className="btn btn-outline-secondary mr-3" onClick={onBack}>Back</button>
                        <button type="submit" className="btn btn-primary btn-lg" onClick={() => {handleGATracking()}}>Next</button>
                    </div>
                </form>
            </FormContext>
        </div>
    )
}

export default connect(mapStateToProps)(LimitedStepSix);