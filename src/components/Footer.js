// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
// # STYLED
const FooterTitle = styled.h1`
    font-size: 1.3em;
    color: ${colors.fair};
`;
const FooterNote = styled.p`
    font-size: 0.9em;
    color: ${colors.smoothdark};
    padding: 5px;
`;
const FooterList = styled.ul`
    list-style-type: none;
    margin: 10px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 10px;
`;
const FooterItem = styled.li`
    padding: 5px 20px;
    display: flex;
    justify-content: center;
`;
const FooterBody = styled.div`
    background: ${colors.verydark};
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    border-top: 1px solid ${colors.smoothdark};
    ${FooterTitle}, ${FooterNote} {
        margin: 5px;
        padding: 5px 10px;
    }
`;
const WrappedFooter = styled.footer`
    background: ${colors.dark};
    border-top: 1px solid ${colors.smoothdark};
    padding-top: 40px;
`;
// # COMPONENT
export default class Footer extends Component {
    render(){
        return(
            <WrappedFooter className={this.props.className}>
                <FooterBody>
                    <FooterTitle>Just rules</FooterTitle>
                    <FooterList>
                        <FooterItem>1. Stay gentle as well</FooterItem>
                        <FooterItem>2. Don't share your nazi/communist idea if you have any</FooterItem>
                        <FooterItem>3. Stay happy with our community!</FooterItem>
                    </FooterList>
                    <FooterNote>While you use our forum, you agree following rules</FooterNote>
                </FooterBody>
            </WrappedFooter>
        );
    }
}