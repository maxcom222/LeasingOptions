import { logLabelEvent } from 'helpers/analytics';
import React from 'react';
import { useForm, FormContext } from "react-hook-form";
import { connect } from 'react-redux'

import { ProposalStepProps } from '../types/ProposalStepProps';

import TermsAgreement from './../common/terms-agreement';

const mapStateToProps = (state) => {
    return {
        formData: state.formData,
        stepNumber: state.stepIndicator
    };
}

const SoleStepSeven: React.FC<ProposalStepProps> = (props) => {

    const handleGATracking = () => logLabelEvent('prop_form_tracking_soletrader', 'Click', 'completed-application');

    const formData = props.formData[props.stepNumber];

    const methods = useForm();
    const { handleSubmit } = methods;

    const onSubmit = (data) => {
        props.handleFormSubmit(props.stepNumber, data);
    }

    const onBack = () => {
        props.handleFormStep(props.stepNumber - 1);
    }

    const onAccept = (evt) => {
        props.handleFormSave(props.stepNumber, { privacy: evt.target.checked });
    }

    return (
        <div className="w-100 bg-white p-3 p-md-5">
            <h2 className="mb-5">Submit Your Application</h2>
            <h3>Terms and Conditions</h3>
            <FormContext {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <TermsAgreement defaultValue={formData.privacy} onAcceptChange={onAccept} />

                    <div className="form-row d-flex justify-content-end">
                        <button type="button" className="btn btn-outline-secondary mr-3" onClick={onBack}>Back</button>
                        <button type="submit" className="btn btn-primary btn-lg" onClick={() => { handleGATracking() }}>Complete</button>
                    </div>
                </form>
            </FormContext>
        </div>
    )
}

export default connect(mapStateToProps)(SoleStepSeven);