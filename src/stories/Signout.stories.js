/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import Signout from '../components/signout';

export default {
  title: 'Signout',
  component: Signout,
};

const Template = (args) => <Signout {...args} />;

export const Danger = Template.bind({});

Danger.args = {
  danger: true,
  primary: false,
  label: 'Sign out',
};
