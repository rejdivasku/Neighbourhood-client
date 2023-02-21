import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

export function Register() {
     const navigate = useNavigate();
     const initialValues = {
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          password: "",
     };

     const validationSchema = Yup.object().shape({
          firstName: Yup.string().required("You must input a First Name!"),
          lastName: Yup.string().required("You must input a Last Name!"),
          email: Yup.string().required(),
          username: Yup.string().min(3).max(15).required(),
          password: Yup.string().min(4).max(20).required(),
     });

     const onSubmit = (data) => {
          console.log(data)
          axios.post("https://neighbourhood-server.vercel.app/auth", data).then(() => {
               navigate(`/login`)
          });
     };

     return (
          <div>
               <div className="layout">
                    <div className="formContainerRegister">
                         <div className="hood-title">
                              <h3 style={{ fontWeight: 600 }}>Create an Account</h3>
                         </div>
                         <Formik
                              initialValues={initialValues}
                              onSubmit={onSubmit}
                              validationSchema={validationSchema}
                         >
                              <Form className="formContainerRegister">
                                   <label>First Name </label>
                                   <Field
                                        autocomplete="off"
                                        id="inputCreatePost"
                                        name="firstName"
                                        placeholder="(Ex. Mark...)"
                                   />
                                   <ErrorMessage className="validation-alert" name="firstName" component="span" />
                                   <label>Last Name </label>
                                   <Field
                                        autocomplete="off"
                                        id="inputCreatePost"
                                        name="lastName"
                                        placeholder="(Ex. Hamilton...)"
                                   />
                                   <ErrorMessage className="validation-alert" name="lastName" component="span" />
                                   <label>Email </label>
                                   <Field
                                        autocomplete="off"
                                        id="inputCreatePost"
                                        name="email"
                                        placeholder="(Ex. markhamilton@gmail.com...)"
                                   />
                                   <ErrorMessage className="validation-alert" name="email" component="span" />
                                   <label>Username </label>
                                   <Field
                                        autocomplete="off"
                                        id="inputCreatePost"
                                        name="username"
                                        placeholder="(Ex. John123...)"
                                   />
                                   <ErrorMessage className="validation-alert" name="username" component="span" />
                                   <label>Password </label>
                                   <Field
                                        autocomplete="off"
                                        id="inputCreatePost"
                                        name="password"
                                        placeholder="(Ex. Post...)"
                                        type="password"
                                   />
                                   <ErrorMessage className="validation-alert" name="password" component="span" />

                                   <button type="submit"> Sign Up</button>
                                   <span style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                                        Already a user?
                                        <Link to="/login" className="login-link">Log in</Link>
                                   </span>
                              </Form>
                         </Formik>
                    </div>
               </div>
               <div className="footer-register fixed-bottom">
                    <hr />
                    <div className="footer-elements">
                         <span><FontAwesomeIcon icon={faCopyright} className="trademark" />{new Date().getFullYear()} Neighbourhood Ltd. All Rights Reserved.</span>
                    </div>
               </div>
          </div>
     );
}