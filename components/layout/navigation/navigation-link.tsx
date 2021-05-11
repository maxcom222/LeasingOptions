import React from 'react';
import style from './navigation.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        navigationStates: state.navigationStates,
    };
}

const HeaderLink = ({children, className, linkTitle, id, handleNavStates, navigationStates}) => {
    const handleLinkToggle = (evt) => {
        evt.preventDefault();    
        handleNavStates(evt, id, 2, evt.currentTarget?.innerText);       
    }

    return (
        <li className={`${className} ${navigationStates.currentLink.id === id ? style['is-active'] : ""}`} id={id}>        
            <div className={style['lvl-caption']} onClick={(evt) => { handleLinkToggle(evt) }}>{linkTitle} <FontAwesomeIcon width="18" height="18" icon={faChevronRight} /></div>
            {children}
        </li>
    )
}

export default connect(mapStateToProps)(HeaderLink);