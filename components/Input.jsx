import React from "react";
import { useSession } from "next-auth/react";
import { Avatar } from "@material-ui/core";
import {
  PhotoSizeSelectActual,
  Videocam,
  BusinessCenter,
  Assignment,
} from "@material-ui/icons";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atom/modalAtom";

import { motion } from "framer-motion";
const Input = () => {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);

  const { data: session } = useSession();

  return (
    <div className='bg-white dark:bg-[#1D2226] rounded-lg p-3 border border-gray-300 dark:border-none space-y-3'>
      <div className='flex items-center space-x-2'>
        <Avatar
          src={session?.user?.image}
          className='!h-10 !w-10 !cursor-pointer'
        />
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className='rounded-full border border-gray-400 px-3 py-2.5 w-full text-left font-medium opacity-80 hover:opacity-100'
          onClick={() => {
            setModalOpen(true);
            setModalType("dropIn");
          }}
        >
          Start a post
        </motion.button>
      </div>
      <div className='flex items-center flex-wrap gap-4 justify-center md:gap-10'>
        <button className='inputButton group'>
          <PhotoSizeSelectActual className='text-blue-400' />
          <h4 className='opacity-80 group-hover:opacity-100'>Photo</h4>
        </button>
        <button className='inputButton group'>
          <Videocam className='text-green-400' />
          <h4 className='opacity-80 group-hover:opacity-100'>Video</h4>
        </button>
        <button className='inputButton group'>
          <BusinessCenter className='text-blue-300' />
          <h4 className='opacity-80 group-hover:opacity-100'>Job</h4>
        </button>
        <button className='inputButton group'>
          <Assignment className='text-red-400' />
          <h4 className='opacity-80 group-hover:opacity-100'>Write Article</h4>
        </button>
      </div>
    </div>
  );
};

export default Input;
