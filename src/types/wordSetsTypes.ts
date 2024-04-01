export interface WordSetDTO {
    id: string,
    groupId: string,
    description: string,
    type: string,
    cardType: string,
    items: Array<WordSetItemDTO>
}

export interface WordSetItemDTO {
    type: string,
    metadata: {},
    values: Array<{ key: string, value: string }>

}

export interface WordSetParsed {
    entityId: string,
    entityConcept: string,
    entityTitle: string,
    count: number,
    cloudValue: Array<string | number>
}

export interface CloudWord {
    cloudValue: Array<string | number>,
    concept: string
}