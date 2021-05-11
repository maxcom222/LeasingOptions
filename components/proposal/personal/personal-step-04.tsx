import { logLabelEvent } from 'helpers/analytics';
import React, { useState } from 'react';
import { useForm, FormContext } from "react-hook-form";
import { connect } from 'react-redux';

import { ProposalStepProps } from '../types/ProposalStepProps';
import AddressHistory from './../address/address-history';

function mapStateToProps(state) {
    return {
        formData: state.formData,
        stepNumber: state.stepIndicator
    };
}

const PersonalStepFour: React.FC<ProposalStepProps> = (props) => {

    const formData = props.formData[props.stepNumber];

    const methods = useForm();
    const { handleSubmit } = methods;

    const onSubmit = (data, evt) => {
        if (props.handleFormSave(props.stepNumber, data)) {
            props.handleFormStep(props.stepNumber + 1);
        }
        logLabelEvent('prop_form_tracking_personal', 'Click', 'address-history-completed');
    }

    const onBack = () => props.handleFormStep(props.stepNumber - 1);

    return (
        <div className="w-100 bg-white p-3 p-md-5">
            <FormContext {...methods} >
                <form onKeyDown={(evt) => { if (evt.key == 'Enter' || evt.keyCode === 13) { evt.preventDefault(); evt.stopPropagation(); return false; } }}>
                    <AddressHistory formData={formData} minHistoryMonths={60} parentContainer={null} />
                    <div className="form-row d-flex justify-content-end">
                        <button type="button" className="btn btn-outline-secondary mr-3" onClick={onBack}>Back</button>
                        <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit(onSubmit)}>Next</button>
                    </div>
                </form>
            </FormContext>
        </div>
    )
}

export default connect(mapStateToProps)(PersonalStepFour)