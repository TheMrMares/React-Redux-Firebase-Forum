// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import { connect } from "react-redux";
import {firestore} from './../firebase/index';
import { SetData, AddData } from './../actions/index';
import AddThread from './AddThread';
import ThreadList from './ThreadList';

// # STYLED
const StyledAddThread = styled(AddThread)``;
const StyledThreadList = styled(ThreadList)``;
const ThreadArea = styled.div`
    width: 100%;
    padding: 0px 20px;
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
`;
const WrappedHome = styled.section`
    background: ${colors.verydark};
    padding: 40px 20px;
`;
// # COMPONENT
class Home extends Component {
    constructor(){
        super();
        this.state = {
            addThreadState: false,
            threads: []
        };
    }
    componentDidMount(){
        firestore.collection('threads').get().then((data) => {
            let filteredData = data.docs.filter((item) => {
                if(item.ref.id !== 'template'){
                    return item;
                }
            });
            this.props.setData(filteredData.map((item) => {
                return item.data();
            }));
        }).catch((error) => {
            console.log(`# SET THREADS ERROR - Code: ${error.code} Message: ${error.message}`);
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
// # REDUX
const mapDispatchToProps = dispatch => {
    return {
        setData: payload => dispatch(SetData(payload)),
        addData: payload => dispatch(AddData(payload))
    };
};
export default connect(null, mapDispatchToProps)(Home);