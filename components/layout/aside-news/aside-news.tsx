import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import style from './aside-news.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faLinkedin, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { NewsTypes } from 'enums/NewsTypes';

type Props = {
    social?: boolean;
    popular?: boolean;
    filters?: boolean;
    popularNews?: any;
    newsType?: NewsTypes;
    category?: string;
}

const AsideNews: React.FC<Props> = ({ social = false, popular = false, filters = false, popularNews, newsType, category }) => {
    const [categoryToggle, setCategoryToggle] = useState(false);
    const [popularToggle, setPopularToggle] = useState(false);
    const [popularTitle, setPopularTitle] = useState('');
    const [filterToggle, setFilterToggle] = useState(false);
    const handleCategoryToggle = () => setCategoryToggle(!categoryToggle);
    const handlePopularToggle = () => setPopularToggle(!categoryToggle);
    const handleFilterToggle = () => setFilterToggle(!filterToggle);

    useEffect(() => {
        if (popular && newsType) {
            switch (newsType) {
                case NewsTypes.LatestNews:
                    setPopularTitle("Popular News");
                    break;
                case NewsTypes.VehicleReviews:
                    setPopularTitle("Popular Reviews");
                    break;
                case NewsTypes.Blog:
                    setPopularTitle("Popular Blog Posts");
                    break;
                default:
                    setPopularTitle("Popular Posts");
                    break;
            }
        }
    }, [newsType]);

    return (
        <aside className={`${style['aside-news']} pt-md-4`}>
            <div className={`${style['aside-news__accordion']} ${category ? style['aside-news__accordion--' + category] : ''} ${categoryToggle ? style['is-active'] : ''}`}>
                <h3 onClick={() => handleCategoryToggle()}>Lounge Categories {categoryToggle ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}</h3>
                <nav>
                    <Link href="/news/latest-news" passHref><a className={newsType === NewsTypes.LatestNews ? style['is-active'] : ''}>Latest News</a></Link>
                    <Link href="/news/vehicle-reviews" passHref><a className={newsType === NewsTypes.VehicleReviews ? style['is-active'] : ''}>Vehicle Reviews</a></Link>
                    <Link href="/news/blog" passHref><a className={newsType === NewsTypes.Blog ? style['is-active'] : ''}>Blog</a></Link>
                </nav>
            </div>

            {popular && popularNews.length > 0 &&
                <div className={`${style['aside-news__accordion']} ${popularToggle ? style['is-active'] : ''} pt-3 pt-md-4`}>
                    <h3 onClick={() => handlePopularToggle()}>{popularTitle} {popularToggle ? <FontAwesomeIcon width="25" height="25" icon={faChevronUp} /> : <FontAwesomeIcon width="25" height="25" icon={faChevronDown} />}</h3>
                    <nav>
                        {popularNews.map(popular => (
                            <Link href={popular.url} passHref key={popular.id}><a>{popular.title}</a></Link>
                        ))}
                    </nav>
                </div>
            }

            {filters &&
                <div className={`${style['aside-news__accordion']} ${filterToggle ? style['is-active'] : ''}`}>
                    <h3 onClick={() => handleFilterToggle()}>Review By Manufacturer {filterToggle ? <FontAwesomeIcon width="25" height="25" icon={faChevronUp} /> : <FontAwesomeIcon width="25" height="25" icon={faChevronDown} />}</h3>
                    <div className={`${style['aside-news__manufacturer']}`}>
                        <select>
                            <option value="">Manufacturer</option>
                        </select>
                        <select>
                            <option value="">Model</option>
                        </select>
                    </div>
                </div>
            }

            {social &&
                <div className={style['aside-news__social']}>
                    <h3>Stay connected on social</h3>
                    <nav>
                        <a aria-label="Facebook" href="https://www.facebook.com/LeasingOptionsLtd" target="_blank" rel="noreferrer"><FontAwesomeIcon width="25" height="25" icon={faFacebookF} /></a>
                        <a aria-label="LinkedIn" href="https://www.linkedin.com/company/leasing-options-ltd" target="_blank" rel="noreferrer"><FontAwesomeIcon width="25" height="25" icon={faLinkedin} /></a>
                        <a aria-label="Instagram" href="https://www.instagram.com/leasing_options_ltd" target="_blank" rel="noreferrer"><FontAwesomeIcon width="25" height="25" icon={faInstagram} /></a>
                        <a aria-label="Twitter" href="https://twitter.com/LeasingOptions" target="_blank" rel="noreferrer"><FontAwesomeIcon width="25" height="25" icon={faTwitter} /></a>
                    </nav>
                </div>
            }
        </aside>
    )
}

export default AsideNews;