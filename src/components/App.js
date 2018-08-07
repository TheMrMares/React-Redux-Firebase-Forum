// # IMPORTS
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import styled, { injectGlobal } from 'styled-components';
import colors from './../constants/colors';
import { connect } from "react-redux";
import Header from './Header';
import Footer from './Footer';
import Land from './Land';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import {auth} from './../firebase/index';
import robotoURL from './../fonts/Roboto-Regular.ttf';
import robotoCondensedURL from './../fonts/RobotoCondensed-Regular.ttf';

// # STYLED
const StyledHeader = styled(Header)``;
const StyledFooter = styled(Footer)``;
const StyledLand = styled(Land)``;
const StyledHome = styled(Home)``;
const StyledProfile = styled(Profile)``;
const StyledLogin = styled(Login)``;
const StyledRegister = styled(Register)``;

const WrappedApp = styled.div`
  width: 100%;
  min-height: 100vh
  display: flex;
  flex-direction: column;
  background: ${colors.verydark};
  ${StyledHeader}, ${StyledFooter} {
    width: 100%;
  }
`;
injectGlobal`
  @font-face {
    font-family: roboto;
    src: url(${robotoURL});
  }
  @font-face {
    font-family: robotoCondensed;
    src: url(${robotoCondensedURL});
  }
  html,body {
    margin: 0; padding: 0;
  }
  img {
    max-width: 100%; position: relative;
  }
  * {
    font-family: roboto;
    box-sizing: border-box;
    transition: 0.15s ease;
    color: ${colors.fair};
  }
  input, textarea, button {
    margin: 10px;
    padding: 5px;
    border-radius: 10px;
    appearance: none;
    &:focus {
      outline: none;
      box-shadow: 0px 0px 8px 0px ${colors.fair};
    }
  }
  input[type=submit], button{
    border: none;
    color: ${colors.fair};
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    display: flex; 
    justify-content: center;
    padding: 5px 30px;
  }
  input[type=email], input[type=password], input[type=text], textarea{
    border: 1px solid ${colors.grey};
    background: ${colors.fair};
    color: ${colors.dark};
  }
`;
// # COMPONENT

const ProtectedRoute = ({component: Component, authenticated, ...rest}) => {
  return(
    <Route {...rest} render={(props) => {
      if(authenticated === true) {
        return <Component {...props} {...rest} />
      } else {
        return <Redirect to={{pathname: '/login', state: {from: props.location}}} />
      }
    }}/>
  );
};

class App extends Component {
  render() {
    return (
      <Router>
        <WrappedApp>
          <StyledHeader/>
            <Route exact path='/landing' component={StyledLand}/>
            <ProtectedRoute exact path='/' component={StyledHome} authenticated={this.props.auths.isAuth}/>
            <ProtectedRoute exact path='/profile' component={StyledProfile} authenticated={this.props.auths.isAuth}/>
            <Route exact path='/login' component={StyledLogin}/>
            <Route exact path='/register' component={StyledRegister}/>
          <StyledFooter/>
        </WrappedApp>
      </Router>
    );
  }
}

// # REDUX
const mapStateToProps = state => {
  return { 
      auths: state.auths
  };
};

export default connect(mapStateToProps)(App);
