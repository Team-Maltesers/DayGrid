import React, { useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import classes from "../styles/DiaryWrite.module.css";
import "quill/dist/quill.snow.css";
import { postDiary, queryClient } from "../utils/http";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useImageUpload from "../hooks/useImageUpload";

function DiaryWrite() {
  const navigate = useNavigate();
  const quillRef = useRef<ReactQuill | null>(null);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [previewText, setPreviewText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const imageHandler = useImageUpload(quillRef);
  const { mutate } = useMutation({
    mutationFn: postDiary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diary"] });
      navigate("/diary-list");
    },
  });
  const submitHandler = () => {
    mutate({ title: title, content: text });
  };
  const ContentChangeHandler = (value: string) => {
    setText(value);
    setIsUpdating(true);
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => {
      setPreviewText(value);
      setIsUpdating(false);
    }, 500);
  };

  const TitleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
          ["link", "image"],
          [{ align: [] }, { color: [] }, { background: [] }],
          ["clean"],
        ],
        handlers: { image: imageHandler },
      },
    }),
    [],
  );

  return (
    <>
      <div className={classes.diaryWrite__form}>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={TitleChangeHandler}
        />
        <ReactQuill
          ref={quillRef}
          style={{ width: "50vw", height: "68vh" }}
          modules={modules}
          value={text}
          theme="snow"
          onChange={ContentChangeHandler}
        />
        <div className={classes["diaryWrite__button-group"]}>
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            나가기
          </button>
          <button type="button" onClick={submitHandler}>
            제출하기
          </button>
        </div>
      </div>
      <div className={classes.diaryWrite__preview}>
        <h1 className={classes.diaryWrite__preview__title}>{title}</h1>
        <ReactQuill
          className={classes.diaryWrite__preview__content}
          value={isUpdating ? "<h1>반영중...</h1>" : previewText}
          readOnly={true}
          modules={{ toolbar: false }}
        />
      </div>
    </>
  );
}

export default DiaryWrite;
