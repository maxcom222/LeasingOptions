import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import style from './header.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faSearch } from "@fortawesome/free-solid-svg-icons";
import { GetVehicleUrl } from "helpers/urlHelper";
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { VehicleTypes } from 'enums/VehicleTypes';
import { GetSearchResults } from 'business-logic/vehicleService';

type Props = {
    dealSelector: LeasingDealTypes;
    isInternal: boolean;
}

const HeaderSearch: React.FC<Props> = ({ dealSelector, isInternal}) => {
    const [leaseDealType, setLeaseDealType] = useState<LeasingDealTypes>(dealSelector === LeasingDealTypes.Van ? LeasingDealTypes.Business : dealSelector);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isActive, setIsactive] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState([]);
    const handleSearchInit = (evt) => {
        let searchQuery = evt.target.value.toString();

        if (searchQuery.length >=2) {
            setIsLoading(true);

            Promise.resolve(getSearchResults(searchQuery)).then(function(data) {
                setIsactive(true);
                setSearchResults(data.data);
                setIsLoading(false);
            })
        } else {
            setIsactive(false);
            setSearchResults([]);
        }
    };
    const handleSearchBlur = () => {
        document.body.removeEventListener('click', handleSearchClose);
    }
    const handleSearchClose = () => {
        setIsactive(false);
        setIsLoading(false);
        setSearchResults([]);
    }

    async function getSearchResults(searchQuery) {
        return await GetSearchResults(searchQuery, isInternal);
    } 

    useEffect(() => {
        setLeaseDealType(dealSelector === LeasingDealTypes.Van ? LeasingDealTypes.Personal : dealSelector);
        setIsactive(false);
        setSearchResults([]);
        setIsLoading(false);
    }, [dealSelector]);

    useEffect(() => {
        document.body.addEventListener('click', handleSearchClose);
    }, []);

    return (
        <div className={style['input-wrapper']}>
            <div className={style['input-icon']}><FontAwesomeIcon width="16" height="16" icon={faSearch} /></div>
            <input type="search" placeholder="e.g. BMW 3 Series" onFocus={(evt) => {handleSearchInit(evt)}} onKeyUp={(evt) => {handleSearchInit(evt)}} onBlur={(evt) => handleSearchBlur} />
            {isLoading ? <FontAwesomeIcon width="16" height="16" icon={faSpinner} className={`fa-spin ${style['input-loading']}`} /> : ""}
            <div className={`${style['input-list']} ${isActive ? style['is-active'] : ""}`}>
                <ul>
                    {searchResults.map(result => {
                        return (<li key={`result-${result.vehicleRef}`}><Link passHref href={GetVehicleUrl(false, '', result.vehicleTypeId === VehicleTypes.Commercial ? LeasingDealTypes.Van : leaseDealType, result.manufacturer, result.shortModTextUrl, result.modelUrl, result.derivativeUrl, result.vehicleRef, null, null, null, null, isInternal)}><a>{result.manufacturer} {result.model} {result.derivative}</a></Link></li>);
                    })}
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isInternal: state.isInternal
});

export default connect(mapStateToProps)(HeaderSearch);