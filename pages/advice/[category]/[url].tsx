import React, { useState, useEffect } from 'react';
import style from 'sass/single-post.module.scss';
import MetaHead from '../../../components/seo/meta';
import Link from 'next/link';
import MainLayout from '../../../components/layout/main-layout';
import PageUpsell from '../../../components/layout/page-upsell';
import PageFaqs from '../../../components/layout/page-faqs';
import AsideGuides from '../../../components/layout/aside-guides';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/pro-regular-svg-icons";
import { InlineShareButtons } from 'sharethis-reactjs';
import wrapper from 'redux/store.tsx/store';
import { ContentService } from 'business-logic/contentService';
import * as _ from 'underscore';
import { MetaData } from 'types/infrastructure/MetaData';

export const getServerSideProps = wrapper.getServerSideProps(

    async (context) => {
        const postUrl = context.query.url as string;
        const categoryUrl = context.query.category as string;
        const categoryList = await ContentService.GetContentCategories();
        const category = _.find(categoryList.data || [], function (item) { return item.url === categoryUrl; });
        const popularGuides = await ContentService.GetPopularContentItems();
        const pageContent = await ContentService.GetByUrl(postUrl);
        const faqList = await ContentService.GetAdviceGuidesFaqs(0);

        const metaData: MetaData = {
            title: pageContent?.data.seoPageTitle,
            description: pageContent?.data.seoMetaDescription,
            canonicalUrl: context.req.url,
            ampHTML: `/amp/advice/${categoryUrl}/${postUrl}`,
            imageUrl: pageContent?.data.imageUrl,
        }

        return {
            props: {
                postUrl: postUrl,
                category: category,
                categoryList: categoryList.data,
                popularGuides: popularGuides.data,
                pageContent: pageContent.data,
                faqList: faqList.data,
                metaData: metaData
            }
        }
    }
)
export default function AdvicePost({ postUrl, category, metaData, categoryList, popularGuides, faqList, pageContent }) {
    const [likeCount, setLikeCount] = useState(pageContent.likesCount === null ? 0 : pageContent.likesCount);
    const [dislikeCount, setDisikeCount] = useState(pageContent.dislikesCount === null ? 0 : pageContent.dislikesCount);
    const cardImage = (pageContent.imageUrl) ? pageContent.imageUrl : process.env.NEXT_PUBLIC_CDN + "/fit-in/400x400/website/static/img-placeholder.jpg";
    const handleIncrementLikes = (newsId) => {
        //TODO: ADD check for user IP
        Promise.resolve(IncrementLikes(newsId)).then(function (data) {
            setLikeCount(likeCount + 1);
        })
    }
    const handleIncrementDislikes = (newsId) => {
        //TODO: ADD check for user IP
        Promise.resolve(IncrementDislikes(newsId)).then(function (data) {
            setDisikeCount(dislikeCount + 1);
        })
    }

    async function IncrementLikes(newsId) {
        return await ContentService.IncrementLikes(newsId);
    }

    async function IncrementDislikes(newsId) {
        return await ContentService.IncrementDislikes(newsId);
    }

    useEffect(() => {
        if (postUrl === 'car-running-cost-calculator') {
            appendCalculatorScript('runningCalcScript', `
                var eventMethod = window.addEventListener
                    ? "addEventListener"
                    : "attachEvent";
                var eventer = window[eventMethod];
                var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
                eventer(
                    messageEvent,
                    function (e) {
                    if (e.data.indexOf("resize::") != -1) {
                        var height = e.data.replace("resize::", "");
                        document.getElementById("runningCalc").style.height = height + "px";
                    }
                    },
                    false
                );
            `, false);
        }

        if(postUrl === 'pcp-early-settlement-calculator') {
            appendCalculatorScript('pcpCalcScript', `
                var eventMethod = window.addEventListener
                    ? "addEventListener"
                    : "attachEvent";
                var eventer = window[eventMethod];
                var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
                eventer(
                    messageEvent,
                    function (e) {
                    if (e.data.indexOf("resize::") != -1) {
                        var height = e.data.replace("resize::", "");
                        document.getElementById("pcpCalc").style.height = height + "px";
                    }
                    },
                    false
                );
            `, false);
        }
    }, [])

    function appendCalculatorScript(id:string, text:string, async:boolean) {
        const mainScript = document.createElement('script');
        
        mainScript.type = 'text/javascript';
        mainScript.id = id;
        mainScript.text = text;
        mainScript.async = async;
        
        document.head.appendChild(mainScript);
    }

    return (
        <>
            <section className="bg-light-grey py-3 py-md-5">
                <div className="container-fluid">
                    <div className="row d-flex">
                        <div className="col-24 col-lg-18 order-2 order-lg-1">
                            <article className={style['single-post']}>
                                <div className={style['single-post__img']}>
                                    <img className="img-fluid lazyload" alt={`${pageContent.pageTitle} image`} data-src={cardImage} />
                                    <div className={style['single-post__tags']}>
                                        <ul>
                                            <li><Link href={`/advice/${category.url}`} passHref><a>{category.name}</a></Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={style['single-post__info']}>
                                    <h1>{pageContent.pageTitle}</h1>
                                    <span dangerouslySetInnerHTML={{ __html: pageContent.pageSubtitle }}></span>
                                    <div className="w-100 position-relative" dangerouslySetInnerHTML={{ __html: pageContent.content }}></div>
                                </div>
                                <div className={style['single-post__tags']}>
                                    {pageContent.tags.length > 0 &&
                                        <ul>
                                            <li className="tag-label">Tags</li>
                                            {pageContent.tags.map(tag => (
                                                <li key={`tag-${tag}`}>{tag}</li>
                                            ))}
                                        </ul>
                                    }
                                    <hr />
                                </div>
                                <div className={`${style['single-post__social']} d-lg-flex align-items-center justify-content-center`}>
                                    <div className={`${style['single-post__rate']} d-inline-flex flex-wrap align-items-lg-center justify-content-center justify-content-lg-start`}>
                                        <h4>Enjoy this article?</h4>
                                        <a className={`${style['single-post__thumb']} ${style['single-post__thumb--left']}`}>
                                            <span>{likeCount}</span>
                                            <FontAwesomeIcon width="30" height="30" icon={faThumbsUp} onClick={() => handleIncrementLikes(pageContent.id)} />
                                        </a>
                                        <a className={`${style['single-post__thumb']} ${style['single-post__thumb--right']}`}>
                                            <FontAwesomeIcon width="30" height="30" icon={faThumbsDown} onClick={() => handleIncrementDislikes(pageContent.id)} />
                                            <span>{dislikeCount}</span>
                                        </a>
                                    </div>
                                    <div className={`${style['single-post__share']} d-inline-flex flex-wrap align-items-lg-center justify-content-center justify-content-lg-end`}>
                                        <InlineShareButtons
                                            config={{
                                                alignment: 'center',  // alignment of buttons (left, center, right)
                                                color: 'social',      // set the color of buttons (social, white)
                                                enabled: true,        // show/hide buttons (true, false)
                                                font_size: 10,        // font size for the buttons
                                                labels: 'cta',        // button labels (cta, counts, null)
                                                language: 'en',       // which language to use (see LANGUAGES)
                                                networks: [           // which networks to include (see SHARING NETWORKS)
                                                    'facebook',
                                                    'twitter',
                                                    'linkedin'
                                                ],
                                                padding: 12,          // padding within buttons (INTEGER)
                                                radius: 0,            // the corner radius on each button (INTEGER)
                                                show_total: false,
                                                size: 26,             // the size of each button (INTEGER)
                                            }}
                                        />
                                    </div>
                                </div>
                            </article>
                        </div>
                        <div className="col-24 col-lg-6 order-1 order-lg-2">
                            <AsideGuides selectedCategory={category.id} categoryList={categoryList} popular={true} popularGuides={popularGuides} />
                        </div>
                    </div>
                </div>
            </section>
            <PageFaqs faqList={faqList} />
            <PageUpsell />
        </>
    )
}

AdvicePost.layout = MainLayout;