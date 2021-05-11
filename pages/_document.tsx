import Document, { Html, Head, Main, NextScript } from 'next/document'
import { useAmp } from 'next/amp';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head >
                    <link rel="preconnect" href="https://imagecdn.leasingoptions.co.uk" />
                    <link rel="preconnect" href="http://cdn.doofinder.com" />
                    <link rel="preconnect" href="https://www.googletagmanager.com" />
              
                    <link rel="preload" href="/fonts/OpenSans-Regular.woff2" as="font" crossOrigin="" />
                    <link rel="preload" href="/fonts/Roboto-Regular.woff2" as="font" crossOrigin="" />

                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <NoScripts />
                </body>
            </Html>
        )
    }
}

export default MyDocument

const NoScripts = () => {
    return (
        <>
            {!useAmp() &&
                <>
                {process.env.NEXT_PUBLIC_TAGMANAGER_ENABLED &&
                    <noscript>
                        <iframe data-src="https://www.googletagmanager.com/ns.html?id=GTM-PG5CHN" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
                    </noscript>
                }
                    <noscript>
                        <img height="1" width="1" style={{ display: 'none', visibility: 'hidden' }} src="https://www.facebook.com/tr?id=983475765030281&ev=PageView&noscript=1" />
                    </noscript>
                </>
            }
        </>
    )
};