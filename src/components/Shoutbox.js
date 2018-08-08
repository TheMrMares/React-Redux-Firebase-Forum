// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import {firestore} from './../firebase/index';
import {SetMessages} from './../actions/index';
import { connect } from "react-redux";
import Chat from './Chat';
// # STYLED
const StyledChat = styled(Chat)``;
const WrappedShoutbox = styled.section`
    background: ${colors.verydark};
    padding: 40px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
// # COMPONENT
class Shoutbox extends Component {
    componentDidMount(){
        firestore.collection("messages")
        .onSnapshot(() => {
            firestore.collection('messages').orderBy('created', 'desc').get().then((data) => {
                let filteredData = data.docs.filter((item) => {
                    if(item.ref.id !== 'template'){
                        return item;
                    }
                });
                this.props.setMessages(filteredData.map((item) => {
                    return item.data();
                }));
            }).catch((error) => {
                console.log(`# SET THREADS ERROR - Code: ${error.code} Message: ${error.message}`);
            });
        });
    }
    render(){
        return(
            <WrappedShoutbox className={this.props.className}>
                <StyledChat/>
            </WrappedShoutbox>
        );
    }
}
// # REDUX
const mapDispatchToProps = dispatch => {
    return {
        setMessages: payload => dispatch(SetMessages(payload))
    };
};
export default connect(null, mapDispatchToProps)(Shoutbox);