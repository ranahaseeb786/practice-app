import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import {logout} from "../slices/auth"

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const log = () =>{
    dispatch(logout());
    toast("Logout successfully");
    navigate("/")
  }
  return (
    <nav className="navbar navbar-dark bg-dark">
    <div className="container-fluid">
    <Link to="/home" className="navbar-brand">Pixarsart Project</Link>
    <form className="d-flex">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button onClick={log} className="btn btn-danger" type="submit">Logout</button>
    </form>
  </div>
  </nav>
  );
}

export default Navbar;
