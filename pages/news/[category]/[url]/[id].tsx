import React, { useState } from 'react';
import style from 'sass/single-post.module.scss';
import MetaHead from '../../../../components/seo/meta';
import MainLayout from '../../../../components/layout/main-layout';
import Newsletter from '../../../../components/layout/newsletter';
import AsideNews from '../../../../components/layout/aside-news';
import PageRelated from '../../../../components/layout/page-related';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/pro-regular-svg-icons";
import { InlineShareButtons } from 'sharethis-reactjs';
import { NewsTypes } from 'enums/NewsTypes';
import wrapper from 'redux/store.tsx/store';
import { NewsService } from 'business-logic/newsService';
import { ContentService } from 'business-logic/contentService';
import { GetBlogPostSchema, GetSerializedSchema } from 'helpers/schemaHelper';
import moment from 'moment';
import { url } from 'inspector';
import { MetaData } from 'types/infrastructure/MetaData';
import { GetNewsType } from 'helpers/enumsHelper';

export const getServerSideProps = wrapper.getServerSideProps(

    async (context) => {
        const newsId = context.query.id as string;
        const url = context.query.url as string;
        const category = context.query.category as string;
        const newsType = GetNewsType(category);
        const newsArticlePromise = await NewsService.GetNewsArticle(parseInt(newsId));
        const popularNewsPromise = await NewsService.GetCategoryPopularArticles(newsType);
        const relatedNewsPromise = await NewsService.GetRelatedArticles(parseInt(newsId));

        const webPageSchema = GetSerializedSchema(GetBlogPostSchema(newsArticlePromise?.data));
        const metaData: MetaData = {
            title: `${newsArticlePromise?.data?.metaTitle} | Leasing Options`,
            description: newsArticlePromise?.data?.metaDescription,
            canonicalUrl: context.req.url,
            keywords: (newsArticlePromise?.data?.metaKeywords) !== undefined ? newsArticlePromise?.data?.metaKeywords : null,
            ampHTML: `/amp/news/${category}/${url}/${newsId}`,
            imageUrl: process.env.NEXT_PUBLIC_CDN + newsArticlePromise?.data?.imageUrl,
        }

        return {
            props: {
                metaData: metaData,
                category: category,
                newsId: parseInt(newsId),
                newsType: newsType,
                newsArticle: newsArticlePromise.data,
                popularNews: popularNewsPromise.data,
                relatedNews: relatedNewsPromise.data,
                webPageSchema: webPageSchema
            }
        }
    }
)
const NewsPost = ({ category, newsId, newsType, newsArticle, popularNews, relatedNews, webPageSchema }) => {
    const [likeCount, setLikeCount] = useState(newsArticle.likesCount);
    const [dislikeCount, setDisikeCount] = useState(newsArticle.dislikesCount);
    const cardImage = (newsArticle.imageUrl) ? newsArticle.imageUrl : "/fit-in/400x400/website/static/img-placeholder.jpg";
    const momentDate = moment(newsArticle.onDate, "YYYY-MM-DDTHH:mm");
    const formattedDate = momentDate.format("DD MMMM YYYY");
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

    return (
        <>
            <MetaHead>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webPageSchema }}></script>
            </MetaHead>
            <section className="bg-light-grey py-3 py-md-5">
                <div className="container-fluid">
                    <div className="row d-flex">
                        <div className="col-24 col-lg-18 order-2 order-lg-1">
                            <article className={style['single-post']}>
                                <div className={style['single-post__img']}>
                                    <img className="img-fluid lazyload" alt={`${newsArticle.title} image`} data-src={`${process.env.NEXT_PUBLIC_CDN + cardImage}`} />
                                </div>
                                <div className={style['single-post__info']}>
                                    <h1>{newsArticle.title}</h1>
                                    <span>{formattedDate}</span>
                                    <div className="w-100 position-relative" dangerouslySetInnerHTML={{ __html: newsArticle.newsText }}></div>
                                </div>
                                <div className={style['single-post__tags']}>
                                    {newsArticle.tags.length > 0 &&
                                        <ul>
                                            <li className="tag-label">Tags</li>
                                            {newsArticle.tags.map(tag => (
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
                                            <FontAwesomeIcon width="30" height="30" icon={faThumbsUp} onClick={() => handleIncrementLikes(newsId)} />
                                        </a>
                                        <a className={`${style['single-post__thumb']} ${style['single-post__thumb--right']}`}>
                                            <FontAwesomeIcon width="30" height="30" icon={faThumbsDown} onClick={() => handleIncrementDislikes(newsId)} />
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
                            <AsideNews popular={true} filters={newsType === NewsTypes.VehicleReviews} social={true} popularNews={popularNews} newsType={newsType} category={category} />
                        </div>
                    </div>
                </div>
            </section>
            {relatedNews.length > 0 && <PageRelated relatedNews={relatedNews} />}
            <Newsletter />
        </>
    )
}

NewsPost.layout = MainLayout;

export default NewsPost;