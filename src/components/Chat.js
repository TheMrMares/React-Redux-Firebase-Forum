// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import {firestore, auth} from './../firebase/index';
import { connect } from "react-redux";
import ChatMessage from './ChatMessage';
// # STYLED
const SendMessage = styled.input.attrs({
    type: 'submit',
    value: 'Send message'
})`
    background: ${colors.positive};
    &:hover {
        box-shadow: 0px 0px 5px 0px ${colors.positive};
    }
`;
const MessageField = styled.input.attrs({
    type: 'text'
})`
    min-width: 50%;
`;
const ChatArea = styled.div`
    height: 400px;
    overflow-y: scroll;
`;
const SendArea = styled.form`
    display: flex;
    justify-content: left;
    align-items: center;
    border-top: 1px solid ${colors.smoothdark};
`;
const WrappedChat = styled.div`
    border: 1px solid ${colors.smoothdark};
    border-radius: 10px;
    background: ${colors.dark};
    padding: 10px;
    width: 60%;
    ${SendArea}, ${ChatArea} {
        padding: 5px;
    }
`;
// # COMPONENT
class Chat extends Component {
    constructor(){
        super();
        this.state = {
            userMessage: ''
        }
    }
    handleChange(evt){
        this.setState({
            userMessage: evt.target.value
        })
    }
    handleSubmit(evt){
        evt.preventDefault();
        evt.stopPropagation();
        firestore.collection('messages').add({
            message: this.state.userMessage,
            userID: auth.currentUser.uid,
            created: new Date()
        }).then((doc) => {
            this.setState({
                userMessage: ''
            })
        }).catch(function(error) {
            console.log(`# CHAT MESSAGE POST ERROR - Code: ${error.code} Message: ${error.message}`);
        });
    }
    render() {
        return(
            <WrappedChat>
                <ChatArea>
                    {this.props.messages.messages.map((item ,index) => {
                        return <ChatMessage text={item.message} userID={item.userID} key={index}/>
                    })}
                </ChatArea>
                <SendArea>
                    <MessageField value={this.state.userMessage} onChange={this.handleChange.bind(this)}/>
                    <SendMessage onClick={this.handleSubmit.bind(this)}/>
                </SendArea>
            </WrappedChat>
        );
    }
}
// # REDUX
const mapStateToProps = state => {
    return {
        messages: state.messages
    };
};
export default connect(mapStateToProps, null)(Chat);