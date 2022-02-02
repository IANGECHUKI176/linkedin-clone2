import React, { useState } from "react";
import { useSession } from "next-auth/react";
import {useRecoilState} from 'recoil'
import {modalState} from '../atom/modalAtom'
import { handlePostState } from "../atom/postAtom";
const Form = () => {
  const [modalOpen,setModalOpen]=useRecoilState(modalState)
    const [realtimePosts, setRealtimePosts] = useState([]);
    const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [input, setInput] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const { data: session } = useSession();
  const uploadPost = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        input: input,
        photoUrl: photoUrl,
        username: session?.user?.name,
        email: session?.user?.email,
        userImg: session?.user?.image,
        createdAt: new Date().toString(),
      }),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    const responseData=await response.json()
    setHandlePost(true)
    setModalOpen(false)
  };
  return (
    <form className='flex flex-col space-y-2 text-black dark:text-white/75 relative'>
      <textarea
        placeholder='What do you want to talk about'
        row='4'
        className='bg-transparent focus:outline-none dark:placeholder-white/75'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <input
        type='text'
        placeholder='Add a photoURL *optional'
        className='bg-transparent focus:outline-none truncate max-w-xs md:max-w-sm'
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
      />
      <button
        type='submit'
        className='absolute right-0 bottom-0 font-medium bg-blue-400 hover:bg-blue-500 disabled:text-black/75 disabled:bg-white/75 disabled:cursor-not-allowed rounded-full px-4 py-1'
        disabled={!input.trim() && !photoUrl.trim()}
        onClick={uploadPost}
      >
        POST
      </button>
    </form>
  );
};

export default Form;
