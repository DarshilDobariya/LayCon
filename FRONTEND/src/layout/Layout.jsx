// src/components/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';

const Layout = () => {
  return (
    <div style={{ display: 'flex' }} className='h-screen'>
      <Sidebar />
      <div style={{ flex: 1 }} className='h-full'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
