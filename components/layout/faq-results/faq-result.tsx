import React, { useState } from 'react';
import style from './faq-results.module.scss';


export default function FaqResult({ searchResult, searchTerm }) {
    const [toggle, setToggle] = useState(false);
    const handleFaqToggle = () => setToggle(!toggle);

    const GetDynamicExcerpt = (value: string): string => {
        if (value == null || value == undefined) {
            return;
        }
        value = value.toString();
        // Remove html tags
        value = value.replace(/<\/?[^>]+(>|$)/g, "");
        value = value.substr(0, 100);
        value = value + '...';

        return value;
    }

    const HighlightSearchTerm = (value: string, searchTerm: string) => {
        if (value == null || value == undefined) {
            return;
        }
        searchTerm = searchTerm.toString();
        value = value.toString();

        let index = value.toLowerCase().indexOf(searchTerm);
        if (index >= 0) {
            value = value.substring(0, index) + "<mark>" + value.substring(index, index + searchTerm.length) + "</mark>" + value.substring(index + searchTerm.length);
        }

        return value;
    }

    return (
        <div className={style['faq-result']}>
            <h3 dangerouslySetInnerHTML={{ __html: HighlightSearchTerm(searchResult.question, searchTerm) }}></h3>
            <p className={`${style['answer']} ${toggle ? 'd-none' : ''}`}>
            <span dangerouslySetInnerHTML={{ __html: HighlightSearchTerm(GetDynamicExcerpt(searchResult.answer), searchTerm) }}></span>
            <a className={style['expand-btn']} onClick={() => handleFaqToggle()}>View all</a></p>
            <div className={`${style['answer']} ${toggle ? '' : 'd-none'}`}>
                <div dangerouslySetInnerHTML={{ __html: HighlightSearchTerm(searchResult.answer, searchTerm) }}></div>
                <div className="text-right"><a className={style['expand-btn']} onClick={() => handleFaqToggle()}>Hide</a></div>
            </div>
        </div>
    )
}