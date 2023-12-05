import { useCallback } from "react";
import { imageApi } from "../utils/http";
import ReactQuill from "react-quill";

const useImageUpload = (quillRef: React.RefObject<ReactQuill>) => {
  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      const file = input.files ? input.files[0] : null;
      if (!file) {
        return;
      }

      try {
        const res = await imageApi({ img: file });
        const imgUrl = res.imgUrl;
        const editor = quillRef.current?.getEditor();
        if (editor) {
          const range = editor?.getSelection();
          if (range) {
            editor.insertEmbed(range.index, "image", imgUrl);
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, [quillRef]);

  return imageHandler;
};

export default useImageUpload;
