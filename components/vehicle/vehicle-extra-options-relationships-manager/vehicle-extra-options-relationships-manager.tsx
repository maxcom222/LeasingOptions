import React, { useState, useEffect } from 'react';
import { GetVATText } from 'helpers/helpers';
import { formatMoney } from 'helpers/currencyHelper';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { ExtraOption } from 'types/vehicle-options/ExtraOption';
import { ExtraOptionRelationship } from 'types/vehicle-options/ExtraOptionRelationship';
import { ExtraOptionConfirmRelationship } from 'types/components/vehicle-options/ExtraOptionConfirmRelationship';
import { ExtraOptionAction } from 'types/components/vehicle-options/ExtraOptionAction';
import { ExtraOptionsManagerState } from 'types/components/vehicle-options/ExtraOptionsManagerState';
import { VehicleExtraOptionsHelper } from '../_libs/helpers/VehicleExtraOptionsHelper';
import { VehicleExtraOptionsManager } from '../_libs/VehicleExtraOptionsManager';

type Props = {
    options: ExtraOption[];
    relationships: ExtraOptionRelationship[];

    leasingDealType: LeasingDealTypes;

    state: ExtraOptionsManagerState;

    settings: {
        onStateChanged: any;
    }
}

const VehicleExtraOptionsRelationshipsManager: React.FC<Props> = ({ options, relationships, leasingDealType, state, settings }) => {
    const vatText = GetVATText(leasingDealType);

    const [confirmRelationships, setConfirmRelationships] = useState<ExtraOptionConfirmRelationship[]>([]);

    const handleOptionClick = (option) => {
        let optionToProcess: ExtraOptionAction = VehicleExtraOptionsHelper.getOptionAction(option, state.selectedOptionIds);

        if (optionToProcess) {
            let optionsToProcess: ExtraOptionAction[] = [optionToProcess];

            let manager = new VehicleExtraOptionsManager();
            manager.init(options, relationships);

            let managerState: ExtraOptionsManagerState = manager.processOptions(optionsToProcess, state.confirmRelationshipIds, state.selectedOptionIds, state.optionsStates);

            if (managerState) {
                if (settings.onStateChanged) {
                    settings.onStateChanged({
                        confirmRelationshipIds: managerState.confirmRelationshipIds,
                        selectedOptionIds: managerState.selectedOptionIds,
                        optionsStates: managerState.optionsStates
                    });
                }
            }
        }
    }

    useEffect(() => {
        let confirmList: ExtraOptionConfirmRelationship[] = [];

        if (state.confirmRelationshipIds && state.confirmRelationshipIds.length > 0) {
            state.confirmRelationshipIds.forEach(function (relationshipId: number) {
                let confirmRelationship = VehicleExtraOptionsHelper.getConfirmRelationship(relationships, options, relationshipId, state.selectedOptionIds, state.optionsStates);

                if (confirmRelationship) {
                    confirmList.push(confirmRelationship);
                }
            });
        }

        setConfirmRelationships(confirmList);
    }, [state]);

    if (confirmRelationships.length > 0) {
        const totalPrice = VehicleExtraOptionsHelper.getOptionsPrice(VehicleExtraOptionsHelper.getSelectedOptions(options, state.selectedOptionIds), state.optionsStates);

        return (
            <>
                <div className="options-box">
                    {confirmRelationships.map(relationship => (
                        <div key={`rule-${relationship.id}`} className="rule-item">
                            <p className="my-3"><strong className="text-center">{VehicleExtraOptionsHelper.getRelationshipDescription(relationship.type)}</strong></p>
                            <div>
                                {relationship.options.map(option => (
                                    <div key={`option-${option.id}`} className="row">
                                        <div className={`col-16 col-md-20 d-flex flex-row flex-wrap align-items-center my-2`}>{option.isPrimary ? <img className="lazyload mr-2" height="13" alt="Primary icon" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/icon-primary.png`} /> : ""} {option.name}</div>
                                        <div className="col-8 col-md-4 d-flex justify-content-end align-items-center">{formatMoney(option.price)} <span className={`vehicle-option__indicator ${option.isSelected ? "is-active" : ""} ${option.isDisabled ? "is-disabled" : ""}`} onClick={() => handleOptionClick(option)}></span></div>
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    ))
                    }
                </div>
                <div className="options-pricing">
                    <div className="row">
                        <div className="col-16 col-md-19 d-flex flex-row flex-wrap my-2">Total Extras Cost Per Month</div>
                        <div className="col-8 col-md-5 d-flex justify-content-end align-items-center">{formatMoney(totalPrice)} {vatText}</div>
                    </div>
                </div>

            </>
        )
    }

    return null;
}

export default VehicleExtraOptionsRelationshipsManager;