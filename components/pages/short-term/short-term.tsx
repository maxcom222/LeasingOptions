import React, { useEffect, useState, useContext } from 'react';
import PageBanner from 'components/page-banner';
import PageUsps from 'components/layout/page-usps/page-usps';
import AsideAccordion from 'components/layout/aside-accordion';
import AsideGuides from 'components/layout/aside-guides';
import VehicleCarousel from 'components/vehicle-carousel';
import CardVehicleShort from 'components/card/card-vehicle-short';
import DropDown from 'components/layout/drop-down';
import Faqs from 'components/layout/faqs';
import TrustMini from 'components/trustpilot/trust-mini';
import ModalContext from 'components/HOCs/modal/modalContext';
import ModalContact from 'components/layout/modal-contact';
import VehicleQuoteEnquiryModal from 'components/vehicle/vehicle-quote-enquiry-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/pro-regular-svg-icons";
import CardWithStickers from 'components/card/card-with-stickers'
import * as _ from 'underscore';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { VehicleTypes } from 'enums/VehicleTypes';
import { PricingTypes } from 'enums/PricingTypes';
import { TrustThemeTypes } from 'enums/TrustThemeTypes';
import { GetShortTermDeals } from 'business-logic/vehicleService';

type Props = {
    leasingDealType: LeasingDealTypes;
    vehicleType: VehicleTypes;

    shortTermDeals: any;
    faqList: any;
    categoryList: any;

    pricingType?: PricingTypes;
    postcode?: string;
}

const defaultMake = { name: "All", value: null };

