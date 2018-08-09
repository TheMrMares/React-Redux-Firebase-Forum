// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import avatarThumbURL from './../images/avatar-thumb1.1.png';
import DetailedThread from './DetailedThread';
import resolutions from './../constants/resolutions';
// # STYLED
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
    @media only screen and (max-width: ${resolutions.medium}) {
        font-size: 1.1em;
    }
`;
const Marked = styled.span`
    color: ${colors.special};
    font-size: 0.8em;
    @media only screen and (max-width: ${resolutions.medium}) {
        font-size: 1em;
    }
`;
const DataShortcut = styled.div``;
const AuthorShortcut = styled.div``;
const DateShortcut = styled.div``;
const Shortcut = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 5px;
    ${DataShortcut}, ${AuthorShortcut}, ${DateShortcut} {
        flex: 1 0 ${100/3}%;
        margin: 6px 0px;
        @media only screen and (max-width: ${resolutions.medium}) {
            flex: 1 0 100%;
        }
        display: flex;
        justify-content: flex-start;
        align-items: center;
        ${Marked} {
            margin-right: 10px;
            margin-left: 10px;
        }
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
                        <DateShortcut>
                            <Marked>Created: </Marked>
                            <ShortTitle>
                                {this.props.created}
                            </ShortTitle>
                        </DateShortcut>
                    </Shortcut>
                </Real>
                {this.renderDetailed()}
            </WrappedThread>
        );
    }
}