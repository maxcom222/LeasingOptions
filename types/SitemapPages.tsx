import SitemapItemChangeFrequencies from "../enums/SitemapItemChangeFrequencies";
import SitemapPriorities from "./SitemapPriorities";
import { NewsTypes } from "../enums/NewsTypes";
import { GetCanonicalUrl, GetNewsTypeUrl } from "../helpers/urlHelper";
import { SitemapPageItem } from "types/SitemapPageItem";
import { StaticUrls } from "../enums/StaticUrls";
import moment from "moment";

const modifiedDate = moment().format('YYYY-MM-DD');

export const SitemapDefaultPages: Array<SitemapPageItem> = [
    { name: "Home", url: GetCanonicalUrl(StaticUrls.Home), changeFrequency: SitemapItemChangeFrequencies.yearly, priority: SitemapPriorities._0_5, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Contact Us", url: GetCanonicalUrl(StaticUrls.Contact), changeFrequency: SitemapItemChangeFrequencies.yearly, priority: SitemapPriorities._0_5, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Request Callback", url: GetCanonicalUrl(StaticUrls.RequestCallback), changeFrequency: SitemapItemChangeFrequencies.yearly, priority: SitemapPriorities._0_5, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "About Us", url: GetCanonicalUrl(StaticUrls.OurStory), changeFrequency: SitemapItemChangeFrequencies.yearly, priority: SitemapPriorities._0_5, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Careers", url: GetCanonicalUrl(StaticUrls.Careers), changeFrequency: SitemapItemChangeFrequencies.daily, priority: SitemapPriorities._0_5, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Terms & Conditions", url: GetCanonicalUrl(StaticUrls.TermsAndConditions), changeFrequency: SitemapItemChangeFrequencies.yearly, priority: SitemapPriorities._0_5, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Privacy Policy", url: GetCanonicalUrl(StaticUrls.PrivacyPolicy), changeFrequency: SitemapItemChangeFrequencies.yearly, priority: SitemapPriorities._0_5, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Cookie Policy", url: GetCanonicalUrl(StaticUrls.CookiePolicy), changeFrequency: SitemapItemChangeFrequencies.yearly, priority: SitemapPriorities._0_5, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Car Leasing FAQs", url: GetCanonicalUrl(StaticUrls.FAQ), changeFrequency: SitemapItemChangeFrequencies.monthly, priority: SitemapPriorities._0_5, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Treating Customers Fairly", url: GetCanonicalUrl(StaticUrls.TreatingCustomersFairly), changeFrequency: SitemapItemChangeFrequencies.yearly, priority: SitemapPriorities._0_5, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Fair Wear & Tear", url: GetCanonicalUrl(StaticUrls.FairWearAndTear), changeFrequency: SitemapItemChangeFrequencies.yearly, priority: SitemapPriorities._0_5, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Tax Calculator", url: GetCanonicalUrl(StaticUrls.TaxCalculator), changeFrequency: SitemapItemChangeFrequencies.yearly, priority: SitemapPriorities._0_5, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Complaints", url: GetCanonicalUrl(StaticUrls.Complaints), changeFrequency: SitemapItemChangeFrequencies.yearly, priority: SitemapPriorities._0_5, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Initial Disclosure", url: GetCanonicalUrl(StaticUrls.InitialDisclosure), changeFrequency: SitemapItemChangeFrequencies.yearly, priority: SitemapPriorities._0_5, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Price Promise", url: GetCanonicalUrl(StaticUrls.PricePromise), changeFrequency: SitemapItemChangeFrequencies.yearly, priority: SitemapPriorities._0_5, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Car Valuation", url: GetCanonicalUrl(StaticUrls.ValueYourCar), changeFrequency: SitemapItemChangeFrequencies.yearly, priority: SitemapPriorities._0_5, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Business Car Leasing", url: GetCanonicalUrl(StaticUrls.BussinessDeals), changeFrequency: SitemapItemChangeFrequencies.always, priority: SitemapPriorities._1_0, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Personal Car Leasing", url: GetCanonicalUrl(StaticUrls.PersonalDeals), changeFrequency: SitemapItemChangeFrequencies.always, priority: SitemapPriorities._1_0, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Van Leasing", url: GetCanonicalUrl(StaticUrls.VanDeals), changeFrequency: SitemapItemChangeFrequencies.always, priority: SitemapPriorities._1_0, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Short Term Car Leasing", url: GetCanonicalUrl(StaticUrls.ShortTermCarLeasing), changeFrequency: SitemapItemChangeFrequencies.always, priority: SitemapPriorities._1_0, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Short Term Van Leasing", url: GetCanonicalUrl(StaticUrls.ShortTermVanLeasing), changeFrequency: SitemapItemChangeFrequencies.always, priority: SitemapPriorities._1_0, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Lancashire Cricket Club Partnership", url: GetCanonicalUrl(StaticUrls.Lccc), changeFrequency: SitemapItemChangeFrequencies.always, priority: SitemapPriorities._0_5, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Customer Testimonials", url: GetCanonicalUrl(StaticUrls.CustomerTestimonials), changeFrequency: SitemapItemChangeFrequencies.always, priority: SitemapPriorities._0_5, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Lancashire County Cricket Club Special Offer", url: GetCanonicalUrl(StaticUrls.LcccOffer), changeFrequency: SitemapItemChangeFrequencies.always, priority: SitemapPriorities._0_5, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Movie Cars", url: GetCanonicalUrl(StaticUrls.MovieCars), changeFrequency: SitemapItemChangeFrequencies.monthly, priority: SitemapPriorities._0_5, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Insured Vehicle Leasing", url: GetCanonicalUrl(StaticUrls.CarLeasingWithInsurance), changeFrequency: SitemapItemChangeFrequencies.monthly, priority: SitemapPriorities._1_0, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Drive To A Kill", url: GetCanonicalUrl(StaticUrls.DriveToAKill), changeFrequency: SitemapItemChangeFrequencies.monthly, priority: SitemapPriorities._1_0, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Car Leasing Deals", url: GetCanonicalUrl(StaticUrls.CarSpecialOffers), changeFrequency: SitemapItemChangeFrequencies.monthly, priority: SitemapPriorities._1_0, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Look after my car", url: GetCanonicalUrl(StaticUrls.LookAfterMyCar), changeFrequency: SitemapItemChangeFrequencies.monthly, priority: SitemapPriorities._1_0, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "My garage", url: GetCanonicalUrl(StaticUrls.MyGarage), changeFrequency: SitemapItemChangeFrequencies.monthly, priority: SitemapPriorities._1_0, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Van leasing deals", url: GetCanonicalUrl(StaticUrls.VanSpecialOffers), changeFrequency: SitemapItemChangeFrequencies.monthly, priority: SitemapPriorities._1_0, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Electric Hybrid Car Leasing", url: GetCanonicalUrl(StaticUrls.ElectricHybridLeasing), changeFrequency: SitemapItemChangeFrequencies.monthly, priority: SitemapPriorities._1_0, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Types", url: GetCanonicalUrl(StaticUrls.ElectricTypes), changeFrequency: SitemapItemChangeFrequencies.monthly, priority: SitemapPriorities._1_0, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Charging", url: GetCanonicalUrl(StaticUrls.ElectricCharging), changeFrequency: SitemapItemChangeFrequencies.monthly, priority: SitemapPriorities._1_0, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Government Grants", url: GetCanonicalUrl(StaticUrls.ElectricGrants), changeFrequency: SitemapItemChangeFrequencies.monthly, priority: SitemapPriorities._1_0, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Hydrogen Car Leasing", url: GetCanonicalUrl(StaticUrls.HydrogrenLeasing), changeFrequency: SitemapItemChangeFrequencies.monthly, priority: SitemapPriorities._1_0, modifiedOn: moment().format('YYYY-MM-DD') }
];

export const SitemapDefaultNewsPages: Array<SitemapPageItem> = [
    { name: "News", url: GetCanonicalUrl(StaticUrls.News), changeFrequency: SitemapItemChangeFrequencies.always, priority: SitemapPriorities._0_5, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Latest News", url: GetCanonicalUrl(GetNewsTypeUrl(StaticUrls.LatestNews)), changeFrequency: SitemapItemChangeFrequencies.always, priority: SitemapPriorities._0_5, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Vehicle Reviews", url: GetCanonicalUrl(GetNewsTypeUrl(StaticUrls.VehicleReviews)), changeFrequency: SitemapItemChangeFrequencies.always, priority: SitemapPriorities._0_5, modifiedOn: moment().format('YYYY-MM-DD') },
    { name: "Blog", url: GetCanonicalUrl(GetNewsTypeUrl(StaticUrls.Blog)), changeFrequency: SitemapItemChangeFrequencies.always, priority: SitemapPriorities._0_5, modifiedOn: moment().format('YYYY-MM-DD') }
]

