import React from 'react';
import Image from "next/image";
import TimeAgo from 'timeago-react'
import {InfoRounded,FiberManualRecordRounded} from '@material-ui/icons'
const Widgets = ({articles}) => {
  
  return (
    <div className='hidden md:inline space-y-2 sticky top-20'>
     
      <div className='bg-white dark:bg-[#1D2226] py-2.5 rounded-lg space-y-2 w-11/12 overflow-hidden border border-gray-300 dark:border-none'>
        <div className='flex items center justify-between font-bold px-2.5'>
          <h4>LinkedIn News</h4>
          <InfoRounded className='h-5 w-5' />
        </div>
        <div className="space-y-1">
          {articles.slice(0,5).map((article,i)=>(
            <div key={i} className="flex items-center cursor-pointer hover:bg-black/10 dark:hover:bg-black/75 px-2.5 py-2.5">
              <FiberManualRecordRounded className="!h-2 !w-2"/>
              <div>
                <h4 className="max-w-xs font-medium text-xs truncate pr-10">{article.title}</h4>
                <TimeAgo datetime={article.publishedAt} className="text-xs mt-0.5 dark:text-white/75 opacity-80"/>
              </div>

            </div>
          ))}
        </div>
      </div>
      {/* ads */}
      <div className="bg-white dark:bg-[#1D2226]">

      </div>
    </div>
  );
};

export default Widgets;
