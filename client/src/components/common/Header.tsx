import React, { useState } from "react";
import classes from "../../styles/common/Header.module.css";
import logoList from "../../assets/logo";
import logoName from "../../assets/logo-name.svg";
import hamburger from "../../assets/hamburger.svg";

const Header = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  return (
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
          <img src={hamburger} className={classes.header__menu} />
        </div>
      ) : (
        <div className={classes.header__btn_con}>
          <button className={classes.header__btn_reverse}>로그인</button>
          <button>회원가입</button>
        </div>
      )}
    </div>
  );
};

export default Header;
