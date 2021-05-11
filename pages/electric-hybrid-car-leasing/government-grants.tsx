import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import MainLayout from '../../components/layout/main-layout';
import PageBanner from '../../components/page-banner';
import ExpandableText from '../../components/expandable-text';
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
import { getLandingPageSchema, GetServiceSchema } from 'helpers/schemaHelper';
import { MetaData } from 'types/infrastructure/MetaData';
import { getBaseUrl } from 'helpers/urlsHelper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBatteryFull, faCar, faCalendarAlt, faShuttleVan } from "@fortawesome/pro-light-svg-icons";
import { faPoundSign } from "@fortawesome/free-solid-svg-icons";
import { logLabelEvent } from 'helpers/analytics';
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { FuelTypes } from 'enums/FuelTypes';
import { SiteSettings } from 'environment/siteSettings';

export const getServerSideProps = wrapper.getServerSideProps(

    async (context) => {
        const webPageSchema = getLandingPageSchema(LeasingDealTypes.Personal, context.req.url);
        const serviceSchema = await GetServiceSchema(VehicleTypes.Car);
        const metaData: MetaData = {
            title: `Government Electric Car Grants - Save on Your EV | Leasing Options`,
            description: `Get advice on UK government electric car grants here. Learn how to save money on driving an EV, including charging incentives and more.`,
            canonicalUrl: GetCanonicalUrl(getBaseUrl(context.req.url)),
            keywords: ``
        }
        const faqs: Array<FaqItem> = [
            { question: "Ultra-Low Emission Vehicles Are Exempt From Road Tax", answer: "All zero-emission electric cars are <a href=\"/advice/electric-leasing/is-there-a-road-tax-on-electric-cars\">exempt from road tax</a> for both first-year and annual road tax. (Though new ULEV’s with a listed price over £40,000 do incur a separate tax of around £350.)" },
            { question: "Does The UK Government Offer A Grant To Install A Home-Charging Point?", answer: "The government will cover <a href=\"https://www.gov.uk/government/collections/electric-hybrid-car-leasing/government-grants-for-low-emission-vehicles#electric-vehicle-homecharge-scheme\" target=\"_blank\">up to 75%</a> of your installation cost of small home charging points that gets the job done faster than a normal socket (though you can also use these, if you have off-street parking, and the car will fully charge overnight)." },
            { question: "Does The UK Government Offer A Grant To Install Workplace Charging Points?", answer: "Eligible businesses, charities and public sector organisations <a href=\"https://www.gov.uk/government/publications/workplace-charging-scheme-application-form\" target=\"_blank\">can now apply</a> for a voucher-based scheme providing help with the initial costs of buying and fitting electric vehicle charge-points. This could help if you’re thinking about taking your business electric." },
            { question: "How Do I Get An Electric Car Grant?", answer: "Luckily, you don’t need to worry about applying for grants when purchasing or leasing an electric car – the seller/ leasing company will process these benefits internally. All information about charging point grants can be found on the <a href=\"https://www.gov.uk/government/collections/electric-hybrid-car-leasing/government-grants-for-low-emission-vehicles#workplace-charging-scheme\" target=\"_blank\">gov.uk</a> website." },
            { question: "What Cars Are Eligible For The Charging Point Grants?", answer: "Every single electric car offered by Leasing Options is eligible for this grant. So, if you lease with us you know you’ll be eligible. You can also find the full list of vehicles <a href=\"https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/917255/electric-vehicles-homecharge-scheme-eligible-vehicles-11-09-2020.csv/preview\" target=\"_blank\">here</a>." },
        ];

        return {
            props: {
                metaData: metaData,
                serviceSchema: serviceSchema,
                webPageSchema: webPageSchema,
                faqs: faqs,
            }
        }

    }
)

type Props = {
    serviceSchema: string,
    webPageSchema: string,
    faqs: Array<FaqItem>,
}

