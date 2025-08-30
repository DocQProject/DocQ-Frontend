import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../api";
import PostForm from "./PostForm";

export default function EditPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPostById(id).then((res) => setPost(res.data));
  }, [id]);

  if (!post) return <div className="text-center mt-20">로딩 중...</div>;

  return <PostForm post={post} />; // 수정 모드
}
