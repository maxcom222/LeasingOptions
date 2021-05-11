import React, { useState, useEffect } from 'react';
import style from './postcode-lookup.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faSearch } from "@fortawesome/free-solid-svg-icons";
import { DataLookupAPI } from "API/DataLookupApi";
import { joinNotEmpty } from "helpers/stringHelper";

type Props = {
    minQueryLength: number;
    onAddressSelected: any;
    excludeTownAndCounty: boolean
}

const PostcodeLookup: React.FC<Props> = ({ minQueryLength, excludeTownAndCounty, onAddressSelected }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isActive, setIsactive] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState([]);    

    let setTimeoutId = null;

    const handleSearchInit = (evt) => {
        const searchQuery = evt.target.value.toString();

        setIsactive(false);
        setSearchResults([]);

        //Reset any pending (executing) requests
        if (setTimeoutId) {
            clearTimeout(setTimeoutId);
        }

        if (searchQuery && searchQuery.length >= 4) {
            setIsLoading(true);

            setTimeoutId = setTimeout(function () {
                Promise.resolve(getSearchResults(searchQuery)).then(function (results) {
                    setIsactive(true);
                    setSearchResults(results);
                    setIsLoading(false);

                    setTimeoutId = null;
                });
            }, 50);
        }
    };

    const handleSearchBlur = () => {
        setTimeout(handleSearchClose, 250);
    }
    const handleSearchClose = () => {
        setIsactive(false);
        setIsLoading(false);
        setSearchResults([]);
    }
     
    const handleAddressSelect = (address, evt) => {
        evt.stopPropagation();

        if (onAddressSelected) {

            if (!excludeTownAndCounty) {
                onAddressSelected({
                    address1: address.addressline1,
                    address2: address.addressline2,
                    address3: address.addressline3,
                    town: address.posttown,
                    county: address.county,
                    postcode: address.postcode
                });
            }
            else {
                onAddressSelected({
                    address1: address.addressline1,
                    address2: address.addressline2,
                    address3: joinNotEmpty(", ", [address.addressline3, address.posttown, address.county]),
                    postcode: address.postcode
                });
            }            
        }

    }

    async function getSearchResults(searchQuery) {
        return await DataLookupAPI.PostcodeLookup(searchQuery);
    }

    return (
        <div className={style['input-wrapper']}>
            <input type="text" className="form-control" placeholder="Postcode" onFocus={(evt) => { handleSearchInit(evt) }} onKeyUp={(evt) => { handleSearchInit(evt) }} onBlur={handleSearchBlur} />
            {isLoading ? <FontAwesomeIcon icon={faSpinner} className={`fa-spin ${style['input-loading']}`} /> : ""}
            <div className={`${style['input-list']} ${isActive ? style['is-active'] : ""}`}>
                <ul>
                    {searchResults.map((item, index) => {
                        return (<li key={`result-${index}`} onClick={(evt) => { handleAddressSelect(item, evt) }}><a>{item.summaryline}</a></li>);
                    })}
                </ul>
            </div>
        </div>
    )
}

export default PostcodeLookup;