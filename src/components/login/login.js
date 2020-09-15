import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Select, Col } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import RSLogo from './assets/logo-rs-school.svg';
import GitHubIcon from './assets/ic-github-base64.json';
import styles from './index.module.css';

const Login = ({ handleLogin, handleRoleAdd, roles, userRole }) => {
  const { Meta } = Card;
  const { Option } = Select;
  const { form, image, cardImage, roleSelect, cardWrapper } = styles;

  return (
    <main>
      <div className={form}>
        <img className={image} src={RSLogo} alt="RS School Logo" />

        <Card
          className={cardWrapper}
          cover={
            <img
              className={cardImage}
              src={GitHubIcon}
              alt="GitHub OctoCat Icon"
            />
          }
          actions={[
            <Col>
              <Button
                onClick={handleLogin}
                key="github"
                type="primary"
                size="large"
                icon={<GithubOutlined />}>
                Sign up with GitHub
              </Button>
              <Select
                className={roleSelect}
                placeholder="Choose your role"
                type="primary"
                size="large"
                value={userRole}
                onChange={handleRoleAdd}>
                {roles.map((role) => (
                  <Option key={roles.indexOf(role)}>{role}</Option>
                ))}
              </Select>
            </Col>,
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
  handleRoleAdd: PropTypes.func.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  userRole: PropTypes.string,
};

Login.defaultProps = {
  userRole: '',
};

export default Login;
