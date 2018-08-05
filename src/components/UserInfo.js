// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import {auth} from './../firebase/index';

// # STYLED
const InformationHolder = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    flex-direction: column;
`;
const AvatarHolder = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;
const Avatar = styled.img`
    width: 130px;
    height: 130px
    border-radius: 100%;
    border: 1px solid ${colors.grey};
`;
const InfoTitle = styled.h1`
    flex: 0 0 100%;
    font-size: 0.8em;
    margin: 5px;
`;
const Information = styled.p`
    margin: 0px;
`;
const WrappedUserInfo = styled.div`
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    border: 1px solid ${colors.grey};
`;
// # COMPONENT
export default class UserInfo extends Component {
    render(){
        return(
            <WrappedUserInfo className={this.props.className}>
            <AvatarHolder>
                <Avatar/>
            </AvatarHolder>
            <InformationHolder>
                <InfoTitle>Logged as</InfoTitle>
                <Information>{this.props.userEmail}</Information>
            </InformationHolder>
            </WrappedUserInfo>
        );
    }
}