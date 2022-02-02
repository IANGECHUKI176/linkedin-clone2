import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  SearchRounded,
  HomeRounded,
  Notifications,
  Chat,
  BusinessCenter,
  Group,
  AppsOutlined,
} from "@material-ui/icons";
import HeaderLink from "./HeaderLink";
import { Avatar } from "@material-ui/core";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  //wait for page to mount to have access to the theme
  useEffect(() => setMounted(true), []);
 

  return (
    <header className='sticky top-0 z-40 bg-white dark:bg-[#1D2226] flex items-center justify-around py-1.5 px-3 focus-within:shadow-2xl'>
      {/* Left */}

      <div className='flex items-center max-w-xs w-full space-x-2'>
        {mounted && (
          <>
            {resolvedTheme === "dark" ? (
              <Image src='https://rb.gy/bizvqj' width={45} height={45} />
            ) : (
              <Image src='https://rb.gy/dpmd9s' width={45} height={45} />
            )}
          </>
        )}

        <div className='flex items-center dark:md:bg-gray-700  rounded py-2.5 px-4 space-x-4'>
          <SearchRounded />
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent text-sm focus:outline-none hidden md:inline-flex placeholder-black/70 dark:placeholder-white/75 flex-grow'
          />
        </div>
      </div>
      {/* Right */}
      <div className='flex items-center space-x-6'>
        <HeaderLink Icon={HomeRounded} text='Home' feed active />
        <HeaderLink Icon={Group} text='My Network' feed active />
        <HeaderLink Icon={BusinessCenter} text='Jobs' feed hidden />
        <HeaderLink Icon={Chat} text='Messaging' feed />
        <HeaderLink Icon={Notifications} text='Home' feed />
        <HeaderLink Icon={Avatar} text='Me' feed avatar />
        <HeaderLink Icon={AppsOutlined} text='Work' feed hidden />
        {/*Dark mode toggle */}
        {mounted && (
          <div
            className={`bg-gray-600 h-6 w-12 rounded-full px-0.5 cursor-pointer flex-shrink-0 flex items-center relative ${
              resolvedTheme === "dark" ? "justify-end" : "justify-start"
            }`}
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            <span className='absolute left-0'>🌙 </span>

            <motion.div
              className='w-5 h-5 rounded-full z-40 bg-white'
              layout
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
            />
            <span className='absolute right-0.5'> 🌞</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
