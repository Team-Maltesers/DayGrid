import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "../utils/http";
import classes from "../styles/MyPage.module.css";
import formatDay from "../utils/formatDay";
import editIcon from "../assets/image/edit-button.png";
import check from "../assets/image/change-check.png";
import cross from "../assets/image/cancel.png";
import lock from "../assets/image/lock.png";

interface UserInfo {
  name: string;
  password: string;
  birthday: string;
}

function MyPageForm(): JSX.Element {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    password: "",
    birthday: new Date().toISOString(),
  });
  const [isNameEdited, setIsNameEdited] = useState<boolean>(false);
  const [changeName, setChangeName] = useState<string>("");
  const [isPasswordEdited, setIsPasswordEdited] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<string>("");
  const [isBirthdayEdited, setIsBirthdayEdited] = useState<boolean>(false);
  const [changeBirthday, setChangeBirthday] = useState<string>("");

  const { data } = useQuery<UserInfo>({
    queryKey: ["userInfo", 1],
    queryFn: () =>
      fetchUserInfo({
        id: 1,
      }),
  });

  function handleEditBtnClick(e: React.MouseEvent<HTMLImageElement>) {
    const target = e.target as HTMLElement;

    if (target.id === "name") {
      setIsNameEdited(true);
      setIsPasswordEdited(false);
      setIsBirthdayEdited(false);
    } else if (target.id === "password") {
      setIsNameEdited(false);
      setIsPasswordEdited(true);
      setIsBirthdayEdited(false);
    } else {
      setIsNameEdited(false);
      setIsPasswordEdited(false);
      setIsBirthdayEdited(true);
    }
  }

  function handleEditInfo(e: React.MouseEvent<HTMLImageElement>) {
    const target = e.target as HTMLElement;

    if (target.id === "editName") {
      if (changeName === "") {
        alert("이름을 입력해주세요.");
      } else {
        setUserInfo({ ...userInfo, name: changeName });
        setIsNameEdited(false);
      }
    } else if (target.id === "editPassword") {
      if (changePassword === "") {
        alert("비밀번호를 입력해주세요.");
      } else {
        setUserInfo({ ...userInfo, password: changePassword });
        setIsPasswordEdited(false);
      }
    } else {
      setUserInfo({ ...userInfo, birthday: changeBirthday });
      setIsBirthdayEdited(false);
    }
  }

  useEffect(() => {
    setChangeName(userInfo.name);
  }, [userInfo.name]);

  useEffect(() => {
    setChangePassword("");
  }, [userInfo?.password]);

  useEffect(() => {
    setChangeBirthday(userInfo.birthday);
  }, [userInfo.birthday]);

  return (
    <div className={classes.mypage__info_con}>
      <div className={classes.mypage__info_row}>
        <div className={classes.mypage__info}>
          <div>이름</div>
          {isNameEdited ? (
            <input
              type="text"
              value={changeName}
              className={classes.mypage__input}
              onChange={(e) => setChangeName(e.target.value)}
            />
          ) : (
            <div>{userInfo.name}</div>
          )}
        </div>
        {isNameEdited ? (
          <div className={classes.mypage__edit_btn_con}>
            <img
              src={check}
              id="editName"
              alt="수정 완료 버튼"
              onClick={(e) => handleEditInfo(e)}
            />
            <img
              src={cross}
              alt="수정 취소 버튼"
              onClick={() => {
                setChangeName(userInfo.name);
                setIsNameEdited(false);
              }}
            />
          </div>
        ) : (
          <img
            src={editIcon}
            id="name"
            alt="이름 수정 버튼"
            onClick={(e) => handleEditBtnClick(e)}
          />
        )}
      </div>
      <div className={classes.mypage__info_row}>
        <div className={classes.mypage__info}>
          <div>이메일</div>
          <div>test123@gmail.com</div>
        </div>
      </div>
      <div className={classes.mypage__info_row}>
        <div className={classes.mypage__info}>
          <div>비밀번호</div>
          {isPasswordEdited ? (
            <input
              type="password"
              className={classes.mypage__input}
              onChange={(e) => setChangePassword(e.target.value)}
            />
          ) : (
            <div>
              <img src={lock} alt="자물쇠 아이콘" />
            </div>
          )}
        </div>
        {isPasswordEdited ? (
          <div className={classes.mypage__edit_btn_con}>
            <img
              src={check}
              id="editPassword"
              alt="수정 완료 버튼"
              onClick={(e) => handleEditInfo(e)}
            />
            <img
              src={cross}
              alt="수정 취소 버튼"
              onClick={() => {
                setChangePassword("");
                setIsPasswordEdited(false);
              }}
            />
          </div>
        ) : (
          <img
            src={editIcon}
            id="password"
            alt="비밀번호 수정 버튼"
            onClick={(e) => handleEditBtnClick(e)}
          />
        )}
      </div>
      <div className={classes.mypage__info_row}>
        <div className={classes.mypage__info}>
          <div>생년월일</div>
          {isBirthdayEdited ? (
            <input
              type="date"
              value={formatDay(new Date(changeBirthday))}
              className={classes.mypage__input}
              onChange={(e) => setChangeBirthday(e.target.value)}
            />
          ) : (
            <div>
              {new Date().toLocaleString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          )}
        </div>
        {isBirthdayEdited ? (
          <div className={classes.mypage__edit_btn_con}>
            <img src={check} alt="수정 완료 버튼" onClick={(e) => handleEditInfo(e)} />
            <img
              src={cross}
              id="editBirthday"
              alt="수정 취소 버튼"
              onClick={() => {
                setChangeBirthday(userInfo.birthday);
                setIsBirthdayEdited(false);
              }}
            />
          </div>
        ) : (
          <img
            src={editIcon}
            id="birthday"
            alt="생일 수정 버튼"
            onClick={(e) => handleEditBtnClick(e)}
          />
        )}
      </div>
    </div>
  );
}

export default MyPageForm;
