import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-regular-svg-icons";

import { GarageActionTypes } from 'enums/GarageActionTypes';
import { ApiResponse } from 'types/infrastructure/ApiResponse';
import { GarageAction } from 'types/GarageAction';
import { EmailAddressIsValid } from 'helpers/validation';
import { GarageService } from 'business-logic/garageService';

type Props = {
    settings: {
        isDisabled: boolean;
        getData: any;
    }
}

const GarageShareForm: React.FC<Props> = ({ settings }) => {
    const methods = useForm();
    const { register, handleSubmit, errors, reset } = methods;

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = formData => {
        if (!settings.isDisabled && !isLoading) {
            setIsLoading(true);

            const data: GarageAction = {
                actionType: GarageActionTypes.Share,
                email: formData.email,
                vehicles: settings.getData().vehicles
            };

            GarageService.GarageAction(data)
                .then((result: ApiResponse) => {
                    setIsLoading(false);

                    if (result.isSucceed) {
                        reset();
                        alert("Thank you, your garage has been sent.");
                    } else {
                        alert("Failed to share garage.");
                    }
                });
        }
    }

    return (
        <div className="w-100 box bg-white p-0">
            <div className="box__header">Email my comparisons</div>
            <div className="box__content">
                <form className="row" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-24 form-group">
                        <label htmlFor="emailShare">Email Address *</label>
                        <input type="email" className={`form-control ${errors.email ? "is-invalid" : ""}`} id="emailShare" name="email" aria-describedby="email" placeholder="E.g. johnsmith@website.co.uk"
                            maxLength={50}
                            ref={register({
                                required: 'Email is required.',
                                validate: value => EmailAddressIsValid(value) === true || 'Email is invalid.'
                            })}
                        />
                        {errors.email ? (<span className="invalid-feedback d-block">{errors.email?.message}</span>) : null}
                    </div>
                    <div className="col-24">
                        <button type="submit" className="btn btn-outline-secondary btn-lg btn-fluid btn-block" disabled={settings.isDisabled}>
                            {isLoading ? (<FontAwesomeIcon width="16" height="16" icon={faSpinner} className="fa-spin" />) : "Send To Yourself or a Friend"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default GarageShareForm;