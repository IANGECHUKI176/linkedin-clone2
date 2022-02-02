import Image from "next/image";
import React from "react";
import { Avatar } from "@material-ui/core";
import { BookmarkOutlined, AddRounded } from "@material-ui/icons";
import { signOut, useSession } from "next-auth/react";
const Sidebar = () => {
  const { data: session } = useSession();
 
  return (
    <div className='space-y-2 min-w-max max-w-lg'>
      {/*top */}
      <div className='bg-white dark:bg-[#1D2226] rounded-lg overflow-hidden relative flex flex-col items-center border border-gray-300 dark:border-none text-center'>
        <div className='relative h-14 w-full '>
          <Image src='https://rb.gy/i26zak' layout='fill' priority />
        </div>
        <Avatar
          src={session?.user?.image}
          className='!w-14 !h-14 !top-4  !cursor-pointer !border-2 !absolute'
          onClick={signOut}
        />
        <div className='mt-5 py-4 space-x-0.5'>
          <h4 className='decoration-purple-500 cursor-pointer hover:underline underline-offset-1'>
            {session?.user?.name}
          </h4>
          <p className='text-sm text-black/60 dark:text-white/75'>
            {session?.user?.email}
          </p>
        </div>
        <div className='hidden md:inline text-left dark:text-white/75 text-sm '>
          <div className='space-y-0.5 font-medium sidebarButton'>
            <div className='flex justify-center space-x-2'>
              <h4>Who viewed your profile </h4>
              <span className='text-blue-500'>320</span>
            </div>
            <div className='flex justify-center space-x-2 '>
              <h4>Views of Your post</h4>
              <span className='text-blue-500'>1,892</span>
            </div>
          </div>
          <div className='sidebarButton'>
            <h4 className='text-xs'>Access exclusive tools and insights</h4>
            <h4 className='dark:text-white font-medium'>
              <span className='h-3 w-3 rounded-sm inline-block bg-gradient-to-tr from-yellow-700 to-yellow-200 mr-1 dark:bg-white' />
              Try premium for free
            </h4>
          </div>
          <div className='sidebarButton flex items-center space-x-1'>
            <BookmarkOutlined className='!-ml-1' />
            <h4>My Items</h4>
          </div>
        </div>
      </div>
      {/*bottom*/}
      <div className="hidden md:flex bg-white dark:bg-[#1D2226] text-black/70 dark:text-white/75 rounded-lg overflow-hidden flex-col space-y-2 pt-2.5 sticky top-20 border border-gray-300 dark:border-none">
        <p className='sidebarLink'>Groups</p>
        <div className='flex items-center justify-between'>
          <p className='sidebarLink'>Events</p>
          <AddRounded className='!h-5' />
        </div>
        <p className='sidebarLink'>Followed Hashtags</p>
        <div className='sidebarButton text-center'>
          <h4 className='dark:text-white font-medium text-sm'>Discover More</h4>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
