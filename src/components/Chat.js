// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import { connect } from "react-redux";
import ChatMessage from './ChatMessage';
import AddMessage from './AddMessage';
import uuidv4 from 'uuid/v4'
import resolutions from './../constants/resolutions';
// # STYLED
const ChatArea = styled.div`
    height: 400px;
    overflow-y: scroll;
`;
const SendArea = styled.form`
    border-bottom: 1px solid ${colors.smoothdark};
`;
const WrappedChat = styled.div`
    border: 1px solid ${colors.smoothdark};
    border-radius: 10px;
    background: ${colors.dark};
    padding: 10px;
    width: 60%;
    @media only screen and (max-width: ${resolutions.big}) {
        width: 70%;
    }
    @media only screen and (max-width: ${resolutions.medium}) {
        width: 80%;
    }
    @media only screen and (max-width: ${resolutions.small}) {
        width: 90%;
    }
    ${SendArea}, ${ChatArea} {
        padding: 5px;
    }
`;
// # COMPONENT
class Chat extends Component {
    render() {
        return(
            <WrappedChat>
                <SendArea>
                    <AddMessage/>
                </SendArea>
                <ChatArea>
                    {this.props.messages.messages.map((item ,index) => {
                        return <ChatMessage 
                            text={item.data().message} 
                            authorID={item.data().authorID}
                            authorURL={item.data().authorURL}
                            authorFirstname={item.data().authorFirstname}
                            authorSurname={item.data().authorSurname}
                            key={uuidv4()}
                        />
                    })}
                </ChatArea>
            </WrappedChat>
        );
    }
}
// # REDUX
const mapStateToProps = state => {
    return {
        messages: state.messages
    };
};
export default connect(mapStateToProps, null)(Chat);