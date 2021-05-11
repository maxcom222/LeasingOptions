import dynamic from 'next/dynamic';

const DynamicTrustSliderComponent = dynamic(
    () => import('./trust-slider'),
    { loading: () => <p>Loading...</p> }
  );

export default DynamicTrustSliderComponent;