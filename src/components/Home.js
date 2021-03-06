// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import AddThread from './AddThread';
import ThreadList from './ThreadList';
import resolutions from './../constants/resolutions';

// # STYLED
const StyledAddThread = styled(AddThread)``;
const StyledThreadList = styled(ThreadList)``;
const ThreadArea = styled.div`
    width: 100%;
    padding: 0px 20px;
    
    @media only screen and (max-width: ${resolutions.medium}) {
        padding: 0px 10px;
    }
    @media only screen and (max-width: ${resolutions.small}) {
        padding: 0px 0px;
    }
`;
const HomeSubtitle = styled.h2`
    font-size: 1.2em;
    color: ${colors.fair};
`;
const HomeTitle = styled.h1`
    font-size: 1.5em;
    margin: 5px;
    color: ${colors.smoothdark}
`;
const CreateNew = styled.button`
    background: ${colors.positive};
    &:hover {
        box-shadow: 0px 0px 5px 0px ${colors.positive};
    }
    @media only screen and (max-width: ${resolutions.medium}) {
        font-size: 1em;
        padding: 10px 40px;
    }
`;
const WrappedHome = styled.section`
    background: ${colors.verydark};
    padding: 40px 20px;
    @media only screen and (max-width: ${resolutions.medium}) {
        padding: 20px 10px;
    }
    @media only screen and (max-width: ${resolutions.small}) {
        padding: 10px 0px;
    }
`;
// # COMPONENT
export default class Home extends Component {
    constructor(){
        super();
        this.state = {
            addThreadState: false
        };
    }
    showAddThread(){
        this.setState({
            addThreadState: true
        })
    }
    hideAddThread(){
        this.setState({
            addThreadState: false
        })
    }
    renderAddThread(){
        if(this.state.addThreadState === true){
            return <StyledAddThread callbackForAddThread={this.hideAddThread.bind(this)}/>;
        }
    }
    render(){
        return(
            <WrappedHome className={this.props.className}>
                <HomeTitle>Threads</HomeTitle>
                <ThreadArea>
                    <HomeSubtitle>Add new thread</HomeSubtitle>
                    <CreateNew onClick={this.showAddThread.bind(this)}>Create new</CreateNew>
                    {this.renderAddThread()}
                    <HomeSubtitle>Users threads</HomeSubtitle>
                    <StyledThreadList/>
                </ThreadArea>
            </WrappedHome>
        );
    }
}