import { LeasingDealTypes } from "enums/LeasingDealTypes";
import { NewsTypes } from "enums/NewsTypes";
import { Page } from "types/Page";
import { VehicleTypes } from "../enums/VehicleTypes";
import { isNullOrWhiteSpace } from "./stringHelper";
import { GetNewsTypeUrl } from "./urlHelper";
import  { StaticUrls }  from "../enums/StaticUrls";
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { getBaseUrl } from 'helpers/urlsHelper';
import { MetaData } from 'types/infrastructure/MetaData';

const internaalIdentifier = "/internal";

const pages: Array<Page> = [
    {
        url: "/",
        metaData: {
            title: "Leasing Options | 5* Professional & Personal Vehicle Leasing Service",
            description: "Business & Personal Car Leasing Deals from Leasing Options UK - {0} Years Experience, FREE Instant Quotes & Price Match Promise on our Car Lease Deals.",// CurrentAppContext.Years),
            keywords: "Car Leasing, Business Car Leasing, Car Lease Deals, Car Leasing Manchester, Contract Hire"
        }
    },
    {
        url: StaticUrls.Careers,
        metaData: {
            title: "Car Leasing Industry Career Opportunities | Jobs at Leasing Options",
            description: "Looking for a career in Car Leasing? Find out more about a career with Leasing Options, an established market leader in the Leasing Industry.",
            keywords: ""
        }
    },
    {
        url: StaticUrls.Complaints,
        metaData: {
            title: "Complaints Procedure | Leasing Options ",
            description: "Let us help you resolve your complaint, find details of how Leasing Options can help.",
            keywords: ""
        }
    },
    {
        url: StaticUrls.Contact,
        metaData: {
            title: "Contact Us | Leasing Options the UK Car Leasing Specialist",
            description: "Find details on how to contact us. Here at Leasing Options we have a unique team of Leasing Experts to assist you with any of your needs.",
            keywords: ""
        }
    },
    {
        url: StaticUrls.Dealometer,
        metaData: {
            title: "Find the Best Car Lease Deals using our DealOmeter | Leasing Options",
            description: "Use our new DealOmeter tool to find your perfect car lease deal by searching by the type of car, fuel and drive of the car.",
            keywords: ""
        }
    },
    {
        url: StaticUrls.FairWearAndTear,
        metaData: {
            title: "BVRLA Fair Wear and Tear Policy | Leasing Options",
            description: "What is Fair Wear and Tear on a leased car? Find out with our outline of the BVRLA's Fair Wear and Tear policy.",
            keywords: ""
        }
    },
    {
        url: StaticUrls.FAQ,
        metaData: {
            title: "Frequently Asked Car Leasing Questions | Leasing Options",
            description: "Find answers to some of the most frequently asked Car Leasing questions or contact us directly to get an answer.",
            keywords: ""
        }
    },
    {
        url: StaticUrls.InitialDisclosure,
        metaData: {
            title: "Initial Disclosure Document | Leasing Options",
            description: "Read the Leasing Options Limited Initial Disclosure Policy Document.",
            keywords: ""
        }
    },
    {
        url: StaticUrls.MyGarage,
        metaData: {
            title: "Compare Car Lease Deals: Comparison Garage | Leasing Options",
            description: "Use the My Garage Leasing Options tool to quickly and easily compare Cars and Car Lease Deals to find your perfect lease.",
            keywords: ""
        }
    },
    {
        url: StaticUrls.OurStory,
        metaData: {
            title: "About Leasing Options Ltd & Nigel Brain: UK Car Leasing Specialist",
            description: "Find out more about who Leasing Options are and how Nigel has grown the company over the last {0} years!", //CurrentAppContext.Years),
            keywords: ""
        }
    },
    {
        url: StaticUrls.PricePromise,
        metaData: {
            title: "Price Match Promise | £50 if we cant Price Match | Leasing Options",
            description: "Leasing Options offer competitive Leasing Deals and if you find a cheaper price elsewhere we will match it and offer £50 off!",
            keywords: ""
        }
    },
    {
        url: StaticUrls.PrivacyAndCookiePolicy,
        metaData: {
            title: "Privacy & Cookie Policy | Leasing Options",
            description: "Read details of the Leasing Options Limited Privacy & Cookie Policy.",
            keywords: ""
        }
    },
    {
        url: StaticUrls.PrivacyPolicy,
        metaData: {
            title: "Privacy Policy | Leasing Options",
            description: "Read details of the Leasing Options Limited Privacy Policy.",
            keywords: ""
        }
    },
    {
        url: StaticUrls.CookiePolicy,
        metaData: {
            title: "Cookie Policy | Leasing Options",
            description: "Read details of the Leasing Options Limited Cookie Policy.",
            keywords: ""
        }
    },
    {
        url: StaticUrls.RequestCallback,
        metaData: {
            title: "Request a Callback - Talk to one of our friendly Team | Leasing Options",
            description: "Our team of experts are here to help you find your perfect vehicle and answer any questions you may have about Leasing.",
            keywords: ""
        }
    },
    {
        url: StaticUrls.TermsAndConditions,
        metaData: {
            title: "Terms & Conditions | Leasing Options",
            description: "Read details our Terms and Conditions.",
            keywords: ""
        }
    },
    {
        url: "/sitemap",
        metaData: {
            title: "Sitemap | Leasing Options",
            description: "View the Leasing Options Sitemap to help you navigate our site.",
            keywords: ""
        }
    },
    {
        url: StaticUrls.TreatingCustomersFairly,
        metaData: {
            title: "Treating Our Customers Fairly | Leasing Options",
            description: "Providing customers with an excellent level of service & treating customers fairly has been at the core of our business philosophy.",
            keywords: ""
        }
    },
    {
        url: StaticUrls.News,
        metaData: {
            title: "Car Leasing News | Latest news from Leasing options in Manchester",
            description: "Read the latest news from the Motoring Industry as well as news about the Leasing Industry brought to you from Industry experts.",
            keywords: ""
        }
    },
    {
        url: StaticUrls.TaxCalculator,
        metaData: {
            title: "What is BIK (Benefit In Kind) Tax | Leasing Options",
            description: "What is Benefit In Kind (BIK) Tax? How is it calculated? Find the answers to your BIK Car Tax questions here - Leasing Options",
            keywords: ""
        }
    },
    {
        url: StaticUrls.ValueYourCar,
        metaData: {
            title: "Part Exchange Car Lease - Value Your Car | Leasing Options",
            description: "Value your car online now with Leasing Options and work out how much you can put towards your new car leasing deal. You'll even have your car picked up for free!",
            keywords: ""
        }
    },
    {
        url: "/car-leasing-deals",
        metaData: {
            title: "Best Car Lease Deals & Special Offers | Leasing Options",
            description: "Take advantage of our best car lease deals. Personal & business lease deals available all in one place, vehicles delivered anywhere in the UK.",
            keywords: ""
        }
    },
    {
        url: "/van-leasing-deals",
        metaData: {
            title: "Best Van Lease Deals & Special Offers | Leasing Options",
            description: "Take advantage of our best van lease deals. Personal & business lease deals available all in one place, vehicles delivered anywhere in the UK.",
            keywords: ""
        }
    },
    {
        url: StaticUrls.VED,
        metaData: {
            title: "Car Tax – Vehicle Excise Duty (VED) 2017 Changes | Leasing Options",
            description: "Vehicle Excise Duty (VED) car tax is due to change from 1st April 2017, take a look at what is changing and how this might impact you.",
            keywords: ""
        }
    },
    {
        url: StaticUrls.Lccc,
        metaData: {
            title: "Lancashire Cricket Club Partnership | Leasing Options",
            description: "Find out more about the partnership between Lancashire Cricket Club and Leasing Options.",
            keywords: ""
        }
    },
    {
        url: GetNewsTypeUrl(NewsTypes.LatestNews),
        metaData: {
            title: "Car Leasing Industry News | Leasing Options",
            description: "Stay up-to-date with the car leasing industry news, featuring the latest developments in the car leasing market | Leasing Options",
            keywords: ""
        }
    },
    {
        url: GetNewsTypeUrl(NewsTypes.VehicleReviews),
        metaData: {
            title: "Vehicle Reviews – Car & Van Reviews | Leasing Options",
            description: "Read through our unbiased vehicle reviews to help you make a decision when looking for your perfect car | Leasing Options",
            keywords: ""
        }
    },
    {
        url: GetNewsTypeUrl(NewsTypes.Blog),
        metaData: {
            title: "Leasing Options Blog - Car Leasing Blog",
            description: "Read the latest from Leasing Options on our car leasing blog, featuring our latest company updates and developments | Leasing Options",
            keywords: ""
        }
    },
    {
        url: StaticUrls.CustomerTestimonials,
        metaData: {
            title: "Car Leasing Customer Testimonials | Leasing Options",
            description: "Watch our Customer Testimonial video and find out what happy customers who took advantage of our Car Leasing deals have to say, on LeasingOptions.co.uk",
            keywords: ""
        }
    },
    {
        url: StaticUrls.LcccOffer,
        metaData: {
            title: "Lancashire County Cricket Club Special Offer | Leasing Options",
            description: "Read about our Lancashire County Cricket Club Special Offer.",
            keywords: ""
        }
    },
    {
        url: StaticUrls.MovieCars,
        metaData: {
            title: "Iconic Movie Cars Quiz | Leasing Options UK",
            description: "The perfect game if you love cars and movies. Find the iconic movie cars hidden in this fantastic city-scape.",
            keywords: ""
        }
    },
    {
        url: StaticUrls.LookAfterMyCar,
        metaData: {
            title: "Look After My Car | Leasing Options UK",
            description: "",
            keywords: ""
        }
    },
    {
        url: StaticUrls.CarLeasingWithInsurance,
        metaData: {
            title: "Car Leasing With Insurance | Leasing Options UK",
            description: "Get everything in one package with our Fuel & Go car leasing with insurance deals. Includes maintenance, repairs & breakdown cover. Enquire today.",
            keywords: ""
        }
    }
]
export const RemoveInternalIdentifier = (urlPath: string) => {

    if (urlPath == "/internal") {
        return "/";
    }
    else if (urlPath.startsWith(internaalIdentifier)) {
        return urlPath.replace(internaalIdentifier, "");
    } else {
        return urlPath;
    }
}

