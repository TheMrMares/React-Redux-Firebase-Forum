import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import colors from './../constants/colors';

const RegisterTitle = styled.h1`
    font-size: 1.3em;
`;
const RegisterSubtitle = styled.h2`
    font-size: 1em;
    margin: 5px;
`;
const RegisterForm = styled.form`
    border-radius: 10px;
    border: 1px solid ${colors.grey};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 10px;
`;
const WrappedRegister = styled.section`
    background: ${colors.fair};
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 40px 0px;
`;

export default class Register extends Component {
    constructor(){
        super()
        this.state = {
            emailValue: '',
            cemailValue: '',
            passwordValue: '',
            cpasswordValue: ''
        }
    }
    handleChange(evt){
        console.log();
        switch(evt.target.id){
            case 'regEmail':
                this.setState({emailValue: evt.target.value});
            break;
            case 'regEmailConfirmation':
                this.setState({cemailValue: evt.target.value});
            break;
            case 'regPassword':
                this.setState({passwordValue: evt.target.value});
            break;
            case 'regPasswordConfirmation':
                this.setState({cpasswordValue: evt.target.value});
            break;
            default:
            break;
        }
    }
    handleSubmit(evt){
        evt.preventDefault();
        evt.stopPropagation();
        console.log();
        //proceed register here
    }
    render(){
        return(
            <WrappedRegister className={this.props.className}>
                <RegisterTitle>Create new account</RegisterTitle>
                <RegisterForm>
                    <RegisterSubtitle>User email</RegisterSubtitle>
                    <input 
                        type='email' 
                        id='regEmail' 
                        placeholder='Your email' 
                        value={this.state.emailValue} 
                        onChange={this.handleChange.bind(this)}
                    />
                    <input 
                        type='email' 
                        id='regEmailConfirmation' 
                        placeholder='Repeat your email'
                        value={this.state.cemailValue}
                        onChange={this.handleChange.bind(this)}
                    />

                    <RegisterSubtitle>User password</RegisterSubtitle>
                    <input 
                        type='password' 
                        id='regPassword' 
                        placeholder='Your password'  
                        value={this.state.passwordValue}
                        onChange={this.handleChange.bind(this)}
                    />
                    <input 
                        type='password' 
                        id='regPasswordConfirmation' 
                        placeholder='Repeat your password' 
                        value={this.state.cpasswordValue} 
                        onChange={this.handleChange.bind(this)}/>

                    <input type='submit' value='Register' onClick={this.handleSubmit.bind(this)}/>
                </RegisterForm>
            </WrappedRegister>
        );
    }
}