import { SpecialDealTypes } from 'enums/SpecialDealTypes';

export type SpecialDealContent = {
    id: string,
    specialDealType: SpecialDealTypes,
    dealHighlights: string,
    headerTitle: string,
    isHUK: boolean
}