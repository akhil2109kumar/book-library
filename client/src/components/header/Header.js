import React from 'react';
import { Outlet, Link } from "react-router-dom";
import './header.css';
import profileImg from "./assets/profile.png";
import notificationIcon from "./assets/notification.png";
import Dropdown from 'react-bootstrap/Dropdown';

const Header = () => {
  return (
    <>
      <div className='d-flex align-items-center header-bg'>
        <div className='container'>
          <nav className="navbar navbar-expand-lg navbar-light p-0">
            <div className="container-fluid px-0">
              <Link className="navbar-brand fs-3 fw-bold pe-4" to="/">BookLibrary</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/dashboard">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/booklist">My Books</Link>
                  </li>
                </ul>
              </div>
              <div class="collapse navbar-collapse justify-content-end" id="navbarNavDarkDropdown">
                <ul class="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">
                      <img height={30} width={30} src={notificationIcon} alt="Notification" />
                    </Link>
                  </li>
                  <Dropdown   >
                    <Dropdown.Toggle variant="light" className='profile-icon' id="dropdown-basic">
                      <img width={30} height={30} style={{borderRadius:"50%"}} src={profileImg} alt="Profile" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <Outlet />
    </>
  )
};

export default Header;