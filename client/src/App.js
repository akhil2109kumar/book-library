import React, { useState } from 'react';
import './App.css';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Header from './components/header/Header';
import Signin from './pages/signin/Signin';
import Signup from './pages/Signup/Signup';
import AddBook from './pages/addBook/AddBook';
import ViewAllBooks from './pages/viewAllBooks/ViewAllBooks';
import MyBook from './pages/mybook/MyBook';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { LoggedInPrivateRoute, PrivateRoute } from './components/header/privateRoute/PrivateRoute';

function App() {
  const {pathname} = useLocation();
  const isLoggedIn = useSelector(state => state.loginReducer.isLoggedIn);
  return (
    <div className="App">
        {!pathname.includes("register") && !pathname.includes("signin") &&
          <Header isLoggedIn={isLoggedIn}/>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<LoggedInPrivateRoute isLoggedIn={isLoggedIn}><Signin /></LoggedInPrivateRoute>} />
          <Route path="/register" element={<Signup />} />
          <Route exact path="/addbook" element={<AddBook />} />
          <Route exact path="/booklist" element={<ViewAllBooks />} />
          <Route exact path="/mybook" element={<MyBook />} />
          <Route exact path="/dashboard" element={<PrivateRoute isLoggedIn={isLoggedIn}><Dashboard /> </PrivateRoute>} />
        </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
