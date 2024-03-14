"use client";

import React, { useEffect, useState } from "react";
import DashboardCard from "../components/shared/DashboardCard";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axiosApi from "@/utils/axiosApi";
import { enqueueSnackbar } from "notistack";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import axios from "axios";
import { BACKEND_BASE_URL } from "@/config";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

const Page = () => {
  const auth: any = useAuth();
  const [formData, setFormData] = useState<any>({
    name: "",
  });
  const [designation, setDesgination] = useState<any>([]);

  const column: GridColDef[] = [
    {
      field: "id",
      headerName: "S.No",
      headerClassName: "super-app-theme--header",
      width: 100,
    },
    {
      field: "name",
      headerName: "Name of Role",
      headerClassName: "super-app-theme--header",
      width: 500,
    },
    {
      field: "role",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      width: 400,
      renderCell: (row: any) => {
        console.log(row, "ROW");
        return (
          <Button
            onClick={() => handleStatus(row.row.roleId)}
            variant="contained"
            color={!row.row.status ? "error" : "success"}
          >
            {row.row.status ? "Active" : "Inactive"}
          </Button>
        );
      },
    },
  ];

  const handleStatus = async (id: any) => {
    const config = {
      url: `/api/v1/role/${id}`,
      method: "PATCH",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${auth?.user?.data?.token}`,
      },
    };
    let res = await axiosApi(config.url, config.method, config.headers);

    if (res) {
      enqueueSnackbar(res.message, {
        autoHideDuration: 3000,
        variant: "success",
      });
      getDes();
    } else {
      enqueueSnackbar(res.message, {
        autoHideDuration: 3000,
        variant: "error",
      });
    }
  };

  const handleFormChange = (field: any, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const config = {
        url: `/api/v1/designation/create`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
        data: formData,
      };
      let response = await axiosApi(
        config.url,
        config.method,
        config.headers,
        config.data
      );
      if (response) {
        enqueueSnackbar(response?.message, {
          autoHideDuration: 3000,
          variant: "success",
        });

        getDes();
      }
    } catch (error: any) {
      console.error(error);
      enqueueSnackbar(error?.message, {
        autoHideDuration: 3000,
        variant: "success",
      });
    }
    setFormData({
      name: "",
    });
  };

  const getDes = async () => {
    const config = {
      url: `/api/v1/designation`,
      method: "GET",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${auth?.user?.data?.token}`,
      },
    };
    try {
      // const res = await axios.get(`${BACKEND_BASE_URL}/api/v1/role`);
      let res = await axiosApi(config.url, config.method, config.headers);

      const resData = res.data.map((e: any, i: any) => ({ ...e, id: i + 1 }));
      setDesgination(resData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDes();
  }, [auth?.user?.data?.token]);

  return (
    <>
      <DashboardCard>
        <>
          <Typography variant="h4" fontWeight={"bold"} mb={3}>
            Create Designation
          </Typography>
          {/* {data.map((ele:any, i:any) => ( */}
          <Grid container spacing={1} my={2}>
            <Grid item lg={6} xs={6}>
              <FormControl fullWidth>
                <Typography variant="body1" fontWeight={"bold"}>
                  Designation
                </Typography>
                <TextField
                  placeholder="Enter Designation"
                  size="small"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid mt={2.5} item lg={6} xs={6}>
              <Button
                disabled={!formData.name}
                variant="contained"
                onClick={handleSubmit}
              >
                Add
              </Button>
            </Grid>
          </Grid>
          {/* ))} */}
        </>
      </DashboardCard>

      <DashboardCard>
        <>
          <Typography variant="h4" fontWeight={"bold"} mb={3}>
            List Of All Designation
          </Typography>
          <Box
            sx={{
              mt: 4,
              "& .super-app-theme--header": {
                backgroundColor: "#bccdfb",
              },
            }}
          >
            <DataGrid
              rows={designation}
              columns={column}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              sx={{
                width: "1000px",
              }}
              slots={{ toolbar: GridToolbar }}
              // pageSizeOptions={[5]}
              // checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </>
      </DashboardCard>
    </>
  );
};

export default Page;
