import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouter, Router } from 'next/router';
import { ProposalEnquirieService } from 'business-logic/proposalEnquirieService';

import { ProposalTypes } from 'enums/ProposalTypes';
import { ProposalDataHelper } from './helpers/ProposalDataHelper';
import { GetThankYouPageUrl } from 'helpers/urlHelper';
import dynamic from 'next/dynamic';

  const PersonalStepOne = dynamic(
    () => import('../../components/proposal/personal/personal-step-01'),
    { loading: () => <p>Loading...</p> }
  );
  const PersonalStepTwo = dynamic(
    () => import('../../components/proposal/personal/personal-step-02'),
    { loading: () => <p>Loading...</p> }
  );
  const PersonalStepThree = dynamic(
    () => import('../../components/proposal/personal/personal-step-03'),
    { loading: () => <p>Loading...</p> }
  );
  const PersonalStepFour = dynamic(
    () => import('../../components/proposal/personal/personal-step-04'),
    { loading: () => <p>Loading...</p> }
  );
  const PersonalStepFive = dynamic(
    () => import('../../components/proposal/personal/personal-step-05'),
    { loading: () => <p>Loading...</p> }
  );
  const PersonalStepSix = dynamic(
    () => import('../../components/proposal/personal/personal-step-06'),
    { loading: () => <p>Loading...</p> }
  );
  const PersonalStepSeven = dynamic(
    () => import('../../components/proposal/personal/personal-step-07'),
    { loading: () => <p>Loading...</p> }
  );
  const PersonalStepEight = dynamic(
    () => import('../../components/proposal/personal/personal-step-08'),
    { loading: () => <p>Loading...</p> }
  );
  const PersonalStepNine = dynamic(
    () => import('../../components/proposal/personal/personal-step-09'),
    { loading: () => <p>Loading...</p> }
  );
  const PersonalStepTen = dynamic(
    () => import('../../components/proposal/personal/personal-step-10'),
    { loading: () => <p>Loading...</p> }
  );

  const LimitedStepOne = dynamic(
    () => import('../../components/proposal/limited/ltd-step-01'),
    { loading: () => <p>Loading...</p> }
  );

  const LimitedStepTwo = dynamic(
    () => import('../../components/proposal/limited/ltd-step-02'),
    { loading: () => <p>Loading...</p> }
  );
  const LimitedStepThree = dynamic(
    () => import('../../components/proposal/limited/ltd-step-03'),
    { loading: () => <p>Loading...</p> }
  );

  const LimitedStepFour = dynamic(
    () => import('../../components/proposal/limited/ltd-step-04'),
    { loading: () => <p>Loading...</p> }
  );

  const LimitedStepFive = dynamic(
    () => import('../../components/proposal/limited/ltd-step-05'),
    { loading: () => <p>Loading...</p> }
  );

  const LimitedStepSix = dynamic(
    () => import('../../components/proposal/limited/ltd-step-06'),
    { loading: () => <p>Loading...</p> }
  );

  const LimitedStepSeven = dynamic(
    () => import('../../components/proposal/limited/ltd-step-07'),
    { loading: () => <p>Loading...</p> }
  );
  
  const PartnerStepOne = dynamic(
    () => import('../../components/proposal/partnership/partner-step-01'),
    { loading: () => <p>Loading...</p> }
  );

  const PartnerStepTwo = dynamic(
    () => import('../../components/proposal/partnership/partner-step-02'),
    { loading: () => <p>Loading...</p> }
  );

  const PartnerStepThree = dynamic(
    () => import('../../components/proposal/partnership/partner-step-03'),
    { loading: () => <p>Loading...</p> }
  );

  const PartnerStepFour = dynamic(
    () => import('../../components/proposal/partnership/partner-step-04'),
    { loading: () => <p>Loading...</p> }
  );

  const PartnerStepFive = dynamic(
    () => import('../../components/proposal/partnership/partner-step-05'),
    { loading: () => <p>Loading...</p> }
  );

  const PartnerStepSix = dynamic(
    () => import('../../components/proposal/partnership/partner-step-06'),
    { loading: () => <p>Loading...</p> }
  );

  const PartnerStepSeven = dynamic(
    () => import('../../components/proposal/partnership/partner-step-07'),
    { loading: () => <p>Loading...</p> }
  );

  const PartnerStepEight = dynamic(
    () => import('../../components/proposal/partnership/partner-step-08'),
    { loading: () => <p>Loading...</p> }
  );


  const SoleStepOne = dynamic(
    () => import('../../components/proposal/soletrader/sole-step-01'),
    { loading: () => <p>Loading...</p> }
  );
  const SoleStepTwo = dynamic(
    () => import('../../components/proposal/soletrader/sole-step-02'),
    { loading: () => <p>Loading...</p> }
  );
  const SoleStepThree = dynamic(
    () => import('../../components/proposal/soletrader/sole-step-03'),
    { loading: () => <p>Loading...</p> }
  );
  const SoleStepFour = dynamic(
    () => import('../../components/proposal/soletrader/sole-step-04'),
    { loading: () => <p>Loading...</p> }
  );
  const SoleStepFive = dynamic(
    () => import('../../components/proposal/soletrader/sole-step-05'),
    { loading: () => <p>Loading...</p> }
  );
  const SoleStepSix = dynamic(
    () => import('../../components/proposal/soletrader/sole-step-06'),
    { loading: () => <p>Loading...</p> }
  );
  const SoleStepSeven = dynamic(
    () => import('../../components/proposal/soletrader/sole-step-07'),
    { loading: () => <p>Loading...</p> }
  );


