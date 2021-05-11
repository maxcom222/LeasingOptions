import React, { useState, useEffect } from 'react';
import style from './sortcode-lookup.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faSearch } from "@fortawesome/free-solid-svg-icons";
import { DataLookupAPI } from "API/DataLookupApi";

type Props = {
    selectedSortCode: any,
    onBankSelected: any,
    register: any,
    errors: any
}

const SortcodeLookup: React.FC<Props> = ({ selectedSortCode, onBankSelected, register, errors }) => {
    const minQueryLength: number = 6

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchInit = (evt) => {
        let searchQuery = evt.target.value.toString();

        if (searchQuery.length === minQueryLength) {
            setIsLoading(true);

            Promise.resolve(getSearchResults(searchQuery)).then(function (results) {
                setIsActive(true);
                setSearchResults([results]);
                setIsLoading(false);
            })
        } else {
            setIsActive(false);
            setSearchResults([]);
        }
    };
    const handleSearchBlur = () => {
        setTimeout(handleSearchClose, 250);
    }
    const handleSearchClose = () => {
        setIsActive(false);
        setIsLoading(false);
        setSearchResults([]);
    }

    const handleBankSelect = (item) => {

        if (onBankSelected) {
            onBankSelected({
                name: item.longbank1 + ' - ' + item.bankname,
                address1: item.printaddr1,
                address2: item.printaddr2,
                address3: item.printaddr3 + (item.printaddr4 ? (", " + item.printaddr4) : ""),
                town: item.printtown,
                county: item.printcounty,
                postcode: item.printpcode1 + ' ' + item.printpcode2
            });
        }
    }

    async function getSearchResults(searchQuery) {
        return await DataLookupAPI.SortcodeLookup(searchQuery);
    }

    useEffect(() => {
    }, []);

    return (
        <>
            <div className={style['input-wrapper']}>
                <input type="text" className={`form-control ${errors.sortCode ? "is-invalid" : ""}`}
                    id="sortCode" name="sortCode" aria-describedby="sortCode" placeholder="Sort Code (Lookup)" maxLength={6}
                    ref={register({ required: true, minLength: 6, maxLength: 6, pattern: /^[0-9]*$/ })}
                    defaultValue={selectedSortCode}
                    onFocus={(evt) => { handleSearchInit(evt) }}
                    onKeyUp={(evt) => { handleSearchInit(evt) }} onBlur={handleSearchBlur} />
                {isLoading ? <FontAwesomeIcon width="16" height="16" icon={faSpinner} className={`fa-spin ${style['input-loading']}`} /> : ""}
                <div className={`${style['input-list']} ${isActive ? style['is-active'] : ""}`}>
                    <ul>
                        {searchResults.map((item, index) => {
                            return (<li key={`result-${index}`} onClick={(evt) => { handleBankSelect(item) }}><a>{`${item.longbank1} - ${item.bankname}`}</a></li>);
                        })}
                    </ul>
                </div>
            </div>
            {errors.sortCode && <span className="invalid-feedback d-block">This field is required</span>}
        </>
    )
}

export default SortcodeLookup;