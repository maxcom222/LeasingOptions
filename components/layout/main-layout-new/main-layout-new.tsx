import React, { ReactNode, useState, useEffect } from 'react';
import Head from "next/head";
import { useRouter, Router } from 'next/router';
import Breadcrumbs from '../breadcrumbs';
import Footer from '../footer-new';
import ToTop from '../to-top/to-top';
import CookieBar from '../../cookie-bar/cookie-bar';
import PageOverlay from 'components/page-overlay/page-overlay';
import { MetaData } from 'types/infrastructure/MetaData';
import { GetBreadcrumbsSchema, GetSerializedSchema } from 'helpers/schemaHelper';
import LiveChat from "../../live-chat";
import { isWithinLeaseBotHours } from "../../leasebot/helper";
import { TrustThemeTypes } from 'enums/TrustThemeTypes';
import { AuthenticationService } from "business-logic/authenticationService";
import { connect } from 'react-redux';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { VehicleTypes } from 'enums/VehicleTypes';
import LeaseBotIcon from 'components/leasebot/leaseBotIcon';
import DynamicTrustMicroComponent from 'components/trustpilot/trust-micro/DynamicTrustMicroComponent';
import { getBreadcrumbs } from 'helpers/breadcrumbsHelper';
import Header from '../header-new';
import { GetTrustPilotRating } from 'business-logic/systemService';

type Props = {
    vehiclePreference: VehicleTypes,
    dealSelector: LeasingDealTypes,
    isInternal: boolean;
    dispatchInternalCheck: any;
    metaData?: MetaData;
    children: ReactNode;
    className?: string;
    trustPilotRating: any,
    updateTrustPilotRating: any,
}

const MainLayout: React.FC<Props> = ({ vehiclePreference, dealSelector, isInternal, dispatchInternalCheck, metaData,  children, className, trustPilotRating, updateTrustPilotRating }) => {
    const overlapRoutes = ["/", "/beta", "/car-leasing", "/business-car-leasing", "/van-leasing", "/news", "/news/[category]", "/advice", "/advice/[category]", "/value-your-car", "/car-leasing-with-insurance/[postcode]/search", "/car-leasing-with-insurance/[postcode]/[make]", "/car-leasing-with-insurance/[postcode]/[make]/[shortModel]", "/price-promise", "/our-story/30th-birthday", "/short-term-car-leasing", "/short-term-van-leasing", "/electric-hybrid-car-leasing", "/electric-hybrid-car-leasing/types", "/hydrogen-car-leasing", "/electric-hybrid-car-leasing/government-grants", "/electric-hybrid-car-leasing/charging"];
    const router = useRouter();
    const expiryDate = new Date();
          expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    //TODO: initial false value cuses issues with current logic. Needs to be checked
    const [overlap, setOverlap] = useState(true);

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
        if (overlapRoutes.includes(router.pathname.replace("/internal", ""))) {
            setOverlap(true);
        } else {
            setOverlap(false);
        }
    }, [router.pathname]);

    useEffect(() => {
        // Check for internal user on first pageload
        checkInternalIp();

        // Check truspilot rating
        checkTrustpilot();

        // Check on first route change
        Router.events.on('routeChangeComplete', () => {
            // Check for internal user on first pageload
            checkInternalIp();

            // Check truspilot rating
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
        repeatedFunc();
        const interval = setInterval(repeatedFunc, 30000);
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

    useEffect(() => {
        const productGroup = dealSelector === LeasingDealTypes.Personal ? "PCH" : "CH";

        //@ts-ignore doofinder and dfClassicLayers are not declared
        if (dfClassicLayers?.length > 0) {
            updatePriceGroup(productGroup, true);
        }

    }, [dealSelector]);

    useEffect(() => {
        let vehicleType = '';

        if(vehiclePreference === VehicleTypes.Commercial) {
            vehicleType = "Van";
        } else {
            vehicleType = "Car";
        }

        updateVehicleType(vehicleType, true);

    }, [vehiclePreference]);

    const updatePriceGroup = (priceGroup, shouldRefresh) => {
        //@ts-ignore doofinder and dfClassicLayers are not declared
        if (dfClassicLayers?.length > 0) {
           
            //@ts-ignore dfClassicLayers is not declared
            var instance = dfClassicLayers[0];

            if (instance.layer) {
                instance.layer.config.searchParams.filter.product = priceGroup;
                instance.layerOptions.searchParams.filter.product = priceGroup;
                instance.layer.controller.defaults.filter.product = priceGroup;
                instance.layer.controller.params.filter.product = priceGroup;

                if (shouldRefresh && instance.layer.isVisible()) {
                    instance.layer.controller.refresh();
                }
            }          
        }
    }

    const updateVehicleType = (vehicleType, shouldRefresh) => {
        //@ts-ignore doofinder and dfClassicLayers are not declared
        if (dfClassicLayers?.length > 0) {
           
            //@ts-ignore dfClassicLayers is not declared
            var instance = dfClassicLayers[0];

            if (instance.layer) {
                instance.layer.config.searchParams.filter.vehicle_type = vehicleType;
                instance.layer.controller.defaults.filter.vehicle_type = vehicleType;
                instance.layer.controller.params.filter.vehicle_type = vehicleType;
                instance.layerOptions.searchParams.filter.vehicle_type = vehicleType;

                if (shouldRefresh && instance.layer.isVisible()) {
                    instance.layer.controller.refresh();
                }
            }
        }
    }

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.png" type="image/x-icon" />
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

                <script type="application/javascript" dangerouslySetInnerHTML={
                    {
                        __html: `var doofinder_script ='//cdn.doofinder.com/media/js/doofinder-classic.7.latest.min.js';(function(d,t){var f=d.createElement(t),s=d.getElementsByTagName(t)[0];f.async=1;f.src=('https:'==location.protocol?'https:':'http:')+doofinder_script;f.setAttribute('charset','utf-8');s.parentNode.insertBefore(f,s)}(document,'script'));
                        
                        var dfClassicLayers = [{
                            "queryInput": 'input[type="search"]',
                            "hashid": 'bae5d6b5b54adbbd5af90c64bfaa0bc4',
                            "zone": "eu1",
                            "display": {
                                "lang": 'en',
                                "width": "80%",
                                "align": "center",
                                closeOnHit: true
                            },
                            "searchParams": {
                                transformer: null,
                                filter: {
                                    product: "PCH",
                                    vehicle_type: "Car"
                                },
                                query_name: "match_and"
                            },
                        }];`,
                    }
                }>
                </script>
            </Head>

            <Header /> 
            <Breadcrumbs
                breadcrumbs={breadcrumbs}
            />
            <main className={className}>{children}</main>
            <Footer />
            <ToTop />
            <CookieBar />
            <PageOverlay />
            <LeaseBotIcon/>     
            <LiveChat />
        </>
    );
};

const mapStateToProps = (state) => ({
    vehiclePreference: state.vehiclePreference,
    dealSelector: state.dealSelector,
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