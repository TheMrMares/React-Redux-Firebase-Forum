// # IMPORTS
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import colors from './../constants/colors';
import { Redirect } from 'react-router'
import {auth} from './../firebase/index';
import { LogIn, UpdateData } from './../actions/index';
import { connect } from "react-redux";
import {firestore} from './../firebase/index';

// # STYLED
const RegisterTitle = styled.h1`
    font-size: 1.3em;
`;
const RegisterSubtitle = styled.h2`
    font-size: 1em;
    margin: 5px;
`;
const Alert = styled.p`
    color: ${colors.alert};
    font-weight: bold;
    font-size: 0.9em;
    margin: 0px 10px;
    display: flex;
    flex-wrap: wrap;
    max-width: 300px;
    text-align: center;
    justify-content: center;
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
// # COMPONENT
class Register extends Component {
    constructor(){
        super()
        this.state = {
            urlValue: '',
            emailValue: '',
            cemailValue: '',
            passwordValue: '',
            cpasswordValue: '',
            firstnameValue: '',
            surnameValue: '',
            redirect: false,
            registerAlert: null
        }
    }
    handleChange(evt){
        switch(evt.target.id){
            case 'regUrl':
                this.setState({urlValue: evt.target.value});
            break;
            case 'regEmail':
                this.setState({emailValue: evt.target.value});
            break;
            case 'regEmailConfirmation':
                this.setState({cemailValue: evt.target.value});
            break;
            case 'regFirstname':
                this.setState({firstnameValue: evt.target.value});
            break;
            case 'regSurname':
                this.setState({surnameValue: evt.target.value});
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
        
        let emailCond = (this.state.emailValue === this.state.cemailValue);
        let passCond = (this.state.passwordValue === this.state.cpasswordValue);
        let firstnameCond = (this.state.firstnameValue.length > 0);
        let surnameCond = (this.state.surnameValue.length > 0);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let validemailCond = (reg.test(this.state.emailValue));

        if(emailCond && passCond && firstnameCond && surnameCond && validemailCond){

            //proceed register here
            auth.createUserWithEmailAndPassword(this.state.emailValue, this.state.passwordValue).then((data) => {
                
                firestore.collection('users').doc(data.user.uid).set({
                    email: this.state.emailValue,
                    firstname: this.state.firstnameValue,
                    surname: this.state.surnameValue,
                    imageURL: this.state.urlValue,
                    userID: data.user.uid
                }).then(() => {

                    let docRef = firestore.collection('users').doc(data.user.uid);
                    docRef.get().then((doc) => {
                        if(doc.exists){
                            this.props.signIn({user: auth.currentUser, data: doc.data()});
                            this.setState({redirect: true})
                        }
                    }).catch((error) => {
                        console.log(`# READ ERROR - Code: ${error.code} Message: ${error.message}`);
                    });
                    

                }).catch(function(error) {
                    console.log(`# DOCUMENT ADD ERROR - Code: ${error.code} Message: ${error.message}`);
                });
                
            }).catch((error) => {
                console.log(`# REGISTER ERROR - Code: ${error.code} Message: ${error.message}`);
            });

        } else {
            let myAlert;
            if(!emailCond) {
                myAlert = 'Emails are not the same.';
            }
            if(!passCond) {
                myAlert = 'Passwords are not the same.';
            }
            if(!firstnameCond) {
                myAlert = 'You have to put your first name.';
            }
            if(!surnameCond) {
                myAlert = 'You have to put your surname.';
            }
            if(!validemailCond){
                myAlert = 'Your email is not valid.'
            }
            this.setState({
                registerAlert: myAlert
            });
        }
        
    }
    checkRender(){
        if(this.state.redirect === true) {
            return <Redirect to="/login"/>
        }
    }
    renderAlert(){
        if(this.state.registerAlert != null) {
            return <Alert>{this.state.registerAlert}</Alert>
        }
    }
    render(){
        return(
            <WrappedRegister className={this.props.className}>
                {this.checkRender()}
                <RegisterTitle>Create new account</RegisterTitle>
                <RegisterForm>
                    <RegisterSubtitle>User avatar</RegisterSubtitle>
                    <input 
                        type='text' 
                        id='regUrl' 
                        placeholder='- OPTIONALLY - avatar URL' 
                        value={this.state.urlValue} 
                        onChange={this.handleChange.bind(this)}
                    />
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
                    <RegisterSubtitle>User personal information</RegisterSubtitle>
                    <input 
                        type='text' 
                        id='regFirstname' 
                        placeholder='Your first name'  
                        value={this.state.firstnameValue}
                        onChange={this.handleChange.bind(this)}
                    />
                    <input 
                        type='text' 
                        id='regSurname' 
                        placeholder='Your  surname'  
                        value={this.state.surnameValue}
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
                    {this.renderAlert()}
                </RegisterForm>
            </WrappedRegister>
        );
    }
}
// # REDUX
const mapDispatchToProps = dispatch => {
    return {
        signIn: payload => dispatch(LogIn(payload)),
        sendData: payload => dispatch(UpdateData(payload))
    };
};

export default connect(null, mapDispatchToProps)(Register);