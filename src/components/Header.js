import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import colors from './../constants/colors';

import {auth} from './../firebase/index';

const HeaderTitle = styled.h1`
    font-size: 1.5em;
    text-transform: uppercase;
    color: ${colors.special};
    border: 2px solid ${colors.special};
    border-radius: 10px;
    padding: 15px;
    margin: 10px;
`;

const WrappedHeader = styled.header`
    padding: 50px 0px;
    background: ${colors.fair};
    display: flex;
    justify-content: center;
`;

export default class Header extends Component {

    render(){
        return(
            <WrappedHeader className={this.props.className}>
                <HeaderTitle>Awesomeness Forum</HeaderTitle>
            </WrappedHeader>
        );
    }
}