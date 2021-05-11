import dynamic from 'next/dynamic';

const DynamicProposalWizardComponent = dynamic(
    () => import('../../components/proposal/wizard'),
    { loading: () => <p>Loading...</p> }
  );

  export default DynamicProposalWizardComponent