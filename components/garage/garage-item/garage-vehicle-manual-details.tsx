import React, { useState, useEffect } from 'react';
import { useFormContext } from "react-hook-form";
import style from './garage-item.module.scss';

import { VehicleManualDetails } from 'types/internal/VehicleManualDetails';
import { ExtraOption } from 'types/vehicle-options/ExtraOption';
import { formatMoney, unformat } from 'helpers/currencyHelper';
import { getFieldError, getFieldName } from 'helpers/fieldArrayHelper';

type Props = {
    idx: number;

    data: VehicleManualDetails;
    settings: {
        interiorColors: ExtraOption[];
        exteriorColors: ExtraOption[];
        onTryChangeColor: any;
    };
}

//TODO: implement missing validation rules
//TODO: remove duplicate with vehicle page
//TODO: do we need laber for value? same on vehicle page
const GarageVehicleManualDetailsForm: React.FC<Props> = ({ idx, data, settings }) => {
    const { register, errors, setValue, reset } = useFormContext();

    const collectionName = "garageManualData";

    const fieldName = (name) => {
        return getFieldName(name, collectionName, idx);
    }

    const fieldError = (name: string) => {
        return getFieldError(name, collectionName, idx, errors);
    }

    const [fieldsStates, setFieldsStates] = useState([
        { name: fieldName("dealerOption1Price"), disabled: true },
        { name: fieldName("dealerOption2Price"), disabled: true },
        { name: fieldName("dealerOption3Price"), disabled: true }
    ]);

    useEffect(() => {
        setValue(fieldName("monthlyPrice"), data.monthlyPrice);
        setValue(fieldName("monthlyMaintenancePrice"), data.maintenance ? data.monthlyMaintenancePrice : null);
        setValue(fieldName("initialRentalPrice"), data.initialRentalPrice);

        setValue(fieldName("exteriorColor"), data.exteriorColor);
        setValue(fieldName("interiorColor"), data.interiorColor);

        reset();
    }, [data]);

    const handleColorChange = (evt) => {
        const name = evt.target.name.substring(evt.target.name.indexOf(".") + 1);
        const value = parseInt(evt.target.value) || null;
        const newId = value;
        const prevId = data[name];

        settings.onTryChangeColor(name, prevId, newId);
    }

    const handleDealerOptionChange = (evt) => {
        const name = evt.target.name + "Price";
        const value = evt.target.value;
        const disabled = !value;

        if (disabled) {
            setValue(name, null);
        }

        const fieldState = getFieldState(name);

        if (fieldState && fieldState.disabled !== disabled) {
            setFieldsStates((prevState) => {
                const newStates = prevState.map((item) => {
                    if (item.name === name) {
                        const updatedItem = {
                            ...item,
                            disabled: disabled
                        };

                        return updatedItem;
                    }

                    return item;
                });

                return newStates;
            });
        }
    };

    const handlePriceInput = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;

        setValue(name, value ? formatMoney(unformat(value)) : null);
    }

    const getFieldState = (name: string) => {
        return fieldsStates.find(item => { return item.name === name; });
    }

    return (
        <>
            <div className={`row ${style['garage-column__row']}`}>
                <div className="col-24 py-3">
                    <label>Monthly Price</label>
                    <input name={fieldName("monthlyPrice")} className={`form-control ${fieldError("monthlyPrice") ? "is-invalid" : ""}`} type="text"
                        onBlur={handlePriceInput}
                        ref={register({
                            required: 'Monthly price is required.'
                        })}
                    />
                    {fieldError("monthlyPrice") ? (<span className="invalid-feedback d-block">{fieldError("monthlyPrice")?.message}</span>) : null}
                </div>
            </div>
            {data.maintenance ?
                (
                    <div className={`row ${style['garage-column__row']}`}>
                        <div className="col-24 py-3">
                            <label>Maintenance Price</label>
                            <input name={fieldName("monthlyMaintenancePrice")} className={`form-control ${fieldError("monthlyMaintenancePrice") ? "is-invalid" : ""}`} type="text"
                                defaultValue={data.maintenance ? data.monthlyMaintenancePrice : ''}
                                onBlur={handlePriceInput}
                                ref={register({
                                    required: 'Monthly maintenance price is required.'
                                })}
                            />
                            {fieldError("monthlyMaintenancePrice") ? (<span className="invalid-feedback d-block">{fieldError("monthlyMaintenancePrice")?.message}</span>) : null}
                        </div>
                    </div>
                ) : null
            }
            <div className={`row ${style['garage-column__row']}`}>
                <div className="col-24 py-3">
                    <label>Initial Rental</label>
                    <input name={fieldName("initialRentalPrice")} className={`form-control ${fieldError("initialRentalPrice") ? "is-invalid" : ""}`} type="text"
                        onBlur={handlePriceInput}
                        ref={register({
                            required: 'Initial rental price is required.'
                        })}
                    />
                    {fieldError("initialRentalPrice") ? (<span className="invalid-feedback d-block">{fieldError("initialRentalPrice")?.message}</span>) : null}
                </div>
            </div>
            <div className={`row ${style['garage-column__row']}`}>
                <div className="col-24 py-3">
                    <label>Dealer Option\Price 1</label>
                    <input name={fieldName("dealerOption1")} className="form-control mb-1" type="text" maxLength={100}
                        onChange={handleDealerOptionChange}
                        ref={register}
                    />
                    <input name={fieldName("dealerOption1Price")} className="form-control" type="text"
                        disabled={getFieldState(fieldName("dealerOption1Price")).disabled}
                        onBlur={handlePriceInput}
                        ref={register}
                    />
                </div>
            </div>
            <div className={`row ${style['garage-column__row']}`}>
                <div className="col-24 py-3">
                    <label>Dealer Option\Price 2</label>
                    <input name={fieldName("dealerOption2")} className="form-control mb-1" type="text" maxLength={100}
                        onChange={handleDealerOptionChange}
                        ref={register}
                    />
                    <input name={fieldName("dealerOption2Price")} className="form-control" type="text"
                        disabled={getFieldState(fieldName("dealerOption2Price")).disabled}
                        onBlur={handlePriceInput}
                        ref={register}
                    />
                </div>
            </div>
            <div className={`row ${style['garage-column__row']}`}>
                <div className="col-24 py-3">
                    <label>Dealer Option\Price 3</label>
                    <input name={fieldName("dealerOption3")} className="form-control mb-1" type="text" maxLength={100}
                        onChange={handleDealerOptionChange}
                        ref={register}
                    />
                    <input name={fieldName("dealerOption3Price")} className="form-control" type="text"
                        disabled={getFieldState(fieldName("dealerOption3Price")).disabled}
                        onBlur={handlePriceInput}
                        ref={register}
                    />
                </div>
            </div>
            <div className={`row ${style['garage-column__row']}`}>
                <div className="col-24 py-3">
                    <label>Exterior Colour</label>
                    <select name={fieldName("exteriorColor")} className="form-control" onChange={handleColorChange} ref={register}>
                        <option value="">Not selected</option>
                        <option value="1000">TBC</option>
                        {settings.exteriorColors.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    {data.exteriorColor === 1000 ?
                        (
                            <input name={fieldName("exteriorColorManual")} className="form-control mt-1" type="text" maxLength={200} ref={register} />
                        ) : null
                    }
                </div>
            </div>
            <div className={`row ${style['garage-column__row']}`}>
                <div className="col-24 py-3">
                    <label>Interior Colour</label>
                    <select name={fieldName("interiorColor")} className="form-control" onChange={handleColorChange} ref={register}>
                        <option value="">Not selected</option>
                        <option value="1000">TBC</option>
                        {settings.interiorColors.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    {data.interiorColor === 1000 ?
                        (
                            <input name={fieldName("interiorColorManual")} className="form-control mt-1" type="text" maxLength={200} ref={register} />
                        ) : null
                    }
                </div>
            </div>
        </>
    );
}

export default GarageVehicleManualDetailsForm;