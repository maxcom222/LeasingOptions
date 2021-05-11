import React from 'react';
import CardNews from '../../../components/card/card-news';
import style from './page-related.module.scss';

export default function PageRelated({ relatedNews }) {
    return (
        <div className={`container-fluid ${style['related']} py-3 py-md-5 d-none d-md-block`}>
            <div className="row">
                <div className="col-12">
                    <h3 className="mb-3 mb-md-5">Related Posts</h3>
                </div>
            </div>
            <div className="row">
                {relatedNews.map(article => (
                    <div key={article.id} className="col-24 col-md-12 col-lg-6 d-flex">
                        <CardNews condensed={true} id={`article-${article.id}`} image={article.imageUrl} tag={article.type} link={article.url} title={article.title} date={article.onDate} excerpt={article.description} />
                    </div>
                ))}
            </div>
        </div>
    )
}