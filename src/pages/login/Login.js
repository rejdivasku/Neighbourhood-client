import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import React, { useState, useContext } from "react";

export function Login() {
     const initialValues = {
          username: "",
          password: "",
     };
     const navigate = useNavigate();
     const { setAuthState } = useContext(AuthContext);

     const validationSchema = Yup.object().shape({
          username: Yup.string().min(3).max(15).required(),
     });

     const login = (data) => {
          console.log(data)
          axios.post("https://neighbourhood-server.onrender.com/auth/login", data).then((response) => {
            if (response.data.error) {
              alert(response.data.error);
            } else {
               localStorage.setItem("accessToken", response.data.token);
               setAuthState({
                 username: response.data.username,
                 id: response.data.id,
                 status: true,
               });
               navigate("/");
            }
          });
        };
     return (
          <div>
               <div className="layout">
                    <div className="formContainer">
                         <div className="hood-title">
                              <h3 style={{ fontWeight: 600 }}>Sign In</h3>
                         </div>
                         <Formik
                              initialValues={initialValues}
                              onSubmit={login}
                              validationSchema={validationSchema}
                         >
                              <Form className="formContainer">
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

                                   <button type="submit"> Sign In</button>
                                   <span style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                                        Not a member?<Link to="/register" className="login-link">Create an Account</Link>
                                   </span>
                              </Form>
                         </Formik>
                    </div>
               </div>
               <div className="footer">
                    <hr />
                    <div style={{ display: 'flex', justifyContent: 'start', paddingLeft: '25px' }}>
                         <span>
                              <FontAwesomeIcon icon={faCopyright} className="trademark" />
                              {new Date().getFullYear()} Neighbourhood Ltd. All Rights Reserved.
                         </span>
                    </div>
                    <div style={{ marginLeft: 'auto', paddingRight: '10px' }}>
                         <Link to="/terms" className="link-footer">Terms</Link>
                         <Link to="/privacy" className="link-footer">Privacy</Link>
                         <Link to="/security" className="link-footer">Security</Link>
                         <Link to="/getInTouch" className="link-footer">Get in Touch</Link>
                    </div>
               </div>
          </div>
     );
}