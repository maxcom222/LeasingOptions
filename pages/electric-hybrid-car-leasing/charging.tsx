import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import MainLayout from '../../components/layout/main-layout';
import PageBanner from '../../components/page-banner';
import MetaHead from '../../components/seo/meta';
import ModalContext from '../../components/HOCs/modal/modalContext';
import NavigationEv from '../../components/layout/navigation-ev';
import ZapmapCta from '../../components/layout/zapmap-cta';
import Search from '../../components/search';
import wrapper from 'redux/store.tsx/store';
import Link from 'next/link';
import { FaqItem } from 'types/FaqItem';
import { LayoutProps } from 'types/LayoutProps';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { EvPageTypes } from 'enums/EvPageTypes';
import { VehicleTypes } from 'enums/VehicleTypes';
import { getLandingPageSchema, GetServiceSchema} from 'helpers/schemaHelper';
import { MetaData } from 'types/infrastructure/MetaData';
import { getBaseUrl } from 'helpers/urlsHelper';
import { logLabelEvent } from 'helpers/analytics';
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { FuelTypes } from 'enums/FuelTypes';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerSlow, faTachometerFast, faTachometerFastest } from "@fortawesome/pro-regular-svg-icons";
import { faMapMarkerAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faPlug, faClock, faChevronRight, faHome, faCarBuilding, faUniversalAccess } from "@fortawesome/pro-light-svg-icons";

export const getServerSideProps = wrapper.getServerSideProps(

    async (context) => {
        const webPageSchema = getLandingPageSchema(LeasingDealTypes.Personal, context.req.url);
        const serviceSchema = await GetServiceSchema(VehicleTypes.Car);
        const metaData: MetaData = {
            title: `Charging an Electric Car: The Complete Guide | Leasing Options`,
            description: `Find out everything you need to know about charging an electric car. Learn about costs, charge times, home installation and public charge points here.`,
            canonicalUrl: GetCanonicalUrl(getBaseUrl(context.req.url)),
            keywords: ``
        }

        return {
            props: {
                metaData: metaData,
                serviceSchema: serviceSchema,
                webPageSchema: webPageSchema,
            }
        }

    }
)

type Props = {
    serviceSchema: string,
    webPageSchema: string,
    faqs: Array<FaqItem>,
}

