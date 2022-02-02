import React from 'react';
import Image from "next/image";
import TimeAgo from 'timeago-react'
import {InfoRounded,FiberManualRecordRounded} from '@material-ui/icons'
const Widgets = ({articles}) => {
  console.log(articles)
  return <div className="hidden md:inline space-y-2">
    {/* news */}
    <div className="bg-white dark:bg-[#1D2226] py-2.5 rounded-lg space-y-2 w-11/12 overflow-hidden border border-gray-300 dark:border-none">
        <div className="flex items center just">
          <h4>LinkedIn News</h4>
          <FiberManualRecordRounded/>
        </div>
    </div>
    {/* ads */}
  </div>;
};

export default Widgets;