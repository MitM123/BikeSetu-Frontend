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
import {ForgotPassword} from './Pages/ForgetPassword/index'
import ResetPassword from './Pages/ResetPassword/index'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    async function fetchUser() {
      setTimeout(async() => {
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
            <Route path="verify/:token" element={<VerifyEmail/>} />
            <Route path="about" element={<h1>About</h1>} />
            <Route path="services" element={<h1>Services</h1>} />
            <Route path="contact" element={<h1>Contact</h1>} />
            <Route path="profile" element={<Profile/>} />
            <Route path="reset-password/:token" element={<ResetPassword/>} />
            <Route path="forgot-password" element={<ForgotPassword/>} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        :
        <Loader/>
      }
    </MantineProvider>
  );
};

export default App;
