import dynamic from 'next/dynamic';

const DynamicVehicleCarouselComponent = dynamic(
    () => import('./index'),
    { loading: () => <p>Loading...</p> }
  );

export default DynamicVehicleCarouselComponent