import React, { useState, useEffect } from 'react';
import MetaHead from '../../components/seo/meta';
import MainLayout from '../../components/layout/main-layout';
import PageBanner from '../../components/page-banner';
import CardGuides from '../../components/card/card-guides';
import AsideGuides from '../../components/layout/aside-guides';
import PageUpsell from '../../components/layout/page-upsell';
import PageFaqs from '../../components/layout/page-faqs';
import wrapper from 'redux/store.tsx/store';
import { ContentService } from 'business-logic/contentService';
import * as _ from 'underscore';
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { getBaseUrl } from 'helpers/urlsHelper';
import { MetaData } from 'types/infrastructure/MetaData';
import PageBannerSearchGuides from 'components/page-banner/page-banner--searchGuides';

export const getServerSideProps = wrapper.getServerSideProps(

    async (context) => {
        const pageLimit = 9;
        const categoryList = await ContentService.GetContentCategories();
        const advicePromise = await ContentService.GetGuideItems(null, 1, pageLimit);
        const popularGuides = await ContentService.GetPopularContentItems();
        const faqList = await ContentService.GetAdviceGuidesFaqs(0);

        const metaData: MetaData = {
            title: `Leasing Guides | Car & Van Leasing Advice | Leasing Options`,
            description: `Have a question about vehicle leasing? Find your answer here in our simple leasing guides. Plus more tips and advice from the experts at Leasing Options.`,
            canonicalUrl: GetCanonicalUrl(getBaseUrl(context.req.url)),
            imageUrl: process.env.NEXT_PUBLIC_CDN + "/website/news/page-banner--blog.png",
        }

        return {
            props: {
                metaData: metaData,
                categoryList: categoryList.data,
                advice: advicePromise.data,
                popularGuides: popularGuides.data,
                faqList: faqList.data,
                pageLimit: pageLimit
            }
        }
    }
)

export default function Advice({ categoryList, advice, popularGuides, faqList, pageLimit }) {
    const [pageResults, setPageResults] = useState(advice);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const handleReadMore = () => setPageIndex(pageIndex + 1);

    useEffect(() => {

        Promise.resolve(getMoreArticles(pageIndex)).then(function (data) {
            setPageResults(data.data);
        })
    }, [pageIndex]);

    async function getMoreArticles(pageIndex) {
        return await ContentService.GetGuideItems(null, 1, pageLimit * pageIndex)
    }

    return (
        <>
            <PageBanner className="page-banner--advice" trustPilot={true}>
                <div className="row">
                    <div className="col-24 py-md-5">
                        <h1 className="text-white"><strong>Guide to Leasing</strong></h1>
                        <h2 className="text-white mb-3 mb-md-5">Find out everything you need to know about vehicle leasing in our simple, hassle-free guides.</h2>
                        <PageBannerSearchGuides categoryList={categoryList} />
                    </div>
                </div>
            </PageBanner>
            <section className="container-fluid py-3 py-md-4 pb-md-5 bg-light-grey">
                <div className="row mb-md-4">
                    <div className="col-24 col-lg-6 d-flex">
                        <AsideGuides categoryList={categoryList} popular={true} popularGuides={popularGuides} social={true} />
                    </div>
                    <div className="col-24 col-lg-18 py-5 py-md-0">
                        <div className="row no-gutters">
                            <div className="col-24 d-lg-none">
                                <h2>Latest Guides</h2>
                            </div>
                        </div>
                        <div className="row">
                            {pageResults.dataItems.map((article, index) => {
                                let categoryName = _.find(categoryList || [], function (item) { return item.url === article.categoryUrl; })

                                return (
                                    <div key={article.id} className={`col-24 ${index > 2 ? 'col-lg-12' : 'col-lg-8'}  d-flex mb-3`}>
                                        <CardGuides condensed={index > 2 ? true : false} id={`article-${article.id}`} image={article.imageUrl} tag={categoryName.name} link={article.url} title={article.pageTitle} date={article.publishDate} excerpt={article.pageSubtitle} category={article.categoryUrl} />
                                    </div>
                                )
                            })}
                            {pageIndex * pageLimit < pageResults.totalItemsCount &&
                                <div className="col-24 text-center">
                                    <button className="btn btn-primary btn-lg mt-3" onClick={() => handleReadMore()}>View More</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
            <PageFaqs faqList={faqList} />
            <PageUpsell />
        </>
    )
};

Advice.layout = MainLayout;