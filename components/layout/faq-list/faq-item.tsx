import React, { useState } from 'react';
import style from './faq-list.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/pro-regular-svg-icons";

type Props = {
    faqList: any;
}
const FaqItem:React.FC<Props> = ({faqList}) => {
    const [toggle, setToggle] = useState(false);
    const handleFaqToggle = () => setToggle(!toggle);

    return (
        <div className={style['faq-list__item']}>
            <div className={style['faq-list__title']} onClick={() => handleFaqToggle()}>
                {toggle ? <FontAwesomeIcon width="25" height="25" icon={faChevronUp} /> : <FontAwesomeIcon width="25" height="25" icon={faChevronDown} />}
                <div className={style['faq-list__icon']}><img alt={`${faqList.name} icon`} className="img-fluid lazyload" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/faqs/${faqList.iconFilename}`} /></div>
                <p>{faqList.name.replace('amp;', '')}</p>
            </div>
            <div className={`${style['faq-list__content']} ${toggle ? '' : 'd-none'}`}>
                {faqList.items.map(faq => (
                    <p key={faq.id}><a href={`#faq_answer_${faq.id}`}>{faq.question}</a></p>
                ))}
            </div>
        </div>
    )
}

export default FaqItem;