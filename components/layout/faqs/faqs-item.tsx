import React, { useState } from 'react';
import style from './faqs.module.scss';
import { FaqItem } from 'types/FaqItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/pro-regular-svg-icons";

type Props = {
    faq: FaqItem;
}

const FaqsItem:React.FC<Props> = ({faq}) => {

    const [faqToggle, setFaqToggle] = useState<boolean>(false);

    const handleFaqClick = (evt) => {
        evt.preventDefault();
        setFaqToggle(!faqToggle);
    }

    return (
        <div className={`${style['faqs__item']} ${faqToggle ? style['is-active'] : ""}`}>
            <div className={style['faqs__title']} onClick={(evt) => handleFaqClick(evt)}>
                {faq.question}
                {faqToggle ? <FontAwesomeIcon width="25" height="25" icon={faChevronUp} /> : <FontAwesomeIcon width="25" height="25" icon={faChevronDown} />}
            </div>
            <div className={style['faqs__content']} dangerouslySetInnerHTML={{__html: faq.answer}}></div>
        </div>
    )
}

export default FaqsItem;