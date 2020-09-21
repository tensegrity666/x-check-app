import React from 'react';
import SideMenu from '../components/side-menu';
import Profile from '../components/profile';
import Header from '../components/header';

const ProfilePage = () => {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
        <SideMenu />
        <Profile />
      </div>
    </div>
  );
};

export default ProfilePage;
