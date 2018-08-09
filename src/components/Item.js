// # IMPORTS
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from './../constants/colors';
import resolutions from './../constants/resolutions';
// # STYLED
const StyledLink = styled(Link)`
  padding: 15px 40px;
  text-decoration: none;
  color: ${colors.fair};
  font-weight: bold;
  text-transform: uppercase;
  transition: 0.15s ease;
  @media only screen and (max-width: ${resolutions.medium}) {
    width: 100%;
    text-align: center;
  }
  &:hover {
      background: ${colors.smoothdark};
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