import _ from 'underscore';

import { ExtraOption } from 'types/vehicle-options/ExtraOption';
import { ExtraOptionRelationship } from 'types/vehicle-options/ExtraOptionRelationship';
import { ExtraOptionState } from 'types/components/vehicle-options/ExtraOptionState';
import { ExtraOptionAction } from 'types/components/vehicle-options/ExtraOptionAction';
import { ActionsSplit } from 'types/components/vehicle-options/ActionsSplit';
import { ExtraOptionsManagerState } from 'types/components/vehicle-options/ExtraOptionsManagerState';
import { VehicleExtraOptionsHelper } from './helpers/VehicleExtraOptionsHelper';


export class VehicleExtraOptionsManager {
    //common options data
    private _vehicleOptions: ExtraOption[] = [];
    private _vehicleOptionRelationships: ExtraOptionRelationship[] = [];

    //internal state
    private _selectedOptionIds: number[] = [];
    private _confirmRelationshipIds: number[] = [];
    private _optionsStates: ExtraOptionState[] = [];

    private _clearMangerState() {
        this._confirmRelationshipIds = [];
        this._selectedOptionIds = [];
        this._optionsStates = [];
    };

    public init(options: ExtraOption[], relationships: ExtraOptionRelationship[]) {
        this._vehicleOptions = options || [];
        this._vehicleOptionRelationships = relationships || [];

        this._clearMangerState();
    }

    public processOptions(optionsToProcess: ExtraOptionAction[], confirmRelationshipIds: number[] = null, selectedOptionIds: number[] = null, optionsStates: ExtraOptionState[] = null): ExtraOptionsManagerState {
        this._clearMangerState();

        this._selectedOptionIds = _.clone(selectedOptionIds || []);
        this._confirmRelationshipIds = _.clone(confirmRelationshipIds || []);
        this._optionsStates = VehicleExtraOptionsHelper.cloneOptionsStates(optionsStates || []);

        let silentlySelectedOptionIds: number[] = null;

        if (optionsToProcess && optionsToProcess.length > 0) {
            let selectedOptionIds: number[] = _.clone(this._selectedOptionIds);
            let optionIdsByAction: ActionsSplit = VehicleExtraOptionsHelper.splitOptionIdsByAction(optionsToProcess);

            if (_.intersection(optionIdsByAction.selectIds, optionIdsByAction.deselectIds).length > 0) {
                alert("Action is not allowed.");
                return null;
            }

            let forSilentSelect: number[] = _.pluck(VehicleExtraOptionsHelper.getOptionsWithoutRelationships(this._vehicleOptions, optionIdsByAction.selectIds), 'id');
            let forSilentDeselect: number[] = _.pluck(VehicleExtraOptionsHelper.getOptionsWithoutRelationships(this._vehicleOptions, optionIdsByAction.deselectIds), 'id');
            let optionIdsForSilentApply = _.union(forSilentSelect, forSilentDeselect);

            if (optionIdsForSilentApply.length > 0) {
                selectedOptionIds = _.union(selectedOptionIds, forSilentSelect);
                selectedOptionIds = _.difference(selectedOptionIds, forSilentDeselect);
                this._selectedOptionIds = _.clone(selectedOptionIds);
                silentlySelectedOptionIds = _.clone(selectedOptionIds);
            }

            let optionsToConfirm: ExtraOptionAction[] = _.filter(optionsToProcess, function (optionToProcess: ExtraOptionAction) {
                return !_.contains(optionIdsForSilentApply, optionToProcess.id);
            });

            if (optionsToConfirm != null && optionsToConfirm.length > 0) {
                let confirmDetails = this._getConfirmDetails(optionsToConfirm, selectedOptionIds, this._confirmRelationshipIds, this._optionsStates);

                if (confirmDetails.hasConflicts) {
                    alert("Action is not allowed.");
                    return null;
                }

                let optionsForSilentApply = _.filter(optionsToConfirm, function (option) {
                    let notAny = !_.some(confirmDetails.confirmRelationships, function (confirmRelationship) {
                        let contains = _.contains(confirmRelationship.optionIds, option.id);

                        return contains;
                    });

                    return notAny;
                });

                if (optionsForSilentApply.length > 0) {
                    silentlySelectedOptionIds = _.clone(this._selectedOptionIds);

                    optionIdsByAction = VehicleExtraOptionsHelper.splitOptionIdsByAction(optionsForSilentApply);
                    silentlySelectedOptionIds = _.union(silentlySelectedOptionIds, optionIdsByAction.selectIds);
                    silentlySelectedOptionIds = _.difference(silentlySelectedOptionIds, optionIdsByAction.deselectIds);
                }

                this._selectedOptionIds = confirmDetails.selectedOptionIds;
                this._confirmRelationshipIds = _.pluck(confirmDetails.confirmRelationships, "id");
                this._optionsStates = confirmDetails.optionsStates;
            }
        }

        let result: ExtraOptionsManagerState = {
            selectedOptionIds: _.clone(this._selectedOptionIds),
            confirmRelationshipIds: _.clone(this._confirmRelationshipIds),
            optionsStates: _.clone(this._optionsStates),
            silentlySelectedOptionIds: silentlySelectedOptionIds
        };

        return result;
    }

