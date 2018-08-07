// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import Navigation from './Navigation';
import UserInfo from './UserInfo';
import { connect } from "react-redux";

// # STYLED
const StyledNavigation = styled(Navigation)`
    width: 100%;
`;
const StyledUserInfo = styled(UserInfo)``;
const HeaderTitle = styled.h1`
    font-size: 1.5em;
    text-transform: uppercase;
    color: ${colors.fair};
    border: 2px solid ${colors.fair};
    font-weight: bold;
    padding: 15px;
    margin: 10px;
    display: flex;
    justify-content: center;
    width: auto;
`;
const WrappedHeader = styled.header`
    padding: 50px 0px 0px 0px;
    background: ${colors.verydark};
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
`;
// # COMPONENT
class Header extends Component {
    renderUserInfo(){
        if(this.props.auths.isAuth === true) {
            return <StyledUserInfo/>
        }
    }
    renderTitle(){
        if(this.props.auths.isAuth !== true){
            return <HeaderTitle>Awesomeness Forum</HeaderTitle>
        }
    }
    render(){
        return(
            <WrappedHeader className={this.props.className}>
                {this.renderTitle()}
                {this.renderUserInfo()}
                <StyledNavigation/>
            </WrappedHeader>
        );
    }
}
// # REDUX
const mapStateToProps = state => {
    return { 
        auths: state.auths
    };
};

export default connect(mapStateToProps, null)(Header);