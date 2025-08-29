import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPostById, deletePostById } from "../api";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPostById(id)
      .then((res) => setPost(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      deletePostById(id)
        .then(() => {
          alert("게시글이 삭제되었습니다.");
          navigate("/board");
        })
        .catch((err) => {
          console.error(err);
          alert("삭제 실패");
        });
    }
  };

  if (loading) return <div className="text-center mt-20">로딩 중...</div>;
  if (!post) return <div className="text-center mt-20">게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-3xl mx-auto mt-40 px-4">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>

      <div className="flex justify-between text-gray-600 text-sm mb-6">
        <span>작성자: {post.author}</span>
        <span>{post.createdAt}</span>
      </div>

      <div className="border-t pt-4 text-gray-800 whitespace-pre-line">
        {post.content}
      </div>

      {post.imageURLs && post.imageURLs.length > 0 && (
        <div className="flex gap-4 mt-6 flex-wrap">
          {post.imageURLs.map((img, i) => (
            <img key={i} src={img} alt={`img-${i}`} className="w-40 h-40 object-cover rounded" />
          ))}
        </div>
      )}

      <div className="flex justify-end mt-8 space-x-2">
        <button
          onClick={() => navigate("/board")}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          목록
        </button>
        <button
          onClick={() => navigate(`/posts/${id}/edit`)}
          className="px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          수정
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 border rounded bg-red-500 text-white hover:bg-red-600"
        >
          삭제
        </button>
      </div>
    </div>
  );
}
