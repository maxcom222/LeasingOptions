import { NextRouter } from 'next/router';

import { BreadcrumbsItem } from 'types/infrastructure/BreadcrumbsItem';
import { GetFriendlyName } from './helpers';
import { getBaseUrl } from "./urlsHelper";

let breadcrumbsActiveFor = [
    "/car-leasing",
    "/car-leasing/[make]",
    "/car-leasing/[make]/[shortModel]",
    "/car-leasing/[make]/[shortModel]/[model]",
    "/car-leasing/[make]/[shortModel]/[model]/[derivative]/[vehicleRef]/vehicle",
    "/business-car-leasing",
    "/van-leasing",
    "/van-leasing/[make]",
    "/van-leasing/[make]/[shortModel]",
    "/van-leasing/[make]/[shortModel]/[model]",
    "/van-leasing/[make]/[shortModel]/[model]/[derivative]/[vehicleRef]/vehicle",
    "/car-leasing-deals",
    "/van-leasing-deals",
    "/car-leasing-with-insurance/[postcode]/[make]",
    "/car-leasing-with-insurance/[postcode]/[make]/[shortModel]",
    "/car-leasing-with-insurance/[postcode]/[make]/[shortModel]/[model]/[derivative]/[vehicleRef]/vehicle",
    "/value-your-car",
    "/contact",
    "/request-callback",
    "/our-story",
    "/terms-and-conditions",
    "/news",
    "/news/[category]",
    "/news/[category]/[url]",
    "/news/[category]/[url]/[id]",
    "/advice",
    "/advice/[category]",
    "/advice/[category]/[url]",
    "/advice/[category]/[url]",
    "/sitemap",
    "/my-garage",
    "/privacy-policy",
    "/cookie-policy",
    "/treating-customers-fairly",
    "/initial-disclosure",
    "/complaints",
    "/car-leasing-faqs",
    "/look-after-my-car",
    "/lancashire-cricket-club-partnership",
    "/complaints",
    "/initial-disclosure",
    "/fair-wear-and-tear",
    "/what-is-bik-tax",
    "/treating-customers-fairly",
    "/our-story",
    "/careers",
    "/terms-and-conditions",
    "/privacy-policy",
    "/cookie-policy",
    "/car-leasing-deals",
    "/van-leasing-deals",
    "/hydrogen-car-leasing",
    "/electric-hybrid-car-leasing",
    "/electric-hybrid-car-leasing/types",
    "/price-promise",
    "/our-story/30th-birthday",
    "/our-partners-contact-details",
    "/electric-hybrid-car-leasing/government-grants",
    "/electric-hybrid-car-leasing/charging"
];

