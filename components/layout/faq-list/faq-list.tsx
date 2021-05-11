import React from 'react';
import style from './faq-list.module.scss';
import FaqItem from './faq-item';
import * as _ from 'underscore';

type Props = {
    faqs: any;
}
const FaqList:React.FC<Props> = ({faqs}) => {
    return(
        <div className={style['faq-list']}>
            {faqs.map(faqList => (
                <FaqItem key={`faq-list-${faqList.id}`} faqList={faqList} />
            ))}
            <h2 className="h5 text-mint mt-3 mt-md-5 mb-0">Still need an answer? No problem - get in touch with one of our friendly staff. We’re always happy to chat!</h2>
        </div>
    )
}

export default FaqList;