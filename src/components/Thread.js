// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import {firestore} from './../firebase/index';
import avatarThumbURL from './../images/avatar-thumb1.1.png';
import DetailedThread from './DetailedThread';
// # STYLED
const Shortcut = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
`;
const ShortTitle = styled.h2`
    margin: 0px 0px 0px 10px;
    font-size: 0.9em;
`;
const ShortAvatar = styled.img`
    border: 1px solid ${colors.smoothdark};
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
`;
const DataShortcut = styled.div`
    flex: 0 0 70%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    ${Marked} {
        margin-left: 10px;
    }
`;
const AuthorShortcut = styled.div`
    flex: 0 0 30%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    ${Marked} {
        margin-right: 10px;
    }
`;
const StyledDetailed = styled(DetailedThread)``;
const Real = styled.div``;
const WrappedThread = styled.div`
    background: ${colors.dark}
    margin: 10px 5px;
    &:hover {
        background: ${colors.littledark};
    }
`;
// # COMPONENT
export default class Thread extends Component {
    constructor(){
        super()
        this.state = {
            author: null,
            isDetailed: false
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
    showDetailed(){
        this.setState({
            isDetailed: true
        });
    }
    hideDetailed(){
        this.setState((prevState) => {
            return {
                isDetailed: false
            }
        });
    }
    renderDetailed(){
        if(this.state.isDetailed === true){
            return <StyledDetailed 
                avatarURL={this.getAuthor('imageURL')} 
                author={`${this.getAuthor('firstname')} ${this.getAuthor('surname')}`} 
                title={this.props.title} text={this.props.text} 
                callbackForThread={this.hideDetailed.bind(this)}
            />;
        }
    }
    render(){
        return(
            <WrappedThread className={this.props.className}>
                <Real onClick={this.showDetailed.bind(this)}>
                    <Shortcut>
                        <DataShortcut>
                            <Marked>Thread: </Marked>
                            <ShortTitle>
                                {this.props.title}
                            </ShortTitle>
                        </DataShortcut>
                        <AuthorShortcut>
                            <Marked>Author: </Marked>
                            <ShortAvatar src={this.getAuthor('imageURL')} onError={this.replaceImage.bind(this)}/>
                            <ShortAuthor>{`${this.getAuthor('firstname')} ${this.getAuthor('surname')}`}</ShortAuthor>
                        </AuthorShortcut>
                    </Shortcut>
                </Real>
                {this.renderDetailed()}
            </WrappedThread>
        );
    }
}