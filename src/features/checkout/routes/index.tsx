import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Checkout from '../components/Checkout';

export default function CheckoutRoutes() {
  return (
    <Routes>
      <Route index element={<Checkout />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
}
