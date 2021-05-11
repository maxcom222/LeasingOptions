import React, { useState, useEffect } from 'react';
import ExpandableText from 'components/expandable-text';
import CardManufacturer from 'components/card/card-manufacturer';
import CardVehicle from 'components/card/card-vehicle';
import VehicleCarousel from 'components/vehicle-carousel';
import DropDown from 'components/layout/drop-down';

import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { PricingTypes } from 'enums/PricingTypes';
import { PaginationCriteria } from 'types/PaginationCriteria';
import { SortingCriteria } from 'types/SortingCriteria';
import CardWithStickers from 'components/card/card-with-stickers'
import { GetVehicleModelPreviews } from 'business-logic/vehicleService';

type Props = {
    leasingDealType: LeasingDealTypes;
    title: string;
    description: string;

    vehicleFilter: any;
    modelPreviews: any;
    topPicks: any;

    pricingType?: PricingTypes;
    postcode?: string;
}

//TODO: check logic
const VehiclesSearchPage: React.FC<Props> = ({ leasingDealType, title, description, vehicleFilter, modelPreviews, topPicks }) => {
    const [totalResults, setTotalResults] = useState<number>(0);
    const [totalModels, setTotalModels] = useState<number>(0);
    const [sortBy, setSortBy] = useState<string>('OrderPrice');
    const [sortDirection, setSortDirection] = useState<string>('ASC');
    const [modelPreviewsData, setModelPreviewsData] = useState(modelPreviews);

    useEffect(() => {
        Promise.resolve(filterModelPreviews(sortBy, sortDirection))
            .then(function (data) {
                setModelPreviewsData(data.data);
                setTotalResults(data.data.totalVehiclesCount);
                setTotalModels(data.data.totalItemsCount);
            });
    }, [leasingDealType, sortBy, sortDirection]);

    const handleSortChange = (sortBy: string, sortDirection: string) => {
        setSortBy(sortBy);
        setSortDirection(sortDirection);
    }

    const filterModelPreviews = async (sortBy: string, sortDirection: string) => {
        const sortingCriteria: SortingCriteria = {
            sortBy: sortBy,
            sortDirection: sortDirection
        };

        const paginationCriteria: PaginationCriteria = {
            pageSize: 9999,
            pageIndex: 1
        };

        return await GetVehicleModelPreviews(vehicleFilter, paginationCriteria, sortingCriteria);
    }

    return (
        <>
            <section>
                <div className="container-fluid pt-4 pb-5 py-md-4">
                    <div className="row">
                        <div className="col-24 d-flex align-items-center mb-4">
                            <h1 className="m-0">{title}</h1>
                        </div>
                    </div>
                    {description &&
                        <div className="row">
                            <div className="col-24">
                                <ExpandableText theme="light">{description}</ExpandableText>
                            </div>
                        </div>
                    }
                </div>
                <div className="container-fluid py-5 bg-light-grey">
                    <div className="row">
                        <div className="col-24 col-md-18">
                            <h3 className="mb-3 mb-md-5"><mark className="mark-text">{totalResults}</mark> Matching Deals from <mark className="mark-text">{totalModels}</mark> Matching Models</h3>
                        </div>
                        <div className="col-24 col-md-6 mb-3 mb-md-0">
                            <DropDown indicator={true} active="Price Low-High" wrapperClass="w-100" buttonClass="btn-block bg-white text-left" buttonText="Sort by">
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
                    <div className="row">
                        {modelPreviewsData.dataItems.map(model => {
                            return (<div key={`model-${model.vehicleRef}`} className="col-24 col-md-12 col-lg-6 d-flex"><CardManufacturer isATC={false} vehicle={model} dealSelector={leasingDealType} /></div>);
                        })}
                    </div>
                </div>
            </section>
            {topPicks &&
                (
                    <section className="container-fluid py-5 bg-white">
                        <div className="row">
                            <div className="col-24">
                                <h2 className="mb-3 mb-md-5">Customers Also Viewed...</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-24">
                            <CardWithStickers>
                                <VehicleCarousel tabletArrows={true} desktopArrows={true} infinite={topPicks.length > 3}>
                                    {topPicks.map(vehicle => (
                                        <CardVehicle key={`featured-${vehicle.vehicleRef}`} id={`picked-${vehicle.vehicleRef}`} isATC={false} vehicle={vehicle} dealSelector={leasingDealType} showStickers={false} />
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

export default VehiclesSearchPage;