import React from 'react';
import { useForm, FormContext, Controller } from "react-hook-form";
import { connect } from 'react-redux';

import { ProposalStepProps } from '../types/ProposalStepProps';

import DiretorDetails from '../business/director-details';
import { logLabelEvent } from 'helpers/analytics';

function mapStateToProps(state) {
    return {
        formData: state.formData,
        stepNumber: state.stepIndicator
    };
}

const SoleStepFour: React.FC<ProposalStepProps> = (props) => {

    const handleGATracking = () => logLabelEvent('prop_form_tracking_soletrader', 'Click', 'personal-details-completed');
    
    const formData = props.formData[props.stepNumber];

    const methods = useForm();
    const { handleSubmit } = methods;

    const onSubmit = (data) => {
        if (props.handleFormSave(props.stepNumber, data)) {
            props.handleFormStep(props.stepNumber + 1);
        }
    }

    const onBack = () => props.handleFormStep(props.stepNumber - 1);

    return (
        <div className="w-100 bg-white p-3 p-md-5">
            <h2 className="mb-5">Your Details</h2>
            <FormContext {...methods} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3>Your Name</h3>

                    <DiretorDetails collectionName={null} index={null} formData={formData} />

                    <div className="form-row d-flex justify-content-end">
                        <button type="button" className="btn btn-outline-secondary mr-3" onClick={onBack}>Back</button>
                        <button type="submit" className="btn btn-primary btn-lg" onClick={() => {handleGATracking()}}>Next</button>
                    </div>
                </form>
            </FormContext>
        </div>
    )
}

export default connect(mapStateToProps)(SoleStepFour)