const ElectricCarCharging: LayoutProps<Props> = ({ serviceSchema, webPageSchema, faqs }) => {
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

            <PageBanner className="page-banner--ecc" trustPilot={true} trustPilotCentered={true} padded={false}>
                <div className="row">
                    <div className="col-24 col-md-12 offset-md-6 pt-md-3 pb-5 text-center">
                        <h1 className="text-white text-center"><strong>Electric Car Charging</strong></h1>
                        <p className="text-white text-center mb-3 mb-md-5">We make it simple to understand everything you need to know about charging an electric car. Read our complete guide on costs, charge times, home installation, public charge points and more.</p>
                        <button className="btn btn-secondary btn-lg btn-fluid-xs" role="button" onClick={() => { handleSearchClick(FuelTypes.Electric, "Electric"), logLabelEvent('Search', 'Click', 'electric_hero_search'); }}>Search Electric</button>
                    </div>
                    <div className="col-24 text-center">
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/electric/chargingimg.png`} className="lazyload img-fluid" alt="Electric Car Charging Banner" />
                    </div>
                </div>
            </PageBanner>
            <NavigationEv active={EvPageTypes.Charging} /> 
            <section className="container-fluid py-4 py-md-5">
                <div className="row">
                    <div className="col-24 col-md-16 offset-md-4 text-center">
                        <h3>How do you charge an electric car?</h3>
                        <p>An electric vehicle (EV) can be charged at home, at work or at one of 30,000 public charge points in the UK.</p>
                        <p>At most charge points, you can simply plug in your vehicle with the cable provided, or you might need to use your own. Many EV drivers charge their car at home overnight. If you have a long commute, you can also top it up at work. For lengthy journeys, you can access public charging points at shop-ping centres, supermarkets, car parks, service stations and more locations all over the UK.</p>
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/electric/charge.png`} className="lazyload img-fluid" alt="UK Plug-In Car Grant" />
                    </div>
                </div>
            </section>
            <section id="zapmap" className="container-fluid pt-4 pb-1 py-md-5 bg-black">
                <div className="row">
                    <div className="col-24 col-md-16 offset-md-4 text-center">
                        <h2 className="text-white">Find your closest EV charge point</h2>
                        <h6 className="text-white">Explore over 30,000 UK charge points with Open Charge Map.</h6>
                        {/* <div className="postcode-lookup">
                            <input type="text" className="form-control" placeholder="Enter your postcode" />
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                            <FontAwesomeIcon icon={faTimes} />
                        </div> */}
                    </div>
                    <div className="col-24 col-md-16 offset-md-4 px-0 px-md-3 pt-3 pt-md-4 text-center">
                        {/* <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/electric/zapmap.jpg`} className="lazyload img-fluid" alt="Zap Map" /> */}
                        <iframe src="https://map.openchargemap.io/?mode=embedded" allow="geolocation" frameBorder="0" width="100%" height="500px"></iframe>
                    </div>
                    <div className="col-24 col-md-16 offset-md-4 text-center pt-3 pt-md-4">
                        <p className="text-white">As drivers make the switch to electric, many more are choosing to install a wall charger at home. This allows you to conveniently charge your car at similar speeds to a public charge point. If you can’t install a wall charge, you can still use the conventional 3-pin plug.</p>
                    </div>
                </div>
            </section>
            <section className="container-fluid py-4 py-md-5 bg-light-grey">
                <div className="row">
                    <div className="col-24 text-center pb-4 pb-md-5">
                        <h2 className="mb-0">EV charger types</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-24 col-md-8 d-flex px-0 px-md-3 mb-3 mb-md-0">
                        <div className="w-100 box box--shadowless d-flex flex-wrap justify-content-between bg-white pt-5 px-5">
                            <div className="w-100 position-relative">
                                <h3 className="text-center"><FontAwesomeIcon icon={faTachometerSlow} className="fill-lime mr-2 mr-md-3" /> Slow chargers</h3>
                                <p className="text-md-center">Slow chargers charge up to 3 kW and are best for overnight charging at home. It usually takes between 6 and 12 hours for a pure EV, or 2 to 4 hours for a PHEV.</p>
                                <p className="text-md-center">EVs charge on slow devices using a cable which connects the vehicle to a 3-pin or Type 2 socket.</p>
                            </div>
                            <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/electric/type-commando-charger.png`} className="lazyload img-fluid" alt="Commander charger" />
                        </div>
                    </div>
                    <div className="col-24 col-md-8 d-flex px-0 px-md-3 mb-3 mb-md-0">
                        <div className="w-100 box box--shadowless d-flex flex-wrap justify-content-between bg-white pt-5 px-5">
                            <div className="w-100 position-relative">
                                <h3 className="text-center"><FontAwesomeIcon icon={faTachometerFast} className="fill-lime mr-2 mr-md-3" /> Fast chargers</h3>
                                <p className="text-md-center">Fast chargers provide power from 7 kW to 22 kW, which typically fully charge an EV in 3 to 4 hours.</p>
                                <p className="text-md-center">The most common public charge point in the UK is a 7 kW untethered Type 2 inlet, although tethered connectors are available for Type 1 and Type 2.</p>
                            </div>
                            <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/electric/type-1-charger.png`} className="lazyload img-fluid" alt="Type 1 charger" />
                        </div>
                    </div>
                    <div className="col-24 col-md-8 d-flex px-0 px-md-3 mb-3 mb-md-0">
                        <div className="w-100 box box--shadowless d-flex flex-wrap justify-content-between bg-white pt-5 px-5">
                            <div className="w-100 position-relative">
                                <h3 className="text-center"><FontAwesomeIcon icon={faTachometerFastest} className="fill-lime mr-2 mr-md-3" /> Rapid chargers</h3>
                                <p className="text-md-center">Rapid chargers are the fastest way to charge an electric car, charging up to 80% of your ve-hicle’s battery in less than an hour. You’ll mostly find them on motorways or outside city cen-tres.</p>
                                <p className="text-md-center">Rapid charge points charge at 43 kW or 50 kW for DC charging. You’ll also find ultra-rapid charge points, which can charge from 100 to 350 kW, but are DC only.</p>
                            </div>
                            <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/electric/type-2-charger-group.png`} className="lazyload img-fluid" alt="Type 2 charger" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="container-fluid py-4 py-md-5 bg-ecc">
                <div className="row">
                    <div className="col-24 col-md-16 offset-md-4 d-flex flex-wrap justify-content-center text-center">
                        <h2 className="text-white order-1">How much does it cost to charge an electric car?</h2>
                        <p className="text-white order-2">It obviously varies on how much it costs to charge an electric car as it depends on the size of vehicle you have. It will also vary dependent on where you charge the car – whether it be at home, work or a public charging station.</p>
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/electric/charging-cost-merc.png`} className="lazyload img-fluid mt-3 mt-md-5" alt="Charging cost" />
                        <ZapmapCta className="order-3 order-md-4" />
                        <p className="text-white order-4 order-md-3">Charging electric cars at public charging points vary between – slow, fast and rapid and can vary in cost based on location and power rating. There are free options, which are typically slower up the ‘rapid’ speed which are typically more expensive than most.</p>
                        <p className="text-white order-5">Increasingly, owners of electric cars are choosing to install a charging point at their home as there are <Link passHref href="/electric-hybrid-car-leasing/government-grants"><a>Government Grants</a></Link>. Typically it costs around £1,000 to install a charging unit at home. <Link passHref href="/electric-cars/home-charger"><a>EDF Energy</a></Link> provides an example of home charging costs: if you travel 8000 miles per year in your car, this might equate to around 2800 kWh of additional electricity on your yearly bill if 1 kWh equals 3.5 miles.</p>
                    </div>
                </div>
            </section>
            <section className="container-fluid pt-4 py-md-5 bg-light-grey">
                <div className="row">
                    <div className="col-24 col-md-16 offset-md-4 text-center mb-3 mb-md-5">
                        <h2>How long does it take to charge an electric car?</h2>
                        <p>Charge time for electric cars depends on two factors: the size of the battery and the type of charger. Roughly speaking, it’s a simple equation: the battery size (kWh) multiplied by energy to be added (%), divided by charging speed (kW) equals the time to charge.</p>
                        <p><strong>Here are three examples of how long it would take to charge an electric car:</strong></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-24 col-md-8 d-flex px-0 px-md-3 mb-3 mb-md-0">
                        <div className="w-100 box box--shadowless d-flex flex-wrap justify-content-between bg-white px-4 py-5 text-center">
                            <div className="w-100 position-relative">
                                <h3>Tesla Model 3</h3>
                                <Link passHref href="/car-leasing/tesla/model-3"><a><img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/electric/tesla-img.png`} className="box-img lazyload img-fluid mb-3" alt="Tesla Model 3" /></a></Link>
                                <ul className="gg-list mb-3 mb-md-5">
                                    <li className="d-flex flex-nowrap justify-content-start align-items-center"><FontAwesomeIcon icon={faPlug} className="fill-lime mr-2 mr-md-3" /> <strong>Rapid Charger - 50kW</strong></li>
                                    <li className="d-flex flex-nowrap justify-content-start align-items-center"><FontAwesomeIcon icon={faClock} className="fill-lime mr-2 mr-md-3" /> <strong>(80kwh*0.80%) / 50kw = 1.2hrs</strong></li>
                                </ul>
                                <Link passHref href="/car-leasing/tesla/model-3"><a>View Tesla Model 3 <FontAwesomeIcon icon={faChevronRight} className="ml-2" /></a></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-24 col-md-8 d-flex px-0 px-md-3 mb-3 mb-md-0">
                        <div className="w-100 box box--shadowless d-flex flex-wrap justify-content-between bg-white px-4 py-5 text-center">
                            <div className="w-100 position-relative">
                                <h3>Polestar 2</h3>
                                <Link passHref href="/car-leasing/polestar/2"><a><img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/electric/polestar-img.png`} className="box-img lazyload img-fluid mb-3" alt="Polestar 2" /></a></Link>
                                <ul className="gg-list mb-3 mb-md-5">
                                    <li className="d-flex flex-nowrap justify-content-start align-items-center"><FontAwesomeIcon icon={faPlug} className="fill-lime mr-2 mr-md-3" /> <strong>Home Fast Charger / Wallbox  - 7kW</strong></li>
                                    <li className="d-flex flex-nowrap justify-content-start align-items-center"><FontAwesomeIcon icon={faClock} className="fill-lime mr-2 mr-md-3" /> <strong>(78kwh*0.80%) / 7kw = 8.9hrs</strong></li>
                                </ul>
                                <Link passHref href="/car-leasing/polestar/2"><a>View Polestar 2 <FontAwesomeIcon icon={faChevronRight} className="ml-2" /></a></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-24 col-md-8 d-flex px-0 px-md-3 mb-3 mb-md-0">
                        <div className="w-100 box box--shadowless d-flex flex-wrap justify-content-between bg-white px-4 py-5 text-center">
                            <div className="w-100 position-relative">
                                <h3>Nissan Leaf</h3>
                                <Link passHref href="/car-leasing/nissan/leaf"><a><img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/electric/leaf-img.png`} className="box-img lazyload img-fluid mb-3" alt="Nissan Leaf" /></a></Link>
                                <ul className="gg-list mb-3 mb-md-5">
                                    <li className="d-flex flex-nowrap justify-content-start align-items-center"><FontAwesomeIcon icon={faPlug} className="fill-lime mr-2 mr-md-3" /> <strong>Home 3-pin plug - 3kW</strong></li>
                                    <li className="d-flex flex-nowrap justify-content-start align-items-center"><FontAwesomeIcon icon={faClock} className="fill-lime mr-2 mr-md-3" /> <strong>(62kWh*0.80) / 3 = 16.5hrs</strong></li>
                                </ul>
                                <Link passHref href="/car-leasing/nissan/leaf"><a>View Nissan Leaf <FontAwesomeIcon icon={faChevronRight} className="ml-2" /></a></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container-fluid py-4 py-md-5 bg-black">
                <div className="row">
                    <div className="col-24 col-md-16 offset-md-4 text-center mb-3 mb-md-5">
                        <h2 className="text-white">Places to charge</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-24 col-md-8 px-md-5 mb-3 mb-md-0">
                        <h3 className="text-white"><FontAwesomeIcon icon={faHome} className="fill-grey mr-2" /> Charging at home</h3>
                        <p className="text-white">Most cars are parked at home overnight, so most electric drivers rely on home charging to ensure their EV is ready to go each morning. Not only are they very convenient, but home charge points are normally the cheapest.</p>
                        <p className="text-white">You can get up to £350 off the cost of installing a charge point at home with the Electric Ve-hicle Homecharge Scheme (EVHS). Learn more about how much you could save with EV government grants.</p>
                    </div>
                    <div className="col-24 col-md-8 px-md-5 mb-3 mb-md-0">
                        <h3 className="text-white"><FontAwesomeIcon icon={faCarBuilding} className="fill-grey mr-2" /> Charging at work</h3>
                        <p className="text-white">Many EV drivers top up their car at work after their morning commute. Most workplaces will let you charge your EV for free. However, you might need to bring your own charger cable.</p>
                        <p className="text-white">The Workplace Charging Scheme (WCS) also gives businesses vouchers towards the cost of installing charge points, so employers can save money when going green.</p>
                    </div>
                    <div className="col-24 col-md-8 px-md-5 mb-3 mb-md-0">
                        <h3 className="text-white"><FontAwesomeIcon icon={faUniversalAccess} className="fill-grey mr-2" /> Public charging</h3>
                        <p className="text-white">Most public charge points allow you to plug in and pay by card, cash or an app, so you can see how much you’re paying upfront. Many are contactless now too, making it quick and easy to top up your car.</p>
                        <p className="text-white">Some charge points are free, but it’s best to check at each station for prices and time limits.</p>
                    </div>
                </div>
            </section>
        </>
    )
}

ElectricCarCharging.layout = MainLayout;

function mapStateToProps(state) {
    return {
        leasingDealType: state.dealSelector
    };
}

export default connect(mapStateToProps)(ElectricCarCharging);