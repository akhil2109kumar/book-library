import React, { useEffect, useState } from 'react'
import "./mybook.css"
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { MY_BOOKS_QUERY, UPDATE_RATING_COLLECTIONS } from '../../gql/bookQueries';
import Rating from '@mui/material/Rating';
import MyModal from '../../components/Modal';

const MyBook = () => {
  const token = localStorage.getItem('token') || "";
  const [myBooks, setMyBooks] = useState([]);
  const [collect, setCollect] = useState({ WANT_TO_READ: 0, READ: 0, READING: 0 });

  const books = useSelector((state) => state.books);

  const [rating, setRating] = useState(0);
  const [bookStatus, setBookStatus] = useState("");
  const [bookId, setBookId] = useState("");
  const [bookStastics, setbookStastics] = useState({});

  const [showModal, setShowModal] = useState(false);

  useQuery(MY_BOOKS_QUERY, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    },
    onCompleted: (data) => {
      let myBooks = data.myBooks.myBooks;
      let WANT_TO_READ = data.myBooks.myBooks.filter((book) => book.collect === "WANT_TO_READ")
      let READ = data.myBooks.myBooks.filter((book) => book.collect === "READ")
      let READING = data.myBooks.myBooks.filter((book) => book.collect === "READING")
      setCollect({ WANT_TO_READ: WANT_TO_READ.length, READ: READ.length, READING: READING.length })
      setMyBooks(myBooks)
    },
  });
  const [addToLibrary, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_RATING_COLLECTIONS);



  return ( <>
    <div>
      <div className='container py-4 mt-4'>
        <h2 className='fs-3 pb-3 mb-4 text-start border-bottom border-dark'>My Books</h2>
        <div className='row mx-0 pt-5'>
          <div className='col-md-2 col-4 ps-0 text-start'>
            <h5 className='pb-2 mb-3'>
              Bookshelves <small>Edit</small>
            </h5>
            <div className=''>
              <p>All ({myBooks.length})</p>
              <p>Read ({collect.READ})</p>
              <p>Current Reading ({collect.READING})</p>
              <p>Want to read ({collect.WANT_TO_READ})</p>
            </div>
          </div>
          <div className='col-md-10 col-8 pe-0'>
            <div className='table-responsive'>
              <table className="table text-start">
                <thead>
                  <tr>
                    <th scope="col">Cover</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Avg Rating</th>
                    <th scope="col">Date read</th>
                    <th scope="col">Date Added</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    myBooks.map((book, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td>
                              <img src='https://images-na.ssl-images-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71-tsVwvG+L._AC_UL600_SR600,600_.jpg'
                                className="" height="50" width="50" />
                            </td>
                            <td><Link href='#' className='text-decoration-none'>{book.bookId.title}</Link></td>
                            <td><Link href='#' className='text-decoration-none'>{book.bookId.author}</Link></td>
                            <td>{book.rating}</td>
                            <td>
                              <Rating
                                name="simple-controlled"
                                readOnly
                                value={book.bookId.avgRating}
                              />
                            </td>
                            <td>Apr, 10 2023</td>
                            <td><Link href='#' className='text-decoration-none' onClick={() => setShowModal(true)}><MyModal /></Link></td>
                          </tr>
                        </>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
     
    </div>
    </>
  )
}

export default MyBook