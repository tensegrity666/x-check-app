import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import RSLogo from './assets/logo-rs-school.svg';
import GitHubIcon from './assets/ic-github-base64.json';
import styles from './index.module.css';

const Login = ({ handleLogin }) => {
  const { Meta } = Card;
  const { form, image, cardImage } = styles;

  return (
    <main>
      <div className={form}>
        <img className={image} src={RSLogo} alt="RS School Logo" />

        <Card
          style={{ width: 320 }}
          cover={
            <img
              className={cardImage}
              src={GitHubIcon}
              alt="GitHub OctoCat Icon"
            />
          }
          actions={[
            <Button
              onClick={handleLogin}
              key="github"
              type="primary"
              size="large"
              icon={<GithubOutlined />}>
              Sign up with GitHub
            </Button>,
          ]}>
          <Meta
            title="Please login via GitHub"
            description="In order to access the RS School App, you need to login with your GitHub account"
          />
        </Card>
      </div>
    </main>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
