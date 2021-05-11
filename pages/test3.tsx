import React from 'react';
import MainLayout from '../components/layout/main-layout';
import MetaHead from 'components/seo/meta';

const test3 = () => {
   
    return (
        <>
            <MetaHead>
                <meta name="robots" content="noindex" />
            </MetaHead>
            <p>Test</p>
        </>
    )
}

test3.layout = MainLayout;

export default test3;