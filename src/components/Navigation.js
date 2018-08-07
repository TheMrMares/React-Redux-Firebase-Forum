// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
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
    margin-left: 20px;
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
                        {name: 'Home', path: '/', showMode: 0},
                        {name: 'Profile', path: 'profile', showMode: 0}
                    ]
        }
    }
    renderSignOut(){
        if(this.props.auths.isAuth === true) {
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
            break;
            case 3:
                return <StyledItem text={text} url={url} key={key}/>
            break;
            default:
            break;
        }
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