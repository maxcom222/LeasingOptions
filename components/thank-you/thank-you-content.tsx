import TrustBox from '../trustpilot/trust-box';
import { useAmp } from 'next/amp';
import Link from 'next/link';

const ThankYouContent: React.FC = () => {

    return (
        <>
            <div className="container-fluid py-3 py-md-5">
                <div className="row">
                    <div className="col-24 d-flex flex-column align-items-center justify-content-center">
                        <h1>Thank You!</h1>
                        {useAmp() && <amp-img width="50" height="50" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/thanks.jpg`} className="my-4 lazyload" alt="Thanks image" ></amp-img>}
                        {!useAmp() && <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/thanks.jpg`} className="my-4 img-fluid lazyload" alt="Thanks image" />}
                        <p className="my-4">We have received your request and will be in touch shortly.</p>
                        <button className="btn btn-primary btn-lg"><Link passHref href="/"><a className="text-decoration-none">Back to Home Page</a></Link></button>
                    </div>
                </div>
            </div>
            <div className="container-fluid py-3 py-md-5 bg-light-grey">
                <div className="row">
                    <div className="col-24">
                        <h2 className="text-center">Our customers think we're fantastic and so will you</h2>
                        <TrustBox />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ThankYouContent