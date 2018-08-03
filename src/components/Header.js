import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const WrappedHeader = styled.header`
    background: red;
`;

export default class Header extends Component {
    render(){
        return(
            <WrappedHeader>
                header
            </WrappedHeader>
        );
    }
}