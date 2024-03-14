"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Button, Container, Grid, Typography } from "@mui/material";

import { useRouter } from "next/navigation";
// import { handleRoleClick, tokenStr } from "@/Auth";
import axios from "axios";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import { BACKEND_BASE_URL } from "@/config";

export default function SimpleSlide() {
    const [moduleList,setModuleList]=React.useState<any>([])
  const { push } = useRouter();

  const auth:any = useAuth()

  const tokenStr:any = auth.user?.data

  console.log(auth,"auth")

  React.useEffect(()=>{
    getModuleandRoles()
  },[tokenStr])


  const getModuleandRoles = async () => {

    try{

        let module = await axios.get(
            `${BACKEND_BASE_URL}/api/v1/user/module-list`,
            {
              headers: { Authorization: `Bearer ${tokenStr.token}` },
            }
          );
          console.log(module.data.data, "mod");
          setModuleList(module.data.data)

    }catch(err:any){
        console.log(err)
    }
 
    // return;
  };

  const handleClickRole = async (role: any) => {
    console.log("running");
    try{

        let res: any = await axios.post("http://localhost:8080/api/user/login", {
            email: tokenStr.email,
            role,
          });
          console.log("running1");
          handlePostUserData(res.data.user);
          // data.user.role.name = role;
          console.log(res, "responseddddd");
          // push(`http://localhost:3001/home?email=${tokenStr.email}&role=${role}`);

    }catch(err:any){
        console.log(err,"error")
    }
 
  };

  const handlePostUserData = async (user: any) => {
    try {
      let res: any = await axios.post(
        "http://192.168.0.182:3000/api/v1/user/session",
        user,
        {
          headers: { Authorization: `Bearer ${tokenStr.token}` },
        }
      );
      let sessionId: any = res.data.data.sessionId;
      console.log(res.data.data.sessionId, "hello");
    //   push(`http://localhost:3001/home?xml=${sessionId}`);
    } catch (err: any) {
      console.log(err, "error");
    }

    console.log("running2");
  };

  return (
    <Box
      sx={{
        // height: 180,
        // width: 130,
        position: "relative",
        zIndex: 1,
      }}
    >
      <Container fixed>
        <Grid container spacing={2}>
          {moduleList.map((el: any, i: any) => {
            return (
              <Grid item xs={4}>
                <Slide
                  direction={el.direction}
                  style={{ transformOrigin: "0 0 0", height: "100%" }}
                  {...(true ? { timeout: 1000 } : {})}
                  in={true}
                  mountOnEnter
                  unmountOnExit
                >
                  <Card
                    sx={{
                      minWidth: 800,
                      boxShadow:
                        "0px 2px 5px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgb(169 172 250 / 42%), 0px 1px 5px 0px rgb(120 186 246 / 61%)",
                    }}
                  >
                    <CardContent>
                      <Typography
                        sx={{
                          fontSize: 16,
                          fontWeight: 600,
                          textAlign: "center",
                          backgroundColor: "#1976D3",
                          borderRadius: "10px",
                          color: "white",
                        }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {el.name}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        A UPSC gate pass grants access for Employees and
                        Officers, containing Employees/Officers details for
                        secure entry into UPSC premises.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {el.roles.map((el2: any) => {
                        return (
                          <Button
                            size="small"
                            onClick={async () => {
                              handleClickRole(el2.name);
                            }}
                            sx={{ color: "#E1780E" }}
                          >
                            {el2.name}
                          </Button>
                        );
                      })}
                    </CardActions>
                  </Card>
                </Slide>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
