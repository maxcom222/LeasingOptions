export type BreadcrumbsSchema = {
	itemListElement: BreadcrumbsElement[]
}

export type BreadcrumbsElement = {
	position: number,
	name: string
	item: string
}