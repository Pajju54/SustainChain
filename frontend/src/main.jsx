import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import HomePage from './landing_page/home/HomePage';
import Signup from './landing_page/signup/Signup';
import AboutPage from './landing_page/about/AboutPage';
import ProfilePage from './landing_page/profile/ProfilePage';
import SupportPage from './landing_page/support/SupportPage';
import Login from './landing_page/login/login';
import EditProfile from './landing_page/profile/EditProfile';
import SustainabilityScorePage from './landing_page/sustainability/SustainabilityScorePage'
import DashboardPage from './landing_page/dashboard/dashboardPage';

import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';
import NotFound from './landing_page/NotFound';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>c;
      <Route path='/' element={<HomePage />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/support' element={<SupportPage />} />
      <Route path="/sustainability-score" element={<SustainabilityScorePage />} />
      <Route path='/editProfile' element={<EditProfile />} />
      <Route path="/dashboard" element={<DashboardPage />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);