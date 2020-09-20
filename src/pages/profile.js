import React from 'react';
import SideMenu from '../components/side-menu';
import Profile from '../components/profile';

const ProfilePage = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SideMenu />
      <Profile />
    </div>
  );
};

export default ProfilePage;
