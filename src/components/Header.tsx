import React from 'react';

import { GithubOutlined } from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const { Header: AntDesignHeader } = Layout;

const StyledHeader = styled(AntDesignHeader)`
  width: 100%;
  display: flex;
  justify-content: space-between;

  > div:first-of-type {
    display: flex;

    > div {
      width: 120px;
      height: 31px;
      margin: 16px 24px 16px 0;
      background: rgba(255 255 255 / 30%);
    }
  }

  > div:last-of-type svg {
    fill: aliceblue;
    font-size: 20px;
  }
`;

const Header: React.VFC = (): React.ReactElement => {
  const location = useLocation();

  return (
    <StyledHeader>
      <div>
        <div />
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={[location.pathname === '/' ? 'list' : location.pathname.replace('/', '')]}
        >
          <Menu.Item key='list'>
            <Link to='/'>Numéros</Link>
          </Menu.Item>
          <Menu.Item key='faq'>
            <Link to='/faq'>FAQ</Link>
          </Menu.Item>
          <Menu.Item key='contact'>
            <Link to='/contact'>Contact</Link>
          </Menu.Item>
        </Menu>
      </div>
      <div>
        <Button
          type='link'
          href='https://github.com/Jerome1337/free-customer-service-phone-number'
          title='Lien vers le dépôt git'
          target='_blank'
        >
          <GithubOutlined />
        </Button>
      </div>
    </StyledHeader>
  );
};

export default Header;
