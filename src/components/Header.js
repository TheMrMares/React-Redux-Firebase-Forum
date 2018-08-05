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
    color: ${colors.special};
    border: 2px solid ${colors.special};
    border-radius: 10px;
    padding: 15px;
    margin: 10px;
    display: flex;
    justify-content: center;
    width: auto;
`;
const WrappedHeader = styled.header`
    padding: 50px 0px 0px 0px;
    background: ${colors.fair};
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
`;
// # COMPONENT
class Header extends Component {
    renderUserInfo(){
        if(this.props.auths.isAuth === true) {
            let user = this.props.auths.authedUser;
            return <StyledUserInfo userEmail={user.email}/>
        }
    }
    render(){
        return(
            <WrappedHeader className={this.props.className}>
                <HeaderTitle>Awesomeness Forum</HeaderTitle>
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