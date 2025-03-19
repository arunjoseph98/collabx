// import React, { useEffect, useRef } from "react";
// import Quill from "quill";
// import "quill/dist/quill.snow.css";
// import { QuillBinding } from "y-quill";
// import QuillCursors from "quill-cursors";
// import useDocumentStore from "../../store/useDocumentStore";
// import useAuthStore from "../../store/useAuthStore";

// const TOOLBAR_OPTIONS = [
//   [{ header: [1, 2, 3, 4, 5, 6, false] }],
//   [{ font: [] }],
//   [{ list: "ordered" }, { list: "bullet" }],
//   ["bold", "italic", "underline"],
//   [{ color: [] }, { background: [] }],
//   [{ script: "sub" }, { script: "super" }],
//   [{ align: [] }],
//   ["image", "blockquote", "code-block"],
//   ["clean"],
// ];

// Quill.register("modules/cursors", QuillCursors);

// const Editor = ({ docId }) => {
//   const quillRef = useRef(null);
//   const quillInstance = useRef(null);
//   const { initializeYjs, yText, awareness } = useDocumentStore();
//   const { user } = useAuthStore();

//   const userdata = {
//     name: user.username,
//     color: `hsl(${Math.random() * 360}, 100%, 50%)`,
//   };

//   useEffect(() => {
//     let cleanup;

//     const init = async () => {
//       cleanup = await initializeYjs(docId, userdata);
//       console.log(yText);
      

//       if (!quillInstance.current && quillRef.current) {
//         quillInstance.current = new Quill(quillRef.current, {
//           theme: "snow",
//           modules: {
//             toolbar: TOOLBAR_OPTIONS,
//             cursors: true,
//           },
//         });

//         if (yText) {
//           new QuillBinding(yText, quillInstance.current, awareness);
//         }

//         if (awareness) {
//           setupAwarenessTracking();
//         }
//       } else {
//         console.warn("Quill is already initialized.");
//       }
//     };

//     const setupAwarenessTracking = () => {
//       const cursors = quillInstance.current.getModule("cursors");

//       awareness.on("change", () => {
//         cursors.clearCursors();

//         for (const [clientId, state] of awareness.getStates().entries()) {
//           if (state.user && state.cursor) {
//             cursors.createCursor(clientId, state.user.name, state.user.color);
//             cursors.moveCursor(clientId, state.cursor);
//           }
//         }
//       });

//       quillInstance.current.on("selection-change", (range) => {
//         if (range) {
//           awareness.setLocalStateField("cursor", {
//             index: range.index,
//             length: range.length,
//           });
//         }
//       });
//     };

//     init();

//     return () => {
//       if (cleanup) cleanup();
//     };
//   }, [docId,yText,awareness]);

//   return <div ref={quillRef} />;
// };

// export default Editor;




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

  // useEffect(() => {
  //   let cleanup;

  //   const init = async () => {
  //     cleanup = await initializeYjs(docId, userdata);

  //     if (!quillInstance.current && quillRef.current) {
  //       quillInstance.current = new Quill(quillRef.current, {
  //         theme: "snow",
  //         modules: {
  //           cursors: true,
  //           toolbar: TOOLBAR_OPTIONS,
            
  //         },
  //       });
  //     } else {
  //       console.warn("Quill is already initialized.");
  //     }
  //   };

  //   init();
  //   console.log("1");
  //   return () => {
  //     if (cleanup) cleanup();
  //   };
  // }, [docId]);

  // 🔹 Setup QuillBinding when yText is available
  // useEffect(() => {
  //   if (yText && quillInstance.current && awareness) {
  //     new QuillBinding(yText, quillInstance.current, awareness);
  //     console.log("2");
      
  //   }
  // }, [yText]); // ✅ Runs only when yText is set

  useEffect(() => {
    let cleanup;

    const init = async () => {
      cleanup = await initializeYjs(docId, userdata);
      console.log("🟢 Y.js Initialized");
    };

    init();

    return () => {
      if (cleanup) {
        console.log("🔴 Cleaning up Y.js connection...");
        cleanup();
      }
    };
  }, [docId]);

// 🔹 Initialize Quill only when yText is available
useEffect(() => {
  if (yText && quillRef.current && !quillInstance.current) {
    quillInstance.current = new Quill(quillRef.current, {
      theme: "snow",
      modules: {
        cursors: true,
        toolbar: TOOLBAR_OPTIONS,
      },
    });

    

    new QuillBinding(yText, quillInstance.current,awareness);
    console.log("2");

    // Initialize awareness cursor position
    // awareness.setLocalStateField("cursor", {
    //   index: 0,
    //   length: 0,
    // });
  }
}, [yText]);
// ✅ Ensures Quill is created only when yText is ready


  // 🔹 Setup Awareness Tracking when awareness is available
  // useEffect(() => {
  //   if (awareness && quillInstance.current) {
  //     const cursors = quillInstance.current.getModule("cursors");
  //     console.log("3");
            
  //     awareness.on("change", () => {
  //       cursors.clearCursors();
  //       for (const [clientId, state] of awareness.getStates().entries()) {
  //         if (state.user && state.cursor) {
  //           cursors.createCursor(clientId, 
  //             state.user?.name || "Unknown User", 
  //             state.user?.color || "#000");
  //             console.log("state:",state);

  //           cursors.moveCursor(clientId, state.cursor);
  //         }
  //       }
  //     });

     
  //     quillInstance.current.on("selection-change", (range) => {
  //       if (range) {
  //         awareness.setLocalStateField("cursor", {
  //           index: range.index,
  //           length: range.length,
  //         });
  //       }
  //     });
  //   }
  // }, [awareness]); // ✅ Runs only when awareness is set

  // useEffect(() => {
  //   if (awareness && quillInstance.current) {
  //     const cursors = quillInstance.current.getModule("cursors");
  //     console.log("🟣 Awareness Initialized");

  //     const handleAwarenessChange = () => {
  //       cursors.clearCursors();
  //       for (const [clientId, state] of awareness.getStates().entries()) {
  //         if (state.user && state.cursor) {
  //           cursors.createCursor(clientId, 
  //             state.user?.name || "Unknown User", 
  //             state.user?.color || "#000"
  //           );
  //           console.log("🔹 Awareness State:", state);

  //           cursors.moveCursor(clientId, state.cursor);
  //         }
  //       }
  //     };

  //     awareness.on("change", handleAwarenessChange);

  //     quillInstance.current.on("selection-change", (range) => {
  //       if (range) {
  //         awareness.setLocalStateField("cursor", {
  //           index: range.index,
  //           length: range.length,
  //         });
  //       }
  //     });

  //     return () => {
  //       awareness.off("change", handleAwarenessChange);
  //       console.log("🔴 Awareness event unsubscribed");
  //     };
  //   }
  // }, [awareness]);

  

  return <div ref={quillRef} />;
};

export default Editor;
