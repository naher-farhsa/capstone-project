"use client";
import { useState } from "react";
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
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Signup() {
  const router = useRouter();
  //  verift access token
  // const accessToken = localStorage.getItem("accessToken");

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/register`;
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [checknox, setChecknox] = useState(false);

  const handleRegister = (e) => {
    if (!fullName || !email || !password) {
      alert("Please fill all the fields");
      e.preventDefault();
      return;
    }

    if (!checknox) {
      alert("Please agree to the terms and conditions");
      e.preventDefault();
      return;
    }

    if (password !== cpassword) {
      alert("Password and confirm password do not match");
      e.preventDefault();
      return;
    }

    e.preventDefault();
    //  api post request
    axios
      .post(url, {
        fullName,
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.status === 201) {
          alert("User created successfully");
          router.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // clear form
    setFullname("");
    setEmail("");
    setPassword("");
    setCpassword("");
    setChecknox(false);
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-10 mx-auto">
      <h1 className="font-semibold text-4xl bg-gradient-to-r from-light-green-500 to-light-green-200 text-transparent bg-clip-text">
        Welcome to PennyTrack
      </h1>
      {/* Sign Up Card */}
      <Card className="w-96 bg-[#1c1c1c] text-white">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="light-green">
            Sign Up
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            value={fullName}
            onChange={(e) => setFullname(e.target.value)}
            label="Name"
            size="lg"
            color="white"
          />
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
          <Input
            label="Confirm Password"
            size="lg"
            color="white"
            type="password"
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
          />
          <div className="-ml-2.5">
            <Checkbox
              label="Terms and Conditions"
              color="light-green"
              className="text-white"
              labelProps={{ className: `text-light-green-500` }}
              checked={checknox}
              onChange={(e) => setChecknox(e.target.checked)}
            />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            onClick={handleRegister}
            variant="gradient"
            className="text-light-green-500"
            fullWidth
          >
            Sign Up
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Have an account?
            <Typography
              as="a"
              href="/login"
              variant="small"
              color="light-green"
              className="ml-1 font-bold"
            >
              Log In
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}
