import React from 'react'
import { Form, Col, Button } from "react-bootstrap";
import * as Yup from "yup";
import { Formik } from "formik";

const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
        .min(5, "Atleast 6 characters long")
        .max(50, "Too Long")
        .required(),
    confirmPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const AddBook = () => {
    const handleSubmit = (values, event) => {
        console.log("-----", values);
    };

    return (
        <>
        <div className="container py-4">
            <h2 className="fs-1 pb-3">
                Add Book
            </h2>
            <Formik
                validationSchema={SignupSchema}
                onSubmit={handleSubmit}
                validateOnChange={false}
                initialValues={{
                    title: "",
                    author: "",
                    date: "",
                    coverImage: "",
                    collection: "",
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
                            <Form.Label>Title *</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Add book title"
                                name="title"
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.title && !errors.title}
                                isInvalid={touched.title && !!errors.title}
                            />
                            {touched.title && errors.title && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.title}
                                </Form.Control.Feedback>
                            )}
                            <Form.Control.Feedback type="valid">
                                Valid title
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} sm="4" className="mx-auto text-start mb-3" controlId="validationFormik02">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Add author name here"
                                name="author"
                                value={values.author}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.author && !errors.author}
                                isInvalid={touched.author && !!errors.author}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.author}
                            </Form.Control.Feedback>

                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} sm="4" className="mx-auto text-start mb-3" controlId="validationFormik02">
                            <Form.Label>Cover Image</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Add author name here"
                                name="coverImage"
                                value={values.coverImage}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.coverImage && !errors.coverImage}
                                isInvalid={touched.coverImage && !!errors.coverImage}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.coverImage}
                            </Form.Control.Feedback>

                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} sm="4" className="mx-auto text-start mb-3" controlId="validationFormik02">
                            <Form.Label>Collection</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Add author name here"
                                name="collection"
                                value={values.collection}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.collection && !errors.author}
                                isInvalid={touched.collection && !!errors.collection}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.collection}
                            </Form.Control.Feedback>

                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit" as={Col} sm="4" className="btn-signup btn btn-dark my-3">Add Book</Button>
                    </Form>
                )}
            </Formik>
        </div>
        </>
    )
}

export default AddBook