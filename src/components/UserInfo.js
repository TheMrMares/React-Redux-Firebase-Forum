// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import {firestore,auth} from './../firebase/index';

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
    margin: 0px;
`;
const Information = styled.p`
    margin: 0px;
`;
const Label = styled.h2`
    color: ${colors.grey};
    font-size: 0.8em;
`;
const WrappedUserInfo = styled.div`
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    border: 1px solid ${colors.grey};
    margin-top: 10px;
`;
// # COMPONENT
export default class UserInfo extends Component {
    constructor(){
        super();
        this.state = {
            queryData: null
        }
    }
    componentDidMount(){
        let user = auth.currentUser;
        let docRef = firestore.collection('users').doc(user.uid);
        docRef.get().then((doc) => {
            if(doc.exists){
                this.setState({
                    queryData: doc.data()
                });
            }
        }).catch((error) => {
            console.log(`# READ ERROR - Code: ${error.code} Message: ${error.message}`);
        });
    }
    renderData(){
        if(this.state.queryData != null){
            let data = this.state.queryData;
            return (
                <InformationHolder>
                    <InfoTitle>Logged as</InfoTitle>
                    <Label>Email:</Label>
                    <Information>{data.email}</Information>
                    <Label>Firstname &#38; surname</Label>
                    <Information>{`${data.firstname} ${data.surname}`}</Information>
                </InformationHolder>
            );
        } else {
            <Label>Fetching...</Label>
        }
    }
    render(){
        return(
            <WrappedUserInfo className={this.props.className}>
                <AvatarHolder>
                    <Avatar/>
                </AvatarHolder>
                {this.renderData()}
            </WrappedUserInfo>
        );
    }
}