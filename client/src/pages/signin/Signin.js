import React from 'react'
import { Form, Col, Button } from "react-bootstrap";
import * as Yup from "yup";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./signin.css"
import { SIGNIN_USER } from '../../gql/userQueries';
import { useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(5, "Atleast 6 characters long")
    .max(50, "Too Long")
    .required(),
});

const Signin = () => {
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
      <div className="container py-4">
        <div className='pb-4'>
          <Link className="navbar-brand fs-1 mx-0 text-dark fw-bold" to="/">BookLibrary</Link>
        </div>
        <h2 className="fs-2 pb-3">
          Sign in
        </h2>
        <Formik
          validationSchema={SignInSchema}
          onSubmit={handleSubmit}
          validateOnChange={false}
          initialValues={{
            email: "",
            password: "",
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
                <Form.Label className="pb-1">Email *</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="example@example.com"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && !!errors.email}
                />
                {touched.email && errors.email && (
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                )}
                <Form.Control.Feedback type="valid">
                  Valid email
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} sm="4" className="mx-auto text-start mb-3" controlId="validationFormik02">
                <Form.Label className="pb-1">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && !!errors.password}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>

                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <div>
               <Button type="button" onClick={(event) => handleSubmit(event)} as={Col} sm="4" className="btn-signup btn btn-dark my-3 mx-auto">Sign in</Button>
              </div>
              <h6 className='sign-border position-relative mb-0'>
              </h6>
               <div>
               <Button type="button" onClick={(event) => handleSubmit(event)} as={Col} sm="4" className="btn btn-outline-dark bg-transparent btn-linksignup text-dark my-3  mx-auto">Sign Up</Button>
              </div>
              
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default Signin