import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import axiosApi from "@/utils/axiosApi";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const auth: any = useAuth();
  const router = useRouter()

  const [dashData, setDashData] = useState<any>([]);

  const getDashboardData = async () => {
    const config = {
      url: `/api/v1/dashboard`,
      method: "GET",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${auth?.user?.data?.token}`,
      },
    };
    try {
      let res = await axiosApi(config.url, config.method, config.headers);

      setDashData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, [auth?.user?.data?.token]);

  return (
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
                {dashData?.totalModules}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              sx={{ backgroundColor: "#eee", color: "#000" }}
              onClick={()=> router.push("/module")}
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
                {dashData?.totalRoles}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              sx={{ backgroundColor: "#eee", color: "#000" }}
            //   href="/role"
              onClick={()=> router.push("/role")}
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
                {dashData?.totalUsers}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              sx={{ backgroundColor: "#eee", color: "#000" }}
            //   href="/user"
              onClick={()=> router.push("/user")}
            >
              See More
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AdminDashboard;
