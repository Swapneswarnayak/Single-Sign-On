/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useEffect,
  useReducer,
  useMemo,
  useRef,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "../../config/axios";
import { isValidToken, setSession } from "../../utils/jwt";
import AuthReducer from "./AuthContext.reducer";
import { Alert } from "@mui/material";
import { BACKEND_BASE_URL } from "@/config";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const INITIALIZE = "INITIALIZE";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";

// const AUTO_LOGOUT_TIME = 60000; // 1 minutes in milliseconds

const illegalStateFunction = (...args: any) => {
  throw new Error("You must wrap your components in <AuthProvider />");
};

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: {},
  signIn: illegalStateFunction,
  signOut: illegalStateFunction,
  signUp: illegalStateFunction,
  resetPassword: illegalStateFunction,
};

export const AuthContext = createContext(initialState);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const useAuth = () => React.useContext(AuthContext);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const router = useRouter();
  const path = usePathname();

  const logoutTimer = useRef<NodeJS.Timeout | null>(null); // Define logoutTimer

  useEffect(() => {
    const initialize = async () => {
      try {
        // localStorage.getItem('login')
        if (localStorage.getItem("login")) {
          const info: any = JSON.parse(localStorage.getItem("login") || "");
          // const { token, data } = info
          dispatch({
            type: INITIALIZE,
            payload: {
              isInitialized: true,
              isAuthenticated: true,
              user: info,
            },
          });
          if (path == "/") {
            router.push("/dashboard");
          }
          if (localStorage.getItem("sessionObj")) {
            const sessionObject = JSON.parse(
              localStorage.getItem("sessionObj") || ""
            );
            checkSessionExist(sessionObject);
          }

          // Start the logout timer when user is authenticated
          // startLogoutTimer();
        } else {
          dispatch({
            type: INITIALIZE,
            payload: {
              isInitialized: false,
              isAuthenticated: false,
              user: null,
            },
          });
          router.push("/");
        }
      } catch (err) {
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
        // router.push("/");
      }
    };

    initialize();
  }, []);

  const checkSessionExist = async (xml: any) => {
    try {
      const response = await axios.get(
        `/api/v1/user/session/${xml?.sessionid}`
      );
      if (response.data.data != null) {
        router.push(xml?.link);
      } else {
        localStorage.removeItem("sessionObj");
      }
    } catch (err: any) {
      console.error(err, "error");
    }
  };

  const signIn = async (
    user_name: any,
    password: any,
    capchaToken: any,
    capchaCode: any
  ) => {
    dispatch({
      type: INITIALIZE,
      payload: {
        isAuthenticated: false,
        user: null,
        loading: true,
      },
    });
    try {
      let endpoint = `${BACKEND_BASE_URL}/api/v1/user/login`;

      const response = await axios.post(
        endpoint,
        {
          email: user_name,
          password: password,
          captcha: capchaCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${capchaToken}`,
          },
        }
      );

      const user = response.data;
      localStorage.setItem("login", JSON.stringify(user));

      dispatch({
        type: SIGN_IN,
        payload: {
          user: user,
          isAuthenticated: true,
          loading: false,
        },
      });
      if (response.data.success) {
        router.push("/dashboard");
      }
      // resetLogoutTimer();
      return user;
    } catch (err: any) {
      console.error("Error occurred:", err);
      return err;
    }
  };

  const signOut = () => {
    localStorage.clear();
    dispatch({ type: SIGN_OUT });
    router.push("/");
  };

  // const handleUserActivity = () => {
  //   resetLogoutTimer();
  // };

  // const startLogoutTimer = () => {
  //   logoutTimer.current = setTimeout(() => {
  //     signOut();
  //   }, AUTO_LOGOUT_TIME);
  // };

  // useEffect(() => {
  //   const onActivity = () => {
  //     handleUserActivity();
  //   };

  //   // Attach event listeners for user activity
  //   window.addEventListener("mousemove", onActivity);
  //   window.addEventListener("keydown", onActivity);

  //   // Clear timeout and reset timer on initial load
  //   // resetLogoutTimer();

  //   return () => {
  //     window.removeEventListener("mousemove", onActivity);
  //     window.removeEventListener("keydown", onActivity);
  //   };
  // }, []);

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({
          ...state,
          method: "jwt",
          signIn,
          signOut,
        }),
        [state]
      )}
    >
      {children}
    </AuthContext.Provider>
  );
}
