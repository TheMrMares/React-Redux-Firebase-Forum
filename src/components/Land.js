// # IMPORTS
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import colors from './../constants/colors';
// # STYLED
const WrappedLand = styled.section`
    background: ${colors.fair};
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 40px 0px;
`;
// # COMPONENT
export default class Land extends Component {
    render(){
        return(
            <WrappedLand>
                <h1>You are not logged in!</h1>
                <p>Badly you did not sign in! Go and do it if you want enjoy our forum!</p>
            </WrappedLand>
        );
    }
}