import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import style from './page-banner.module.scss';
import { ContentService } from 'business-logic/contentService';

type Props = {
    categoryId?: any;
    categoryList: any;
}
const PageBannerSearchGuides:React.FC<Props> = ({categoryId, categoryList}) => {
    const newsSearchTerm = useRef();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState(categoryId);
    const [searchList, setSearchList] = useState([]);
    const handleCategoryChange = (evt) => setSelectedCategory(evt.currentTarget.value);
    const handleGuideSearch = () => getSearchResults();

    useEffect(() => {
        getSearchResults();
    }, [selectedCategory]);

    function getSearchResults() {

        // @ts-ignore
        let searchTerm = newsSearchTerm.current.value.toString();
        
        if (searchTerm.length >= 3) {
            setIsLoading(true);

            Promise.resolve(GetGuidesSearchList(selectedCategory, searchTerm)).then(function(data) {
                setSearchList(data.data);
                setIsLoading(false);
            });
        } else {
            setSearchList([]);
        }
    }

    async function GetGuidesSearchList(categoryId, searchTerm) {
        return await ContentService.GetGuidesSearchList(categoryId, searchTerm);
    } 

    return(
        <div className={style['page-banner__search']}>
            <form>
                <div className={style['page-banner__dd']}>
                    <select defaultValue={selectedCategory} onChange={(evt) => handleCategoryChange(evt)}>
                        <option value="">Search all guides</option>
                        {categoryList.map(category => (
                            <option key={`cateogry=${category.id}`} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="w-100 d-inline-flex">
                    {isLoading ? <FontAwesomeIcon width="40" height="50" icon={faSpinner} className={`fa-spin ${style['page-banner__loading']}`} /> : ""}
                    <input ref={newsSearchTerm} type="search" placeholder="e.g. BMW 3 Series" autoComplete="off" onChange={() => handleGuideSearch()} />
                    <div><FontAwesomeIcon width="40" height="50" icon={faSearch} onClick={() => handleGuideSearch()} /></div>
                </div>
                {searchList.length > 0 &&
                    <div className={style['page-banner_results']}>
                        <ul>
                            {searchList.map(result => (
                                <li key={`result-${result.url}`}><Link href={"advice/" + result.categoryUrl + "/" + result.url} passHref><a>{result.pageTitle}</a></Link></li>
                            ))}
                        </ul>
                    </div>
                }
            </form>
        </div>
    );
}
  
  export default PageBannerSearchGuides;