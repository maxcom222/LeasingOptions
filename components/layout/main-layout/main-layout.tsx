import React, { ReactNode, useState, useEffect } from 'react';
import Head from "next/head";
import { useRouter, Router } from 'next/router'
import Breadcrumbs from '../breadcrumbs';
import PageOverlay from 'components/page-overlay/page-overlay';
import { MetaData } from 'types/infrastructure/MetaData';
import { BreadcrumbsItem } from 'types/infrastructure/BreadcrumbsItem';
import { GetBreadcrumbsSchema, GetSerializedSchema } from 'helpers/schemaHelper';
import LiveChat from "../../live-chat";
import { isWithinLeaseBotHours } from "../../leasebot/helper";
import { AuthenticationService } from "business-logic/authenticationService";
import { connect } from 'react-redux';
import { getBreadcrumbs } from "helpers/breadcrumbsHelper";
import Header from '../header';
import Footer from '../footer';
import TrustMicro from 'components/trustpilot/trust-micro';
import ToTop from '../to-top';
import CookieBar from '../../cookie-bar/cookie-bar';
import LeaseBotIcon from 'components/leasebot/leaseBotIcon';
import { GetTrustPilotRating } from 'business-logic/systemService';

type Props = {
    isInternal: boolean;
    dispatchInternalCheck: any;
    metaData?: MetaData;
    breadcrumbs?: BreadcrumbsItem[];
    children: ReactNode;
    className?: string;    
    trustPilotRating: any,
    updateTrustPilotRating: any,
}

const MainLayout: React.FC<Props> = ({ isInternal, dispatchInternalCheck, metaData, breadcrumbs, children, className, trustPilotRating, updateTrustPilotRating }) => {
    const router = useRouter();
    const expiryDate = new Date();
          expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    const repeatedFunc = () => {
        var liveChat = document.getElementById("liveChatLink");
        var chatWrapper = document.getElementById("chatwrapper");

        if (isWithinLeaseBotHours()) {
            if (process.env.NEXT_PUBLIC_IS_CHATBOT_ENABLED) {
                chatWrapper?.classList.remove("d-none");
            }
            liveChat?.classList.add("d-none");
        } else {
            chatWrapper?.classList.add("d-none");
            liveChat?.classList.remove("d-none");
        }
    };

    useEffect(() => {
        // Check for internal user on first pageload
        checkInternalIp();
        checkTrustpilot();
        // Check for internal user on first route change
        Router.events.on('routeChangeComplete', () => {
            checkInternalIp();
            checkTrustpilot();
        });
    }, []);

    const checkTrustpilot = () => {
        if (trustPilotRating == null) {
            GetTrustPilotRating().then(response => {
                updateTrustPilotRating(response.data);                 
            });
        }   
    };

    useEffect(() => {
        const interval = setInterval(repeatedFunc, 15000);
        return () => clearInterval(interval);
    }, []);

    function checkInternalIp() {
        if (isInternal === null) {
            AuthenticationService.IsInternalPage()
                .then(result => {
                    dispatchInternalCheck(result.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    var breadcrumbs = getBreadcrumbs(router);

    return (
        <>
            <Head>
                {metaData ?
                    (<>
                        <title>{metaData.title}</title>
                        <meta name="description" content={metaData.description} />
                        <meta name="keywords" content={metaData.keywords} />

                        {/* Open Graph / Facebook */}
                        <meta property="og:type" content="website" />
                        <meta property="og:url" content={process.env.NEXT_PUBLIC_CANONICALBASEURL + router.asPath} />
                        <meta property="og:title" content={metaData.title} />
                        <meta property="og:description" content={metaData.description} />
                        <meta property="og:image" content={metaData.imageUrl ? metaData.imageUrl : process.env.NEXT_PUBLIC_CDN + "/fit-in/400x400/website/static/img-placeholder.jpg"} />

                        {/* Twitter */}
                        <meta property="twitter:card" content="summary_large_image" />
                        <meta property="twitter:url" content={process.env.NEXT_PUBLIC_CANONICALBASEURL + router.asPath} />
                        <meta property="twitter:title" content={metaData.title} />
                        <meta property="twitter:description" content={metaData.description} />
                        <meta property="twitter:image" content={metaData.imageUrl ? metaData.imageUrl : process.env.NEXT_PUBLIC_CDN + "/fit-in/400x400/website/static/img-placeholder.jpg"} />
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

                {(metaData && metaData.author) ?
                    (<>
                        <meta name="author" content={metaData.author} />
                    </>) : null}

                {(breadcrumbs && breadcrumbs.length > 0) ? (<script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: GetSerializedSchema(GetBreadcrumbsSchema(breadcrumbs))
                }}></script>) : null}

                {process.env.NEXT_PUBLIC_TAGMANAGER_ENABLED == "true" &&
                    <script type="application/javascript" dangerouslySetInnerHTML={
                        {
                            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PG5CHN');`,
                        }
                    }>
                    </script>
                }
            </Head>

            <Header />
            <Breadcrumbs
                breadcrumbs={breadcrumbs}
            />
          
           
            <main className={className}>{children}</main>
            <Footer />
            <ToTop />
            <PageOverlay />
            <LeaseBotIcon/>     
            <LiveChat />
        </>
    );
};

const mapStateToProps = (state) => ({
    isInternal: state.isInternal,
    trustPilotRating: state.trustPilotRating,
});

const mapDispatchToProps = dispatch => {
    return {
        dispatchInternalCheck: (internal: boolean) => {
            dispatch({ type: "UPDATE_INTERNAL", internal: internal });
        },
        updateTrustPilotRating: (data) => {
            dispatch({ type: 'UPDATE_TRUSTPILOT_RATING', data: data });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);