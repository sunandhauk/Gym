import React, { useEffect } from 'react';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import ProgramModal from './components/modals/ProgramModal';
import TrainerModal from './components/modals/TrainerModal';
import CheckoutModal from './components/modals/CheckoutModal';
import PassModal from './components/modals/PassModal';
import FloatingCallButton from './components/FloatingCallButton';
import Home from './pages/Home';
import Programs from './pages/Programs';
import ProgramDetails from './pages/ProgramDetails';
import Trainers from './pages/Trainers';
import TrainerDetails from './pages/TrainerDetails';
import Membership from './pages/Membership';

function ScrollToHash() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:programId" element={<ProgramDetails />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/trainers/:trainerId" element={<TrainerDetails />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/portal" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <FloatingCallButton />

      <Toast />
      <ProgramModal />
      <TrainerModal />
      <CheckoutModal />
      <PassModal />
    </>
  );
}
