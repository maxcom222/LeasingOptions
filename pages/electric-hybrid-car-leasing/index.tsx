import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import Slider from "react-slick";
import { connect } from 'react-redux';
import MainLayout from '../../components/layout/main-layout';
import PageBanner from '../../components/page-banner';
import ExpandableText from '../../components/expandable-text';
import VehicleCarousel from '../../components/vehicle-carousel';
import CardElectric from '../../components/card/card-electric';
import CardGuides from '../../components/card/card-guides';
import Faqs from '../../components/layout/faqs';
import MetaHead from '../../components/seo/meta';
import ModalContext from '../../components/HOCs/modal/modalContext';
import NavigationEv from '../../components/layout/navigation-ev';
import Search from '../../components/search';
import wrapper from 'redux/store.tsx/store';
import Link from 'next/link';
import { FaqItem } from 'types/FaqItem';
import { LayoutProps } from 'types/LayoutProps';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { EvPageTypes } from 'enums/EvPageTypes';
import { VehicleTypes } from 'enums/VehicleTypes';
import { getLandingPageSchema, GetServiceSchema, GetFaqsSchema, GetSerializedSchema } from 'helpers/schemaHelper';
import { MetaData } from 'types/infrastructure/MetaData';
import { getBaseUrl } from 'helpers/urlsHelper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldCheck } from "@fortawesome/pro-solid-svg-icons";
import { logLabelEvent } from 'helpers/analytics';
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { getLOSSRFetchHeaders } from 'helpers/apiHelper';
import { ContentService } from 'business-logic/contentService';
import { PaginationCriteria } from 'types/PaginationCriteria';
import { SortingCriteria } from 'types/SortingCriteria';
import { GetVehiclesSearchUrl } from '../../helpers/urlHelper';
import { FuelTypes } from 'enums/FuelTypes';
import { VehiclesFilter } from 'types/VehiclesFilter';
import * as _ from 'underscore';
import { getVehiclesFilter } from 'helpers/vehiclesFilterHelper';
import CardWithStickers from 'components/card/card-with-stickers'
import { GetVehicleModelPreviews } from 'business-logic/vehicleService';

export const getServerSideProps = wrapper.getServerSideProps(

    async (context) => {
        const fetchHeaders = getLOSSRFetchHeaders(context);
        const paginationCriteria: PaginationCriteria = {
            pageSize: 4,
            pageIndex: 1
        }
        const sortingCriteria: SortingCriteria = {
            sortBy: "OrderPrice",
            sortDirection: "ASC"
        }

        let vehicleFilterQuery = getVehiclesFilter(context);
        vehicleFilterQuery.fuelType = FuelTypes.Electric;
        let electricModelPreviews = await GetVehicleModelPreviews(vehicleFilterQuery, paginationCriteria, sortingCriteria, fetchHeaders);
        vehicleFilterQuery.fuelType = FuelTypes.Hybrid;
        let hybridModelPreviews = await GetVehicleModelPreviews(vehicleFilterQuery, paginationCriteria, sortingCriteria, fetchHeaders);

        const categoryList = await ContentService.GetContentCategories();
        const categoryId = _.find(categoryList.data || [], function (item) { return item.url === "electric-leasing"; });
        const advicePromise = await ContentService.GetGuideItems(categoryId.id, 1, 4);

        const webPageSchema = getLandingPageSchema(LeasingDealTypes.Personal, context.req.url);
        const serviceSchema = await GetServiceSchema(VehicleTypes.Car);

        const metaData: MetaData = {
            title: `Electric & Hybrid Car Leasing | Electric Car Lease Deals | Leasing Options`,
            description: `Find the best electric car lease deals from Leasing Options. Electric and hybrid vehicles available now. Get a FREE quote today - we won't be beaten on price.`,
            canonicalUrl: GetCanonicalUrl(getBaseUrl(context.req.url)),
            keywords: ``
        }

        return {
            props: {
                metaData: metaData,
                serviceSchema: serviceSchema,
                webPageSchema: webPageSchema,
                electricModelPreviews: electricModelPreviews.data,
                hybridModelPreviews: hybridModelPreviews.data,
                vehicleFilterQuery: vehicleFilterQuery,
                advice: advicePromise.data,
                categoryList: categoryList.data,
            }
        }

    }
)

