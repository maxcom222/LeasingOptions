import React, { ReactNode } from 'react';
import FaqsItem from './faqs-item';
import { FaqItem } from 'types/FaqItem';
import style from './faqs.module.scss';

type Props = {
    title: string;
    titleCentered?: boolean;
    className?: string;
    children?: ReactNode,
    faqs: Array<FaqItem>;
}

const Faqs: React.FC<Props> = ({ title, titleCentered = false, className = "bg-white", children, faqs }) => {

    return (
        <section className={`container-fluid py-5 ${className}`}>
            <div className="row">
                <div className="col-24">
                    <h2 className={`h1 mb-3 mb-md-5 ${titleCentered ? "text-center" : ""}`}>{title}</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-24">
                    <div className={style['faqs']}>
                        {faqs?.map((faq, index) => (
                            <FaqsItem key={index} faq={faq} />
                        ))}
                    </div>
                </div>
            </div>
            {children}
        </section>
    )
}

export default Faqs;