import _ from 'underscore';

import { ExtraOption } from 'types/vehicle-options/ExtraOption';
import { ExtraOptionRelationship } from 'types/vehicle-options/ExtraOptionRelationship';
import { ExtraOptionAction } from 'types/components/vehicle-options/ExtraOptionAction';
import { ExtraOptionState } from 'types/components/vehicle-options/ExtraOptionState';
import { ActionsSplit } from 'types/components/vehicle-options/ActionsSplit';
import { ExtraOptionRelationshipOption } from 'types/components/vehicle-options/ExtraOptionRelationshipOption';
import { ExtraOptionConfirmRelationship } from 'types/components/vehicle-options/ExtraOptionConfirmRelationship';

export class VehicleExtraOptionsHelper {
    public static allowedRelationshipTypes = ["OO", "RO", "RA", "NW", "IN", "IO"];

    public static getRelationshipDescription(relationshipType: string): string {
        let result = null;

        if (relationshipType) {
            switch (relationshipType.toUpperCase()) {
                case "OO":
                    result = "From the options below, a maximum of one may be selected. For example, you can only have one type of paintwork.";
                    break;
                case "RO":
                    result = "The option you have chosen must be accompanied by at least one of the additional options in the group below.";
                    break;
                case "RA":
                    result = "The option you have chosen must be accompanied by all of the additional options in the group below.";
                    break;
                case "NW":
                    result = "The option you have chosen cannot be accompanied by any of the options in the group below. For example if wood inlay is chosen it cannot be accompanied by any cloth trim.";
                    break;
                case "IN":
                    result = "Please note the options below are included (at no extra cost) with the option you have chosen which comes as a pack.";
                    break;
                case "IO":
                    result = "The option you have chosen must be accompanied by one option from the group below. The additional option will be no extra cost.";
                    break;
            }
        }

        return result ? result : relationshipType;
    }

    public static getSelectedOptions(options: ExtraOption[], selectedOptionIds: number[]): ExtraOption[] {
        let selectedOptions: ExtraOption[] = [];

        if (options && options.length > 0 && selectedOptionIds && selectedOptionIds.length > 0)
            selectedOptions = _.filter(options, function (option: ExtraOption) {
                return _.contains(selectedOptionIds, option.id);
            });

        return selectedOptions;
    }

    public static getOptionsPrice(options: ExtraOption[], optionsStates: ExtraOptionState[]): number {
        let result = 0;

        if (options) {
            let self = this;

            options.forEach(function (option) {
                result += self.getOptionPrice(option, optionsStates);
            });
        }

        return result;
    }

    public static getOptionPrice(option: ExtraOption, optionsStates: ExtraOptionState[]): number {
        let result = 0;

        if (option) {
            let optionState: ExtraOptionState = this._getOptionState(optionsStates, option.id);

            result = this._getOptionPrice(option, optionState);
        }

        return result;
    }

    public static getOptionsStates(optionIds: number[], relationships: ExtraOptionRelationship[]): ExtraOptionState[] {
        let optionsStates: ExtraOptionState[] = [];

        if (optionIds && relationships) {
            let filteredRelationships = this.getRelationships(relationships, optionIds);

            filteredRelationships.forEach(function (relationship: ExtraOptionRelationship) {
                let primaryOptionIds = relationship.primaryOptionIds;
                let regularOptionIds = relationship.regularOptionIds;
                let isActive = relationship.type === "OO" ||
                    _.intersection(primaryOptionIds, optionIds).length === primaryOptionIds.length;

                if (isActive) {
                    if (relationship.type == "OO") {
                        _.difference(regularOptionIds, optionIds).forEach(function (optionId: number) {
                            let optionState: ExtraOptionState = _.find(optionsStates, function (option: ExtraOptionState) { return option.id === optionId; });

                            if (!optionState) {
                                optionState = {
                                    id: optionId,
                                    selectionRequiredBy: [],
                                    deselectionRequiredBy: []
                                };
                                optionsStates.push(optionState);
                            }

                            optionState.deselectionRequiredBy = _.union(optionState.deselectionRequiredBy, [-1]);
                        });
                    }
                    else if (relationship.type == "RA" || relationship.type == "IN") {
                        let isMirror = relationship.mirrorRelationshipIds && relationship.mirrorRelationshipIds.length > 0;

                        regularOptionIds.forEach(function (optionId: number) {
                            let optionState: ExtraOptionState = _.find(optionsStates, function (option: ExtraOptionState) { return option.id === optionId; });

                            if (!optionState) {
                                optionState = {
                                    id: optionId,
                                    selectionRequiredBy: [],
                                    deselectionRequiredBy: [],
                                    mirrorIn: []
                                };
                                optionsStates.push(optionState);
                            }

                            optionState.selectionRequiredBy = _.union(optionState.selectionRequiredBy, [relationship.id]);
                            optionState.useZeroPrice = optionState.useZeroPrice || relationship.type === "IN";

                            if (isMirror) {
                                optionState.mirrorIn = _.union(optionState.mirrorIn, [relationship.id], relationship.mirrorRelationshipIds);
                            }
                        });
                    }
                }
            });
        }

        return optionsStates;
    }

