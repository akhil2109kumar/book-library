import React, { useState } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import { SIGNIN_USER } from '../gql/userQueries';
import { useMutation } from '@apollo/client';
import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';

const SignInSchema = Yup.object().shape({
    rating: Yup.string().email("Invalid email").required("Required"),
    review: Yup.string()
        .min(5, "Atleast 6 characters long")
        .max(50, "Too Long")
        .required(),
});

function MyModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginUser, { loading, error, data }] = useMutation(SIGNIN_USER, {
        onError: (error) => {
            console.log(error);
            // handle error here
        },
    });

    const handleSubmit = (values) => {
        loginUser({ variables: { input: { ...values } } })
            .then((result) => {
                const { errors, data } = result;
                if (data.loginUser.status === "success") {
                    dispatch({ type: 'GET_LOGIN_SUCCESS', payload: data.loginUser });
                    localStorage.setItem("isLoggedIn", true);
                    localStorage.setItem("token", data.loginUser.access_token);
                    navigate('/dashboard');
                }
                if (errors.name === "ApolloError") {
                    toast(errors.message);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit view
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        validationSchema={SignInSchema}
                        onSubmit={handleSubmit}
                        validateOnChange={false}
                        initialValues={{
                            rating: "",
                            review: "",
                        }}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            values,
                            touched,
                            isValid,
                            errors,
                            isValidating
                        }) => (
                            <Form
                                noValidate
                                onSubmit={(event) => handleSubmit(event)}
                            >

                                <Form.Group as={Col} sm="4" className="mx-auto text-start mb-3" controlId="validationFormik01">
                                    <Form.Label className="pb-1">Rating *</Form.Label>
                                    <Form.Control
                                        type="rating"
                                        placeholder="rating"
                                        name="rating"
                                        value={values.rating}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.rating && !errors.rating}
                                        isInvalid={touched.rating && !!errors.rating}
                                    />
                                    {touched.rating && errors.rating && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.rating}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                                <Form.Group as={Col} sm="4" className="mx-auto text-start mb-3" controlId="validationFormik02">
                                    <Form.Label className="pb-1">Write a review</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="review"
                                        name="review"
                                        value={values.review}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.review && !errors.review}
                                        isInvalid={touched.review && !!errors.review}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.review}
                                    </Form.Control.Feedback>

                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                {/* <div>
                                    <Button type="button" onClick={(event) => handleSubmit(event)} as={Col} sm="4" className="btn-signup btn btn-dark my-3 mx-auto">Sign in</Button>
                                </div>
                                <h6 className='sign-border position-relative mb-0'>
                                </h6>
                                <div>
                                    <Button type="button" onClick={(event) => handleSubmit(event)} as={Col} sm="4" className="btn btn-outline-dark bg-transparent btn-linksignup text-dark my-3  mx-auto">Sign Up</Button>
                                </div> */}

                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MyModal;