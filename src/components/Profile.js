// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
// # STYLED
const WrappedProfile = styled.section`
    background: ${colors.fair};
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 40px 0px;  
`;
// # COMPONENT
export default class Profile extends Component {
    render(){
        return(
            <WrappedProfile>
                Profile
            </WrappedProfile>
        );
    }
}