import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ExpandableText from 'components/expandable-text';
import CardManufacturer from 'components/card/card-manufacturer';
import CardVehicle from 'components/card/card-vehicle';
import VehicleCarousel from 'components/vehicle-carousel';
import DropDown from 'components/layout/drop-down';
import Pagination from 'components/layout/pagination';
import Pagesize from 'components/layout/pagesize';
import TrustMicro from 'components/trustpilot/trust-micro';
import CardNews from 'components/card/card-news';
import { useIsMount } from 'custom-hooks/useIsMount';
import { VehicleTypes } from 'enums/VehicleTypes';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { PricingTypes } from 'enums/PricingTypes';
import { SortingCriteria } from 'types/SortingCriteria';
import { PaginationCriteria } from 'types/PaginationCriteria';
import { GetVehicleManufacturerUrl } from 'helpers/urlHelper';
import { MakeVanABCheck, MakeABCheck, MakeABSplit, MakeContentABCheck } from 'helpers/helpers'
import { TrustThemeTypes } from 'enums/TrustThemeTypes';
import CardWithStickers from 'components/card/card-with-stickers'
import { GetVehicleModelPreviews } from 'business-logic/vehicleService';

import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

type Props = {
    leasingDealType: LeasingDealTypes;
    vehicleType: VehicleTypes;
    title: string;
    description: string;

    vehicleFilter: any;
    makeName: string;
    makeUrl: string;
    modelData: any;
    modelPreviews: any;
    topPicks: any;

    pricingType?: PricingTypes;
    userPostcode?: string;

    categoryNews?: any;
}

