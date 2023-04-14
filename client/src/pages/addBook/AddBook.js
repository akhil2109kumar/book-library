import React from "react";
import { Form, Col, Button } from "react-bootstrap";
import * as Yup from "yup";
import { Formik } from "formik";
import { useMutation } from "@apollo/client";
import {
    ADD_BOOKS_MUTATION,
} from "../../gql/bookQueries";

const addBookSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    author: Yup.string().required("Required"),
    coverImage: Yup.string().required("Required"),
});

const AddBook = () => {
    const [addBook] = useMutation(ADD_BOOKS_MUTATION, {});
    const handleSubmit = (values) => {
        
        const formData = new FormData();
        formData.append('image', values.coverImage);
    
        addBook({
            variables:{
                title: values.title,
                author: values.author,
                coverImage: [values.coverImage],
              }
        })
            .then((result) => {
                const { errors, data } = result;
                console.log(data, errors);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <div className="container py-4 mt-4">
                <h2 className="fs-2 pb-3">Add Book</h2>
                <Formik
                    validationSchema={addBookSchema}
                    onSubmit={handleSubmit}
                    validateOnChange={false}
                    initialValues={{
                        title: "",
                        author: "",
                        coverImage: "",
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        setFieldValue,
                        handleBlur,
                        values,
                        touched,
                        isValid,
                        errors,
                        isValidating,
                    }) => (
                        <Form
                            noValidate
                            onSubmit={(event) => handleSubmit(event)}
                            encType="multipart/form-data"
                        >
                            <Form.Group
                                as={Col}
                                sm="4"
                                className="mx-auto text-start mb-3"
                                controlId="validationFormik01"
                            >
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
                            <Form.Group
                                as={Col}
                                sm="4"
                                className="mx-auto text-start mb-3"
                                controlId="validationFormik02"
                            >
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
                            <Form.Group
                                as={Col}
                                sm="4"
                                className="mx-auto text-start mb-3"
                                controlId="validationFormik02"
                            >
                                <Form.Label>Cover Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    placeholder="Add author name here"
                                    name="coverImage"
                                    onBlur={handleBlur}
                                    onChange={(event) => {
                                        setFieldValue("coverImage", event.currentTarget.files[0]);
                                    }}
                                    isValid={touched.coverImage && !errors.coverImage}
                                    isInvalid={touched.coverImage && !!errors.coverImage}
                                />

                                <Form.Control.Feedback type="invalid">
                                    {errors.coverImage}
                                </Form.Control.Feedback>

                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>

                            <Button
                                type="button"
                                onClick={(event) => handleSubmit(event)}
                                as={Col}
                                sm="4"
                                className="btn-signup btn btn-dark my-3"
                            >
                                Add Book
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default AddBook;