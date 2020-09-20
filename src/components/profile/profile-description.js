import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import { GithubOutlined, MailOutlined } from '@ant-design/icons';

const ProfileDescription = ({ githubId, email }) => {
  return (
    <List itemLayout="horizontal">
      <List.Item>
        <List.Item.Meta
          avatar={<GithubOutlined />}
          description={
            <a
              href={`https://github.com/${githubId}`}
              target="_blank"
              rel="noopener noreferrer">
              {githubId}
            </a>
          }
        />
      </List.Item>
      <List.Item>
        <List.Item.Meta
          avatar={<MailOutlined />}
          description={<a href={`mailto:${email}`}>{email}</a>}
        />
      </List.Item>
    </List>
  );
};

ProfileDescription.propTypes = {
  githubId: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default ProfileDescription;
