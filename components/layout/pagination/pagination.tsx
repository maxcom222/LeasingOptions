import React from 'react';
import style from './pagination.module.scss';

type Props = {
    className?: any,
    totalResults: number;
    pageCount: number;
    currentPage: number;
    handlePageClick: any;
}

const Pagination:React.FC<Props> = ({className, pageCount, currentPage, handlePageClick}) => {
    const maxPages = 5;
    const firstPage = 1;
    const prevPage = currentPage - 1;
    const nextPage = currentPage + 1;
    
    return (
        <div className={`${style['pagination']} ${className ? className : ""}`}>
            <span>Page Number</span>
            <ul>
                {pageCount < maxPages &&
                    Array.from(Array(pageCount).keys()).map(x => x+1).map(page => {
                        return (
                            <li key={page}><button className={`${page === currentPage ? style['is-active'] : ""}`} onClick={(evt) => handlePageClick(evt, page)}>{page}</button></li>
                        );
                    })
                }
                {pageCount >= maxPages &&
                    <>
                        <li><button className={`${firstPage === currentPage ? style['is-active'] : ""}`} onClick={(evt) => handlePageClick(evt, firstPage)}>{firstPage}</button></li>

                        {currentPage !== firstPage && prevPage !== firstPage &&
                            <li><button onClick={(evt) => handlePageClick(evt, prevPage)}>&lt;</button></li>
                        }

                        {currentPage > firstPage && currentPage !== pageCount &&
                            <li><button className={style['is-active']} onClick={(evt) => handlePageClick(evt, currentPage)}>{currentPage}</button></li>
                        }

                        {nextPage !== pageCount && currentPage !== pageCount &&
                            <li><button onClick={(evt) => handlePageClick(evt, nextPage)}>&gt;</button></li>
                        }
                        
                        <li><button className={`${pageCount === currentPage ? style['is-active'] : ""}`} onClick={(evt) => handlePageClick(evt, pageCount)}>{pageCount}</button></li>
                    </>
                }
            </ul>
        </div>
    )
}

export default Pagination;