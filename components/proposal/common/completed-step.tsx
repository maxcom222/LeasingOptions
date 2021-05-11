import React from 'react';
import Link from 'next/link';

const CompletedStep = (props) => {

    return (
        <div className="w-100 bg-white p-3 p-md-5 text-center">
            <h2 className="mb-5">Your application is being processed</h2>
            <div>
                <img src="https://imagecdn.leasingoptions.co.uk/website/static/finance-application-complete.jpg" />
            </div>
            <div>
                <h3 className="my-4">Your finance application has been successfully submitted and we will be in touch shortly.</h3>
                <Link href="/"><a className="btn btn-primary btn-lg mt-4">Back to Home Page</a></Link>
            </div>
        </div>
    )
}

export default CompletedStep