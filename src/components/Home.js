import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import colors from './../constants/colors';

import {auth} from './../firebase/index';

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
    constructor(){
        super()
        
    }
    render(){
        return(
            <WrappedHome>
                <HomeTitle>Welcome home!</HomeTitle>
                <p>Hmm</p>
            </WrappedHome>
        );
    }
}