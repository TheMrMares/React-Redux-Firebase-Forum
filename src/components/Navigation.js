// # IMPORTS
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import colors from './../constants/colors';
import Item from './Item';
import {auth} from './../firebase/index';
import { connect } from "react-redux";
import { LogOut } from './../actions/index';

// # STYLED
const StyledItem = styled(Item)``;
const SignOutButton = styled.button`
    padding: 5px 20px;
    background: none;
    border: 2px solid ${colors.special};
    color: ${colors.special};
    border-radius: 10px;
    font-weight: bolder;
    justify-self: flex-end;
    &:hover{
        color: ${colors.fair};
        background: ${colors.special};
    }
`;
const WrappedNavigation = styled.ul`
    background: ${colors.smooth};
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0px;
    margin: 30px 0px 0px 0px;
`;
// # COMPONENT
class Navigation extends Component {
    constructor(){
        super()
        this.state = {
            items: [
                        {name: 'Login', path: '/login'},
                        {name: 'Register', path: '/register'},
                        {name: 'Landing', path: '/landing'},
                        {name: 'Home', path: '/'},
                    ]
        }
    }
    renderSignOut(){
        if(this.props.auths.isAuth === true) {
            return <SignOutButton onClick={this.handleSignOut.bind(this)}>Sign Out</SignOutButton>
        }
    }
    renderItem(text, url, key){
        return <StyledItem text={text} url={url} key={key}/>
    }
    handleSignOut(){
        auth.signOut().then(() => {
            this.props.signOut();
        }).catch((error) => {
            console.log(`CODE: ${error.code}`);
            console.log(`MESSAGE: ${error.message}`);
        });
    }
    render(){
        return(
            <WrappedNavigation className={this.props.className}>
                    {console.log('RERENDER')}
                    {this.state.items.map((item, index) => {
                        return this.renderItem(item.name, item.path, index);
                    })}
                    {this.renderSignOut()}
                    {this.props.tests.message}
            </WrappedNavigation>
        );
    }
}
// # REDUX
const mapStateToProps = state => {
    return { 
        auths: state.auths,
        tests: state.tests
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signOut: payload => dispatch(LogOut(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);