import React from 'react';
import MainLayout from 'components/layout/main-layout';

export default function DoofinderTest () {

    return (        
        <section className="container-fluid py-3">
            <div className="container bg-white">
                <div className="row">
                    <div className="col-24">
                        <h1>Doofinder Test</h1>
                    </div>
                </div>
            </div>
        </section>
    );
}

DoofinderTest.layout = MainLayout;