function mapStateToProps(state) {
    return {
        formData: state.formData,
        stepIndicator: state.stepIndicator
    };
}

const mapDispatchToProps = dispatch => {
    return {
        // dispatching plain actions
        handleFormStep: (step) => {
            dispatch({ type: 'UPDATE_INDICATOR', step: step });
        },
        handleFormSave: (step, data) => {
            dispatch({ type: 'UPDATE_FIELDS', step: step, data: data });
        }
    }
}

type Props = {
    proposalType: ProposalTypes,
    handleFormSave: any,
    handleFormStep: any,
    formData: any,
    stepIndicator: number,
}

const ProposalWizard: React.FC<Props> = (props) => {

    const [stepsCount, setStepsCount] = useState<number>(0);

    //Fields uses to submit form data
    const [proposalEnquiryId, setProposalEnquiryId] = useState(null);

    const [updateRequested, setUpdateRequested] = useState(null);
    const [completeRequested, setCompleteRequested] = useState(null);
    const [isSlimVersion, setIsSlimVersion] = useState(false);

    const router = useRouter();

    //Should return true or false if not possible to continue
    const handleStepDataSave = (step, data) => {
        let result = false;

        //do some validation if required
        props.handleFormSave(step, data);
        result = true;

        if (result) {
            setUpdateRequested(Date.now());
        }

        return result;
    }

    // Why not just call handleFormSave directly?
    const handleFormSubmit = (step, data) => {
        let result = false;

        //do some validation if required
        props.handleFormSave(step, data);
        result = true;

        if (result) {
            setCompleteRequested(Date.now());
        }

        return result;
    }

    //Initialization
    useEffect(() => {

        const queryParams = new URLSearchParams(window.location.search);

        let quoteid = router.query.quoteid || queryParams.get("quoteid");
        let enquiryid = router.query.enquiryid || queryParams.get("enquiryid");
        let uid = router.query.uid || queryParams.get("uid");
        let directfinance = router.query.directfinance || queryParams.get("directfinance");

        if(props.proposalType === ProposalTypes.Personal){
            let slimVersion = router.query.slimversion || queryParams.get("slimversion");
        
            if(slimVersion == "1"){
                setIsSlimVersion(true);
            }
            // else{
            //     if(Math.round(Math.random()) === 1){
            //         setIsSlimVersion(true);
            //         router.push(GetFullUrlPath() + "&slimversion=1")
            //     }
            // }
        };


        //initialize proposal
        ProposalEnquirieService.GetEnquiryid(props.proposalType, quoteid, enquiryid, uid, directfinance == "1")
            .then(result => {
                if (result.data) {
                    setProposalEnquiryId(result.data.id);
                }
            });


        switch (props.proposalType) {
            case ProposalTypes.Personal:
                setStepsCount(10);
                break;

            case ProposalTypes.BusinessLtd:
                setStepsCount(7);
                break;

            case ProposalTypes.BusinessPartner:
                setStepsCount(8);
                break;

            case ProposalTypes.BusinessSole:
                setStepsCount(7);
                break;
        }

        props.handleFormStep(1);

    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [props.stepIndicator])


    useEffect(() => {
        if (updateRequested) {
            const proposalData = getProposalData();

            //Update proposal enquiry
            ProposalEnquirieService.UpdateEnquiry(proposalEnquiryId, proposalData);
        }
    }, [updateRequested])


    useEffect(() => {
        if (completeRequested) {
            const proposalData = getProposalData();
           

            //Update proposal enquiry
            ProposalEnquirieService.CompleteEnquiry(proposalEnquiryId, proposalData).then(() => {
              
                let goal = "proposal";
                
                if(isSlimVersion){
                    goal += "&slimversion=1"
                }

                let url = GetThankYouPageUrl(false, goal);
               
                router.push(url);
            });

        }
    }, [completeRequested])

    const getProposalData = () => {
        return ProposalDataHelper.getProposalData(props.proposalType, props.formData, isSlimVersion);
    }

    const renderProposalSteps = (proposalType: ProposalTypes) => {
            let steps = null;

            switch (proposalType) {
                case ProposalTypes.Personal:

                    if(isSlimVersion){
                        steps =
                        <>
                            {props.stepIndicator === 1 ? <PersonalStepOne handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 2 ? <PersonalStepTwo showMiddleName={false}  handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 3 ? <PersonalStepThree showProperyStatus={false} showMaritalStatus={false} showGenderSelector={false} handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 4 ? <PersonalStepFive  showSlimVersion={true}  handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 5 ? <PersonalStepSix showTotalMonthlyExpendature={true} handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 6 ? <PersonalStepSeven showLandLine={false} showYourPosition={false} showSingleEmployentHistoryOnly={true} handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 7 ? <PersonalStepEight showAccountName={false} showAccountNumer={false} showSortCodeLookup={false} handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 8 ? <PersonalStepNine handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 9 ? <PersonalStepTen handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={handleFormSubmit} /> : ""}
                        </>
                    }else{
                        steps =
                        <>
                            {props.stepIndicator === 1 ? <PersonalStepOne handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 2 ? <PersonalStepTwo showMiddleName={true}  handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 3 ? <PersonalStepThree showProperyStatus={true} showMaritalStatus={true} showGenderSelector={true} handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 4 ? <PersonalStepFour handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 5 ? <PersonalStepFive showSlimVersion={false} handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 6 ? <PersonalStepSix showTotalMonthlyExpendature={false} handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 7 ? <PersonalStepSeven showLandLine={true} showYourPosition={true} showSingleEmployentHistoryOnly={false} handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 8 ? <PersonalStepEight showAccountName={true} showAccountNumer={true} showSortCodeLookup={true} handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 9 ? <PersonalStepNine handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 10 ? <PersonalStepTen handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={handleFormSubmit} /> : ""}
                        </>
                    }
                    
                    break;
                case ProposalTypes.BusinessLtd:
                    steps =
                        <>
                            {props.stepIndicator === 1 ? <LimitedStepOne handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 2 ? <LimitedStepTwo handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 3 ? <LimitedStepThree handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 4 ? <LimitedStepFour handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 5 ? <LimitedStepFive handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 6 ? <LimitedStepSix handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 7 ? <LimitedStepSeven handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={handleFormSubmit} /> : ""}
                        </>
                    break;

                case ProposalTypes.BusinessSole:
                    steps =
                        <>
                            {props.stepIndicator === 1 ? <SoleStepOne handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 2 ? <SoleStepTwo handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 3 ? <SoleStepThree handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 4 ? <SoleStepFour handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 5 ? <SoleStepFive handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 6 ? <SoleStepSix handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 7 ? <SoleStepSeven handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={handleFormSubmit} /> : ""}
                        </>
                    break;

                case ProposalTypes.BusinessPartner:
                    steps =
                        <>
                            {props.stepIndicator === 1 ? <PartnerStepOne handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 2 ? <PartnerStepTwo handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 3 ? <PartnerStepThree handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 4 ? <PartnerStepFour handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 5 ? <PartnerStepFive handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 6 ? <PartnerStepSix handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 7 ? <PartnerStepSeven handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={null} /> : ""}
                            {props.stepIndicator === 8 ? <PartnerStepEight handleFormSave={handleStepDataSave} handleFormStep={props.handleFormStep} handleFormSubmit={handleFormSubmit} /> : ""}
                        </>
                    break;
            }

            return steps;
        
    }

    return (
        <>
            {renderProposalSteps(props.proposalType)}
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProposalWizard);