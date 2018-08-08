// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import {firestore, auth} from './../firebase/index';
import { connect } from 'react-redux';
import firebase from 'firebase/app'
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
class AddMessage extends Component {
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
            created: firebase.firestore.FieldValue.serverTimestamp(),
            authorID: auth.currentUser.uid,
            authorURL: this.props.auths.authedData.imageURL,
            authorFirstname: this.props.auths.authedData.firstname,
            authorSurname: this.props.auths.authedData.surname
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
            <WrappedAdd className={this.props.className}>
                <MessageField value={this.state.userMessage} onChange={this.handleChange.bind(this)}/>
                <SendMessage onClick={this.handleSubmit.bind(this)}/>
            </WrappedAdd>
        );
    }
}
// # REDUX
const mapStateToProps = state => {
    return { 
        auths: state.auths
    };
};

export default connect(mapStateToProps, null)(AddMessage);