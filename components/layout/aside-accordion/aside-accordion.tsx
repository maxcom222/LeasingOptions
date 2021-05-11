import React, { useState } from 'react';
import style from './aside-accordion.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

type Props = {
    title: string;
    children: any;
}

const AsideAccordion = ({title, children}) => {
    const [accordionToggle, setAccordionToggle] = useState(false);
    const handleAccordionToggle = (evt) => setAccordionToggle(!accordionToggle);

    return (
        <div className={`${style['aside-accordion']} ${accordionToggle ? style['is-active'] : ""}`}>
            <h3 onClick={(evt) => handleAccordionToggle(evt)}>{title} {accordionToggle ? <FontAwesomeIcon width="25" height="25" icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}</h3>
            {children}
        </div>
    )
}

export default AsideAccordion;