import React from "react";
import VehicleCarousel from "components/vehicle-carousel";
import CardVehicle from '../../card/card-vehicle';

type Props = {
    headingText: string,
    vehicles: Array<any>,
    dealSelector: number
}

const VehicleCarouselSection:React.FC<Props> = ({headingText, vehicles, dealSelector}) => {
       
    return (
        <div className="container-fluid py-3 py-md-5 bg-light-grey">
                <div className="row">
                    <div className="col-24">
                        <h2 className="mb-3 mb-md-5">{headingText}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-24">
                        <VehicleCarousel infinite={vehicles?.length > 3}>
                            {vehicles?.map(vehicle => (
                                <CardVehicle key={`featured-${vehicle.vehicleRef}`} id={`featured-${vehicle.vehicleRef}`} vehicle={vehicle} dealSelector={dealSelector} />
                            ))}
                        </VehicleCarousel>
                    </div>
                </div>
            </div>
    )
}

export default VehicleCarouselSection;