// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import { connect } from "react-redux";
import {firestore} from './../firebase/index';
import { UpdateData } from './../actions/index';
import AddThread from './AddThread';

// # STYLED
const StyledAddThread = styled(AddThread)``;
const ThreadArea = styled.div`
    width: 100%;
    border: 1px solid red;
    padding: 20px;
`;
const HomeSubtitle = styled.h2`
    font-size: 1.2em;
    color: ${colors.special};
`;
const HomeTitle = styled.h1`
    font-size: 1.5em;
`;
const WrappedHome = styled.section`
    background: ${colors.fair};
    padding: 40px 0px;
`;
// # COMPONENT
class Home extends Component {
    constructor(){
        super();
        this.state = {
            addThreadState: false
        };
    }
    getData(){
        firestore.collection('threads').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                console.log(doc.data().title);
            });
        });
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
            <WrappedHome>
                <HomeTitle>Threads</HomeTitle>
                <ThreadArea>
                    <HomeSubtitle>Add new thread</HomeSubtitle>
                    <button onClick={this.showAddThread.bind(this)}>Add</button>
                    {this.renderAddThread()}
                    <HomeSubtitle>List of threads</HomeSubtitle>
                </ThreadArea>
            </WrappedHome>
        );
    }
}
// # REDUX
const mapStateToProps = state => {
    return { 
        auths: state.auths
    };
};
const mapDispatchToProps = dispatch => {
    return {
        sendData: payload => dispatch(UpdateData(payload))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);