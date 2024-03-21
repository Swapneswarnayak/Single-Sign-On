"use client";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";

import axios from "axios";
import { BACKEND_BASE_URL } from "@/config";
import SimpleSlide from "../components/SimpleSlide/SimpleSlide";
import AdminDashboard from "../components/AdminDashboard/AdminDashboard";
import Image from "next/image";

const Dashboard = () => {
  const auth: any = useAuth();
  const EmpId = auth?.user?.data?.emp?._id;
  const router: any = useRouter();
  const [data, setData] = React.useState([]);
  const [roleList, setRoleList] = React.useState([]);

  const loginRole: any = auth?.user?.data?.role;

  // const getModuleList = async () => {
  //   try {
  //     const res = await axios.get(`${BACKEND_BASE_URL}/api/v1/module/module-role-list`);
  //     setData(res?.data?.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const getRoleList = async () => {
  //   try {
  //     const res = await axios.get(`${BACKEND_BASE_URL}/api/v1/role`);
  //     setRoleList(res?.data?.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // useEffect(()=>{
  //   getModuleList();
  //   getRoleList()
  // },[])

  if (loginRole == undefined) {
    return (
      <Box sx={{ width: "fit-content", margin: "10% auto" }}>
        <img src="./Spin.gif" alt="Loader" />
      </Box>
    );
  }

  return (
    <Box>
      <>
        <Box sx={{ flexGrow: 1 }}>
          {/* {loginRole != "user" ? (
            <>
              <AdminDashboard />
            </>
          ) : ( */}
          <SimpleSlide />
          {/* )} */}
        </Box>
      </>
    </Box>
  );
};

export default Dashboard;
