// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
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
export default class Shoutbox extends Component {
    render(){
        return(
            <WrappedShoutbox className={this.props.className}>
                <StyledChat/>
            </WrappedShoutbox>
        );
    }
}