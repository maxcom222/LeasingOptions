import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import MainLayout from '../components/layout/main-layout';
import PageBanner from '../components/page-banner';
import TrustMini from '../components/trustpilot/trust-mini';
import ExpandableText from '../components/expandable-text';
import VehicleCarousel from '../components/vehicle-carousel';
import CardElectric from '../components/card/card-electric';
import Faqs from '../components/layout/faqs';
import MetaHead from 'components/seo/meta';
import ModalContext from '../components/HOCs/modal/modalContext';
import Search from '../components/search';
import wrapper from 'redux/store.tsx/store';
import Link from 'next/link';
import { FaqItem } from 'types/FaqItem';
import { LayoutProps } from 'types/LayoutProps';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { VehicleTypes } from 'enums/VehicleTypes';
import { getLandingPageSchema, GetServiceSchema, GetFaqsSchema, GetSerializedSchema } from 'helpers/schemaHelper';
import { MetaData } from 'types/infrastructure/MetaData';
import { getBaseUrl } from 'helpers/urlsHelper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldCheck } from "@fortawesome/pro-solid-svg-icons";
import { faCar, faBriefcase, faThumbsUp, faThumbsDown } from "@fortawesome/pro-light-svg-icons";
import { faTimes } from "@fortawesome/pro-regular-svg-icons";
import { getLOSSRFetchHeaders } from 'helpers/apiHelper';
import { PaginationCriteria } from 'types/PaginationCriteria';
import { SortingCriteria } from 'types/SortingCriteria';
import { logLabelEvent } from 'helpers/analytics';
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { GetVehiclesSearchUrl } from '../helpers/urlHelper';
import { FuelTypes } from 'enums/FuelTypes';
import { VehiclesFilter } from 'types/VehiclesFilter';
import { getVehiclesFilter } from 'helpers/vehiclesFilterHelper';
import { TrustThemeTypes } from 'enums/TrustThemeTypes';
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
        let hydrogenModelPreviews = await GetVehicleModelPreviews(vehicleFilterQuery, paginationCriteria, sortingCriteria, fetchHeaders);

        const webPageSchema = getLandingPageSchema(LeasingDealTypes.Personal, context.req.url);
        const serviceSchema = await GetServiceSchema(VehicleTypes.Car);

        const metaData: MetaData = {
            title: `Hydrogen Car Lease Deals & Contract Hire | Leasing Options`,
            description: `Find the best hydrogen car lease deals from Leasing Options. Latest environmentally friendly models. Get a FREE quote today - we won't be beaten on price.`,
            canonicalUrl: GetCanonicalUrl(getBaseUrl(context.req.url)),
            keywords: ``
        }

        return {
            props: {
                metaData: metaData,
                serviceSchema: serviceSchema,
                webPageSchema: webPageSchema,
                hydrogenModelPreviews: hydrogenModelPreviews.data,
                vehicleFilterQuery: vehicleFilterQuery
            }
        }

    }
)

type Props = {
    serviceSchema: string,
    webPageSchema: string,
    hydrogenModelPreviews: any,
    leasingDealType: LeasingDealTypes,
    vehicleFilterQuery: VehiclesFilter,
}

