// # IMPORTS
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import colors from './../constants/colors';
// # STYLED
const titlesCss = css`
    margin: 5px;
`;
const LandingTitle = styled.h1`
    ${titlesCss}
    color: ${colors.alert};
`;
const LandingSubtitle = styled.h2`
    ${titlesCss}
    color: ${colors.alert};
    font-size: 1.2em;
`;
const LandingText = styled.p`
    color: ${colors.fair};
    max-width: 50%;
    text-align: center;
`;
const LandingLink = styled(Link)`
    margin: 5px;
    color: ${colors.special};
    font-size: 0.9em;
`;
const WrappedLand = styled.section`
    background: ${colors.verydark};
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
                <LandingTitle>Sorry</LandingTitle>
                <LandingSubtitle>Not enough permissions</LandingSubtitle>
                <LandingText>To enjoy our forum/website functionalities you have to be logged in. Otherwise you are not able to see the content. Please sign in or create new account if you haven't got any.</LandingText>
                <LandingLink to='/login'>Click here to log in</LandingLink>
                <LandingLink to='/register'>Click here to register</LandingLink>
            </WrappedLand>
        );
    }
}