import React, { useContext, useEffect, useState } from 'react';
import MainLayout from 'components/layout/main-layout';
import PageBanner from 'components/page-banner';
import ExpandableText from 'components/expandable-text'
import ManufacturerCards from 'components/layout/manufacturer-cards';
import CardVehicle from 'components/card/card-vehicle';
import Faqs from 'components/layout/faqs';
import MetaHead from 'components/seo/meta';
import wrapper from 'redux/store.tsx/store';
import { connect } from 'react-redux';
import Link from 'next/link';
import TrustScoreReviewsSection from 'components/layout/trust-score-reviews-section';
import TopNews from 'components/top-news/top-news';
import VehicleCarousel from 'components/vehicle-carousel';
import ModalContext from 'components/HOCs/modal/modalContext';
import Search from 'components/search';
import CardWithStickers from 'components/card/card-with-stickers'
import { VehicleTypes } from 'enums/VehicleTypes';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { Make } from 'types/Make';
import { FaqItem } from 'types/FaqItem';
import { LayoutProps } from 'types/LayoutProps';
import { logLabelEvent } from 'helpers/analytics';
import { GetFaqsSchema, GetSerializedSchema } from 'helpers/schemaHelper';
import { getProps } from 'ssr/leasing-deal-page';
import { NewsService } from 'business-logic/newsService';
import { GetTopVehicles } from 'business-logic/vehicleService';

export const getServerSideProps = wrapper.getServerSideProps(getProps);

type Props = {
    makes: Array<Make>;
    serviceSchema: string,
    webPageSchema: string
}

function mapStateToProps(state) {
    return {
        makes: state.vanManufacturerList
    };
}

