"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import RefreshIcon from "@mui/icons-material/Refresh";

import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
  styled,
  TextField,
  Tooltip,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";

import Image from "next/image";
import Link from "next/link";
import { enqueueSnackbar } from "notistack";
import svgCaptcha from "svg-captcha";
import axiosApi from "@/utils/axiosApi";

const emailValidationRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const mobileValidationRegex =
  /^((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}$/;

function EmpLogin({ back }: any) {
  const auth:any = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState<number>();
  const [inputCaptcha, setInputCaptcha] = useState<any>("");
  const [captchaCode, SetCaptchaCode] = useState<any>("");
  const [tryagain, setTryagain] = useState<any>(false);
  const [password, setPassword]: any = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [captchaText, setCaptchaText] = useState("");


  const handleClickShowPassword = () => setShowPassword(!showPassword);

  // const refreshCapcha = () => {
  //   SetCaptchaCode(Math.random().toString(36).substr(2, 6));
  // };
  // useEffect(() => {
  //   SetCaptchaCode(Math.random().toString(36).substr(2, 6));
  // }, []);



  const loginUser = async () => {
    if (password == "" || inputCaptcha == "") {
      regenerateCaptcha()

      enqueueSnackbar("Please fill all fields", {
        autoHideDuration: 3000,
        variant: "error",
      });
      return;
    } else if (captchaText !== inputCaptcha) {
      
      regenerateCaptcha()
      enqueueSnackbar("Please Enter Correct Captcha", {
        autoHideDuration: 3000,
        variant: "error",
      });
      return;
    }

    const res: any = await auth.signIn(email, password);

    if (res.success) {
      enqueueSnackbar(res?.message, {
        autoHideDuration: 3000,
        variant: "success",
      });
    } else {
      enqueueSnackbar("Please try to login with correct credentials", {
        autoHideDuration: 3000,
        variant: "error",
      });
    }
  };

  const Heading1 = styled(Typography)(({ theme }: any) => ({
    padding: theme.spacing(1),
    color: "black",
    fontFamily: "Nunito, sans-serif",
    lineHeight: "41.72px",
    fontWeight: 700,
  }));

  const LoginButton = styled(Button)`
    width: auto;
    height: auto;

    background: #e15a11;
    font-weight: 600;
    font-family: "Nunito", sans-serif;
    font-size: 20px;
    box-shadow: 0px 0px 19px -10px rgba(215, 215, 215, 0.25);
    color: white;
    &:hover {
      background-color: #e15a11;
    }
  `;

  const ResendOTP = styled(Typography)`
    width: 150px;
    height: 22px;
    font-family: "Nunito", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 22px;
    text-decoration-line: underline;
    color: #1e88e5;
    cursor: pointer;
    margin: auto;
    text-align: center;
    justify-content: center;
  `;

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };


  function generateCaptcha() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setCaptchaText(captcha);
    return captcha;
  }

  function regenerateCaptcha() {
    setCaptchaText(generateCaptcha());
  }

 


  const getCapcha = async () => {
    const config = {
      url: `/api/v1/user/capcha`,
      method: "GET",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${auth?.user?.data?.token}`,
      },
    };
    try {
      let res: any = await axiosApi(config.url, config.method, config.headers);


      console.log(res," CAPCHA RESSSSSSSSSSSSs")
    
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    generateCaptcha();
    // getCapcha()
  }, []);

  return (
    <Box>
      <Box
        sx={{
          background: "#000000b3",
          width: "auto",
          height: "100vh",
          top: "0",
          left: "0",
          borderRadius: "0",
          color: "#ffffff",
          padding: "40px",
          zIndex: "777",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image src="/GovLogo__2_.png" width={50} height={70} alt={""} />
        </Box>

        <Box
          sx={{
            // flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Heading1
            sx={{
              color: "#fff900",
              lineHeight: "28px",
              fontSize: {
                xs: "11.26",
                sm: "11.26",
                md: "15.26px",
                lg: "17.26px",
                xl: "17.26px",
              },
            }}
          >
            UNION PUBLIC SERVICE COMMISSION
          </Heading1>
        </Box>
        <Typography
          sx={{
            letterSpacing: "0em",
            textAlign: "center",
            lineHeight: "30px",

            justifyContent: "center",
          }}
        >
          (Admin Panel)
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: "Nunito",
              fontSize: "20px",
              fontWeight: "600",
              lineHeight: "19px",
              letterSpacing: "0em",
              textAlign: "center",
              justifyContent: "center",
              marginTop: "7px",
              mb: 2,
              color: "#fff900",
            }}
          >
            Super Admin Login
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ lineHeight: "9px" }}>
            User Name (6 Digit Id)
          </Typography>
          <OutlinedInput
            // id="outlined-adornment-weight"
            type={"email"}
            placeholder="Enter Email Id"
            size="small"
            value={email}
            sx={{
              width: "100%",
              background: "white",
              marginBottom: "8px",
              mt: 2,
            }}
            onChange={(e: any) => setEmail(e.target.value)}
          />

          <Typography variant="body1" sx={{ lineHeight: "9px", mt: 1 }}>
            Password
          </Typography>

          <OutlinedInput
            // id="outlined-adornment-weight"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            size="small"
            value={password}
            sx={{
              width: "100%",
              background: "white",
              marginBottom: "8px",
              mt: 2,
            }}
            onChange={(e: any) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {!showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <Box
            sx={{
              width: "500px",
              display: "flex",
              justifyContent: "space-between",
              mt: "20px",
            }}
          >
            <TextField
              id="outlined-basic"
              placeholder="Enter Captcha"
              autoComplete="off"
              // variant="outlined"
              type="text"
              onPaste={(event: any) => {
                event.preventDefault();
                return false;
              }}
              onDrop={(event: any) => {
                event.preventDefault();
                return false;
              }}
              onKeyDown={(event: any) => {
                if (event.key == "Enter") {
                  // handleLogin()
                }
              }}
              value={inputCaptcha}
              sx={{ width: "55%", background: "white" }}
              onChange={(event: any) => {
                setInputCaptcha(event.target.value);
              }}
              inputProps={{
                style: {
                  height: "45px",
                  padding: "0 14px",
                },
              }}
            ></TextField>

            <Box
              sx={{
                width: "40%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Box
                sx={{
                  fontWeight: 600,
                  height: "100%",
                  width: "100%",
                  backgroundColor: "grey",
                  color: "white",
                  borderRadius: "4px",
                  cursor: "not-allowed",
                }}
              >
                {/* <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    p: 1.2,
                    fontSize: "20px",
                    width: "fit-content",
                    margin: "auto",
                    height: "45px",
                    color: "white",
                    borderRadius: "4px",
                    cursor: "not-allowed",
                  }}
                  fontFamily="Nunito"
                >
                  {captchaCode}
                </Typography> */}

                <svg
                  width="190"
                  height="40"
                  style={{
                    userSelect: "none",
                  }}
                >
                  <rect width="100%" height="100%" fill="white" />
                  {captchaText.split("").map((char, index) => (
                    <text
                      key={index}
                      x={index * 30 + 15}
                      y="30"
                      fontSize="22"
                      fill="black"
                      transform={`rotate(${Math.random() * 20 - 10} ${
                        index * 30 + 15
                      } 50)`}

                   
                    >
                      {/* <tspan  x={index * 30 + 15} dy="0"> */}
                        {char}
                      {/* </tspan> */}
                    </text>
                  ))}
                </svg>
              </Box>
              <Tooltip title="Refresh Captcha">
                <RefreshIcon
                  onClick={regenerateCaptcha}
                  sx={{
                    fontSize: "33px",
                    color: "#E15A11",
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
            </Box>
          </Box>
          <LoginButton
            onClick={loginUser}
            size="small"
            sx={{ fontSize: "15px", py: 1, width: "100%", mt: 2 }}
          >
            Login
          </LoginButton>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "auto",
              color: "#ffffff",
            }}
          >
            <ResendOTP
              sx={{
                color: "#ffffff",
                fontSize: "12px",
                textDecoration: "none",
                mt: 2,
              }}
              variant="body1"
              onClick={() => {
                router.push("/forgot");
              }}
            >
              Forgot Password ?
            </ResendOTP>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default EmpLogin;
