import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLayout from './Components/UserLayout/UserLayout';
import { SignUp } from './Pages/SignUp';
import { Login } from './Pages/Login';
import Home from './Pages/Home/index'
import VerifyEmail from './Pages/VerifyEmail';
import Global from './Utils/Global';
import { Profile } from './Pages/Profile';
import { Loader } from './Components/UserLayout/Loader';
import { ForgotPassword } from './Pages/ForgetPassword/index'
import ResetPassword from './Pages/ResetPassword/index'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Dashboard from './Pages/DashBoard/DashboardLayout';
import AddBike from './Pages/DashBoard/AddBike';
import FranchiseManager from './Pages/DashBoard/FranchiseManager';
import TrackManufacturing from './Pages/DashBoard/TrackManufacturing';
import YardManager from './Pages/DashBoard/YardTracking';
import AboutBike from './Pages/DashBoard/AboutBike';
import YardTracking from './Pages/DashBoard/YardTracking';
import AI from './Pages/AI';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    async function fetchUser() {
      setTimeout(async () => {
        try {
          const user = await Global.getUser();
          Global.user = user;
        } finally {
          setIsLoaded(true);
        }
      }, 1500);
    }
    fetchUser();
  }, []);

  const loginRequiredRoutes = [
    "/profile",
  ];

  return (
    <MantineProvider>
      {
        isLoaded ?
          <Routes>
            <Route path="/" element={<UserLayout />}>
              <Route path="" element={<Home />} />
              <Route path="verify/:token" element={<VerifyEmail />} />
              <Route path="about" element={<h1>About</h1>} />
              <Route path="services" element={<h1>Services</h1>} />
              <Route path="contact" element={<h1>Contact</h1>} />
              <Route path="profile" element={<Profile />} />
              <Route path="reset-password/:token" element={<ResetPassword />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="ai-chat" element={<AI />} />
              <Route path='/' element={<Dashboard />}>
                <Route path="manufacturer" element={<AddBike />} />
                <Route path="yard-tracking" element={<YardTracking />} />
                <Route path='track-manufacturing' element={<TrackManufacturing />} />
                <Route path='aboutbike' element={<AboutBike />} />
                <Route path="franchisee-tracking" element={<FranchiseManager />} />
              </Route>
            </Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          :
          <Loader />
      }
    </MantineProvider>
  );
};

export default App;
