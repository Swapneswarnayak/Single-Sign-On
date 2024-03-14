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

//ICONS
import SubtitlesOffIcon from "@mui/icons-material/SubtitlesOff";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import TelegramIcon from "@mui/icons-material/Telegram";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import PersonIcon from "@mui/icons-material/Person";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import AddTaskIcon from "@mui/icons-material/AddTask";

import axios from "axios";
import { BACKEND_BASE_URL } from "@/config";
import SimpleSlide from "../components/SimpleSlide/SimpleSlide";

const Dashboard = () => {
  const auth: any = useAuth();
  const EmpId = auth?.user?.data?.emp?._id;
  const router: any = useRouter();
  const [data,setData]=React.useState([])
  const [roleList,setRoleList]=React.useState([])
  

  const loginRole:any=auth?.user?.data?.role;

  const getModuleList = async () => {
    try {
      const res = await axios.get(`${BACKEND_BASE_URL}/api/v1/module/module-role-list`);
      setData(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getRoleList = async () => {
    try {
      const res = await axios.get(`${BACKEND_BASE_URL}/api/v1/role`);
      setRoleList(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(()=>{
    getModuleList();
    getRoleList()
  },[])

  console.log(data,"module")


  return (
    <Box>
      <>
        <Box sx={{ flexGrow: 1 }}>
         {loginRole!="user"?<>
         
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={2} sm={4} md={4}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontSize: 20, fontFamily: "Nunito" }}
                    color="#000"
                    gutterBottom
                  >
                    Total Modules
                  </Typography>

                  <Box
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      height: "80px",
                      width: "80px",
                      border: "5px solid #ebd0ce",
                      borderRadius: "100%",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                    color="text.secondary"
                  >
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ fontSize: 24, mt: "20px", fontWeight: "bold" }}
                      // color="text.secondary"
                      gutterBottom
                    >
                     {data.length}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    sx={{ backgroundColor: "#eee", color: "#000" }}
                  >
                    See More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontSize: 20, fontFamily: "Nunito" }}
                    color="#000"
                    gutterBottom
                  >
                    Total Roles
                  </Typography>

                  <Box
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      height: "80px",
                      width: "80px",
                      border: "5px solid #ebd0ce",
                      borderRadius: "100%",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                    color="text.secondary"
                  >
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ fontSize: 24, mt: "20px", fontWeight: "bold" }}
                      // color="text.secondary"
                      gutterBottom
                    >
                      {roleList.length}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    sx={{ backgroundColor: "#eee", color: "#000" }}
                  >
                    See More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontSize: 20, fontFamily: "Nunito" }}
                    color="#000"
                    gutterBottom
                  >
                    Total Users
                  </Typography>

                  <Box
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      height: "80px",
                      width: "80px",
                      border: "5px solid #ebd0ce",
                      borderRadius: "100%",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                    color="text.secondary"
                  >
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ fontSize: 24, mt: "20px", fontWeight: "bold" }}
                      // color="text.secondary"
                      gutterBottom
                    >
                      10
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    sx={{ backgroundColor: "#eee", color: "#000" }}
                  >
                    See More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
         </>: <SimpleSlide />}
          
        </Box>
      </>
    </Box>
  );
};

export default Dashboard;