    private _getConfirmDetails(optionsToConfirm: ExtraOptionAction[], initialSelectedOptionIds: number[], initialConfirmReationshipIds: number[], initialOptionsStates: ExtraOptionState[]) {
        let result = {
            hasConflicts: false,
            selectedOptionIds: [],
            confirmRelationships: [],
            optionsStates: []
        };

        if (optionsToConfirm && optionsToConfirm.length > 0) {
            let currentSelectedOptionIds: number[] = _.clone(initialSelectedOptionIds || []);
            let currentPendingRelationshipIds: number[] = _.clone(initialConfirmReationshipIds || []);
            let currentOptionsStates = VehicleExtraOptionsHelper.cloneOptionsStates(initialOptionsStates || []);
            let iterationOptions: ExtraOptionAction[] = _.clone(optionsToConfirm);

            let iterationResult = this._getConfirmDetailsIteration(iterationOptions, currentSelectedOptionIds, currentOptionsStates);

            while (iterationResult) {
                if (iterationResult.hasConflicts) {
                    result.hasConflicts = true;
                    break;
                }

                iterationOptions.forEach(function (iterationOptionState: ExtraOptionAction) {
                    let optionState: ExtraOptionState = _.find(currentOptionsStates, function (optionState: ExtraOptionState) { return optionState.id === iterationOptionState.id; });

                    if (!optionState) {
                        optionState = {
                            id: iterationOptionState.id,
                            selectionRequiredBy: [],
                            deselectionRequiredBy: [],
                            mirrorIn: []
                        };
                        currentOptionsStates.push(optionState);
                    }

                    optionState.selectionRequiredBy = _.union(optionState.selectionRequiredBy, _.difference(iterationOptionState.selectionRequiredBy, [-1]));
                    optionState.deselectionRequiredBy = _.union(optionState.deselectionRequiredBy, _.difference(iterationOptionState.deselectionRequiredBy, [-1]));
                    optionState.mirrorIn = _.union(optionState.mirrorIn, iterationOptionState.mirrorIn);
                });

                if (iterationResult.recallRestrictionRelationshipIds) {
                    currentOptionsStates.forEach(function (optionState) {
                        optionState.selectionRequiredBy = _.difference(optionState.selectionRequiredBy, iterationResult.recallRestrictionRelationshipIds);
                        optionState.deselectionRequiredBy = _.difference(optionState.deselectionRequiredBy, iterationResult.recallRestrictionRelationshipIds);
                    });
                }

                let selectIds: number[] = _.pluck(_.filter(iterationOptions, function (option: ExtraOptionAction) { return option.selectionRequiredBy.length > 0; }), "id");
                let deselectIds: number[] = _.pluck(_.filter(iterationOptions, function (option: ExtraOptionAction) { return option.deselectionRequiredBy.length > 0; }), "id");

                currentSelectedOptionIds = _.difference(_.union(currentSelectedOptionIds, selectIds), deselectIds);
                currentPendingRelationshipIds = _.union(currentPendingRelationshipIds, iterationResult.confirmRelationshipIds);

                iterationOptions = iterationResult.nextIterationOptions;
                iterationResult = this._getConfirmDetailsIteration(iterationOptions, currentSelectedOptionIds, currentOptionsStates);
            }

            if (!result.hasConflicts) {
                let self = this;
                let optionsStates = currentOptionsStates;
                let selectedOptionIds: number[] = currentSelectedOptionIds;
                let confirmRelationships = [];

                currentPendingRelationshipIds.forEach(function (relationshipId: number) {
                    let relationship: ExtraOptionRelationship = _.find(self._vehicleOptionRelationships, function (item: ExtraOptionRelationship) {
                        return item && item.id === relationshipId;
                    });

                    if (relationship) {
                        let optionIds: number[] = [];

                        optionIds = _.union(optionIds, relationship.primaryOptionIds);
                        optionIds = _.union(optionIds, relationship.regularOptionIds);

                        optionIds = _.filter(optionIds, function (id: number) {
                            return VehicleExtraOptionsHelper.optionExists(id, self._vehicleOptions);
                        });

                        if (optionIds.length > 0) {
                            confirmRelationships.push({
                                id: relationshipId,
                                optionIds: optionIds
                            });
                        }
                    }
                });

                //process empty RO, IO here

                //wrong, should be applied processed items which not covered by confirm rules
                //if ((!confirmRelationships || confirmRelationships.length === 0) && silentApplyAllowed && selectedOptionIds.length > 0) {
                //    if (this.onApply) {
                //        this.onApply(_.clone(selectedOptionIds));
                //    }
                //}

                //cleanup confirm relationships
                //--------------------------
                let emptyRelationships = _.filter(confirmRelationships, function (item) {
                    return _.intersection(item.optionIds, selectedOptionIds).length == 0;
                });

                if (confirmRelationships.length > emptyRelationships.length) {
                    confirmRelationships = _.filter(confirmRelationships, function (item) {
                        return _.intersection(item.optionIds, selectedOptionIds).length > 0;
                    });
                }
                //--------------------------

                //confirmRelationships.forEach(function (confirmRelationship) {
                //    VehicleExtraOptionsHelper.disableConfirmRelationshipOptions(confirmRelationship, selectedOptionIds);
                //});

                let zeroPriceOptionIds: number[] = [];
                let activeINRelationships = _.filter(this._vehicleOptionRelationships, function (relationship: ExtraOptionRelationship) {
                    return relationship && _.contains(VehicleExtraOptionsHelper.allowedRelationshipTypes, relationship.type) && relationship.type === "IN" &&
                        _.intersection(selectedOptionIds, relationship.primaryOptionIds).length === relationship.primaryOptionIds.length;
                });

                if (activeINRelationships && activeINRelationships.length > 0) {
                    activeINRelationships.forEach(function (relationship) {
                        zeroPriceOptionIds = _.union(zeroPriceOptionIds, relationship.regularOptionIds);
                    });
                }

                optionsStates.forEach(function (optionState: ExtraOptionState) {
                    optionState.useZeroPrice = _.contains(zeroPriceOptionIds, optionState.id);
                    optionState.selectionRequiredBy = _.without(optionState.selectionRequiredBy, 0);
                    optionState.deselectionRequiredBy = _.without(optionState.deselectionRequiredBy, 0);
                });

                result.optionsStates = optionsStates;
                result.selectedOptionIds = selectedOptionIds;
                result.confirmRelationships = confirmRelationships;
            }
        }

        return result;
    }

