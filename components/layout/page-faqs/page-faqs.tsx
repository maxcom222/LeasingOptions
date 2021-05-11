import React from 'react';
import PageFaqItem from './page-faqs-item';
import style from './page-faqs.module.scss';

type Props = {
    id?: string;
    faqList?: any;
}
const PageFaqs:React.FC<Props> = ({id = "faqs", faqList}) => {
    
    return (
        <section id={id} className={`${style['page-faqs']} container-fluid py-5`}>
            <div className="row">
                <div className={`${style['page-faqs__title']} col-24 text-center`}>
                    <h3>Car Leasing FAQs</h3>
                </div>
            </div>
            <div className="row">
                {faqList.trending.length &&
                    <div className={`${style['page-faqs__col']} col-24 col-md-12`}>
                        <h4>Trending Topics</h4>
                        {faqList.trending.map(faq => (
                            <PageFaqItem key={`faq-${faq.id}`} question={faq.question} answer={faq.answer}  />
                        ))}
                    </div>
                }
                {/* {faqList.featured.length &&
                    <div className={`${style['page-faqs__col']} col-24 col-md-12`}>
                        <h4>Trending Topics</h4>
                        {faqList.featured.map(faq => (
                            <PageFaqItem key={`faq-${faq.id}`} question={faq.question} answer={faq.answer}  />
                        ))}
                    </div>
                } */}
            </div>
            <div className="row">
                <div className={`${style['page-faqs__cta']} col-24 text-center`}>
                    <a href="/car-leasing-faqs" className="btn btn-primary btn-lg">See all FAQs</a>
                </div>
            </div>
        </section>
    )
}

export default PageFaqs;