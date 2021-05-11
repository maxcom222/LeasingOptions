import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import style from './page-banner.module.scss';
import { NewsTypes } from 'enums/NewsTypes';
import { NewsService } from 'business-logic/newsService';

type Props = {
    newsType?: NewsTypes
}
const PageBannerSearchNews:React.FC<Props> = ({newsType}) => {
    const newsSearchTerm = useRef();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectednewsType, setSelectednewsType] = useState<NewsTypes>(newsType);
    const [searchList, setSearchList] = useState([]);
    const handleNewsTypeChange = (evt) => setSelectednewsType(evt.currentTarget.value);
    const handleNewsSearch = () => getSearchResults();

    useEffect(() => {
        getSearchResults();
    }, [selectednewsType]);

    function getSearchResults() {
        // @ts-ignore
        let searchTerm = newsSearchTerm.current.value.toString();
        
        if (searchTerm.length >= 3) {
            setIsLoading(true);

            Promise.resolve(GetNewsSearchList(selectednewsType, searchTerm)).then(function(data) {
                setSearchList(data.data);
                setIsLoading(false);
            });
        } else {
            setSearchList([]);
        }
    }

    async function GetNewsSearchList(newsType, searchTerm) {
        return await NewsService.GetNewsSearchList(newsType, searchTerm);
    } 

    return(
        <div className={style['page-banner__search']}>
            <form>
                <div className={style['page-banner__dd']}>
                    <select defaultValue={selectednewsType} onChange={(evt) => handleNewsTypeChange(evt)}>
                        <option value="">Search all articles</option>
                        <option value={NewsTypes.LatestNews}>Latest News</option>
                        <option value={NewsTypes.VehicleReviews}>Vehicle Reviews</option>
                        <option value={NewsTypes.Blog}>Blog</option>
                    </select>
                </div>
                <div className="w-100 d-inline-flex">
                    {isLoading ? <FontAwesomeIcon width="40" height="50" icon={faSpinner} className={`fa-spin ${style['page-banner__loading']}`} /> : ""}
                    <input ref={newsSearchTerm} type="search" placeholder="e.g. BMW 3 Series" autoComplete="off" onChange={() => handleNewsSearch()} />
                    <div><FontAwesomeIcon width="40" height="50" icon={faSearch} onClick={() => handleNewsSearch()} /></div>
                </div>
                {searchList.length > 0 &&
                    <div className={style['page-banner_results']}>
                        <ul>
                            {searchList.map(result => (
                                <li key={`result-${result.url}`}><Link href={result.url} passHref><a>{result.title}</a></Link></li>
                            ))}
                        </ul>
                    </div>
                }
            </form>
        </div>
    );
}
  
  export default PageBannerSearchNews;