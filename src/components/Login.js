import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import colors from './../constants/colors';

const LoginTitle = styled.h1`
    font-size: 1.3em;
`;
const LoginInput = styled.input`
    margin: 10px;
    padding: 5px;
    border-radius: 10px;
    appearance: none;
`;

const LoginForm = styled.form`
    border-radius: 10px;
    border: 1px solid ${colors.grey};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const WrappedLogin = styled.section`
    background: ${colors.fair};
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 40px 0px;
    ${LoginInput}[type=email], ${LoginInput}[type=password] {
        border: 1px solid ${colors.grey};
    }
    ${LoginInput}[type=submit] {
        border: none;
        background: ${colors.special};
        color: ${colors.fair};
        text-transform: uppercase;
        font-weight: bold;
    }
`;

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            passwordValue: ``,
            emailValue: ``
        }
    }
    emailChange(evt){
        this.setState({
            emailValue: evt.target.value
        });
    }
    passwordChange(evt){
        this.setState({
            passwordValue: evt.target.value
        });
    }
    handleSubmit(evt){
        evt.preventDefault();
        evt.stopPropagation();
        //proceed login here
    }
    render(){
        return(
            <WrappedLogin>
                <LoginTitle>Sign in</LoginTitle>
                <LoginForm>
                    <LoginInput type='email' placeholder='Your email' value={this.state.emailValue} onChange={(evt) => {
                        this.emailChange(evt);
                    }} />
                    <LoginInput type='password' placeholder='Your password' value={this.state.passwordValue} onChange={(evt) => {
                        this.passwordChange(evt);
                    }}/>
                    <LoginInput type='submit' value='Login' onClick={(evt) => {
                        this.handleSubmit(evt);
                    }}/>
                </LoginForm>
            </WrappedLogin>
        );
    }
}