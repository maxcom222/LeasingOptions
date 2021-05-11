import React, { useState } from 'react';
import { useForm, FormContext } from "react-hook-form";
import { connect } from 'react-redux';

import DateOfBirth from '../common/date-of-birth';
import GenderSelector from '../common/gender-selector';
import NationalitySelector from '../common/nationality-selector';
import MaritalStatusSelector from '../common/marital-status-selector';
import PropertyStatusSelector from '../common/property-status-selector';
import PropertyTenureSelector from '../common/property-tenure-selector';
import PropertyTypeSelector from '../common/property-type-selector';

import { ProposalStepProps } from '../types/ProposalStepProps';
import { Form } from 'react-bootstrap';
import { logLabelEvent } from 'helpers/analytics';

function mapStateToProps(state) {
    return {
        formData: state.formData,
        stepNumber: state.stepIndicator
    };
}

const PersonalStepThree: React.FC<ProposalStepProps & {
     showGenderSelector: boolean,
     showMaritalStatus: boolean,
     showProperyStatus: boolean }> = (props) => {

    const formData = props.formData[props.stepNumber];
    const handleGATracking = () => logLabelEvent('prop_form_tracking_personal', 'Click', 'personal-details-2-completed');
    
    const methods = useForm();
    const { register, handleSubmit, errors, control, watch } = methods;

    const watchPropertyStatusId = watch("propertyStatusId", formData.propertyStatusId);

    const onSubmit = (data) => {
        if (props.handleFormSave(props.stepNumber, data)) {
            props.handleFormStep(props.stepNumber + 1);
        }
    }

    const onBack = () => props.handleFormStep(props.stepNumber - 1);

    return (
        <div className="w-100 bg-white p-3 p-md-5">
            <h2 className="mb-5">Your Details continued</h2>
            <h3>Personal Details</h3>
            <FormContext {...methods} >
                <form onSubmit={handleSubmit(onSubmit)}>

                    <DateOfBirth defaultValue={formData.dob} collectionName={null} index={null} minYears={18} />
                    { props.showGenderSelector && 
                    <   GenderSelector defaultValue={formData.genderId} collectionName={null} index={null} />
                    }
                    <NationalitySelector defaultValue={formData.nationalityId} collectionName={null} index={null} />
                    { props.showMaritalStatus && 
                    <   MaritalStatusSelector defaultValue={formData.maritalStatusId} collectionName={null} index={null} />
                    }
                    <div className="form-row mb-3">
                        <div className="col-24 col-md-12 col-lg-6">
                            <label htmlFor="dependents">Number of dependents <small>(Required)</small></label>
                            <input type="number" min={0} max={99} className={`form-control ${errors.dependents ? "is-invalid" : ""}`} id="dependents" name="dependents" aria-describedby="dependents" placeholder="Number of dependents"
                                ref={register({ required: true, pattern: /^[0-9]*$/ })}
                                defaultValue={formData.dependents} />
                            {errors.dependents && <span className="invalid-feedback d-block">This field is required</span>}
                        </div>
                    </div>

                    { props.showProperyStatus && 
                      <PropertyStatusSelector defaultValue={formData.propertyStatusId} collectionName={null} index={null} />
                    }
                 
                    {(watchPropertyStatusId == "1" || watchPropertyStatusId == "3") &&
                        <PropertyTenureSelector defaultValue={formData.propertyTenureId} collectionName={null} index={null} />
                    }

                    <PropertyTypeSelector defaultValue={formData.propertyTypeId} collectionName={null} index={null} />

                    <div className="form-row d-flex justify-content-end">
                        <button type="button" className="btn btn-outline-secondary mr-3" onClick={onBack}>Back</button>
                        <button type="submit" className="btn btn-primary btn-lg" onClick={() => {handleGATracking()}}>Next</button>
                    </div>
                </form>
            </FormContext>
        </div>
    )
}

export default connect(mapStateToProps)(PersonalStepThree)