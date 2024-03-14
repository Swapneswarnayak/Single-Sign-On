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
    moduleId: "",
    roleId: "",
  });
  const [moduleData, setModuleData] = useState<any>([]);
  const [roleData, setRoleData] = useState<any>([]);

  const [moduleRoleData, setModuleRoleData] = useState([]);

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
      width: 400,
    },

    {
      field: "roles",
      headerName: "Roles",
      headerClassName: "super-app-theme--header",
      width: 500,
      renderCell: (params) => {
        console.log(params, "PARAMS");
        return (
          <Typography style={{ whiteSpace: "pre-wrap" }}>
            {params.row.role.map((el: any, index: number) => (
              <React.Fragment key={el.role.id}>
                {el.role.name}
                {index < params.row.role.length - 1 && ", "}
              </React.Fragment>
            ))}
          </Typography>
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
        url: `/api/v1/module-role/create`,
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
        getModuleRole();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getModuleList = async () => {
    const config = {
      url: `/api/v1/module`,
      method: "GET",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${auth?.user?.data?.token}`,
      },
    };
    try {
      // const res = await axios.get(`${BACKEND_BASE_URL}/api/v1/module`);
      let res: any = await axiosApi(config.url, config.method, config.headers);

      setModuleData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getRoles = async () => {
    const config = {
      url: `/api/v1/role`,
      method: "GET",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${auth?.user?.data?.token}`,
      },
    };
    try {
      let res: any = await axiosApi(config.url, config.method, config.headers);
      const filterREs = res.data.filter((el: any) => el.status === true);

      setRoleData(filterREs);
    } catch (error) {
      console.error(error);
    }
  };

  const getModuleRole = async () => {
    const config = {
      url: `/api/v1/module-role`,
      method: "GET",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${auth?.user?.data?.token}`,
      },
    };
    try {
      let res: any = await axiosApi(config.url, config.method, config.headers);

      const resData: any = res.data.map((e: any, i: any) => ({
        ...e,
        id: i + 1,
      }));

      setModuleRoleData(resData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getModuleList();
    getRoles();
    getModuleRole();
  }, [auth.user?.data?.token]);

  return (
    <>
      <DashboardCard>
        <>
          <Typography variant="h4" fontWeight={"bold"} mb={3}>
            Create Modules
          </Typography>
          <Grid container spacing={1} my={2}>
            <Grid item lg={3} xs={3}>
              <FormControl fullWidth>
                <Typography variant="body1" fontWeight={"bold"}>
                  Module
                </Typography>

                <Select
                  onChange={(e) => handleFormChange("moduleId", e.target.value)}
                  size="small"
                >
                  {moduleData.map((el: any) => (
                    <MenuItem value={el.moduleId}>{el.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item lg={3} xs={3}>
              <FormControl fullWidth>
                <Typography variant="body1" fontWeight={"bold"}>
                  Roles
                </Typography>
                {/* <TextField
                  placeholder="Enter Role"
                  size="small"
                  name="name"
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  fullWidth
                /> */}
                <Select
                  onChange={(e) => handleFormChange("roleId", e.target.value)}
                  size="small"
                >
                  {roleData.map((el: any) => (
                    <MenuItem value={el.roleId}>{el.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid mt={2.5} item lg={6} xs={6}>
              <Button
                // disabled={!formData.name}
                variant="contained"
                onClick={handleSubmit}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </>
      </DashboardCard>

      <DashboardCard>
        <>
          <Typography variant="h4" fontWeight={"bold"} mb={3}>
            List Of Role
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
              rows={moduleRoleData}
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