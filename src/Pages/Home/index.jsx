import React, { useEffect, useState } from 'react';
import Footer from '../../Components/UserLayout/Footer';
import { quantum } from 'ldrs';
import Global from '../../Utils/Global';
import RecommendedBike from './RecommendedBike';
import ModelScene from './3dModel';
import { Canvas } from '@react-three/fiber';
import BlueScooterUrl from "../../assets/model/Blue_Electric_Scooter_0905084118.fbx";
import Scooter_on_Display from "../../assets/model/Scooter_on_Display_0905121811.fbx";
import Bounce_Infinity from "../../assets/model/Bounce_Infinity_E_1_0905124813.fbx";
import Hero_Electric_Optima from "../../assets/model/Hero_Electric_Optima__0905122741.fbx";
import Komaki_Se_Sport from "../../assets/model/Komaki_Se_Sport_0905123138.fbx";
import Komaki_Ranger from "../../assets/model/Komaki_Ranger_0905123538.fbx";
import oreva_alish from "../../assets/model/oreva_Alish_0905122334.fbx";
import Ampere_Primus from "../../assets/model/Ampere_Primus_0905123738.fbx";
import Ampere_Zeal from "../../assets/model/Ampere_Zeal_EX_0905124038.fbx";
import Bajaj_Chetak from "../../assets/model/Bajaj_Chetak_Premium__0905124601.fbx";

const modelUrls = {
  'Blue Scooter': BlueScooterUrl,
  'Scooter on Display': Scooter_on_Display,
  'Bounce Infinity': Bounce_Infinity,
  'Hero Electric Optima': Hero_Electric_Optima,
  'Komaki Se Sport': Komaki_Se_Sport,
  'Komaki Ranger': Komaki_Ranger,
  'Oreva Alish': oreva_alish,
  'Ampere Primus': Ampere_Primus,
  'Ampere Zeal': Ampere_Zeal,
  'Bajaj Chetak': Bajaj_Chetak
};

const Home = () => {
  quantum.register();

  const [bikesData, setBikesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBike, setSelectedBike] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await Global.httpGet('/bikes?limit=100');
      console.log(res);
      setBikesData(res.bikes);
      setLoading(false);
    })();
  }, []);

  const handleCardClick = (bike) => {
    console.log("Card clicked:", bike);
    setSelectedBike(bike);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log("Close card clicked!")
    setIsModalOpen(false);
    setSelectedBike(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <l-quantum size="45" speed="1.75" color="black"></l-quantum>
      </div>
    );
  }

  return (
    <div className={`min-h-screen`}>
      <div className={`container mx-auto px-4 ${isModalOpen ? 'blur-md' : ''}`}>
        <h1 className="text-3xl font-bold mb-4">Recommended Bikes</h1>
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {bikesData.map(data => (
            <RecommendedBike
              key={data.brandId}
              image={data.image}
              name={data.name}
              price={data.price}
              topSpeed={data.topSpeed}
              range={data.range}
              chargingtime={data.chargingTime}
              onclick={() => handleCardClick(data)} // Ensure click handler is passed correctly
            />
          ))}
        </div>
      </div>
      <Footer />
      {isModalOpen && (
        <div>
          <div className='flex justify-end items-end w-full font-dm-sans text-2xl font-bold absolute top-0 left-0 z-10'>
            <button className='relative top-20 right-20 z-10' onClick={handleCloseModal}>Close</button>
          </div>
          <div style={{ width: '100vw', height: '100vh' }} className="block absolute top-0 left-0 z-1" >
            <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
              <ModelScene url={Bajaj_Chetak} />
            </Canvas>
          </div></div>

      )}
    </div>
  );
};

export default Home;
