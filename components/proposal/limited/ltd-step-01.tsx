import React from 'react';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/pro-regular-svg-icons";
import { connect } from 'react-redux';

import { ProposalStepProps } from '../types/ProposalStepProps';
import { logLabelEvent } from 'helpers/analytics';

function mapStateToProps(state) {
    return {
        formData: state.formData,
        stepNumber: state.stepIndicator
    };
}

const LimitedStepOne: React.FC<ProposalStepProps> = (props) => {

    const handleGATracking = () => logLabelEvent('prop_form_tracking_ltd', 'Click', 'start-application');

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        if (props.handleFormSave(props.stepNumber, data)) {
            props.handleFormStep(props.stepNumber + 1);
        }
    }

    return (
        <div className="w-100 bg-white p-3 p-md-5">
            <h2 className="mb-5">Your Finance Application</h2>
            <h4>Takes Approximately 5 Minutes</h4>
            <p>To succesfully complete an application you will need the following information at hand:</p>
            <h5>Information Needed</h5>
            <ul>
                <li className="d-flex align-items-center mb-2"><FontAwesomeIcon width="25" height="25" icon={faCheck} className="circled-check" /> VAT &amp; Company Reg No.</li>
                <li className="d-flex align-items-center mb-2"><FontAwesomeIcon width="25" height="25" icon={faCheck} className="circled-check" /> Business Details</li>
                <li className="d-flex align-items-center mb-2"><FontAwesomeIcon width="25" height="25" icon={faCheck} className="circled-check" /> Director Details</li>
                <li className="d-flex align-items-center mb-2"><FontAwesomeIcon width="25" height="25" icon={faCheck} className="circled-check" /> Bank Details</li>
            </ul>
            
            <p>Please note if left idle your application may time out &amp; need to be started again.</p>
            <p>If your application is accepted and you choose to proceed, your funder may conclude your agreement online, using the email address that you have provided and e-sign technology.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-100 text-right form-check pl-0 pr-3">
                    <label className="form-check-label" htmlFor="agree">I agree to sign my finance agreement online and receive an executed copy by email</label>
                    <input className={`form-check-input mr-0 ml-2 ${errors.agree ? "is-invalid" : ""}`} type="checkbox" value="" id="agree" name="agree" ref={register({ required: true })} defaultChecked={props.formData.agree} />
                    {errors.agree && <span className="invalid-feedback d-block">Please agree to sign your finance agreement online.</span>}
                </div>
                <div className="form-row d-flex justify-content-end mt-3">
                    <button type="submit" className="btn btn-primary btn-lg" onClick={() => {handleGATracking()}}>Start Application</button>
                </div>
            </form>
        </div>
    )
}

export default connect(mapStateToProps)(LimitedStepOne)