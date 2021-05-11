import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import style from './search.module.scss';
import{ GetDealTypeUrl } from '../../helpers/urlHelper';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        dealToggle: state.dealSelector,
    };
}

function SearchMakes({active, makes, dealToggle}) {

    return (
        <div className={`${style['modal-panel']} ${active ? style['is-active'] : ''} flex-wrap align-items-center justify-content-start p-3`}>
            <div className="row">
                {makes?.map((make, index) => (
                    <Link passHref href={GetDealTypeUrl(dealToggle, '/' + make.id)} key={index + make.id}>
                        <a className="col-6 col-md-4 d-flex flex-row flex-wrap justify-content-center align-items-center">
                            <img src={`${process.env.NEXT_PUBLIC_CDN}/website/static/makes/${make.id}.svg`} className="img-fluid p-2" alt={make.text} />
                            <small className="d-block text-center text-default">{make.text}</small>
                        </a>
                    </Link>
                ))} 
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(SearchMakes);