// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import {firestore, auth} from './../firebase/index';
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
const WrappedAdd = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
`;
// # COMPONENT
export default class AddMessage extends Component {
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
        }).then(() => {
            this.setState({
                userMessage: ''
            })
        }).catch(function(error) {
            console.log(`# CHAT MESSAGE POST ERROR - Code: ${error.code} Message: ${error.message}`);
        });
    }
    render(){
        return(
            <WrappedAdd>
                <MessageField value={this.state.userMessage} onChange={this.handleChange.bind(this)}/>
                <SendMessage onClick={this.handleSubmit.bind(this)}/>
            </WrappedAdd>
        );
    }
}