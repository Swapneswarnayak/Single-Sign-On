import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import axiosApi from "@/utils/axiosApi";
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
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

const UpdateModuleRoles = ({
  selectedModuleRole,
  moduleData,
  roleData,
  close,
  updateFn
}: any) => {

  const auth:any = useAuth()

  const [formData, setFormData] = useState<any>({
    moduleId: selectedModuleRole.moduleId ? selectedModuleRole.moduleId : "",
    roleId: selectedModuleRole.role
      ? selectedModuleRole.role.map((e: any) => e.roleId)
      : [],
  });

  const handleFormChange = (field: any, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const config = {
        url: `/api/v1/module-role/update`,
        method: "PUT",
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
        // getModuleRole();
        // router.refresh()
        updateFn()
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
        variant: "error",
      });
    }
    close()
  };

  return (
    <Grid container>
      <Typography variant="h4" fontWeight={"bold"} mb={1}>
        Update Modules
      </Typography>
      <Grid container spacing={1} my={2}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <Typography variant="body1" fontWeight={"bold"}>
              Module
            </Typography>

            <Select
              onChange={(e) => handleFormChange("moduleId", e.target.value)}
              size="small"
              value={formData.moduleId}
              MenuProps={MenuProps}
              disabled
            >
              {moduleData.map((el: any, i: any) => (
                <MenuItem key={i} value={el.moduleId}>
                  {el.name}
                </MenuItem>
              ))}
            </Select>
            {/* <TextField
              value={formData.moduleId}
              onChange={(e) => handleFormChange("moduleId", e.target.value)}
              size="small"
              fullWidth
            /> */}
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <FormControl fullWidth>
            <Typography variant="body1" fontWeight={"bold"}>
              Roles
            </Typography>
            <Select
              multiple
              onChange={(e) => handleFormChange("roleId", e.target.value)}
              size="small"
              value={formData.roleId}
              MenuProps={MenuProps}
            >
              {roleData.map((el: any, i: any) => (
                <MenuItem key={i} value={el.roleId}>
                  {el.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid mt={2.5} item xs={4}>
          <Button
            disabled={!formData.moduleId || !formData.roleId}
            variant="contained"
            onClick={handleSubmit}
          >
            <ModeEditIcon sx={{ mr: 1 }} /> Update
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UpdateModuleRoles;
