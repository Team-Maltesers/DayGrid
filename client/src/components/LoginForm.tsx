import React, { useState } from "react";
import classes from "../styles/LoginForm.module.css";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormErrors {
  email: string;
  password: string;
}

interface LoginFormProps {
  children: React.ReactNode;
  onSubmit: (formData: LoginFormData) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ children, onSubmit }) => {
  const [LoginFormData, setLoginFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const validateForm = () => {
    const errors = {
      email: "",
      password: "",
    };

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(LoginFormData.email)) {
      errors.email = "유효한 이메일 주소를 입력해주세요.";
    }

    if (!LoginFormData.password) {
      errors.password = "비밀번호를 입력해주세요.";
    }

    return errors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validateForm();

    setLoginFormErrors(errors);

    if (Object.values(errors).every((x) => !x)) {
      onSubmit(LoginFormData);
    }
  };
  const [LoginFormErrors, setLoginFormErrors] = useState<LoginFormErrors>({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  return (
    <form className={classes.login__form} onSubmit={handleSubmit}>
      <div className={classes.login__title}>로그인</div>
      <input
        className={`${LoginFormErrors.email && classes.login__warning}`}
        type="email"
        name="email"
        placeholder="이메일"
        value={LoginFormData.email}
        onChange={handleChange}
      />
      {LoginFormErrors.email && <div className={classes.login__error}>{LoginFormErrors.email}</div>}
      <input
        className={`${LoginFormErrors.password && classes.login__warning}`}
        type="password"
        name="password"
        placeholder="비밀번호"
        value={LoginFormData.password}
        onChange={handleChange}
      />
      {LoginFormErrors.password && (
        <div className={classes.login__error}>{LoginFormErrors.password}</div>
      )}
      {children}
    </form>
  );
};

export default LoginForm;
