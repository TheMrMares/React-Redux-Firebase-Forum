// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import {firestore, auth} from './../firebase/index';
import { connect } from 'react-redux';
// # STYLED
const CommentField = styled.textarea.attrs({
    placeholder: 'Type your comment here...'
})`
    resize: none;
`;
const SendComment = styled.input.attrs({
    type: 'submit',
    value: 'Post comment'
})`
    background: ${colors.positive};
    &:hover {
        box-shadow: 0px 0px 5px 0px ${colors.positive};
    }
`;
const WrappedAddComment = styled.form`
    display: flex;
    flex-direction: column;
`;
// # COMPONENT
class AddComment extends Component {
    constructor(){
        super();
        this.state = {
            commentValue: ''
        }
    }
    handleChange(evt){
        this.setState({
            commentValue: evt.target.value
        })
    }
    handleSubmit(evt){
        evt.preventDefault();
        evt.stopPropagation();

        firestore.collection('threads').doc(this.props.refID).collection('comments').add({
            comment: this.state.commentValue,
            created: new Date(),
            authorID: auth.currentUser.uid,
            authorURL: this.props.auths.authedData.imageURL,
            authorFirstname: this.props.auths.authedData.firstname,
            authorSurname: this.props.auths.authedData.surname
        }).then((doc) => {
            this.setState({
                commentValue: ''
            })
        })
        .catch(function(error) {
            console.log(`# ADD COMMENT ERROR - Code: ${error.code} Message: ${error.message}`);
        });

    }
    render(){
        return(
            <WrappedAddComment className={this.props.className}>
                <CommentField value={this.state.commentValue} onChange={this.handleChange.bind(this)}/>
                <SendComment onClick={this.handleSubmit.bind(this)}/>
            </WrappedAddComment>
        );
    }
}
// # REDUX
const mapStateToProps = state => {
    return { 
        auths: state.auths
    };
};

export default connect(mapStateToProps, null)(AddComment);