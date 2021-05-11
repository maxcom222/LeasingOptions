export type ExtraOptionAction = {
    id: number,
    selectionRequiredBy: number[],
    deselectionRequiredBy: number[],
    mirrorIn?: number[]
}