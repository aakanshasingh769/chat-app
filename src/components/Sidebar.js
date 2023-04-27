import React, { useRef } from 'react';
import { Divider } from 'rsuite';
import DashboardToggle from './dashboard/DashboardToggle';
import CreateRoomBtnModal from './CreateRoomBtnModal';
import ChatRoomList from './rooms/ChatRoomList';
import { useState } from 'react';
import { useEffect } from 'react';

const Sidebar = () => {
  const topSidebarRef = useRef();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (topSidebarRef.current) {
      setHeight(topSidebarRef.current.scrollHeight);
    }
  }, []);

  return (
    <div className="h-100  pt-2">
      <div ref={topSidebarRef}>
        <DashboardToggle />
        <CreateRoomBtnModal />
        <Divider>Join conversation</Divider>
      </div>
      <ChatRoomList aboveElHeight={height} />
    </div>
  );
};

export default Sidebar;
