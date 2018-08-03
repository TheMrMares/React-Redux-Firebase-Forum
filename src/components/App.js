import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import styled, { css, injectGlobal } from 'styled-components';
import colors from './../constants/colors';

import Header from './Header';
import Footer from './Footer';
import Land from './Land';
import Home from './Home';
import Login from './Login';

const StyledHeader = styled(Header)``;
const StyledFooter = styled(Footer)``;
const StyledLand = styled(Land)``;
const StyledHome = styled(Home)``;
const StyledLogin = styled(Login)``;

const WrappedApp = styled.div`
  width: 100%;
  min-height: 100vh
  display: flex;
  flex-direction: column;
  background: ${colors.dark};
  ${StyledHeader}, ${StyledFooter} {
    width: 100%;
  }
  ${StyledHeader} {
    border-bottom: 1px solid ${colors.smooth}
  }
  ${StyledFooter}{
    border-top: 1px solid ${colors.smooth}
  }
`;

injectGlobal`
  html,body {
    margin: 0; padding: 0;
    color: ${colors.dark};
  }
  img {
    max-width: 100%; position: relative;
  }
  * {
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

class App extends Component {
  render() {
    return (
      <Router>
        <WrappedApp>
          <StyledHeader/>
            <Route exact path='/landing' component={StyledLand}/>
            <Route exact path='/' component={StyledHome}/>
            <Route exact path='/login' component={StyledLogin}/>
          <StyledFooter/>
        </WrappedApp>
      </Router>
    );
  }
}

export default App;