//TODO: check logic
const MakePage: React.FC<Props> = ({ leasingDealType, vehicleType, title, description, vehicleFilter, modelData, makeName, makeUrl, modelPreviews, topPicks, pricingType, userPostcode, categoryNews }) => {
    const isMount = useIsMount();
    const router = useRouter();
    const [modelPreviewsData, setModelPreviewsData] = useState(modelPreviews);

    const isATC = pricingType === PricingTypes.Atc;
    const [totalResults, setTotalResults] = useState<number>(0);
    const [pageCount, setPagecount] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [resultsPerPage, setResultsPerPage] = useState<number>(isATC ? 12 : 999);
    const [sortBy, setSortBy] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<string>('');

    //Temp: Set news tag ID based off URL
    let tagId = null;

    switch (makeUrl?.toLocaleLowerCase()) {
        case "seat":
            tagId = 278;
            break;
        case "skoda":
            tagId = 176;
            break;
        default:
            break;
    }

    const handlePageSize = (pagesize) => setResultsPerPage(pagesize);
    const handlePageClick = (evt, page) => {
        evt.preventDefault();
        setCurrentPage(page);
    }
    const handleModelChange = (modelUrl) => router.push(modelUrl);
    const updateModelPreviews = async (sortBy, sortDirection) => {
        const paginationCriteria: PaginationCriteria = {
            pageSize: resultsPerPage,
            pageIndex: currentPage
        }

        const sortingCriteria: SortingCriteria = {
            sortBy: sortBy,
            sortDirection: sortDirection,
        }

        await GetVehicleModelPreviews(vehicleFilter, paginationCriteria, sortingCriteria).then(function (data) {
            setModelPreviewsData(data?.data);
            setTotalResults(data?.data?.totalItemsCount);
            setPagecount(data?.data?.totalPagesCount);
        })
    }
    const handleSortChange = (sortBy, sortDirection) => {
        setSortBy(sortBy);
        setSortDirection(sortDirection);
        updateModelPreviews(sortBy, sortDirection)
    }

    if (vehicleType === VehicleTypes.Commercial) {
        leasingDealType = LeasingDealTypes.Van;
    }

    useEffect(() => {
        updateModelPreviews(sortBy, sortDirection);
    }, [leasingDealType, resultsPerPage, currentPage, sortBy, sortDirection]);

    useEffect(() => {
        if (!isMount) {
            updateModelPreviews(sortBy, sortDirection);
        }
    }, [leasingDealType, resultsPerPage, currentPage, sortBy, sortDirection]);

    return (
        <>
            <div className={`container-fluid py-3 ${isATC ? "bg-atc py-md-5" : "pt-md-0"} ${MakeContentABCheck(makeUrl, vehicleType) ? 'pb-md-4' : 'pb-md-5'}`}>
                {isATC &&
                    <div className="row">
                        <div className="col-24 col-md-12 my-3">
                            <TrustMicro theme={TrustThemeTypes.Dark} />
                        </div>
                    </div>
                }
                <div className="row">
                    <div className={`${isATC ? "col-12" : "col-19 col-md-12"} d-flex align-items-center ${!MakeContentABCheck(makeUrl, vehicleType) ? 'mb-4' : ''}`}>
                        <h1 className="m-0">{title}</h1>
                    </div>
                    <div className={`${isATC ? "col-12" : "col-5 col-md-12"} d-flex flex-wrap align-items-center justify-content-end ${!MakeContentABCheck(makeUrl, vehicleType) ? 'mb-4' : ''}`}>
                        {isATC &&
                            <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/insured-leasing/logo-1.png`} className="img-fluid mr-md-3 lazyload" alt="Fuel & Go logo" />
                        }
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/makes/${vehicleFilter?.manufacturerUrl?.toLowerCase()}.svg`} className="img-fluid manfacturer-logo lazyload" alt={`${vehicleFilter?.manufacturerUrl} logo`} />
                    </div>
                </div>
                {!MakeContentABCheck(makeUrl, vehicleType) &&
                    <div className="row">
                        <div className="col-24">
                            {description ? <ExpandableText theme={isATC ? "dark" : "light"} modelDropDown={true} modelDropDownData={modelData} vehicleFilter={vehicleFilter} leasingDealType={leasingDealType} handleModelChange={handleModelChange}>{MakeABCheck(makeUrl, vehicleType) ? MakeABSplit(makeUrl, description.toString())?.[0] : description}</ExpandableText> : null}
                        </div>
                    </div>
                }
            </div>
            <div className={`container-fluid ${MakeVanABCheck(makeUrl, vehicleType) ? "pt-5 pb-4 pb-md-3" : "py-5"} bg-light-grey`}>
                <div className="row">
                    <div className="col-24 col-md-18">
                        <h3 className="mb-3 mb-md-5"><mark className="mark-text">{modelPreviewsData?.totalVehiclesCount}</mark> Matching Deals from <mark className="mark-text">{modelPreviewsData?.totalItemsCount}</mark> Matching Models</h3>
                    </div>
                    <div className="col-24 col-md-6 mb-3 mb-md-0">
                        <DropDown indicator={true} active="Default" wrapperClass="w-100" buttonClass="btn-block bg-white text-left" buttonText="Sort by">
                            <button type="button" className="text-left" onClick={() => handleSortChange('', '')}>Default</button>
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
                <div className="row">
                    {modelPreviewsData?.dataItems?.map(model => (
                        <ReactPlaceholder key={model?.vehicleRef} firstLaunchOnly={true} className="col-24 col-md-12 col-lg-6 mb-3" type='text' showLoadingAnimation={true} ready={modelPreviewsData?.dataItems?.length > 0 ? true : false} rows={6}>
                            <div key={model?.vehicleRef} className="col-24 col-md-12 col-lg-6 d-flex"><CardManufacturer isATC={isATC} userPostcode={userPostcode} vehicle={model} dealSelector={leasingDealType} /></div>
                        </ReactPlaceholder>
                    ))}
                </div>
                {isATC &&
                    <div className="row">
                        <Pagesize className="col-md-12 d-flex justify-content-start align-items-center my-3" increments={[12,24,36]} activePage={resultsPerPage} handlePageClick={(pagesize) => handlePageSize(pagesize)} />
                        <Pagination className="col-md-12 d-flex justify-content-end align-items-center my-3" totalResults={totalResults} pageCount={pageCount} currentPage={currentPage} handlePageClick={handlePageClick} />
                    </div>
                }
            </div>
            {MakeVanABCheck(makeUrl, vehicleType) &&
                <div className="container-fluid pb-5 bg-light-grey">
                    <div className="row">
                        <div className="col-24 text-center">
                            <Link passHref href={GetVehicleManufacturerUrl(false, '', LeasingDealTypes.Van, makeUrl)}><a className="btn btn-outline-primary btn-lg btn-fluid-xs">View {makeName} Van Lease Deals</a></Link>
                        </div>
                    </div>
                </div>
            }
            {MakeABCheck(makeUrl, vehicleType) &&
                <div className="container-fluid py-5 bg-white">
                    <div className="row">
                        <div className="col-24">
                            <h2 className="mb-3 mb-md-5">Leasing A {makeName}</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-24" dangerouslySetInnerHTML={{ __html: MakeABSplit(makeUrl, description.toString())?.[1] + MakeABSplit(makeUrl, description.toString())?.[2] }}></div>
                    </div>
                </div>
            }
            {MakeContentABCheck(makeUrl, vehicleType) &&
                <div className="container-fluid py-5 bg-white">
                    <div className="row">
                        <div className="col-24">
                            {description ? <ExpandableText theme={"light"} modelDropDown={true} vehicleFilter={vehicleFilter} leasingDealType={leasingDealType}>{MakeABCheck(makeUrl, vehicleType) ? MakeABSplit(makeUrl, description.toString())?.[0] : description}</ExpandableText> : null}
                        </div>
                    </div>
                </div>
            }
            <CardWithStickers>
            {MakeContentABCheck(makeUrl, vehicleType) && categoryNews?.dataItems?.length > 0 &&
                <section className="container-fluid py-md-5 bg-light-grey">
                    <div className="row">
                        <div className="col-24">
                            <h3 className="text-center mb-0 mb-md-3">{makeName} News</h3>
                        </div>
                        <div className="col-24 mt-3 mb-5 mb-md-0">
                            <VehicleCarousel className="slick-paginated" dots={true} mobileAuto={true} mobileArrows={true} tabletArrows={true} desktopArrows={true} infinite={categoryNews?.dataItems?.length > 4}>
                                {categoryNews?.dataItems?.map((article) => {
                                    return (
                                        <CardNews key={`article-${article.id}`} id={`article-${article.id}`} className="card-news--space" image={article.imageUrl} tag={article.type} link={article.url} title={article.title} date={article.onDate} excerpt={article.description} />
                                    )
                                })}
                            </VehicleCarousel>
                        </div>
                    </div>
                </section>
            }
            <div className={`container-fluid py-5 ${MakeABCheck(makeUrl, vehicleType) ? "bg-light-grey" : "bg-white"}`}>
                <div className="row">
                    <div className="col-24">
                        <h2 className="mb-3 mb-md-5">Customers Also Viewed...</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-24">
                        <VehicleCarousel tabletArrows={true} desktopArrows={true} infinite={topPicks?.length > 3}>
                            {topPicks?.map(vehicle => (
                                <ReactPlaceholder key={`featured-${vehicle.vehicleRef}`} firstLaunchOnly={true} type='text' showLoadingAnimation={true} ready={topPicks?.length > 0 ? true : false} rows={6}>
                                    <CardVehicle key={`featured-${vehicle.vehicleRef}`} id={`picked-${vehicle.vehicleRef}`} isATC={isATC} userPostcode={userPostcode} vehicle={vehicle} dealSelector={leasingDealType} showStickers={false} />
                                </ReactPlaceholder>
                            ))}
                        </VehicleCarousel>
                    </div>
                </div>
            </div>
            </CardWithStickers>
        </>
    );
}

export default MakePage;