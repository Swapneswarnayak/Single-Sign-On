"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { IconListCheck, IconMail, IconMarquee, IconUser } from "@tabler/icons-react";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import Marquee from "react-fast-marquee"


const Profile = () => {
  const auth: any = useAuth();
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const router = useRouter();


  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src="/images/profile/user-1.jpg"
          alt="image"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>

      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>
            {auth?.user?.data?.role && auth?.user?.data?.role}
          </ListItemText>
        </MenuItem>
        <MenuItem>
        <Marquee>
          <ListItemText sx={{mr:2}}>
          {auth?.user?.data?.role && auth?.user?.data?.email}
          </ListItemText>
          </Marquee>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button
            onClick={() => router.push("/passwordReset")}
            variant="outlined"
            color="error"
            fullWidth
          >
            Reset Password
          </Button>
        </Box>
        <Box mt={1} py={1} px={2}>
          <Button
            onClick={() =>
              auth?.signOut(
                auth?.user?.message?.includes("Admin") ? "admin" : "employee"
              )
            }
            variant="outlined"
            color="primary"
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
