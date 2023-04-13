import React, { useEffect, useState } from 'react';
import "./viewallbooks.css"
import { Link } from "react-router-dom";
import { GET_ALL_BOOKS, UPDATE_RATING_COLLECTIONS } from '../../gql/bookQueries';
import { useMutation, useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';


const ViewAllBooks = () => {
    const { loading, error, data } = useQuery(GET_ALL_BOOKS);
    const allBooksList = data ? data.allBooks.books : [];
    const [bookStatus, setBookStatus] = useState("");
    const [bookId, setBookId] = useState("");
    const userInfo = useSelector((state) => state.user);
    // const [addToLibrary, { loading, error }] = useMutation(UPDATE_RATING_COLLECTIONS);

    console.log('----', allBooksList)




    useEffect(() => {
        console.log('---@/store', bookId, bookStatus)
        if (bookId !== "") {
            // changeHandler(bookStatus);
        }
    }, [bookStatus, bookId]);

    // const changeHandler = (bookStatus) => {
    //     console.log('change handle')
    //     addToLibrary({
    //         variables: {
    //             bookId: bookId,
    //             userId: userInfo.user.id,
    //             collect: bookStatus,
    //             rating: 0
    //         },
    //     }).then(data => {
    //         console.log(data)
    //         console.log('----success');
    //         // Handle success
    //         // router.push('/mybook')
    //         refreshData()
    //     }).catch(error => {
    //         // Handle error
    //         console.error(error);
    //     });
    // }

    const refreshData = () => {
        // router.replace(router.asPath);
    }

    return (
        <div className='container py-4'>
            <h2 className='fs-3 pb-3 mb-4 text-start border-bottom border-dark'>All Books</h2>
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
                        {allBooksList.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <img src='https://images-na.ssl-images-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71-tsVwvG+L._AC_UL600_SR600,600_.jpg'
                                            className="" height="50" width="50" />
                                    </td>
                                    <td><Link href='#' className='text-decoration-none'>{item.title}</Link></td>
                                    <td><Link href='#' className='text-decoration-none'>{item.author}</Link></td>
                                    <td>{item.avgRating}</td>
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
                                    {/* <td><Link href='#' className='text-decoration-none'>Edit view</Link></td> */}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewAllBooks