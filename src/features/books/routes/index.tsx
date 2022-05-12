import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import NotFound from '@/features/misc/components/NotFound';
import PlaceholderPage from '@/features/misc/components/PlaceholderPage';
import BookDetail from '../components/BookDetail';
import Home from '@/features/misc/components/Home';
import { useSelector } from 'react-redux';

export default function BookRoutes() {
  const book = useSelector((state: any) => state.bookReducer.value);
  return (
    <Routes>
      <Route index element={<Navigate replace to="/" />} />
      <Route path="view/all" element={<Navigate replace to="/" />} />
      <Route path="view/:id" element={<BookDetail book={book} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
