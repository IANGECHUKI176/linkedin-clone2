import React from 'react';
import Image from "next/image";
import TimeAgo from 'timeago-react'
import {InfoRounded} from '@ma'
const Widgets = () => {
  return <div className="hidden md:inline space-y-2">
    {/* news */}
    <div className="bg-white dark:bg-[#1D2226] py-2.5 rounded-lg space-y-2 w-11/12 overflow-hidden border border-gray-300 dark:border-none">
        <div>
          <h4></h4>
          <InfoRounded/>
        </div>
    </div>
    {/* ads */}
  </div>;
};

export default Widgets;
