// # IMPORTS
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import colors from './../constants/colors';
import { connect } from "react-redux";

// # STYLED
const HomeTitle = styled.h1`
    font-size: 1.5em;
`;
const WrappedHome = styled.section`
    background: ${colors.fair};
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 40px 0px;
`;
// # COMPONENT
class Home extends Component {
    render(){
        return(
            <WrappedHome>
                <HomeTitle>Welcome home!</HomeTitle>
                <p>Hmm</p>
            </WrappedHome>
        );
    }
}
// # REDUX
const mapStateToProps = state => {
    return { 
        auths: state.auths
    };
};

export default connect(mapStateToProps)(Home);