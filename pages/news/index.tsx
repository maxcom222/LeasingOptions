import React from 'react';
import MetaHead from '../../components/seo/meta';
import MainLayout from '../../components/layout/main-layout';
import PageBanner from '../../components/page-banner';
import CardNews from '../../components/card/card-news';
import AsideNews from '../../components/layout/aside-news';
import Newsletter from '../../components/layout/newsletter';
import PageUpsell from '../../components/layout/page-upsell';
import { NewsTypes } from 'enums/NewsTypes';
import wrapper from 'redux/store.tsx/store';
import { NewsService } from 'business-logic/newsService';
import PageBannerSearchNews from 'components/page-banner/page-banner--searchNews';
import { MetaData } from 'types/infrastructure/MetaData';
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { getBaseUrl } from 'helpers/urlsHelper';

export const getServerSideProps = wrapper.getServerSideProps(

    async (context) => {
        const topNewsPromise = await NewsService.GetTopNews();

        const metaData: MetaData = {
            title: `Car Leasing News | Latest news from Leasing options in Manchester`,
            description: `Read the latest news from the Motoring Industry as well as news about the Leasing Industry brought to you from Industry experts.`,
            canonicalUrl: GetCanonicalUrl(getBaseUrl(context.req.url)),
            keywords: `Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire`,
            imageUrl: process.env.NEXT_PUBLIC_CDN + "/website/news/page-banner.png",
        }

        return {
            props: {
                metaData: metaData,
                topNews: topNewsPromise.data,
            }
        }
    }
)
export default function News({ topNews }) {
    return (
        <>
            <PageBanner className="page-banner--news" image={`${process.env.NEXT_PUBLIC_CDN}/website/news/page-banner.png`}>
                <div className="row">
                    <div className="col-24 pt-md-5">
                        <h1 className="text-white"><strong>The Leasing Lounge</strong></h1>
                        <h2 className="text-white mb-3 mb-md-5">All the latest news, vehicle reviews and blog articles!</h2>
                        <PageBannerSearchNews />
                    </div>
                </div>
            </PageBanner>
            <section className="container-fluid py-3 py-md-4 pb-md-5 bg-light-grey">
                <div className="row mb-md-4">
                    <div className="col-24 col-lg-6 d-flex">
                        <AsideNews social={true} />
                    </div>
                    <div className="col-24 col-lg-18 py-5 py-md-0">
                        <div className="row no-gutters">
                            <div className="col-24 d-lg-none">
                                <h2>Latest Articles</h2>
                            </div>
                        </div>
                        <div className="row">
                            {topNews?.map(newsItem => {
                                if (newsItem.type == NewsTypes.None) {
                                    return;
                                }

                                let moreText = null;
                                let morelink = null;
                                let colId = null;

                                if (newsItem.type == NewsTypes.Blog) {
                                    moreText = "All Blogs";
                                    morelink = "/news/blog";
                                    colId = "latest-blog-col";
                                } else if (newsItem.type == NewsTypes.VehicleReviews) {
                                    moreText = "All Vehicle Reviews";
                                    morelink = "/news/vehicle-reviews";
                                    colId = "latest-reviews-col";
                                } else if (newsItem.type == NewsTypes.LatestNews) {
                                    moreText = "All Latest News";
                                    morelink = "/news/latest-news";
                                    colId = "latest-news-col";
                                }

                                return (
                                    <div key={newsItem.id} className="col-24 col-lg-8 d-flex">
                                        <CardNews id={colId} image={newsItem.imageUrl} tag={newsItem.type} link={newsItem.url} title={newsItem.title} date={newsItem.onDate} excerpt={newsItem.description} moreLink={morelink} moreText={moreText} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
            <Newsletter />
            <PageUpsell />
        </>
    )
};

News.layout = MainLayout;