export type ExtraOptionState = {
    id: number,
    selectionRequiredBy: number[],
    deselectionRequiredBy: number[],
    mirrorIn?: number[],
    useZeroPrice?: boolean
}