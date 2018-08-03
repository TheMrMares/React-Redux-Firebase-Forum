import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import colors from './../constants/colors';

const HomeTitle = styled.h1`
    font-size: 1.5em;
`;

const WrappedHome = styled.section`
    background: ${colors.fair};
    display: flex;
    justify-content: center;
    flex-direction: columnw;
    align-items: center;
    padding: 40px 0px;
`;

export default class Home extends Component {
    render(){
        return(
            <WrappedHome>
                <HomeTitle>Welcome home!</HomeTitle>
            </WrappedHome>
        );
    }
}