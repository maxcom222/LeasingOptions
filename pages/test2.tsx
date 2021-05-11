import React from 'react';
import wrapper from 'redux/store.tsx/store';
import MainLayout from '../components/layout/main-layout';
import MetaHead from 'components/seo/meta';

export const getServerSideProps = wrapper.getServerSideProps(
 async (context) => {
   
        return {
            props: {
               
            }
        };
    }
);
const test2 = () => {
   
    return (
        <>
            <MetaHead>
                <meta name="robots" content="noindex" />
            </MetaHead>
            <p>Test</p>
        </>
    )
}

test2.layout = MainLayout;

export default test2;