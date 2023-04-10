import React from 'react';
import { Outlet, Link } from "react-router-dom";
import './header.css';
const Header = () => {
  return (
    <>
      <nav className="header-bg">
        <div className="container">
          <div className="row mx-0">
            <div className="col-md-12">
             <img src="/assets/logo.png" alt="logo"/>
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  )
};

export default Header;