export const getPage = (urlPath: string) => {
    return pages.find((x) => {
        return x.url == urlPath
    });
}
export const TopPageMetaDescription = (leasingDealType: LeasingDealTypes, URLpath: string) => {

    var result = "";

    URLpath = RemoveInternalIdentifier(URLpath);

    result = getPage(URLpath)?.metaData?.description;

    if (isNullOrWhiteSpace(result)) {
        switch (leasingDealType) {
            case LeasingDealTypes.Business:
            default:
                result = "The best business car leasing deals available now at Leasing Options. A huge range of affordable contract hire vehicles with a 5-star Trustpilot rating.";
                break;
            case LeasingDealTypes.Personal:
                result = "Get the best car leasing deals for personal contract hire from Leasing Options. Vehicles delivered anywhere in the UK. Get your FREE instant quote, today.";
                break;
            case LeasingDealTypes.Van:
                result = "Leasing Options offer the most competitive van lease deals in the marketplace. We will not be beaten on price for long term van hire.";
                break;
            case LeasingDealTypes.None:
                result = getPage("/")?.metaData?.description;
                break;
        }
    }

    return result;
}

export const MakePageMetaTitle = (leasingDealType: LeasingDealTypes, manufacturer: string): string => {
    let metaTitle = null;

    switch (leasingDealType) {
        case LeasingDealTypes.Business:
        case LeasingDealTypes.Personal:
            metaTitle = `${manufacturer} Lease Deals | ${manufacturer} Car Leasing | Leasing Options`;
            break;
        case LeasingDealTypes.Van:
            metaTitle = `${manufacturer} Van Leasing | ${manufacturer} Van Lease Deals | Leasing Option`;
            break;
    }

    return metaTitle;
}

