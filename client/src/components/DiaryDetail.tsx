import React, { ReactElement } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Modal from "./common/Modal";
import { fetchDiaryDetail, deleteDiary } from "../utils/http";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store.js";
import DiaryData from "./DiaryData";
import { closeModal } from "../store/modal/modalSlice";
import { setEditingDiaryId } from "../store/diary/editingDiarySlice";

export default function DiaryDetailModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const diaryId = useSelector((state: RootState) => state.diaryId.diaryId);
  const { data: diaryData, isPending } = useQuery({
    queryKey: ["diarydetail", diaryId],
    queryFn: ({ signal }) => fetchDiaryDetail({ signal, id: diaryId }),
  });

  const { mutate } = useMutation({
    mutationFn: deleteDiary,
    onSuccess: () => {
      dispatch(closeModal());
      queryClient.invalidateQueries({ queryKey: ["diarylist"] });
      navigate("/diary-list");
    },
  });

  const deleteHandler = () => {
    mutate({
      id: diaryId,
    });
  };
  const EditHandler = () => {
    dispatch(setEditingDiaryId(diaryId));
    dispatch(closeModal());
    navigate("/diary-write");
  };

  const isOpen = useSelector((state: RootState) => state.modal.modalType);

  if (!(isOpen === "diarydetail")) {
    return null;
  }

  let content: ReactElement = <div></div>;
  if (isPending) {
    content = <div>로딩중이에요.</div>;
  }
  if (diaryData) {
    content = <DiaryData diaryData={diaryData} onDelete={deleteHandler} onEdit={EditHandler} />;
  }

  return <Modal>{content}</Modal>;
}
