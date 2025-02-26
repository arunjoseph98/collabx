import React from 'react'
import DocsHeader from '../components/CollabXDocs/DocsHeader'
import Editor from '../components/CollabXDocs/Editor'
import "../components/CollabXDocs/styles/editorStyles.css"
const TxtEditor = () => {
  return (
    <div className="editorContainer">
      <DocsHeader initialTitle="CollabX Document" />
      <Editor />
    </div>
  )
}

export default TxtEditor