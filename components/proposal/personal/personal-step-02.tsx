import React from 'react';
import { useForm, FormContext } from "react-hook-form";
import { connect } from 'react-redux';

import { EmailAddressIsValid, UKMobileNumberIsValid } from 'helpers/validation';
import { PhoneNumberIsValid } from 'helpers/validation';
import { ProposalStepProps } from '../types/ProposalStepProps';

import FullName from '../common/full-name';
import { logLabelEvent } from 'helpers/analytics';

function mapStateToProps(state) {
    return {
        formData: state.formData,
        stepNumber: state.stepIndicator
    };
}


const PersonalStepTwo: React.FC<ProposalStepProps & { showMiddleName: boolean }> = (props) => {

    const formData = props.formData[props.stepNumber];
    const handleGATracking = () => logLabelEvent('prop_form_tracking_personal', 'Click', 'personal-details-completed');
    
    const methods = useForm();
    const { register, handleSubmit, errors } = methods;

    const onSubmit = (data) => {
        if (props.handleFormSave(props.stepNumber, data)) {
            props.handleFormStep(props.stepNumber + 1);
        }
    }

    const onBack = () => props.handleFormStep(props.stepNumber - 1);

    const queryParams = new URLSearchParams(window.location.search);
    const emailDefaultValue = queryParams.get("email") ? queryParams.get("email") : formData.emailAddress;

    return (
        <div className="w-100 bg-white p-3 p-md-5">
            <h2 className="mb-5">Your Details</h2>

            <div className="form-row mb-3">
                        <div className="col-24 col-md-12">
                            <label>Email Address<small> (Required)</small></label>
                            <input type="text" className={`form-control ${errors.emailAddress ? "is-invalid" : ""}`} name={"emailAddress"} placeholder="Your Email Address" maxLength={100}
                                ref={register({ 
                                    required: true, 
                                    validate: value => EmailAddressIsValid(value) === true || 'Invalid email address' })}
                                defaultValue={emailDefaultValue} />
                            {errors.emailAddress && <span className="invalid-feedback d-block">This field is required</span>}
                        </div>
                    </div>

            <FormContext {...methods} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3>Your Name</h3>
                    <FullName showMiddleName={props.showMiddleName} formData={formData} collectionName={null} index={0} />

                    <h3>Contact Details</h3>
                    <div className="form-row mb-3">
                        <div className="col-24 col-md-12">
                            <label htmlFor="mobileNumber">Mobile Number <small>(Required)</small></label>
                            <input type="tel" className={`form-control ${errors.mobileNumber ? "is-invalid" : ""}`} id="mobileNumber" name="mobileNumber" aria-describedby="mobileNumber" placeholder="Mobile Number"
                                ref={register({
                                    required: true,
                                    validate: value => UKMobileNumberIsValid(value, false) === true || 'Please specify a valid UK mobile number.'
                                })} defaultValue={formData.mobileNumber} />
                            {errors.mobileNumber && <span className="invalid-feedback d-block">Please specify a valid UK mobile number.</span>}
                        </div>
                    </div>
                    <div className="form-row mb-3">
                        <div className="col-24 col-md-12">
                            <label htmlFor="homeNumber">Home Number</label>
                            <input type="tel" className={`form-control ${errors.homeNumber ? "is-invalid" : ""}`} id="homeNumber" name="homeNumber" aria-describedby="homeNumber" placeholder="Home Number"
                                ref={register({
                                    validate: value => PhoneNumberIsValid(value) === true || 'Please specify a valid UK landline number.'
                                })} defaultValue={formData.homeNumber} />
                            {errors.homeNumber && <span className="invalid-feedback d-block">Please specify a valid UK landline number.</span>}
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

export default connect(mapStateToProps)(PersonalStepTwo)