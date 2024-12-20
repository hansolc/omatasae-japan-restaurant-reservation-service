"use client";

import React from "react";
import InputOutlinedBottom from "./input/InputOutlinedBottom";
import { LoginFormProps } from "@/types/auth";

const LoginForm = ({ info, handleChange }: LoginFormProps) => {
  // *** Email, password Regex 규칙 추가

  return (
    <div className="flex flex-col gap-8 pt-8 w-full">
      <InputOutlinedBottom
        label="이메일"
        type="text"
        placeholder="omatasae@example.com"
        name="username"
        handleInputChange={handleChange}
        value={info.username}
      />
      <InputOutlinedBottom
        label="비밀번호"
        type="password"
        placeholder="omatase"
        name="password"
        handleInputChange={handleChange}
        value={info.password}
      />
    </div>
  );
};

export default LoginForm;
