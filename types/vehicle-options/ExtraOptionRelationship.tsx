export type ExtraOptionRelationship = {
    id: number,
    type: string,
    primaryOptionIds: number[],
    regularOptionIds: number[],
    mirrorRelationshipIds: number[]
}