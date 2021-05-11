import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import wrapper from 'redux/store.tsx/store';
import Link from 'next/link';
import MainLayout from 'components/layout/main-layout';
import ModalContext from 'components/HOCs/modal/modalContext';
import VehicleBox from 'components/vehicle/vehicle-box';
import VehicleInfo from 'components/vehicle/vehicle-info-special-deal';
import VehicleShortInfo from 'components/vehicle/vehicle-short-info';
import VehicleKeyInfo from 'components/vehicle/vehicle-key-info';
import VehicleOptionsTabs from 'components/vehicle/vehicle-options-tabs';
import VehicleSummary from 'components/vehicle/vehicle-summary-special-deal';
import VehicleQuoteEnquiryModal from 'components/vehicle/vehicle-quote-enquiry-modal';
import TrustBox from 'components/trustpilot/trust-box';
import VehicleSlideup from 'components/vehicle/vehicle-slideup';
import VehicleCountdown from 'components/vehicle/vehicle-countdown';
import VehicleImageGalleryTabs from 'components/vehicle/vehicle-image-gallery-tabs';
import VehicleFeatures from 'components/vehicle/vehicle-features';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faHourglassEnd } from '@fortawesome/pro-light-svg-icons';

import _ from 'underscore';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { VehicleTypes } from 'enums/VehicleTypes';
import { MetaData } from 'types/infrastructure/MetaData';
import { ApiResponse } from 'types/infrastructure/ApiResponse';
import { Vehicle } from 'types/vehicles/Vehicle';
import { SpecialDealContent } from 'types/special-deals/SpecialDealContent';
import { VehicleCustomOptionsPersistanceState } from 'types/VehicleCustomOptionsPersistanceState';
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { getBaseUrl } from 'helpers/urlsHelper';
import { getLOSSRFetchHeaders } from 'helpers/apiHelper';
import { VehiclePageTitle, VehicleMetaDescription } from "helpers/seoHelper";
import { formatMoney } from 'helpers/currencyHelper';
import { getAnnualTax } from 'helpers/vehiclePricingHelper';
import { SiteSettings } from 'environment/siteSettings';
import { GetSpecialDealContent, GetSpecialDealPricing, GetVehicleInfo } from 'business-logic/vehicleService';

