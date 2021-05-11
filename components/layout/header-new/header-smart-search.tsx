import React from 'react';
import style from './header.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const HeaderSmartSearch: React.FC = () => {

    return (
        <div className={style['input-wrapper']}>
            <div className={style['input-icon']}><FontAwesomeIcon width="16" height="16" icon={faSearch} /></div>
            <input type="search" id="headerSearch" placeholder="e.g. BMW 3 Series" />
        </div>
    )
}

export default HeaderSmartSearch;