import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "./TextField";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {login} from "../slices/auth"

function LoginFormik() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });

  

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        dispatch(login(values)).then((res)=>{
          console.log(res,"response");
          if (res.payload.user.data.sucess === true) {
            toast("Login successfully");
            navigate("/home");
          } else {
            navigate("/");
          }
        }).then((err)=>{
          console.log(err);
        })
      }}
    >
      {(formik) => (
        <div
          className="container card shadow mt-5"
          style={{ maxWidth: "500px" }}
        >
          <h1 className="font-weight-bold-display-4 my-4">Sign In</h1>
          <div className="text-danger font-weight-bold">{error && error}</div>
          <Form onSubmit={formik.handleSubmit}>
            <TextField label="Email" name="email" type="email" />
            <TextField label="Password" name="password" type="password" />
            <button className="btn btn-primary mt-2" type="submit">
              Login
            </button>
          </Form>
          <p className="mt-3">
            Need an account? <br />
            <Link to="/register">Sign Up</Link>
          </p>
        </div>
      )}
    </Formik>
  );
}

export default LoginFormik;
