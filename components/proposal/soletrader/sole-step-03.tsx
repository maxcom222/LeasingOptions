import { logLabelEvent } from 'helpers/analytics';
import { EmailAddressIsValid } from 'helpers/validation';
import React from 'react';
import { useForm, FormContext } from "react-hook-form";
import { connect } from 'react-redux';

import { ProposalStepProps } from '../types/ProposalStepProps';

import AddressInput from './../address/address-input';
import BusinessContactPhones from './../business/business-contact-phones';

function mapStateToProps(state) {
    return {
        formData: state.formData,
        stepNumber: state.stepIndicator
    };
}

const SoleStepThree: React.FC<ProposalStepProps> = (props) => {

    const formData = props.formData[props.stepNumber];
    const handleGATracking = () => logLabelEvent('prop_form_tracking_soletrader', 'Click', 'contact-and-address-completed');
    
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
            <FormContext {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>

                  
                    <h3>Your Email</h3>
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

                    <h3>Contact Details</h3>

                
                    <BusinessContactPhones formData={formData} />

                    <h3 className="mt-5">Trading Address</h3>
                    <AddressInput excludeTownAndCounty={false} formData={formData} index={0} collectionName={null} />

                    <div className="form-row mb-3">
                        <div className="col-24 col-md-7">
                            <label htmlFor="notes">Notes</label>
                            <textarea className="form-control" name="notes" id="notes" aria-label="Notes" aria-describedby="notes"
                                placeholder="If applicable please tell additional information that may be relevant to your application"
                                ref={register()} defaultValue={formData.notes}></textarea>
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

export default connect(mapStateToProps)(SoleStepThree)