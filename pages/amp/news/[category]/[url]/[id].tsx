import React from 'react';
import Link from 'next/link';
import MetaHead from '../../../../../components/seo/meta';
import AmpLayout from '../../../../../components/layout/amp-layout/amp-layout';
import wrapper from '../../../../../redux/store.tsx/store';
import { NewsService } from '../../../../../business-logic/newsService';
import moment from 'moment';
import { GetNonAmpCanonicalUrl } from '../../../../../helpers/urlHelper';
import { getBaseUrl } from '../../../../../helpers/urlsHelper';
import { MetaData } from '../../../../../types/infrastructure/MetaData';

export const getServerSideProps = wrapper.getServerSideProps(

    async (context) => {

        const newsId = context.query.id as string;
        const newsArticlePromise = await NewsService.GetNewsArticle(parseInt(newsId), true);

        const metaData: MetaData = {
            title: `${newsArticlePromise?.data?.metaTitle} | Leasing Options`,
            description: newsArticlePromise?.data?.metaDescription || null,
            canonicalUrl: GetNonAmpCanonicalUrl(getBaseUrl(context.req.url)),
            keywords: newsArticlePromise?.data?.keywords || null
        }

        return {
            props: {
                metaData: metaData,
                newsArticle: newsArticlePromise.data,
            }
        };
    }
)

export const config = { amp: true }

const AmpNewsPost = ({ metaData, newsArticle }) => {
    const cardImage = (newsArticle.imageUrl) ? process.env.NEXT_PUBLIC_CDN + newsArticle.imageUrl : process.env.NEXT_PUBLIC_CDN + "/fit-in/400x400/website/static/img-placeholder.jpg";
    const momentDate = moment(newsArticle.onDate, "YYYY-MM-DDTHH:mm");
    const formattedDate = momentDate.format("DD MMMM YYYY");

    return (
        <>
            <MetaHead>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet" />
                {metaData ?
                    (<>
                        <title>{metaData.title}</title>
                        <meta name="description" content={metaData.description} />
                        <meta name="keywords" content={metaData.keywords} />
                    </>) : null}

                {(metaData && metaData.canonicalUrl) ?
                    (<>
                        <link rel="canonical" href={metaData.canonicalUrl} />
                    </>) : null}

                {(metaData && metaData.ampHTML) ?
                    (<>
                        <link rel="amphtml" href={metaData.ampHTML} />
                    </>) : null}                    

                {(metaData && metaData.noIndex) ?
                    (<>
                        <meta name="robots" content="noindex,nofollow" />
                    </>) : null} 
                <style jsx global>{`.amp-content{max-width:100%;position:relative;margin:0 0 50px 0;padding:0 15px;font-size:16px;line-height:25px}.amp-content *{font-family:Poppins,sans-serif;color:#000}.amp-header{text-align:center}.amp-header amp-img,.amp-header img{max-width:100%;height:auto;margin:30px 70px}.amp-logo,.amp-logo img{border:none;max-width:100%;margin:0 auto;padding:0;background-color:transparent;border:0}.amp-nav{width:auto;list-style:none;padding:0;margin:0 auto}.amp-nav li{display:inline-block;margin:0 5px}.amp-content .amp-article h1{font-size:28px;font-weight:600}.amp-content .amp-article h2,.amp-content .amp-article h3,.amp-content .amp-article h4,.amp-content .amp-article h5{font-size:18px;font-weight:600}.amp-content .amp-article h6{font-size:16px;font-weight:600}.amp-content .amp-article amp-img,.amp-content .amp-article img{max-width:100%;height:auto;background-color:gray;border:1px solid #000}.amp-content .amp-article iframe{max-width:100%}.amp-article{width:100%;position:relative;padding:15px 0}.amp-article amp-iframe,.amp-article amp-img,.amp-article img{max-width:100%;margin:0 auto}.amp-text{width:100%;position:relative}.amp-footer{width:100%;position:relative;padding:15px 0;text-align:center}`}</style>
                {/*TODO: styles\scripts needs to be rendered here but don't know what exactly is returned form the service*/}
            </MetaHead>
            <AmpLayout image={cardImage} title={newsArticle.title} date={formattedDate} text={newsArticle.newsText} more={<Link passHref href="/news"><a>Read more news stories</a></Link>} />
        </>
    )
}

export default AmpNewsPost;