const GovernmentGrants: LayoutProps<Props> = ({ serviceSchema, webPageSchema, faqs }) => {
    const dispatch = useDispatch();
    const modalContext = useContext(ModalContext);
    const handleSearchClick = (fuelType, fuelLabel) => {
        dispatch({ type: 'UPDATE_FILTERS', filterName: "fuelType", filterValue: { id: fuelType, name: fuelLabel } });
        modalContext.showModal(Search, { show: true, title: "Detailed Search", activePanel: 6 })
    }

    const carsUrl: string = `/car-leasing/search?mileage=${SiteSettings.DefaultCarMileage}&amp;rentals=${SiteSettings.DefaultInitialRentals}&amp;fuel=3`;

    return (
        <>
            <MetaHead>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webPageSchema }}></script>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceSchema }}></script>
            </MetaHead>

            <PageBanner className="page-banner--gg" trustPilot={true} trustPilotCentered={true} padded={false}>
                <div className="row">
                    <div className="col-24 col-md-12 offset-md-6 pt-md-3 pb-5 pb-md-0 text-center">
                        <h1 className="text-white text-center"><strong>Government Electric Car Grant</strong></h1>
                        <p className="text-white text-center mb-3 mb-md-5">The UK Government offers generous grants that could help make your switch to an ultra-low emission vehicle possible. Here’s our guide.</p>
                        <button className="btn btn-secondary btn-lg btn-fluid-xs" role="button" onClick={() => { handleSearchClick(FuelTypes.Electric, "Electric"), logLabelEvent('Search', 'Click', 'electric_hero_search'); }}>Search Electric</button>
                        <FontAwesomeIcon icon={faBatteryFull} />
                    </div>
                    <div className="col-24 text-center pb-5">
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/electric/grantsimg.png`} className="lazyload img-fluid" alt="Government Grants Banner" />
                    </div>
                </div>
            </PageBanner>
            <NavigationEv active={EvPageTypes.Grants} />
            <section className="container-fluid py-4 py-md-5">
                <div className="row">
                    <div className="col-24 col-md-16 offset-md-4 text-center">
                        <h3>What Is The UK Plug-In Car Grant?</h3>
                        <ExpandableText theme="light">
                            {`The UK plug-in car grant is a £532 million government incentive scheme that offers those purchasing a new electric car up to £3,000 off the cost. The grant takes in a selection of vehicles worth up to £50,000 to encourage the nationwide uptake of more eco-friendly cars.`}
                        </ExpandableText>
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/electric/leaf.png`} className="lazyload img-fluid" alt="Leaf" />
                    </div>
                </div>
            </section>
            <section className="container-fluid py-4 py-md-5 bg-light-grey">
                <div className="row">
                    <div className="col-24 col-md-12 d-flex mb-3 mb-md-0">
                        <div className="w-100 box bg-white p-3 px-md-5 py-md-4 text-center">
                            <h3>What Are The Benefits Of The UK Plug-In Car Grants?</h3>
                            <ul className="gg-list mb-3">
                                <li className="d-flex flex-nowrap justify-content-start align-items-center"><FontAwesomeIcon icon={faPoundSign} className="fill-lime mr-3" /> 35% off the purchase price of your new car (capped at £3,000).</li>
                                <li className="d-flex flex-nowrap justify-content-start align-items-center"><FontAwesomeIcon icon={faCar} className="fill-lime mr-3" /> There won’t be any hassle with reimbursement – dealers will simply take the grant off the prices of eligible cars.</li>
                                <li className="d-flex flex-nowrap justify-content-start align-items-center"><FontAwesomeIcon icon={faCalendarAlt} className="fill-lime mr-3" /> The grant has now been extended through to 2022/23, so you have plenty of time to decide whether the switch will be right for you.</li>
                                <li className="d-flex flex-nowrap justify-content-start align-items-center"><FontAwesomeIcon icon={faShuttleVan} className="fill-lime mr-3" /> The scheme also offers support for those purchasing vans (up to £8,000), trucks (up to £20,000), taxis (up to £7,500) and motorbikes (up to £1,500).</li>
                            </ul>
                            <button className="btn btn-primary btn-lg btn-fluid-xs mb-3 mb-md-5" role="button" onClick={() => { handleSearchClick(FuelTypes.Electric, "Electric"), logLabelEvent('Search', 'Click', 'electric_hero_search'); }}>Find an Electric Car</button>
                        </div>
                    </div>
                    <div className="col-24 col-md-12 d-flex">
                        <div className="w-100 box bg-white p-3 px-md-5 py-md-4 text-center">
                            <h3>Does The UK Plug-In Car Grant Apply To Leasing?</h3>
                            <ExpandableText theme="light">
                                {`<p>Electric cars are, famously, more costly than their fossil-fuel driven equivalents. The new Volkswagen e-Golf, for example, would set you back around £28,000 even including the OLEV grant, whereas you can get a regular Golf from around £22,000. </p><img src=${process.env.NEXT_PUBLIC_CDN}/website/electric/pig.png className="img-fluid mb-3" alt="Pig" /><ul><li>You can lease this same e-Golf through Leasing Options from under £260 a month on a three-year contract, meaning you don’t have to fork out a large sum at the outset.</li><li>By the end of the contract you will have paid under £12,000, just over a third of the RRP.</li></ul><p>As we explain here, constant technology advances mean cars like these decrease in value rapidly. However, when you lease, the leasing company incurs this reduction in value, not you, leaving you free to lease more up-to-date models without any loss.</p>`}
                            </ExpandableText>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container-fluid py-4 py-md-5 bg-charging">
                <div className="row">
                    <div className="col-24 col-md-16 offset-md-4 text-center">
                        <h2 className="text-white">What Cars Are Eligible For The Charging Point Grants?</h2>
                        <p className="text-white px-md-5 mx-md-5">Every single electric car offered by Leasing Options is eligible for this grant. So, if you lease with us you know you’ll be eligible.</p>
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/electric/charging-group.png`} className="lazyload img-fluid" alt="Charging Point Grants" />
                        <p className="text-white">You can also find the full list of vehicles <Link passHref href={carsUrl}><a>here</a></Link>.</p>
                        <button className="btn btn-primary btn-lg btn-fluid-xs mb-3 mb-md-5" role="button" onClick={() => { handleSearchClick(FuelTypes.Electric, "Electric"), logLabelEvent('Search', 'Click', 'electric_hero_search'); }}>Find an Electric Car</button>
                    </div>
                </div>
            </section>
            <Faqs faqs={faqs} title="Government electric car grants FAQs" titleCentered={true} className="bg-light-grey" />
        </>
    )
}

GovernmentGrants.layout = MainLayout;

function mapStateToProps(state) {
    return {
        leasingDealType: state.dealSelector
    };
}

export default connect(mapStateToProps)(GovernmentGrants);