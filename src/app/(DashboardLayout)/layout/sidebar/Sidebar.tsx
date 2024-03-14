import { useMediaQuery, Box, Drawer, Typography } from "@mui/material";
import Logo from "../shared/logo/Logo";
import SidebarItems from "./SidebarItems";
import { Upgrade } from "./Updrade";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "@/config";

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: any;
  isSidebarOpen: boolean;
}

const Sidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
}: ItemType) => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  const [roleNum, setRoleNum] = useState([]);
  const sidebarWidth = "250px";

  const auth: any = useAuth();

  const roleID = auth?.user?.data?.user?.role;

  const role = auth?.user?.message?.includes("Admin");

  const roleOfUser: any = roleNum.find((e: any) => e._id === roleID);

  if (lgUp) {
    return (
      <Box
        sx={{
          width: {xs:sidebarWidth, md: "250px"},
          flexShrink: 0,
        }}
      >
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              width: {xs:sidebarWidth, md: "250px"},
              boxSizing: "border-box",
            },
          }}
        >
          <Box
            sx={{
              height: "100%",
            }}
          >
            <Box textAlign={"center"} marginY={2} px={3}>
              <Box>
                <Logo />
                <Typography variant="h3" fontWeight={"bold"}>
                  UPSC
                </Typography>
              </Box>
              <Typography my={1} variant="h6">
                Super Admin
              </Typography>
            </Box>

            <Box>
              <SidebarItems />
            </Box>
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: sidebarWidth,
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      {/* ------------------------------------------- */}
      {/* Logo */}
      {/* ------------------------------------------- */}
  
        <Box px={2}>
          <Box textAlign={"center"} marginY={2} px={3}>
            <h3>Single Sign On PANEL</h3>
            <h3>Super Admin</h3>
          </Box>
        </Box>
    

      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
      <SidebarItems role={roleOfUser?.name} />
    </Drawer>
  );
};

export default Sidebar;
