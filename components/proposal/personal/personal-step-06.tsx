import { logLabelEvent } from 'helpers/analytics';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux'

import { ProposalStepProps } from '../types/ProposalStepProps';

const mapStateToProps = (state) => {
    return {
        formData: state.formData,
        stepNumber: state.stepIndicator
    };
}

const PersonalStepSix: React.FC<ProposalStepProps & {
    showTotalMonthlyExpendature: boolean
}> = (props) => {

    const formData = props.formData[props.stepNumber];
    const { register, handleSubmit, errors } = useForm();
    const handleGATracking = () => logLabelEvent('prop_form_tracking_personal', 'Click', 'expenditure-details-completed');
    
    const onSubmit = (data) => {
        if (props.handleFormSave(props.stepNumber, data)) {
            props.handleFormStep(props.stepNumber + 1);
        }
    }

    const onBack = () => props.handleFormStep(props.stepNumber - 1);

    return (
        <div className="w-100 bg-white p-3 p-md-5">
            <h2 className="mb-5">Your Expenditure Details</h2>          
            <h3>Expenditure</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                { props.showTotalMonthlyExpendature && 
                    <>
                    <div className="form-row mb-3">
                    <div className="col-24 col-md-7">
                        <label htmlFor="mortgageRent">Total Monthly Expendature <small>(Required)</small></label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">£</span>
                            </div>
                            <input type="text" className={`form-control ${errors.totalMonthlyExpenditure ? "is-invalid" : ""}`} name="totalMonthlyExpenditure" id="totalMonthlyExpenditure" placeholder="Amount per month"
                                aria-label="Total Monthly Expendature" aria-describedby="totalMonthlyExpenditure"
                                ref={register({ required: true, pattern: /^[0-9]*$/ })}
                                defaultValue={formData.totalMonthlyExpenditure} />
                            {errors.totalMonthlyExpenditure && <span className="invalid-feedback d-block">This field is required</span>}
                        </div>
                    </div>
                    </div>
                    </>
                }   
                
                { !props.showTotalMonthlyExpendature && 
                    <>           
                <div className="form-row mb-3">
                    <div className="col-24 col-md-7">
                        <label htmlFor="mortgageRent">Mortgage / Rent <small>(Required)</small></label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">£</span>
                            </div>
                            <input type="text" className={`form-control ${errors.mortgageRent ? "is-invalid" : ""}`} name="mortgageRent" id="mortgageRent" placeholder="Amount per month"
                                aria-label="Amount per month" aria-describedby="mortgageRent"
                                ref={register({ required: true, pattern: /^[0-9]*$/ })}
                                defaultValue={formData.mortgageRent} />
                            {errors.mortgageRent && <span className="invalid-feedback d-block">This field is required</span>}
                        </div>
                    </div>
                </div>
                <div className="form-row mb-3">
                    <div className="col-24 col-md-7">
                        <label htmlFor="utilityBills">Utility Bills <small>(Required)</small></label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">£</span>
                            </div>
                            <input type="text" className={`form-control ${errors.utilityBills ? "is-invalid" : ""}`} name="utilityBills" id="utilityBills" placeholder="Amount per month"
                                aria-label="Amount per month" aria-describedby="utilityBills"
                                ref={register({ required: true, pattern: /^[0-9]*$/ })}
                                defaultValue={formData.utilityBills} />
                            {errors.utilityBills && <span className="invalid-feedback d-block">This field is required</span>}
                        </div>
                    </div>
                </div>
                <div className="form-row mb-3">
                    <div className="col-24 col-md-7">
                        <label htmlFor="loans">Loans <small>(Required)</small></label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">£</span>
                            </div>
                            <input type="text" className={`form-control ${errors.loans ? "is-invalid" : ""}`} name="loans" id="loans" placeholder="Amount per month"
                                aria-label="Amount per month" aria-describedby="loans"
                                ref={register({ required: true, pattern: /^[0-9]*$/ })}
                                defaultValue={formData.loans} />
                            {errors.loans && <span className="invalid-feedback d-block">This field is required</span>}
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-24 col-md-12">
                        <label>Credit Cards <small>(Required)</small></label> <br /><span>Which of the following (if any) do you own?</span>
                    </div>
                </div>
                <div className="form-row mb-4">
                    <div className="col-24 col-md-12">
                        <div className="form-check form-check-inline">
                            <input type="checkbox" className="form-check-input" aria-label="Visa" id="visaCard" name="visa" ref={register()} defaultChecked={formData.visa} />
                            <label className="form-check-label" htmlFor="visaCard">Visa</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="checkbox" className="form-check-input" aria-label="Mastercard" id="masterCard" name="masterCard" ref={register()} defaultChecked={formData.masterCard} />
                            <label className="form-check-label" htmlFor="masterCard">Mastercard</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="checkbox" className="form-check-input" aria-label="American Express" id="amexCard" name="amex" ref={register()} defaultChecked={formData.amex} />
                            <label className="form-check-label" htmlFor="amexCard">American Express</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="checkbox" className="form-check-input" aria-label="Other" id="otherCard" name="other" ref={register()} defaultChecked={formData.other} />
                            <label className="form-check-label" htmlFor="otherCard">Other</label>
                        </div>
                    </div>
                </div>
                <div className="form-row mb-3">
                    <div className="col-24 col-md-7">
                        <label htmlFor="otherExpenses">Other Expenses <small>(Required)</small></label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">£</span>
                            </div>
                            <input type="text" className={`form-control ${errors.otherExpenses ? "is-invalid" : ""}`} name="otherExpenses" id="otherExpenses" placeholder="Additional Expenses"
                                aria-label="Additional Expenses" aria-describedby="otherExpenses"
                                ref={register({ required: true, pattern: /^[0-9]*$/ })}
                                defaultValue={formData.otherExpenses} />
                            {errors.otherExpenses && <span className="invalid-feedback d-block">This field is required</span>}
                        </div>
                    </div>
                </div>
                <div className="form-row mb-3">
                    <div className="col-24 col-md-7">
                        <label htmlFor="currentCarPayment">Current Car Payment <small>(Required)</small></label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">£</span>
                            </div>
                            <input type="text" className={`form-control ${errors.currentCarPayment ? "is-invalid" : ""}`} name="currentCarPayment" id="currentCarPayment"
                                placeholder="Car Payment" aria-label="Car Payment" aria-describedby="currentCarPayment"
                                ref={register({ required: true, pattern: /^[0-9]*$/ })}
                                defaultValue={formData.currentCarPayment} />
                            {errors.currentCarPayment && <span className="invalid-feedback d-block">This field is required</span>}
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-24 col-md-12">
                        <label htmlFor="replaceCar">Will this replace your current car? <small>(Required)</small></label>
                    </div>
                </div>
                <div className="form-row mb-3">
                    <div className="col-24 col-md-12">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="replacesCurrentCar" id="yes" value="yes" ref={register()} defaultChecked={formData.replacesCurrentCar === 'yes'} />
                            <label className="form-check-label" htmlFor="yes">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="replacesCurrentCar" id="no" value="no" ref={register()} defaultChecked={formData.replacesCurrentCar === 'no'} />
                            <label className="form-check-label" htmlFor="no">No</label>
                        </div>
                    </div>
                </div>
                <div className="form-row mb-3">
                    <div className="col-24 col-md-7">
                        <label htmlFor="notes">Notes</label>
                        <textarea className="form-control" name="notes" id="notes" aria-label="Notes" aria-describedby="notes"
                            placeholder="If applicable please give us any additional information that may be relevant to your application"
                            ref={register()} defaultValue={formData.notes}></textarea>
                    </div>
                </div>              
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

export default connect(mapStateToProps)(PersonalStepSix)