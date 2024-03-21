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

import CloseIcon from "@mui/icons-material/Close";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const User = () => {
  const auth: any = useAuth();
  const router = useRouter();

  const [des, setDes] = useState([]);
  const [moduleRole, setModuleRoleData] = useState([]);
  const [errors, setErrors] = useState({
    email: "",
    contactNumber: "",
  });

  const [formData, setFormData] = useState<any>({
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
      width: 150,
    },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      headerClassName: "super-app-theme--header",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email Id",
      headerClassName: "super-app-theme--header",
      width: 150,
    },
    {
      field: "name",
      headerName: "Module Name",
      headerClassName: "super-app-theme--header",
      width: 200,
      renderCell: (params) => {
        return params.row.modules.map((module: any, index: any) => (
          <Typography
            key={index}
            style={{ whiteSpace: "pre-wrap" }}
            variant="body2"
          >
            {module.name}
            {index < params.row.modules.length - 1 && ", "}
          </Typography>
        ));
      },
    },
    {
      field: "designation",
      headerName: "Designation",
      headerClassName: "super-app-theme--header",
      width: 150,
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
      width: 120,
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
  const [roleId, setRoleID] = useState<any>("");
  const [moduleId, setModuleId] = useState<any>("");


  const getDes = async () => {
    const config = {
      url: `/api/v1/designation`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth?.user?.data?.token}`,
      },
    };
    try {
      let res = await axiosApi(config.url, config.method, config.headers);

      setDes(res?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMdouleRole = async () => {
    const config = {
      url: `/api/v1/module/module-role-list`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth?.user?.data?.token}`,
      },
    };
    try {
      let res = await axiosApi(config.url, config.method, config.headers);

      const filter = res.data.filter((e:any)=> e.moduleId !== moduleId)

      setModuleRoleData(filter);
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
    // else if(field==="roleId"){

    // }

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

  console.log(
    !formData.userModule.map((e: any) => e.roleId.length === 0),
    "jerhtghjrke"
  );




  return (
    <>
      <DashboardCard>
        <>
          <Typography
            mb={1}
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
                    placeholder="Enter User Name"
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
                    placeholder="Enter Email Id"
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
                    placeholder="Enter Contact No"
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
                    MenuProps={MenuProps}
                  >
                    {des.map((element: any, i: any) => (
                      <MenuItem key={i} value={element.designationId}>
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
                        const isFirstModule = index === 0;
                        const isLastModule = index === arr.length - 1;

                        return (
                          <React.Fragment key={index}>
                            <Grid item xs={4}>
                              <Typography variant="body2" fontWeight="bold">
                                Select Module
                              </Typography>
                              <Select
                                size="small"
                                onChange={(e: any) => {
                                  setModuleId(e.target.value)
                                  handleChange(
                                    index,
                                    "moduleId",
                                    e.target.value
                                  );
                                }}
                                fullWidth
                                value={userModule.moduleId}
                                MenuProps={MenuProps}
                              >
                                <MenuItem disabled value="">
                                  Select Module
                                </MenuItem>

                                {moduleRole.map((module: any) => (
                                  <MenuItem
                                    key={module.moduleId}
                                    value={module.moduleId}
                                  >
                                    {module.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Grid>
                            <Grid item xs={4}>
                              <Typography variant="body2" fontWeight="bold">
                                Select Roles
                              </Typography>

                              <Select
                                multiple
                                value={userModule.roleId}
                                onChange={(e: any) => {
                                  setRoleID(e.target.value);
                                  handleChange(index, "roleId", e.target.value);
                                }}
                                input={<OutlinedInput size="small" fullWidth />}
                                inputProps={{ "aria-label": "Without label" }}
                                MenuProps={MenuProps}
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

                            <Grid mt={2} item xs={2}>
                              {isLastModule && (
                                <Button
                                  onClick={() => {
                                    setRoleID("");
                                    handleAdd(index);
                                  }}
                                  disabled={!userModule.moduleId || !userModule.roleId.length > 0}
                                  variant="contained"
                                >
                                  Add
                                </Button>
                              )}
                            </Grid>

                            {(!isFirstModule || arr.length > 1) && (
                              <Grid mt={2} item xs={2}>
                                <Button
                                  color="error"
                                  onClick={() => {
                                    setRoleID(formData.userModule[index].roleId[index]);
                                    handleDelete(index, arr);
                                  }}
                                  variant="contained"
                                >
                                  Delete
                                </Button>
                              </Grid>
                            )}
                          </React.Fragment>
                        );
                      }
                    )}
                  </Grid>

                  <Grid
                    container
                    sx={{ display: "flex", justifyContent: "center", mt: 5 }}
                  >
                    <Button
                      type="submit"
                      onClick={handleSubmitUSer}
                      variant="contained"
                      disabled={
                        !formData.name ||
                        !formData.email ||
                        !formData.contactNumber ||
                        !formData.designationId ||
                        !!errors.email ||
                        !!errors.contactNumber ||
                        !roleId
                      }
                    >
                      Create User
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
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
                fontSize: "14px",
                fontWeight: "bold",
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
          <Dialog open={open}>
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
                close={handleDialogClose}
                updateUSerData={getAllUsers}
              />
            </DialogContent>
          </Dialog>
        </>
      </DashboardCard>
    </>
  );
};

export default User;
