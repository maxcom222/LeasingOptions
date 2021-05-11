import * as _ from 'underscore';
import { VehicleTypes } from 'enums/VehicleTypes';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { MetaData } from 'types/infrastructure/MetaData';
import { FaqItem } from 'types/FaqItem';
import { getBaseUrl } from 'helpers/urlsHelper';
import { getLOSSRFetchHeaders } from 'helpers/apiHelper';
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { getVehiclesFilter } from 'helpers/vehiclesFilterHelper';
import { GetShortTermDeals } from 'business-logic/vehicleService';
import { ContentService } from 'business-logic/contentService';
import { dispatchUpdateDealToggle, dispatchUpdateVehicleFilterSearch } from 'redux/dispatches/dispatchs';

export const getProps = async (context) => {
    const vehiclesFilter = getVehiclesFilter(context);

    const vehicleType = vehiclesFilter.vehicleType;
    const leasingDealType = vehiclesFilter.leasingDealType;

    if (vehicleType === VehicleTypes.None || leasingDealType === LeasingDealTypes.None) {
        //Do we have custom page to show?
        context.res.writeHead(404);
        context.res.end();
        return;
    }

    await dispatchUpdateVehicleFilterSearch(context, vehiclesFilter);
    if (vehicleType === VehicleTypes.Car) {
        //TODO: set from filter?
        dispatchUpdateDealToggle(context);
    }

    const fetchHeaders = getLOSSRFetchHeaders(context);

    const shortTermDeals = (await GetShortTermDeals(vehicleType, leasingDealType, fetchHeaders)).data;
    const categoryList = (await ContentService.GetContentCategories()).data;
    let filteredCategoryList = _.filter(categoryList || [], function (category) { return category.id !== 11 && category.id !== 17; });//TODO: better approach required

    const url = context.req.url.replace("/internal", "");
    const metaData: MetaData = vehicleType === VehicleTypes.Car ?
        {
            title: `Short Term Car Lease | 1-6 Months Lease Deals | Leasing Options`,
            description: `Drive a brand-new car without the long-term commitment. Get a flexible short term car lease deal for just 1, 3 or 6 months with Leasing Options.`,
            canonicalUrl: GetCanonicalUrl(getBaseUrl(url))?.toLowerCase(),
            author: "Leasing Options",
            imageUrl: process.env.NEXT_PUBLIC_CDN + "/website/short-term-leasing/banner.png",
        } :
        {
            title: `Short Term Van Lease | 1-6 Months Lease Deals | Leasing Options`,
            description: `Drive a brand-new van without the long-term commitment. Get a flexible short term van lease deal for just 1, 3 or 6 months with Leasing Options.`,
            canonicalUrl: GetCanonicalUrl(getBaseUrl(url))?.toLowerCase(),
            author: "Leasing Options",
            imageUrl: process.env.NEXT_PUBLIC_CDN + "/website/short-term-leasing-van/banner.png",
        };

    //TODO: why do we use absolute urls?
    //TODO: do we need it hardcoded? if yes move to component
    const faqList: Array<FaqItem> = [
        { question: "How quickly will a decision be made on my lease? ", answer: "Short term car leasing typically takes no more than 48 hours to be approved. If you contact LeasingOptions via the online form, or request a call back via the website, a member of the sales team will call you back within a few hours to discuss your deal." },
        { question: "How long is a short term lease?", answer: "The shortest car lease contract available is three months." },
        { question: "Can I choose a specific car?", answer: "Yes, there is a wide selection of vehicles available for short term leases. <a href=\"https://www.leasingoptions.co.uk/car-leasing/short-term#contact\">Contact</a> our team to discuss your options." },
        { question: "Will you need to do a credit search?", answer: "Yes. Once you have agreed on the car and deal you would like from LeasingOptions, our funding partners will run a credit check to confirm your eligibility." },
        { question: "Are short term leases rolling month-to-month or fixed? ", answer: "The car leases that LeasingOptions offers can vary. Some can be rolling monthly contracts, starting from a minimum term of 3 months." },
        { question: "Do short term leases come with insurance? ", answer: "Short term leases don’t come with insurance. You’ll need to arrange this separately." },
        { question: "Is road tax included in a short term vehicle lease?", answer: "Yes, with business and personal agreements, your road tax is included in your monthly payments." },
        { question: "What is covered with maintenance and servicing? ", answer: "<p>In short term leasing agreements, maintenance is not covered.</p><p>If you select the <a href=\"https://www.leasingoptions.co.uk/car-leasing-with-insurance\">‘Fuel & Go’</a> package, all scheduled maintenance work is covered in your Fuel & Go lease, so there is no need to worry about any surprise bills for a routine service.</p><p>During the term of the lease, all services are included, as well as consumables like brake pads to keep your car healthy and you mobile.</p>" },
        { question: "Where can I get my car serviced? ", answer: "If your car requires a service during your short term lease arrangement, it is your responsibility to arrange and on that basis you can choose which garage you use. There is only one stipulation being that the garage must be VAT registered." },
        { question: "What are the pros and cons of leasing vs buying?", answer: "<p>Not only does leasing offer great flexibility and peace of mind, you won't be left with a vehicle facing negative equity when your contract is up. What's more, due to the financial flexibility, leasing often means you can drive a newer or higher spec car than you would have been able to afford if paying outright.</p><p>If you settle the contract early, you will be required to pay a termination fee</p><p>If you exceed your agreed annual mileage allowance, you will be required to pay an excess-mileage fee</p><p>At the end of your contract, you will be required to pay for any damage to the vehicle, with the exception of \"fair wear-and-tear\"</p><p>To learn more about the benefits of leasing, please take a look at: <a href=\"https://www.leasingoptions.co.uk/benefits-of-car-leasing\">https://www.leasingoptions.co.uk/benefits-of-car-leasing</a></p>" },
        { question: "Can I still use a personal number plate on a leased car?Can I still use a personal number plate on a leased car?", answer: "Yep! We recommend putting it on following delivery of your vehicle. Remember it’ll need to be removed before the end of your lease though. For more information, speak to your account manager." },
        { question: "What is classed as acceptable 'wear and tear' when I return the vehicle at the end of my lease?", answer: "<p>For details on what condition we expect the vehicle returned in, take a <a href=\"https://www.leasingoptions.co.uk/fair-wear-and-tear\">look here</a>.</p><p>As BVRLA members and maintaining a seat on their committee, we have worked to define the BVRLA definition of what is acceptable wear and tear in regards to leased and contract hired vehicles.</p><p>A guide that every vehicle finance company strictly adheres to, is available <a href=\"https://issuu.com/bfwsn67/docs/fwt_2014_issuu_leasing_options\" target=\"_blank\">here</a> or on request from your sales consultant.</p><p>Although we work to present you with the best possible service, excessive damage that occurs outside of these guidelines falls on you as the lease contract holder, meaning you will be charged accordingly.</p>" },
        { question: "Can I end my contract early?", answer: "Yes, but much like any other contract, cancelling your contract before the end will incur charges, so you will need to get in touch with us in such circumstances so that we may present you with a termination quote. We do everything possible to keep you in our best interests throughout such occurrences." },
        { question: "Can I buy the vehicle once my agreement ends?", answer: "The option to purchase vehicle depends on the type of lease you take out. As there are a number of different vehicle contract plans offered by Leasing Options, there are some that offer you the opportunity to purchase your car or van for a specified price once you reach the end of your agreement. The best option is to speak to one of our advisers about this." },
        { question: "If I want to buy my vehicle, how much is it going to cost me?", answer: "If you have a contract which allows you to purchase your vehicle at the end of your lease, the price you pay will depend on several factors; such as the mileage that’s already been covered and the car’s age." },
        { question: "Do your lease vehicles come with a warranty?", answer: "Yes, absolutely. Every vehicle we lease is covered by their respective UK manufacturer’s warranty. For further details please ask our team." },
        { question: "Can leasing a car improve your credit?", answer: "<p>In order to have a credit score, you need to first have history of paying back debt – leasing can help you do this.</p><p>The benefits of affordability and knowing exactly what you’re paying each month can also help you manage your finances better, especially if you’re the kind of person who’s not used to having a number of outgoings each month.</p><p>In short, if you can afford the monthly repayments and still have a comfortable amount left to see you through each month, leasing can help you improve your credit. Just remember, this works both ways too - so if things are tighter than they ought to be, you might want to reconsider in order to avoid missing any payments and reducing your credit score.</p>" },
        { question: "Am I able to claim back any VAT on my leasing payments?", answer: "<p>If you lease a VAT registered business vehicle and take out a VAT qualifying contract, you can reclaim the tax back from the HMRC.</p><p>If you lease on a personal basis, unfortunately you cannot reclaim VAT.</p><p>Our team are on hand to talk you through this when arranging your contract, so if you’re unsure, don’t worry. In the meantime, see our handy </p><p>Our <a href=\"https://www.leasingoptions.co.uk/what-is-bik-tax\">tax&nbsp;calculator</a>.</p>" },
        { question: "Do you lease used cars too?", answer: "No, we only offer new vehicles at Leasing Options." },
        { question: "How do I test drive my preferred vehicle?", answer: "As we source our cars direct from manufacturers we do not have a forecourt, because the cars are not coming directly from us. We suggest you visit your local manufacturer dealership if you want a proper look or a test drive, then come back to us for the best prices and service!" },
        { question: "Can you deliver to my address?", answer: "Free driven delivery to UK mainland locations in England, Scotland and Wales is included within the cost of your leasing arrangement. For non-mainland locations (eg Northern Ireland, Isle of Wight), delivery to the nearest mainland port is available, please speak to your account manager for more details." },
        { question: "Am I able to terminate the contract early?", answer: "If you want to return a vehicle before the end of your contract, we advise you contact us to discuss your options and the full financial-cost." },
    ];

    return {
        props: {
            metaData: metaData,

            shortTermDeals: shortTermDeals,
            faqList: faqList,
            categoryList: filteredCategoryList,
            vehicleType: vehicleType
        }
    };
}