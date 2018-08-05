// # IMPORTS
import React, { Component } from 'react';
import {
    Link
  } from 'react-router-dom';
import styled, { css } from 'styled-components';
import colors from './../constants/colors';
// # STYLED
const StyledLink = styled(Link)`
  padding: 15px 40px;
  text-decoration: none;
  color: ${colors.dark};
  font-weight: bold;
  text-transform: uppercase;
  transition: 0.15s ease;
  &:hover {
      color: ${colors.fair};
      background: ${colors.special};
  }
`;
const WrappedItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;
// # COMPONENT
export default class Item extends Component {
    render(){
        return(
            <WrappedItem className={this.props.className}>
                <StyledLink to={this.props.url}>{this.props.text}</StyledLink>
            </WrappedItem>
        );
    }
}