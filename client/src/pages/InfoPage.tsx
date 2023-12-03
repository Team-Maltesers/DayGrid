import React from "react";
import classes from "../styles/Info.module.css";
import bigLogoList from "../assets/header/logo-big";
import logoName from "../assets/header/logo-name.svg";
import info from "../assets/image/info.png";
import info2 from "../assets/image/info2.png";

function InfoPage(): JSX.Element {
  return (
    <div className={classes.info__bg}>
      <div>
        <div className={classes.info__logo}>
          <div>{bigLogoList[0].logo()}</div>
          <div className={classes.info__logo_name}>
            <img src={logoName} width="172px" height="42px" />
          </div>
        </div>
        <h1 className={classes.info__title}>온라인 캘린더 및 다이어리</h1>
        <p className={classes.info__intro}>
          DayGrid는 일상을 체계적으로 관리하고 기록할 수 있는 공간입니다. <br />
          당신의 시간을 효율적으로 활용하고, 소중한 추억도 남겨보세요.
        </p>
        <div className={classes.info__btn_con}>
          <div className={classes.info__btn}>로그인하고 시작하기</div>
          <div className={`${classes.info__btn} ${classes.info__signup}`}>
            처음이신가요?
            <span>계정 생성하기</span>
          </div>
        </div>
      </div>
      <div className={classes.info__img}>
        <img src={info}></img>
        <img src={info2}></img>
      </div>
    </div>
  );
}

export default InfoPage;
