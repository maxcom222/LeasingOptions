import React from 'react';
import Link from 'next/link';
import style from './search.module.scss';
import { connect } from 'react-redux';
import{ GetDealTypeUrl } from '../../helpers/urlHelper';
import { LeasingDealTypes } from '../../enums/LeasingDealTypes';

type Props = {
    active: boolean;
    handlePanelChange: any;
    dealToggle: LeasingDealTypes;
}

function mapStateToProps(state) {
    return {
        dealToggle: state.dealSelector,
    };
}

const SearchButtons:React.FC<Props> = ({active, handlePanelChange, dealToggle}) => {

    return (
        <div className={`${style['modal-panel']} ${active ? style['is-active'] : ''} flex-wrap align-items-center justify-content-start p-3`}>
            <div className="row">
                <div className="col-24 col-md-12 d-flex align-items-center justify-content-start mb-3 pr-md-2">
                    <button className="btn btn-primary btn-block btn-lg py-3 py-md-5" onClick={(evt) => handlePanelChange(2, `Choose ${dealToggle === LeasingDealTypes.Van ? "Van" : "Car"} Make`)}>{dealToggle === LeasingDealTypes.Van ? "Van" : "Car"} Make Search<small className="d-block">{dealToggle === LeasingDealTypes.Van ? "e.g Ford, Citroen, Mitsubishi" : "e.g Audi, BMW, VW"}</small></button>
                </div>
                <div className="col-24 col-md-12 d-flex align-items-center justify-content-start mb-3 pl-md-2">
                    <button className="btn btn-primary btn-block btn-lg py-3 py-md-5" onClick={(evt) => handlePanelChange(3, `Choose ${dealToggle === LeasingDealTypes.Van ? "Van" : "Car"} Model`)}>{dealToggle === LeasingDealTypes.Van ? "Van" : "Car"} Model Search<small className="d-block">{dealToggle === LeasingDealTypes.Van ? "e.g Transit, Berlingo, L200" : "e.g 3 Series, C Class, A4"}</small></button>
                </div>
                <div className="col-24 col-md-12 d-flex align-items-center justify-content-start mb-3 pr-md-2">
                    <button className="btn btn-primary btn-block btn-lg py-3 py-md-5" onClick={(evt) => handlePanelChange(4, 'Choose Body Type')}>Body Type Search<small className="d-block">{dealToggle === LeasingDealTypes.Van ? "e.g Pickup, Crew, Dropside" : "e.g Saloon, Coupe, Estate"}</small></button>
                </div>
                <div className="col-24 col-md-12 d-flex align-items-center justify-content-start mb-3 pl-md-2">
                    <button className="btn btn-primary btn-block btn-lg py-3 py-md-5" onClick={(evt) => handlePanelChange(5, 'Choose A Budget')}>Budget Search<small className="d-block">e.g. £150-£300</small></button>
                </div>
                <div className="col-24 col-md-12 d-flex align-items-center justify-content-start mb-3 pr-md-2">
                    <Link href={dealToggle != LeasingDealTypes.Van ? '/car-leasing-deals' : '/van-leasing-deals'}><button className="btn btn-primary btn-block btn-lg py-3 py-md-5">Special Offers Search<small className="d-block">See our current best deals</small></button></Link>
                </div>
                <div className="col-24 col-md-12 d-flex align-items-center justify-content-start mb-3 pl-md-2">
                    <button className="btn btn-primary btn-block btn-lg py-3 py-md-5" onClick={(evt) => handlePanelChange(6, 'Detailed Search')}>Detailed Search<small className="d-block">e.g. Fuel Type, MPG, Trim Level</small></button>
                </div>
                <div className="col-24 col-md-12 d-flex align-items-center justify-content-start pr-md-2">
                    <Link href={GetDealTypeUrl(dealToggle, '/in-stock')}><button className="btn btn-success btn-block btn-lg py-3 py-md-5">In stock vehicles<small className="d-block">Our best offers ready to go</small></button></Link>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(SearchButtons);