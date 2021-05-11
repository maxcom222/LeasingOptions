import React, { useState, useRef } from 'react';
import style from './faq-search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from '@fortawesome/pro-light-svg-icons';

type Props = {
    defaultValue: string;
    handleFaqSearch: any;
    handleResultsClear: any;
    isLoading: boolean;
}
const FaqSearch: React.FC<Props> = ({ defaultValue, handleFaqSearch, handleResultsClear, isLoading }) => {
    const searchInput = useRef();
    const [searchText, setSearchText] = useState<string>(defaultValue);
    const handleSearchInput = () => {
        // @ts-ignore
        let searchTerm = searchInput.current.value.toString();

        if (searchTerm) {
            setSearchText(searchTerm);
            handleFaqSearch(searchTerm);
        } else {
            setSearchText('');
            handleFaqSearch('');
        }
    }
    const handleClearText = () => {
        setSearchText('');
        handleFaqSearch('');
        handleResultsClear();
    }
    return (
        <div className={style['faq-search']}>
            <div className={style['faq-search__wrapper']}>
                <div className={style['faq-search__inputs']}>
                    <input ref={searchInput} type="text" value={searchText} onChange={() => handleSearchInput()} />
                    <button type="submit" onClick={() => handleSearchInput()}><FontAwesomeIcon width="16" height="16" icon={faSearch} /></button>
                    {isLoading ? <FontAwesomeIcon width="16" height="16" icon={faSpinner} className={`fa-spin ${style['faq-search__loading']}`} /> : ''}
                </div>
                <button type="button" className="btn btn-outline-light" onClick={() => handleClearText()}>Clear Search</button>
            </div>
        </div>
    )
}

export default FaqSearch