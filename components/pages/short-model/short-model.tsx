import React, { useState, useEffect, useContext, useRef } from 'react';
import ExpandableText from '../../../components/expandable-text';
import CardFeatured from '../../../components/card/card-featured';
import CardModel from '../../../components/card/card-model';
import CardModelShort from '../../../components/card/card-model-short';
import ResultsBlocker from '../../../components/results-blocker';
import VehicleCarousel from '../../../components/vehicle-carousel';
import DropDown from '../../../components/layout/drop-down';
import Pagination from '../../../components/layout/pagination';
import Tabs from '../../../components/layout/tabs';
import Search from '../../../components/search';
import TrustMicro from 'components/trustpilot/trust-micro';
import ModalContext from 'components/HOCs/modal/modalContext';
import VehiclePricingMatrixModal from 'components/layout/vehicle-pricing-matrix-modal';
import VehicleErrorFeedbackModal from 'components/layout/vehicle-pricing-error-feedback-modal';

import { VehicleTypes } from 'enums/VehicleTypes';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { PricingTypes } from 'enums/PricingTypes';
import { SearchPanels } from 'enums/SearchPanels';
import { TrustThemeTypes } from 'enums/TrustThemeTypes';
import { PaginationCriteria } from 'types/PaginationCriteria';
import { SortingCriteria } from 'types/SortingCriteria';
import { getFeaturedHeaderIcon, getFeaturedHeaderColor, getFeaturedHeaderLabel, GetFriendlyName, isIzmoImage } from 'helpers/helpers';
import { capitalize } from 'helpers/stringHelper';
import { GetCanonicalUrl, GetVehicleUrl } from 'helpers/urlHelper';
import CardWithStickers from 'components/card/card-with-stickers'
import { GetVehiclePreviews, GetRecommendedForModel, GetVehicleAlternativeModels } from 'business-logic/vehicleService';

import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

type Props = {
    isInternal: boolean;
    leasingDealType: LeasingDealTypes;
    vehicleType: VehicleTypes;
    title: string;
    description: string;

    modelImage: string;
    modelGallery: string[];
    modelReview: any;

    make: any;
    model: any;
    vehicleFilter: any;
    topRecommended: any;
    alternativeModels: any;

    pricingType?: PricingTypes;
    userPostcode?: string;
}

