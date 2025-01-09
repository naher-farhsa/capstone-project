"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";
import axios from "axios";

export default function Login() {
  const router = useRouter();

  //  verift access token
  // const accessToken = localStorage.getItem("accessToken");
  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      router.push("/dashboard");
    }
  }
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    if (!email || !password) {
      alert("Please fill all the fields");
      e.preventDefault();
      return;
    }

    e.preventDefault();
    console.log(email, password);
    //  api post request
    axios
      .post(`${url}`, {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data.data.accessToken);

        if (res.status === 200) {
          console.log(res);

          localStorage.setItem("accessToken", res.data.data.accessToken);
          localStorage.setItem("refreshToken", res.data.data.refreshToken);
          localStorage.setItem("username", res.data.data.user.username);
          localStorage.setItem("fullName", res.data.data.user.fullName);
          alert("User logged in successfully");
          router.push("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);

        alert("Invalid credentials");
      });
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-10 mx-auto">
      <h1 className="font-semibold text-4xl bg-gradient-to-r from-light-green-500 to-light-green-200 text-transparent bg-clip-text">
        Welcome Back to PennyTrack
      </h1>
      {/* Login Card */}

      <Card className="w-96 bg-[#1c1c1c] text-white">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="light-green">
            Log In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            size="lg"
            color="white"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            size="lg"
            color="white"
            type="password"
          />
          <div className="-ml-2.5">
            <Checkbox
              label="Remember Me"
              color="light-green"
              className="text-white"
              labelProps={{ className: `text-light-green-500` }}
            />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Link href="/dashboard/">
            <Button
              onClick={handleLogin}
              variant="gradient"
              className="text-light-green-500"
              fullWidth
            >
              Log In
            </Button>
          </Link>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Typography
              as="a"
              href="/signup"
              variant="small"
              color="light-green"
              className="ml-1 font-bold"
            >
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}
