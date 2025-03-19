import React from "react";
import DocsHeader from "../../components/CollabXDocs/DocsHeader";
import Editor from "../../components/CollabXDocs/Editor";
import { useParams } from "react-router-dom";
import "../../components/CollabXDocs/styles/editorStyles.css";

const TxtEditor = ({docId}) => {
  

  return (
    <div className="editorContainer">
      <DocsHeader docId={docId} />
      <Editor docId={docId} /> 
    </div>
  );
};

export default TxtEditor;
