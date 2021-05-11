import React from 'react';
import AccountBox from '../account-box';
import style from "../account-box/account-box.module.scss";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { DealSheet } from 'types/account/DealSheet';

type Props = {
    contracts: Array<DealSheet>;
    currentContract: DealSheet;
    vehicleSelect: boolean;
    handleDropdownClick: any;
    handleVehicleClick: any;
}

const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
     lazyLoad: 'ondemand',
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const AccountCarousel: React.FC<Props> = (props) => {
    return (
        <AccountBox icon={<FontAwesomeIcon icon={faCar} />} title="YOUR VEHICLES" border={true}>
            <div className={`${style['account-box__dd']} ${props?.vehicleSelect ? "is-active" : ""}`}>
                <span className="d-flex flex-nowrap align-items-center" onClick={props.handleDropdownClick} >
                    <img src={props.currentContract?.makeIcon} alt={`${props.currentContract?.make} Icon`} />
                    <p className="m-0">
                        <label>{props.currentContract?.make} {props.currentContract?.model}</label>
                        <small>{props.currentContract?.derivative}</small>
                    </p>
                    <FontAwesomeIcon icon={faChevronDown} className="ml-auto" />
                </span>
                <ul className={`list-unstyled ${props?.vehicleSelect ? "" : "d-none"}`}>
                    {props.contracts?.map((contract, index) =>
                        <li key={contract.dealsheetId} className={`d-flex flex-nowrap align-items-center ${contract.dealsheetId === props.currentContract?.dealsheetId ? "is-active" : ""}`} onClick={() => props.handleVehicleClick(index)}>
                            <img src={contract?.makeIcon} alt={`${contract?.make} Icon`} />
                            <p className="m-0">
                                <label>{contract?.make} {contract?.model}</label>
                                <small>{contract?.derivative}</small>
                            </p>
                        </li>
                    )}
                </ul>
            </div>
            <Slider {...settings}>
                {props.currentContract?.images.map(image =>
                    <img src={image} key={image} className="img-fluid" alt="" />
                )}
            </Slider>
        </AccountBox>
    )
}

export default AccountCarousel;