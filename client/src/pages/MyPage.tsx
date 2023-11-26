import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../store/modal/modalSlice";
import MyPageForm from "../components/MyPageForm";
import AccountDeleteModal from "../components/AccountDeleteModal";
import classes from "../styles/MyPage.module.css";

function MyPage(): JSX.Element {
  const dispatch = useDispatch();

  return (
    <>
      <div className={classes.mypage__bg}>
        <div className={classes.mypage__con}>
          <h1 className={classes.mypage__title}>내 정보</h1>
          <MyPageForm />
          <div className={classes.mypage__account_delete_con}>
            <button onClick={() => dispatch(openModal("accountDelete"))}>회원 탈퇴</button>
            <span>
              * 회원 탈퇴 후에는 모든 계정 정보가 데이터베이스로부터 삭제되며, 되돌릴 수 없습니다.
            </span>
          </div>
        </div>
      </div>
      <AccountDeleteModal />
    </>
  );
}

export default MyPage;
