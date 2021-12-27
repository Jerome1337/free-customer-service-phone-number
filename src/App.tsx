import React from 'react';

import styled from 'styled-components';

import logo from './logo.svg';

const StyledApp = styled.div`
  text-align: center;

  img {
    height: 40vmin;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    img {
      animation: app-logo-spin infinite 20s linear;
    }
  }

  header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  a {
    color: #61dafb;
  }

  @keyframes app-logo-spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;

const App: React.FC = () => (
  <StyledApp>
    <header>
      <img src={logo} alt='logo' />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
        Learn React
      </a>
    </header>
  </StyledApp>
);

export default App;
