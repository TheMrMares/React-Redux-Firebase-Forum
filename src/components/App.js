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
import robotoURL from './../fonts/Roboto-Regular.ttf';
import robotoCondensedURL from './../fonts/RobotoCondensed-Regular.ttf';
import Shoutbox from './Shoutbox';
import {firestore, auth} from './../firebase/index';
import {SetMessages, SetThreads} from './../actions/index';
// # STYLED
const StyledHeader = styled(Header)``;
const StyledFooter = styled(Footer)``;
const StyledLand = styled(Land)``;
const StyledHome = styled(Home)``;
const StyledShoutbox = styled(Shoutbox)``;
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
  .prevent-scroll {
    overflow: hidden;
  }
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
      box-shadow: 0px 0px 4px 0px ${colors.fair};
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
      if(authenticated !== null) {
        return <Component {...props} {...rest} />
      } else {
        return <Redirect to={{pathname: '/login', state: {from: props.location}}} />
      }
    }}/>
  );
};
class App extends Component {
  componentDidMount(){
    //threads live updates
    firestore.collection("threads")
    .onSnapshot(() => {
        firestore.collection('threads').orderBy('created', 'desc').get().then((data) => {
            let filteredData = data.docs.filter((item) => {
                if(item.ref.id !== 'template'){
                    return item;
                }
            });
            this.props.setThreads(filteredData.map((item) => {
                return item;
            }));
        }).catch((error) => {
            console.log(`# SET THREADS ERROR - Code: ${error.code} Message: ${error.message}`);
        });
    });
    //messages live updates
    firestore.collection("messages")
    .onSnapshot(() => {
        firestore.collection('messages').orderBy('created', 'desc').get().then((data) => {
            let filteredData = data.docs.filter((item) => {
                if(item.ref.id !== 'template'){
                    return item;
                }
            });
            this.props.setMessages(filteredData.map((item) => {
                return item;
            }));
        }).catch((error) => {
            console.log(`# SET THREADS ERROR - Code: ${error.code} Message: ${error.message}`);
        });
    });
  }
  render() {
    return (
      <Router>
        <WrappedApp>
          <StyledHeader/>
            <Route exact path='/landing' component={StyledLand}/>
            <Route exact path='/' render={() => <Redirect to='/forum'/>}/>
            <ProtectedRoute exact path='/forum' component={StyledHome} authenticated={auth.currentUser}/>
            <ProtectedRoute exact path='/profile' component={StyledProfile} authenticated={auth.currentUser}/>
            <ProtectedRoute exact path='/shoutbox' component={StyledShoutbox} authenticated={auth.currentUser}/>
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
const mapDispatchToProps = dispatch => {
  return {
      setMessages: payload => dispatch(SetMessages(payload)),
      setThreads: payload => dispatch(SetThreads(payload))
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(App);
