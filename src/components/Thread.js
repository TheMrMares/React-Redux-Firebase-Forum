// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import {firestore} from './../firebase/index';
import avatarThumbURL from './../images/avatar-thumb1.1.png';
// # STYLED
const DataShortcut = styled.div`
    flex: 0 0 70%;
`;
const AuthorShortcut = styled.div`
    flex: 0 0 30%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
const Shortcut = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
`;
const ShortTitle = styled.h2`
    margin: 0px;
    font-size: 1em;
`;
const ShortAvatar = styled.img`
    border: 1px solid ${colors.grey};
    width: 30px;
    height: 30px;
    border-radius: 100%;
`;
const ShortAuthor = styled.h3`
    margin: 0px;
    font-size: 1em;
    margin-left: 20px;
`;
const Marked = styled.span`
    color: ${colors.special};
    font-size: 0.8em;
    margin-right: 10px;
`;
const WrappedThread = styled.div`
    border-radius: 10px;
    border: 1px solid ${colors.grey};
    margin: 10px 5px;
    &:hover {
        border: 1px solid ${colors.special};
    }
`;
// # COMPONENT
export default class Thread extends Component {
    constructor(){
        super()
        this.state = {
            author: null
        }
    }
    componentDidMount(){
        firestore.collection('users').doc(this.props.userID).get().then((doc) => {
            this.setState({
                author: doc.data()
            })
        }).catch((error) => {
            console.log(`# READ AUTHOR ERROR - Code: ${error.code} Message: ${error.message}`);
        });
    }
    replaceImage(evt){
        evt.target.src = avatarThumbURL;
    }
    getAuthor(fieldname){
        if(this.state.author != null){
            return this.state.author[fieldname];
        }
    }
    render(){
        return(
            <WrappedThread>
                <Shortcut>
                    <DataShortcut>
                        <ShortTitle>
                            {this.props.title}
                        </ShortTitle>
                    </DataShortcut>
                    <AuthorShortcut>
                        <ShortAvatar src={this.getAuthor('imageURL')} onError={this.replaceImage.bind(this)}/>
                        <ShortAuthor><Marked>Author: </Marked>{`${this.getAuthor('firstname')} ${this.getAuthor('surname')}`}</ShortAuthor>
                    </AuthorShortcut>
                </Shortcut>
            </WrappedThread>
        );
    }
}