    private _getConfirmDetailsIteration(iterationOptions: ExtraOptionAction[], selectedOptionIds: number[], optionsStates: ExtraOptionState[]) {
        if (iterationOptions && iterationOptions.length > 0) {
            let hasConflicts = false;
            let confirmRelationshipIds: number[] = [];
            let nextIterationOptions: ExtraOptionAction[] = [];
            let recallRestrictionRelationshipIds: number[] = [];

            let requiredOptionIdsByAction = VehicleExtraOptionsHelper.splitOptionIdsByAction(iterationOptions);

            hasConflicts = _.intersection(requiredOptionIdsByAction.selectIds, requiredOptionIdsByAction.deselectIds).length > 0;

            if (!hasConflicts) {
                let uniqueSelectIds: number[] = _.difference(requiredOptionIdsByAction.selectIds, selectedOptionIds);
                let uniqueDeselectIds: number[] = _.intersection(requiredOptionIdsByAction.deselectIds, selectedOptionIds);
                let iterationSelectedOptionIds: number[] = _.difference(_.union(selectedOptionIds, uniqueSelectIds), uniqueDeselectIds);

                let relationshipsToConfirm = VehicleExtraOptionsHelper.getRelationships(this._vehicleOptionRelationships, _.union(uniqueSelectIds, uniqueDeselectIds));

                if (relationshipsToConfirm && relationshipsToConfirm.length > 0) {
                    for (let relationshipIdx = 0; relationshipIdx < relationshipsToConfirm.length; relationshipIdx++) {
                        let relationshipToConfirm = relationshipsToConfirm[relationshipIdx];
                        let primaryOptionIds = relationshipToConfirm.primaryOptionIds;
                        let regularOptionIds = relationshipToConfirm.regularOptionIds;
                        let optionIds: number[] = _.union(primaryOptionIds, regularOptionIds);

                        let selectIntersection: number[] = _.intersection(optionIds, uniqueSelectIds);
                        let deselectIntersection: number[] = _.intersection(optionIds, uniqueDeselectIds);

                        if (selectIntersection.length > 0 && deselectIntersection.length > 0) {

                        }
                        else if (selectIntersection.length > 0) {
                            let isActive = relationshipToConfirm.type === "OO" ||
                                _.intersection(primaryOptionIds, iterationSelectedOptionIds).length === primaryOptionIds.length;

                            if (!isActive) {
                                continue;
                            }

                            for (let i = 0; i < selectIntersection.length; i++) {
                                let optionId = selectIntersection[0];
                                let optionState: ExtraOptionState = _.find(optionsStates, function (optionState: ExtraOptionState) {
                                    return optionState.id === optionId;
                                });

                                if (optionState) {
                                    if (_.difference(optionState.deselectionRequiredBy, [relationshipToConfirm.id, -1]).length > 0) {
                                        hasConflicts = true;
                                        break;
                                    }
                                }
                            }

                            if (hasConflicts) {
                                break;
                            }

                            if (relationshipToConfirm.type == "OO") {
                                if (selectIntersection.length > 1) {
                                    hasConflicts = true;
                                    break;
                                }
                                else {
                                    let selectOptionState: ExtraOptionState = _.find(optionsStates, function (optionState: ExtraOptionState) {
                                        return optionState.id === selectIntersection[0];
                                    });

                                    //if (selectOptionState) {
                                    //    selectOptionState.deselectionRequiredBy = _.without(selectOptionState.deselectionRequiredBy, relationshipToConfirm.id);
                                    //}

                                    _.difference(regularOptionIds, selectIntersection).forEach(function (optionId: number) {
                                        let nextIterationOption: ExtraOptionAction = _.find(nextIterationOptions, function (option: ExtraOptionAction) { return option.id === optionId; });

                                        if (!nextIterationOption) {
                                            nextIterationOption = {
                                                id: optionId,
                                                selectionRequiredBy: [],
                                                deselectionRequiredBy: []
                                            };
                                            nextIterationOptions.push(nextIterationOption);
                                        }

                                        nextIterationOption.deselectionRequiredBy = _.union(nextIterationOption.deselectionRequiredBy, [-1]);
                                    });
                                }
                            }
                            else if (relationshipToConfirm.type == "RA" || relationshipToConfirm.type == "IN") {
                                let isMirror = relationshipToConfirm.mirrorRelationshipIds && relationshipToConfirm.mirrorRelationshipIds.length > 0;

                                regularOptionIds.forEach(function (optionId) {
                                    let nextIterationOption: ExtraOptionAction = _.find(nextIterationOptions, function (option: ExtraOptionAction) { return option.id === optionId });

                                    if (!nextIterationOption) {
                                        nextIterationOption = {
                                            id: optionId,
                                            selectionRequiredBy: [],
                                            deselectionRequiredBy: [],
                                            mirrorIn: []
                                        };
                                        nextIterationOptions.push(nextIterationOption);
                                    }

                                    nextIterationOption.selectionRequiredBy = _.union(nextIterationOption.selectionRequiredBy, [relationshipToConfirm.id]);

                                    if (isMirror) {
                                        nextIterationOption.mirrorIn = _.union(nextIterationOption.mirrorIn, [relationshipToConfirm.id], relationshipToConfirm.mirrorRelationshipIds);
                                    }
                                });
                            }

                            confirmRelationshipIds = _.union(confirmRelationshipIds, [relationshipToConfirm.id]);
                        }
                        else if (deselectIntersection.length > 0) {
                            for (let i = 0; i < deselectIntersection.length; i++) {
                                let optionId = deselectIntersection[i];
                                let optionState: ExtraOptionState = _.find(optionsStates, function (optionState: ExtraOptionState) {
                                    return optionState.id === optionId;
                                });

                                if (optionState && _.difference(optionState.selectionRequiredBy, optionState.mirrorIn).length > 0) {
                                    hasConflicts = true;
                                    break;
                                }
                            }

                            if (hasConflicts) {
                                break;
                            }

                            if (relationshipToConfirm.type == "OO") {
                                if (_.intersection(iterationSelectedOptionIds, optionIds).length == 0) {
                                    recallRestrictionRelationshipIds.push(relationshipToConfirm.id);
                                }
                                confirmRelationshipIds = _.union(confirmRelationshipIds, [relationshipToConfirm.id]);
                            }
                            else if (relationshipToConfirm.type == "RA" || relationshipToConfirm.type == "IN") {
                                let isMirror = relationshipToConfirm.mirrorRelationshipIds && relationshipToConfirm.mirrorRelationshipIds.length > 0;

                                if (isMirror) {
                                    _.difference(optionIds, deselectIntersection).forEach(function (optionId: number) {
                                        let nextIterationOption: ExtraOptionAction = _.find(nextIterationOptions, function (option: ExtraOptionAction) { return option.id === optionId });

                                        if (!nextIterationOption) {
                                            nextIterationOption = {
                                                id: optionId,
                                                selectionRequiredBy: [],
                                                deselectionRequiredBy: [],
                                                mirrorIn: []
                                            };
                                            nextIterationOptions.push(nextIterationOption);
                                        }

                                        nextIterationOption.deselectionRequiredBy = _.union(nextIterationOption.deselectionRequiredBy, [0]);
                                    });
                                }

                                if (_.intersection(primaryOptionIds, iterationSelectedOptionIds).length !== primaryOptionIds.length) {
                                    recallRestrictionRelationshipIds.push(relationshipToConfirm.id);
                                }

                                if (_.intersection(primaryOptionIds, selectedOptionIds).length === primaryOptionIds.length) {
                                    confirmRelationshipIds = _.union(confirmRelationshipIds, [relationshipToConfirm.id]);
                                }
                            }
                        }
                    }
                }
            }

            return {
                hasConflicts: hasConflicts,
                confirmRelationshipIds: hasConflicts ? [] : confirmRelationshipIds,
                nextIterationOptions: hasConflicts ? [] : nextIterationOptions,
                recallRestrictionRelationshipIds: hasConflicts ? [] : recallRestrictionRelationshipIds
            };
        }

        return null;
    }
}