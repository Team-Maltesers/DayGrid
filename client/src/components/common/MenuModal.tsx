import React from "react";
import { useDispatch } from "react-redux";
import { toggleMenuModal } from "../../store/modal/menuModalSlice";
import classes from "../../styles/common/MenuModal.module.css";

const MenuModal = (): JSX.Element => {
  const dispatch = useDispatch();

  function toggleMenu(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) dispatch(toggleMenuModal());
  }

  return (
    <div className={classes.menu__bg} onClick={(event) => toggleMenu(event)}>
      <div className={classes.menu__con}>
        <div className={classes.menu__link_con}>
          <a href="/#">달력</a>
          <a href="/#">마이페이지</a>
          <a href="/#">다이어리</a>
          <a href="/#">로그아웃</a>
        </div>
        <div className={classes.menu__bottom}>Made by. Team Maltesers 🐶</div>
      </div>
    </div>
  );
};

export default MenuModal;
