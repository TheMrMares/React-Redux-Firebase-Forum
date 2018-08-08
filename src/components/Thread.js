// # IMPORTS
import React, { Component } from 'react';
import {Redirect } from 'react-router-dom';
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
            isDetailed: false
        }
    }
    replaceImage(evt){
        evt.target.src = avatarThumbURL;
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
                refID={this.props.refID}
                avatarURL={this.props.authorURL} 
                author={`${this.props.authorFirstname} ${this.props.authorSurname}`} 
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
                            <ShortAvatar src={this.props.authorURL} onError={this.replaceImage.bind(this)}/>
                            <ShortAuthor>{`${this.props.authorFirstname} ${this.props.authorSurname}`}</ShortAuthor>
                        </AuthorShortcut>
                    </Shortcut>
                </Real>
                {this.renderDetailed()}
            </WrappedThread>
        );
    }
}