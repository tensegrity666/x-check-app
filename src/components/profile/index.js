import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Avatar, Layout, Row, Tag } from 'antd';

import Signout from '../signout';
import ProfileDescription from './profile-description';
import styles from './index.module.css';

const Profile = () => {
  const { avatar, cardWrapper, tag } = styles;
  const { Meta } = Card;
  const { displayName, photoURL, githubId, roles, email } = useSelector(
    ({ loginReducer }) => loginReducer
  );

  return (
    <Layout>
      <Row>
        <Card
          bordered
          className={cardWrapper}
          cover={
            <Avatar
              className={avatar}
              size={256}
              src={photoURL}
              alt={displayName}
            />
          }
        />
        <Card className={cardWrapper}>
          <Meta
            title={
              <Row>
                {displayName}
                <Tag className={tag} color="blue">
                  {roles}
                </Tag>
              </Row>
            }
            description={
              <ProfileDescription
                roles={roles}
                githubId={githubId}
                email={email}
              />
            }
          />
          <Signout />
        </Card>
      </Row>
    </Layout>
  );
};

export default Profile;