export const MakePageMetaDescription = (leasingDealType: LeasingDealTypes, manufacturer: string): string => {
    let metaDescription = null;

    switch (leasingDealType) {
        case LeasingDealTypes.Business:
        case LeasingDealTypes.Personal:
            metaDescription = `Search our ${manufacturer} Car Lease Deals today from Leasing Options Limited. We offer FREE instant quotes & Price Match Promise on all our Car Leases.`;
            break;
        case LeasingDealTypes.Van:
            metaDescription = `Search our ${manufacturer} Van Lease Deals today from Leasing Options Limited. We offer FREE instant quotes & Price Match Promise on all our Van Leases.`;
            break;
    }

    return metaDescription;
}

export const ModelPageMetaTitle = (leasingDealType: LeasingDealTypes, manufacturer: string, model: string): string => {
    let metaTitle = null;

    switch (leasingDealType) {
        case LeasingDealTypes.Business:
        case LeasingDealTypes.Personal:
            metaTitle = manufacturer + " " + model + " Car Lease Deals & Contract Hire | Leasing Options";
            break;
        case LeasingDealTypes.Van:
            metaTitle = manufacturer + " " + model + " Van Lease Deals & Long Term Hire | Leasing Options";
            break;
    }

    return metaTitle;
}

export const ModelPageMetaDescription = (leasingDealType: LeasingDealTypes, manufacturer: string, model: string): string => {
    let metaDescription = null;

    switch (leasingDealType) {
        case LeasingDealTypes.Business:
        case LeasingDealTypes.Personal:
            metaDescription = `Browse the range of ${manufacturer} ${model} Car Lease Deals available with Leasing Options Limited. We offer FREE instant quotes & we will Price Match.`;
            break;
        case LeasingDealTypes.Van:
            metaDescription = `Browse the range of ${manufacturer} ${model} Van Lease Deals today from Leasing Options Limited. We offer FREE instant quotes & we will Price Match.`
            break;
    }

    return metaDescription;
}

