import "../sass/styles.scss";
import "lazysizes";
import 'lazysizes/plugins/attrchange/ls.attrchange'; // do we need?
import { AppProps } from "next/app";
import ModalProvider from "../components/HOCs/modal/modalProvider";
import ModalRoot from "../components/HOCs/modal/modalRoot";
import { wrapper } from "redux/store.tsx/store";
import { useRouter, Router } from 'next/router';
import React, { useEffect } from "react";
import { initGA,logPageView } from "helpers/analytics";
import Ouibounce from "../components/ouibounce"

const isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;

const MyApp = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();
  
    Router.events.on('routeChangeComplete', () => {
        logPageView();
    }); 

    useEffect(() => {  

        // @ts-ignore
        if (!window.GA_INITIALIZED) {
            initGA()
            // @ts-ignore
            window.GA_INITIALIZED = true
        }
        
        if (!router.asPath.includes('?') || (router.asPath.includes('?') && !isEmpty(router.query))) {
            logPageView()
        }
    }, []);
      
   // @ts-ignore */
    if (Component.layout) {
     
        return (
            <>
                <Ouibounce />

                <ModalProvider>
                    {/* 
                    // @ts-ignore */}
                    <Component.layout metaData={pageProps?.metaData}>
                        <Component {...pageProps} />
                        {/* 
                        // @ts-ignore */}
                    </Component.layout>
                    <ModalRoot />
                </ModalProvider>
            </>
        );
    }

    
    return (
        <ModalProvider>
            <Component {...pageProps} />
            <ModalRoot />
        </ModalProvider>
    );
};

export default wrapper.withRedux(MyApp);