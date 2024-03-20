"use client";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import axiosApi from "@/utils/axiosApi";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";

import ModeEditIcon from "@mui/icons-material/ModeEdit";


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

const UpdateUserForm = ({
  moduleRole,
  userData,
  close,
  updateUSerData,
}: any) => {
  const auth: any = useAuth();


  const [errors, setErrors] = useState({
    email: "",
    contactNumber: "",
  });

  const [formData, setFormData] = useState({
    name: userData.userName ? userData.userName : "",
    email: userData.email ? userData.email : "",
    contactNumber: userData.contactNumber ? userData.contactNumber : "",
    designation: userData.designation.name ? userData.designation.name : "",
    userModule: userData.modules.map((module: any) => {
      return {
        moduleId: module.moduleId,
        name: module.name,
        roleId: module.roles.map((e: any) => e.roleId),
      };
    }),
  });


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

  //   const handleChange = (index: any, field: any, value: any) => {
  //     const updatedUserModules = [...formData.userModule];
  //     if (field === "roleId") {
  //       updatedUserModules[index] = {
  //         ...updatedUserModules[index],
  //         [field]: value,
  //       };
  //     }

  //     updatedUserModules[index] = {
  //       ...updatedUserModules[index],
  //       [field]: value,
  //     };
  //     setFormData({
  //       ...formData,
  //       userModule: updatedUserModules,
  //     });
  //   };

  const handleUpdateUSer: any = async (e: any) => {
    e.preventDefault();

    try {
      const config = {
        url: `/api/v1/user/update`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.user?.data?.token}`,
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
        updateUSerData();
      } else {
        enqueueSnackbar(response.message, {
          autoHideDuration: 3000,
          variant: "error",
        });
      }
      close();
    } catch (error: any) {
      console.error(error);
      enqueueSnackbar(error.message, {
        autoHideDuration: 3000,
        variant: "error",
      });
    }
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
    // })
    const newArray = [...arr.slice(0, index), ...arr.slice(index + 1)];
    setFormData({
      ...formData,
      userModule: newArray,
    });
  };

  return (
    <Box >
      <Typography variant="h5" fontWeight={"bold"} mb={2}>
        Update User
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
                type="text"
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
                // disabled
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
                onChange={(e) => handleChange1("contactNumber", e.target.value)}
                error={!!errors.contactNumber}
                helperText={errors.contactNumber}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" fontWeight={"bold"}>
                Designation
              </Typography>
              <TextField
                aria-describedby="outlined-weight-helper-text"
                size="small"
                type="text"
                fullWidth
                value={formData.designation}
                onChange={(e) => handleChange1("designation", e.target.value)}
              />
            </Grid>

            {formData.userModule.map(
              (userModule: any, index: any, arr: any) => {
                const isFirstModule = index === 0;
                const isLastModule = index === arr.length - 1;
                return (
                  <>
                    <Grid item xs={4}>
                      <Typography variant="body2" fontWeight={"bold"}>
                        Module Name
                      </Typography>

                      <Select
                        size="small"
                        onChange={(e: any) => {
                          handleChange(index, "moduleId", e.target.value);
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
                      <Typography variant="body2" fontWeight={"bold"}>
                        Roles
                      </Typography>
                      <Select
                        multiple
                        value={userModule.roleId}
                        onChange={(e: any) =>
                          handleChange(index, "roleId", e.target.value)
                        }
                        input={<OutlinedInput size="small" fullWidth />}
                        inputProps={{ "aria-label": "Without label" }}
                        MenuProps={MenuProps}

                      >
                        <MenuItem disabled value="">
                          Select Module
                        </MenuItem>

                        {moduleRole
                          .filter(
                            (e: any) =>
                              e.moduleId === userModule.moduleId &&
                              e.moduleId === userModule.moduleId
                          )
                          .map((role: any) => {
                            return role.role.map((roles: any) => (
                              <MenuItem key={roles.roleId} value={roles.roleId}>
                                {roles.name}
                              </MenuItem>
                            ));
                          })}
                      </Select>
                    </Grid>

                    <Grid mt={2} item xs={2}>
                      {isLastModule && (
                        <Button
                          onClick={() => handleAdd(index)}
                          disabled={!formData}
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
      </form>

      <Box sx={{ mt: 7 }}>
        <Button
          type="submit"
          onClick={handleUpdateUSer}
          variant="contained"
          disabled={
            !formData.name ||
            !formData.email ||
            !formData.contactNumber ||
            !formData.designation ||
            !!errors.email ||
            !!errors.contactNumber ||
            !formData.userModule.length
          }
        >
          <ModeEditIcon sx={{ mr: 0.5 }} /> Update User
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateUserForm;
