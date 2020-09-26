import React from 'react';
import SideMenu from '../components/side-menu';
import Profile from '../components/profile';
import Header from '../components/header';

const ProfilePage = () => {
  return (
    <>
      <Header />
      <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
        <SideMenu />
        <Profile />
      </div>
    </>
  );
};

export default ProfilePage;
