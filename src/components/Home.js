// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import { connect } from "react-redux";
import {firestore} from './../firebase/index';
import { UpdateData } from './../actions/index';
// # STYLED
const HomeTitle = styled.h1`
    font-size: 1.5em;
`;
const WrappedHome = styled.section`
    background: ${colors.fair};
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 40px 0px;
`;
// # COMPONENT
class Home extends Component {
    addData(){
        /*console.log('xd');
        firestore.collection('threads').add({
            title: 'anythinggg'
        }).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        }).catch(function(error) {
            console.error("Error adding document: ", error);
        });*/
        this.props.sendData({firstname: 'do diabla'});
    }
    getData(){
        firestore.collection('threads').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                console.log(doc.data().title);
            });
        });
    }
    render(){
        return(
            <WrappedHome>
                <HomeTitle>Welcome home!</HomeTitle>
                <p>Hmm</p>
                <button onClick={this.addData.bind(this)}>Add data</button>
                {this.getData()}
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