    public static cloneOptionsStates(optionsStates: ExtraOptionState[]): ExtraOptionState[] {
        return _.map(optionsStates, function (optionState: ExtraOptionState) {
            let result: ExtraOptionState = {
                id: optionState.id,
                selectionRequiredBy: _.clone(optionState.selectionRequiredBy),
                deselectionRequiredBy: _.clone(optionState.deselectionRequiredBy),
                mirrorIn: _.clone(optionState.mirrorIn),
                useZeroPrice: optionState.useZeroPrice
            }

            return result;
        });
    }

    public static getOptionsWithoutRelationships(options: ExtraOption[], optionIds: number[]): ExtraOption[] {
        let filteredOptions: ExtraOption[] = [];

        if (optionIds && optionIds.length > 0) {
            filteredOptions = _.filter(options || [], function (item: ExtraOption) {
                return item && _.contains(optionIds, item.id) && (!item.linkedRelationshipIds || item.linkedRelationshipIds.length === 0);
            });
        }

        return filteredOptions;
    }

    public static getRelationships(relationships: ExtraOptionRelationship[], optionIds: number[]): ExtraOptionRelationship[] {
        let filteredRelationships: ExtraOptionRelationship[] = [];
        let allowedRelationshipTypes: string[] = this.allowedRelationshipTypes;

        if (optionIds && optionIds.length > 0) {
            filteredRelationships = _.filter(relationships || [], function (item: ExtraOptionRelationship) {
                return item && _.contains(allowedRelationshipTypes, item.type) &&
                    (_.intersection(optionIds, item.primaryOptionIds).length > 0 || _.intersection(optionIds, item.regularOptionIds).length > 0);
            });
        }

        return filteredRelationships;
    }

    public static getConfirmRelationship(relationships: ExtraOptionRelationship[], vehicleOptions: ExtraOption[], relationshipId: number, selectedOptionIds: number[], optionsStates: ExtraOptionState[]): ExtraOptionConfirmRelationship {
        let confirmRelationship: ExtraOptionConfirmRelationship = null;

        if (relationships && relationships.length > 0) {
            let relationship: ExtraOptionRelationship = this._getRelationship(relationships, relationshipId);

            if (relationship) {
                confirmRelationship = {
                    id: relationship.id,
                    type: relationship.type,
                    options: []
                };

                let relationshipPrimaryOptions: ExtraOptionRelationshipOption[] = this._getRelationshipOptions(relationship, vehicleOptions, true, selectedOptionIds, optionsStates);
                let relationshipRegularOptions: ExtraOptionRelationshipOption[] = this._getRelationshipOptions(relationship, vehicleOptions, false, selectedOptionIds, optionsStates);

                confirmRelationship.options = _.union(confirmRelationship.options, relationshipPrimaryOptions);
                confirmRelationship.options = _.union(confirmRelationship.options, relationshipRegularOptions);
            }
        }

        return confirmRelationship;
    }

    //is not used at the moment
    //public static disableConfirmRelationshipOptions(confirmRelationship: ExtraOptionConfirmRelationship, selectedOptionIds: number[]) {
    //    if (confirmRelationship.type !== "OO") {
    //        let relationshipPrimaryOptions: ExtraOptionRelationshipOption[] = _.filter(confirmRelationship.options,
    //            function (relationshipOption: ExtraOptionRelationshipOption) {
    //                return relationshipOption.isPrimary;
    //            });

    //        let relationshipRegularOptions: ExtraOptionRelationshipOption[] = _.filter(confirmRelationship.options,
    //            function (relationshipOption: ExtraOptionRelationshipOption) {
    //                return !relationshipOption.isPrimary;
    //            });

    //        let relationshipPrimaryOptionIds: number[] = _.pluck(relationshipPrimaryOptions, 'id');
    //        let relationshipRegularOptionIds: number[] = _.pluck(relationshipRegularOptions, 'id');