//TODO: check logic
const ShortModelPage: React.FC<Props> = ({ isInternal, leasingDealType, vehicleType, title, description, modelImage, modelGallery, modelReview, vehicleFilter, make, model, topRecommended, alternativeModels, pricingType, userPostcode }) => {
    const resultsRef = useRef<HTMLDivElement>(null);
    const isATC = (pricingType == PricingTypes.Atc);

    const modalContext = useContext(ModalContext);
    const tabsRef = useRef<HTMLDivElement>(null);

    const [activeTab, setActiveTab] = useState(modelReview ? 'review' : 'gallery');
    const [pageCount, setPagecount] = useState<number>(1);
    const [currentResults, setCurrentResults] = useState<number>(12);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalResults, setTotalResults] = useState<number>(0);
    const [totalVehicles, setTotalVehicles] = useState<number>(0);
    const [sortBy, setSortBy] = useState<string>('OrderPrice');
    const [sortDirection, setSortDirection] = useState<string>('ASC');
    const [topRecommendedData, setTopRecommendedData] = useState(topRecommended);
    const [vehiclePreviewsData, setVehiclesPreviewsData] = useState([]);
    const [resultsLoading, setResultsLoading] = useState<boolean>(true);

    useEffect(() => {
        Promise.resolve(filterTopRecommended(pricingType, userPostcode, vehicleType, leasingDealType, make, model)).then(function (data) {
            setTopRecommendedData(data.data);
        });
    }, [leasingDealType]);

    useEffect(() => {
        const paginationCriteria: PaginationCriteria = {
            pageIndex: currentPage,
            pageSize: currentResults
        }

        const sortingCriteria: SortingCriteria = {
            sortBy: sortBy,
            sortDirection: sortDirection
        }

        setResultsLoading(true);

        GetVehiclePreviews(vehicleFilter, paginationCriteria, sortingCriteria)
            .then(function (data) {
                setVehiclesPreviewsData(data.data.dataItems);
                setTotalVehicles(data.data.totalVehiclesCount);
                setTotalResults(data.data.totalItemsCount);
                setPagecount(data.data.totalPagesCount);
                setResultsLoading(false);
            });
    }, [leasingDealType, currentPage, currentResults, sortBy, sortDirection]);

    const handleSearchClick = () => {
        modalContext.showModal(Search, { show: true, title: "Start Your Search", activePanel: SearchPanels.SearchDetailed })
    }

    const handlePageClick = (evt, page) => {
        evt.preventDefault();
        setCurrentPage(page);
        resultsRef.current.scrollIntoView();
    }

    const handleSortChange = (sortBy, sortDirection) => {
        setSortBy(sortBy);
        setSortDirection(sortDirection);
    }

    const handleScrollToTabs = (active) => {
        setActiveTab(active);
        tabsRef.current.scrollIntoView();
    }

    const handleActiveTab = (key) => setActiveTab(key);

    const filterTopRecommended = async (pricingType, userPostcode, vehicleType, dealSelector, make, model) => {
        return await GetRecommendedForModel(pricingType, userPostcode, vehicleType, dealSelector, make, model);
    }

    const onPricingMatrixButtonClick = (vehicle) => {
        if (isInternal) {
            modalContext.showModal(VehiclePricingMatrixModal,
                {
                    show: true,

                    vehicleRef: vehicle.vehicleRef,
                    vehicleName: `${vehicle.make} ${vehicle.model} ${vehicle.derivative}`,
                    pricingType: pricingType || undefined,
                    userPostcode: userPostcode || undefined
                });
        }
    }

    const onErrorFeedbackButtonClick = (vehicle) => {
        if (isInternal) {
            let vehicleDetails = null;

            if (leasingDealType == LeasingDealTypes.Personal) {
                vehicleDetails = vehicle.personalDeal;
            } else {
                vehicleDetails = vehicle.businessDeal;
            }

            modalContext.showModal(VehicleErrorFeedbackModal,
                {
                    show: true,
                    vehicleRef: vehicle.vehicleRef,
                    capId: vehicle.capId,
                    vehicleName: `${vehicle.make} ${vehicle.model} ${vehicle.derivative}`,
                    vehiclePageUrl: GetCanonicalUrl(GetVehicleUrl(isATC, userPostcode, leasingDealType, vehicle.make, vehicle.shortModel, vehicle.model, vehicle.derivative, vehicle.vehicleRef, vehicleDetails?.mileage, vehicleDetails?.initialRentalMonths, vehicleDetails?.term)),

                    settings: {
                        salespersons: []
                    }
                });
        }
    }

    return (
        <>
            <div className={`container-fluid py-3 ${isATC ? "bg-atc py-md-5" : "pt-md-0 pb-md-5"}`}>
                {isATC &&
                    <div className="row">
                        <div className="col-24 col-md-12 my-3">
                            <TrustMicro theme={TrustThemeTypes.Dark} />
                        </div>
                    </div>
                }
                <div className="row">
                    <div className="col-24 d-flex align-items-center justify-content-between mb-4">
                        <h1 className="text-capitalize m-0">{title}</h1>
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/makes/${make.toLowerCase()}.svg`} className="img-fluid manfacturer-logo lazyload" alt={`${capitalize(GetFriendlyName(make))} logo`} />
                    </div>
                </div>
                <div className="row">
                    {modelImage &&
                        <div className="col-24 col-md-8 d-none d-md-block">
                            {modelImage ? <img data-src={modelImage} alt={`${capitalize(GetFriendlyName(make))} ${capitalize(GetFriendlyName(model))}`} className={`img-fluid mb-4 mb-md-0 lazyload ${isIzmoImage(modelImage) ? 'izmo-image' : 'nonizmopaddingfix'}`} /> : null}
                        </div>
                    }
                    <div className={`col-24 ${modelImage ? "col-md-16" : ""}`}>
                        {description ? (<ExpandableText theme={isATC ? "dark" : "light"} isATC={isATC} galleryButton={(modelGallery && modelGallery.length > 0) ? true : false} reviewButton={modelReview ? true : false} handleScrollToTabs={handleScrollToTabs}>{description}</ExpandableText>) : null}
                    </div>
                </div>
            </div>
            <CardWithStickers>
            <div className="container-fluid pt-5 pb-md-5 bg-light-grey">
                <div className="row">
                    <div className="col-24">
                        <ReactPlaceholder firstLaunchOnly={true} className="mb-3 mb-md-5" type='textRow' color='#E0E0E0' showLoadingAnimation={true} ready={topRecommendedData.length > 0 ? true : false} rows={1}>
                            <h3 className="mb-3 mb-md-5"><mark className="mark-text">{totalVehicles}</mark>  {LeasingDealTypes[leasingDealType]} leasing <span className="capitalize">{GetFriendlyName(model)}</span> deals showing</h3>
                        </ReactPlaceholder>
                    </div>
                </div>
                <div className="row">
                    <div className="col-24">
                        <VehicleCarousel tabletArrows={true} desktopArrows={true} infinite={topRecommendedData.length > 0 ? true : false}>
                            {topRecommendedData?.map((vehicle, index) => (
                                <ReactPlaceholder key={`topRecommended-${vehicle.vehicleRef}-${index}`} firstLaunchOnly={true} className="pr-3" type='text' showLoadingAnimation={true} ready={topRecommendedData.length > 0 ? true : false} rows={6}>
                                    <CardFeatured key={`topRecommended-${vehicle.vehicleRef}-${index}`} id={`topRecommended-${vehicle.vehicleRef}`} isATC={isATC} userPostcode={userPostcode} headerText={getFeaturedHeaderLabel(vehicle.dealType)} headerColor={getFeaturedHeaderColor(vehicle.dealType)} headerIcon={getFeaturedHeaderIcon(vehicle.dealType)} vehicle={vehicle} dealSelector={leasingDealType} />
                                </ReactPlaceholder>
                            ))}
                        </VehicleCarousel>
                    </div>
                </div>
            </div>
            <div ref={resultsRef} className="w-100 position-relative bg-white py-4 py-md-5">
                <div className="container-fluid border-bottom border-light">
                    <div className="row">
                        <div className="col-24 col-md-18">
                            <h3 className="mb-4 mb-md-5"><mark className="mark-text">{totalResults}</mark> of <mark className="mark-text">{totalVehicles}</mark> {LeasingDealTypes[leasingDealType]} leasing <span className="capitalize">{GetFriendlyName(model)}</span> deals showing</h3>
                        </div>
                    </div>
                </div>
                <div className="container-fluid py-3">
                    <div className="row">
                        <div className="col-24 col-md-12 col-lg-6"><button className="btn btn-primary btn-lg mb-3 mb-md-0" onClick={(evt) => handleSearchClick()}>Refine Search</button></div>
                        <div className="col-24 col-md-12 col-lg-6 offset-lg-12">
                            <DropDown indicator={true} active="Price Low-High" wrapperClass="w-100" buttonClass="btn-block btn-lg bg-light-grey text-left" buttonText="Sort by">
                                {/*TODO: <button type="button" className="text-left" onClick={() => handleSortChange('', '')}>Default</button>*/}
                                <button type="button" className="text-left" onClick={() => handleSortChange('OrderPrice', 'DESC')}>Price High-Low</button>
                                <button type="button" className="text-left" onClick={() => handleSortChange('OrderPrice', 'ASC')}>Price Low-High</button>
                                <button type="button" className="text-left" onClick={() => handleSortChange('Seats', 'DESC')}>Seats High-Low</button>
                                <button type="button" className="text-left" onClick={() => handleSortChange('Seats', 'ASC')}>Seats Low-High</button>
                                <button type="button" className="text-left" onClick={() => handleSortChange('EngineSize', 'DESC')}>Engine Size High-Low</button>
                                <button type="button" className="text-left" onClick={() => handleSortChange('EngineSize', 'ASC')}>Engine Size Low-High</button>
                                <button type="button" className="text-left" onClick={() => handleSortChange('Mpg', 'DESC')}>MPG High-Low</button>
                                <button type="button" className="text-left" onClick={() => handleSortChange('Mpg', 'ASC')}>MPG Low-High</button>
                                <button type="button" className="text-left" onClick={() => handleSortChange('CO2', 'DESC')}>CO2 High-Low</button>
                                <button type="button" className="text-left" onClick={() => handleSortChange('CO2', 'ASC')}>CO2 Low-High</button>
                            </DropDown>
                        </div>
                    </div>
                </div>
                <ResultsBlocker resultsLoading={resultsLoading}>
                    {vehiclePreviewsData?.map((vehicle, index) => (
                        <div className={`w-100 position-relative ${(index % 2) == 0 ? "bg-white" : "bg-light-grey"}`} key={`card-${vehicle.vehicleRef}-${index}`}>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-24">
                                        <ReactPlaceholder type='rect' firstLaunchOnly={true} showLoadingAnimation={true} ready={vehiclePreviewsData?.length > 0 ? true : false} className="my-3" color='#E0E0E0' style={{ height: 225 }}>
                                            <CardModel
                                                isInternal={isInternal}
                                                pricingType={pricingType}
                                                userPostcode={userPostcode}
                                                vehicle={vehicle}
                                                leasingDealType={leasingDealType}
                                                maintenance={vehicleFilter.maintenance}

                                                settings={{
                                                    onErrorFeedback: onErrorFeedbackButtonClick,
                                                    onPricingMatrix: onPricingMatrixButtonClick
                                                }}
                                            />
                                        </ReactPlaceholder>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </ResultsBlocker>
            </div>
            <nav className="container-fluid pb-3 pb-md-5 bg-white" aria-label="Pagination">
                <div className="row">
                    <Pagination className="col-md-24 d-flex justify-content-end align-items-center" totalResults={totalResults} pageCount={pageCount} currentPage={currentPage} handlePageClick={handlePageClick} />
                </div>
            </nav>
            {(alternativeModels && alternativeModels.length > 0) ?
                (
                    <div className="container-fluid py-3 py-md-5 bg-white">
                        <div className="row">
                            <div className="col-24">
                                <h2 className="mb-3 mb-md-5">Alternative Models</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-24">
                                <VehicleCarousel tabletArrows={true} desktopArrows={true} infinite={alternativeModels.length > 3}>
                                    {alternativeModels.map(item => (
                                        <CardModelShort
                                            key={`alternative-${item.vehicleRef}`}
                                            isATC={isATC}
                                            userPostcode={userPostcode}
                                            item={item}
                                            leasingDealType={leasingDealType}
                                        />
                                    ))}
                                </VehicleCarousel>
                            </div>
                        </div>
                    </div>
                ) : null
            }
            </CardWithStickers>
            {((modelGallery && modelGallery.length > 0) || (modelReview)) ?
                (
                    <div ref={tabsRef} id="model-review" className="container-fluid py-3 py-md-5 bg-light-grey">
                        <div className="row">
                            <div className="col-24">
                                <h3 className="mb-3 mb-md-5 capitalize">{make + " " + GetFriendlyName(model)} Review</h3>
                                <div className="box bg-white">
                                    <Tabs activeTab={activeTab} handleActiveTab={handleActiveTab} modalTitle={make + " " + GetFriendlyName(model)} tabOne={modelReview} tabTwo={modelGallery} />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </>
    );
}

export default ShortModelPage;