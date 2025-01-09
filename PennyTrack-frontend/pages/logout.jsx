"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const logout = () => {
  const router = useRouter();
  useEffect(() => {
    // get accessToken
    const accessToken = localStorage.getItem("accessToken");
    // logout post request
    axios
      .post(
        "http://localhost:8000/api/v1/users/logout",
        {},
        {
          //  send accessToken as header
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);

        // remove accessToken
        localStorage.removeItem("accessToken");
        // remove refreshToken
        localStorage.removeItem("refreshToken");
        // remove username
        localStorage.removeItem("username");
        router.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });

    // redirect to login page
    if (!accessToken) {
      router.push("/login");
    }
  }, [router]);
  return (
    <div>
      <div className="h-screen justify-center items-center font-medium text-2xl">
        You have been Logged out and being redirected to Login Page
      </div>
    </div>
  );
};

export default logout;
