import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUserInfo, editUserInfo } from "../utils/http";
import classes from "../styles/MyPage.module.css";
import formatDay from "../utils/formatDay";
import editIcon from "../assets/image/edit-button.png";
import check from "../assets/image/change-check.png";
import cross from "../assets/image/cancel.png";
import lock from "../assets/image/lock.png";

interface UserInfo {
  name: string;
  email: string;
  birthday: string;
}

function MyPageForm(): JSX.Element | null {
  const [isNameEdited, setIsNameEdited] = useState<boolean>(false);
  const [changeName, setChangeName] = useState<string>("");
  const [isPasswordEdited, setIsPasswordEdited] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<string>("");
  const [isBirthdayEdited, setIsBirthdayEdited] = useState<boolean>(false);
  const [changeBirthday, setChangeBirthday] = useState<string>("");
  const queryClient = useQueryClient();
  const editInfoMutation = useMutation({
    mutationFn: editUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    },
  });

  const { data: userInfo } = useQuery<UserInfo>({
    queryKey: ["userInfo", 1],
    queryFn: () => fetchUserInfo(),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (userInfo !== undefined) {
      setChangeName(userInfo.name);
      setChangeBirthday(userInfo.birthday);
    }
  }, [userInfo]);

  if (userInfo === undefined) {
    return null;
  }

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
        if (userInfo !== undefined) {
          editInfoMutation.mutate({ name: changeName });
          setIsNameEdited(false);
        } else {
          console.log("유저 정보가 제대로 입력되지 않았습니다.");
        }
      }
    } else if (target.id === "editPassword") {
      if (changePassword === "") {
        alert("비밀번호를 입력해주세요.");
      } else {
        if (userInfo !== undefined) {
          editInfoMutation.mutate({ password: changePassword });
          setIsPasswordEdited(false);
        } else {
          console.log("유저 정보가 제대로 입력되지 않았습니다.");
        }
      }
    } else {
      if (userInfo !== undefined) {
        editInfoMutation.mutate({ birthday: changeBirthday });
        setIsBirthdayEdited(false);
      } else {
        console.log("유저 정보가 제대로 입력되지 않았습니다.");
      }
    }
  }

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
          <div>{userInfo.email}</div>
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
              {new Date(userInfo.birthday).toLocaleString("ko-KR", {
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
