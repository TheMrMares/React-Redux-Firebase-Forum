import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import colors from './../constants/colors';

import {auth} from './../firebase/index';

import Navigation from './Navigation';

const StyledNavigation = styled(Navigation)`
    width: 100%;
`;
const HeaderTitle = styled.h1`
    font-size: 1.5em;
    text-transform: uppercase;
    color: ${colors.special};
    border: 2px solid ${colors.special};
    border-radius: 10px;
    padding: 15px;
    margin: 10px;
    display: flex;
    justify-content: center;
    width: auto;
`;

const WrappedHeader = styled.header`
    padding: 50px 0px 0px 0px;
    background: ${colors.fair};
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
`;

export default class Header extends Component {

    render(){
        return(
            <WrappedHeader className={this.props.className}>
                <HeaderTitle>Awesomeness Forum</HeaderTitle>
                <StyledNavigation/>
            </WrappedHeader>
        );
    }
}