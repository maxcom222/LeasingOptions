import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
import { VehicleTypes } from 'enums/VehicleTypes';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { Make } from 'types/Make';
import { FaqItem } from 'types/FaqItem';
import { LayoutProps } from 'types/LayoutProps';
import { logLabelEvent } from 'helpers/analytics';
import { GetFaqsSchema, GetSerializedSchema } from 'helpers/schemaHelper';
import { getProps } from 'ssr/leasing-deal-page';
import CarLeasingGraphic from 'components/car-leasing-graphic';
import { NewsService } from 'business-logic/newsService';
import CardWithStickers from 'components/card/card-with-stickers'
import { GetTopVehicles } from 'business-logic/vehicleService';
export const getServerSideProps = wrapper.getServerSideProps(getProps);

type Props = {
    leasingDealType: LeasingDealTypes,
    makes: Array<Make>,
    serviceSchema: string,
    webPageSchema: string
}

function mapStateToProps(state) {
    return {
        leasingDealType: state.dealSelector,
        makes: state.carManufacturerList
    };
}

const PersonalLeasingPage: LayoutProps<Props> = ({ leasingDealType, makes, serviceSchema, webPageSchema }) => {
    const router = useRouter();
    const [topVehicles, setTopVehicles] = useState([]);
    const [topNews, setTopNews] = useState([]);
    const vehicleType = VehicleTypes.Car;
    const pageDealType = LeasingDealTypes.Personal;

    useEffect(() => {
        if (pageDealType !== leasingDealType) {
            router.push("/business-car-leasing");
        }
    }, [leasingDealType]);

    useEffect(() => {
        GetTopVehicles(leasingDealType, leasingDealType === LeasingDealTypes.Personal ? 20 : 4)
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
        { question: "PCP vs. leasing - which is better?", answer: "Car leasing works by essentially renting a brand-new vehicle for an agreed period, typically between 2-4 years. You pay an initial rental fee and make fixed monthly payments until your lease ends. When your contract finishes, simply return the car. Read more in our complete guide to <a href=\"/advice/personal-leasing/what-is-car-leasing\">what is car leasing?</a>" },
        { question: "How does leasing a car work?", answer: "Car leasing means you can drive the latest models every few years and return the vehicle when your contract ends. PCP works similarly, except you can buy the car at the end of your agreement. You’ll pay interest on a PCP, plus a balloon payment if you purchase the vehicle." },
        { question: "Is it better to buy or lease a car?", answer: "Leasing gives you the benefit of driving a new car without paying an expensive upfront cost. Instead, you’ll make affordable fixed payments while taking advantage of the manufacturer’s warranty, lower maintenance costs and road tax included. But you won’t own the car at the end of the lease. See more about <a href=\"/advice/personal-leasing/is-it-better-to-lease-or-buy-a-car\">car leasing vs. buying</a>." },
        { question: "How much does it cost to lease a car?", answer: "You’ll make fixed monthly payments based on the value of your chosen car. Other leasing costs include your initial rental (between 1-12x your monthly payment) and a £199 processing fee. Read more about the <a href=\"/advice/costs/how-much-does-it-cost-to-lease-a-car\">cost of car leasing</a>." },
        { question: "What are the pros and cons of leasing a car?", answer: "The benefits of leasing include the advantage of driving the latest car every 2-4 years, low monthly payments, a manufacturer’s warranty, fewer maintenance costs and no negative equity as you return the car when the contract ends. But you’ll need to keep to an agreed mileage limit and won’t own the car." },
        { question: "What do I need to know when leasing a car?", answer: "The most important thing to know about car leasing is that you’ll be renting a brand-new vehicle of your choice, making fixed monthly payments for 2-4 years. Personal and business leases are both available. You must stick to your agreed mileage limit and keep the car in a good condition that meets the <a href=\"/fair-wear-and-tear\">BVRLA Fair Wear and Tear Guidelines</a>." },
        { question: "Do car leases include maintenance and insurance?", answer: "Maintenance and insurance can be included in your lease with our <a href=\"/car-leasing-with-insurance\">car leasing with insurance</a>. This includes breakdown cover, accident management, glass cover, a replacement vehicle, plus routine maintenance and servicing, all part of your monthly payments." },
        { question: "What is Personal Contract Hire (PCH)?", answer: "Personal Contract Hire (PCH) is another term for personal car leasing. This is for individuals who want to lease a car on a personal basis. You will pay an initial rental fee and make fixed monthly payments depending on how long you want your lease to last (usually between 2-4 years). When your lease ends, you return the car." },
    ];

    return (
        <>
            <MetaHead>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webPageSchema }}></script>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceSchema }}></script>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: GetSerializedSchema(GetFaqsSchema(pageDealType, faqs)) }}></script>
            </MetaHead>

            <PageBanner className="" image={`${process.env.NEXT_PUBLIC_CDN}/website/static/hero/personal-1.jpg`} trustPilot={true}>
                <div className="row">
                    <div className="col-24 py-md-5">
                        <h1 className="text-white"><strong>Car Leasing Deals and Offers with Free Delivery</strong></h1>
                        <h2 className="text-white mb-3 mb-md-5">Lease the brand new car you want, at a low monthly cost, fully taxed and delivered for free.</h2>
                        <button className="btn btn-primary btn-lg btn-fluid-xs mb-3 mb-md-5 mr-sm-3" id="vehicle-search-button" role="button" onClick={() => { handleSearchClick(), logLabelEvent('Search', 'Click', 'personal_hero_search'); }}>Search for a Car</button>
                        <Link passHref href="/car-leasing-deals"><a className="btn btn-secondary btn-lg btn-fluid-xs mb-3 mb-md-5" role="button" onClick={() => { logLabelEvent('Search', 'Click', 'personal_hero_special_offers'); }}>View Special Offers</a></Link>
                    </div>
                </div>
            </PageBanner>

            <section className="container-fluid py-5">
                <div className="row">
                    <div className="col-24 col-md-18">
                        <h2>Car leasing is easy with Leasing Options</h2>
                        <ExpandableText theme="light">
                            {`<p>Car leasing is easy when you’re in the hands of the experts. With over 30 years’ experience and armed with our Price Match Promise, we’ll get you a great price on a new car with the minimum of fuss.</p>
                        <p>Our personal car lease deals won’t be beaten, guaranteeing you the very best value on the latest makes and models. Plus, with tax included and free delivery anywhere in the UK, there’s no reason to hire your car from anyone else.</p>
                        <p>Drive the latest, shiniest and most fuel-efficient cars without the upfront price tag. You can start by browsing a selection of special offers and personal car lease deals below, or use our handy <a href="/my-garage">car leasing comparison</a> tool if you know what make and model you want.</p>
                        <h2>What is Car Leasing?</h2>
                        <p>Car leasing works like renting, but for a predetermined period of time. For the duration of the contract, you’ll pay a fixed monthly cost. Then once your contract’s up, you can choose whether to hire a new car, extend your current lease, or simply return the vehicle.</p>
                        <p>When you lease from us, you don’t just receive a brand-new car. In addition to free UK delivery and tax included, drivers can opt for our comprehensive maintenance and <a href="/car-leasing-with-insurance">car leasing with insurance</a> packages, so you’re covered for every eventuality – all in your fixed monthly payments.</p>
                        <p>Our friendly, committed team will take you every step of the way, with your own account manager there to guide you through the leasing process. We can arrange a deal in just a few hours – driving a shiny new car has never been more straightforward.</p>
                        <p>With more than 10,000 vehicles to choose from, we’re sure to have the perfect car available. Whether you need a family SUV, stylish saloon or an eco-friendly <a href="/electric-hybrid-car-leasing">electric or hybrid car</a>, you’ll no doubt be spoilt for choice. </p>`}
                        </ExpandableText>
                    </div>
                    <div className="col-24 col-md-6 d-none d-md-block">
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/personal-leasing/car-leasing-lifestyle-image.jpg`} className="img-fluid lazyload" alt="Personal Car Leasing" /></div>
                </div>
            </section>
            {topVehicles?.length &&
                <section className="container-fluid py-3 pt-sm-4 py-md-5 bg-light-grey">
                    <div className="row">
                        <div className="col-24">
                            <h2 className="mb-3 mb-sm-4 mb-md-5">View a selection of our latest personal car leasing deals</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-24">
                        <CardWithStickers>
                            <VehicleCarousel infinite={topVehicles?.length > 3} tabletArrows={true}>
                                {topVehicles?.map(vehicle => (
                                    <CardVehicle key={`featured-${vehicle.vehicleRef}`} id={`featured-${vehicle.vehicleRef}`} vehicle={vehicle} dealSelector={pageDealType} showStickers={false} />
                                ))}
                            </VehicleCarousel>
                            </CardWithStickers>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-24 text-center mb-3 mb-md-0 mt-md-3">
                            <Link passHref href="/car-leasing/search"><a className="btn btn-primary btn-lg btn-block-xss">View All Lease Deals</a></Link>
                        </div>
                    </div>
                </section>
            }           
            <CarLeasingGraphic />
            <ManufacturerCards makes={makes} vehicleType={vehicleType} />
            <TopNews newsItems={topNews} infinite={false} mobileArrows={false} />
            <TrustScoreReviewsSection />
            <Faqs faqs={faqs} title="Car Leasing Frequently Asked Questions" />
        </>
    );
}

PersonalLeasingPage.layout = MainLayout;

export default connect(mapStateToProps)(PersonalLeasingPage);