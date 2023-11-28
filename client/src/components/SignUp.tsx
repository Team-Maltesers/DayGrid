import { useNavigate } from "react-router-dom";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import SignUpForm, { FormData } from "./SignUpForm";
import Modal from "./common/Modal";
import { signup, queryClient } from "../utils/http";
import { useSelector } from "react-redux";
import { RootState } from "../store/store.js";

export default function SignUpModal() {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["signup"] });
      navigate("/");
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
        <button type="submit">회원가입</button>
      </SignUpForm>
    </Modal>
  );
}
