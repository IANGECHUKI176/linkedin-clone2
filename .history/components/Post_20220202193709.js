import { Avatar, IconButton } from "@material-ui/core";
import {
  CloseRounded,
  CommentOutlined,
 
  DeleteRounded,
  MoreHorizRounded,
  ReplyRounded,
  ThumbUp,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atom/modalAtom";
import { getPostState, handlePostState } from "../atom/postAtom";
import { useSession } from "next-auth/react";
import TimeAgo from "timeago-react";
const Post = ({ post, modalPost }) => {
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [postState, setPostState] = useRecoilState(getPostState);
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [showInput, setShowInput] = useState(false);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [liked, setLiked] = useState(false);
  const {data:session}=useSession()
 
  const truncate = (string, n) =>
    string?.length > n ? `${string.substr(0, n - 1)} ...see more` : string;
    const deletePost=async()=>{
      const response = await fetch(`/api/posts/${post._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const responseData=await response.json()
      console.log(responseData)
      setHandlePost(true)
      setModalOpen(false)
    }
  return (
    <div
      className={`bg-white dark:bg-[#1D2226] ${
        modalPost ? "rounded-r-lg" : "rounded-lg"
      } space-y-6 py-3 border border-gray-300 dark:border-none`}
    >
      <div className='flex items-center cursor-pointer px-2.5'>
        <Avatar src={post.userImg} className='!w-10 !h-10 cursor-pointer' />
        <div className='mr-auto ml-2 leading-none'>
          <h6 className='font-medium hover:text-blue-500 hover:underline'>
            {post.username}
          </h6>
          <p className='text-sm opacity-80 dark:text-white/75'>{post.email}</p>
          <TimeAgo
            datetime={post.createdAt}
            className='text-sm opacity-80 dark:text-white/75'
          />
        </div>
        {modalPost ? (
          <IconButton onClick={() => setModalOpen(false)}>
            <CloseRounded className='dark:text-white/75' />
          </IconButton>
        ) : (
          <IconButton>
            <MoreHorizRounded className='dark:text-white/75' />
          </IconButton>
        )}
      </div>
      {post.input && (
        <div className='px-2.5 break-all md:break-normal'>
          {modalPost || showInput ? (
            <p onClick={() => setShowInput(false)}>{post.input}</p>
          ) : (
            <p onClick={() => setShowInput(true)}>
              {truncate(post.input, 150)}
            </p>
          )}
          {post.photoUrl && !modalPost && (
            <img
              src={post.photoUrl}
              alt=''
              className='w-full cursor-pointer max-h-72 object-contain'
              onClick={() => {
                setModalOpen(true);
                setModalType("gifYouUp");
                setPostState(post);
              }}
            />
          )}
          <div className='flex items-center justify-evenly dark:border-t border-gray-600/80 pt-2.5 mx-2.5 text-black/60 dark:text-white/75'>
            {modalPost ? (
              <button>
                <CommentOutlined />
                <h2>Comments</h2>
              </button>
            ) : (
              <button
                onClick={() => {
                  setLiked(!liked);
                }}
                className={`postButton ${liked && "text-blue-500"}`}
              >
                {liked ? (
                  <ThumbUp className='-scale-x-100' />
                ) : (
                  <ThumbUpAltOutlined className='-scale-x-100' />
                )}
                <h2>Like</h2>
              </button>
            )}
            {session?.user?.email === post.email ? (
              <button
                className='postButton focus:text-red-500'
                onClick={deletePost}
              >
                <DeleteRounded />
                <h2>Delete</h2>
              </button>
            ) : (
              <button className='postButton '>
                <ReplyRounded className='-scale-x-100' />
                <h2>Share</h2>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Post;
