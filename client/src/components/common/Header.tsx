import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenuModal, menuModalState } from "../../store/modal/menuModalSlice";
import MenuModal from "./MenuModal";
import classes from "../../styles/common/Header.module.css";
import logoList from "../../assets/header/logo";
import logoName from "../../assets/header/logo-name.svg";
import hamburger from "../../assets/header/hamburger.svg";

const Header = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const menuState = useSelector(menuModalState);

  useEffect(() => {
    setIsModalOpen(menuState);
  }, [menuState]);

  return (
    <>
      <MenuModal isModalOpen={isModalOpen} />
      <div className={classes.header__bg}>
        <div className={classes.header__empty}></div>
        <div className={classes.header__logo_con}>
          <div className={classes.header__logo}>{logoList[0].logo()}</div>
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
            <button className={classes.header__btn_reverse}>로그인</button>
            <button>회원가입</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