//TODO: isHUK, clear page cloudflare cache when countdown completes
export const getServerSideProps = wrapper.getServerSideProps(
    async (context) => {
        let specialDeal = null;
        const id = context.query.id as string;
        const fetchHeaders = getLOSSRFetchHeaders(context);

        if (id) {
            specialDeal = (await GetSpecialDealContent(id, fetchHeaders)).data;
        }

        if (!specialDeal) {
            //Do we have custom page to show?
            context.res.writeHead(404);
            context.res.end();
            return;
        }

        const vehicle = (await GetVehicleInfo(specialDeal.vehicleRef, null, null, true, false, fetchHeaders)).data;

        if (!vehicle) {
            context.res.writeHead(302, {
                Location: '/'
            });
            context.res.end();
            return;
        }

        let leasingDealType = LeasingDealTypes.None;

        if (vehicle.vehicleType === VehicleTypes.Car) {
            let carDealTypes: LeasingDealTypes[] = [LeasingDealTypes.Business, LeasingDealTypes.Personal];
            leasingDealType = specialDeal.leasingDealType ? specialDeal.leasingDealType : LeasingDealTypes.Business;

            if (!carDealTypes.includes(leasingDealType)) {
                leasingDealType = LeasingDealTypes.None;
            }
        }
        else if (vehicle.vehicleType === VehicleTypes.Commercial) {
            leasingDealType = LeasingDealTypes.Van;
        }

        if (leasingDealType === LeasingDealTypes.None) {
            //Do we have custom page to show?
            context.res.writeHead(404);
            context.res.end();
            return;
        }

        let vehcileImages = vehicle.imageUrls || [];

        if (specialDeal.images && specialDeal.images.length > 0) {
            specialDeal.images.forEach(item => {
                vehcileImages.push(process.env.NEXT_PUBLIC_MICROSERVICE_FILES_URL + "api/db/files/download/" + item.imageId);
            });
        }

        let specialDealModel: SpecialDealContent = {
            id: specialDeal.id,
            specialDealType: specialDeal.specialDealTypeId,
            dealHighlights: specialDeal.dealHighlights,
            headerTitle: specialDeal.headerTitle,
            isHUK: specialDeal.isHUK//TODO: ApplyPhoneNumber("01614647382"); - implement
        };

        let vehicleModel: Vehicle = {
            vehicleRef: vehicle.vehicleRef,
            capId: vehicle.capId,
            vehicleType: vehicle.vehicleType,

            make: vehicle.manufacturer.trim(),
            shortModel: vehicle.shortModText.trim(),
            model: vehicle.model.trim(),
            derivative: vehicle.derivative.trim(),
            imageUrl: vehicle.imageUrl,
            imageUrls: vehcileImages,
            interiorUrl: vehicle.interiorUrl,
            exteriorUrl: vehicle.exteriorUrl,

            fuelType: vehicle.fuelType,
            mpg: vehicle.mpg,
            speed60mph: vehicle.speed60mph,
            insuranceGroup: vehicle.insuranceGroup,
            co2: vehicle.cO2,
            range: vehicle.range,
            seats: vehicle.seats,
            doors: vehicle.doors,
            transmission: vehicle.transmission,
            features: vehicle.features,
            stickers: vehicle.stickers,

            p11d: vehicle.manufacturerRRP,

            optionsSelectAllowed: vehicle.optionsIsSelectable,
            availableMileages: vehicle.availableMileages,
            hasMaintenance: vehicle.hasMaintenance
        };

        if (leasingDealType != LeasingDealTypes.Van && vehicle.manufacturerRRP && vehicle.co2TaxMultiplier >= 0) {
            vehicleModel.bik20Tax = getAnnualTax(vehicle.manufacturerRRP, 20, vehicle.co2TaxMultiplier) / 12;
            vehicleModel.bik40Tax = getAnnualTax(vehicle.manufacturerRRP, 40, vehicle.co2TaxMultiplier) / 12;
        }

        let metaData: MetaData = {
            title: VehiclePageTitle(vehicleModel.vehicleType, vehicleModel.make, vehicleModel.model, vehicleModel.derivative),
            description: VehicleMetaDescription(vehicleModel.vehicleType, vehicleModel.make, vehicleModel.shortModel, vehicleModel.derivative),
            imageUrl: vehicleModel.imageUrls && vehicleModel.imageUrls.length > 0 ? vehicleModel.imageUrls[0] : null,
            canonicalUrl: GetCanonicalUrl(getBaseUrl(context.req.url))
        };

        return {
            props: {
                leasingDealType: leasingDealType,
                specialDeal: specialDealModel,
                vehicle: vehicleModel,
                metaData: metaData,
                isExpired: (specialDeal.isDealExpired || (specialDeal.expiresOn && specialDeal.expiresOn < new Date())),
            }
        };
    }
);

