import React from 'react';
import SideMenu from '../components/side-menu';
import ProfStub from '../components/prof-stub';

const Profile = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SideMenu />
      <ProfStub />
    </div>
  );
};

export default Profile;