export const SearchPageTitle = (vehicleType: VehicleTypes) => {
    let result = "";

    if (vehicleType == VehicleTypes.Car) {
        result = `Car Leasing | Personal Lease Deals &amp; Contract Hire | Leasing Options`;
    } else if (vehicleType == VehicleTypes.Commercial) {
        result = `Check out our in stock van lease deals and drive a brand-new vehicle in less than two weeks.`;
    }

    return result;
}


export const GetNewsCategoryPageTitle = (newsType: NewsTypes) => {
    let result = "";

    if (newsType == NewsTypes.LatestNews) {
        result = `Car Leasing Industry News | Leasing Options`;
    } else if (newsType == NewsTypes.VehicleReviews) {
        result = `Vehicle Reviews – Car & Van Reviews | Leasing Options`;
    } else if (newsType == NewsTypes.Blog) {
        result = `Leasing Options Blog - Car Leasing Blog`;
    }
    return result;
}

export const GetNewsCategoryPageMetaDescription = (newsType: NewsTypes) => {
    let result = "";

    if (newsType == NewsTypes.LatestNews) {
        result = `Stay up-to-date with the car leasing industry news, featuring the latest developments in the car leasing market | Leasing Options`;
    } else if (newsType == NewsTypes.VehicleReviews) {
        result = `Read through our unbiased vehicle reviews to help you make a decision when looking for your perfect car | Leasing Options`;
    } else if (newsType == NewsTypes.Blog) {
        result = `Read the latest from Leasing Options on our car leasing blog, featuring our latest company updates and developments | Leasing Options`;
    }
    return result;
}

export const GetNewsCategoryPageKeywords = () => {
    return "Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire"
}

export const GetNewsCategoryPageMetaImageDescription = (newsType: NewsTypes) => {
    let result = "";

    if (newsType == NewsTypes.LatestNews) {
        result = process.env.NEXT_PUBLIC_CDN + '/website/news/page-banner--latest-news.png';
    } else if (newsType == NewsTypes.VehicleReviews) {
        result = process.env.NEXT_PUBLIC_CDN + '/website/news/page-banner--vehicle-reviews.png';
    } else if (newsType == NewsTypes.Blog) {
        result = process.env.NEXT_PUBLIC_CDN + '/website/news/page-banner--blog.png';
    }
    return result;
}

