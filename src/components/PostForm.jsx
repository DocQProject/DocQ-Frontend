import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost, editPostById, fetchCreatePostImage } from "../api";

function ImageUpload({ imgPath, setImgPath }) {
  function addImage(e) {
    const files = Array.from(e.target.files);
    setImgPath((prev) => [...prev, ...files]);
    e.target.value = "";
  }

  function handleDeleteImage(index) {
    setImgPath((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-row mt-10 gap-3">
      {imgPath.map((item, index) => {
        const previewUrl = item instanceof File ? URL.createObjectURL(item) : item;
        return (
          <div key={index} className="relative">
            <img
              src={previewUrl}
              alt="사진"
              className="w-30 h-30 object-cover rounded cursor-pointer"
            />
            <button
              type="button"
              className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1"
              onClick={() => handleDeleteImage(index)}
            >
              X
            </button>
          </div>
        );
      })}
      <label
        className="inputFileLabel px-5 py-10 border border-gray-500 rounded"
        htmlFor="inputForm"
      >
        이미지 추가
        <input
          id="inputForm"
          type="file"
          accept="image/*"
          name="file"
          className="hidden"
          onChange={addImage}
        />
      </label>
    </div>
  );
}


export default function PostForm({ post }) {
  const isEdit = !!post;
  const navigate = useNavigate();

  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [imgPath, setImgPath] = useState(post?.imageURLs || []); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const payload = { title, content };

    const request = isEdit
      ? editPostById(post.id, payload)
      : createPost(payload);

    request
      .then((res) => {
        const newPostId = isEdit ? post.id : res.data.id;
        if (!newPostId) throw new Error("postId 없음");

        const newFiles = imgPath.filter((item) => item instanceof File);

        if (newFiles.length > 0) {
          return Promise.all(
            newFiles.map((file) => fetchCreatePostImage(file, newPostId))
          ).then(() => newPostId);
        }

        return newPostId;
      })
      .then((postId) => {
        alert(isEdit ? "게시글이 수정되었습니다." : "게시글이 작성되었습니다.");
        navigate(`/posts/${postId}`);
      })
      .catch((err) => {
        console.error(err);
        alert(isEdit ? "게시글 수정 실패" : "게시글 작성 실패");
      });
  };

  return (
    <div className="max-w-3xl mx-auto mt-40 px-4">
      <h2 className="text-2xl font-bold mb-6">
        {isEdit ? "게시글 수정" : "새 글 작성"}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
        />
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border px-3 py-2 rounded h-60 mb-4"
        />

        <ImageUpload imgPath={imgPath} setImgPath={setImgPath} />

        <div className="flex justify-end space-x-2 mt-6">
          <button
            type="button"
            onClick={() => navigate("/board")}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            {isEdit ? "수정" : "작성"}
          </button>
        </div>
      </form>
    </div>
  );
}

