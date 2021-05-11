import React from 'react';
import Head from "next/head";

const MetaHead = ({ children }) => {
    return (
        <Head>
            {children}
        </Head>
    )
};

export default MetaHead;