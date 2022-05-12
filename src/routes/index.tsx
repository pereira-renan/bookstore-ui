import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import AuthRoutes from '../features/auth/routes';
import Home from '../features/misc/components/Home';
import NotFound from '../features/misc/components/NotFound';
import Layout from '@/components/Layout/Layout';
import BookDetail from '@/features/books/components/BookDetail';
import LayoutWithSidebar from '@/components/Layout/LayoutWithSidebar';
import BookRoutes from '@/features/books/routes';
import PlaceholderPage from '@/features/misc/components/PlaceholderPage';
import Debug from '@/features/misc/components/Debug';
import CheckoutRoutes from '@/features/checkout/routes';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function AppRoutes() {
  return (
    <>
      <Router>
        <ToastContainer newestOnTop />
        <Routes>
          <Route
            path="/"
            element={
              <LayoutWithSidebar>
                <Outlet />
              </LayoutWithSidebar>
            }
          >
            <Route index element={<Home />} />
          </Route>
          <Route
            path="/"
            element={
              <Layout>
                <Outlet />
              </Layout>
            }
          >
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route path="/checkout/*" element={<CheckoutRoutes />} />
            <Route path="/debug" element={<Debug />} />
            <Route path="/test" element={<PlaceholderPage />} />
            <Route path="/books/*" element={<BookRoutes />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
