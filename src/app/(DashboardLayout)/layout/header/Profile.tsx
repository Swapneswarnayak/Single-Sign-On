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
import {
  IconListCheck,
  IconMail,
  IconMarquee,
  IconUser,
} from "@tabler/icons-react";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import Marquee from "react-fast-marquee";

import LockResetIcon from "@mui/icons-material/LockReset";
import LogoutIcon from "@mui/icons-material/Logout";

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
            <ListItemText sx={{ mr: 2 }}>
              {auth?.user?.data?.role && auth?.user?.data?.email}
            </ListItemText>
          </Marquee>
        </MenuItem>

        <MenuItem sx={{ my: 1 }}>
          <ListItemIcon>
            <LockResetIcon />
          </ListItemIcon>
          <ListItemText
            onClick={() => router.push("/passwordReset")}
            sx={{ mr: 2 }}
          >
            Reset Password
          </ListItemText>
        </MenuItem>

        <MenuItem sx={{ my: 1 }}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText onClick={() => auth?.signOut()} sx={{ mr: 2 }}>
            Logout
          </ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Profile;
