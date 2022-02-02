import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { handlePostState, useSSRPostsState } from "../atom/postAtom";
import Post from './Post'
import Input from "./Input";

const Feed = ({ posts }) => {
  const [realtimePosts, setRealtimePosts] = useState([]);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostsState);
   
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const responseData = await response.json();
      setRealtimePosts(responseData);
      setHandlePost(false);
      setUseSSRPosts(false);
    };
    fetchPosts();
  }, [handlePost]);

  return (
    <div className='space-y-6 max-w-lg pb-24'>
      <Input />

      {!useSSRPosts
        ? realtimePosts.map((post) => <Post post={post} key={post._id} />)
        : posts.map((post) => <Post post={post} key={post._id} />)}
    </div>
  );
};

export default Feed;
