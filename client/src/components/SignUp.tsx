import { useNavigate } from "react-router-dom";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import SignUpForm, { FormData } from "./SignUpForm";
import Modal from "./common/Modal";
import { signup, queryClient } from "../utils/http";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store.js";
import { closeModal } from "../store/modal/modalSlice";
import classes from "../styles/SignUp.module.css";

export default function SignUpModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate, error, isError } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["signup"] });
      navigate("/");
      dispatch(closeModal());
    },
  });

  function handleSubmit(formData: FormData) {
    mutate(formData);
  }
  const isOpen = useSelector((state: RootState) => state.modal.modalType);

  if (!(isOpen === "signup")) {
    return null;
  }

  return (
    <Modal>
      <SignUpForm onSubmit={handleSubmit}>
        {isError && (
          <div className={classes.signup__error}>
            회원가입에 실패하였습니다. {error.message.includes("409") ? "중복된 이메일입니다" : " "}
          </div>
        )}
        <button type="submit">회원가입</button>
      </SignUpForm>
    </Modal>
  );
}
