import React, { ReactElement } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "./common/Modal";
import { diarydetail, deleteDiary } from "../utils/http";
import { useSelector } from "react-redux";
import { RootState } from "../store/store.js";
import DiaryData from "./DiaryData";

export default function DiaryDetailModal() {
  const navigate = useNavigate();
  const params = useParams(); // URL에서 다이어리의 ID를 가져옵니다.
  const diaryId = params.id; // 가져온 ID를 diaryId 변수에 저장합니다.

  const { data: diaryData, isPending } = useQuery({
    queryKey: ["diarydetail", diaryId],
    queryFn: ({ signal }) => diarydetail({ signal, id: diaryId }),
  });

  const { mutate } = useMutation({
    mutationFn: deleteDiary,
    onSuccess: () => {
      navigate("/diaries");
    },
  });

  const deleteHandler = () => {
    mutate({
      id: diaryId,
    });
  };

  const isOpen = useSelector((state: RootState) => state.modal.modalType); // 현재 모달 상태(열림/닫힘)를 가져옵니다.

  if (!(isOpen === "diarydetail")) {
    return null; // 모달 상태가 '닫힘'이면 렌더링하지 않습니다.
  }

  let content: ReactElement = <div></div>;
  if (isPending) {
    content = <div>로딩중이에요.</div>;
  }
  if (diaryData) {
    content = <DiaryData diaryData={diaryData} onDelete={deleteHandler} onEdit={() => {}} />;
  }

  return <Modal>{content}</Modal>;
}
