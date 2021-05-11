import React, { ReactNode, useState, useEffect } from 'react';
import style from './search.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/pro-regular-svg-icons";

type Props = {
    selected: any;
    title: string;
    subtitle: any;
    autoclose?: boolean;
    children?: ReactNode,
}

const SearchAccordion: React.FC<Props> = ({ selected, title, subtitle, autoclose = true, children }) => {
    const [accordionToggle, setAccordionToggle] = useState(false);
    const handleAccordionToggle = (evt) => setAccordionToggle(!accordionToggle);

    useEffect(() => {
        if (autoclose) {
            setAccordionToggle(false);
        }
    }, [selected]);

    return (
        <li className={`${style['accordion']} ${accordionToggle ? style['is-active'] : ''} ${selected?.id && selected?.id != '' ? style['is-selected'] : ''}`}>
            <div onClick={(evt) => handleAccordionToggle(evt)} className={style['accordion-toggle']}>
                <span className="d-inline-flex justify-content-between align-items-center m-0"><span>{title}</span><small>- {selected?.id && selected?.id != '' ? '' : <span>E.g. </span>}{subtitle}</small></span> {accordionToggle ? <FontAwesomeIcon width="25" height="25" icon={faChevronUp} /> : <FontAwesomeIcon width="25" height="25" icon={faChevronDown} />}
            </div>
            <div className={style['accordion-content']}>{children}</div>
        </li>
    )
}
export default SearchAccordion;