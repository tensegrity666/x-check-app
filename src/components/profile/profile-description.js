import React from 'react';
import { Link } from 'react-router-dom';
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
            <Link
              href={`https://github.com/${githubId}`}
              target="_blank"
              rel="noopener noreferrer">
              {githubId}
            </Link>
          }
        />
      </List.Item>
      <List.Item>
        <List.Item.Meta
          avatar={<MailOutlined />}
          description={<Link href={`mailto:${email}`}>{email}</Link>}
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
