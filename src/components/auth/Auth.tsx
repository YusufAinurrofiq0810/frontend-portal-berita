"use client";

import { fetchLogin } from "@/api/auth/login";
import { fetchRegister } from "@/api/auth/register";
import { getUserToken } from "@/utils/helpers";
import { LoadingButton } from "@mui/lab";
import { Box, Container, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Auth({ pageType }: { pageType: "Login" | "Register" }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const router = useRouter();
  const isLoginPage = pageType === "Login";

  const [credentials, setCredentials] = useState<{
    email: string;
    name: string;
    password: string;
    confirm_password: string;
  }>({ email: "", name: "", password: "", confirm_password: "" });

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let response;
      if (isLoginPage) {
        response = await fetchLogin(credentials);
      } else if (!isLoginPage) {
        response = await fetchRegister(credentials);
      }
      if (response?.status === "SUCCESS") {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        response.status_code === 200 ? setIsLogin(true) : router.push("/login");
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLogin) {
      setTimeout(() => {
        router.replace("/");
      }, 500);
    }
  }, [isLogin]);

  return (
    <Container className="h-screen flex items-center justify-center">
      <Box
        width={380}
        bgcolor="#ffffff"
        borderRadius={5}
        color={"black"}
        border={"1px solid #161616"}
        textAlign={"center"}
        padding={"0px 10px"}
      >
        <h2 className="font-medium text-[36px] my-0 ml-0 mr-[4px]">
          {isLoginPage ? "Login" : "Register"}
        </h2>
        <h3 className="text-[16px] font-medium my-0 ml-0 mr-[4px]">
          {isLoginPage ? "Welcome Back !" : "Registration Account"}
        </h3>
        <div className="flex flex-col">
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            placeholder="Email"
            className="my-[2px]"
            type="email"
            onChange={(e) =>
              setCredentials((old) => ({ ...old, email: e.target.value }))
            }
          />
          {!isLoginPage && (
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              placeholder="Name"
              className="my-[2px]"
              onChange={(e) =>
                setCredentials((old) => ({ ...old, name: e.target.value }))
              }
            />
          )}
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            placeholder="Password"
            className="my-[2px]"
            type="password"
            onChange={(e) =>
              setCredentials((old) => ({ ...old, password: e.target.value }))
            }
          />
          {!isLoginPage && (
            <TextField
              id="confirm_password"
              label="Password Confirmation"
              variant="outlined"
              placeholder="Password Confirmation"
              className="my-[2px]"
              type="password"
              onChange={(e) =>
                setCredentials((old) => ({
                  ...old,
                  confirm_password: e.target.value,
                }))
              }
            />
          )}
          <LoadingButton
            loading={isLoading}
            type="submit"
            onClick={handleSubmit}
            variant="outlined"
            sx={{ marginBottom: "10px" }}
          >
            {isLoginPage ? "LOGIN" : "REGISTER"}
          </LoadingButton>
        </div>
        {isLoginPage ? (
          <p>
            Don&apos;t have an account ? <a href="/register">Register</a>
          </p>
        ) : (
          <p>
            Already have an account ? <a href="/login">Login</a>
          </p>
        )}
      </Box>
    </Container>
  );
}
