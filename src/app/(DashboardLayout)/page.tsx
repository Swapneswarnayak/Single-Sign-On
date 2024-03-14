"use client";
import { Box, Button, Typography } from "@mui/material";
import * as React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import Login from "./components/Login/Login/Login";
import Image from "next/image";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const Dashboard = () => {
  const auth: any = useAuth();
  const router: any = useRouter();

  const [Emp, setEmp] = React.useState(false);
  const [Admin, setAdmin] = React.useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) router.push("/");
  }, [auth, router]);

  const handleEmpLogin = () => {
    setEmp(true);
    setAdmin(false);
  };

  const handleAdminLogin = () => {
    setEmp(false);
    setAdmin(true);
  };

  const handleClickBack = () => {
    setAdmin(false);
    setEmp(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          width: "auto",
          height: "100vh",
          backgroundImage: `url(/Banner.png)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Login/>
      </Box>
    </>
  );
};

export default Dashboard;
