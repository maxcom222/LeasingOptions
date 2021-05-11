import dynamic from 'next/dynamic';

const DynamicTrustMicroComponent = dynamic(
    () => import('.'),
    { loading: () => <p>Loading...</p> }
  );

export default DynamicTrustMicroComponent;