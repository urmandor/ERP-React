import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { Icon, Menu } from 'semantic-ui-react';

export const Topbar = ({ toggleVisibility, logout }) => (
  <Menu secondary attached="top">
    <Menu.Item onClick={() => toggleVisibility()}>
      <Icon name="sidebar" />
    </Menu.Item>
    <Menu.Item>ERP for Weaving Industry</Menu.Item>
    <Menu.Item position="right" onClick={() => logout()}>
      Logout
    </Menu.Item>
  </Menu>
);
