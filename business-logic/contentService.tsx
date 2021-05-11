import { VehicleTypes } from "enums/VehicleTypes";
import { LeasingDealTypes } from "enums/LeasingDealTypes";
import { VehicleCategoryTypes } from "enums/VehicleCategoryTypes";
import { CustomContentTypes } from "enums/CustomContentTypes";
import { ContentAPI } from "API/ContentAPI";

export class ContentService {
    public static async GetManufacturePageContent(contentType: number, leasingDealType: LeasingDealTypes, manufacturerUrl: string) {
        return ContentAPI.GetManufacturePageContent(contentType, leasingDealType, manufacturerUrl);
    }

    public static async GetModelPageContent(contentType: number, leasingDealType: LeasingDealTypes, manufacturerUrl: string, modelUrl: string) {
        return ContentAPI.GetModelPageContent(contentType, leasingDealType, manufacturerUrl, modelUrl);
    }

    public static async GetInStockPageContent(vehicleType: VehicleTypes) {
        return ContentAPI.GetCustomPageContent(CustomContentTypes.VehiclesSearchInStock, vehicleType);
    }

    public static async GetBudgetPageContent(vehicleType: VehicleTypes, key: string) {
        return ContentAPI.GetCustomPageContent(CustomContentTypes.VehiclesSearchBudget, vehicleType, key);
    }

    public static async GetBodyTypePageContent(vehicleType: VehicleTypes, bodyType: VehicleCategoryTypes) {
        return ContentAPI.GetCustomPageContent(CustomContentTypes.VehiclesSearchBodyType, vehicleType, `${bodyType}`);
    }

    public static async GetFaqListAll() {
        return ContentAPI.GetFaqListAll();
    }

    public static async GetFaqList(categoryId: number) {
        return ContentAPI.GetFaqList(categoryId);
    }

    public static async GetFaqSearchResults(searchTerm: string, pageIndex: number, pageSize: number) {
        return ContentAPI.GetFaqSearchResults(searchTerm, pageIndex, pageSize);
    }

    public static async GetAdviceGuidesFaqs(categoryId: number = null, take: number = null) {
        return ContentAPI.GetAdviceGuidesFaqs(categoryId, take);
    }

    public static async IncrementLikes(postID: number) {
        return ContentAPI.IncrementLikes(postID);
    }

    public static async IncrementDislikes(postID: number) {
        return ContentAPI.IncrementDislikes(postID);
    }

    public static async GetGuideItems(categoryId: number, pageIndex: number, pageSize: number) {
        return ContentAPI.GetGuideItems(categoryId, pageIndex, pageSize);
    }

    public static async GetGuidesSearchList(categoryId: number, searchTerm: string) {
        return ContentAPI.GetGuidesSearchList(categoryId, searchTerm);
    }

    public static async GetPopularContentItems(tagIds = [], take: number = null) {
        return ContentAPI.GetPopularContentItems(tagIds, take);
    }

    public static async GetContentCategories() {
        return ContentAPI.GetContentCategories();
    }

    public static async GetByUrl(urlString: string, isAmp: boolean = false) {
        return ContentAPI.GetByUrl(urlString, isAmp);
    }

    public static async GetTotalLeasedValues() {
        return ContentAPI.GetTotalLeasedValues();
    }
} 