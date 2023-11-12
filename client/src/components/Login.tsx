import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import Modal from "./common/Modal";
import { queryClient, login } from "../utils/http";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store.js";
import LoginForm, { LoginFormData } from "./LoginForm";
import { openModal } from "../store/modal/modalSlice";
import classes from "../styles/Login.module.css";

export default function LoginModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
      navigate("/");
    },
  });

  function handleSubmit(formData: LoginFormData) {
    mutate(formData);
  }
  const isOpen = useSelector((state: RootState) => state.modal.modalType); // 현재 모달 상태(열림/닫힘)를 가져옵니다.

  if (!(isOpen === "login")) {
    return null; // 모달 상태가 '닫힘'이면 렌더링하지 않습니다.
  }

  return (
    <Modal>
      <LoginForm onSubmit={handleSubmit}>
        <button type="submit">로그인</button>
        <Link className={classes.login__link} to="/">
          비밀번호를 잊어버리셨나요?
        </Link>
        <div className={classes.login__textBox}>
          <div className={classes.login__text}>처음이신가요?</div>
          <div
            className={classes.login__createAccount}
            onClick={() => dispatch(openModal("signup"))}
          >
            계정 생성하기
          </div>
        </div>
      </LoginForm>
    </Modal>
  );
}