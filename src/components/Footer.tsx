import React from 'react';

import { Layout, Typography } from 'antd';
import styled from 'styled-components';

import reactLogo from '@assets/react-logo.svg';

const { Footer: AntDesignFooter } = Layout;
const { Link, Text } = Typography;

const StyledFooter = styled(AntDesignFooter)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    height: 24px;
    pointer-events: none;
    margin-left: -5px;
    animation: react-logo-spin infinite 20s linear;

    @keyframes react-logo-spin {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }
  }
`;

const Footer: React.VFC = (): React.ReactElement => (
  <StyledFooter>
    <div>
      <Text>
        Créé avec ❤️ et <img src={reactLogo} alt='Logo React' />
      </Text>
    </div>
    <div>
      <Text>
        2022 •{' '}
        <Link
          href='https://jeromepogeant.com'
          target='_blank'
          rel='noreferrer'
          title='Lien vers le site de Jérôme Pogeant'
        >
          Jérôme Pogeant
        </Link>
      </Text>
    </div>
  </StyledFooter>
);

export default Footer;
