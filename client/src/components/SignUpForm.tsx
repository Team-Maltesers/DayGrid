import React, { useState } from "react";

export interface FormData {
  name: string;
  email: string;
  birthdate: string;
  password: string;
  confirmPassword: string;
  agreement: boolean;
}
interface SignUpFormProps {
  children: React.ReactNode;
  onSubmit: (formData: FormData) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ children, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    birthdate: "",
    password: "",
    confirmPassword: "",
    agreement: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(formData);
      }}
    >
      <input
        type="text"
        name="name"
        placeholder="이름"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="이메일"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="birthdate"
        placeholder="생년월일"
        value={formData.birthdate}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={formData.password}
        onChange={handleChange}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="비밀번호 확인"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      <label>
        <input
          type="checkbox"
          name="agreement"
          checked={formData.agreement}
          onChange={handleChange}
        />
        사이트 약관에 동의합니다.
      </label>
      {children}
    </form>
  );
};

export default SignUpForm;
