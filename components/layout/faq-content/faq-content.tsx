import React from 'react';

type Props = {
    faqs: any;
}
const FaqContent:React.FC<Props> = ({faqs}) => {
    return (
        <>
            {faqs.map(faq => (
                <div key={faq.id}>
                    <h3 id={`faq_answer_${faq.id}`}>{faq.question}</h3>
                    <div dangerouslySetInnerHTML={{__html: faq.answer}}></div>
                </div>
            ))}
        </>
    )
}

export default FaqContent