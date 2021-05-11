import React, { useState, useEffect } from 'react';
import style from './faq-results.module.scss';
import FaqResult from './faq-result';
import Pagination from '../pagination';
import Pagesize from '../pagesize';

type Props = {
    searchList: any;
    searchTerm: string;
    currentPage: number,
    resultsPerPage: number;
    totalResults: number;
    pageCount: number;
    handlePageSize: any;
    handlePageClick: any;
}
const FaqResults:React.FC<Props> = ({searchList, searchTerm, currentPage, resultsPerPage, totalResults, pageCount, handlePageSize, handlePageClick}) => {
    const [searchResults, setSearchResults] = useState(searchList.dataItems ? searchList.dataItems : []);

    useEffect(() => {
        setSearchResults(searchList.dataItems ? searchList.dataItems : []);
    }, [searchList]);

    return(
        <div className={style['faq-results']}>
            <h1>Or find your answer below...</h1>
            {searchResults.map(searchResult => (
                <FaqResult key={searchResult.id} searchTerm={searchTerm} searchResult={searchResult} />
            ))}
            <div className="row">
                {totalResults > 5 &&
                <Pagesize className="col-md-12 d-flex justify-content-start align-items-center my-3" increments={[5,10,25,50]} activePage={resultsPerPage} handlePageClick={(pagesize) => handlePageSize(pagesize)} />
                }
                {pageCount > 1 &&
                    <Pagination className="col-md-12 d-flex justify-content-end align-items-center my-3" totalResults={totalResults} pageCount={pageCount} currentPage={currentPage} handlePageClick={handlePageClick} />
                }
            </div>
        </div>
    )
}

export default FaqResults;