import React from 'react'
import "./viewallbooks.css"
import { Link } from "react-router-dom";

const ViewAllBooks = () => {
    return (
        <div className='container py-4'>
            <h2 className='fs-3 pb-3 text-start'>My Books</h2>
            <div className='table-responsive'>
                <table class="table text-start">
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
    )
}

export default ViewAllBooks