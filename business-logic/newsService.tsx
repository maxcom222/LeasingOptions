import { NewsTypes } from "enums/NewsTypes";
import { ContentAPI } from "API/ContentAPI";

export class NewsService {

    public static async GetAllNewsArticlePreviews(newsType: NewsTypes, tagIds: Array<number>, pageIndex: number, pageSize: number) {
        return ContentAPI.GetNewsArticlePreviews(newsType, tagIds, pageIndex, pageSize)
    }

    public static async GetRelatedArticles(id: number) {
        return ContentAPI.GetRelatedArticles(id)
    }

    public static async GetNewsArticle(newsArticleId: number, isAmp: boolean = false) {
        return ContentAPI.GetNewsArticle(newsArticleId, isAmp)
    }

    public static async GetTopNews() {
        return ContentAPI.GetTopNews();
    }

    public static async GetCategoryRelatedArticles(newsType: NewsTypes) {
        return ContentAPI.GetCategoryRelatedArticles(newsType);
    }

    public static async GetCategoryPopularArticles(newsType: NewsTypes) {
        return ContentAPI.GetCategoryPopularArticles(newsType);
    }

    public static async GetNewsSearchList(newsType: NewsTypes, searchTerm: string) {
        return ContentAPI.GetNewsSearchList(newsType, searchTerm);
    }
}