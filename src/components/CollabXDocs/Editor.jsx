import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { QuillBinding } from "y-quill";
import QuillCursors from "quill-cursors";
import useDocumentStore from "../../store/useDocumentStore";
import useAuthStore from "../../store/useAuthStore";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

Quill.register("modules/cursors", QuillCursors);

const Editor = ({ docId }) => {
  const quillRef = useRef(null);
  const quillInstance = useRef(null);
  const { initializeYjs, yText, awareness } = useDocumentStore();
  const { user } = useAuthStore();

  const userdata = {
    name: user.username,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
  };

  useEffect(() => {
    let cleanup;

    const init = async () => {
      cleanup = await initializeYjs(docId, userdata);
      // console.log("Y.js Initialized");
    };

    init();

    return () => {
      if (cleanup) {
        // console.log("Cleaning up Y.js connection...");
        cleanup();
      }
    };
  }, [docId]);

  useEffect(() => {
    if (yText && quillRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          cursors: true,
          toolbar: TOOLBAR_OPTIONS,
        },
      });

      new QuillBinding(yText, quillInstance.current, awareness);
      console.log("2");
    }
  }, [yText]);

  return <div ref={quillRef} />;
};

export default Editor;
