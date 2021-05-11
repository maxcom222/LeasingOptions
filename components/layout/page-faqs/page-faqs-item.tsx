import React, { useState } from 'react';
import style from './page-faqs.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/pro-regular-svg-icons";
import { FaqItem } from 'types/FaqItem';

const PageFaqItem:React.FC<FaqItem> = ({question, answer}) => {
    const [faqToggle, setFaqToggle] = useState(false);
    const handleFaqToggle = () => setFaqToggle(!faqToggle);

    return (
        <div className={`${style['faq-accordion']} ${faqToggle ? style['is-active'] : ""}`} onClick={handleFaqToggle}>
            <h3 className={`${style['faq-accordion__toggle']} h5`}>{question} {faqToggle ? <FontAwesomeIcon width="25" height="25" icon={faChevronUp} /> : <FontAwesomeIcon width="25" height="25" icon={faChevronDown} />}</h3>
            <div className={style['faq-accordion__content']} dangerouslySetInnerHTML={{__html: answer}}></div>
        </div>                  
    )
}

export default PageFaqItem;