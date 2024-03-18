"use client";
import React, { useEffect, useState } from "react";
import DashboardCard from "../components/shared/DashboardCard";
import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import axiosApi from "@/utils/axiosApi";
import { enqueueSnackbar } from "notistack";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { BACKEND_BASE_URL } from "@/config";
import { useRouter } from "next/navigation";

const Page = () => {
  const auth: any = useAuth();
  const router = useRouter();

  console.log(auth, "AUTH");

  const [formData, setFormData] = useState({
    name: "",
    loginLink: "",
    redirectLink: "",
  });

  const [row, setRows] = useState([]);

  const column: GridColDef[] = [
    {
      field: "id",
      headerName: "S.No",
      headerClassName: "super-app-theme--header",
      width: 100,
    },
    {
      field: "name",
      headerName: "Name of Module",
      headerClassName: "super-app-theme--header",
      width: 500,
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      width: 400,

      renderCell: (rows) => {
        return rows.row.status ? (
          <Chip color="success" label="Active" />
        ) : (
          <Chip color="error" label="Inactive" />
        );
      },
    },
  ];

  const handleFormChange = (field: any, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const config = {
        url: `/api/v1/module/create`,
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.user.data?.token}`,
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
        enqueueSnackbar("Module added successfully", {
          autoHideDuration: 3000,
          variant: "success",
        });
      }
    } catch (error) {
      console.error(error);
    }
    // router.refresh()
    getModuleList();
    setFormData({
      name: "",
      loginLink: "",
      redirectLink: "",
    });
  };

  const getModuleList = async () => {
    const config = {
      url: `/api/v1/module`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.user.data?.token}`,
      },
    };
    try {
      let res = await axiosApi(config.url, config.method, config.headers);
      const rowData = res?.data.map((el: any, i: any) => ({
        ...el,
        id: i + 1,
      }));
      setRows(rowData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getModuleList();
  }, [auth.user.data?.token]);

  return (
    <DashboardCard>
      <>
        <Typography variant="h4" fontWeight={"bold"} mb={3}>
          Create Module
        </Typography>
        <Grid container spacing={2} columns={12}>
          <Grid item lg={3} xs={3}>
            <Typography variant="subtitle1" fontWeight={600} component="label">
              Name
            </Typography>
            {/* <Asterisk /> */}
            <TextField
              placeholder="Enter name"
              value={formData.name}
              size="small"
              onChange={(e: any) => handleFormChange("name", e.target.value)}
              type="text"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item lg={3} xs={3}>
            <Typography variant="subtitle1" fontWeight={600} component="label">
              URL
            </Typography>
            {/* <Asterisk /> */}
            <TextField
              value={formData.loginLink}
              placeholder="Module URL"
              onChange={(e: any) =>
                handleFormChange("loginLink", e.target.value)
              }
              size="small"
              type="text"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item lg={3} xs={3}>
            <Typography variant="subtitle1" fontWeight={600} component="label">
              Redirect URL
            </Typography>
            {/* <Asterisk /> */}
            <TextField
              value={formData.redirectLink}
              placeholder=" Redirect URL"
              onChange={(e: any) =>
                handleFormChange("redirectLink", e.target.value)
              }
              size="small"
              type="text"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item lg={6} xs={6}>
            <Button
              disabled={!formData.name || !formData.loginLink}
              variant="contained"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>

        <Grid
          item
          lg={6}
          xs={6}
          sx={{
            mt: 4,
            "& .super-app-theme--header": {
              backgroundColor: "#bccdfb",
            },
          }}
        >
          <Typography variant="h5">List of Modules</Typography>
          <DataGrid
            rows={row}
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
        </Grid>
      </>
    </DashboardCard>
  );
};

export default Page;
