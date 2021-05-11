import React, { useState } from 'react';
import MainLayout from 'components/layout/main-layout';
import CareerBox from 'components/layout/career-box';
import MetaHead from '../components/seo/meta';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcase } from "@fortawesome/pro-light-svg-icons";
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { getBaseUrl } from 'helpers/urlsHelper';

const salesAdverts = [
   
];
const pricingAdverts = [
    {
        title: 'Junior Pricing Analyst',
        description: '<p><b>Job Description: Junior Pricing Analyst </b></p><br /><p><b>Reporting to: Pricing Manager</b></p><br /><p><b>The Role</b></p><p>We have the opportunity for an energetic - enthusiastic and car mad individual to join our ever expanding business.</p><p><br />Day to day responsibilities will include ensuring vehicle pricing on the Leasing Options website is accurate and displays the best available deal for potential customers. You will provide support to the sales team to achieve key business goals. This needs to be delivered along side accurate internal communication of information to relevant colleagues and ensure parity with the strategy of Leasing Options and key objectives with primary funders.</p><p><br />A strong knowledge and interest in cars and differing makes and models is essential.</p><p><br />Working in the busy and fast moving pricing department, the successful candidate will be responsible for supporting the team as they review and develop pricing strategies to meet competitive opportunities. You will be developed so that you can liaise with external partners in order to secure strong offers for our website.</p><p><br />A desire to learn, enthusiasm analytical skills, attention to detail and self-motivation are essential to this role. </p><p><br />Computer literacy and a comprehensive knowledge of Microsoft Excel are fundamental as the role involves working with spreadsheets, complex intranet systems and other software programmes including Microsoft Word and Photoshop.</p><p><br />This is the ideal opportunity for someone who wants to engage in the world of cars and finance in an office based position, an ideal job to begin a career which can develop. Many members of our pricing team go on to develop other roles in the business from Sales to Analyst to Marketing.</p><br /><p><b>Key Responsibilities</b></p><ul className="list-styled"><li>To achieve Key Performance Indicators as set by management</li><li>Support the sales team achieve key business goals</li><li>Upload of files to Leasing Options internal system</li><li>Ensuring all pricing and deal opportunities are followed up and marketed in a timely manner</li><li>Monitoring of competitor pricing</li><li>Finding deals through analysis of spreadsheets, funder systems and discount levels</li><li>Communication of new deals with marketing and sales team</li><li>Deal with queries from sales team regarding location of pricing</li><li>Production of spreadsheet for marketing purposes for other Leasing Options brands</li><li>Supporting the marketing department with relevant information on current prices</li><li>Managing stock on vehicles Leasing Options have purchased</li></ul><br /><b>Essential Skills</b><ul className="list-styled"><li>Must be organised</li><li>Good mathematical skills</li><li>Good attention to detail</li><li>Enthusiasm</li><li>Knowledge of cars</li></ul><br /><b>Key Skills</b><ul className="list-styled"><li>Friendly &amp; approachable manner</li><li>Ability to analyse data</li><li>Motivated when required to work alone</li><li>Computer literate</li></ul><br />To apply please send your CV to careers@leasingoptions.co.uk'
    }
]
const itAdverts = [
    {
        title: 'C# Backend Developer',
        description: '<p>We’re currently expanding our development team and are looking for an experienced .NET developer who will be involved in both maintaining existing applications, and the development of new Greenfield projects. You will work across the full development lifecycle from conception, development, testing and release. You will have been working on .NET applications for a number of years and have a solid understanding of C# and MVC. You will be expected to work in both a team and under your own initiative at times. <p> We’re currently in the process of converting all our MVC applications to API’s with React front ends and moving the back end infrastructure into the AWS Cloud (using .NET Core running on AWS Lambda), so any AWS/React knowledge would be desirable. </p><b>Essential skills </b><ul><li>Strong C# MVC Experience</li> <li>Strong MS-SQL Experience</li> <li> HTML, CSS and JavaScript </li> <li>GIT</li></ul> <br> <b>Desirable skills</b> <ul><li>.NET Core</li> <li>AWS Cloud</li> <li>React JS (or other JS frameworks)</li><li>MS-SQL</li><li>HTML + CSS</li> <li> CI/CD Experience</li></ul> </p><p>The role comprises some onsite work (usually 2 days a week) and the remaining time from home. We’re based only a few minutes away from Walkden Train Station so is easily accessible by public transport, and for those that drive then there is free on-site parking available. We offer flexible working times around start/finish times and we will provide the appropriate training where necessary. If you’re a person who enjoys tackling technical problems and is motivated to constantly improve processes and enhance applications, then we would love to speak with you. <p>If you would like to be considered for this role, then please send your CV today to ben@leasingoptions.co.uk.'
    }
]

