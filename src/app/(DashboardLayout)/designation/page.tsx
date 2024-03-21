"use client";

import React, { useEffect, useState } from "react";
import DashboardCard from "../components/shared/DashboardCard";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  Grid,
  IconButton,
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

import UpdateDes from "../components/forms/UpdateDesignation/UpdateDesignation";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CloseIcon from "@mui/icons-material/Close";


const Page = () => {
  const auth: any = useAuth();
  const [formData, setFormData] = useState<any>({
    name: "",
  });
  const [designation, setDesgination] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [selectedDesData, setSelectedDesData] = useState("");

  const handleDialogClose: any = () => {
    setOpen(false);
  };

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
      width: 600,
    },
    {
      field: "role",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      width: 150,
      renderCell: (row: any) => {
        return (
          <Button
            onClick={() => handleStatus(row.row.designationId)}
            variant="contained"
            color={!row.row.status ? "error" : "success"}
          >
            {row.row.status ? "Active" : "Inactive"}
          </Button>
        );
      },
    },
    {
      field: "update",
      headerName: "Update Role",
      headerClassName: "super-app-theme--header",
      width: 150,
      renderCell: (row: any) => {
        return (
          <IconButton
            sx={{ ml: "10px" }}
            onClick={() => handleEditDesignation(row.row)}
          >
            <ModeEditIcon />
          </IconButton>
        );
      },
    },
  ];
  const handleEditDesignation = async (roleData: any) => {
    setOpen(true);
    setSelectedDesData(roleData);
  };

  const handleStatus = async (id: any) => {
    const config = {
      url: `/api/v1/designation/${id}`,
      method: "PATCH",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${auth?.user?.data?.token}`,
      },
    };

    try {
      let res = await axiosApi(config.url, config.method, config.headers);

      if (res.success) {
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
    } catch (error: any) {
      enqueueSnackbar(error.message, {
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
          Authorization: `Bearer ${auth.user.data.token}`,
        },
        data: formData,
      };
      let response = await axiosApi(
        config.url,
        config.method,
        config.headers,
        config.data
      );
      if (response.success) {
        enqueueSnackbar(response?.message, {
          autoHideDuration: 3000,
          variant: "success",
        });

        getDes();
      } else {
        enqueueSnackbar(response?.message, {
          autoHideDuration: 3000,
          variant: "error",
        });
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
          <Typography variant="h5" fontWeight={"bold"} mb={3}>
            List Of All Designation
          </Typography>
          <Box
            sx={{
              mt: 4,
              "& .super-app-theme--header": {
                backgroundColor: "#bccdfb",
                fontSize:"14px",
                fontWeight:"bold"
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

          <Dialog open={open} onClose={handleDialogClose}>
            <Button
              onClick={handleDialogClose}
              variant="contained"
              sx={{
                position: "absolute",
                backgroundColor: "red",
                right: 0,
                "&:hover": { backgroundColor: "red" },
              }}
            >
              <CloseIcon />
            </Button>
            <DialogContent>
              <UpdateDes
                selectedDesData={selectedDesData}
                close={handleDialogClose}
              />
            </DialogContent>
          </Dialog>
        </>
      </DashboardCard>
    </>
  );
};

export default Page;