export const getBreadcrumbs = (router: NextRouter): BreadcrumbsItem[] => {
    let breadcrumbsList: BreadcrumbsItem[] = null;

    let routerPathName = router.pathname;

    if (routerPathName.startsWith("/internal/")) {
        routerPathName = routerPathName.replace("/internal", "");
    }

    if (breadcrumbsActiveFor.includes(routerPathName)) {
        breadcrumbsList = [{ name: "Home", url: "/" }];

        const routerQuery = router.query;
        const currentUrl = getBaseUrl(router.asPath.startsWith("/internal/") ? router.asPath.replace("/internal", "") : router.asPath);

        // Check routerPath to find correct breadcrumb links
        if (routerPathName.startsWith("/car-leasing/") || routerPathName.startsWith("/van-leasing/")) {
            let baseUrl = "";
            let queryString = "";

            if (routerPathName.startsWith("/car-leasing")) {
                if (routerQuery.leasingdeal === "business") {
                    queryString = "?leasingdeal=business";
                    breadcrumbsList.push({ name: "Car Leasing", url: "/business-car-leasing" });
                }
                else {
                    breadcrumbsList.push({ name: "Car Leasing", url: "/car-leasing" });
                }

                baseUrl = "/car-leasing";
            }
            else if (routerPathName.startsWith("/van-leasing")) {
                breadcrumbsList.push({ name: "Van Leasing", url: "/van-leasing" });
                baseUrl = "/van-leasing";
            }

            if (routerPathName === "/car-leasing/[make]/[shortModel]/[model]/[derivative]/[vehicleRef]/vehicle" || routerPathName === "/van-leasing/[make]/[shortModel]/[model]/[derivative]/[vehicleRef]/vehicle") {
                breadcrumbsList.push.apply(breadcrumbsList,
                    [
                        { name: GetFriendlyName(routerQuery.make.toString()), url: `${baseUrl}/${routerQuery.make}${queryString}` },
                        { name: GetFriendlyName(routerQuery.shortModel.toString()), url: `${baseUrl}/${routerQuery.make}/${routerQuery.shortModel}${queryString}` },
                        { name: GetFriendlyName(routerQuery.derivative.toString()), url: currentUrl + queryString }
                    ]);
            } else if (routerPathName === "/car-leasing/[make]/[shortModel]/[model]" || routerPathName === "/van-leasing/[make]/[shortModel]/[model]") {
                breadcrumbsList.push.apply(breadcrumbsList,
                    [
                        { name: GetFriendlyName(routerQuery.make.toString()), url: `${baseUrl}/${routerQuery.make}${queryString}` },
                        { name: GetFriendlyName(routerQuery.shortModel.toString()), url: `${baseUrl}/${routerQuery.make}/${routerQuery.shortModel}${queryString}` },
                        { name: GetFriendlyName(routerQuery.model.toString()), url: currentUrl + queryString }
                    ]);
            } else if (routerPathName === "/car-leasing/[make]/[shortModel]" || routerPathName === "/van-leasing/[make]/[shortModel]") {
                breadcrumbsList.push.apply(breadcrumbsList,
                    [
                        { name: GetFriendlyName(routerQuery.make.toString()), url: `${baseUrl}/${routerQuery.make}${queryString}` },
                        { name: GetFriendlyName(routerQuery.shortModel.toString() + ' Lease Deals'), url: currentUrl + queryString }
                    ]);
            } else if (routerPathName === "/car-leasing/[make]" || routerPathName === "/van-leasing/[make]") {
                breadcrumbsList.push.apply(breadcrumbsList,
                    [
                        { name: GetFriendlyName(routerQuery.make.toString()), url: currentUrl + queryString }
                    ]);
            }
        } else if (routerPathName === "/car-leasing-with-insurance/[postcode]/[make]/[shortModel]/[model]/[derivative]/[vehicleRef]/vehicle") {
            breadcrumbsList.push.apply(breadcrumbsList,
                [
                    { name: "Fuel & Go", url: "/car-leasing-with-insurance" },

                    { name: GetFriendlyName(routerQuery.make.toString()), url: `/car-leasing-with-insurance/${routerQuery.postcode}/${routerQuery.make}` },
                    { name: GetFriendlyName(routerQuery.shortModel.toString()), url: `/car-leasing-with-insurance/${routerQuery.postcode}/${routerQuery.make}/${routerQuery.shortModel}` },
                    { name: GetFriendlyName(routerQuery.derivative.toString()), url: currentUrl }
                ]);
        } else if (routerPathName === "/car-leasing-with-insurance/[postcode]/[make]/[shortModel]") {
            breadcrumbsList.push.apply(breadcrumbsList,
                [
                    { name: "Fuel & Go", url: "/car-leasing-with-insurance" },
                    { name: GetFriendlyName(routerQuery.make.toString()), url: `/car-leasing-with-insurance/${routerQuery.postcode}/${routerQuery.make}` },
                    { name: GetFriendlyName(routerQuery.shortModel.toString() + ' Lease Deals'), url: currentUrl }
                ]);
        } else if (routerPathName === "/car-leasing-with-insurance/[postcode]/[make]") {
            breadcrumbsList.push.apply(breadcrumbsList,
                [
                    { name: "Fuel & Go", url: "/car-leasing-with-insurance" },
                    { name: GetFriendlyName(routerQuery.make.toString()), url: currentUrl }
                ]);
        } else if (routerPathName === "/business-car-leasing") {
            breadcrumbsList.push({ name: "Business Car Leasing", url: "/business-car-leasing" });
        } else if (routerPathName === "/car-leasing") {
            breadcrumbsList.push({ name: "Car Leasing", url: "/car-leasing" });
        } else if (routerPathName === "/van-leasing") {
            breadcrumbsList.push({ name: "Van Leasing", url: "/van-leasing" });
        } else if (routerPathName === "/electric-hybrid-car-leasing") {
            breadcrumbsList.push({ name: "Electric Hybrid Car Leasing", url: "/electric-hybrid-car-leasing" });
        } else if (routerPathName === "/hydrogen-car-leasing") {
            breadcrumbsList.push({ name: "Hydrogen Car Leasing", url: "/hydrogen-car-leasing" });
        } else if (routerPathName === "/electric-hybrid-car-leasing/types") {
            breadcrumbsList.push.apply(breadcrumbsList,
                [
                    { name: "Electric Hybrid Car Leasing", url: "/electric-hybrid-car-leasing" },
                    { name: "Types", url: "/electric-hybrid-car-leasing/types" }
                ]);
        } else if (routerPathName === "/electric-hybrid-car-leasing/charging") {
            breadcrumbsList.push.apply(breadcrumbsList,
                [
                    { name: "Electric Hybrid Car Leasing", url: "/electric-hybrid-car-leasing" },
                    { name: "Charging", url: currentUrl }
                ]);
        } else if (routerPathName === "/electric-hybrid-car-leasing/government-grants") {
            breadcrumbsList.push.apply(breadcrumbsList,
                [
                    { name: "Electric Hybrid Car Leasing", url: "/electric-hybrid-car-leasing" },
                    { name: "Government Grants", url: currentUrl }
                ]);
        } else if (routerPathName === "/our-partners-contact-details") {
            breadcrumbsList.push({ name: "Our Partners Contact Details", url: "/our-partners-contact-details" });
        }
        
        else if (routerPathName === "/news/[category]/[url]/[id]") {
            breadcrumbsList.push.apply(breadcrumbsList,
                [
                    { name: "News", url: "/news" },
                    { name: GetFriendlyName(routerQuery.category.toString()), url: "/news/" + routerQuery.category.toString() },
                    { name: GetFriendlyName(routerQuery.url.toString()), url: currentUrl }
                ]);
        } else if (routerPathName === "/news/[category]") {
            breadcrumbsList.push.apply(breadcrumbsList,
                [
                    { name: "News", url: "/news" },
                    { name: GetFriendlyName(routerQuery.category.toString()), url: "/news/" + routerQuery.category.toString() }
                ]);
        } else if (routerPathName === "/news") {
            breadcrumbsList.push.apply(breadcrumbsList,
                [
                    { name: "News", url: currentUrl }
                ]);
        } else if (routerPathName === "/advice/[category]/[url]") {
            breadcrumbsList.push.apply(breadcrumbsList,
                [
                    { name: "Advice", url: "/advice" },
                    { name: GetFriendlyName(routerQuery.category.toString()), url: "/advice/" + routerQuery.category.toString() },
                    { name: GetFriendlyName(routerQuery.url.toString()), url: currentUrl }
                ]);
        } else if (routerPathName === "/advice/[category]") {
            breadcrumbsList.push.apply(breadcrumbsList,
                [
                    { name: "Advice", url: "/advice" },
                    { name: GetFriendlyName(routerQuery.category.toString()), url: "/advice/" + routerQuery.category.toString() }
                ]);
        } else if (routerPathName === "/advice") {
            breadcrumbsList.push.apply(breadcrumbsList,
                [
                    { name: "Advice", url: currentUrl }
                ]);
        } else if (routerPathName === "/car-leasing-faqs") {
            breadcrumbsList.push({ name: "FAQ", url: currentUrl });
        } else if (routerPathName === "/look-after-my-car") {
            breadcrumbsList.push({ name: "Look after my car", url: currentUrl });
        } else if (routerPathName === "/lancashire-cricket-club-partnership") {
            breadcrumbsList.push({ name: "Lancashire County Cricket Club Partnership", url: currentUrl });
        } else if (routerPathName === "/complaints") {
            breadcrumbsList.push({ name: "Complaints", url: currentUrl });
        } else if (routerPathName === "/initial-disclosure") {
            breadcrumbsList.push({ name: "Initial Disclosure", url: currentUrl });
        } else if (routerPathName === "/fair-wear-and-tear") {
            breadcrumbsList.push({ name: "Fair wear and tear", url: currentUrl });
        } else if (routerPathName === "/what-is-bik-tax") {
            breadcrumbsList.push({ name: "BIK Tax", url: currentUrl });
        } else if (routerPathName === "/treating-customers-fairly") {
            breadcrumbsList.push({ name: "Treating Customers Fairly", url: currentUrl });
        } else if (routerPathName === "/our-story") {
            breadcrumbsList.push({ name: "Our Story", url: currentUrl });
        } else if (routerPathName === "/careers") {
            breadcrumbsList.push({ name: "Careers", url: currentUrl });
        } else if (routerPathName === "/terms-and-conditions") {
            breadcrumbsList.push({ name: "Terms and Conditions", url: currentUrl });
        } else if (routerPathName === "/privacy-policy") {
            breadcrumbsList.push({ name: "Privacy Policy", url: currentUrl });
        } else if (routerPathName === "/cookie-policy") {
            breadcrumbsList.push({ name: "Cookie Policy", url: currentUrl });
        } else if (routerPathName === "/movie-cars") {
            breadcrumbsList.push({ name: "Movie Cars", url: currentUrl });
        } else if (routerPathName === "/lccc-offer") {
            breadcrumbsList.push({ name: "LANCASHIRE COUNTY CRICKET CLUB SPECIAL OFFER", url: currentUrl });
        } else if (routerPathName === "/car-leasing-deals") {
            breadcrumbsList.push({ name: "CAR LEASE DEALS & SPECIAL OFFERS", url: currentUrl });
        } else if (routerPathName === "/van-leasing-deals") {
            breadcrumbsList.push({ name: "VAN LEASE DEALS & SPECIAL OFFERS", url: currentUrl });
        } else if (routerPathName === "/value-your-car") {
            breadcrumbsList.push({ name: "Value your car", url: currentUrl });
        } else if (routerPathName === "/price-promise") {
            breadcrumbsList.push({ name: "Price Match Promise", url: currentUrl });
        } else if (routerPathName === "/my-garage") {
            breadcrumbsList.push({ name: "Compare", url: currentUrl });
        } else if (routerPathName === "/our-story/30th-birthday") {
            breadcrumbsList.push.apply(breadcrumbsList,
                [
                    { name: "Our Story", url: "/our-story" },
                    { name: "30th Birthday Celebrations", url: currentUrl }
                ]);
        }
    }

    return breadcrumbsList;
}