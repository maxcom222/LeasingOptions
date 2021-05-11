import React from 'react';
import Link from 'next/link';
import style from './navigation.module.scss';
import { GetDealTypeUrl } from 'helpers/urlHelper';
import { GetFriendlyName } from 'helpers/helpers';
import { MakeContentABCheck } from 'helpers/helpers';
import { GetStaticMakes } from 'business-logic/vehicleService';

const NavManufacturer = ({id, VehicleType, dealSelector}) => {

    let manufacturers = GetStaticMakes(VehicleType);
 
    return (
        <div id={id} className={style['panel-content']}>
            {manufacturers.map(manufacturer => 
                <Link passHref href={GetDealTypeUrl(dealSelector, '/' + manufacturer.id)} key={manufacturer.id}>
                <a className={`${style['make-card']} text-decoration-none`}>
                <img alt={manufacturer.text} data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/makes/${manufacturer.id}.svg`} width="40" height="40" className="lazyload" /> 
                <span className={style['name']}>{GetFriendlyName(manufacturer.text)} {MakeContentABCheck(manufacturer.id, VehicleType) ? <><br /><small className="badge badge-success">Best Prices</small></>: ''}</span></a></Link>
            )}
        </div>
    );
}

export default NavManufacturer;