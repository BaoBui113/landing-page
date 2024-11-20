"use client";
import React, { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/EyeFilledIcon";
import { useRouter } from "next/navigation";

import { ACCESSTOKEN } from "@/contants/common";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
interface LoginFormInputs {
  username: string;
  password: string;
}

const loginSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [isVisible, setIsVisible] = React.useState(false);
  const navigate = useRouter();
  const toggleVisibility = () => setIsVisible(!isVisible);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });


  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: data.username, password: data.password }),
      });


      if (response.ok) {
        const { access_token } = await response.json();
        if (typeof window !== "undefined") {
          localStorage.setItem(ACCESSTOKEN, access_token);
        }
        Cookies.set(ACCESSTOKEN, access_token);
        navigate.push('/admin');
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "An error occurred");
      }
    } catch {
      toast.error("An error occurred");
    }
    finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="bg-black">
      <div className="max-w-[400px] mx-auto flex flex-col justify-center h-screen">
        <div className="flex gap-2 mb-4 items-center">
          <span className="text-white font-bold text-xl">Login</span>
          <p
            aria-label="emoji"
            className="ml-2 font-bold text-xl w-8 h-8"
            role="img"
          >
            👋
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 flex flex-col gap-2">
            <Input placeholder="Username" {...register("username")} />
            {errors.username && (
              <span className="text-red-500 text-sm ml-2">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <Input
              className="w-full"
              {...register("password")}
              placeholder="Enter your password"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />
            {errors.password && (
              <span className="text-red-500 text-sm ml-2">
                {errors.password.message}
              </span>
            )}
          </div>
          <Button
            isLoading={isLoading}
            className="w-full"
            type="submit"
            color="primary"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
