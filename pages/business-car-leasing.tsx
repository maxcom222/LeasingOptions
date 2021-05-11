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
import CarLeasingGraphic from 'components/car-leasing-graphic';

import { VehicleTypes } from 'enums/VehicleTypes';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { Make } from 'types/Make';
import { FaqItem } from 'types/FaqItem';
import { LayoutProps } from 'types/LayoutProps';
import { logLabelEvent } from 'helpers/analytics';
import { GetFaqsSchema, GetSerializedSchema } from 'helpers/schemaHelper';
import { getProps } from 'ssr/leasing-deal-page';
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

const BusinessLeasingPage: LayoutProps<Props> = ({ leasingDealType, makes, serviceSchema, webPageSchema }) => {
    const router = useRouter();
    const [topVehicles, setTopVehicles] = useState([]);
    const [topNews, setTopNews] = useState([]);
    const vehicleType = VehicleTypes.Car;
    const pageDealType = LeasingDealTypes.Business;

    useEffect(() => {
        if (pageDealType !== leasingDealType) {
            router.push("/car-leasing");
        }
    }, [leasingDealType]);

    useEffect(() => {
        GetTopVehicles(leasingDealType, 4)
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
        { question: "How does business car leasing work?", answer: "Business leasing, or contract hire, allows you to rent a single car or van, or a full fleet, for an agreed time period, usually 2-4 years. After paying the initial rental, you’ll make fixed monthly payments for the length of your contract. When your lease ends, you return the vehicle(s). Read more in <a href=\"/advice/business-leasing/business-car-leasing-the-comprehensive-guide\">our guide to business leasing</a>." },
        { question: "Can you lease a car through your business?", answer: "You can lease a car through your business if your company is one of the following: a Limited Liability Partnership (LLP), PLC, Local Authority, Partnership, Limited Company, Charity, Embassy, or you are self-employed." },
        { question: "How do you qualify for a business car lease?", answer: "To qualify for business car leasing, the company director(s) must give proof of their name and address. You also need to provide 3-6 months’ business bank statements and evidence of your company’s accounts." },
        { question: "Is a car lease tax deductible for a business?", answer: "VAT-registered businesses can reclaim 50% of the VAT on their monthly payments, or 100% if the car is used for work purposes only. You can also claim back VAT on maintenance costs. Plus, leasing cars with lower CO2 emissions will reduce the amount of company car tax you owe." },
        { question: "Is it worth leasing a car through my business?", answer: "Business car leasing gives you and your employees the benefit of driving a new car or van every 2-4 years. With fixed monthly payments, a manufacturer’s warranty, lower maintenance costs and several tax advantages, it can improve company cash flow too." },
        { question: "Why is business car leasing cheaper than personal?", answer: "Business leasing is cheaper than personal because of tax advantages. VAT-registered businesses can reclaim up to 100% of the VAT on their monthly payments, plus the VAT on any maintenance packages. Personal car leasing doesn’t offer the same tax benefits, which is why it’s cheaper to choose business car leasing." },
        { question: "What’s the difference between personal and business car leasing?", answer: "Personal and business car leasing are similar. Both allow you to drive a brand-new car of your choice and make monthly payments for a fixed period. But the difference with business leasing is you can also lease more than one vehicle (a fleet), while saving money through tax benefits." },
        { question: "What is Business Contract Hire (BCH)?", answer: "Business Contract Hire (BCH) is another way of saying business car leasing. You pay an initial rental and make fixed monthly payments for your company car or a fleet. At the end of your contract, you return the vehicle(s)." },
        { question: "Can a new business lease a car?", answer: "If you are a <a href=\"/advice/business-leasing/can-i-lease-a-car-for-my-new-business\">new business</a>, you can still lease a car. You will need to provide 3-6 months’ bank statements, your audited accounts and proof of the director’s name and address. As a new business, you may also need to provide further evidence of the company’s financial status." },
    ];

    return (
        <>
            <MetaHead>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webPageSchema }}></script>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceSchema }}></script>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: GetSerializedSchema(GetFaqsSchema(pageDealType, faqs)) }}></script>
            </MetaHead>

            <PageBanner className="" image={`${process.env.NEXT_PUBLIC_CDN}/website/static/hero/business-1.jpg`} trustPilot={true}>
                <div className="row">
                    <div className="col-24 py-md-5">
                        <h1 className="text-white"><strong>Business Car Leasing</strong></h1>
                        <h2 className="text-white mb-3 mb-md-5">Whether you need one vehicle or a whole fleet, our unrivalled business car leasing deals offer great benefits &amp; tax advantages for your Ltd, Plc, sole trader or partnership company.</h2>
                        <button className="btn btn-primary btn-lg btn-fluid-xs mb-3 mb-md-5 mr-sm-3" id="vehicle-search-button" role="button" onClick={() => { handleSearchClick(), logLabelEvent('Search', 'Click', 'business_hero_vehicle_search'); }}>Search for a Car</button>
                        <Link passHref href="/car-leasing-deals"><a className="btn btn-secondary btn-lg btn-fluid-xs mb-3 mb-md-5" role="button" onClick={() => { logLabelEvent('Search', 'Click', 'business_hero_special_offers'); }}>View Special Offers</a></Link>
                    </div>
                </div>
            </PageBanner>

            <section className="container-fluid py-5">
                <div className="row">
                    <div className="col-24 col-md-18">
                        <h2>The benefits of business car leasing with Leasing Options</h2>
                        <ExpandableText theme="light">
                            {`<p>Business leasing – or car contract hire – gives your company the advantage of driving the very latest vehicles at the lowest prices. With excellent money-saving benefits like reduced tax bills and decreased maintenance costs, you can lease a brand-new car or an entire fleet for less – without worrying about expensive upfront costs and depreciation.</p>
                            <p>With up to 100% corporation tax relief, car contract hire is already a cost-effective choice. But your company could make even more savings by reclaiming up to 100% of the VAT paid during your lease. And thanks to our <a href="/price-promise">Price Match Promise</a>, our unbeatable deals can minimise capital expenditure, giving you more cash to spend on your business.</p>
                            <p>Maintenance and repairs are sorted too, so you and your employees are covered for routine servicing, breakdowns and accident management. Simply talk to your dedicated account manager about including our comprehensive maintenance package in your low, fixed monthly payments.</p>
                            <p>Business car leasing is also highly flexible, with contracts usually lasting between two and four years – it’s entirely up to you. If your lease is still working well, you can easily renew it. Or if your conditions have changed, it’s simple to update your single vehicle or fleet to match the needs of your business.</p>
                            <p>Over 30 years, we’ve grown our reputation for superb five-star service by offering our customers the very best contract hire deals on a huge range of cars and <a href="/van-leasing">vans</a> too. So, if you need a director’s vehicle or a full fleet, our friendly, experienced staff are on hand to help. Just give us a call and we’ll get your business lease started today – fast and hassle-free.</p>`}
                        </ExpandableText>
                    </div>
                    <div className="col-24 col-md-6 d-none d-md-block">
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/business-leasing/business-leasing-lifestyle-image.jpg`} className="img-fluid lazyload" alt="Business Car Leasing" />
                    </div>
                </div>
            </section>
            {topVehicles?.length &&
                <section className="container-fluid py-3 pt-sm-4 py-md-5 bg-light-grey">
                    <div className="row">
                        <div className="col-24">
                            <h2 className="mb-3 mb-sm-4 mb-md-5">View a selection of our latest business car leasing deals</h2>
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
            <Faqs faqs={faqs} title="Business Car Leasing Frequently Asked Questions" />
        </>
    )
}

BusinessLeasingPage.layout = MainLayout;

export default connect(mapStateToProps)(BusinessLeasingPage);