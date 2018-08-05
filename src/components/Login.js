// # IMPORTS
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import colors from './../constants/colors';
import { Redirect } from 'react-router'
import {auth} from './../firebase/index';
import { connect } from "react-redux";
import { LogIn } from './../actions/index';

// # STYLED
const LoginTitle = styled.h1`
    font-size: 1.3em;
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
            redirect: false
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
            this.props.signIn(auth.currentUser);
            this.setState({redirect: true})
        }).catch((error) => {
            console.log(`CODE: ${error.code}`);
            console.log(`MESSAGE: ${error.message}`);
        });
        
    }
    checkRender(){
        if(this.state.redirect === true) {
            return <Redirect to="/"/>
        }
    }
    render(){
        return(
            <WrappedLogin className={this.props.className}>
                {this.checkRender()}
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
                    <input type='submit' value='Login' onClick={this.handleSubmit.bind(this)}/>
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