type Props = {
    serviceSchema: string,
    webPageSchema: string,
    electricModelPreviews: any,
    hybridModelPreviews: any,
    leasingDealType: LeasingDealTypes,
    vehicleFilterQuery: VehiclesFilter,
    advice: any,
    categoryList: any,
}

const ElectricLeasing: LayoutProps<Props> = ({ serviceSchema, webPageSchema, electricModelPreviews, hybridModelPreviews, leasingDealType, vehicleFilterQuery, advice, categoryList }) => {
    const dispatch = useDispatch();
    const modalContext = useContext(ModalContext);
    const handleSearchClick = (fuelType, fuelLabel) => {
        dispatch({ type: 'UPDATE_FILTERS', filterName: "fuelType", filterValue: { id: fuelType, name: fuelLabel } });
        modalContext.showModal(Search, { show: true, title: "Detailed Search", activePanel: 6 })
    }
    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        lazyLoad: 'ondemand',
        arrows: false,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const faqs: Array<FaqItem> = [
        { question: "Should I lease an electric or hybrid car?", answer: "If you want a brand-new, eco-friendly vehicle that’s cheap to run, choose electric or hybrid  car leasing. Simply make the monthly payments until the lease is up, and then return the car to us." },
        { question: "What are the best electric or hybrid cars to lease?", answer: "The most popular EVs include the <a href=\"https://www.leasingoptions.co.uk/car-leasing/tesla/model-3\">Tesla Model S</a>, the <a href=\"https://www.leasingoptions.co.uk/car-leasing/jaguar/i-pace\">Jaguar I-Pace</a> and the <a href=\"https://www.leasingoptions.co.uk/car-leasing/nissan/leaf\">Nissan Leaf</a>. Other hybrid favourites are the <a href=\"https://www.leasingoptions.co.uk/car-leasing/toyota/prius\">Toyota Prius</a> and the <a href=\"https://www.leasingoptions.co.uk/car-leasing/hyundai/ioniq\">Hyundai Ioniq</a>. " },
        { question: "How much is it to lease an electric or hybrid car?", answer: "You can lease an electric car for less than £250 a month, but the average is around £350. Our deals are tailored to your budget, allowing you to decide how much you want to pay, after your initial rental." },
        { question: "What are the cheapest electric or hybrid cars?", answer: "The cheapest electric cars are normally small hatchbacks, like the <a href=\"https://www.leasingoptions.co.uk/car-leasing/renault/zoe\">Renault Zoe</a>, the <a href=\"https://www.leasingoptions.co.uk/car-leasing/nissan/leaf\">Nissan Leaf</a> and the <a href=\"https://www.leasingoptions.co.uk/car-leasing/skoda/citigo\">Skoda Citigo</a>. These cars have low running costs and are cheap to maintain." },
        { question: "Does the UK government grant apply to leasing?", answer: "Yes, you can receive up to £3,000 off your electric lease deal with the UK government grant. We automatically take this off your agreement, if your vehicle qualifies. You can also get a grant of up to £500 for installing a charge point in your home. Business drivers also get tax relief, including reduced a BiK rate." },
    ];

    return (
        <>
            <MetaHead>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webPageSchema }}></script>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceSchema }}></script>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: GetSerializedSchema(GetFaqsSchema(LeasingDealTypes.Personal, faqs)) }}></script>
            </MetaHead>

            <PageBanner className="page-banner--ehl" trustPilot={true}>
                <div className="row">
                    <div className="col-24 col-md-20 col-lg-14 pt-md-3 order-md-1">
                        <h1 className="text-white"><strong>Electric and Hybrid Car Leasing</strong></h1>
                    </div>
                    <div className="col-24 col-md-20 col-lg-14 order-md-3">
                        <button className="btn btn-primary btn-lg btn-fluid-xs mb-3 mb-md-5 mr-sm-3" role="button" onClick={() => { handleSearchClick(FuelTypes.Electric, "Electric"), logLabelEvent('Search', 'Click', 'electric_hero_search'); }}>Search Electric</button>
                        <button className="btn btn-secondary btn-lg btn-fluid-xs mb-3 mb-md-5" role="button" onClick={() => { handleSearchClick(FuelTypes.Hybrid, "Hybrid"), logLabelEvent('Search', 'Click', 'hybrid_hero_search'); }}>Search Hybrid</button>
                    </div>
                    <div className="col-24 col-md-20 col-lg-14 order-md-2">
                        <h2 className="text-white mb-3 mb-md-5">Cleaner driving and easy charging for less than you think. Upgrade today and get the best electric and hybrid car lease deals from Leasing Options.</h2>
                    </div>
                    <div className="col-24 col-md-20 col-lg-14 order-md-4">
                        <ul className="ehl-list d-none d-md-block">
                            <li className="text-white"><FontAwesomeIcon width="24" height="24" className="fill-green mr-2 mr-md-3" icon={faShieldCheck} /> Reduced monthly costs &amp; initial down payment</li>
                            <li className="text-white"><FontAwesomeIcon width="24" height="24" className="fill-green mr-2 mr-md-3" icon={faShieldCheck} /> Lower running costs</li>
                            <li className="text-white"><FontAwesomeIcon width="24" height="24" className="fill-green mr-2 mr-md-3" icon={faShieldCheck} /> Cheaper fuel expenses</li>
                            <li className="text-white"><FontAwesomeIcon width="24" height="24" className="fill-green mr-2 mr-md-3" icon={faShieldCheck} /> Drive advanced technology</li>
                            <li className="text-white"><FontAwesomeIcon width="24" height="24" className="fill-green mr-2 mr-md-3" icon={faShieldCheck} /> Save money with tax incentives</li>
                        </ul>
                        <div className="list-carousel d-md-none">
                            <Slider {...settings}>
                                <div className="list-carousel__column text-white"><FontAwesomeIcon width="24" height="24" className="fill-green mr-2 mr-md-3" icon={faShieldCheck} /> Reduce monthly &amp; initial rental costs</div>
                                <div className="list-carousel__column text-white"><FontAwesomeIcon width="24" height="24" className="fill-green mr-2 mr-md-3" icon={faShieldCheck} /> Lower running costs</div>
                                <div className="list-carousel__column text-white"><FontAwesomeIcon width="24" height="24" className="fill-green mr-2 mr-md-3" icon={faShieldCheck} /> Cheaper fuel expenses</div>
                                <div className="list-carousel__column text-white"><FontAwesomeIcon width="24" height="24" className="fill-green mr-2 mr-md-3" icon={faShieldCheck} /> Drive pioneering technology</div>
                                <div className="list-carousel__column text-white"><FontAwesomeIcon width="24" height="24" className="fill-green mr-2 mr-md-3" icon={faShieldCheck} /> Save money with tax Incentives</div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </PageBanner>
            <NavigationEv active={EvPageTypes.Hybrid} />
            <CardWithStickers>
            <section className="container-fluid py-4 py-md-5">
                <div className="row">
                    <div className="col-24 col-md-16">
                        <h3>Why Choose an Electric or Hybrid Car Lease?</h3>
                        <h4 className="body-text text-muted">With cheaper running costs, less maintenance and plug-in grants available, get brilliant savings when you go electric or hybrid.</h4>
                        <ExpandableText theme="light">
                            {'<p>Lease a brand-new electric or hybrid car at an affordable price. Choose an electric vehicle (EV), hybrid electric vehicle (HEV) or a plug-in hybrid vehicle (PHEV) from over 30 familiar brands such as <a href="https://www.leasingoptions.co.uk/car-leasing/audi">Audi</a>, <a href="https://www.leasingoptions.co.uk/car-leasing/bmw">BMW</a>, <a href="https://www.leasingoptions.co.uk/car-leasing/nissan">Nissan</a>, <a href="https://www.leasingoptions.co.uk/car-leasing/tesla">Tesla</a> and more.</p><p>Charging is easier than ever, with over 30,000 charge points across the UK and home installation now made simple and affordable. Take advantage of tax incentives too, thanks to zero or low emissions.</p><p>Businesses can also go green with our EV and hybrid lease deals, where you can get a director’s car or a fully electric fleet for less, with a reduced BiK rate and up to 100% VAT back.</p><p>Choose an electric or hybrid lease deal today from Leasing Options and drive the EV you want for a fixed monthly payment. With a five-star Trustpilot rating and 30 years’ experience, our customer service is unrivalled. Once your contract ends, simply return the car to us – no fuss, no hassle and no depreciation costs.</p>'}
                        </ExpandableText>
                    </div>
                    <div className="col-24 col-md-8 d-none d-md-block">
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/electric/electric-charging.jpg`} className="lazyload img-fluid" alt="Electric charge point" />
                    </div>
                </div>
            </section>
            <section className="container-fluid py-3 py-md-5 bg-electric">
                <div className="row">
                    <div className="col-24">
                        <h3 className="text-black text-center text-md-left">Popular Electric Cars</h3>
                    </div>
                    <div className="col-24 py-1 py-md-0">
                        <VehicleCarousel className="slick-paginated" dots={true} mobileAuto={true} tabletArrows={true} desktopArrows={true} infinite={true} slidesMax={4}>
                            {electricModelPreviews?.dataItems?.map((model, index) => {
                                return (
                                    <CardElectric key={`vehicle-${index}`} leasingDealType={leasingDealType} vehicle={model} />
                                )
                            })}
                        </VehicleCarousel>
                    </div>
                    <div className="col-24 text-center my-5 my-md-0">
                        <Link passHref href={`${GetVehiclesSearchUrl(leasingDealType, '', `mileage=${vehicleFilterQuery.mileage}&rentals=${vehicleFilterQuery.initialRentals}&term=${vehicleFilterQuery.term}&fuel=${FuelTypes.Electric}`)}`}><a className="btn btn-primary btn-lg btn-block-xs">View All Electric Cars</a></Link>
                    </div>
                </div>
            </section>
            <section className="container-fluid py-4 py-md-5">
                <div className="row">
                    <div className="col-24 col-md-16">
                        <h3>Business Benefits of Electric Car Leasing</h3>
                        <p>Whether you’re looking for a director’s car or a full fleet of electric vans, our EV and hybrid lease deals are ideal for making money management easy and improving your cash flow.</p>
                        <p>You can also enjoy a huge range of tax benefits, including a reduced BiK rate and up to 100% of VAT back for eligible businesses.</p>
                        <h3>Electric Lease Deals from Over 30 Manufacturers</h3>
                        <p>We offer green car leasing from 37 trusted manufacturers. Choose from reliable brands who are bringing new EVs to the market, including <Link passHref href="/car-leasing/audi"><a>Audi</a></Link>, <Link passHref href="/car-leasing/mercedes-benz"><a>Mercedes-Benz</a></Link> and <Link passHref href="/car-leasing/bmw"><a>BMW</a></Link>. But not forgetting the leader of the electric car market, <Link passHref href="/car-leasing/tesla"><a>Tesla</a></Link>.</p>
                        <p>You can also find a range of affordable options, including electric and hybrid hatchbacks from <Link passHref href="/car-leasing/renault"><a>Renault</a></Link>, <Link passHref href="/car-leasing/kia"><a>Kia</a></Link> and <Link passHref href="/car-leasing/nissan"><a>Nissan</a></Link>. Whatever your budget, you’re sure to find a great price on an EV, HEV or PHEV with our special offers.</p>
                    </div>
                    <div className="col-24 col-md-8 mt-3 mt-md-0">
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/electric/electric-charging-2.jpg`} className="lazyload img-fluid" alt="Electric charge point" />
                    </div>
                </div>
            </section>
            <section className="container-fluid py-4 py-md-5 bg-electric">
                <div className="row">
                    <div className="col-24">
                        <h3 className="text-black text-center text-md-left">Popular Hybrid Cars</h3>
                    </div>
                    <div className="col-24 py-1 py-md-0">
                        <VehicleCarousel className="slick-paginated" dots={true} mobileAuto={true} tabletArrows={true} desktopArrows={true} infinite={true} slidesMax={4}>
                            {hybridModelPreviews?.dataItems?.map((model, index) => (
                                <CardElectric key={`vehicle-${index}`} leasingDealType={leasingDealType} vehicle={model} />
                            ))}
                        </VehicleCarousel>
                    </div>
                    <div className="col-24 text-center my-5 my-md-0">
                        <Link passHref href={`${GetVehiclesSearchUrl(leasingDealType, '', `mileage=${vehicleFilterQuery.mileage}&rentals=${vehicleFilterQuery.initialRentals}&term=${vehicleFilterQuery.term}&fuel=${FuelTypes.Hybrid}`)}`}><a className="btn btn-primary btn-lg btn-block-xs">View All Hybrid Cars</a></Link>
                    </div>
                </div>
            </section>
            </CardWithStickers>
            <section className="container-fluid py-4 py-md-5">
                <div className="row">
                    <div className="col-24 col-md-18 offset-md-3">
                        <h3 className="text-center">Types of Electric and Hybrid Cars Explained</h3>
                        <h4 className="body-text text-center text-muted">What’s the difference between an EV, HEV, PHEV or E-REV? Check out our simple guides below to see which type of electric vehicle is right for you.</h4>
                    </div>
                    <div className="col-24 mt-3 mt-md-5">
                        <div className="row">
                            <div className="col-24 col-md-6 offset-md-3 px-3 px-md-4 mb-3 mb-md-0">
                                <div id="bev-box" className="box-overlay">
                                    <style dangerouslySetInnerHTML={{ __html: `#bev-box { background-image: url('${process.env.NEXT_PUBLIC_CDN}/website/electric/box-marking.png');}` }}></style>
                                    {/* <Link passHref href="/"><a></a></Link> */}
                                    <div className="box-overlay_caption h4 m-0">Pure Electric Car (BEV)</div>
                                </div>
                            </div>
                            <div className="col-24 col-md-6 px-3 px-md-4 mb-3 mb-md-0">
                                <div id="phev-box" className="box-overlay">
                                    <style dangerouslySetInnerHTML={{ __html: `#phev-box { background-image: url('${process.env.NEXT_PUBLIC_CDN}/website/electric/box-charging.png');}` }}></style>
                                    {/* <Link passHref href="/"><a></a></Link> */}
                                    <div className="box-overlay_caption h4 m-0">Plug-in Hybrid (PHEV)</div>
                                </div>
                            </div>
                            <div className="col-24 col-md-6 px-3 px-md-4">
                                <div id="hev-box" className="box-overlay">
                                    <style dangerouslySetInnerHTML={{ __html: `#hev-box { background-image: url('${process.env.NEXT_PUBLIC_CDN}/website/electric/box-engine.png');}` }}></style>
                                    <Link passHref href="/advice/electric-leasing/what-is-a-hybrid-car"><a></a></Link>
                                    <div className="box-overlay_caption h4 m-0">Hybrid Electric Vehicle (HEV)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Faqs faqs={faqs} title="Electric and Hybrid Leasing FAQs" className="bg-light-grey" />
            <section className="container-fluid py-4 py-md-5">
                <div className="row">
                    <div className="col-24">
                        <h3>Electric Leasing Guides</h3>
                    </div>
                    <div className="col-24 mt-3">
                        <VehicleCarousel className="slick-paginated" dots={true} tabletArrows={true} desktopArrows={true} infinite={true} slidesMax={4}>
                            {advice.dataItems.map((article, index) => {
                                let categoryName = _.find(categoryList || [], function (item) { return item.url === article.categoryUrl; })

                                return (
                                    <CardGuides key={article.id} className="card-guides--space" condensed={false} id={`article-${article.id}`} image={article.imageUrl} tag={categoryName.name} link={article.url} title={article.pageTitle} date={article.publishDate} excerpt={article.pageSubtitle} category={article.categoryUrl} />
                                )
                            })}
                        </VehicleCarousel>
                    </div>
                </div>
            </section>
        </>
    )
}

ElectricLeasing.layout = MainLayout;

function mapStateToProps(state) {
    return {
        leasingDealType: state.dealSelector
    };
}

export default connect(mapStateToProps)(ElectricLeasing);