const SpecialDeal = ({ leasingDealType, specialDeal, vehicle, isExpired }) => {
    const blackFridayTheme = process.env.NEXT_PUBLIC_BLACK_FRIDAY_THEME;
    const router = useRouter();
    const dispatch = useDispatch();
    const modalContext = useContext(ModalContext);

    //implement maintenanceEnabled
    const maintenanceEnabled = true;

    const pricesDefaultState = {
        fullMonthlyPrice: "Please Call",
        initialRental: "POA",
        salesCode: "POA",
        monthlyMaintenancePrice: "POA",
        processingFee: formatMoney(parseFloat(leasingDealType === LeasingDealTypes.Personal ? process.env.NEXT_PUBLIC_PCH_PROC_FEE : process.env.NEXT_PUBLIC_CH_PROC_FEE)),
        extraOptions: [],
        extraOptionsTotal: formatMoney(0),
        p11d: "N/A",
        bikTax: "-"
    };

    const [specialDealData, setSpecialDealData] = useState(null);
    const [isExpiredState, setIsExpiredState] = useState(isExpired);
    const [enquiryAllowed, setEnquiryAllowed] = useState(false);
    const [showCountdown, setShowCountdown] = useState<boolean>(false);
    const [customOptions, setCustomOptions] = useState<VehicleCustomOptionsPersistanceState>({
        vehicleRef: vehicle.vehicleRef,
        leasingDealType: leasingDealType,
        term: SiteSettings.DefaultTerm,
        mileage: SiteSettings.GetDealTypeDefaultMileage(leasingDealType),
        maintenance: SiteSettings.DefaultMaintenance,
        initialRentalMonths: SiteSettings.DefaultInitialRentals,
        options: [],
        salesCode: 0,
        ageCategory: null
    });
    const [customOptionsLocks, setCustomOptionsLocks] = useState({
        term: false,
        mileage: true,
        maintenance: false,
        initialRentalMonths: true
    });
    const [prices, setPrices] = useState(pricesDefaultState);

    useEffect(() => {
        dispatch({ type: 'UPDATE_OVERLAY_STATE', state: true });
        GetSpecialDealPricing(specialDeal.id)
            .then((result: ApiResponse) => {
                let dealData = null;

                if (result.isSucceed && result.data) {
                    dealData = result.data;

                    let term = 4;
                    let maintenance = false;

                    if (dealData.prices && dealData.prices.length > 0) {
                        let availableTerms = _.uniq(_.pluck(dealData.prices || [], "term"));
                        let availableMaintenances = _.uniq(_.pluck(dealData.prices || [], "maintenance"));

                        if (!_.contains(availableMaintenances, maintenance)) {
                            maintenance = !maintenance;
                        }

                        let sortedTerms = _.pluck(_.sortBy(_.filter(dealData.prices || [], function (item) { return item.maintenance === maintenance; }), "price"), "term");

                        if (sortedTerms && sortedTerms.length > 0) {
                            term = sortedTerms[0];
                        }

                        setCustomOptionsLocks((prevState) => {
                            let updatedValues = {
                                term: availableTerms.length !== 3,
                                maintenance: availableMaintenances.length !== 2
                            };

                            return { ...prevState, ...updatedValues };
                        });
                    }

                    setCustomOptions((prevState) => {
                        let updatedValues = {
                            term: term,
                            mileage: dealData.mileage,
                            maintenance: maintenance,
                            initialRentalMonths: dealData.rentalMonths
                        };

                        return { ...prevState, ...updatedValues };
                    });
                    setSpecialDealData(dealData);
                }

                if (dealData) {
                    if (dealData.isExpired) {
                        setIsExpiredState(true);
                    }
                    else if (dealData.expiresOn) {
                        setShowCountdown(true);
                    }
                }
                dispatch({ type: 'UPDATE_OVERLAY_STATE', state: false });
            });
    }, []);

    useEffect(() => {
        let pricesState = _.clone(pricesDefaultState);
        let hasAllowedPrice = false;

        if (customOptions && specialDealData) {
            let term = customOptions.term;
            let maintenance = customOptions.maintenance || false;

            pricesState.processingFee = formatMoney(specialDealData.processingFee);

            let priceItem = _.find(specialDealData.prices || [], function (price) { return price.term === term && price.maintenance === maintenance; });

            if (priceItem) {
                hasAllowedPrice = priceItem.price && priceItem.price > 0;

                if (hasAllowedPrice) {
                    pricesState.fullMonthlyPrice = priceItem.price ? formatMoney(priceItem.price) : "Please Call";
                    pricesState.initialRental = formatMoney(priceItem.initialRental);
                    pricesState.salesCode = formatMoney(0);

                    let maintenancePrice = 0;

                    if (maintenance) {
                        let notMaintainedPriceItem = _.find(specialDealData.prices || [], function (price) { return price.term === term && price.maintenance === false; });

                        if (notMaintainedPriceItem && notMaintainedPriceItem.price && notMaintainedPriceItem.price > 0 && priceItem.price > notMaintainedPriceItem.price) {
                            maintenancePrice = priceItem.price - notMaintainedPriceItem.price;
                        }
                    }

                    pricesState.monthlyMaintenancePrice = formatMoney(maintenancePrice);
                }
            }
        }

        setPrices(pricesState);
        setEnquiryAllowed(hasAllowedPrice);
    }, [customOptions, specialDealData]);

    const setOptions = (name, value) => {
        if (customOptions[name] !== value) {
            setCustomOptions((prevState) => {
                let updatedValues = {};
                updatedValues[name] = value;

                return { ...prevState, ...updatedValues };
            });
        }
    }

    const onEnquiryButtonClick = (type: string) => {
        showEnquiryModal(!isExpiredState && enquiryAllowed, type);
    }

    const showEnquiryModal = (showAllowed: boolean, type: string) => {
        if (showAllowed && type) {
            let enquiryData = {
                dealType: 2,
                dealId: specialDeal.id,

                details: `${vehicle.make} ${vehicle.model} ${vehicle.derivative}`,
                specialDealId: specialDeal.id,

                vehicleRef: customOptions.vehicleRef,
                leasingDealType: customOptions.leasingDealType,
                term: customOptions.term,
                mileage: customOptions.mileage,
                initialRentalMonths: customOptions.initialRentalMonths,
                maintenance: customOptions.maintenance || false,
                options: customOptions.options
            };

            let enquiryModalOptions = {
                show: true,
                title: null,

                baseData: enquiryData,

                settings: {
                    isInternal: false,
                    proceededToApplyForFinanceDirectly: false
                }
            };

            if (type === "enquiry") {
                enquiryModalOptions.title = "Enquire Now";
            }
            else if (type === "order") {
                enquiryModalOptions.title = "Order this " + (vehicle.vehicleType === VehicleTypes.Commercial ? "van" : "car");
                enquiryModalOptions.settings.proceededToApplyForFinanceDirectly = true;
            }

            if (enquiryModalOptions) {
                modalContext.showModal(VehicleQuoteEnquiryModal, enquiryModalOptions);
            }
        }
    }

    const onCountdownComplete = () => {
        setIsExpiredState(true);
        //TODO: clear cloudflare cache
    }

    return (
        <>
            <div className={`container-fluid bg-special-deal ${blackFridayTheme === 'true' ? 'bg-special-deal--bf' : ''}`}>
                <div className="row">
                    {!isExpiredState ?
                        (<>
                            <div className={`col-24 ${showCountdown ? "col-md-12" : ""} d-md-flex justify-content-start align-items-center py-3`}>
                                <h1 className="deal-banner text-white"><FontAwesomeIcon width="32" height="32" icon={faFire} /> {specialDeal.headerTitle || "Special Deal"}</h1>
                            </div>
                            {showCountdown ? <VehicleCountdown
                                bfTheme={blackFridayTheme}
                                deadline={new Date(Date.parse(new Date().toISOString()) + (specialDealData.timeLeft || 0) + 1500)}
                                onComplete={onCountdownComplete}
                            /> : null}
                        </>) : null
                    }
                    {isExpiredState ?
                        (<>
                            <div className="col-24 col-sm-6 col-md-8 py-3">
                                <h1 className="deal-banner text-white"><FontAwesomeIcon width="32" height="32" icon={faHourglassEnd} /> Special Deal Expired</h1>
                            </div>
                            <div className="col-24 col-sm-18 col-md-16 d-md-flex justify-content-end align-items-start py-3">
                                <p className="mt-3 mt-md-0 mb-md-0 mr-md-3 text-md-right text-white">To see our latest deals, follow us on <a aria-label="Facebook" href="https://www.facebook.com/LeasingOptionsLtd" target="_blank" className="text-white">Facebook</a>, <a aria-label="Instagram" href="https://www.instagram.com/leasing_options_ltd/" target="_blank" className="text-white">Instagram</a>, or <a aria-label="Twitter" href="https://twitter.com/LeasingOptions" target="_blank" className="text-white">Twitter</a></p>
                                <Link passHref href="/"><a className="btn btn-outline-light btn-lg">Back to homepage</a></Link>
                            </div>
                        </>) : null
                    }
                </div>
            </div>
            <VehicleBox isExpiredState={isExpiredState}>
                <div className="container-fluid py-3 py-md-5 bg-light-grey">
                    <div className="row">
                        <div className="col-24 d-md-none order-1">
                            <VehicleShortInfo vehicle={vehicle} />
                            <hr className="my-2 my-md-3" />
                        </div>
                        <div className="col-24 order-2 col-lg-12 order-lg-3">
                            <div className={`vehicle-gallery ${blackFridayTheme === 'true' ? 'vehicle-gallery--bf' : ''} mb-3 mb-md-0`}>
                                <VehicleImageGalleryTabs
                                    vehicleType={vehicle.vehicleType}
                                    imageDescription={`${vehicle.make} ${vehicle.model} ${vehicle.derivative}`}
                                    imageUrls={vehicle.imageUrls}
                                    interiorUrl={vehicle.interiorUrl}
                                    exteriorUrl={vehicle.exteriorUrl}
                                />
                                <p><small>Images are for illustration purposes only</small></p>
                            </div>
                        </div>
                        <div className="col-24 order-4 col-lg-12 order-lg-2 d-md-flex mb-3 mb-md-0">
                            <VehicleInfo
                                vehicle={vehicle}
                                options={{
                                    leasingDealType: customOptions.leasingDealType,
                                    term: customOptions.term,
                                    mileage: customOptions.mileage,
                                    maintenance: customOptions.maintenance,
                                    initialRentalMonths: customOptions.initialRentalMonths
                                }}
                                prices={{
                                    initialRental: prices.initialRental,
                                    monthlyMaintenance: prices.monthlyMaintenancePrice
                                }}
                                settings={{
                                    locks: customOptionsLocks,
                                    availableMileages: vehicle.availableMileages,
                                    hasMaintenance: vehicle.hasMaintenance,

                                    maintenanceEnabled: maintenanceEnabled,
                                    setOptions: setOptions
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="container-fluid py-3 py-md-5 bg-special">
                    <div className="row">
                        <div className="col-24 col-md-12">
                            <h2 className="h1 mb-5">Deal Highlights</h2>
                            <div className="w-100 bg-white p-3 py-md-4 mb-3 mb-md-0" dangerouslySetInnerHTML={{ __html: specialDeal.dealHighlights }}></div>
                        </div>
                        <div className="col-24 col-md-12">
                            <div className="row no-gutters">
                                <div className="col-24">
                                    <VehicleKeyInfo
                                        leasingDealType={leasingDealType}
                                        vehicle={vehicle}
                                        prices={{
                                            p11d: vehicle.p11d ? formatMoney(vehicle.p11d) : null,
                                            bikTax: (vehicle.bik20Tax && vehicle.bik40Tax) ? formatMoney(vehicle.bik20Tax) + "/" + formatMoney(vehicle.bik40Tax) + " p/m" : null
                                        }}
                                        sourceUrl={router.asPath}
                                    />
                                </div>
                            </div>
                            {(vehicle.features && vehicle.features.length > 0) ?
                                (<div className="row no-gutters">
                                    <div className="col-24">
                                        <VehicleFeatures features={vehicle.features} />
                                    </div>
                                </div>) : null
                            }
                        </div>
                    </div>
                </div>
                <div className="container-fluid py-3 py-md-5 bg-light-grey">
                    <div className="row">
                        <div className="col-24">
                            <VehicleSummary
                                options={{
                                    leasingDealType: customOptions.leasingDealType,
                                    term: customOptions.term,
                                    mileage: customOptions.mileage,
                                    maintenance: customOptions.maintenance,
                                    initialRentalMonths: customOptions.initialRentalMonths
                                }}
                                prices={{
                                    monthly: prices.fullMonthlyPrice,
                                    monthlyMaintenance: prices.monthlyMaintenancePrice,
                                    processingFee: prices.processingFee
                                }}
                                settings={{
                                    maintenanceEnabled: maintenanceEnabled
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="container-fluid py-3 py-md-5 bg-white">
                    <div className="row">
                        <div className="col-24">
                            <VehicleOptionsTabs
                                vehicleType={vehicle.vehicleType}
                                capId={vehicle.capId}
                                settings={{
                                    visibleItems: ["technical", "equipment"],
                                    searchAllowed: false,
                                    optionsSelectAllowed: false
                                }}
                            />
                        </div>
                    </div>
                </div>
            </VehicleBox>
            <div className="container-fluid py-3 py-md-5 bg-light-grey">
                <div className="row">
                    <div className="col-24">
                        <h2>What our customers think</h2>
                        <TrustBox />
                    </div>
                </div>
            </div>
            {!isExpiredState ?
                (<VehicleSlideup
                    leasingDealType={customOptions.leasingDealType}
                    monthlyPrice={prices.fullMonthlyPrice}
                    settings={{
                        isSimpleMode: true,
                        proceedAllowed: enquiryAllowed,
                        onProceed: onEnquiryButtonClick
                    }} />) : null
            }
        </>
    )
}

SpecialDeal.layout = MainLayout;

export default SpecialDeal;