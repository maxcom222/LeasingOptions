import { logLabelEvent } from 'helpers/analytics';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';

import { ProposalStepProps } from '../types/ProposalStepProps';

const mapStateToProps = (state) => {
    return {
        formData: state.formData,
        stepNumber: state.stepIndicator
    };
}

const PersonalStepFive: React.FC<ProposalStepProps & {
    showSlimVersion: boolean
}> = (props) => {
    const formData = props.formData[props.stepNumber];
    const handleGATracking = () => logLabelEvent('prop_form_tracking_personal', 'Click', 'income-details-completed');
    
    const { register, handleSubmit, errors, watch } = useForm();

    const onSubmit = (data) => {

        if (props.handleFormSave(props.stepNumber, data)) {
            props.handleFormStep(props.stepNumber + 1);
        }
    }

    const onBack = () => props.handleFormStep(props.stepNumber - 1);

    const watchHasOtherIncomes = watch("hasOtherIncomes", formData.hasOtherIncomes);

    return (
        <div className="w-100 bg-white p-3 p-md-5">
            <h2 className="mb-5">Your Income Details</h2>
            
            <form onSubmit={handleSubmit(onSubmit)}>

                { props.showSlimVersion && 
                <>
                <div className="form-row mb-3">
                    <div className="col-24 col-md-7">
                        <label htmlFor="grossAnnualSalary">Your Gross Salary <small>(Required)</small></label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">£</span>
                            </div>
                            <input type="text" className={`form-control ${errors.grossAnnualSalary ? "is-invalid" : ""}`} name="grossAnnualSalary" id="grossAnnualSalary"
                                placeholder="Gross Annual Salary" aria-label="Gross Annual Salary" aria-describedby="grossAnnualSalary"
                                ref={register({ required: true, pattern: /^[0-9]*$/ })}
                                defaultValue={formData.grossAnnualSalary} />
                            {errors.grossAnnualSalary && <span className="invalid-feedback d-block">This field is required</span>}
                        </div>
                    </div>
                </div>
                </>
                }

                { !props.showSlimVersion && 
                <>

                <div className="form-row mb-3">
                    <div className="col-24 col-md-7">
                        <label htmlFor="grossMonthlySalary">Your Gross Monthly Salary <small>(Required)</small></label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">£</span>
                            </div>
                            <input type="text" className={`form-control ${errors.grossMonthlySalary ? "is-invalid" : ""}`} name="grossMonthlySalary" id="grossMonthlySalary"
                                placeholder="Gross Monthly Salary" aria-label="Gross Monthly Salary" aria-describedby="grossMonthlySalary"
                                ref={register({ required: true, pattern: /^[0-9]*$/ })}
                                defaultValue={formData.grossMonthlySalary} />
                            {errors.grossMonthlySalary && <span className="invalid-feedback d-block">This field is required</span>}
                        </div>
                    </div>
                </div>
                <div className="form-row mb-3">
                    <div className="col-24 col-md-7">
                        <label htmlFor="netMonthlySalary">Your Net Monthly Salary <small>(Required)</small></label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">£</span>
                            </div>
                            <input type="text" className={`form-control ${errors.netMonthlySalary ? "is-invalid" : ""}`} name="netMonthlySalary" id="netMonthlySalary"
                                placeholder="Net Monthly Salary" aria-label="Net Monthly Salary" aria-describedby="net"
                                ref={register({ required: true, pattern: /^[0-9]*$/ })}
                                defaultValue={formData.netMonthlySalary} />
                            {errors.netMonthlySalary && <span className="invalid-feedback d-block">This field is required</span>}
                        </div>
                    </div>
                </div>
                <div className="form-row mb-3">
                    <div className="col-24 col-md-7">
                        <label htmlFor="partnerGrossMonthlySalary">Partners Gross Monthly Salary <small>(Required)</small></label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">£</span>
                            </div>
                            <input type="text" className={`form-control ${errors.partnerGrossMonthlySalary ? "is-invalid" : ""}`} name="partnerGrossMonthlySalary" id="partnerGrossMonthlySalary"
                                placeholder="Gross Monthly Salary" aria-label="Gross Monthly Salary" aria-describedby="partnerGross"
                                ref={register({ required: true, pattern: /^[0-9]*$/ })}
                                defaultValue={formData.partnerGrossMonthlySalary} />
                            {errors.partnerGrossMonthlySalary && <span className="invalid-feedback d-block">This field is required</span>}
                        </div>
                    </div>
                </div>
                <div className="form-row mb-3">
                    <div className="col-24 col-md-7">
                        <label htmlFor="partnerNetMonthlySalary">Partners Net Monthly Salary <small>(Required)</small></label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">£</span>
                            </div>
                            <input type="text" className={`form-control ${errors.partnerNetMonthlySalary ? "is-invalid" : ""}`} name="partnerNetMonthlySalary" id="partnerNetMonthlySalary"
                                placeholder="Net Monthly Salary" aria-label="Net Monthly Salary" aria-describedby="partnerNet"
                                ref={register({ required: true, pattern: /^[0-9]*$/ })}
                                defaultValue={formData.partnerNetMonthlySalary} />
                            {errors.partnerNetMonthlySalary && <span className="invalid-feedback d-block">This field is required</span>}
                        </div>
                    </div>
                </div>
                
                <div className="form-row">
                    <div className="col-24 col-md-12">
                        <label>Any Other Income?</label>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-24 col-md-12">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="hasOtherIncomes" id="hasOtherIncomes_no" value="no" ref={register()} defaultChecked={!formData.hasOtherIncomes || formData.hasOtherIncomes === 'no'} />
                            <label className="form-check-label" htmlFor="hasOtherIncomes_no">No</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="hasOtherIncomes" id="hasOtherIncomes_yes" value="yes" ref={register()} defaultChecked={formData.hasOtherIncomes === 'yes'} />
                            <label className="form-check-label" htmlFor="hasOtherIncomes_yes">Yes</label>
                        </div>
                    </div>
                </div>
                {watchHasOtherIncomes === "yes" &&
                    <>
                        <div className="form-row mb-3">
                            <div className="col-24 col-md-7">
                                <label htmlFor="otherIncome">Other Income <small>(Required)</small></label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">£</span>
                                    </div>
                                    <input type="text" className={`form-control ${errors.otherIncome ? "is-invalid" : ""}`} name="otherIncome" id="otherIncome"
                                        placeholder="Other Income amount" aria-label="Other Income amount" aria-describedby="otherIncome"
                                        ref={register({ required: true, pattern: /^[0-9]*$/ })}
                                        defaultValue={formData.otherIncome} />
                                    {errors.otherIncome && <span className="invalid-feedback d-block">Please specify any other incomes.</span>}
                                </div>
                            </div>
                        </div>
                        <div className="form-row mb-3">
                            <div className="col-24 col-md-7">
                                <label htmlFor="otherIncomeDetails">Sources of Other Income</label>
                                <textarea className="form-control" name="otherIncomeDetails" id="otherIncomeDetails" aria-label="Sources of Other Income" aria-describedby="otherIncomeDetails"
                                    placeholder="If applicable please tell additional information that may be relevant to your application"
                                    ref={register()}
                                    defaultValue={formData.otherIncomeDetails}></textarea>
                            </div>
                        </div>
                    </>
                }
                </>
                }
                <div className="form-row d-flex justify-content-end">
                    <button type="button" className="btn btn-outline-secondary mr-3" onClick={onBack}>Back</button>
                    <button type="submit" className="btn btn-primary btn-lg" onClick={() => {handleGATracking()}}>Next</button>
                </div>
            </form>
        </div>
    )
}

export default connect(mapStateToProps)(PersonalStepFive)