    //        let activeRule = _.intersection(relationshipPrimaryOptionIds, selectedOptionIds).length === relationshipPrimaryOptionIds.length;

    //        if (confirmRelationship.type == "RA" || confirmRelationship.type == "IN" || confirmRelationship.type == "NW") {
    //            relationshipRegularOptions.forEach(function (relationshipOption) {
    //                relationshipOption.isDisabled = activeRule;
    //            });
    //        }
    //        else if (confirmRelationship.type == "RO" || confirmRelationship.type == "IO") {
    //            //IO is a separate case
    //            if (activeRule) {
    //                let selectedIds: number[] = _.intersection(selectedOptionIds, relationshipRegularOptionIds);

    //                if (selectedIds.length == 1) {
    //                    relationshipRegularOptions.forEach(function (relationshipOption) {
    //                        relationshipOption.isDisabled = relationshipOption.id === selectedIds[0];
    //                    });
    //                }
    //            }
    //        }
    //    }
    //}

    public static splitOptionIdsByAction(optionsToProcess: ExtraOptionAction[]): ActionsSplit {
        let result: ActionsSplit = {
            selectIds: [],
            deselectIds: []
        };

        if (optionsToProcess && optionsToProcess.length > 0) {
            result.selectIds = _.pluck(_.filter(optionsToProcess,
                function (option: ExtraOptionAction) {
                    return option.selectionRequiredBy.length > 0;
                }), "id");
            result.deselectIds = _.pluck(_.filter(optionsToProcess,
                function (option: ExtraOptionAction) {
                    return option.deselectionRequiredBy.length > 0;
                }), "id");
        }

        return result;
    }

    public static getOptionAction(option, selectedOptionIds: number[]): ExtraOptionAction {
        let result: ExtraOptionAction = null;

        if (option && !option.isDisabled) {
            let optionId = option.id;
            let isSelectAction = !_.contains(selectedOptionIds || [], optionId);

            result = {
                id: optionId,
                selectionRequiredBy: isSelectAction ? [0] : [],
                deselectionRequiredBy: !isSelectAction ? [0] : []
            };
        }

        return result;
    }

    public static optionExists(optionId: number, vehicleOptions: ExtraOption[]): boolean {
        let option: ExtraOption = this._getOption(vehicleOptions, optionId);

        if (option) {
            return true;
        }

        return false;
    }

    private static _getRelationshipOptions(relationship: ExtraOptionRelationship, vehicleOptions: ExtraOption[], primary: boolean, selectedOptionIds: number[], optionsStates: ExtraOptionState[]): ExtraOptionRelationshipOption[] {
        let relationshipOptions: ExtraOptionRelationshipOption[] = [];

        if (relationship !== null && vehicleOptions != null && vehicleOptions.length > 0) {
            let self = this;
            let ids: number[] = primary ? relationship.primaryOptionIds : relationship.regularOptionIds;

            (ids || []).forEach(function (id: number) {
                let option: ExtraOption = self._getOption(vehicleOptions, id);

                if (option) {
                    let optionState: ExtraOptionState = self._getOptionState(optionsStates, option.id);

                    let relationshipOption: ExtraOptionRelationshipOption = {
                        id: option.id,
                        name: option.name,
                        isPrimary: primary,
                        price: self._getOptionPrice(option, optionState),
                        isSelected: _.contains(selectedOptionIds || [], option.id),
                        isDisabled: false
                    };

                    relationshipOptions.push(relationshipOption);
                }
            });

            relationshipOptions = _.sortBy(relationshipOptions, 'name');
        }

        return relationshipOptions;
    }

    private static _getOptionPrice(option: ExtraOption, optionState: ExtraOptionState): number {
        let result = 0;

        if (option) {
            result = (optionState && optionState.useZeroPrice) ? 0 : option.price;
        }

        return result;
    }

    private static _getOptionState(optionsStates: ExtraOptionState[], id: number): ExtraOptionState {
        return _.find(optionsStates, function (item: ExtraOptionState) { return item && item.id === id; });
    }

    private static _getOption(vehicleOptions: ExtraOption[], id: number): ExtraOption {
        return _.find(vehicleOptions, function (item: ExtraOption) { return item && item.id === id; });
    }

    private static _getRelationship(relationships: ExtraOptionRelationship[], id: number): ExtraOptionRelationship {
        return _.find(relationships, function (item: ExtraOptionRelationship) { return item && item.id === id; });
    }
}