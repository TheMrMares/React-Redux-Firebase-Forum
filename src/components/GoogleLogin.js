// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import { Redirect } from 'react-router'
import {auth, firestore, googleProvider} from './../firebase/index';
import { connect } from "react-redux";
import { LogIn } from './../actions/index';
import resolutions from './../constants/resolutions';
// # STYLED
const GoogleSign = styled.input.attrs({
    type: 'submit',
    value: 'Log in with GOOGLE'
})`
    background: ${colors.positive} !important;
    width: 100%;
    &:hover {
        box-shadow: 0px 0px 5px 0px ${colors.positive} !important;
    }
    @media only screen and (max-width: ${resolutions.medium}) {
        font-size: 1.1em;
        padding: 15px;
    }
`;
const GoogleWrapper = styled.div`
    display: flex;
`;
class GoogleLogin extends Component {
    constructor(){
        super();
        this.state = {
            redirect: false
        }

    }
    handleGoogle(evt){
        evt.preventDefault();
        evt.stopPropagation();
        auth.signInWithPopup(googleProvider).then((result) => {
            let user = result.user;
            let userName = user.displayName.split(' ');
            firestore.collection('users').doc(user.uid).set({
                email: user.email,
                firstname: userName[0],
                surname: userName[1],
                imageURL: user.photoURL,
                userID: user.uid
            }).then(() => {

                this.props.signIn({user: user, data: {
                    email: user.email,
                    firstname: userName[0],
                    surname: userName[1],
                    imageURL: user.photoURL,
                    userID: user.uid
                }});
                this.setState({redirect: true})

            }).catch(function(error) {
                console.log(`# DOCUMENT ADD ERROR - Code: ${error.code} Message: ${error.message}`);
            });

        }).catch(function(error) {
            console.log(`# GOOGLE ERROR - Code: ${error.code} Message: ${error.message}`);
        });
    }
    renderRedirect(){
        if(this.state.redirect === true){
            return <Redirect to='/'/>
        }
    }
    render(){
        return(
            <GoogleWrapper>
                <GoogleSign onClick={this.handleGoogle.bind(this)}/>
                {this.renderRedirect()}
            </GoogleWrapper>
        );
    }
}
// # REDUX
const mapDispatchToProps = dispatch => {
    return {
        signIn: payload => dispatch(LogIn(payload))
    };
};

export default connect(null, mapDispatchToProps)(GoogleLogin);