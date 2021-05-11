import { NewsTypes } from "enums/NewsTypes";

export type NewsArticle = {
    dislikesCount: number
    likesCount: number
    viewsCount: number
    metaKeywords: string
    metaDescription: string
    metaTitle: string
    newsText: string
    newsTypeId: number,
    imageUrl: string
    videoUrl: string
    newsUrl: string
    onDate: string
    description: string
    title: string
    newsArticleId: number
    tags: Array<string>
    newsType: NewsTypes
}