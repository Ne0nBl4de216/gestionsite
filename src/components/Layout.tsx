import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useAuthStore } from '../store/authStore';

export const Layout = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-8">
        <Outlet />
      </main>
    </div>
  );
};