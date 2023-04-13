import React from 'react'
import { useNavigate } from "react-router-dom";
import ViewAllBooks from '../viewAllBooks/ViewAllBooks';

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className='container py-4'>
      <div className="rightCard p-4 mt-4">
        <h3>Welcome to Book Library</h3>
        <h6 className='pt-2 mb-0'>Meet your favorite book, find your reading community, and manage your reading life.</h6>
      </div>
      <button className='btn btn-dark mt-5 ms-auto d-block px-3' onClick={() => navigate('/addbook')}>
        Add Book
      </button>
      <ViewAllBooks />
    </div>
  )
}

export default Dashboard