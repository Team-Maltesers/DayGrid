import React from "react";
import classes from "../../styles/common/MenuModal.module.css";

const MenuModal = (): JSX.Element => {
  return (
    <div className={classes.menu__con}>
      <div className={classes.menu__link_con}>
        <div>
          <a href="/#">달력</a>
        </div>
        <div>
          <a href="/#">마이페이지</a>
        </div>
        <div>
          <a href="/#">다이어리</a>
        </div>
        <div>
          <a href="/#">로그아웃</a>
        </div>
      </div>
      <div className={classes.menu__bottom}>Made by. Team Maltesers 🐶</div>
    </div>
  );
};

export default MenuModal;
