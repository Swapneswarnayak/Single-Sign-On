"use client";
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

const UpdateUserForm = ({ moduleRole, userData }: any) => {

  console.log(userData,"USER DATA")

  const [errors, setErrors] = useState({
    email: "",
    contactNumber: "",
  });
  const [formData, setFormData] = useState({
    name: userData.userName ? userData.userName : "",
    email: userData.email ? userData.email : "",
    contactNumber: userData.contactNumber ? userData.contactNumber : "",
    designation: userData.designation.name ? userData.designation.name : "",
    moduleName: userData.name? userData.name:"",
    role: userData.roles ? userData.roles : [],
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

  const handleChange = (field: string, value: any, target: any) => {
    if (field === "role") {
      const updatedRoles: any = [...formData.role];
      if (target.selected) {
        updatedRoles.push(value);
      } else {
        const index = updatedRoles.findIndex(
          (role: any) => role.roleId === value
        );
        updatedRoles.splice(index, 1);
      }

      setFormData((prevData) => ({
        ...prevData,
        [field]: updatedRoles,
      }));
    }

    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  console.log(formData,"FORM DATA")
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
        url: `/api/v1/user/create`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${auth.user.token}`,
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
      } else {
        enqueueSnackbar(response.message, {
          autoHideDuration: 3000,
          variant: "error",
        });
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <Box>
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

            <Grid item xs={6}>
              <Typography variant="body2" fontWeight={"bold"}>
                Module Name
              </Typography>
              <TextField
                aria-describedby="outlined-weight-helper-text"
                size="small"
                type="text"
                fullWidth
                value={formData.moduleName}
                onChange={(e) => handleChange1("moduleName", e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2" fontWeight={"bold"}>
                Roles
              </Typography>
              <Select
                multiple
                value={formData.role}
                onChange={(e: any) =>
                  handleChange("role", e.target.value, e.target)
                }
                input={<OutlinedInput size="small" fullWidth />}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled value="">
                  Select Module
                </MenuItem>

                {formData.role.map((module: any) => {
                  return (
                    <MenuItem key={module.roleId} value={module}>
                      {module.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
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
            !!errors.contactNumber
          }
        >
          Update User
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateUserForm;
