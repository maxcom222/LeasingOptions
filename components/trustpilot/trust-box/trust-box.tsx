import React, { useState, useEffect } from 'react';
import style from './trust-box.module.scss';
import TrustCard from '../trust-card';
import { TrustWidgetTypes } from 'enums/TrustWidgetTypes';
import { formatNumber } from 'helpers/currencyHelper';
import Masonry from 'react-masonry-css';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        trustPilotRating: state.trustPilotRating,
    };
}

type Props = {
    trustPilotRating: any;
}

const TrustBox: React.FC<Props> = ({trustPilotRating}) => {
    const breakpointColumns = {
        default: 4,
        1200: 4,
        1024: 3,
        480: 1
    };
    
    return (
        <div className={`trust-box ${style['trust-box']}`}>
            <div className={style['trust-box__logo']}>Excellent <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/trustpilot-5stars.svg`} className="img-fluid lazyload" alt="Trustpilot logo" /></div>
            <div className={style['trust-box__rating']}>Rated <strong> {trustPilotRating?.score} </strong> out of 5 based on <a target="_blank" href="https://uk.trustpilot.com/review/leasingoptions.co.uk?utm_medium=trustbox&amp;utm_source=Box"><strong> {formatNumber(trustPilotRating?.reviewsCount)} reviews </strong></a> on <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/trustpilot-logo-star.svg`} className="img-fluid lazyload" alt="Trustpilot logo" /></div>
            <Masonry breakpointCols={breakpointColumns} className={style['trust-box__reviews']} columnClassName={style['trust-box__review']}>
                <TrustCard type={TrustWidgetTypes.Box} rating={5} date="" header="After being let down by another leasing" text="After being let down by another leasing company, leasing options was Recommend to me after explaining my situation,Cass was very helpful and worked on finding me the right car at within my budget. Great communication great friendly service will be using again and again thank you !!" name="John" url="https://uk.trustpilot.com/reviews/5f45598802e85708c8d8b23b?utm_medium=trustbox&utm_source=Box" />
                <TrustCard type={TrustWidgetTypes.Box} rating={5} date="" header="Returning Customer!" text="Returning Customer! Again, another easy, simple service by provided Cass" name="Anthony Pinnell" url="https://uk.trustpilot.com/reviews/5f45546e02e85708c8d8ae20?utm_medium=trustbox&utm_source=Box" />
                <TrustCard type={TrustWidgetTypes.Box} rating={5} date="" header="Brilliant Service" text="Sal helped us find our new car. He was at the end of the phone answering any queries. He also managed to save us quite a bit of money overall :) I have been mentioning yourselves and will continue to do so. Thank you for the brilliant help and support you provided throughout." name="Jeni Mason" url="https://uk.trustpilot.com/reviews/5f4542c102e8570814f8bba7?utm_medium=trustbox&utm_source=Box" />
                <TrustCard type={TrustWidgetTypes.Box} rating={5} date="" header="Excellent 5*" text="This has been my first time leasing a vehicle through Leasing Options and I'm more than happy with their service. Jenny and the team have not only been super efficient and knowledgeable but have also been very personable and friendly to deal with - nothing has been too much trouble for them! Best price around too! Highly recommended!" name="Lisa Marie Jones" url="https://uk.trustpilot.com/reviews/5f45005c02e8570814f87981?utm_medium=trustbox&utm_source=Box" />
                <TrustCard type={TrustWidgetTypes.Box} rating={5} date="" header="Leasing Options - Car Lease" text="Recently leased two Tesla cars through Leasing Options. Michelle was fantastic throughout the process and made every step easy. She kept me informed with phone calls and emails. I will definitely be using Leasing Options again." name="Glenn R" url="https://uk.trustpilot.com/reviews/5f44fb1102e8570814f87466?utm_medium=trustbox&utm_source=Box" />
                <TrustCard type={TrustWidgetTypes.Box} rating={5} date="" header="10/10 Excellent!!" text="Natalie was amazing, she found me a cat really efficiently and at a great price. She communicated throughout the whole transaction and provided me with a fabulous car!! Awesome service" name="Laura" url="https://uk.trustpilot.com/reviews/5f44e88402e85708c8d8453a?utm_medium=trustbox&utm_source=Box" />
                <TrustCard type={TrustWidgetTypes.Box} rating={5} date="" header="Really friendly and efficient service." text="Really friendly and efficient service. Lesley was incredibly helpful and prompt throughout. I was keen to use Leasing Options from the start, simply because they were the most proactive and helpful of the companies I went to for a quote. Luckily, they price matched the cheapest quote I received, making it an easy decision in the end. Would thoroughly recommend if you’re looking to lease a car." name="SteveC" url="https://uk.trustpilot.com/reviews/5f44d57502e8570814f850c1?utm_medium=trustbox&utm_source=Box" />
                <TrustCard type={TrustWidgetTypes.Box} rating={5} date="" header="First time I've leased .Jake was very" text="First time I've leased .Jake was very helpful and went through it step by step very clearly and explained everything very well .and I've been in touch a couple of times since ordering and he has been nothing but helpful..would recommend leasing options to a friend without hesitation" name="Chris Lister" url="https://uk.trustpilot.com/reviews/5f44d24f02e8570814f84dd0?utm_medium=trustbox&utm_source=Box" />
                <TrustCard type={TrustWidgetTypes.Box} rating={5} date="" header="This is my 2nd time leasing from" text="This is my 2nd time leasing from Leasing Options and they have been fantastic throughout. The aftercare is brilliant and I cant rate them enough! :) Cass has both times made sure everything ran smoothly and stress free." name="K.Man" url="https://uk.trustpilot.com/reviews/5f44a04502e8570814f831db?utm_medium=trustbox&utm_source=Box" />
                <TrustCard type={TrustWidgetTypes.Box} rating={5} date="" header="Rachael was friendly" text="Rachael was friendly, efficient and a pleasure to deal with. She explained everything thoroughly and made the whole process very straight forward and stress free." name="Hazel Parmenter" url="https://uk.trustpilot.com/reviews/5f43b22302e8570814f7ae0b?utm_medium=trustbox&utm_source=Box" />
                <TrustCard type={TrustWidgetTypes.Box} rating={5} date="" header="Fantastic customer service" text="Rachael Shaw handled my application and was fantastic. I was so impressed I wrote a letter of commendation. We did have some delays with the lender “Lex” which Rachael chased up leaving me to get on with my own business. The price was great as they matched a better deal. Cannot recommend more." name="Mark  Barnett" url="https://uk.trustpilot.com/reviews/5f43803602e8570814f7824b?utm_medium=trustbox&utm_source=Box" />
                <TrustCard type={TrustWidgetTypes.Box} rating={5} date="" header="Leasing Options Review" text="I dealt with Luke at Leasing Options. Brilliant service and I will definitely be recommending them to friends and family. Easy to deal with and very professional." name="Harry" url="https://uk.trustpilot.com/reviews/5f40c09702e85708c8d64bd3?utm_medium=trustbox&utm_source=Box" />
                <TrustCard type={TrustWidgetTypes.Box} rating={5} date="" header="Thanks Andy" text="Andy Cliffe has just processed my second order and, as before, he has been a pleasure to deal with." name="Geoff Ralph" url="https://uk.trustpilot.com/reviews/5f40b9ce02e8570814f668f8?utm_medium=trustbox&utm_source=Box" />
                <TrustCard type={TrustWidgetTypes.Box} rating={5} date="" header="Cass Tynan handled my order.  She was capable and very professional throughout. Cass was also very responsive to any questions and quick to call back at all times." text="Cass Tynan handled my order. She was capable and very professional throughout. Cass was also very responsive to any questions and quick to call back at all times." name="Shannon Riley-Gregson" url="https://uk.trustpilot.com/reviews/5f3fe21902e85708c8d5e5a6?utm_medium=trustbox&utm_source=Box" />
                <TrustCard type={TrustWidgetTypes.Box} rating={5} date="" header="Yet another vehicle I have leased via" text="Yet another vehicle I have leased via Leasing Options, This Will be my 5th, I have leased both personal and business with leasing options, Rob Ingham Has been a pleasure to deal with, always on hand with any information I have needed and will do his best to find the best deal for you and your needs. Cannot recommend Rob or Leasing Options enough - my go to for any new vehicle 👍🏻 Keep up the good work guys 👍🏻" name="Dan Mortlock" url="https://uk.trustpilot.com/reviews/5f3fd97d02e85708c8d5dcfe?utm_medium=trustbox&utm_source=Box" />

                <TrustCard type={TrustWidgetTypes.Box} rating={5} date="" header="Great service and communication from start to finish" text="Great service and communication from Sal and the team. Driving my new vehicle in next to no time with no hiccups. Recommended." name="John Freed" url="https://uk.trustpilot.com/reviews/5f3fd5df02e8570814f5f8fd?utm_medium=trustbox&utm_source=Box" />
                <TrustCard type={TrustWidgetTypes.Box} rating={5} date="" header="Excellent service by Sal" text="Excellent service by Sal and Louise, especially during these unprecedented times. Sal found me the perfect bmw lease car at an unbeatable price. The continued service and after care has been exceptional and Sal ensured i was satisfied. I highly recommend people speak to Sal for the future lease car and you will not be dissapointed. I will definitely be coming back when my lease ends. Massive thank you Sal, your a great asset to Leasing Options." name="Aftab Ahmed" url="https://uk.trustpilot.com/reviews/5f3fd52302e85708c8d5d858?utm_medium=trustbox&utm_source=Box" />
                <TrustCard type={TrustWidgetTypes.Box} rating={5} date="" header="Highly recommended" text="Great service from Sal and Louise from start to finish. Kept me updated with progress of my order during a difficult time, very easy to deal with and quick responses to any enquiries even after delivery. Fantastic team" name="Gary" url="https://uk.trustpilot.com/reviews/5f3fbf5802e8570814f5e478?utm_medium=trustbox&utm_source=Box" />
                <TrustCard type={TrustWidgetTypes.Box} rating={5} date="" header="Great service and communication from" text="Great service and communication from start to finish. I spoke with many employees including Ashley the team leader and they were all superb. I recommend this company." name="J G Hales" url="https://uk.trustpilot.com/reviews/5f3f9c5a02e85708c8d5a5b9?utm_medium=trustbox&utm_source=Box" />
                <TrustCard type={TrustWidgetTypes.Box} rating={5} date="" header="Salavatore did a great job of finding Me the perfect day, would definitely recommend him and the company" text="Salavatore did a great job of finding Me the perfect day, would definitely recommend him and the company" name="Mrs Cardall" url="https://uk.trustpilot.com/reviews/5f3fae2f02e85708c8d5b55b?utm_medium=trustbox&utm_source=Box" />
            </Masonry>
        </div>
    )
}


export default connect(mapStateToProps)(TrustBox);
