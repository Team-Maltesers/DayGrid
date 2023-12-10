import React, { useState } from "react";
import classes from "../styles/SignUpForm.module.css";

export interface FormData {
  name: string;
  email: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
  agreement: boolean;
}

export interface FormErrors {
  name: string;
  email: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
  agreement: string;
}

interface SignUpFormProps {
  children: React.ReactNode;
  onSubmit: (formData: FormData) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ children, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
    agreement: false,
  });
  const validateForm = () => {
    const errors = {
      name: "",
      email: "",
      birthDate: "",
      password: "",
      confirmPassword: "",
      agreement: "",
    };

    // 이메일 유효성 검사
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "유효한 이메일 주소를 입력해주세요.";
    }

    // 비밀번호 유효성 검사
    if (formData.password.length < 8) {
      errors.password = "비밀번호는 최소 8자 이상이어야 합니다.";
    }

    // 비밀번호 확인 유효성 검사
    if (!(formData.password === formData.confirmPassword)) {
      errors.confirmPassword = "비밀번호를 다시 한번 확인해 주세요.";
    }

    return errors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validateForm();

    setFormErrors(errors);

    if (Object.values(errors).every((x) => !x)) {
      onSubmit(formData);
    }
  };
  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: "",
    email: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
    agreement: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <form className={classes.signup__form} onSubmit={handleSubmit}>
      <div className={classes.signup__title}>회원가입</div>
      <input
        className={`${formErrors.name && classes.signup__warning}`}
        type="text"
        name="name"
        placeholder="이름"
        value={formData.name}
        onChange={handleChange}
      />
      {formErrors.name && <div className={classes.signup__error}>{formErrors.name}</div>}
      <input
        className={`${formErrors.email && classes.signup__warning}`}
        type="email"
        name="email"
        placeholder="이메일"
        value={formData.email}
        onChange={handleChange}
      />
      {formErrors.email && <div className={classes.signup__error}>{formErrors.email}</div>}
      <input
        className={`${formErrors.password && classes.signup__warning}`}
        type="password"
        name="password"
        placeholder="비밀번호 (8자 이상)"
        value={formData.password}
        onChange={handleChange}
      />
      {formErrors.password && <div className={classes.signup__error}>{formErrors.password}</div>}
      <input
        className={`${formErrors.confirmPassword && classes.signup__warning}`}
        type="password"
        name="confirmPassword"
        placeholder="비밀번호 확인"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      {formErrors.confirmPassword && (
        <div className={classes.signup__error}>{formErrors.confirmPassword}</div>
      )}
      <div className={classes.signup__birthDate}>
        <label htmlFor="birthDate">생년월일 (선택)</label>
        <input
          className={`${formErrors.birthDate && classes.signup__warning}`}
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
        />
        {formErrors.birthDate && (
          <div className={classes.signup__error}>{formErrors.birthDate}</div>
        )}
      </div>
      <div className={classes.signup__tos}>
        <input
          className={`${classes.signup__checkbox} ${
            formErrors.agreement && classes.signup__warning
          }`}
          type="checkbox"
          name="agreement"
          required
          checked={formData.agreement}
          onChange={handleChange}
        />
        <label>사이트 약관에 동의합니다.</label>
        {formErrors.agreement && (
          <div className={classes.signup__error}>{formErrors.agreement}</div>
        )}
      </div>
      {children}
    </form>
  );
};

export default SignUpForm;
