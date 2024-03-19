import React, { useState, useEffect } from "react";
import { Menuitems, MenuitemsforUser } from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const auth: any = useAuth();
  const pathname = usePathname();
  const pathDirect = pathname;

  const userRole = auth?.user?.data?.role;


  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">

        {userRole == "user" ? (
          MenuitemsforUser.map((item: any) => (
            <NavItem
              item={item}
              key={item.id}
              pathDirect={pathDirect}
              onClick={toggleMobileSidebar}
            />
          ))
        ) : userRole == undefined ? (
          <></>
        ) : (
          Menuitems.map((item: any) => (
            <NavItem
              item={item}
              key={item.id}
              pathDirect={pathDirect}
              onClick={toggleMobileSidebar}
            />
          ))
        )}
      </List>
    </Box>
  );
};
export default SidebarItems;
