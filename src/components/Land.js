import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import colors from './../constants/colors';

const WrappedLand = styled.section`
    background: ${colors.fair};
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 40px 0px;
`;

export default class Land extends Component {
    render(){
        return(
            <WrappedLand>
                <p>Badly you did not sign in! Go and login!</p>
            </WrappedLand>
        );
    }
}