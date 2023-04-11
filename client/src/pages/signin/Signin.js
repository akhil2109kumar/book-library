import React from 'react'
import { Form, Col, Button } from "react-bootstrap";
import * as Yup from "yup";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import "./signin.css"

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

const Signin = () => {

  const handleSubmit = (values, event) => {
    console.log("-----", values);
  };

  return (
    <>
     <div className="container py-4">
        <h2 className="fs-1 pb-3">
          Sign in
        </h2>
        <Formik
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
          validateOnChange={false}
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
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
              <Button type="submit" as={Col} sm="4" className="btn-signup btn btn-dark my-3">Sign in</Button>
              <div>
                <Link to="/register" className="text-dark">Sign up</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default Signin