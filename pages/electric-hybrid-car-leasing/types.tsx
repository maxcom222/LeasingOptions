import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import MainLayout from '../../components/layout/main-layout';
import PageBanner from '../../components/page-banner';
import ExpandableText from '../../components/expandable-text';
import VehicleCarousel from '../../components/vehicle-carousel';
import CardElectric from '../../components/card/card-electric';
import MetaHead from '../../components/seo/meta';
import ModalContext from '../../components/HOCs/modal/modalContext';
import NavigationEv from '../../components/layout/navigation-ev';
import Search from '../../components/search';
import wrapper from 'redux/store.tsx/store';
import Link from 'next/link';
import { LayoutProps } from 'types/LayoutProps';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { EvPageTypes } from 'enums/EvPageTypes';
import { VehicleTypes } from 'enums/VehicleTypes';
import { getLandingPageSchema, GetServiceSchema } from 'helpers/schemaHelper';
import { MetaData } from 'types/infrastructure/MetaData';
import { getBaseUrl } from 'helpers/urlsHelper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faBolt, faBatteryEmpty } from "@fortawesome/pro-solid-svg-icons";
import { faBatteryFull, faPlug, faGasPump, faChevronRight } from "@fortawesome/pro-light-svg-icons";
import { logLabelEvent } from 'helpers/analytics';
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { getLOSSRFetchHeaders } from 'helpers/apiHelper';
import { PaginationCriteria } from 'types/PaginationCriteria';
import { SortingCriteria } from 'types/SortingCriteria';
import { GetVehiclesSearchUrl } from '../../helpers/urlHelper';
import { FuelTypes } from 'enums/FuelTypes';
import { VehiclesFilter } from 'types/VehiclesFilter';
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
        const webPageSchema = getLandingPageSchema(LeasingDealTypes.Personal, context.req.url);
        const serviceSchema = await GetServiceSchema(VehicleTypes.Car);
        const metaData: MetaData = {
            title: `Types of Electric Cars - Which is Best? | Leasing Options`,
            description: `Can't decide which electric vehicle (EV) is right for you? Explore the benefits of a BEV, HEV and a PHEV as we explain the three types of electric car.`,
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
            }
        }

    }
)

type Props = {
    serviceSchema: string,
    webPageSchema: string,
    leasingDealType: LeasingDealTypes,
    electricModelPreviews: any,
    hybridModelPreviews: any,
    vehicleFilterQuery: VehiclesFilter,
}

