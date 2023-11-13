import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleMenuModal } from "../../store/modal/menuModalSlice";
import MenuModal from "./MenuModal";
import classes from "../../styles/common/Header.module.css";
import smallLogoList from "../../assets/header/logo-small";
import logoName from "../../assets/header/logo-name.svg";
import hamburger from "../../assets/header/hamburger.svg";
import { openModal } from "../../store/modal/modalSlice";
import SignUpModal from "../SignUp";
import LoginModal from "../Login";

const Header = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const dispatch = useDispatch();

  return (
    <>
      <MenuModal />
      <div className={classes.header__bg}>
        <div className={classes.header__empty}></div>
        <div className={classes.header__logo_con}>
          <div className={classes.header__logo}>{smallLogoList[0].logo()}</div>
          <div className={classes.header__logo_name}>
            <img src={logoName} />
          </div>
        </div>
        {isLoggedIn ? (
          <div className={classes.header__menu_con}>
            <img
              src={hamburger}
              className={classes.header__menu}
              onClick={() => dispatch(toggleMenuModal())}
            />
          </div>
        ) : (
          <div className={classes.header__btn_con}>
            <button
              onClick={() => dispatch(openModal("login"))}
              className={classes.header__btn_reverse}
            >
              로그인
            </button>
            <button onClick={() => dispatch(openModal("signup"))} className={classes.header__btn}>
              회원가입
            </button>
          </div>
        )}
        <LoginModal></LoginModal>
        <SignUpModal></SignUpModal>
      </div>
    </>
  );
};

export default Header;
