import { Outlet } from 'react-router-dom';
import Navbar from '../components/Main/Navbar';
import React from "react";

export default function Main() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
