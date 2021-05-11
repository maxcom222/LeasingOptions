import React from 'react';
import Link from 'next/link';
import MainLayout from '../components/layout/main-layout';
import MetaHead from '../components/seo/meta';

export default function Custom404() {
    return (
        <>
            <MetaHead>
                <title>404 - Page not found</title>
            </MetaHead>
            <div className="container-fluid py-3 py-md-5">
                <div className="row">
                    <div className="col-24 d-flex flex-column align-items-center justify-content-center">
                        <h1>404 - Page not found</h1>
                        <p className="my-4">The page you were looking for doesn't exist. You may have mistyped the address or the page may have moved.</p>
                        <button className="btn btn-primary btn-lg"><Link passHref href="/"><a className="text-decoration-none">Back to Home Page</a></Link></button>
                    </div>
                </div>
            </div>
        </>
    )
}

Custom404.layout = MainLayout;