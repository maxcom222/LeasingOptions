import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CardManufacturer from 'components/card/card-manufacturer';
import CardVehicle from 'components/card/card-vehicle';
import CardKey from 'components/card/card-key';
import VehicleCarousel from 'components/vehicle-carousel';
import DropDown from 'components/layout/drop-down';
import Pagination from 'components/layout/pagination';
import Pagesize from 'components/layout/pagesize';
import Faqs from 'components/layout/faqs';

import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { PricingTypes } from 'enums/PricingTypes';
import { PaginationCriteria } from 'types/PaginationCriteria';
import { SortingCriteria } from 'types/SortingCriteria';
import { ContentService } from 'business-logic/contentService';
import CardWithStickers from 'components/card/card-with-stickers'
import { GetVehicleModelPreviews } from 'business-logic/vehicleService';

type Props = {
    leasingDealType: LeasingDealTypes;

    vehicleFilter: any;
    modelPreviews: any;
    topPicks: any;

    pricingType?: PricingTypes;
    userPostcode?: string;
}

//TODO: check logic
const SearchPage: React.FC<Props> = ({ leasingDealType, vehicleFilter, modelPreviews, topPicks, pricingType, userPostcode }) => {
    const isATC = pricingType === PricingTypes.Atc;

    const [totalResults, setTotalResults] = useState<number>(0);
    const [pageCount, setPagecount] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [resultsPerPage, setResultsPerPage] = useState<number>(isATC ? 11 : 9999);
    const [sortBy, setSortBy] = useState<string>('OrderPrice');
    const [sortDirection, setSortDirection] = useState<string>('ASC');
    const [modelPreviewsData, setModelPreviewsData] = useState(modelPreviews);
    const [pageFaqs, setPageFaqs] = useState();

    useEffect(() => {
        Promise.resolve(getPageFaqs()).then(function (data) {
            setPageFaqs(data.data);
        })
    }, []);

    useEffect(() => {
        Promise.resolve(filterModelPreviews(sortBy, sortDirection, currentPage, resultsPerPage)).then(function (data) {
            setModelPreviewsData(data.data);
            setTotalResults(data.data.totalItemsCount);
            setPagecount(data.data.totalPagesCount + 1);
        })
    }, [userPostcode, leasingDealType, vehicleFilter, sortBy, sortDirection, currentPage, resultsPerPage]);

    const handlePageSize = (pagesize) => setResultsPerPage(pagesize);

    const handlePageClick = (evt, page) => {
        evt.preventDefault();
        setCurrentPage(page);
    }

    const handleSortChange = (sortBy, sortDirection) => {
        setSortBy(sortBy);
        setSortDirection(sortDirection);

        Promise.resolve(filterModelPreviews(sortBy, sortDirection, currentPage, resultsPerPage)).then(function (data) {
            setModelPreviewsData(data.data);
            setTotalResults(data.data.totalItemsCount);
            setPagecount(data.data.totalPagesCount + 1);
        })
    }

    const filterModelPreviews = async (sortBy, sortDirection, currentPage, resultsPerPage) => {
        const sortingCriteria: SortingCriteria = {
            sortBy: sortBy,
            sortDirection: sortDirection
        }

        const paginationCriteria: PaginationCriteria = {
            pageSize: resultsPerPage,
            pageIndex: currentPage
        }

        return await GetVehicleModelPreviews(vehicleFilter, paginationCriteria, sortingCriteria);
    }

    const getPageFaqs = async () => {
        return await ContentService.GetFaqList(12);
    }

    return (
        <>
            <section className={isATC ? "bt-atc--models" : ""}>
                <div className={`container-fluid pt-5 pb-3 ${isATC ? "pb-md-0" : ""}`}>
                    <div className="row">
                        <div className={`col-24 ${isATC ? "col-12 col-md-18 col-lg-20" : ""} d-flex align-items-center mb-md-4`}>
                            <h1 className={`${isATC ? "text-white" : ""} m-0`}>{isATC ? "Insured Car Leasing Results" : "Search Results"}</h1>
                        </div>
                        {isATC &&
                            <div className="col-12 col-md-6 col-lg-4 d-none d-md-flex justify-content-end align-items-center mb-4">
                                <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/insured-leasing/fuel-logo-wht.svg`} className="img-fluid lazyload" alt="Fuel &amp; Go logo" />
                            </div>
                        }
                    </div>
                </div>
                <div className={`container-fluid pb-3 ${isATC ? "pb-md-5" : "py-md-5 bg-light-grey"}`}>
                    <div className="row">
                        <div className="col-24 col-md-18">
                            {isATC ? <h3 className="text-white mb-3 mb-md-5"><mark className="text-white bg-transparent px-0">{modelPreviewsData?.totalVehiclesCount}</mark> Fuel &amp; Go deals found</h3> : <h3 className="mb-3 mb-md-5"><mark className="mark-text">{modelPreviewsData?.totalVehiclesCount}</mark> Matching Deals from <mark className="mark-text">{modelPreviewsData?.totalItemsCount}</mark> Matching Models</h3>}
                        </div>
                        <div className="col-24 col-md-6 mb-5 mb-md-0">
                            <DropDown indicator={true} active="Price Low-High" wrapperClass="w-100 dd-list" buttonClass={`btn-block ${isATC ? "text-white border-white" : "bg-white"} text-left`} buttonText="Sort by">
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
                        {modelPreviewsData?.dataItems?.map((model, index) => {
                            if (isATC && index === 3) {
                                return (
                                    <>
                                        <div key="atc-key" className="col-24 col-md-12 col-lg-6 d-flex order-first-sml"><CardKey /></div>
                                        <div key={index + '-' + model.vehicleRef} className="col-24 col-md-12 col-lg-6 d-flex"><CardManufacturer isATC={isATC} userPostcode={userPostcode} vehicle={model} dealSelector={leasingDealType} /></div>
                                    </>
                                );
                            } else {
                                return (<div key={index + '-' + model.vehicleRef} className="col-24 col-md-12 col-lg-6 d-flex"><CardManufacturer isATC={isATC} userPostcode={userPostcode} vehicle={model} dealSelector={leasingDealType} /></div>);
                            }
                        })}
                    </div>
                    {isATC &&
                        <>
                            <div className="row">
                                <div className="col-24 text-center py-3 py-md-4">
                                    <Link passHref href="/car-leasing-with-insurance"><a className="btn btn-outline-light btn-lg">Fuel &amp; Go Home</a></Link>
                                </div>
                            </div>
                            <div className="row">
                                <Pagesize className="col-md-12 d-flex justify-content-start align-items-center my-3" increments={isATC ? [11,23,35] : [12,24,36]} activePage={resultsPerPage} handlePageClick={(pagesize) => handlePageSize(pagesize)} />
                                <Pagination className="col-md-12 d-flex justify-content-end align-items-center my-3" totalResults={totalResults} pageCount={pageCount} currentPage={currentPage} handlePageClick={handlePageClick} />
                            </div>
                        </>
                    }
                </div>
            </section>
            {isATC && pageFaqs &&
                <Faqs title="Fuel & Go Leasing FAQs" className="bg-light-grey" faqs={pageFaqs}>
                    <div className="row">
                        <div className="col-24">
                            <Link passHref href="/car-leasing-faqs"><a className="btn btn-outline-primary btn-lg">See all Fuel &amp; Go FAQs</a></Link>
                        </div>
                    </div>
                </Faqs>
            }
            {topPicks &&
                (
                    <section className="container-fluid py-3 py-md-5 bg-white">
                        <div className="row">
                            <div className="col-24">
                                <h2 className="mb-3 mb-md-5">Customers Also Viewed...</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-24">
                            <CardWithStickers>
                                <VehicleCarousel tabletArrows={true} desktopArrows={true} infinite={topPicks?.length > 3}>
                                    {topPicks.map(vehicle => (
                                        <CardVehicle key={`featured-${vehicle.vehicleRef}`} id={`picked-${vehicle.vehicleRef}`} isATC={isATC} userPostcode={userPostcode} vehicle={vehicle} dealSelector={leasingDealType} showStickers={false} />
                                    ))}
                                </VehicleCarousel>
                            </CardWithStickers>
                            </div>
                        </div>
                    </section>
                )
            }
        </>
    );
}

export default SearchPage;