export const GetBodyTypePageMetaImage = (bodyType) => {
    let result = "";

    if (bodyType == 'suv-crossover') {
        result = 'suv';
    } else if (bodyType == 'convertible-cabriolet') {
        result = 'convertible';
    } else if (bodyType == 'sports-car') {
        result = 'sportscar';
    } else if (bodyType == 'small') {
        result = 'small-van';
    } else if (bodyType == 'medium') {
        result = 'medium-van';
    } else if (bodyType == 'large') {
        result = 'large-van';
    } else if (bodyType == 'crew') {
        result = 'crew-van';
    } else if (bodyType == 'luton') {
        result = 'luton-van';
    }
    return result;
}

export const VehiclePageTitle = (vehicleType: VehicleTypes, make: string, model: string, derivative: string) => {
    let result = "";

    // Temp: Ford Ford Rapter
    if (make === "Ford" && model === "Ranger Diesel" && derivative === "Pick Up Double Cab Raptor 2.0 EcoBlue 213 Auto") {
        result = "Ford Ranger Raptor Lease: Diesel Pick Up Double Cab Raptor 2.0 EcoBlue 213 Auto | Leasing Options";
    } else {
        if (vehicleType !== VehicleTypes.None) {
            //Make, model needs to be capitalized
            result = make + " " + model + " " + derivative + " " + (vehicleType === VehicleTypes.Commercial ? "Van" : "Car") + " Lease Deals | Leasing Options";
        }
    }

    return result;
}

export const VehicleMetaDescription = (vehicleType: VehicleTypes, make: string, shortModel: string, derivative: string) => {
    let result = "";

    switch (vehicleType) {
        case VehicleTypes.Car:
            result = `Find your perfect ${make.toUpperCase()} ${shortModel.toUpperCase()} ${derivative} lease deal. We offer FREE instant quotes & we will Price Match.`;
            break;
        case VehicleTypes.Commercial:
            result = `Find your perfect ${make.toUpperCase()} ${shortModel.toUpperCase()} ${derivative} lease deal. We offer FREE instant quotes & we will Price Match.`;
            break;
    }

    return result;
}

