import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/main-layout';
import MetaHead from '../components/seo/meta';
import ThankYouContent from '../components/thank-you/thank-you-content';

export default function ThankYou() {

    return (
        <>
            <MetaHead>
                <title>Thank you</title>
            </MetaHead>
            <ThankYouContent />
        </>
    )
}

ThankYou.layout = MainLayout;