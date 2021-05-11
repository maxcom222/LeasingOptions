
import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import CardBadge from '../../card/card-badge';
import { Make } from '../../../types/Make';
import { VehicleTypes } from 'enums/VehicleTypes';
import { GetBaseVehicleTypeUrl } from 'helpers/urlHelper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

type Props = {
    makes: Array<Make>,
    vehicleType: VehicleTypes
}

const ManufacturerCards:React.FC<Props> = ({makes, vehicleType}) => {
    const [orderedMakes, setOrderedMakes] = useState<any>();
    const ArrowLeft = (props) => {
        const { onClick } = props;
        return (<span className="slick-arrow slick-prev" onClick={onClick}><FontAwesomeIcon width="25" height="25" icon={faChevronLeft} /></span>);
    }
    const ArrowRight = (props) => {
        const { onClick } = props;
        return (<span className="slick-arrow slick-next" onClick={onClick}><FontAwesomeIcon width="25" height="25" icon={faChevronRight} /></span>);
    }
    const settings = {
        autoplay: false,
        lazyLoad: 'progressive',
        arrows: false,
        prevArrow: <ArrowLeft />,
        nextArrow: <ArrowRight />,
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    useEffect(() => {        
        restructureMakes(makes);
    }, makes);


    function restructureMakes(makes) {
        let makesCopy = [...makes];
        let reorderedMakes = [], size = 12;
        while (makesCopy.length > 0)
        reorderedMakes.push(makesCopy.splice(0, size));
        setOrderedMakes(reorderedMakes);
    }

    return (

        <div className="container-fluid pt-3 pt-sm-4 pt-md-5 pb-md-3 pb-lg-0 bg-funder-grey">
            <div className="row">
                <div className="col-24">
                    <ReactPlaceholder firstLaunchOnly={true} type='text' showLoadingAnimation={true} ready={makes?.length ? true : false} rows={1} color='#FFFFFF' className="mb-3">
                        <h2 className="mb-3 mb-md-4 text-center">Choose From {makes?.length} Makes</h2>
                    </ReactPlaceholder>
                </div>
            </div>
            <div className="makes-carousel row">
            
                <Slider {...settings}>
                    {orderedMakes?.map(group => {
                        return (
                            <div key={group} className="col-24">
                                <div className="row">
                                    {group?.map((x, index) => {
                                        return (
                                            <div key={x.id} className={`col-6 col-sm-4 col-lg-2 d-flex px-0 pr-3 px-md-3`}>
                                                <ReactPlaceholder firstLaunchOnly={true} type='rect' ready={orderedMakes ? true : false} color='#FFFFFF' className="mb-3" style={{ width: 80, height: 120 }}>
                                                    <CardBadge vehicleType={vehicleType} url={GetBaseVehicleTypeUrl(vehicleType) + '/' + x.id} logo={`${process.env.NEXT_PUBLIC_CDN}/website/static/makes/${x.id}.svg`} title={x.text} />
                                                </ReactPlaceholder>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}  
                </Slider>
            </div>
        </div>
    )
}

export default ManufacturerCards;