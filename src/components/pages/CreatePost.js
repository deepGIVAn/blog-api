import React, { useState } from "react";
// import ReactQuill from "react-quill";
import { Navigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import Editor from "../Editor";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(event) {
    const data = new FormData();

    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]); // we will use index 0, because it is basically a FileList..

    event.preventDefault();

    console.log(title, summary, content, files);
    const response = await fetch("https://blog-api-dotx.onrender.com/post", {
      method: "POST",
      body: data,
      credentials: "include", // for getting username for authors okk!!!
    });

    // console.log(await response.json());

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <form onSubmit={createNewPost}>
        <input
          type="title"
          placeholder={"Title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="summary"
          placeholder={"Summary"}
          // basically, it is a author okk!!!
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input
          type="file"
          // value={files}
          onChange={(e) => setFiles(e.target.files)}
        />
        {/* <textarea cols="30" rows="10"></textarea>, we are using */}

        {/* Yarn add React-quill */}
        {/* <ReactQuill
          value={content}
          modules={modules}
          formats={formats}
          onChange={(newValue) => setContent(newValue)}
        /> */}
        <Editor value={content} onChange={setContent} />
        <button style={{ marginTop: "1rem" }}>Create Post</button>
      </form>
    </>
  );
};

export default CreatePost;