//TODO: check logic
const ShortTermPage: React.FC<Props> = ({ leasingDealType, vehicleType, shortTermDeals, faqList, categoryList }) => {
    const modalContext = useContext(ModalContext);

    const imagesPath = `${process.env.NEXT_PUBLIC_CDN}/website/short-term-leasing${vehicleType === VehicleTypes.Commercial ? "-van" : ""}`;
    const cssTrail = vehicleType === VehicleTypes.Commercial ? "stvl" : "stl";

    const [totalResults, setTotalResults] = useState<number>(shortTermDeals.length);
    const [displayOrder, setDisplayOrder] = useState({ label: 'Price High >Low', value: 'monthlyPrice', direction: 'DESC' });
    const [displayMake, setSelectedMake] = useState(defaultMake);
    const [shortTermDealsData, setShortTermDealsData] = useState(shortTermDeals);
    const [dealsToDisplay, setDealsToDisplay] = useState(shortTermDeals);
    const [makesList, setMakesList] = useState([defaultMake]);

    useEffect(() => {
        sort(displayOrder);
    }, [displayOrder]);

    useEffect(() => {
        if (displayMake.value) {
            const filteredList = _.filter(shortTermDealsData, function (item) {
                return item.make === displayMake.value;
            });

            setDealsToDisplay(filteredList);
        } else {
            setDealsToDisplay(shortTermDealsData);
        }
    }, [displayMake]);

    useEffect(() => {
        Promise.resolve(filterShortTermDeals(vehicleType, leasingDealType)).then(function (data) {
            setTotalResults(data.data.length);
            handleItemsToShow(data.data);
        });
    }, [leasingDealType]);

    const handleContactClick = () => {
        modalContext.showModal(ModalContact, { show: true, title: "Contact" })
    }

    const sort = (displayOrder) => {

        if (dealsToDisplay.length > 0) {

            let sortedList = _.sortBy(dealsToDisplay, function (item) {
                var deal = leasingDealType === LeasingDealTypes.Personal ? item.personalDeal : item.businessDeal;

                if (deal) {
                    return deal[displayOrder.value];
                }
            });

            if (displayOrder.direction === 'DESC') {
                sortedList = sortedList.reverse();
            }

            setDealsToDisplay(sortedList);
        }

    }

    const handleItemsToShow = (data) => {

        let itemsToShow = JSON.parse(JSON.stringify(data)); // clone object

        var makesFiltered = _.sortBy(_.uniq(_.map(itemsToShow, function (item) {
            return item.make;
        })));

        let newMakeList = [defaultMake];

        makesFiltered.forEach(make => {
            newMakeList.push({
                value: make,
                name: make
            })
        });

        sort(displayOrder)
        setMakesList(newMakeList);
        setSelectedMake(defaultMake);
        setShortTermDealsData(itemsToShow);
        setDealsToDisplay(itemsToShow);
        setTotalResults(shortTermDealsData.length);
    }

    const filterShortTermDeals = async (vehicleType, leaseDealType) => {
        return await GetShortTermDeals(vehicleType, leaseDealType);
    }

    const showEnquiryModal = (item) => {
        if (item && item.id) {
            let enquiryData = {
                dealType: 3,
                dealId: item.id,
                leasingDealType: leasingDealType,

                details: item.make + " " + item.model + " " + item.derivative
            };

            modalContext.showModal(VehicleQuoteEnquiryModal, {
                show: true,
                title: "Enquire Now",

                baseData: enquiryData,

                settings: {
                    isIntrenal: false,
                    leasingMessage: item.make + " " + item.model + " " + item.derivative,
                    proceededToApplyForFinanceDirectly: false
                }
            });
        }
    }

    return (
        <>
            <PageBanner className={`page-banner--${cssTrail}`} image="">
                <div className="row">
                    <div className="col-24 col-md-20 col-lg-18 pt-md-3">
                        <h1 className="text-white">Short Term {vehicleType === VehicleTypes.Commercial ? "Van" : "Car"} Leasing</h1>
                        <p className="text-white mb-3 mb-md-5">Find a flexible lease contract with our range of short term car and van leases.</p>
                        <ul className="mb-3 mb-md-5">
                            <li className="text-white"><FontAwesomeIcon width="16" height="16" icon={faCheck} /> No long-term commitment</li>
                            <li className="text-white"><FontAwesomeIcon width="16" height="16" icon={faCheck} /> More cost-effective than daily rentals</li>
                            <li className="text-white"><FontAwesomeIcon width="16" height="16" icon={faCheck} /> Simple, fixed monthly payments</li>
                            <li className="text-white"><FontAwesomeIcon width="16" height="16" icon={faCheck} /> New vehicle in as little as three days</li>
                            <li className="text-white"><FontAwesomeIcon width="16" height="16" icon={faCheck} /> Maintenance and servicing included</li>
                            <li className="text-white"><FontAwesomeIcon width="16" height="16" icon={faCheck} /> Get a Brand New Car Delivered within 3 days (subject to vehicle availability)</li>
                            <li className="text-white"><FontAwesomeIcon width="16" height="16" icon={faCheck} /> Fully Covered with Road Tax, Maintenance and Servicing Included</li>
                        </ul>
                        <button className="btn btn-primary btn-lg" onClick={() => handleContactClick()}>Get in touch</button>
                    </div>
                </div>
            </PageBanner>
            <PageUsps className="bg-light-grey" logoUrl={`${imagesPath}/stl-logo.svg`}>
                <div><img data-src={`${imagesPath}/contract.svg`} className="lazyload" alt="" /><span>Shorter Contract</span></div>
                <div><img data-src={`${imagesPath}/repairs.svg`} className="lazyload" alt="" /><span>Maintenance &amp; Repairs</span></div>
                <div><img data-src={`${imagesPath}/payments.svg`} className="lazyload" alt="" /><span>Fixed Monthly Payments</span></div>
                <div><img data-src={`${imagesPath}/delivery.svg`} className="lazyload" alt="" /><span>Fast Delivery</span></div>
            </PageUsps>
            {shortTermDealsData.length > 0 ?
                (
                    <section className="container-fluid py-3 py-md-5 bg-white">
                        <div className="row">
                            <div className="col-24">
                                <h2 className="mb-3 mb-md-5"><mark className="mark-text">{totalResults}</mark> Short Term Deals Available</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-24 col-md-12 col-lg-6 mb-3 mb-md-5">
                                <DropDown indicator={true} active={defaultMake.name} wrapperClass="w-100" buttonClass="btn-block btn-outline-secondary" buttonText="Make">
                                    {makesList.map(make => (
                                        <button key={`make-${make.value}`} type="button" className="text-left" onClick={() => setSelectedMake(make)}>{make.name}</button>
                                    ))}
                                </DropDown>
                            </div>
                            <div className="col-24 col-md-12 col-lg-6 offset-lg-12 mb-3 mb-md-5">
                                <DropDown indicator={true} active={displayOrder.label} wrapperClass="w-100" buttonClass="btn-block btn-outline-secondary" buttonText="Sort by">
                                    <button type="button" className="text-left" onClick={() => setDisplayOrder({ label: 'Price High >Low', value: 'monthlyPrice', direction: 'DESC' })}>Price High {'>'} Low</button>
                                    <button type="button" className="text-left" onClick={() => setDisplayOrder({ label: 'Price Low > High', value: 'monthlyPrice', direction: 'ASC' })}>Price Low {'>'} High</button>
                                    <button type="button" className="text-left" onClick={() => setDisplayOrder({ label: 'Term Low > High', value: 'term', direction: 'DESC' })}>Term Low {'>'} High</button>
                                    <button type="button" className="text-left" onClick={() => setDisplayOrder({ label: 'Term High > Low', value: 'term', direction: 'ASC' })}>Term High {'>'} Low</button>
                                </DropDown>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-24 px-2 px-md-0">
                                <CardWithStickers>
                                    <VehicleCarousel tabletArrows={true} desktopArrows={true} infinite={shortTermDealsData.length > 3}>
                                        {dealsToDisplay.map((vehicle) => (
                                            <CardVehicleShort
                                                key={`featured-${vehicle.id}`}
                                                vehicle={vehicle}
                                                leasingDealType={leasingDealType}
                                                settings={{
                                                    onEnquiry: showEnquiryModal
                                                }}
                                            />
                                        ))}
                                    </VehicleCarousel>
                                </CardWithStickers>
                            </div>
                        </div>
                    </section>
                ) : null
            }
            <section className="container-fluid bg-light-grey py-5">
                <div className="row">
                    <div className="col-24 col-lg-6 d-flex flex-wrap order-lg-2">
                        <AsideAccordion title="About Short Term Car Leasing">
                            <nav>
                                <a href="#what" className="anchor-link">What is Short Term Leasing?</a>
                                <a href="#leasing" className="anchor-link">Personal or Business Short Term Leasing?</a>
                                <a href="#faqs" className="anchor-link">FAQs</a>
                                <a onClick={(evt) => handleContactClick()} aria-label="Contact">Contact</a>
                            </nav>
                        </AsideAccordion>
                        <AsideGuides categoryList={categoryList} />
                    </div>
                    <div className="col-24 col-lg-18 d-flex flex-wrap order-lg-1">
                        <div id="what" className="box p-3 p-md-5 bg-white page-content">
                            {vehicleType === VehicleTypes.Car ?
                                (
                                    <>
                                        <h2>What is Short Term Car Leasing?</h2>
                                        <p><strong>Our short term lease deals make choosing your next vehicle easy. With more flexibility, shorter contract lengths and maintenance included, you're just a few clicks away from a brand new car.</strong></p>
                                        <p>Sometimes a two, three or four year agreement is longer than necessary and you may only need a short term lease to fill a gap for a few months. Leasing Options are here to help with a range of short term contracts that allow a fixed rate of payment over terms as little as just three months. All short-term contracts come with maintenance and your new car could be delivered in as little as three days!</p>
                                    </>
                                ) : null
                            }
                            {vehicleType === VehicleTypes.Commercial ?
                                (
                                    <>
                                        <h2>What is Short Term Van Leasing?</h2>
                                        <p><strong>Our short term lease deals make choosing your next vehicle easy. With more flexibility, shorter contract lengths and maintenance included, you're just a few clicks away from a brand new van or pickup.</strong></p>
                                        <p>Sometimes a two, three or four year agreement is longer than necessary and you may only need a short term lease to fill a gap for a few months. Leasing Options are here to help with a range of short term contracts that allow a fixed rate of payment over terms even as short as just three months. All short term contracts come with maintenance and your new van or pickup could be delivered in as little as three days!</p>
                                    </>
                                ) : null
                            }
                            {leasingDealType === LeasingDealTypes.Business &&
                                <>
                                    <h2>Benefits</h2>
                                    <p>	Reclaimable VAT on monthly leasing payments (100% reclaimable for sole business use or 50% for mixed business-private usage)</p>
                                    <p>Reclaimable monthly lease payments (for cars emitting 110g/km or less CO2 100% is reclaimable or 85% if emissions are 111/km or more)</p>
                                </>
                            }
                            <TrustMini theme={TrustThemeTypes.Dark} />
                        </div>
                    </div>
                </div>
            </section>
            <section id="leasing" className={`container-fluid bg-${cssTrail} py-3 py-md-5`}>
                <div className="row">
                    <div className="col-24">
                        <div className="w-100 bg-white p-3 p-md-5">
                            <div className="row">
                                <div className="col-24 text-center">
                                    <h2 className="mb-4 mb-md-5">Do I Need Personal or Business Short Term Leasing?</h2>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-24 col-md-12 d-flex">
                                    <div className="w-100 box box--stl p-3 p-md-4 mb-3 mb-md-0 text-center">
                                        <h3 className="text-center mb-3 mb-md-5">Personal Short Term Leasing</h3>
                                        <ul>
                                            <li>You have a new vehicle on order with a longer than usual waiting period</li>
                                            <li>You have a little or no credit history or a poor credit history</li>
                                            <li>Want flexibility and a quick delivery time</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-24 col-md-12 d-flex">
                                    <div className="w-100 box box--stl p-3 p-md-4 mb-3 mb-md-0 text-center">
                                        <h3 className="text-center mb-3 mb-md-5">Business Short Term Leasing</h3>
                                        <ul>
                                            <li>You do not want to commit to a long term contract</li>
                                            <li>Have contract, seasonal or temporary employees</li>
                                            <li>If your business is seasonal, with a varying need for vehicles</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {faqList ?
                (
                    <Faqs title="Short Term Leasing FAQs" titleCentered={true} className="bg-light-grey" faqs={faqList} />
                ) : null
            }
        </>
    );
}

export default ShortTermPage;