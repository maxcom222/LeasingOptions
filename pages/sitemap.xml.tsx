import React from "react";
import { SitemapPageIndexItem } from "types/SitemapPageIndexItem";
import { getSitemapXMLPage } from "business-logic/sitemapService";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
    
    if (!req || !res) {
        return {
          props: {},
        };
    }

    const items:Array<SitemapPageIndexItem> = await getSitemapXMLPage();
    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    res.write(sitemap(items));
    res.end();
}

const sitemap = (items) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <?xml-stylesheet type="text/xsl" href="sitemap.xsl"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${items.map(function(item){  
            return `
                <sitemap>
                    <loc>${`${item.url}`}</loc>
                    <lastmod>${`${item.modifiedOn}`}</lastmod>                            
                </sitemap> 
            `
        })}
    </sitemapindex>`
}

export default sitemap;