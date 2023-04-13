import React from 'react'
import "./mybook.css"
import { Link } from "react-router-dom";

const MyBook = () => {
  return (
    <div>
      <div className='container py-4 mt-4'>
        <h2 className='fs-3 pb-3 mb-4 text-start border-bottom border-dark'>My Books</h2>
        <div className='row mx-0 pt-5'>
          <div className='col-md-2 col-4 ps-0 text-start'>
            <h5 className='pb-2 mb-3'>
              Bookshelves <small>Edit</small>
            </h5>
            <div className=''>
              <p>All (0)</p>
              <p>Read (0)</p>
              <p>Current Reading (0)</p>
              <p>Want to read (0)</p>
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
                    <th scope="col">Shelves</th>
                    <th scope="col">Review</th>
                    <th scope="col">Date read</th>
                    <th scope="col">Date Added</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td><Link href='#' className='text-decoration-none'>Andy Goldsworthy: A Collaboration with Nature</Link></td>
                    <td><Link href='#' className='text-decoration-none'>Goldsworthy, Andy</Link></td>
                    <td>3.97</td>
                    <td>
                      <div className='text-start'>
                        <Link href='#' className='star text-decoration-none'>&#9734;</Link>
                        <Link href='#' className='star text-decoration-none'>&#9734;</Link>
                        <Link href='#' className='star text-decoration-none'>&#9734;</Link>
                        <Link href='#' className='star text-decoration-none'>&#9734;</Link>
                        <Link href='#' className='star text-decoration-none'>&#9734;</Link>
                      </div>
                    </td>
                    <td><Link href='#' className='text-decoration-none'>to read <small>[edit]</small></Link></td>
                    <td><Link href='#' className='text-decoration-none'>Write a review</Link></td>
                    <td>not set <small>[edit]</small></td>
                    <td>Apr, 10 2023</td>
                    <td><Link href='#' className='text-decoration-none'>Edit view</Link></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyBook