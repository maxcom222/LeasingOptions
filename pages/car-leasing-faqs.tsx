import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/main-layout';
import FaqSearch from '../components/layout/faq-search';
import FaqResults from '../components/layout/faq-results';
import FaqList from '../components/layout/faq-list';
import FaqContent from '../components/layout/faq-content';
import MetaHead from '../components/seo/meta';
import { ContentService } from 'business-logic/contentService';
import wrapper from 'redux/store.tsx/store';
import * as _ from 'underscore';
import { MetaData } from 'types/infrastructure/MetaData';
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { getBaseUrl } from 'helpers/urlsHelper';

export const getServerSideProps = wrapper.getServerSideProps(

    async (context) => {
        const faqSearch = context.query.search as string;
        const faqList = await ContentService.GetFaqListAll();
        const metaData: MetaData = {
            title: `Frequently Asked Car Leasing Questions | Leasing Options`,
            description: `Find answers to some of the most frequently asked Car Leasing questions or contact us directly to get an answer.`,
            canonicalUrl: GetCanonicalUrl(getBaseUrl(context.req.url)),
            keywords: "Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire"
        }

        return {
            props: {
                metaData: metaData,
                faqSearch: faqSearch,
                faqList: faqList.data,
            }
        }
    }
);
export default function LeasingFaqs({ faqSearch, faqList }) {
    const [searchTerm, setSearchTerm] = useState<string>(faqSearch ? faqSearch : '');
    const [searchList, setSearchList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [resultsPerPage, setResultsPerPage] = useState<number>(5);
    const [totalResults, setTotalResults] = useState<number>(0);
    const [pageCount, setPagecount] = useState<number>(1);
    const handlePageSize = (pagesize) => setResultsPerPage(pagesize);
    const handlePageClick = (evt, page) => {
        evt.preventDefault();
        setCurrentPage(page);
    }
    const handleFaqSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
        GetFaqSearchResults(searchTerm, currentPage, resultsPerPage);
    }
    const handleResultsClear = () => {
        setSearchTerm('');
        setSearchList([]);
        setIsLoading(false);
        setCurrentPage(1);
        setResultsPerPage(5);
        setTotalResults(0);
        setPagecount(1);
    }

    useEffect(() => {
        GetFaqSearchResults(searchTerm, currentPage, resultsPerPage);
    }, [currentPage, resultsPerPage]);

    function GetFaqSearchResults(searchTerm, currentPage, resultsPerPage) {

        if (searchTerm.length >= 3) {
            setIsLoading(true);
            Promise.resolve(GetFaqSearchPromise(searchTerm, currentPage, resultsPerPage)).then(function (data) {
                setSearchList(data.data);
                setTotalResults(data.data.totalItemsCount);
                setPagecount(data.data.totalPagesCount);
                setIsLoading(false);
            });
        } else {
            setSearchList([]);
            setSearchTerm('');
        }
    }

    async function GetFaqSearchPromise(searchTerm, currentPage, resultsPerPage) {
        return await ContentService.GetFaqSearchResults(searchTerm, currentPage, resultsPerPage);
    }

    return (
        <>
            <section className="container-fluid py-3 py-md-5">
                <div className="container">
                    <div className="row">
                        <div className="col-24">
                            <h1>Car Leasing FAQs</h1>
                            <h2 className="text-mint">Have a question? Try typing a few words into out search box</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-24">
                            <FaqSearch defaultValue={faqSearch ? faqSearch : ""} handleFaqSearch={handleFaqSearch} isLoading={isLoading} handleResultsClear={handleResultsClear} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-24">
                            <FaqResults searchList={searchList} searchTerm={searchTerm} currentPage={currentPage} resultsPerPage={resultsPerPage} totalResults={totalResults} pageCount={pageCount} handlePageSize={handlePageSize} handlePageClick={handlePageClick} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-24">
                            <FaqList faqs={faqList} />
                        </div>
                    </div>
                </div>
            </section>
            <section className="container-fluid py-3 py-md-5 bg-light-grey">
                <div className="container">
                    <div className="row">
                        <div className="col-24">
                            <div className="bg-faq-area">
                                <h1>All Questions</h1>
                                {faqList.map(faqGroup => (
                                    <div key={faqGroup.id}>
                                        <h2>{faqGroup.name.replace('amp;', '')}</h2>
                                        <FaqContent faqs={faqGroup.items} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

LeasingFaqs.layout = MainLayout;