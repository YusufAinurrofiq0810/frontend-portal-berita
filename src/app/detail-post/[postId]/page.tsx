"use client";

import { fetchProfile } from "@/api/auth/profile";
import { fetchDetailPost } from "@/api/post/get-detail";
import Navbar from "@/components/navbar/Navbar";
import OnePost from "@/components/post/OnePost";
import { Post } from "@/constants/type/post";
import { User } from "@/constants/type/user";
import { CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Comments from "../../../components/comments/Comment";

export default function DetailPost({ params }: { params: { postId: number } }) {
  const [post, setPost] = useState<Post>({});
  const [user, setUser] = useState<User>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchDetailPost(params.postId)
      .then((data) => {
        setPost(data.result!.post);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });

    fetchProfile()
      .then((data) => {
        setUser(data.result?.profile ?? {});
      })
      .catch((error) => {
        setUser({});
        console.error(error);
      });
  }, []);

  if (isLoading) return <CircularProgress></CircularProgress>;

  return (
    <>
      <Navbar />
      {/* <Typography sx={{ mt: 20 }}>{params.postId}</Typography> */}
      <OnePost post={post} user={user}></OnePost>
      <Comments post={post} user={user}></Comments>
    </>
  );
}
