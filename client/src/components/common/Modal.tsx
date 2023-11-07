import React from "react";
import classes from "../../styles/common/Modal.module.css";
import { toggleModal } from "../../store/modal/modalSlice";
import { useDispatch } from "react-redux";

interface ModalProp {
  children: JSX.Element;
}
const Modal = ({ children }: ModalProp): JSX.Element => {
  const dispatch = useDispatch();
  const closeModal = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) dispatch(toggleModal()); // 클릭 시 모달 상태를 토글합니다.
  };
  return (
    <div className={classes.modal} onClick={closeModal}>
      <section className={classes.modal__section}>
        <button className={classes.modal__button} onClick={() => dispatch(toggleModal())}>
          <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.52601 1.39899C4.1066 1.00817 3.55186 0.795407 2.97867 0.80552C2.40548 0.815634 1.8586 1.04783 1.45323 1.4532C1.04786 1.85857 0.81566 2.40546 0.805547 2.97864C0.795434 3.55183 1.0082 4.10657 1.39901 4.52599L12.373 15.5L1.39901 26.474C1.18164 26.6765 1.00729 26.9208 0.886359 27.1922C0.765433 27.4636 0.70041 27.7566 0.695169 28.0536C0.689927 28.3507 0.744574 28.6458 0.855851 28.9213C0.967128 29.1968 1.13275 29.4471 1.34285 29.6571C1.55295 29.8672 1.8032 30.0329 2.0787 30.1441C2.35419 30.2554 2.64928 30.3101 2.94635 30.3048C3.24343 30.2996 3.5364 30.2346 3.8078 30.1136C4.0792 29.9927 4.32346 29.8184 4.52601 29.601L15.5 18.627L26.474 29.601C26.6766 29.8184 26.9208 29.9927 27.1922 30.1136C27.4636 30.2346 27.7566 30.2996 28.0537 30.3048C28.3507 30.3101 28.6458 30.2554 28.9213 30.1441C29.1968 30.0329 29.4471 29.8672 29.6572 29.6571C29.8673 29.4471 30.0329 29.1968 30.1442 28.9213C30.2555 28.6458 30.3101 28.3507 30.3049 28.0536C30.2996 27.7566 30.2346 27.4636 30.1137 27.1922C29.9927 26.9208 29.8184 26.6765 29.601 26.474L18.627 15.5L29.601 4.52599C29.9918 4.10657 30.2046 3.55183 30.1945 2.97864C30.1844 2.40546 29.9522 1.85857 29.5468 1.4532C29.1414 1.04783 28.5945 0.815634 28.0214 0.80552C27.4482 0.795407 26.8934 1.00817 26.474 1.39899L15.5 12.373L4.52601 1.39899Z"
              fill="#444444"
            />
          </svg>
        </button>
        <div className={classes.modal__content}>{children}</div>
      </section>
    </div>
  );
};

export default Modal;
