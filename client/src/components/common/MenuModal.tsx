import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenuModal, menuModalState } from "../../store/modal/menuModalSlice";
import classes from "../../styles/common/MenuModal.module.css";

type ModalStyle = {
  opacity: number;
  visibility: string;
  transition: string;
};

type Visibility = "visible" | "hidden" | "collapse" | "initial" | "inherit";

const MenuModal = (): JSX.Element => {
  const [modalStyle, setModalStyle] = useState<ModalStyle>({
    opacity: 0,
    visibility: "hidden",
    transition: "all 0.3s",
  });
  const { opacity, visibility, transition } = modalStyle;
  const dispatch = useDispatch();
  const menuState = useSelector(menuModalState);

  useEffect(() => {
    if (menuState) {
      setModalStyle({
        ...modalStyle,
        opacity: 1,
        visibility: "visible",
        transition: "all 0.3s",
      });
    } else {
      setModalStyle({
        ...modalStyle,
        opacity: 0,
        visibility: "hidden",
        transition: "all 0.3s",
      });
    }
  }, [menuState]);

  function toggleMenu(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) dispatch(toggleMenuModal());
  }

  return (
    <div
      className={classes.menu__bg}
      style={{ opacity: opacity, visibility: visibility as Visibility, transition: transition }}
      onClick={(event) => toggleMenu(event)}
    >
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