export default function Careers () {
    const [salesToggle, setSalesToggle] = useState(false);
    const [pricingToggle, setPricingToggle] = useState(false);
    const [itdeptToggle, setItDeptToggle] = useState(false);
    const handleContentToggle = (id) => {
        if(id === 1) {
            setSalesToggle(!salesToggle);
            setPricingToggle(false);
            setItDeptToggle(false);
        } else if(id === 2) {
            setSalesToggle(false);
            setPricingToggle(!pricingToggle);
            setItDeptToggle(false);
        } else if(id === 3) {
            setSalesToggle(false);
            setPricingToggle(false);
            setItDeptToggle(!itdeptToggle);
        }
    }
    return (
        <>
            <MetaHead>
                <title>Car Leasing Industry Career Opportunities | Jobs at Leasing Options</title>
                <meta name="description" content="Looking for a career in Car Leasing? Find out more about a career with Leasing Options, an established market leader in the Leasing Industry." />
                <meta name="keywords" content="Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire" />
                <link rel="canonical" href={GetCanonicalUrl(`/careers`)} />
            </MetaHead>
            
            <section className="container-fluid py-3">
                <div className="container bg-white">
                    <div className="row">
                        <div className="col-24">
                            <h1><FontAwesomeIcon width="30" height="30" icon={faSuitcase} className="fill-mint" /> Looking for a career in car leasing?</h1>
                            <p><strong>Then work for the market leader! Check our job board below for the latest positions available in the company:</strong></p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-24 col-md-8">
                            <CareerBox id={1} icon="sales.svg" category="Sales" adverts={salesAdverts} handleContentToggle={handleContentToggle} />
                        </div>
                        <div className="col-24 col-md-8">
                            <CareerBox id={2} icon="pricing.svg" category="Pricing" adverts={pricingAdverts} handleContentToggle={handleContentToggle} />
                        </div>
                        <div className="col-24 col-md-8">
                            <CareerBox id={3} icon="itdevelopment.svg" category="IT & Development" adverts={itAdverts} handleContentToggle={handleContentToggle} />
                        </div>
                    </div>
                    {salesAdverts.length > 0 && salesToggle &&
                        <div className="row bg-light-grey pt-3">
                            {salesAdverts.map((sales, index) => (
                                <div key={`sales-${index}`} className="col-24 mb-3">
                                    <div className="bg-white p-3">
                                        <div><strong>{sales.title}</strong></div>
                                        <hr />
                                        <div dangerouslySetInnerHTML={{__html: sales.description}}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    {pricingAdverts.length > 0 && pricingToggle &&
                        <div className="row bg-light-grey pt-3">
                            {pricingAdverts.map((pricing, index) => (
                                <div key={`pricing-${index}`} className="col-24 mb-3">
                                    <div className="bg-white p-3">
                                        <div><strong>{pricing.title}</strong></div>
                                        <hr />
                                        <div dangerouslySetInnerHTML={{__html: pricing.description}}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    {itAdverts.length > 0 && itdeptToggle &&
                        <div className="row bg-light-grey pt-3">
                            {itAdverts.map((it, index) => (
                                <div key={`it-${index}`} className="col-24 mb-3">
                                    <div className="bg-white p-3">
                                        <div><strong>{it.title}</strong></div>
                                        <hr />
                                        <div dangerouslySetInnerHTML={{__html: it.description}}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </section>
        </>
    )
}

Careers.layout = MainLayout;