import React from 'react';
import { useFormContext } from "react-hook-form";
import style from './privacy-policy-consent.module.scss';

import { hasPrivacyAccepted } from 'helpers/cookiesHelper';

type Props = {
}

const PrivacyPolicyConsent: React.FC<Props> = ({ }) => {
    //Used to share "privacyConfirmed" field with parent form and use same validation
    const formContext = useFormContext();

    const isRequired = !hasPrivacyAccepted();

    if (isRequired) {
        return (
            <div className="form-group">
                <div className={`form-check form-check-inline ${style["privacy-agreement"]}`}>
                    <input type="checkbox" className="form-check-input" id="privacyConfirmed" name="privacyConfirmed" ref={formContext.register({
                        validate: (value) => value === true || "Confirm is required."
                    })} />
                    <label htmlFor="privacyConfirmed" className={formContext.errors.privacyConfirmed ? style["invalid-feedback"] : null}>I confirm that I have read the Leasing Options Privacy Policy and that I understand the ways in which Leasing Options will use my personal data.</label>
                </div>
                {formContext.errors.privacyConfirmed && <span className="invalid-feedback d-block">{formContext.errors.privacyConfirmed?.message}</span>}
            </div>
        );
    }

    return null;
}

export default PrivacyPolicyConsent;