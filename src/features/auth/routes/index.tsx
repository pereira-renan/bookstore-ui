import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Register from '../components/Register';
import Login from '../components/Login';
import ForgotPassword from '../components/ForgotPassword';

import NotFound from '@/features/misc/components/NotFound';
import ResetPassword from '../components/ResetPassword';

export default function AuthRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate replace to="login" />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="forgotPassword" element={<ForgotPassword />} />
      <Route
        path="forgotPassword/reset/userId=:user&resetToken=:code"
        element={<ResetPassword />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
