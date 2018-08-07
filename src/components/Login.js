// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import { Redirect } from 'react-router'
import {auth, firestore, googleProvider} from './../firebase/index';
import { connect } from "react-redux";
import { LogIn } from './../actions/index';
import GoogleLogin from './GoogleLogin';
// # STYLED
const LoginTitle = styled.h1`
    font-size: 1.3em;
`;
const LoginAlert = styled.p`
    color: ${colors.alert};
    font-weight: bold;
    font-size: 0.9em;
    margin: 0px 10px;
    display: flex;
    flex-wrap: wrap;
    max-width: 300px;
    text-align: center;
`;
const LoginSubtitle = styled.h2`
    font-size: 1em;
    margin: 5px;
`;
const LoginForm = styled.form`
    border-radius: 10px;
    border: 1px solid ${colors.grey};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 10px;
`;
const GoogleSign = styled.input.attrs({
    type: 'submit',
    value: 'Log in with GOOGLE'
})`
    background: ${colors.positive} !important;
    &:hover {
        box-shadow: 0px 0px 5px 0px ${colors.positive} !important;
    }
`;
const WrappedLogin = styled.section`
    background: ${colors.fair};
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 40px 0px;
`;
// # COMPONENT
class Login extends Component {
    constructor() {
        super()
        this.state = {
            passwordValue: ``,
            emailValue: ``,
            redirect: false,
            loginAlert: null
        }
    }
    handleChange(evt){
        switch(evt.target.id){
            case 'logEmail':
                this.setState({emailValue: evt.target.value});
            break;
            case 'logPassword':
                this.setState({passwordValue: evt.target.value});
            break;
            default:
            break;
        }
    }
    handleSubmit(evt){
        evt.preventDefault();
        evt.stopPropagation();
        //proceed login here
        auth.signInWithEmailAndPassword(this.state.emailValue, this.state.passwordValue).then(() => {
            let user = auth.currentUser;
            let docRef = firestore.collection('users').doc(user.uid);
            docRef.get().then((doc) => {
                if(doc.exists){
                    this.props.signIn({user: auth.currentUser, data: doc.data()});
                    this.setState({redirect: true})
                }
            }).catch((error) => {
                console.log(`# READ ERROR - Code: ${error.code} Message: ${error.message}`);
            });
        }).catch((error) => {
            this.setState({
                loginAlert: 'Invalid email or password'
            });
            console.log(`# LOGIN ERROR - Code: ${error.code} Message: ${error.message}`);
        });
        
    }
    renderRedirect(){
        if(this.state.redirect === true) {
            return <Redirect to="/"/>
        }
    }
    renderAlert(){
        if(this.state.loginAlert != null){
            return <LoginAlert>{this.state.loginAlert}</LoginAlert>
        }
    }
    render(){
        return(
            <WrappedLogin className={this.props.className}>
                {this.renderRedirect()}
                <LoginTitle>Sign in</LoginTitle>
                <LoginForm>
                    <LoginSubtitle>User email</LoginSubtitle>
                    <input 
                        type='email' 
                        id='logEmail'
                        placeholder='Your email' 
                        value={this.state.emailValue} 
                        onChange={this.handleChange.bind(this)}
                    />
                    <LoginSubtitle>User password</LoginSubtitle>
                    <input 
                        type='password' 
                        id='logPassword'
                        placeholder='Your password' 
                        value={this.state.passwordValue} 
                        onChange={this.handleChange.bind(this)}
                    />
                    <input type='submit' value='Log in' onClick={this.handleSubmit.bind(this)}/>
                    <GoogleLogin/>
                    {this.renderAlert()}
                </LoginForm>
            </WrappedLogin>
        );
    }
}
// # REDUX
const mapDispatchToProps = dispatch => {
    return {
        signIn: payload => dispatch(LogIn(payload))
    };
};

export default connect(null, mapDispatchToProps)(Login);