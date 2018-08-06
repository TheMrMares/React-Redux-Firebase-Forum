// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import {firestore, auth} from './../firebase/index';
// # STYLED
const Title = styled.input.attrs({
    type: 'text',
    placeholder: 'Title'
})`
    min-width: 40%;
`;
const Text = styled.textarea.attrs({
    placeholder: 'Content of your thread...'
})`
    resize: none;
    min-width: 60%;
    min-height: 300px;
`;
const ButtonsHolder = styled.div`
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Submit = styled.input.attrs({
    type: 'submit'
})``;
const Cancel = styled.button`
    background: ${colors.alert};
`;
const AddForm = styled.form`
    background: ${colors.fair};
    width: 80%;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid ${colors.grey};
`;
const Label  = styled.h1`
    font-size: 1em;
    margin: 5px;
`;
const AddAlert = styled.p`
    color: ${colors.alert};
    font-weight: bold;
    font-size: 0.9em;
    text-align: center;
`;
const WrappedAddThread = styled.div`
    border: 1px solid red;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0,0,0 , 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
`;
// # COMPONENT
export default class AddThread extends Component {
    constructor(){
        super();
        this.state = {
            titleValue: '',
            textValue: '',
            alert: null
        }
    }
    renderAlert(){
        if(this.state.alert != null){
            return <AddAlert>{this.state.alert}</AddAlert>
        }

    }
    handleChange(evt){
        switch(evt.target.id){
            case 'threadTitle':
                this.setState({titleValue: evt.target.value});
            break;
            case 'threadText':
                this.setState({textValue: evt.target.value});
            break;
            default:
            break;
        }
    }
    handleSubmit(evt){
        evt.preventDefault();
        evt.stopPropagation();

        let titleCond = (this.state.titleValue.length >= 6);
        let textCond = (this.state.textValue.length >= 16);
        if(titleCond && textCond){

            firestore.collection('threads').add({
                title: this.state.titleValue,
                text: this.state.textValue,
                userID: auth.currentUser.uid
            }).then(() => {
                this.informParent();
            })
            .catch(function(error) {
                console.log(`# ADD THREAD ERROR - Code: ${error.code} Message: ${error.message}`);
            });

        } else {
            if(!titleCond){
                this.setState({alert: 'Title have to be min. 6 characters long.'})
            }
            if(!textCond){
                this.setState({alert: 'Text have to be min. 16 characters long.'})
            }
        }

    }
    informParent(){
        this.props.callbackForAddThread()
    }
    render(){
        return(
            <WrappedAddThread>
                <AddForm>
                    <Label>Thread title</Label>
                    <Title 
                        id='threadTitle'
                        value={this.state.titleValue}
                        onChange={this.handleChange.bind(this)}
                    />
                    <Label>Thread text</Label>
                    <Text 
                        id='threadText' 
                        value={this.state.textValue}
                        onChange={this.handleChange.bind(this)}
                    />
                    {this.renderAlert()}
                    <ButtonsHolder>
                        <Cancel onClick={this.informParent.bind(this)}>Cancel</Cancel>
                        <Submit value='Post thread' onClick={this.handleSubmit.bind(this)}/>
                    </ButtonsHolder>
                </AddForm>
            </WrappedAddThread>
        );
    }
}