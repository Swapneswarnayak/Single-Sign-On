"use client";
import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  List,
  Checkbox,
  Box,
  Typography,
  OutlinedInput,
  Select,
  MenuItem,
  ListItemText,
  TextField,
  Chip,
  Dialog,
  DialogContent,
  Modal,
} from "@mui/material";
import DashboardCard from "../components/shared/DashboardCard";
import axios from "axios";
import { BACKEND_BASE_URL } from "@/config";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import axiosApi from "@/utils/axiosApi";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import UpdateUserForm from "../components/forms/UpdateUserForm/UpdateUserForm";

import CloseIcon from '@mui/icons-material/Close';


const User = () => {
  const auth: any = useAuth();
  const router = useRouter();

  const [des, setDes] = useState([]);
  const [role, setRole] = useState([]);
  const [moduleRole, setModuleRoleData] = useState([]);
  const [errors, setErrors] = useState({
    email: "",
    contactNumber: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    designationId: "",
    userModule: [
      {
        moduleId: "",
        roleId: [],
      },
    ],
  });
  const [userData, setUserData] = useState([]);

  const [open, setOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState([]);

  const handleDialogClose: any = () => {
    setOpen(false);
  };
  const handleDialogOpen: any = () => {
    setOpen(true);
  };

  const column: GridColDef[] = [
    {
      field: "id",
      headerName: "S.No",
      headerClassName: "super-app-theme--header",
      width: 100,
    },
    {
      field: "userName",
      headerName: "User Name",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "name",
      headerName: "Module Name",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "designation",
      headerName: "Designation",
      headerClassName: "super-app-theme--header",
      width: 200,
      renderCell: (row: any) => {
        return (
          <Typography variant="body2">{row.row.designation.name}</Typography>
        );
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      headerClassName: "super-app-theme--header",
      width: 200,
      renderCell: (row) => {
        return (
          <Button onClick={() => handleUpdateUser(row.row)} variant="contained">
            Edit
          </Button>
        );
      },
    },
  ];

  const handleUpdateUser = (data: any) => {
    setSelectedUser(data);
    handleDialogOpen();
  };
  const [moduleId, setModuleID] = useState("");

  const getDes = async () => {
    try {
      const res = await axios.get(`${BACKEND_BASE_URL}/api/v1/designation`);
      setDes(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  // const getRole = async () => {
  //   try {
  //     const res = await axios.get(`${BACKEND_BASE_URL}/api/v1/role`);
  //     setRole(res?.data?.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const getModuleList = async () => {
  //   try {
  //     const res = await axios.get(`${BACKEND_BASE_URL}/api/v1/module`);
  //     setModuleData(res?.data?.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const getMdouleRole = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_BASE_URL}/api/v1/module/module-role-list`
      );
      setModuleRoleData(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllUsers = async () => {
    const config = {
      url: `/api/v1/user/list`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth?.user?.data?.token}`,
      },
    };
    try {
      let res = await axiosApi(config.url, config.method, config.headers);

      const resData = res.data.map((e: any, i: any) => ({
        ...e,
        id: i + 1,
      }));

      setUserData(resData);
    } catch (error) {
      console.error(error);
    }
  };

  const roles = [
    { name: "ASO1", roleId: 1 },
    { name: "Secretary", roleId: 2 },
    { name: "General", roleId: 3 },
    { name: "Diary Entry", roleId: 4 },
  ];

  const handleChange1 = (field: string, value: any) => {
    if (field === "email") {
      const isValidEmail = /^\S+@\S+\.\S+$/.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: isValidEmail ? "" : "Invalid email format",
      }));
    } else if (field === "contactNumber") {
      const isValidContactNumber = /^\d{10}$/.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        contactNumber: isValidContactNumber
          ? ""
          : "Invalid contact number format (10 digits)",
      }));
    }
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleChange = (index: any, field: any, value: any) => {
    const updatedUserModules = [...formData.userModule];
    if (field === "roleId") {
      updatedUserModules[index] = {
        ...updatedUserModules[index],
        [field]: value,
      };
    }

    updatedUserModules[index] = {
      ...updatedUserModules[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      userModule: updatedUserModules,
    });
  };

  const handleAdd = (index: any) => {
    const updatedUserModules = [...formData.userModule];
    updatedUserModules.splice(index + 1, 0, {
      moduleId: "",
      roleId: [],
    });
    setFormData({
      ...formData,
      userModule: updatedUserModules,
    });
  };

  const handleDelete = (index: number, arr: any) => {
    // const updatedUserModules = formData.userModule.filter(
    //   (_, i) => i !== index
    // );
    // setFormData({
    //   ...formData,
    //   userModule: updatedUserModules,
    // });

    const newArray = [...arr.slice(0, index), ...arr.slice(index + 1)];
    setFormData({
      ...formData,
      userModule: newArray,
    });
  };

  const handleSubmitUSer = async (e: any) => {
    e.preventDefault();

    try {
      const config = {
        url: `/api/v1/user/create`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

      console.log(response, "RESPONSE");
      if (response.success) {
        enqueueSnackbar(response.message, {
          autoHideDuration: 3000,
          variant: "success",
        });
        router.push("/dashboard");
      } else {
        enqueueSnackbar(response.message, {
          autoHideDuration: 3000,
          variant: "error",
        });
      }
    } catch (error: any) {
      console.error(error);
      enqueueSnackbar(error.message, {
        autoHideDuration: 3000,
        variant: "error",
      });
    }
    setFormData({
      name: "",
      email: "",
      contactNumber: "",
      designationId: "",
      userModule: [
        {
          moduleId: "",
          roleId: [],
        },
      ],
    });
  };

  useEffect(() => {
    getDes();
    getMdouleRole();
    getAllUsers();
  }, [auth?.user?.data?.token]);

  return (
    <>
      <DashboardCard>
        <>
          <Typography
            mb={2}
            variant="h5"
            fontWeight="bold"
            color="#000"
            gutterBottom
          >
            Create User
          </Typography>
          <form>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" fontWeight={"bold"}>
                    Name
                  </Typography>
                  <TextField
                    aria-describedby="outlined-weight-helper-text"
                    size="small"
                    fullWidth
                    value={formData.name}
                    onChange={(e) => handleChange1("name", e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" fontWeight={"bold"}>
                    Email
                  </Typography>
                  <TextField
                    aria-describedby="outlined-weight-helper-text"
                    type="email"
                    size="small"
                    fullWidth
                    value={formData.email}
                    onChange={(e) => handleChange1("email", e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" fontWeight={"bold"}>
                    Contact No
                  </Typography>
                  <TextField
                    aria-describedby="outlined-weight-helper-text"
                    size="small"
                    type="number"
                    fullWidth
                    value={formData.contactNumber}
                    onChange={(e) =>
                      handleChange1("contactNumber", e.target.value)
                    }
                    error={!!errors.contactNumber}
                    helperText={errors.contactNumber}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" fontWeight={"bold"}>
                    Designation
                  </Typography>

                  <Select
                    onChange={(e) =>
                      handleChange1("designationId", e.target.value)
                    }
                    value={formData.designationId}
                    fullWidth
                    size="small"
                  >
                    {des.map((element: any) => (
                      <MenuItem value={element.designationId}>
                        {element.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </Grid>

            <Grid my={2} container>
              <Grid my={2} container>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {formData.userModule.map(
                      (userModule: any, index: any, arr: any) => {
                        return (
                          <>
                            <Grid item xs={4}>
                              <Typography variant="body2" fontWeight={"bold"}>
                                Select Module
                              </Typography>
                              <Select
                                size="small"
                                onChange={(e: any) => {
                                  setModuleID(e.target.value);
                                  handleChange(
                                    index,
                                    "moduleId",
                                    e.target.value
                                  );
                                }}
                                fullWidth
                                // value={userModule.moduleId}
                              >
                                <MenuItem disabled value="">
                                  Select Module
                                </MenuItem>
                                {/* {userModule.moduleId === moduleId
                                  ?  */}
                                {moduleRole.map((module: any) => (
                                  <MenuItem
                                    key={module.moduleId}
                                    value={module.moduleId}
                                  >
                                    {module.name}
                                  </MenuItem>
                                ))}
                                {/* // : moduleRole.filter((module: any) => {
                                  //     if (userModule.moduleId !== moduleId) {
                                  //       return (
                                  //         <MenuItem
                                  //           key={module.moduleId}
                                  //           value={module.moduleId}
                                  //         >
                                  //           {module.name}
                                  //         </MenuItem>
                                  //       );
                                  //     }
                                  //   })} */}
                              </Select>
                            </Grid>
                            <Grid item xs={4}>
                              <Typography variant="body2" fontWeight={"bold"}>
                                Select Roles
                              </Typography>

                              <Select
                                multiple
                                value={userModule.roleId}
                                onChange={(e: any) => {
                                  console.log(e.target.value, "EEEEEEEEEEEE");
                                  handleChange(index, "roleId", e.target.value);
                                }}
                                input={<OutlinedInput size="small" fullWidth />}
                                inputProps={{ "aria-label": "Without label" }}
                              >
                                <MenuItem disabled value="">
                                  Select Roles
                                </MenuItem>
                                {moduleRole
                                  .filter(
                                    (e: any) =>
                                      e.moduleId === userModule.moduleId &&
                                      e.moduleId === userModule.moduleId
                                  )
                                  .map((role: any) => {
                                    return role.role.map((roles: any) => (
                                      <MenuItem
                                        key={roles.roleId}
                                        value={roles.roleId}
                                      >
                                        {roles.name}
                                      </MenuItem>
                                    ));
                                  })}
                              </Select>
                            </Grid>
                            {
                              <Grid mt={2} item xs={2}>
                                <Button
                                  onClick={() => handleAdd(index)}
                                  disabled={!formData}
                                  variant="contained"
                                >
                                  Add
                                </Button>
                              </Grid>
                            }

                            {userModule.moduleId &&
                              userModule.roleId.length > 0 &&
                              index > 0 && (
                                <Grid mt={2} item xs={2}>
                                  <Button
                                    color="error"
                                    onClick={() => handleDelete(index, arr)}
                                    variant="contained"
                                  >
                                    Delete
                                  </Button>
                                </Grid>
                              )}
                          </>
                        );
                      }
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="submit"
                onClick={handleSubmitUSer}
                variant="contained"
                disabled={
                  !formData.name ||
                  !formData.email ||
                  !formData.contactNumber ||
                  !formData.designationId ||
                  !formData.userModule ||
                  !!errors.email ||
                  !!errors.contactNumber
                }
              >
                Create User
              </Button>
            </Grid>
          </form>
        </>
      </DashboardCard>
      <DashboardCard>
        <>
          <Box
            sx={{
              "& .super-app-theme--header": {
                backgroundColor: "#bccdfb",
              },
            }}
          >
            <Typography variant="h5" fontWeight={"bold"}>
              List Of All Users
            </Typography>
            <DataGrid
              rows={userData}
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
          <Dialog open={open} >
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
              <UpdateUserForm
                userData={selectedUser}
                des={des}
                moduleRole={moduleRole}
              />
            </DialogContent>
          </Dialog>
        </>
      </DashboardCard>

      {/* {open && ( */}

      {/* )}  */}
    </>
  );
};

export default User;
