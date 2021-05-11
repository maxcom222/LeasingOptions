import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import style from './aside-guides.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faLinkedin, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

type Props = {
    social?: boolean;
    popular?: boolean;
    filters?: boolean;
    popularGuides?: any;
    selectedCategory?: number;
    categoryList: any;
    className?: string;
}

const AsideGuides: React.FC<Props> = ({ social = false, popular = false, filters = false, popularGuides, selectedCategory, categoryList, className }) => {
    const [categoryToggle, setCategoryToggle] = useState(false);
    const [linkToggle, setLinkToggle] = useState(false);
    const [popularToggle, setPopularToggle] = useState(false);
    const [filterToggle, setFilterToggle] = useState(false);
    const handleCategoryToggle = () => setCategoryToggle(!categoryToggle);
    const handleLinkToggle = () => setLinkToggle(!linkToggle);
    const handlePopularToggle = () => setPopularToggle(!popularToggle);
    const handleFilterToggle = () => setFilterToggle(!filterToggle);

    return (
        <aside className={`${style['aside-guides']} ${className ? className : ""}`}>
            <div className={`${style['aside-guides__accordion']} ${categoryToggle ? style['is-active'] : ''}`}>
                <h3 onClick={() => handleCategoryToggle()}>Guide Categories {categoryToggle ? <FontAwesomeIcon width="25" height="25" icon={faChevronUp} /> : <FontAwesomeIcon width="25" height="25" icon={faChevronDown} />}</h3>
                <nav>
                    {categoryList.map(category => (
                        <Link href={`/advice/${category.url}`} passHref key={`category-${category.id}`}><a className={selectedCategory === category.id ? style['is-active'] : ''}>{category.name}</a></Link>
                    ))}
                </nav>
            </div>

            {selectedCategory === 3 &&
                <div className={`${style['aside-guides__accordion']} ${linkToggle ? style['is-active'] : ''} d-none d-md-block`}>
                    <h3 className="mt-3 mt-md-5" onClick={() => handleLinkToggle()}>Popular Links {linkToggle ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon width="25" height="25" icon={faChevronDown} />}</h3>
                    <nav>
                        <Link href={`/electric-hybrid-car-leasing/types`} passHref><a>Electric Car Types</a></Link>
                        <Link href={`/electric-hybrid-car-leasing/charging`} passHref><a>EV Charging</a></Link>
                        <Link href={`/electric-hybrid-car-leasing/government-grants`} passHref><a>Government Grants</a></Link>
                    </nav>
                </div>
            }

            {popular && popularGuides.length > 0 &&
                <div className={`${style['aside-guides__accordion']} ${popularToggle ? style['is-active'] : ''} d-none d-md-block`}>
                    <h3 className="mt-3 mt-md-5" onClick={() => handlePopularToggle()}>Popular Guides {popularToggle ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon width="25" height="25" icon={faChevronDown} />}</h3>
                    <nav>
                        {popularGuides.map(popular => (
                            <Link href={`/advice/${popular.categoryUrl}/${popular.url}`} passHref key={popular.id}><a>{popular.pageTitle}</a></Link>
                        ))}
                    </nav>
                </div>
            }

            {filters &&
                <div className={`${style['aside-guides__accordion']} ${filterToggle ? style['is-active'] : ''} d-none d-md-block`}>
                    <h3 className="mt-3 mt-md-5" onClick={() => handleFilterToggle()}>Review By Manufacturer {filterToggle ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon width="25" height="25" icon={faChevronDown} />}</h3>
                    <div className={`${style['aside-guides__manufacturer']}`}>
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
                <div className={`${style['aside-guides__social']} d-none d-md-block`}>
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

export default AsideGuides;