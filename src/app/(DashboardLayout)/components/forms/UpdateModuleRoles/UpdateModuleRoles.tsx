import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

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
}: any) => {
  console.log(selectedModuleRole, "SELECTED  MODULE ROLE ");

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
  return (
    <Grid container>
      <Typography variant="h4" fontWeight={"bold"} mb={1}>
        Update Modules
      </Typography>
      <Grid container spacing={1} my={2}>
        <Grid item xs={5}>
          <FormControl fullWidth>
            <Typography variant="body1" fontWeight={"bold"}>
              Module
            </Typography>

            <Select
              onChange={(e) => handleFormChange("moduleId", e.target.value)}
              size="small"
              value={formData.moduleId}
              MenuProps={MenuProps}
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

        <Grid item xs={5}>
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
        <Grid mt={2.5} item xs={2}>
          <Button
            disabled={!formData.moduleId || !formData.roleId}
            variant="contained"
            // onClick={handleSubmit}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UpdateModuleRoles;
