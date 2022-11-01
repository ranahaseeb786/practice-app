import './App.css';
import LoginFormik from './Components/LoginFormik';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterFormik from './Components/RegisterFormik';
import Home from './Components/Home';
import {ToastContainer} from "react-toastify";
import ProtectedRoutes from './Components/ProtectedRoutes';
import Aboutus from './Components/Aboutus'

function App() {
  return (
    <div>
      <ToastContainer />
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginFormik />}/>
        <Route path="/register" element={<RegisterFormik />}/>
        <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<Home />}/>
          </Route>
          <Route element={<ProtectedRoutes />}>
        <Route path="/about" element={<Aboutus />}/>
          </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
