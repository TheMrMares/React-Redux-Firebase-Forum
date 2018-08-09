// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import Item from './Item';
import {auth} from './../firebase/index';
import { connect } from "react-redux";
import { LogOut } from './../actions/index';
import resolutions from './../constants/resolutions';

// # STYLED
const StyledItem = styled(Item)`
    @media only screen and (max-width: ${resolutions.big}) {
        width: ${100/3}%;
    }
    @media only screen and (max-width: ${resolutions.medium}) {
        width: 50%;
    }
`;
const SignOutButton = styled.button`
    @media only screen and (max-width: ${resolutions.big}) {
        width: ${100/3}%;
    }
    @media only screen and (max-width: ${resolutions.medium}) {
        width: 50%;
        padding: 10px 20px;
        margin: 0px;
        border-radius: 0px;
    }
    padding: 5px 20px;
    background: none;
    border: 2px solid ${colors.alert};
    color: ${colors.alert};
    border-radius: 10px;
    font-weight: bolder;
    justify-self: flex-end;
    margin-left: 20px;
    &:hover{
        color: ${colors.fair};
        background: ${colors.alert};
        box-shadow: 0px 0px 5px 0px ${colors.alert};
    }
`;
const WrappedNavigation = styled.ul`
    background: ${colors.dark};
    border-top: 1px solid ${colors.smoothdark};
    border-bottom: 1px solid ${colors.smoothdark};
    list-style-type: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    padding: 0px;
    margin: 30px 0px 0px 0px;
`;
// # COMPONENT
class Navigation extends Component {
    constructor(){
        super()
        //showMode
        // 0 - show logged only
        // 1 - show not logged only
        // 2 - don't show
        // 3 - show everywhere
        this.state = {
            items: [
                        {name: 'Login', path: '/login', showMode: 1},
                        {name: 'Register', path: '/register', showMode: 1},
                        {name: 'Landing', path: '/landing', showMode: 2,},
                        {name: 'Forum', path: '/', showMode: 0},
                        {name: 'Shoutbox', path: '/shoutbox', showMode: 0},
                        {name: 'Profile', path: '/profile', showMode: 0}
                    ]
        }
    }
    renderSignOut(){
        if(auth.currentUser !== null) {
            return <SignOutButton onClick={this.handleSignOut.bind(this)}>Sign Out</SignOutButton>
        }
    }
    renderItem(text, url, key, showMode){
        switch(showMode){
            case 0:
                if(auth.currentUser){
                    return <StyledItem text={text} url={url} key={key}/>;
                }
            break;
            case 1:
                if(!auth.currentUser){
                    return <StyledItem text={text} url={url} key={key}/>;
                }
            break;
            case 2:
                return;
            case 3:
                return <StyledItem text={text} url={url} key={key}/>
            default:
            break;
        }
    }
    handleSignOut(){
        auth.signOut().then(() => {
            this.props.signOut();
        }).catch((error) => {
            console.log(`# SIGN OUT ERROR - Code: ${error.code} Message: ${error.message}`);
        });
    }
    render(){
        return(
            <WrappedNavigation className={this.props.className}>
                    {this.state.items.map((item, index) => {
                        return this.renderItem(item.name, item.path, index, item.showMode);
                    })}
                    {this.renderSignOut()}
            </WrappedNavigation>
        );
    }
}
// # REDUX
const mapStateToProps = state => {
    return { 
        auths: state.auths
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signOut: payload => dispatch(LogOut(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);