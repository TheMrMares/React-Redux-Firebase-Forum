// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import avatarThumbURL from './../images/avatar-thumb1.1.png';
// # STYLED
const Avatar = styled.img`
    border: 1px solid ${colors.smoothdark};
    width: 20px;
    height: 20px;
    border-radius: 100%;
    margin: 0px 5px;
`;
const Author = styled.div`
    display: flex;
    justify-content: left;
`;
const Content = styled.div`
    border-radius: 10px;
    background: ${colors.verydark}
    margin: 5px;
    padding: 5px;
    flex: 0 0 auto;
    font-size: 0.9em;
`;
const WrappedComment = styled.div`
    display: flex;
    flex-direction: column;
    ${Content}, ${Author} {
        max-width: 100%;
        position: relative;
        word-wrap: break-word;
        overflow-wrap: break-word;
    }
`;

// # COMPONENT
export default class UserComment extends Component {
    replaceImage(evt){
        evt.target.src = avatarThumbURL;
    }
    render(){
        return(
            <WrappedComment>
                <Author>
                    <Avatar src={this.props.authorURL} onError={this.replaceImage.bind(this)}/>
                    {`${this.props.authorFirstname} ${this.props.authorSurname}`}
                </Author>
                <Content>
                    {this.props.comment}
                </Content>
            </WrappedComment>
        );
    }
}