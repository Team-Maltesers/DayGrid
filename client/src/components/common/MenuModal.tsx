import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenuModal, menuModalState } from "../../store/modal/menuModalSlice";
import classes from "../../styles/common/MenuModal.module.css";

type ModalStyle = {
  opacity: number;
  visibility: string;
};

type Visibility = "visible" | "hidden" | "collapse" | "initial" | "inherit";

const MenuModal = (): JSX.Element => {
  const [modalStyle, setModalStyle] = useState<ModalStyle>({
    opacity: 0,
    visibility: "hidden",
  });
  const { opacity, visibility } = modalStyle;
  const dispatch = useDispatch();
  const menuState = useSelector(menuModalState);

  useEffect(() => {
    if (menuState) {
      setModalStyle({
        ...modalStyle,
        opacity: 1,
        visibility: "visible",
      });
    } else {
      setModalStyle({
        ...modalStyle,
        opacity: 0,
        visibility: "hidden",
      });
    }
  }, [menuState]);

  function toggleMenu(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) dispatch(toggleMenuModal());
  }

  return (
    <div
      className={classes.menu__bg}
      style={{ opacity: opacity, visibility: visibility as Visibility }}
      onClick={(event) => toggleMenu(event)}
    >
      <div className={classes.menu__con}>
        <div className={classes.menu__link_con}>
          <Link to="/calendar">달력</Link>
          <Link to="/diary-list">마이페이지</Link>
          <Link to="/my-page">다이어리</Link>
          <div>로그아웃</div>
        </div>
        <div className={classes.menu__bottom}>Made by. Team Maltesers 🐶</div>
      </div>
    </div>
  );
};

export default MenuModal;
