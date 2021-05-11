import React, { useEffect, useState } from 'react';
import MainLayout from '../../components/layout/main-layout';
import PageBanner from '../../components/page-banner';
import CardGuides from '../../components/card/card-guides';
import AsideGuides from '../../components/layout/aside-guides';
import PageUpsell from '../../components/layout/page-upsell';
import PageFaqs from '../../components/layout/page-faqs';
import wrapper from 'redux/store.tsx/store';
import { ContentService } from 'business-logic/contentService';
import * as _ from 'underscore';
import { GetAdviceCategoryMeta } from 'helpers/seoHelper';
import PageBannerSearchGuides from 'components/page-banner/page-banner--searchGuides';

export const getServerSideProps = wrapper.getServerSideProps(

    async (context) => {
        const pageLimit = 9;
        const category = context.query.category as string;
        const categoryList = await ContentService.GetContentCategories();
        const categoryId = _.find(categoryList.data || [], function (item) { return item.url === category; });

        const advicePromise = await ContentService.GetGuideItems(categoryId.id, 1, pageLimit);
        const popularGuides = await ContentService.GetPopularContentItems();
        const faqList = await ContentService.GetAdviceGuidesFaqs(0);
        const metaData = GetAdviceCategoryMeta(categoryId.id, context.req.url);

        return {
            props: {
                category: category,
                categoryId: categoryId.id,
                categoryList: categoryList.data,
                advice: advicePromise.data,
                popularGuides: popularGuides.data,
                faqList: faqList.data,
                metaData: metaData,
                pageLimit: pageLimit
            }
        }
    }
)
export default function AdviceCategory({ categoryId, categoryList, advice, popularGuides, faqList, pageLimit }) {
    const categoryName = _.find(categoryList || [], function (item) { return item.id === categoryId; })?.name;
    const [pageResults, setPageResults] = useState(advice);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const handleReadMore = () => setPageIndex(pageIndex + 1);

    useEffect(() => {

        Promise.resolve(getMoreArticles(pageIndex)).then(function (data) {
            setPageResults(data.data);
        })
    }, [pageIndex]);

    async function getMoreArticles(pageIndex) {
        return await ContentService.GetGuideItems(categoryId, 1, pageLimit * pageIndex)
    }

    return (
        <>
            <PageBanner className="page-banner--news" image={`${process.env.NEXT_PUBLIC_CDN}/website/news/page-banner--blog.png`} trustPilot={true}>
                <div className="row">
                    <div className="col-24 py-md-5">
                        <h1 className="text-white"><strong>{categoryName}</strong></h1>
                        <h2 className="text-white mb-3 mb-md-5">Find out everything you need to know about vehicle leasing in our simple, hassle-free guides.</h2>
                        <PageBannerSearchGuides categoryId={categoryId} categoryList={categoryList} />
                    </div>
                </div>
            </PageBanner>
            <section className="container-fluid py-3 py-md-4 pb-md-5 bg-light-grey">
                <div className="row mb-md-4">
                    <div className="col-24 col-lg-6 d-flex">
                        <AsideGuides selectedCategory={categoryId} categoryList={categoryList} popular={true} popularGuides={popularGuides} />
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

AdviceCategory.layout = MainLayout;