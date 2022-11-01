import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../api/axios";
import AuthContext from "../context/AuthProvider";

function Login() {
  const { setAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        "/auth/login",{ email, password },
      );
      setEmail("");
      setPassword("");
      setSuccess(true);
      console.log(response.data.token, "kkkk");
      localStorage.setItem('token', response.data.token)
    } catch (err) {
        console.log(err,"error");
    }
  };



  useEffect(() => {
    setErr("");
  }, [email, password]);

  return (
    <>
      {success ? (
        <section
          className="container card shadow mt-5"
          style={{ maxWidth: "500px" }}
        >
          <h1>You are logged in</h1>
          <br />
          <p>
            <a href="#">Go home</a>
          </p>
        </section>
      ) : (
        <section>
          <div
            className="container card shadow mt-5"
            style={{ maxWidth: "500px" }}
          >
            
            <h1 className="text-center">Sign In</h1>
            <form onSubmit={handleSubmit} className="form">
              <label htmlFor="username">UserName:</label>
              <input
                className="form-control mt-2"
                id="username"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                autoComplete="off"
                type="text"
                required
              />
              <label className="mt-2" htmlFor="password">
                Password:
              </label>
              <input
                className="form-control mt-2"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                required
              />
              <button className="btn btn-primary mt-3">Sign In</button>
            </form>
            <p className="mt-3">
              Need an account? <br />
              <a href="#">Sign Up</a>
            </p>
          </div>
        </section>
      )}
    </>
  );
}

export default Login;
