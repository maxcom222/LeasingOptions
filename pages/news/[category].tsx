import React, { useEffect, useState } from 'react';
import MetaHead from '../../components/seo/meta';
import MainLayout from '../../components/layout/main-layout';
import PageBanner from '../../components/page-banner';
import CardNews from '../../components/card/card-news';
import AsideNews from '../../components/layout/aside-news';
import PageRelated from '../../components/layout/page-related';
import PageUpsell from '../../components/layout/page-upsell';
import { NewsTypes } from 'enums/NewsTypes';
import wrapper from 'redux/store.tsx/store';
import { NewsService } from 'business-logic/newsService';
import PageBannerSearchNews from 'components/page-banner/page-banner--searchNews';
import { MetaData } from 'types/infrastructure/MetaData';
import { GetNewsCategoryPageTitle, GetNewsCategoryPageMetaDescription, GetNewsCategoryPageKeywords, GetNewsCategoryPageMetaImageDescription } from 'helpers/seoHelper';
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { getBaseUrl } from 'helpers/urlsHelper';
import { GetNewsType } from 'helpers/enumsHelper';

export const getServerSideProps = wrapper.getServerSideProps(

    async (context) => {
        const category = context.query.category as string;
        const newsType = GetNewsType(category);
        const categoryNewsPromise = await NewsService.GetAllNewsArticlePreviews(newsType, null, 1, 9);
        const popularNewsPromise = await NewsService.GetCategoryPopularArticles(newsType);
        const relatedNewsPromise = await NewsService.GetCategoryRelatedArticles(newsType);


        const metaData: MetaData = {
            title: GetNewsCategoryPageTitle(newsType),
            description: GetNewsCategoryPageMetaDescription(newsType),
            canonicalUrl: GetCanonicalUrl(getBaseUrl(context.req.url)),
            keywords: GetNewsCategoryPageKeywords(),
            imageUrl: GetNewsCategoryPageMetaImageDescription(newsType),
        }

        return {
            props: {
                metaData: metaData,
                category: category,
                newsType: newsType,
                categoryNews: categoryNewsPromise.data,
                popularNews: popularNewsPromise.data,
                relatedNews: relatedNewsPromise.data
            }
        }
    }
)

export default function NewsCategory({ category, newsType, categoryNews, popularNews, relatedNews }) {
    const [pageResults, setPageResults] = useState(categoryNews);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const handleReadMore = () => setPageIndex(pageIndex + 1);

    useEffect(() => {

        Promise.resolve(getMoreArticles(pageIndex)).then(function (data) {
            setPageResults(data.data);
        })
    }, [pageIndex]);

    async function getMoreArticles(pageIndex) {
        return await NewsService.GetAllNewsArticlePreviews(newsType, null, 1, 9 * pageIndex);
    }

    return (
        <>
            <PageBanner className={`page-banner--${category}`} trustPilot={true}>
                <div className="row">
                    <div className="col-24 pt-md-5">
                        {newsType === NewsTypes.LatestNews &&
                            <>
                                <h1 className="text-white"><strong>Latest News</strong></h1>
                                <h2 className="text-white mb-3 mb-md-5">Keep up-to-date with the Leasing Lounge. From exciting model launches to tech news, you'll find all the latest vehicle news here.</h2>
                            </>
                        }
                        {newsType === NewsTypes.VehicleReviews &&
                            <>
                                <h1 className="text-white"><strong>Vehicle Reviews</strong></h1>
                                <h2 className="text-white mb-3 mb-md-5">Read exclusive model reviews from our experts right here on the Leasing Lounge. The very latest models get put to the test by our drivers.</h2>
                            </>
                        }
                        {newsType === NewsTypes.Blog &&
                            <>
                                <h1 className="text-white"><strong>Blog</strong></h1>
                                <h2 className="text-white mb-3 mb-md-5">Whether you're seeking expert advice or just a bit of fun, you've come to the right place. Our blog posts cover all kinds of car-related topics; have a browse right here on the Leasing Lounge.</h2>
                            </>
                        }
                        <PageBannerSearchNews newsType={newsType} />
                    </div>
                </div>
            </PageBanner>
            <section className="container-fluid py-3 py-md-4 pb-md-5 bg-light-grey">
                <div className="row mb-md-4">
                    <div className="col-24 col-lg-6 d-flex">
                        <AsideNews popular={true} filters={newsType === NewsTypes.VehicleReviews} social={true} popularNews={popularNews} newsType={newsType} category={category} />
                    </div>
                    <div className="col-24 col-lg-18 py-5 py-md-0">
                        <div className="row no-gutters">
                            <div className="col-24 d-lg-none">
                                <h2>Latest Articles</h2>
                            </div>
                        </div>
                        <div className="row">
                            {pageResults.dataItems.map((article, index) => (
                                <div key={article.id} className={`col-24 ${index > 2 ? 'col-lg-12' : 'col-lg-8'}  d-flex mb-3`}>
                                    <CardNews condensed={index > 2 ? true : false} id={`article-${article.id}`} image={article.imageUrl} tag={article.type} link={article.url} title={article.title} date={article.onDate} excerpt={article.description} />
                                </div>
                            ))}
                            {pageIndex * 9 < pageResults.totalItemsCount &&
                                <div className="col-24 text-center">
                                    <button className="btn btn-primary btn-lg mt-3" onClick={() => handleReadMore()}>View More</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
            {relatedNews.length > 0 && <PageRelated relatedNews={relatedNews} />}
            <PageUpsell />
        </>
    )
};

NewsCategory.layout = MainLayout;