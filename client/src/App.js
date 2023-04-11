import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Header from './components/header/Header';
import Signin from './pages/signin/Signin';
import Signup from './pages/Signup/Signup';
import AddBook from './pages/addBook/AddBook';
import ViewAllBooks from './pages/viewAllBooks/ViewAllBooks';
import MyBook from './pages/mybook/MyBook';


function App() {
  return (
      <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/addbook" element={<AddBook />} />
         <Route path="/booklist" element={<ViewAllBooks />} />
         <Route path="/mybook" element={<MyBook />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
