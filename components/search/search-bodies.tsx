import React from 'react';
import Link from 'next/link';
import style from './search.module.scss';
import { connect } from 'react-redux';
import{ GetDealTypeUrl } from '../../helpers/urlHelper';
import { LeasingDealTypes } from '../../enums/LeasingDealTypes';

type Props = {
    active: boolean;
    dealToggle: LeasingDealTypes;
}

function mapStateToProps(state) {
    return {
        dealToggle: state.dealSelector,
    };
}

const SearchBodies:React.FC<Props> = ({active, dealToggle}) => {

    if (dealToggle !== LeasingDealTypes.Van) {

        return (
            <div className={`${style['modal-panel']} ${active ? style['is-active'] : ''} flex-wrap align-items-center justify-content-start`}>
                <ul>
                    <li><Link passHref href={GetDealTypeUrl(dealToggle, '/body-type-suv-crossover')}><a className="text-decoration-none"><div className="w-100 row no-gutters d-flex align-items-center"><div className="col-12 col-md-8"><img alt="suv / crossover" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/vehicle-images/panel-suv.png`} className="img-fluid lazyload" /></div><div className="col-12 col-md-16 pl-3"><strong className="d-block">SUV / Crossover</strong><small className="d-block">e.g.Jeep Cherokee SW, Land Rover Discovery SW</small></div></div></a></Link></li>
                    <li><Link passHref href={GetDealTypeUrl(dealToggle, '/body-type-hatchback')}><a className="text-decoration-none"><div className="w-100 row no-gutters d-flex align-items-center"><div className="col-12 col-md-8"><img alt="hatchback" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/vehicle-images/panel-hatchback.png`} className="img-fluid lazyload"/></div><div className="col-12 col-md-16 pl-3"><strong className="d-block">Hatchback</strong><small className="d-block">e.g.Toyota Aygo, Vauxhall Astra</small></div></div></a></Link></li>
                    <li><Link passHref href={GetDealTypeUrl(dealToggle, '/body-type-saloon')}><a className="text-decoration-none"><div className="w-100 row no-gutters d-flex align-items-center"><div className="col-12 col-md-8"><img alt="saloon" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/vehicle-images/panel-saloon.png`} className="img-fluid lazyload" /></div><div className="col-12 col-md-16 pl-3"><strong className="d-block">Saloon</strong><small className="d-block">e.g.Alfa Romeo Giulia, Ford Mondeo</small></div></div></a></Link></li>
                    <li><Link passHref href={GetDealTypeUrl(dealToggle, '/body-type-estate')}><a className="text-decoration-none"><div className="w-100 row no-gutters d-flex align-items-center"><div className="col-12 col-md-8"><img alt="estate" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/vehicle-images/panel-estate.png`} className="img-fluid lazyload"/></div><div className="col-12 col-md-16 pl-3"><strong className="d-block">Estate</strong><small className="d-block">e.g.Hyundai i30 Tourer, Kia Ceed Sportswagon</small></div></div></a></Link></li>
                    <li><Link passHref href={GetDealTypeUrl(dealToggle, '/body-type-coupe')}><a className="text-decoration-none"><div className="w-100 row no-gutters d-flex align-items-center"><div className="col-12 col-md-8"><img alt="coupe" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/vehicle-images/panel-coupe.png`} className="img-fluid lazyload"/></div><div className="col-12 col-md-16 pl-3"><strong className="d-block">Coupe</strong><small className="d-block">e.g.Audi A5, BMW 2 Series</small></div></div></a></Link></li>
                    <li><Link passHref href={GetDealTypeUrl(dealToggle, '/body-type-convertible-cabriolet')}><a className="text-decoration-none"><div className="w-100 row no-gutters d-flex align-items-center"><div className="col-12 col-md-8"><img alt="convertible / cabriolet" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/vehicle-images/panel-convertible.png`} className="img-fluid lazyload"/></div><div className="col-12 col-md-16 pl-3"><strong className="d-block">Convertible / Cabriolet</strong><small className="d-block">e.g.Mercedes C Class, Smart ForTwo</small></div></div></a></Link></li>
                    <li><Link passHref href={GetDealTypeUrl(dealToggle, '/body-type-mpv')}><a className="text-decoration-none"><div className="w-100 row no-gutters d-flex align-items-center"><div className="col-12 col-md-8"><img alt="mpv" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/vehicle-images/panel-mpv.png`} className="img-fluid lazyload"/></div><div className="col-12 col-md-16 pl-3"><strong className="d-block">MPV</strong><small className="d-block">e.g.Renault Grand Scenic, Volkswagon Touran</small></div></div></a></Link></li>
                    <li><Link passHref href={GetDealTypeUrl(dealToggle, '/body-type-sports-car')}><a className="text-decoration-none"><div className="w-100 row no-gutters d-flex align-items-center"><div className="col-12 col-md-8"><img alt="sports car" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/vehicle-images/panel-sportscar.png`} className="img-fluid lazyload"/></div><div className="col-12 col-md-16 pl-3"><strong className="d-block">Sports Car</strong><small className="d-block">e.g.Abarth 124 Spider Roadster, Audi R8 Coupe</small></div></div></a></Link></li>
                </ul>
            </div>
        );
    
    } else {

        return (
            <div className={`${style['modal-panel']} ${active ? style['is-active'] : ''} flex-wrap align-items-center justify-content-start`}>
                <ul>
                    <li><Link passHref href={GetDealTypeUrl(dealToggle, '/body-type-small')}><a className="text-decoration-none"><div className="w-100 row no-gutters d-flex align-items-center"><div className="col-12 col-md-8"><img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/vehicle-images/panel-small-van.png`} className="img-fluid lazyload" /></div><div className="col-12 col-md-16 pl-3"><strong className="d-block">Small</strong><small className="d-block">e.g. Ford Connect, Peugeot Partner</small></div></div></a></Link></li>
                    <li><Link passHref href={GetDealTypeUrl(dealToggle, '/body-type-medium')}><a className="text-decoration-none"><div className="w-100 row no-gutters d-flex align-items-center"><div className="col-12 col-md-8"><img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/vehicle-images/panel-medium-van.png`} className="img-fluid lazyload" /></div><div className="col-12 col-md-16 pl-3"><strong className="d-block">Medium</strong><small className="d-block">e.g. Citroen Dispatch, VW Transporter</small></div></div></a></Link></li>
                    <li><Link passHref href={GetDealTypeUrl(dealToggle, '/body-type-large')}><a className="text-decoration-none"><div className="w-100 row no-gutters d-flex align-items-center"><div className="col-12 col-md-8"><img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/vehicle-images/panel-large-van.png`} className="img-fluid lazyload" /></div><div className="col-12 col-md-16 pl-3"><strong className="d-block">Large</strong><small className="d-block">e.g. Peugeot Boxer, Citroen Relay</small></div></div></a></Link></li>
                    <li><Link passHref href={GetDealTypeUrl(dealToggle, '/body-type-pickup')}><a className="text-decoration-none"><div className="w-100 row no-gutters d-flex align-items-center"><div className="col-12 col-md-8"><img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/vehicle-images/panel-pickup.png`} className="img-fluid lazyload" /></div><div className="col-12 col-md-16 pl-3"><strong className="d-block">Pickup</strong><small className="d-block">e.g. Mitsubish L200, Ford Ranger</small></div></div></a></Link></li>
                    <li><Link passHref href={GetDealTypeUrl(dealToggle, '/body-type-crew')}><a className="text-decoration-none"><div className="w-100 row no-gutters d-flex align-items-center"><div className="col-12 col-md-8"><img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/vehicle-images/panel-crew-van.png`} className="img-fluid lazyload" /></div><div className="col-12 col-md-16 pl-3"><strong className="d-block">Crew</strong><small className="d-block">e.g. VW Transporter, Ford Transit Custom</small></div></div></a></Link></li>
                    <li><Link passHref href={GetDealTypeUrl(dealToggle, '/body-type-dropside')}><a className="text-decoration-none"><div className="w-100 row no-gutters d-flex align-items-center"><div className="col-12 col-md-8"><img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/vehicle-images/panel-dropside.png`} className="img-fluid lazyload" /></div><div className="col-12 col-md-16 pl-3"><strong className="d-block">Dropside</strong><small className="d-block">e.g. Ford Transit, VW Crafter</small></div></div></a></Link></li>
                    <li><Link passHref href={GetDealTypeUrl(dealToggle, '/body-type-luton')}><a className="text-decoration-none"><div className="w-100 row no-gutters d-flex align-items-center"><div className="col-12 col-md-8"><img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/vehicle-images/panel-luton-van.png`} className="img-fluid lazyload" /></div><div className="col-12 col-md-16 pl-3"><strong className="d-block">Luton</strong><small className="d-block">e.g. Mercedes-Benz Sprinter, Ford Transit</small></div></div></a></Link></li>
                </ul>
            </div>
        );

    }
}

export default connect(mapStateToProps)(SearchBodies);