const HydrogenLeasing: LayoutProps<Props> = ({ serviceSchema, webPageSchema, hydrogenModelPreviews, leasingDealType, vehicleFilterQuery }) => {
    const dispatch = useDispatch();
    const modalContext = useContext(ModalContext);
    const handleSearchClick = () => {
        dispatch({ type: 'UPDATE_FILTERS', filterName: "fuelType", filterValue: { id: FuelTypes.Hybrid, name: 'Hybrid' } });
        modalContext.showModal(Search, { show: true, title: "Detailed Search", activePanel: 6 })
    }

    const faqs: Array<FaqItem> = [
        { question: "How do hydrogen cars work?", answer: "There are two types of hydrogen vehicles. The first is an internal combustion engine style which burns the hydrogen as it normally would with petrol or diesel. The second is the electric vehicle, which use a fuel cell powered by hydrogen." },
        { question: "What is the internal combustion engine (ICE) style?", answer: "The process is very similar to traditional ICE vehicles, where the fuel is turned to combustive energy by a chemical reaction and ignition of the fuel. The explosive power pushes the piston down which rotates the crankshaft. Then, the rotation torque is transferred to the gearbox and wheels." },
        { question: "What is the electric vehicle style?", answer: "Hydrogen is sorted in a tank, just like a conventional internal combustion engine vehicle stores petrol or diesel. The hydrogen is then supplied to the fuel cell where a chemical reaction takes place. Energy is supplied to the electric motor, which powers it to spin and turn the wheels." },
        { question: "How is hydrogen used as a fuel for cars?", answer: "Hydrogen is a replenishable fuel source which is held in a pressurised tank and supplied to the fuel cell when needed. The fuel cell has three main parts – an anode, a cathode, the electrolyte. Hydrogen from the tank is passed through the anode, whilst oxygen is passed through the cathode and the electrolyte sits in between the two. Chemical reactions happen between the three parts and the hydrogen is consumed in the reaction. This produces an electrical current which powers the electric motor." },
        { question: "Do hydrogen cars pollute?", answer: "No, the only emissions from the hydrogen fuel cell are from water. Hydrogen itself isn’t a renewable energy source, as its creation and harvesting still burns fossil fuels, but the pollution is moved from the roadside and into the manufacturing process." },
        { question: "Can I drive a hydrogen-powered car?", answer: "Globally, there are three hydrogen-powered vehicles available: the Toyota Mirai, the Honda Clarity or the <a href=\"https://www.leasingoptions.co.uk/car-leasing/hyundai/nexo/nexo-estate/hydrogen-fuel-cell-premium-se-5dr-cvt/1100354563/vehicle\">Hyundai Nexo</a>, which you can lease now." },
        { question: "How much is it to fill a hydrogen car?", answer: "Hydrogen is supplied and measured in kilograms and priced between £10 and £15 per kg. This would mean the Hyundai Nexo would cost between £63 and £95 to fill its 6.33kg tank. " },
        { question: "How safe are hydrogen cars?", answer: "Hydrogen cars are just as safe as petrol cars. In fact, the average petrol tank holds more explosive power than a hydrogen vehicle. The fuel cell and tank are built very strongly and form part of the vehicle’s structure. In the event of an accident or collision, the fuel tank is heavily protected. Plus, as hydrogen is one of the lightest elements, any escaping hydrogen will quickly dissipate into the atmosphere. On the other hand, petrol vapour will pool and collect just above the ground, as it’s a heavier element than air." },
        { question: "What is the future of hydrogen cars?", answer: "As electric vehicles become more popular, hydrogen cars will become more niche. Some manufacturers will keep developing the technology and others will abandon it. But those who continue with hydrogen will have an advantage. A great benefit of hydrogen as a fuel source is the ability to fill the tank in as little as five minutes, compared to longer electric battery charging times. This could be key to the future of hydrogen cars. To have a sustainable future in the automotive sector, hydrogen production must be cleaner and efficient, but this is growing all the time. Hydrogen cars on our roads aren’t as far away as you might think." },
    ];

    return (
        <>
            <MetaHead>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webPageSchema }}></script>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceSchema }}></script>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: GetSerializedSchema(GetFaqsSchema(LeasingDealTypes.Personal, faqs)) }}></script>
            </MetaHead>

            <PageBanner className="page-banner--hl">
                <div className="row">
                    <div className="col-24 col-md-20 col-lg-13 pt-md-3">
                        <h1 className="text-white mb-4"><strong>Hydrogen Car Lease Deals</strong></h1>
                        <h2 className="text-white mb-4">Experience hydrogen power and drive the latest generation of eco vehicles. The UK’s first hydrogen car lease deals, available from Leasing Options.</h2>
                        <p className="text-white mb-4">All hydrogen cars are currently out of stock.</p>
                        {/* <button className="btn btn-primary btn-lg btn-fluid-xs mb-4 mr-sm-3" id="vehicle-search-button" role="button" onClick={() => { handleSearchClick(), logLabelEvent('Search', 'Click', 'hydrogen_hero_search'); }}>Search Hydrogen Deals</button> */}
                        {/* <Link passHref href="/car-leasing/hyundai/nexo"><a className="btn btn-primary btn-lg btn-fluid-xs mb-4">View All Hydrogen</a></Link> */}
                        <div className="d-none d-md-block"><TrustMini theme={TrustThemeTypes.Light} /></div>
                    </div>
                </div>
            </PageBanner>
            <section className="container-fluid py-4 py-md-5">
                <div className="row">
                    <div className="col-24 col-md-16 mb-5 mb-md-0">
                        <h3 className="mb-4">Why Go Hydrogen?</h3>
                        <h4 className="mb-4 body-text text-muted">With the government's plans to ban petrol, diesel and hybrid sales, hydrogen cars are the future of driving. Be the first to get the latest in eco technology for cheaper costs than you might think.</h4>
                        <ExpandableText theme="light">
                            {`<p>By 2035, hydrogen and electric vehicles will be the only choices on the market, as the UK government brings forward its plans to ban the sale of new petrol, diesel and hybrid vehicles.</p><p>Join the future of driving and get zero emissions, outstanding range and unmatched efficiency when you choose the latest hydrogen cars. Plus, you’ll lose no time waiting for the batteries to charge – simply refill and go.</p>`}
                        </ExpandableText>
                    </div>
                    <div className="col-24 col-md-8">
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/electric/hydrogen-car-layout.png`} className="lazyload img-fluid" alt="Hybrid car layout" />
                    </div>
                </div>
            </section>
            {/* <section className="container-fluid py-4 py-md-5 bg-electric">
                <div className="row">
                    <div className="col-24">
                        <h3 className="text-black text-center text-md-left">Popular Low &amp; Zero Emission Cars</h3>
                    </div>
                    <div className="col-24 py-1 py-md-0 mb-4 mb-md-0">
                        <VehicleCarousel className="slick-paginated" dots={true} mobileAuto={true} tabletArrows={true} desktopArrows={true} infinite={true} slidesMax={4}>
                            {hydrogenModelPreviews?.dataItems?.map((model, index) => (
                                <CardElectric key={`vehicle-${index}`} leasingDealType={leasingDealType} vehicle={model} />
                            ))}
                        </VehicleCarousel>
                    </div>
                    <div className="col-24 text-center my-5 my-md-0">
                        <Link passHref href={`${GetVehiclesSearchUrl(leasingDealType, '', `mileage=${vehicleFilterQuery.mileage}&rentals=${vehicleFilterQuery.initialRentals}&term=${vehicleFilterQuery.term}&fuel=${FuelTypes.Hybrid}`)}`}><a className="btn btn-primary btn-lg btn-block-xs mr-sm-3">View All Hydrogen</a></Link>
                        <Link passHref href="/car-leasing/hyundai/nexo"><a className="btn btn-primary btn-lg btn-block-xs">View All Hydrogen</a></Link>
                    </div>
                </div>
            </section> */}
            <section className="container-fluid pt-4 py-md-5 bg-light-grey">
                <div className="row">
                    <div className="col-24 mb-3">
                        <h3 className="mb-4">Benefits of Hydrogen Car Lease Deals</h3>
                        <h4 className="mb-4 mb-md-5 body-text text-muted">Our hydrogen car lease deals give you access to the latest models for one fixed, monthly payment. Simply choose your brand-new vehicle online and we'll take care of the rest. When your contract ends, the car comes back to us, completely hassle-free.</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-24 col-md-12 mb-5 mb-md-0 px-0 px-md-3 d-flex">
                        <div className="box-background box-icon-list hydro-personal">
                            <h3 className="mb-3 mb-md-4 text-center text-md-left">
                                <FontAwesomeIcon icon={faCar} className="mb-3 mb-md-0" />
                                <span className="d-block d-inline-block mb-3 mb-md-0 px-3 px-md-0">Personal Benefits of a Hydrogen Car Lease</span>
                                <FontAwesomeIcon width="24" height="24" className="d-md-none mb-3 mb-md-0" icon={faShieldCheck} />
                            </h3>
                            <ul>
                                <li className="text-white"><FontAwesomeIcon width="24" height="24" icon={faShieldCheck} /> It's cheap (within reason)</li>
                                <li className="text-white"><FontAwesomeIcon width="24" height="24" icon={faShieldCheck} /> Provides three times as much energy as the equivalent quantity in petrol</li>
                                <li className="text-white"><FontAwesomeIcon width="24" height="24" icon={faShieldCheck} /> Holds energy well</li>
                                <li className="text-white"><FontAwesomeIcon width="24" height="24" icon={faShieldCheck} /> Enviromentally friendly</li>
                                <li className="text-white"><FontAwesomeIcon width="24" height="24" icon={faShieldCheck} /> Longer driving range</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-24 col-md-12 mb-5 mb-md-0 px-0 px-md-3 d-flex">
                        <div className="box-background box-icon-list hydro-business">
                            <h3 className="mb-3 mb-md-4 text-center text-md-left">
                                <FontAwesomeIcon icon={faBriefcase} className="mb-3 mb-md-0" />
                                <span className="d-block d-inline-block mb-3 mb-md-0 px-3 px-md-0">Business Benefits of a Hydrogen Car Lease</span>
                                <FontAwesomeIcon width="24" height="24" className="d-md-none mb-3 mb-md-0" icon={faShieldCheck} />
                            </h3>
                            <ul>
                                <li className="text-white"><FontAwesomeIcon width="24" height="24" icon={faShieldCheck} /> Fewer emissions</li>
                                <li className="text-white"><FontAwesomeIcon width="24" height="24" icon={faShieldCheck} /> Longer driving range</li>
                                <li className="text-white"><FontAwesomeIcon width="24" height="24" icon={faShieldCheck} /> Efficient</li>
                                <li className="text-white"><FontAwesomeIcon width="24" height="24" icon={faShieldCheck} /> Excempt from London congestion</li>
                                <li className="text-white"><FontAwesomeIcon width="24" height="24" icon={faShieldCheck} /> Low company tax rate</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container-fluid py-4 py-md-5">
                <div className="row">
                    <div className="col-24 mb-3">
                        <h3 className="mb-4">Pros &amp; Cons of Hydrogen Cars</h3>
                        <h4 className="mb-4 mb-md-5 body-text">Can't decide if you're ready to take the plunge? Here’s what you need to know before choosing a hydrogen car.</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-24 col-md-12 mb-3 mb-md-0">
                        <div className="box box-bordered box-icon-list p-0">
                            <div className="box__header bg-green-grad px-md-4"><h3 className="mb-0 text-white"><FontAwesomeIcon width="24" height="24" icon={faThumbsUp} /> Hydrogen Cars Pros</h3></div>
                            <div className="box__content bg-white px-md-4 py-3">
                                <ul className="icon-list">
                                    <li><FontAwesomeIcon width="24" height="24" className="fill-green" icon={faShieldCheck} /> <strong>High overall efficiency</strong></li>
                                    <li><FontAwesomeIcon width="24" height="24" className="fill-green" icon={faShieldCheck} /> <strong>High electrical efficiency</strong></li>
                                    <li><FontAwesomeIcon width="24" height="24" className="fill-green" icon={faShieldCheck} /> <strong>Less distribution loss</strong></li>
                                    <li><FontAwesomeIcon width="24" height="24" className="fill-green" icon={faShieldCheck} /> <strong>Lower carbon generated</strong></li>
                                    <li><FontAwesomeIcon width="24" height="24" className="fill-green" icon={faShieldCheck} /> <strong>No emissions at point of use</strong></li>
                                    <li><FontAwesomeIcon width="24" height="24" className="fill-green" icon={faShieldCheck} /> <strong>Lower fuel bills</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-24 col-md-12">
                        <div className="box box-bordered box-icon-list p-0">
                            <div className="box__header bg-red-grad px-md-4"><h3 className="mb-0 text-white"><FontAwesomeIcon width="24" height="24" icon={faThumbsDown} /> Hydrogen Cars Cons</h3></div>
                            <div className="box__content bg-white px-md-4 py-3">
                                <ul className="icon-list">
                                    <li><FontAwesomeIcon width="24" height="24" className="fill-red" icon={faTimes} /> <strong>Expensive to buy (not to lease though!)</strong></li>
                                    <li><FontAwesomeIcon width="24" height="24" className="fill-red" icon={faTimes} /> <strong>Lower lifetimes</strong></li>
                                    <li><FontAwesomeIcon width="24" height="24" className="fill-red" icon={faTimes} /> <strong>Poor infastructure for fuel</strong></li>
                                    <li><FontAwesomeIcon width="24" height="24" className="fill-red" icon={faTimes} /> <strong>Not zero carbon</strong></li>
                                    <li><FontAwesomeIcon width="24" height="24" className="fill-red" icon={faTimes} /> <strong>Public perception of safety</strong></li>
                                    <li><FontAwesomeIcon width="24" height="24" className="fill-red" icon={faTimes} /> <strong>Disruptive</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Faqs faqs={faqs} title="Hydrogen Car FAQs" className="bg-light-grey" />
        </>
    )
}

HydrogenLeasing.layout = MainLayout;

function mapStateToProps(state) {
    return {
        leasingDealType: state.dealSelector
    };
}

export default connect(mapStateToProps)(HydrogenLeasing);