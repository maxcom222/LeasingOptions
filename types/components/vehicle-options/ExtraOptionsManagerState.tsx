import { ExtraOptionState } from './ExtraOptionState';

export type ExtraOptionsManagerState = {
    confirmRelationshipIds: number[],
    selectedOptionIds: number[],
    optionsStates: ExtraOptionState[]
    silentlySelectedOptionIds?: number[]
}