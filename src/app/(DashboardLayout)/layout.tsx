"use client";
import { styled, Container, Box } from "@mui/material";
import React, { useState } from "react";
import Header from "@/app/(DashboardLayout)/layout/header/Header";
import Sidebar from "@/app/(DashboardLayout)/layout/sidebar/Sidebar";
import { usePathname } from "next/navigation";
import AuthProvider, {
  useAuth,
} from "@/contexts/JWTContext/AuthContext.provider";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "#efefef",
}));

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth: any = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const path = usePathname();

  return (
    <AuthProvider>
      {path === "/" || path === "/passwordReset" || path === "/forgot" ? (
        <>
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
        </>
      ) : (
        <MainWrapper className="mainwrapper">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            isMobileSidebarOpen={isMobileSidebarOpen}
            onSidebarClose={() => setMobileSidebarOpen(false)}
          />
          <PageWrapper className="page-wrapper">
            <Header
              toggleMobileSidebar={() => setMobileSidebarOpen(true)}
              sx={{ display: "none" }}
            />

            <Container
              sx={{
                flex: 1,
                my: 2,
              }}
            >
              <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
            </Container>
          </PageWrapper>
        </MainWrapper>
      )}
    </AuthProvider>
  );
}
