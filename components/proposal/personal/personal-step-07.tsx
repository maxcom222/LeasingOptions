import React, { useState } from 'react';
import { useForm, FormContext } from "react-hook-form";
import { connect } from 'react-redux';

import { ProposalStepProps } from '../types/ProposalStepProps';

import EmploymentHistory from '../employment/employment-history';
import { logLabelEvent } from 'helpers/analytics';

const mapStateToProps = (state) => {
    return {
        formData: state.formData,
        stepNumber: state.stepIndicator
    };
}

const PersonalStepSeven: React.FC<ProposalStepProps & {
    showSingleEmployentHistoryOnly: boolean,
    showYourPosition: boolean,
    showLandLine: boolean
}> = (props) => {

    const handleGATracking = () => logLabelEvent('prop_form_tracking_personal', 'Click', 'employment-details-completed');
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
            <h2 className="mb-5">Your Employment Details</h2>
            <FormContext {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <EmploymentHistory showLandLine={props.showLandLine} showYourPosition={props.showYourPosition} showSingleEmployentHistoryOnly={props.showSingleEmployentHistoryOnly} minHistoryMonths={36} formData={formData} />

                    <div className="form-row d-flex justify-content-end">
                        <button type="button" className="btn btn-outline-secondary mr-3" onClick={onBack}>Back</button>
                        <button type="submit" className="btn btn-primary btn-lg" onClick={() => {handleGATracking()}}>Next</button>
                    </div>
                </form>
            </FormContext>
        </div>
    )
}

export default connect(mapStateToProps)(PersonalStepSeven)