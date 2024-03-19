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

import BorderColorIcon from "@mui/icons-material/BorderColor";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useRouter } from "next/navigation";

const UpdateDes = ({ selectedDesData, close }: any) => {
  const auth: any = useAuth();
  const router = useRouter();
  const [updateRoleData, setUpdateData] = useState({
    id: selectedDesData.designationId ? selectedDesData.designationId : "",
    name: selectedDesData.name ? selectedDesData.name : "",
  });

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const config = {
      url: `/api/v1/designation`,
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
    router.refresh();
    close();
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
        Update Designation
      </Typography>
      <Grid container spacing={2} my={1}>
        <Grid item lg={8} xs={8}>
          <FormControl fullWidth>
            <Typography variant="body1" fontWeight={"bold"}>
              Designation
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
            disabled={updateRoleData.name === selectedDesData.name}
            variant="contained"
            onClick={handleUpdate}
          >
            <ModeEditIcon sx={{ mr: 1 }} /> Update
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpdateDes;
