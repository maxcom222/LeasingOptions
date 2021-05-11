import React, { useState, useEffect } from 'react';
import { useFormContext } from "react-hook-form";
import Link from 'next/link';
import style from './marketing-consent.module.scss';

import { EmailAddressIsValid } from 'helpers/validation';
import { MarketingCommunicationsService } from 'business-logic/marketingCommunicationsService';
import { GetPhoneNumber } from 'helpers/helpers';
import { connect } from 'react-redux';

type Props = {
    isInternal: boolean;
    emailAddress: string | null;
    settings: {
        onVerificationStart: any;
        onVerificationComplete: any;
    };
}

const MarketingConsent: React.FC<Props> = ({ isInternal, emailAddress, settings }) => {
    //Used to share "privacyConfirmed" field with parent form and use same validation
    const formContext = useFormContext();

    //Set only when email address is present and marketing consent wasn't accepted earlier
    const [isRequired, setIsRequired] = useState<boolean | any>(false);

    //Should trigger only when email address is changed
    useEffect(() => {
        //do we need timeout here?
        if (settings.onVerificationStart) {
            settings.onVerificationStart();
        }

        if (emailAddress && EmailAddressIsValid(emailAddress)) {
            MarketingCommunicationsService.HasSeenMarketingForm(emailAddress).then(result => {
                setIsRequired(!result);
                if (settings.onVerificationComplete) {
                    settings.onVerificationComplete();
                }
            });
        }
        else {
            setIsRequired(false);
            if (settings.onVerificationComplete) {
                settings.onVerificationComplete();
            }
        }
    }, [emailAddress]);

    //TODO: check if phone number should be dynamic here?
    if (isRequired) {
        return (
            <div className="form-group">
                <div className={style['marketing']}>
                    <h4>Marketing Communications</h4>
                    <p className="mb-4">We would love to keep you updated with our latest special offers, car news and exclusive benefits just for Leasing Options customers. Please let us know how you'd like us to contact you:</p>
                    <div className={`${style["checkboxes"]} mb-4`}>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" name="allowedCommunicationTypes" value={1} id="contactEmail" ref={formContext.register} />
                            <label className="form-check-label mb-0" htmlFor="contactEmail">Email</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" name="allowedCommunicationTypes" value={2} id="contactPost" ref={formContext.register} />
                            <label className="form-check-label mb-0" htmlFor="contactPost">Post</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" name="allowedCommunicationTypes" value={3} id="contactSms" ref={formContext.register} />
                            <label className="form-check-label mb-0" htmlFor="contactSms">SMS</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" name="allowedCommunicationTypes" value={4} id="contactPhone" ref={formContext.register} />
                            <label className="form-check-label mb-0" htmlFor="contactPhone">Telephone</label>
                        </div>
                    </div>
                    <p className="mb-4">
                        Your personal information will not be shared with any third party companies. For more information, please read our Privacy Policy <Link href="/privacy-policy"><a>here</a></Link> for further details.
                        You can unsubscribe from marketing communications at any time by contacting us on <strong><span className="phonenumber_call_now">{GetPhoneNumber(isInternal)}</span></strong> or via Email at <a href="mailto:marketing@leasingoptions.co.uk">marketing@leasingoptions.co.uk</a>
                    </p>
                </div>
            </div>
        );
    }

    return null;
}

const mapStateToProps = (state) => ({
    isInternal: state.isInternal
});

export default connect(mapStateToProps)(MarketingConsent);