export const GetAdviceCategoryMeta = (categoryId, url) => {
    let metaData: MetaData = {
        title: "",
        description: "",
        canonicalUrl: "",
        keywords: "",
        imageUrl: "",
    }

    switch (categoryId) {
        case 14:
            metaData = {
                title: "Personal Leasing Guides | Leasing Options",
                description: "Find answers to the most popular questions around personal leasing with our handy guides.",
                canonicalUrl: GetCanonicalUrl(getBaseUrl(url)),
                keywords: '',
                imageUrl: process.env.NEXT_PUBLIC_CDN + "/website/news/page-banner--blog.png",
            }
            break;
        case 8:
            metaData = {
                title: "Popular Topics | Leasing Guides | Leasing Options",
                description: "The most popular car leasing topics covered in one place. Get the answers to all your leasing questions here in our handy guides.",
                canonicalUrl: GetCanonicalUrl(getBaseUrl(url)),
                keywords: '',
                imageUrl: process.env.NEXT_PUBLIC_CDN + "/website/news/page-banner--blog.png",
            }
            break;
        case 9:
            metaData = {
                title: "Business Leasing Guides | Leasing Options",
                description: "See how you could save money on a brand-new company car. Find useful information on tax, benefits and more in our business leasing guides.",
                canonicalUrl: GetCanonicalUrl(getBaseUrl(url)),
                keywords: '',
                imageUrl: process.env.NEXT_PUBLIC_CDN + "/website/news/page-banner--blog.png",
            }
            break;
        case 13:
            metaData = {
                title: "Van Leasing Guides | Leasing Options",
                description: "Find everything you need to know in our van leasing guides. Learn about tax, insurance, benefits and more to see how leasing a van could save you cash.",
                canonicalUrl: GetCanonicalUrl(getBaseUrl(url)),
                keywords: '',
                imageUrl: process.env.NEXT_PUBLIC_CDN + "/website/news/page-banner--blog.png",

            }
            break;
        case 10:
            metaData = {
                title: "Costs | Car Leasing Guides | Leasing Options",
                description: "Everything you need to know about the costs of car leasing. Learn about pricing, depreciation and how to get the best deal on your next car.",
                canonicalUrl: GetCanonicalUrl(getBaseUrl(url)),
                keywords: '',
                imageUrl: process.env.NEXT_PUBLIC_CDN + "/website/news/page-banner--blog.png",
            }
            break;
        case 15:
            metaData = {
                title: "Vehicle Care | Car Leasing Guides | Leasing Options",
                description: "Get advice on how to care for and maintain your car for the duration of your lease with our handy guides.",
                canonicalUrl: GetCanonicalUrl(getBaseUrl(url)),
                keywords: '',
                imageUrl: process.env.NEXT_PUBLIC_CDN + "/website/news/page-banner--blog.png",
            }
            break;
        case 11:
            metaData = {
                title: "Choosing Your Car | Leasing Guides | Leasing Options",
                description: "Finding the right lease car can be a hard choice. Get help and advice on choosing your next car with complete guides and reviews from Leasing Options.",
                canonicalUrl: GetCanonicalUrl(getBaseUrl(url)),
                keywords: '',
                imageUrl: process.env.NEXT_PUBLIC_CDN + "/website/news/page-banner--blog.png",
            }
            break;
        case 16:
            metaData = {
                title: "PCP & Other Finance | Leasing Guides | Leasing Options",
                description: "Find out about other ways you can finance a new car, to help you make an informed decision when considering leasing, using our handy guides.",
                canonicalUrl: GetCanonicalUrl(getBaseUrl(url)),
                keywords: '',
                imageUrl: process.env.NEXT_PUBLIC_CDN + "/website/news/page-banner--blog.png",
            }
            break;
        case 2:
            metaData = {
                title: "How to Get the Best Car for Your Budget | Leasing Options",
                description: "No matter how much you want to spend each month, you can still drive a brand-new car. Find out more here in our car budget guides from Leasing Options.",
                canonicalUrl: GetCanonicalUrl(getBaseUrl(url)),
                keywords: '',
                imageUrl: process.env.NEXT_PUBLIC_CDN + "/website/news/page-banner--blog.png",
            }
            break;
        case 17:
            metaData = {
                title: "Compare Cars | Leasing Guides | Leasing Options",
                description: "Stuck between which car to lease? Use our handy guides to compare the pros and cons of similar spec cars, to help you make the right choice.",
                canonicalUrl: GetCanonicalUrl(getBaseUrl(url)),
                keywords: '',
                imageUrl: process.env.NEXT_PUBLIC_CDN + "/website/news/page-banner--blog.png",
            }
            break;
        case 3:
            metaData = {
                title: "Electric Leasing Guides | EV & Hybrid Advice | Leasing Options",
                description: "EV and hybrid cars are becoming more popular. Get to know electric vehicles in our complete guides, with costs, emissions, charging and more covered.",
                canonicalUrl: GetCanonicalUrl(getBaseUrl(url)),
                keywords: '',
                imageUrl: process.env.NEXT_PUBLIC_CDN + "/website/news/page-banner--blog.png",
            }
            break;
        default:
            metaData = {
                title: "Car Leasing | Personal Lease Deals & Contract Hire | Leasing Options",
                description: "Get the best car leasing deals for personal contract hire from Leasing Options. Vehicles delivered anywhere in the UK. Get your FREE instant quote, today.",
                canonicalUrl: GetCanonicalUrl(getBaseUrl(url)),
                keywords: "Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire",
                imageUrl: process.env.NEXT_PUBLIC_CDN + "/website/news/page-banner--blog.png",
            }
            break;
    }

    return metaData;
}