import React, {useEffect, useState} from 'react'
import Sidebar from './Sidebar'
import Navbar from "./Navbar";
import axiosInstance from "../api/axios";
import { Table } from "antd";


function Home() {
  const [state, setstate] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(()=>{
    getData();
  },[])
  const getData = async () => {
    await axiosInstance.get("/user/getall").then(
      res => {
        setloading(false);
        setstate(res.data.userDetail);
        console.log(res);
      }
    );
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      width: 150
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      width: 150
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 150
    },
    {
      title: "Data Status",
      dataIndex: "dataStatus",
      width: 150
    }
  ];


  return (
    <div>
      <Navbar/>
      <Sidebar>
        <h1>List of all Users of Pixarsart</h1>
        {loading ? (
        "Loading"
      ) : (
        <Table
          columns={columns}
          dataSource={state}
        />
      )}
      </Sidebar>
    </div>
  )
}

export default Home