const ElectricTypes: LayoutProps<Props> = ({ serviceSchema, webPageSchema, leasingDealType, electricModelPreviews, hybridModelPreviews, vehicleFilterQuery }) => {
    const dispatch = useDispatch();
    const modalContext = useContext(ModalContext);
    const handleSearchClick = (fuelType, fuelLabel) => {
        dispatch({ type: 'UPDATE_FILTERS', filterName: "fuelType", filterValue: { id: fuelType, name: fuelLabel } });
        modalContext.showModal(Search, { show: true, title: "Detailed Search", activePanel: 6 })
    }

    return (
        <>
            <MetaHead>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webPageSchema }}></script>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceSchema }}></script>
            </MetaHead>

            <PageBanner className="page-banner--eclt" trustPilot={true} trustPilotCentered={true} padded={false}>
                <div className="row">
                    <div className="col-24 col-md-12 offset-md-6 pt-md-3 pb-5 pb-md-0 text-center">
                        <h1 className="text-white text-center"><strong>Electric Car Types Explained</strong></h1>
                        <h2 className="text-white text-center mb-3 mb-md-5">Can't decide between a <strong>BEV, HEV</strong> or a <strong>PHEV?</strong> Explore the benefits of the three types of electric or hybrid cars here and find the right vehicle for you.</h2>
                        <button className="btn btn-secondary btn-lg btn-fluid-xs mb-3 mb-md-5 mr-sm-3" role="button" onClick={() => { handleSearchClick(FuelTypes.Hybrid, "Hybrid"), logLabelEvent('Search', 'Click', 'hyrbid_hero_search'); }}>Search Hybrid</button>
                        <button className="btn btn-primary btn-lg btn-fluid-xs mb-3 mb-md-5" role="button" onClick={() => { handleSearchClick(FuelTypes.Electric, "Electric"), logLabelEvent('Search', 'Click', 'electric_hero_search'); }}>Search Electric</button>
                        <FontAwesomeIcon icon={faBolt} />
                        <FontAwesomeIcon icon={faBatteryEmpty} />
                    </div>
                </div>
            </PageBanner>
            <NavigationEv active={EvPageTypes.Type} />
            <section className="container-fluid py-4 py-md-5">
                <div className="row">
                    <div className="col-24 col-md-16 offset-md-4 mb-1 mb-md-3">
                        <h3 className="text-center">What are the types of electric and hybrid cars?</h3>
                        <p className="text-center">There are three types of electric and hybrid vehicles (EV). Choose from the battery electric, hybrid or plug-in hybrid.</p>
                        <p className="text-center">If you don’t know which one is best for your driving needs, discover the benefits of each type of <Link passHref href="/electric-hybrid-car-leasing"><a>electric or hybrid car here</a></Link>.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-8 col-md-4 offset-md-6 pr-2 pr-md-3 text-center">
                        <Link passHref href="#more-bevs">
                            <a className="d-flex flex-wrap justify-content-center align-items-center">
                                <FontAwesomeIcon className="icon-electric" icon={faBatteryFull} />
                                <span className="w-100 d-block mt-2"><span className="d-none d-md-inline">Learn a</span><span className="d-inline d-md-none">A</span>bout BEVs</span>
                            </a>
                        </Link>
                    </div>
                    <div className="col-8 col-md-4 px-2 px-md-3 text-center">
                        <Link passHref href="#more-hevs">
                            <a className="d-flex flex-wrap justify-content-center align-items-center">
                                <FontAwesomeIcon className="icon-electric" icon={faGasPump} />
                                <span className="w-100 d-block mt-2"><span className="d-none d-md-inline">Learn a</span><span className="d-inline d-md-none">A</span>bout HEVs</span>
                            </a>
                        </Link>
                    </div>
                    <div className="col-8 col-md-4 pl-2 pl-md-3 text-center">
                        <Link passHref href="#more-phevs">
                            <a className="d-flex flex-wrap justify-content-center align-items-center">
                                <FontAwesomeIcon className="icon-electric" icon={faPlug} />
                                <span className="w-100 d-block mt-2"><span className="d-none d-md-inline">Learn a</span><span className="d-inline d-md-none">A</span>bout PHEVs</span>
                            </a>
                        </Link>
                    </div>
                </div>
            </section>
            <section id="more-bevs" className="container-fluid py-4 py-md-5 bg-light-grey">
                <div className="row">
                    <div className="col-24 col-md-12 d-flex px-0 px-md-3">
                        <div className="w-100 box bg-white p-md-4 mb-3 mb-md-0">
                            <h3 className="text-center mb-3 mb-md-4">Battery Electric Vehicles (BEVs)</h3>
                            <ExpandableText theme="light">
                                {`<p>BEVs are all-electric vehicles that are powered purely by electric motors and a battery pack, which can be conveniently recharged at home or at one of 30,000 UK charge points.</p><p>They’re quiet and easy to drive, plus range is around 100-150 miles on a single full charge. BEVs also produce no tailpipe emissions, making them the most eco-friendly choice.</p>`}
                            </ExpandableText>
                        </div>
                    </div>
                    <div className="col-24 col-md-12 d-flex px-0 px-md-3">
                        <div className="w-100 box box--eclt d-flex flex-wrap justify-content-center align-items-center d-md-block p-md-4">
                            <h3 className="text-center mb-3 mb-md-4">Advantages of BEVs</h3>
                            <ul className="mb-3 mb-md-5">
                                <li><FontAwesomeIcon width="18" height="18" icon={faCheckCircle} /> A pure-electric car with zero emissions</li>
                                <li><FontAwesomeIcon width="18" height="18" icon={faCheckCircle} /> Ideal for everyday driving and medium commutes</li>
                                <li><FontAwesomeIcon width="18" height="18" icon={faCheckCircle} /> Cheap running costs and less maintenance</li>
                                <li><FontAwesomeIcon width="18" height="18" icon={faCheckCircle} /> Tax benefits for business drivers</li>
                            </ul>
                            <Link passHref href={`${GetVehiclesSearchUrl(leasingDealType, '', `mileage=${vehicleFilterQuery.mileage}&rentals=${vehicleFilterQuery.initialRentals}&term=${vehicleFilterQuery.term}&fuel=${FuelTypes.Electric}`)}`}><a className="w-100 d-block text-center">See BEVs <FontAwesomeIcon width="8" height="16" icon={faChevronRight} /></a></Link>
                            <FontAwesomeIcon className="icon-electric" icon={faBatteryFull} />
                        </div>
                    </div>
                </div>
            </section>
            <section className="container-fluid py-3 py-md-5 bg-electric">
                <div className="row">
                    <div className="col-24">
                        <h3 className="text-black text-center text-md-left">Popular BEV Cars</h3>
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
                        <Link passHref href={`${GetVehiclesSearchUrl(leasingDealType, '', `mileage=${vehicleFilterQuery.mileage}&rentals=${vehicleFilterQuery.initialRentals}&term=${vehicleFilterQuery.term}&fuel=${FuelTypes.Electric}`)}`}><a className="btn btn-primary btn-lg btn-block-xs">View All Electric Cars <FontAwesomeIcon width="8" height="16" icon={faChevronRight} /></a></Link>
                    </div>
                </div>
            </section>
            <section id="more-hevs" className="container-fluid py-4 py-md-5 bg-light-grey">
                <div className="row">
                    <div className="col-24 col-md-12 d-flex px-0 px-md-3">
                        <div className="w-100 box bg-white p-md-4 mb-3 mb-md-0">
                            <h3 className="text-center mb-3 mb-md-4">Hybrid Electric Vehicles (HEVs)</h3>
                            <ExpandableText theme="light">
                                {`<p>Get the best of both worlds with HEVs, powered by both an electric battery and an internal combustion engine. HEVs switch between the two, so you can drive at lower speeds on electric power, and then the petrol or diesel engine kicks in on the motorway or if you have a heavy load.</p><p>Range is less than an all-electric car at around 1-2 miles, but you don’t need an external charge point for HEVs. The conventional engine recharges the battery and can be topped up by regenerative braking while you drive.</p>`}
                            </ExpandableText>
                        </div>
                    </div>
                    <div className="col-24 col-md-12 d-flex px-0 px-md-3">
                        <div className="w-100 box box--eclt d-flex flex-wrap justify-content-center align-items-center d-md-block p-md-4">
                            <h3 className="text-center mb-3 mb-md-4">Benefits of HEVs</h3>
                            <ul className="mb-3 mb-md-5">
                                <li><FontAwesomeIcon width="18" height="18" icon={faCheckCircle} /> Ideal for stop-start city driving</li>
                                <li><FontAwesomeIcon width="18" height="18" icon={faCheckCircle} /> Better fuel economy on short trips</li>
                                <li><FontAwesomeIcon width="18" height="18" icon={faCheckCircle} /> Fewer emissions</li>
                                <li><FontAwesomeIcon width="18" height="18" icon={faCheckCircle} /> Cheap to run</li>
                            </ul>
                            <Link passHref href={`${GetVehiclesSearchUrl(leasingDealType, '', `mileage=${vehicleFilterQuery.mileage}&rentals=${vehicleFilterQuery.initialRentals}&term=${vehicleFilterQuery.term}&fuel=${FuelTypes.Hybrid}`)}`}><a className="w-100 d-block text-center">See HEVs <FontAwesomeIcon width="8" height="16" icon={faChevronRight} /></a></Link>
                            <FontAwesomeIcon className="icon-electric" icon={faPlug} />
                        </div>
                    </div>
                </div>
            </section>
            <section className="container-fluid py-4 py-md-5 bg-electric">
                <div className="row">
                    <div className="col-24">
                        <h3 className="text-black text-center text-md-left">Popular HEV and PHEV Cars</h3>
                    </div>
                    <div className="col-24 py-1 py-md-0">
                    <CardWithStickers>
                        <VehicleCarousel className="slick-paginated" dots={true} mobileAuto={true} tabletArrows={true} desktopArrows={true} infinite={true} slidesMax={4}>
                            {hybridModelPreviews?.dataItems?.map((model, index) => (
                                <CardElectric key={`vehicle-${index}`} leasingDealType={leasingDealType} vehicle={model} />
                            ))}
                        </VehicleCarousel>
                        </CardWithStickers>
                    </div>
                    <div className="col-24 text-center my-5 my-md-0">
                        <Link passHref href={`${GetVehiclesSearchUrl(leasingDealType, '', `mileage=${vehicleFilterQuery.mileage}&rentals=${vehicleFilterQuery.initialRentals}&term=${vehicleFilterQuery.term}&fuel=${FuelTypes.Hybrid}`)}`}><a className="btn btn-primary btn-lg btn-block-xs">View All Hybrid Cars</a></Link>
                    </div>
                </div>
            </section>
            <section id="more-phevs" className="container-fluid py-4 py-md-5 bg-light-grey">
                <div className="row">
                    <div className="col-24 col-md-12 d-flex px-0 px-md-3">
                        <div className="w-100 box bg-white p-md-4 mb-3 mb-md-0">
                            <h3 className="text-center mb-3 mb-md-4">Plug-in Hybrid Electric Vehicles (PHEVs)</h3>
                            <ExpandableText theme="light">
                                {`<p>PHEVs are still hybrid cars, but the major difference is that you can recharge the battery through a charge point. Drivers benefit from both a conventional engine and electric power, which charges as you drive. But you can also top up the battery at home or on the move.</p><p>Range is larger than a standard hybrid – around 10-40 miles before the petrol or diesel engine kicks in – but you can plug-in to public charge points whenever you need.</p>`}
                            </ExpandableText>
                        </div>
                    </div>
                    <div className="col-24 col-md-12 d-flex px-0 px-md-3">
                        <div className="w-100 box box--eclt d-flex flex-wrap justify-content-center align-items-center d-md-block p-md-4">
                            <h3 className="text-center mb-3 mb-md-4">Advantages of PHEVs</h3>
                            <ul className="mb-3 mb-md-5">
                                <li><FontAwesomeIcon width="18" height="18" icon={faCheckCircle} /> Great for city driving or short, busy commutes</li>
                                <li><FontAwesomeIcon width="18" height="18" icon={faCheckCircle} /> Get the option to top up the battery if you need</li>
                                <li><FontAwesomeIcon width="18" height="18" icon={faCheckCircle} /> Fuel savings on shorter trips</li>
                                <li><FontAwesomeIcon width="18" height="18" icon={faCheckCircle} /> Drive in clean air zones for less</li>
                            </ul>
                            <Link passHref href={`${GetVehiclesSearchUrl(leasingDealType, '', `mileage=${vehicleFilterQuery.mileage}&rentals=${vehicleFilterQuery.initialRentals}&term=${vehicleFilterQuery.term}&fuel=${FuelTypes.Electric}`)}`}><a className="w-100 d-block text-center">See PHEVs <FontAwesomeIcon width="8" height="16" icon={faChevronRight} /></a></Link>
                            <FontAwesomeIcon className="icon-electric" icon={faGasPump} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

ElectricTypes.layout = MainLayout;

function mapStateToProps(state) {
    return {
        leasingDealType: state.dealSelector
    };
}

export default connect(mapStateToProps)(ElectricTypes);