const VanLeasingPage: LayoutProps<Props> = ({ makes, serviceSchema, webPageSchema }) => {
    const [topVehicles, setTopVehicles] = useState([]);
    const [topNews, setTopNews] = useState([]);
    const vehicleType = VehicleTypes.Commercial;
    const pageDealType = LeasingDealTypes.Van;

    useEffect(() => {
        GetTopVehicles(LeasingDealTypes.Van, 4)
            .then((result) => {
                setTopVehicles(result.data);
            }
        );
        
        NewsService.GetTopNews()
            .then((result) => {
                setTopNews(result.data);
            }
        );
    }, []);

    const modalContext = useContext(ModalContext);

    const handleSearchClick = () => {
        modalContext.showModal(Search, { show: true, title: "Start Your Search" })
    }

    const faqs: Array<FaqItem> = [
        { question: "How does van leasing work?", answer: "Van leasing lets you rent a single van or an entire fleet for a fixed period, usually between 2-4 years. You pay an initial rental fee then make fixed monthly payments until your contract ends. Then, you return the van(s) to the leasing company. Read more in our <a href=\"https://www.leasingoptions.co.uk/advice/van-leasing/the-complete-guide-to-van-leasing\">van leasing guide</a>." },
        { question: "Is van leasing a good idea?", answer: "Popular benefits of van leasing include driving the latest van(s) every 2-4 years, low monthly payments, a manufacturer’s warranty, fewer maintenance costs, tax advantages and no expensive upfront costs." },
        { question: "Can I lease a van for business?", answer: "All our van leases are intended for business customers. Whether you are self-employed and need one van or you own a company and require a full fleet, business van leasing is an affordable option, with fixed payments and no large initial outlay." },
        { question: "Is leasing a van tax deductible?", answer: "VAT-registered businesses can reclaim 50% of the VAT on their monthly lease payments, or 100% if the van is just used for work or as a pool van. You can also claim a van lease and fuel as business expenses on your tax return." },
        { question: "Should I lease or buy a van for business?", answer: "With leasing, you can drive a new van every 2-4 years while making low monthly payments. When your contract ends, you won’t own the van, though that does mean there’ll be no balloon payment due either." },
        { question: "Would I get accepted for van leasing?", answer: "You are eligible for van leasing if you are a Limited Liability Partnership (LLP), PLC, Local Authority, Partnership, Limited Company, Charity, Embassy, or if you are self-employed." },
        { question: "Can you sign write a lease van?", answer: "You can sign write a lease van, however, any signage must be removed before you return the van at the end of the contract. We recommend you use vinyl or magnetic signs, as these are easy to remove." },
        { question: "Does commercial van leasing include insurance?", answer: "Van leasing with insurance and maintenance is included with our <a href=\"https://www.leasingoptions.co.uk/car-leasing-with-insurance\">Fuel & Go</a> package. As well as a fully insured lease van, you’ll receive breakdown cover, accident management and routine servicing and repairs." },
        { question: "Which lease vans are available?", answer: "We offer a huge range of lease vans, including 4x4s, box vans, pickups, panel vans, city vans and Luton vans, all in a variety of payloads. You can also choose from popular brands like <a href=\"https://www.leasingoptions.co.uk/van-leasing/ford\">Ford</a>, <a href=\"https://www.leasingoptions.co.uk/van-leasing/mercedes-benz\">Mercedes</a>, <a href=\"https://www.leasingoptions.co.uk/van-leasing/citroen\">Citroen</a>, <a href=\"https://www.leasingoptions.co.uk/van-leasing/volkswagen\">Volkswagen</a> and many more." },
    ];

    return (
        <>
            <MetaHead>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webPageSchema }}></script>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceSchema }}></script>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: GetSerializedSchema(GetFaqsSchema(pageDealType, faqs)) }}></script>
            </MetaHead>

            <PageBanner className="" image={`${process.env.NEXT_PUBLIC_CDN}/website/static/hero/van-1.jpg`} trustPilot={true}>
                <div className="row">
                    <div className="col-24 col-md-17 col-lg-15 py-md-5">
                        <h1 className="text-white"><strong>Van Leasing</strong></h1>
                        <h2 className="text-white mb-3 mb-md-5">Discover our best van leasing deals. We have a great range of special offers available on a huge choice of brand-new vans. Simply see our hot deals below or filter by type, size, make or price to find your perfect vehicle at the lowest price.<br />Our van offers are only available for a limited time, so don't miss out and find a top deal on long term van hire today.</h2>
                        <button className="btn btn-primary btn-lg btn-fluid-xs mb-3 mb-md-5 mr-sm-3" id="vehicle-search-button" role="button" onClick={() => { handleSearchClick(), logLabelEvent('Search', 'Click', 'van_hero_vehicle_search'); }}>Search for a Van</button>
                        <Link passHref href="/van-leasing-deals"><a className="btn btn-secondary btn-lg btn-fluid-xs mb-3 mb-md-5" role="button" onClick={() => { logLabelEvent('Search', 'Click', 'van_hero_special_offers'); }}>View Special Offers</a></Link>
                    </div>
                </div>
            </PageBanner>

            <section className="container-fluid py-5">
                <div className="row">
                    <div className="col-24 col-md-18">
                        <h2>The benefits of van leasing with Leasing Options</h2>
                        <ExpandableText theme="light">
                            {`<p>Leasing Options offers the most competitive van lease deals in the marketplace, and we will not be beaten on price for long-term van hire. With 30 years’ experience in delivering fantastic value commercial vehicle leasing deals, we know what’s important to you.</p>
                            <p>Our deals are cashflow-friendly, tax-deductible and our <a href="/price-promise">Price Match Promise</a> means you can challenge us to match any deal you find elsewhere. With your own friendly personal account manager to walk you through it, we’ll help you find the best van lease deal for your needs and affordability, while making the whole process easy.</p>
                            <p>Enjoy access to the latest van models, with the benefits of better mileage, lower emissions and no depreciation costs to worry about either. You can even have <a href="/car-leasing-with-insurance">insurance and maintenance</a> included as part of your contract. Check out our great range of lease vans available now.</p>
                            <p>We offer vans from a wide choice of leading manufacturers. Featuring firm favourites like the <a href="/van-leasing/nissan/navara">Nissan Navara</a>, which sets the latest standards for pick-ups in handling dynamics, or why not consider the <a href="/van-leasing/ford/ranger">Ford Ranger</a>? It’s an efficient vehicle that’s smarter than ever now it’s in its third generation.</p>
                            <p>If you want something that’s premium and powerful yet still practical, check out the <a href="/van-leasing/ford/transit-custom">Ford Transit Custom</a> or the popular <a href="/van-leasing/fiat/ducato">Fiat Ducato</a>.</p>
                            <p>We’ve spent years supporting businesses of all sizes across a range of industries, providing high-quality vans at brilliantly low prices. If you want a simple and affordable vehicle or an entire fleet, then van leasing is the best way to keep you out on the road.</p>
                            <p> Whether you’re a sole trader or own your own business, we guarantee the best value for all our customers. But if you want even lower prices, see our <a href="/van-leasing-deals">van leasing deals</a>. We’re constantly updating our special offers, but they won’t stay around forever so don’t miss out!</p>`}
                        </ExpandableText>
                    </div>
                    <div className="col-24 col-md-6 d-none d-md-block">
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/business-leasing/business-leasing-lifestyle-image.jpg`} className="img-fluid lazyload" alt="Man driving a van lease" />
                    </div>
                </div>
            </section>
            {topVehicles?.length &&
                <section className="container-fluid py-3 pt-sm-4 py-md-5 bg-light-grey">
                    <div className="row">
                        <div className="col-24">
                            <h2 className="mb-3 mb-md-4 mb-md-5">Our top van leasing deals</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-24">
                           <CardWithStickers>
                            <VehicleCarousel infinite={topVehicles.length > 3} tabletArrows={true}>
                                {topVehicles?.map(vehicle => (
                                    <CardVehicle key={`featured-${vehicle.vehicleRef}`} id={`featured-${vehicle.vehicleRef}`} vehicle={vehicle} dealSelector={pageDealType} showStickers={false} />
                                ))}
                            </VehicleCarousel>
                            </CardWithStickers>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-24 text-center mb-3 mb-md-0 mt-md-3">
                            <Link passHref href="/van-leasing/search"><a className="btn btn-primary btn-lg btn-block-xss">View All Lease Deals</a></Link>
                        </div>
                    </div>
                </section>
            }
            <section className="container-fluid py-3 py-md-5 bg-white">
                <div className="row">
                    <div className="container px-md-5">
                        <div className="row">
                            <div className="col-24">
                                <h2 className="text-center mb-0 mb-md-5">Leasing your next van is easy</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-24 col-sm-8 px-5 px-sm-3 text-center">
                                <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/how-to-lease/van-1.svg`} className="mx-auto d-block lazyload" alt="Search for a new car" />
                                <h3>Find your next vehicle</h3>
                                <p>Browse our website to find the perfect van to fill the need your company has.</p>
                            </div>
                            <div className="col-24 col-sm-8 px-5 px-sm-3 text-center">
                                <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/how-to-lease/van-2.svg`} className="mx-auto d-block lazyload" alt="Speak to Leasing Options friendly advisers" />
                                <h3>Place an order</h3>
                                <p>Talk to our friendly and professional team who will guide you through every step.</p>
                            </div>
                            <div className="col-24 col-sm-8 px-5 px-sm-3 text-center">
                                <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/how-to-lease/van-3.svg`} className="mx-auto d-block lazyload" alt="Enjoy driving your new car" />
                                <h3>Enjoy driving</h3>
                                <p>Enjoy your new van - delivered for free to your office to reduce the hassle and stress.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ManufacturerCards makes={makes} vehicleType={vehicleType} />
            <TopNews newsItems={topNews} infinite={false} mobileArrows={false} />
            <TrustScoreReviewsSection />
            <Faqs faqs={faqs} title="Van Leasing Frequently Asked Questions" />
        </>
    );
}

VanLeasingPage.layout = MainLayout;

export default connect(mapStateToProps)(VanLeasingPage);