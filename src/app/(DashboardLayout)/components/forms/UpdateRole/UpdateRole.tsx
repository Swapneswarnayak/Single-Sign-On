import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import axiosApi from "@/utils/axiosApi";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";

import ModeEditIcon from "@mui/icons-material/ModeEdit";


const UpdateRole = ({ selectedRole, close }: any) => {
  const auth: any = useAuth();
  const [updateRoleData, setUpdateData] = useState({
    id: selectedRole.roleId ? selectedRole.roleId : "",
    name: selectedRole.name ? selectedRole.name : "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const config = {
      url: `/api/v1/role`,
      method: "PUT",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${auth?.user?.data?.token}`,
      },
      data: updateRoleData,
    };
    try {
      let res = await axiosApi(
        config.url,
        config.method,
        config.headers,
        config.data
      );

      if (res?.success) {
        enqueueSnackbar(res.message, {
          autoHideDuration: 3000,
          variant: "success",
        });
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
    close()
  };

  const handleFormChange = (field: any, value: any) => {
    setUpdateData({
      ...updateRoleData,
      [field]: value,
    });
  };
  return (
    <Box width={380}>
      <Typography variant="h4" fontWeight={"bold"} mb={1}>
          Update Role
        </Typography>
      <Grid container spacing={2} my={1}>
        
        <Grid item lg={8} xs={8}>
          <FormControl fullWidth>
            <Typography variant="body1" fontWeight={"bold"}>
              Role
            </Typography>
            <TextField
              placeholder="Enter Role"
              size="small"
              name="name"
              value={updateRoleData.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid mt={2.5} item lg={4} xs={4}>
          <Button
            disabled={updateRoleData.name === selectedRole.name}
            variant="contained"
            onClick={handleSubmit}
          >
            <ModeEditIcon sx={{ mr: 1 }} /> Update
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpdateRole;
