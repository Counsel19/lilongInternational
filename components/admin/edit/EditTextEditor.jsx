import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import DOMPurify from "dompurify";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertFromRaw,
} from "draft-js";
import { useEffect, useState } from "react";
import TextEditorStyles from "../../../styles/admin/add/AddProduct.module.css";

const TextEditor = ({ name, newProduct, setNewProduct }) => {
  const blocksFromHTML = convertFromHTML(newProduct[name]);
  const contentState = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(contentState)
  );

  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );

  // useEffect(() => {
  //   if (newProduct[name]) {
  //     const blocksFromHTML = convertFromHTML(newProduct[name]);
  //     const contentState = ContentState.createFromBlockArray(
  //       blocksFromHTML.contentBlocks,
  //       blocksFromHTML.entityMap
  //     );
  //     setEditorState(EditorState.createWithContent(contentState, decorator));
  //   }
  // }, [newProduct]);

  const [convertedContent, setConvertedContent] = useState("");

  const handleChange = (state) => {
    console.log(state, "state");
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
    setNewProduct({ ...newProduct, [name]: currentContentAsHTML });
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <>
      <Editor
        editorState={editorState}
        toolbarClassName={TextEditorStyles.toolbarClass}
        wrapperClassName={TextEditorStyles.wrapperClass}
        editorClassName={TextEditorStyles.editorClass}
        onEditorStateChange={handleChange}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
      />
      {/* <div dangerouslySetInnerHTML={createMarkup(convertedContent)}></div> */}
    </>
  );
};

export default TextEditor;
