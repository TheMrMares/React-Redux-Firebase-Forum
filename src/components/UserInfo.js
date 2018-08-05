// # IMPORTS
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import colors from './../constants/colors';
import {auth} from './../firebase/index';

// # STYLED
const WrappedUserInfo = styled.div`
    border: 1px solid red;
    display: flex;
    flex-wrap: wrap;
`;
const InfoTitle = styled.h1`
    flex: 0 0 100%;
    font-size: 0.8em;
    margin: 5px;
`;
const InformationText = styled.p`
    flex: 0 0 50%;
    border: 1px solid blue;
    margin: 0px;
    padding: 5px;
    font-size: 0.8em;
    text-align: center;
`;
const NormalSpan = styled.span`
    color: ${colors.grey};
`;
const AlertSpan = styled.span`
    color: ${colors.alert}
`;
// # COMPONENT
export default class UserInfo extends Component {
    constructor(){
        super()
        this.state = {
            loggedUser: auth.currentUser
        }
    }
    renderInfo(){
        if(this.state.loggedUser){
            return this.state.loggedUser
        } else {
            return <AlertSpan>Not Logged</AlertSpan>
        }
    }
    render(){
        return(
            <WrappedUserInfo className={this.props.className}>
                <InfoTitle>Logged as</InfoTitle>
                <InformationText><NormalSpan>Email</NormalSpan> {this.renderInfo()}</InformationText>
                <InformationText><NormalSpan>Email</NormalSpan> some email</InformationText>
                <InformationText><NormalSpan>Email</NormalSpan> some email</InformationText>
                <InformationText><NormalSpan>Email</NormalSpan> some email</InformationText>
                <InformationText><NormalSpan>Email</NormalSpan> some email</InformationText>
            </WrappedUserInfo>
        );
    }
}