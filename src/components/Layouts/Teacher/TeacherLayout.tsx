import React, { useState } from 'react';
import Navbar from './Menu/NavBar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router';
interface TeacherLayoutProps {
  children?: React.ReactNode;
}
const TeacherLayout = ({ children }: TeacherLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Content */}
        <main className="flex-1 p-6 bg-gray-50">{children}</main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default TeacherLayout;
