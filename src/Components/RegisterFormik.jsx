import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "./TextField";
import axiosInstance from "../api/axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";

function RegisterFormik() {
  const navigate = useNavigate();
  const clientId =
    "779249818717-vqk2atc5t298f0vkvp1c4lgvgd3ec7ku.apps.googleusercontent.com";
  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });

  const googleLogSuccess = () => {};

  const googleLogfail = () => {};

  const componentClicked = (data) =>{
    console.warn(data);
  }

  const responseFacebook = (response) =>{
    console.log("login result", response);
  }
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        axiosInstance
          .post("/auth/register", values)
          .then((res) => {
            console.log(res, "response");
            if (res.data.sucess === true) {
              toast("Registered successfully");
              navigate("/");
            } else {
              toast("some error occured");
            }
          })
          .catch((error) => {
            console.log(error, "error");
          });
      }}
    >
      {(formik) => (
        <div
          className="container card shadow mt-5"
          style={{ maxWidth: "500px" }}
        >
          <h1 className="font-weight-bold-display-4 my-4">Sign Up</h1>
          <ToastContainer />
          <Form onSubmit={formik.handleSubmit}>
            <TextField label="First Name" name="firstName" type="text" />
            <TextField label="Last Name" name="lastName" type="text" />
            <TextField label="Email" name="email" type="email" />
            <TextField label="Password" name="password" type="password" />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
            />
            <div>
              <GoogleLogin
                clientId={clientId}
                buttonText="Sign Up with google"
                onSuccess={googleLogSuccess}
                onFailure={googleLogfail}
                cookiePolicy={"single_host_origin"}
              />
              <FacebookLogin
                appId="784769962742313"
                autoLoad={true}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook}
              />
            </div>
            <div className="mt-2">
              <button
                className="btn btn-secondary mb-2"
                type="submit"
                style={{ width: "39.5%" }}
              >
                Resgister
              </button>
              <button className="btn btn-danger mb-2 ms-3" type="reset">
                Reset
              </button>
            </div>
          </Form>
          <p className="mt-3">
            Already registered? <br />
            <Link to="/">Sign In</Link>
          </p>
        </div>
      )}
    </Formik>
  );
}

export default RegisterFormik;
