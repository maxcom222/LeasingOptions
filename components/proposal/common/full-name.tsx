import React from 'react';
import { useFormContext } from "react-hook-form";
import { getFieldName, getFieldId, getFieldError } from 'helpers/fieldArrayHelper'

const FullName = ({ collectionName, index, formData, showMiddleName = true,  }) => {

    const { register, errors } = useFormContext();

    const fieldName = (name) => {
        return getFieldName(name, collectionName, index);
    }

    const fieldId = (name) => {
        return getFieldId(name, collectionName, index);
    }

    const fieldError = (name: string, errors: any) => {
        return getFieldError(name, collectionName, index, errors);
    }

    return (
        <>
            <div className="form-row mb-3">
                <div className="col-24 col-md-12 col-lg-6">
                    <label>Title <small>(Required)</small></label>
                    <select className={`form-control ${fieldError("title", errors) ? "is-invalid" : ""}`} name={fieldName("title")}
                        ref={register({ required: true })}
                        defaultValue={formData.title}>
                        <option value="">Please select...</option>
                        <option value="1">Mr</option>
                        <option value="2">Mrs</option>
                        <option value="3">Miss</option>
                        <option value="4">Ms</option>
                        <option value="5">Dr</option>
                        <option value="6">Rev</option>
                        <option value="7">Prof</option>
                        <option value="8">Lt. Col</option>
                        <option value="9">Lord</option>
                    </select>
                    {fieldError("title", errors) && <span className="invalid-feedback d-block">This field is required</span>}
                </div>
            </div>
            <div className="form-row mb-3">
                <div className="col-24 col-md-12">
                    <label>First Name <small>(Required)</small></label>
                    <input type="text" className={`form-control ${fieldError("firstName", errors) ? "is-invalid" : ""}`} name={fieldName("firstName")} placeholder="First Name" maxLength={100}
                        defaultValue={formData.firstName}
                        ref={register({ required: true })} />
                    {fieldError("firstName", errors) && <span className="invalid-feedback d-block">This field is required</span>}
                </div>
            </div>
            { showMiddleName && 
                <div className="form-row mb-3">
                    <div className="col-24 col-md-12">
                        <label>Middle Name</label>
                        <input type="text" className="form-control" name={fieldName("middleName")} placeholder="Middle Name" maxLength={100}
                            ref={register()}
                            defaultValue={formData.middleName} />
                    </div>
                </div>
            }
            <div className="form-row mb-3">
                <div className="col-24 col-md-12">
                    <label>Last Name <small>(Required)</small></label>
                    <input type="text" className={`form-control ${fieldError("lastName", errors) ? "is-invalid" : ""}`} name={fieldName("lastName")} placeholder="Last Name" maxLength={100}
                        ref={register({ required: true })}
                        defaultValue={formData.lastName} />
                    {fieldError("lastName", errors) && <span className="invalid-feedback d-block">This field is required</span>}
                </div>
            </div>
        </>
    )
}

export default FullName