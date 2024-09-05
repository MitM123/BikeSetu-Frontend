import React from 'react';
import Footer from '../../Components/UserLayout/Footer';
import RecommendedBike from './RecommendedBike';



const Home = () => {
  return (
    <div className="flex flex-col ">
      <div className='mt-4'>
        <h1 className='text-2xl w-full flex font-semibold justify-center p-2 font-dm-sans bg-green-100'>Recommended Bikes For You</h1>
        <div className='p-4'>
          <RecommendedBike />
        </div>
      </div>
      <Footer className="mt-auto" />
    </div>
  );
};

export default Home;
