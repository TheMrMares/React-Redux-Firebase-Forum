// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import { connect } from "react-redux";
import avatarThumbURL from './../images/avatar-thumb1.1.png';
// # STYLED
const InformationHolder = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 20px 20px 20px;
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
    border: 1px solid ${colors.smoothdark};
`;
const InfoTitle = styled.h1`
    flex: 0 0 100%;
    font-size: 0.8em;
    margin: 0px;
    color: ${colors.special};
`;
const Information = styled.p`
    margin: 0px;
`;
const Label = styled.h2`
    color: ${colors.grey};
    font-size: 0.8em;
`;
const WrappedUserInfo = styled.div`
    background: ${colors.dark};
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    border: 1px solid ${colors.smoothdark};
`;
// # COMPONENT
class UserInfo extends Component {
    constructor(){
        super();
        this.state = {
            queryData: null
        }
    }
    replaceImage(evt){
        evt.target.src = avatarThumbURL;
    }
    render(){
        return(
            <WrappedUserInfo className={this.props.className}>
                <AvatarHolder>
                    <Avatar src={this.props.auths.authedData.imageURL} onError={this.replaceImage.bind(this)}/>
                </AvatarHolder>
                <InformationHolder>
                    <InfoTitle>Logged as</InfoTitle>
                    <Label>Email:</Label>
                    <Information>{this.props.auths.authedData.email}</Information>
                    <Label>Firstname &#38; surname</Label>
                    <Information>{`${this.props.auths.authedData.firstname} ${this.props.auths.authedData.surname}`}</Information>
                </InformationHolder>
            </WrappedUserInfo>
        );
    }
}

// # REDUX
const mapStateToProps = state => {
    return { 
        auths: state.auths
    };
};

export default connect(mapStateToProps, null)(UserInfo);