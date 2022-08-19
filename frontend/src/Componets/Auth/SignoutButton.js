import React, { useEffect } from "react";
import axiosInstance from "../../apis/axios";
import { useNavigate } from "react-router-dom";

export default function SignoutButton() {
  const navigate = useNavigate();

  useEffect(() => {
    const response = axiosInstance.post("users/signout/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers["Authorization"] = null;
    navigate("/LoginPage");
  });
  return <div>로그아웃</div>;
}
