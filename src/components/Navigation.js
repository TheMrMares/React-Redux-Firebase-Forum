import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import colors from './../constants/colors';
import Item from './Item';

const StyledItem = styled(Item)`
    
`;
const WrappedNavigation = styled.ul`
    background: ${colors.smooth};
    list-style-type: none;
    display: flex;
    flex-direction: row;
    padding: 0px;
    margin: 30px 0px 0px 0px;
`;

export default class Navigation extends Component {
    constructor(){
        super()
        this.state = {
            items: [
                        {name: 'Login', path: '/login'},
                        {name: 'Register', path: '/register'},
                        {name: 'Landing', path: '/land'},
                        {name: 'Home', path: '/'},
                    ]
        }
    }
    renderItem(text, url, key){
        return <StyledItem text={text} url={url} key={key}/>
    }
    render(){
        return(
            <WrappedNavigation className={this.props.className}>
                    {this.state.items.map((item, index) => {
                        return this.renderItem(item.name, item.path, index);
                    })}
            </WrappedNavigation>
        );
    }
}