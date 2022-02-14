import React from 'react';

import { Layout as AntDesignLayout, PageHeader } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Footer from './Footer';
import Header from './Header';

const { Content } = AntDesignLayout;

type LayoutProps = {
  title: string;
};

const StyledLayout = styled(AntDesignLayout)`
  min-height: 100vh;

  main {
    padding: 0 50px;

    > div > div {
      padding-left: 0;
    }
  }
`;

const Layout: React.FC<LayoutProps> = ({ title, children }): React.ReactElement => (
  <StyledLayout>
    <Header />
    <Content>
      <div className='site-layout-content'>
        <PageHeader className='site-page-header' title={title} />
        {children}
      </div>
    </Content>
    <Footer />
  </StyledLayout>
);

Layout.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Layout;
